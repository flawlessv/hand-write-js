//节流：在指定时间内，函数只会被调用一次，
function throttled1(fn, delay = 500) {
  let oldtime = Date.now();
  return function (...args) {
    let context = this;
    let newtime = Date.now();
    if (newtime - oldtime >= delay) {
      fn.apply(context, args);
      oldtime = Date.now();
    }
  };
}

function throttled(fn, delay) {
  let oldTime = Date.now();
  return function () {
    let context = this;
    let args = arguments;
    let newTime = Date.now();
    if (newTime - oldTime > delay) {
      fn.apply(context, args);
      oldTime = Date.now();
    }
  };
}
