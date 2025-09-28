/**
 * 手写防抖函数 (Debounce)
 * 
 * 题目描述：
 * 实现一个防抖函数，在指定时间内，如果事件被触发多次，
 * 只执行最后一次触发的事件。这样可以避免一些无用的重复操作。
 * 
 * 防抖 vs 节流的区别：
 * - 防抖：延迟函数执行，只有在停止触发后才执行（重新计时）
 * - 节流：控制函数执行频率，每隔一段时间执行一次（不重新计时）
 * 
 * 应用场景：
 * 1. 搜索框输入联想（用户停止输入后再发请求）
 * 2. 按钮防重复点击
 * 3. 窗口大小调整（resize）
 * 4. 表单验证（用户停止输入后验证）
 * 5. 自动保存功能
 * 
 * 实现原理：
 * 每次触发事件时，清除之前的定时器，重新设置新的定时器。
 * 只有在指定时间内没有新的触发时，才会执行函数。
 */

// 基础版防抖函数
function debounce(func, wait) {
  let timeout; // 定时器标识
  
  return function (...args) {
    const context = this; // 保存 this 上下文
    
    // 清除之前的定时器
    clearTimeout(timeout);
    
    // 设置新的定时器
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 增强版防抖函数（支持立即执行和取消功能）
function debounceAdvanced(func, wait, options = {}) {
  const {
    immediate = false,  // 是否立即执行（第一次触发时）
    maxWait = null,     // 最大等待时间，超过此时间强制执行
  } = options;
  
  let timeout = null;
  let maxTimeout = null;
  let lastCallTime = 0;
  let lastInvokeTime = 0;
  
  // 执行函数
  function invokeFunc(context, args) {
    lastInvokeTime = Date.now();
    return func.apply(context, args);
  }
  
  // 取消防抖
  function cancel() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    if (maxTimeout) {
      clearTimeout(maxTimeout);
      maxTimeout = null;
    }
    lastCallTime = 0;
    lastInvokeTime = 0;
  }
  
  // 立即执行
  function flush() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
      return invokeFunc(this, arguments);
    }
  }
  
  function debounced(...args) {
    const context = this;
    const currentTime = Date.now();
    lastCallTime = currentTime;
    
    // 是否应该立即执行
    const shouldInvokeImmediately = immediate && !timeout;
    
    // 清除之前的定时器
    if (timeout) {
      clearTimeout(timeout);
    }
    
    // 立即执行模式
    if (shouldInvokeImmediately) {
      invokeFunc(context, args);
    }
    
    // 设置新的延迟执行定时器
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        invokeFunc(context, args);
      }
    }, wait);
    
    // 最大等待时间处理
    if (maxWait && !maxTimeout) {
      maxTimeout = setTimeout(() => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        maxTimeout = null;
        invokeFunc(context, args);
      }, maxWait);
    }
  }
  
  // 添加取消和立即执行方法
  debounced.cancel = cancel;
  debounced.flush = flush;
  
  return debounced;
}

// 测试用例
console.log("=== 防抖函数测试 ===");

// 创建测试函数
let count = 0;
const testFunction = (message) => {
  count++;
  console.log(`执行第 ${count} 次: ${message}, 时间: ${new Date().toLocaleTimeString()}`);
};

// 基础防抖测试
console.log("\n--- 基础防抖测试 ---");
const debouncedBasic = debounce(testFunction, 1000);

console.log("开始连续调用（1秒内）:");
debouncedBasic("第1次调用");
setTimeout(() => debouncedBasic("第2次调用"), 200);
setTimeout(() => debouncedBasic("第3次调用"), 400);
setTimeout(() => debouncedBasic("第4次调用"), 600);
setTimeout(() => debouncedBasic("第5次调用"), 800);

// 立即执行模式测试
setTimeout(() => {
  console.log("\n--- 立即执行模式测试 ---");
  count = 0;
  const debouncedImmediate = debounceAdvanced(testFunction, 1000, { immediate: true });
  
  console.log("开始连续调用（立即执行模式）:");
  debouncedImmediate("立即执行-第1次");
  setTimeout(() => debouncedImmediate("立即执行-第2次"), 200);
  setTimeout(() => debouncedImmediate("立即执行-第3次"), 400);
}, 3000);

// 最大等待时间测试
setTimeout(() => {
  console.log("\n--- 最大等待时间测试 ---");
  count = 0;
  const debouncedMaxWait = debounceAdvanced(testFunction, 1000, { maxWait: 2000 });
  
  console.log("开始连续调用（最大等待2秒）:");
  let callCount = 0;
  const interval = setInterval(() => {
    callCount++;
    debouncedMaxWait(`最大等待-第${callCount}次`);
    if (callCount >= 5) {
      clearInterval(interval);
    }
  }, 500);
}, 6000);

// 实际应用示例：搜索框防抖
function createSearchExample() {
  let searchCount = 0;
  
  // 模拟搜索API调用
  const performSearch = (query) => {
    searchCount++;
    console.log(`执行搜索 #${searchCount}: "${query}"`);
    // 这里可以发送 AJAX 请求
  };
  
  // 创建防抖搜索函数
  const debouncedSearch = debounce(performSearch, 500);
  
  // 模拟用户输入
  const simulateUserInput = () => {
    console.log("\n=== 搜索框防抖示例 ===");
    console.log("模拟用户快速输入...");
    
    debouncedSearch("j");
    setTimeout(() => debouncedSearch("ja"), 100);
    setTimeout(() => debouncedSearch("jav"), 200);
    setTimeout(() => debouncedSearch("java"), 300);
    setTimeout(() => debouncedSearch("javas"), 400);
    setTimeout(() => debouncedSearch("javascript"), 450);
  };
  
  return simulateUserInput;
}

// 执行搜索示例
setTimeout(createSearchExample(), 10000);

// 按钮防重复点击示例
function createButtonExample() {
  let clickCount = 0;
  
  const handleButtonClick = () => {
    clickCount++;
    console.log(`按钮点击处理 #${clickCount}: 提交表单`);
    // 这里可以提交表单或发送请求
  };
  
  const debouncedClick = debounce(handleButtonClick, 1000);
  
  const simulateButtonClicks = () => {
    console.log("\n=== 按钮防重复点击示例 ===");
    console.log("模拟用户快速点击按钮...");
    
    // 模拟用户在1秒内快速点击多次
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        console.log(`用户点击按钮第 ${i + 1} 次`);
        debouncedClick();
      }, i * 100);
    }
  };
  
  return simulateButtonClicks;
}

// 执行按钮示例
setTimeout(createButtonExample(), 12000);

// 如果在浏览器环境中，可以这样使用：
/*
// 搜索框防抖
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((e) => {
  console.log('搜索:', e.target.value);
  // 发送搜索请求
}, 500);
searchInput.addEventListener('input', debouncedSearch);

// 窗口大小调整防抖
const debouncedResize = debounce(() => {
  console.log('窗口大小改变:', window.innerWidth, window.innerHeight);
  // 重新计算布局
}, 250);
window.addEventListener('resize', debouncedResize);
*/
































