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

  // index: 当前遍历到的下标
  // accumulator: 每一轮累计的结果（下一轮会继续作为 acc 传入 callback）
  let index = 0;
  let accumulator;

  // 这里用 arguments.length，而不是 initialValue === undefined：
  // 因为调用者可能“明确传了 undefined 作为初始值”，这种情况也要视为“传了初始值”
  if (arguments.length >= 3) {
    // 情况 1：传了 initialValue
    // 第一次回调时：acc = initialValue, cur = arr[0]
    accumulator = initialValue;
  } else {
    // 情况 2：没传 initialValue
    // 约定使用 arr[0] 作为初始 accumulator，所以循环要从下标 1 开始
    if (arr.length === 0) {
      throw new TypeError("空数组且未提供初始值");
    }
    accumulator = arr[0];
    index = 1;
  }

  for (; index < arr.length; index += 1) {
    // callback 参数顺序与原生 reduce 一致：
    // (累计值acc, 当前项cur, 当前下标index, 原数组arr)
    accumulator = callback(accumulator, arr[index], index, arr);
  }

  // 循环结束后，accumulator 就是最终结果
  return accumulator;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log(myReduce([1, 2, 3, 4], (acc, cur) => acc + cur, 0)); // 10
console.log(myReduce([10, 20, 30], (acc, cur) => acc + cur)); // 60
console.log(myReduce(["a", "b", "c"], (acc, cur) => acc + cur, "")); // abc

module.exports = myReduce;
