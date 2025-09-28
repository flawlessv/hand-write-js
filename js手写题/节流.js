/**
 * 手写节流函数 (Throttle)
 * 
 * 题目描述：
 * 实现一个节流函数，在指定的时间间隔内，无论触发多少次事件，
 * 函数只会执行一次。节流常用于优化高频触发的事件，如滚动、鼠标移动等。
 * 
 * 节流 vs 防抖的区别：
 * - 节流：控制函数执行频率，每隔一段时间执行一次
 * - 防抖：延迟函数执行，只有在停止触发后才执行
 * 
 * 应用场景：
 * 1. 滚动事件监听（scroll）
 * 2. 鼠标移动事件（mousemove）
 * 3. 窗口大小调整（resize）
 * 4. 按钮点击防止重复提交
 * 
 * 实现方式：
 * 1. 时间戳方式：记录上次执行时间，比较时间差
 * 2. 定时器方式：使用 setTimeout 控制执行
 */

// 方式一：时间戳实现（立即执行版本）
function throttled1(fn, delay = 500) {
  let oldtime = Date.now(); // 上次执行时间
  return function () {
    const args = arguments
    let newtime = Date.now(); // 当前时间
    if (newtime - oldtime >= delay) {
      fn(args)
      oldtime = Date.now(); // 更新上次执行时间
    }
  };
}

// 方式二：定时器实现（延迟执行版本）
function throttle2(fn, delay = 500) {
  let timer = null; // 定时器标识
  
  return function (...args) {
    const context = this;
    
    // 如果定时器不存在，则设置定时器
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null; // 执行完毕后清空定时器
      }, delay);
    }
  };
}
