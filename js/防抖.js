//防抖：在指定时间内，如果事件被触发多次，就执行最后一次触发的事件。这样可以避免一些无用的重复操作。
function debounce(fun, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fun.apply(context, args);
    }, wait);
  };
}

function debounce(fun, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fun.apply(context, args);
    }, wait);
  };
}




