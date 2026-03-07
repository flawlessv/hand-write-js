/**
 * 手写数组去重
 *
 * 题目描述：
 * 给定一个数组，返回去重后的新数组（保持首次出现顺序）。不修改原数组。
 *
 * 常见实现方式：
 * 1. Set：简单、支持 NaN 与对象引用去重（按引用）
 * 2. filter + indexOf：兼容性好，NaN 会漏掉（indexOf(NaN) === -1）
 * 3. reduce：一次遍历，用“已出现集合”判断
 * 4. Object 键：仅适用于字符串/数字等可做键的类型，且数字与字符串会混在一起
 *
 * 注意：对象/数组按引用比较，只保留第一次出现的引用；若需“内容相同即去重”需自己写相等逻辑。
 *
 * 时间复杂度：Set/object 法 O(n)；filter+indexOf O(n²)
 * 空间复杂度：O(n)
 *
 * @param {Array} arr 待去重数组
 * @returns {Array} 去重后的新数组
 */

function uniqueBySet(arr) {
  return [...new Set(arr)];
}

function uniqueByFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function uniqueByReduce(arr) {
  return arr.reduce((acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]), []);
}

function uniqueByObject(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("arr 必须是数组");
  }
  const seen = Object.create(null);
  return arr.filter((item) => {
    const key = typeof item + String(item);
    if (seen[key]) return false;
    seen[key] = true;
    return true;
  });
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 数组去重测试 ===");

const arr = [1, 2, 2, "a", "a", null, undefined, null, NaN, NaN, 1, 3];

console.log("uniqueBySet:", uniqueBySet(arr));
console.log("uniqueByFilter:", uniqueByFilter(arr));
console.log("uniqueByReduce:", uniqueByReduce(arr));
console.log("uniqueByObject:", uniqueByObject(arr));

module.exports = { uniqueBySet, uniqueByFilter, uniqueByReduce, uniqueByObject };
