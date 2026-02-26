/**
 * 题目 08：手写 reduce（函数版）
 *
 * 题目描述：
 * 实现一个 myReduce(arr, callback, initialValue) 函数，效果类似原生 reduce。
 */

function myReduce(arr, callback, initialValue) {
  if (!Array.isArray(arr)) {
    throw new TypeError("arr 必须是数组");
  }
  if (typeof callback !== "function") {
    throw new TypeError("callback 必须是函数");
  }

  let index = 0;
  let accumulator;

  // 传了初始值
  if (arguments.length >= 3) {
    accumulator = initialValue;
  } else {
    // 没传初始值时，使用第一个元素作为初始累加值
    if (arr.length === 0) {
      throw new TypeError("空数组且未提供初始值");
    }
    accumulator = arr[0];
    index = 1;
  }

  for (; index < arr.length; index += 1) {
    accumulator = callback(accumulator, arr[index], index, arr);
  }

  return accumulator;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log(myReduce([1, 2, 3, 4], (acc, cur) => acc + cur, 0)); // 10
console.log(myReduce([10, 20, 30], (acc, cur) => acc + cur)); // 60
console.log(myReduce(["a", "b", "c"], (acc, cur) => acc + cur, "")); // abc

module.exports = myReduce;
