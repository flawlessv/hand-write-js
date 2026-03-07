/**
 * LeetCode 12. 整数转罗马数字 / LeetCode 13. 罗马数字转整数
 * 12: https://leetcode.cn/problems/integer-to-roman/
 * 13: https://leetcode.cn/problems/roman-to-integer/
 *
 * 题目描述：
 * - 整数转罗马：给定整数 (1~3999)，转为罗马数字。I(1)、V(5)、X(10)、L(50)、C(100)、D(500)、M(1000)；特殊：4→IV、9→IX 等。
 * - 罗马转整数：给定罗马数字字符串，转为整数。若当前字符值小于右边则减，否则加。
 *
 * 思路：
 * - intToRoman：先把「数值→符号」按从大到小排好（如 1000→M、900→CM、…、1→I）。从 num 里贪心减：当前数能减掉表中某个值就减，并把对应符号拼到结果里，直到 num 为 0。这样能保证 4 写成 IV、9 写成 IX 等，因为表里已经包含 4/9/40/90 等组合。
 * - romanToInt：从左到右扫每个字符。罗马数字规则是「左边比右边小就减、否则加」：例如 IV 是 5-1=4，VI 是 5+1=6。所以对每一位，如果当前字符对应的数小于右边字符对应的数，就减去当前数，否则加上当前数。最后一位右边没有字符，直接加。
 */

/**
 * 整数转罗马数字
 * @param {number} num 1 <= num <= 3999
 * @return {string}
 */
function intToRoman(num) {
  const table = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let n = num;
  let result = "";

  for (const [value, symbol] of table) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }

  return result;
}

const ROMAN_MAP = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

/**
 * 罗马数字转整数
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const cur = ROMAN_MAP[s[i]];
    const next = i + 1 < s.length ? ROMAN_MAP[s[i + 1]] : 0;
    if (cur < next) {
      result -= cur;
    } else {
      result += cur;
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 整数转罗马数字 ===");
console.log(intToRoman(3), intToRoman(4), intToRoman(9), intToRoman(58), intToRoman(1994));

console.log("=== 罗马数字转整数 ===");
console.log(romanToInt("III"), romanToInt("IV"), romanToInt("IX"), romanToInt("LVIII"), romanToInt("MCMXCIV"));

module.exports = { intToRoman, romanToInt };
