/**
 * LeetCode 43. 字符串相乘
 * LeetCode: https://leetcode.cn/problems/multiply-strings/
 *
 * 题目描述：
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回两数乘积的字符串。不能使用内置大整数库。
 *
 * 思路：
 * 模拟竖式乘法。两数位数分别为 len1、len2，结果最多 len1+len2 位。
 * 1. 开一个长度为 len1+len2 的数组 arr，初值为 0，用来按位累加乘积。
 * 2. 双重循环：num1 从低位到高位（i），num2 从低位到高位（j），乘积 mul = num1[i]*num2[j]。在竖式里，这个积会落在结果的「个位」和「十位」：个位在 i+j+1，十位在 i+j。所以先把 mul 全部加到 arr[i+j+1] 上（先不处理进位）。
 * 3. 从数组末尾往左做一次进位：当前位除以 10，商加到前一位，余数留在当前位。
 * 4. 去掉前导 0，把剩余数字拼成字符串返回。若全是 0 则返回 "0"。
 *
 * 时间复杂度：O(m*n)
 * 空间复杂度：O(m+n)
 *
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function multiply(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";

  const len1 = num1.length;
  const len2 = num2.length;
  const arr = new Array(len1 + len2).fill(0);

  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      const mul = (num1[i] - "0") * (num2[j] - "0");
      const p2 = i + j + 1;
      arr[p2] += mul;
    }
  }
  for (let k = arr.length - 1; k > 0; k--) {
    arr[k - 1] += Math.floor(arr[k] / 10);
    arr[k] %= 10;
  }

  let start = 0;
  while (start < arr.length && arr[start] === 0) start++;
  return start === arr.length ? "0" : arr.slice(start).join("");
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 字符串相乘测试 ===");
console.log(multiply("2", "3"));
console.log(multiply("123", "456"));
console.log(multiply("0", "123"));

module.exports = { multiply };
