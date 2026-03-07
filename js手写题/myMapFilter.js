/**
 * 手写 map 和 filter
 *
 * 题目描述：
 * 实现 myMap(arr, callback) 和 myFilter(arr, callback)，行为与 Array.prototype.map / filter 一致。
 *
 * 约定：
 * - map：对每项执行 callback(item, index, arr)，将返回值组成新数组
 * - filter：对每项执行 callback(item, index, arr)，保留返回真值的项组成新数组
 * - 不修改原数组；callback 的 this 可通过第三参数（未实现时可省略）绑定
 *
 * 思路：遍历数组，按语义收集结果。
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 *
 * @param {Array} arr 原数组
 * @param {Function} callback (item, index, arr) => any
 * @returns {Array}
 */

function myMap(arr, callback) {
  if (!Array.isArray(arr)) {
    throw new TypeError("arr 必须是数组");
  }
  if (typeof callback !== "function") {
    throw new TypeError("callback 必须是函数");
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

function myFilter(arr, callback) {
  if (!Array.isArray(arr)) {
    throw new TypeError("arr 必须是数组");
  }
  if (typeof callback !== "function") {
    throw new TypeError("callback 必须是函数");
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 手写 map / filter 测试 ===");

const nums = [1, 2, 3, 4, 5];

console.log(myMap(nums, (x) => x * 2));
console.log(myFilter(nums, (x) => x % 2 === 1));

module.exports = { myMap, myFilter };
