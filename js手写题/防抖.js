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
 *
 * ---------------------------------------------------------------------------
 * 防抖的好处：
 * 1. 减少无效请求/计算：高频触发时只执行最后一次，避免中间状态被处理
 * 2. 节省资源：少发请求、少做 DOM 更新，减轻服务器和浏览器压力
 * 3. 提升体验：避免输入/调整过程中频繁闪烁或卡顿
 * 4. 防止重复提交：按钮快速连点时只提交一次
 *
 * 不防抖会有什么问题：
 * 1. 搜索联想：每输入一个字符就发一次请求 → 请求爆炸、接口被打爆、结果乱序覆盖
 * 2. resize：窗口拖拽时每帧都触发 → 布局重算/重绘过于频繁，页面卡顿
 * 3. 表单验证：每输入一字就校验 → 提示闪来闪去，体验差
 * 4. 自动保存：每次改动都保存 → 大量无效写入、可能覆盖用户正在输入的内容
 *
 * 为什么会有这些问题：
 * 浏览器事件（input、resize、scroll 等）触发频率远高于“用户意图”的频率。
 * 不节流/防抖时，每次事件都执行回调，导致：回调执行次数 ∝ 事件触发次数，
 * 而网络请求、DOM 操作、复杂计算都是昂贵操作，次数一多就会拖垮性能或产生错误结果。
 *
 * 防抖时间如何衡量：
 * 1. 按“用户停顿”习惯：搜索联想常用 300～500ms，认为停顿超过该时间算“输入告一段落”
 * 2. 按业务容忍度：可接受的最晚反馈时间。如自动保存可设 1～2s，避免保存太频繁
 * 3. 按接口/性能：请求耗时、服务器限流。时间过短仍会多发请求，过长则响应显慢
 * 4. 经验值参考：输入类 300～500ms，resize 100～250ms，按钮防连点 500～1000ms
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
































