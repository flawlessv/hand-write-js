/**
 * 手写题：比较两个版本号的大小
 *
 * 题目描述：
 * 给定两个版本号字符串 version1 和 version2，比较它们的大小。
 * 版本号由数字和点组成，例如 "1.0.0"、"1.2"、"2.10.1"。
 *
 * 约定：
 * - 若 version1 > version2，返回 1
 * - 若 version1 < version2，返回 -1
 * - 若相等，返回 0
 * - 段数不足的按 0 处理，如 "1.0" 与 "1.0.0" 视为相等
 *
 * 思路：
 * 1. 用 split('.') 将两个版本号拆成数字数组
 * 2. 取两数组较长者作为遍历长度，不足的段按 0 比较
 * 3. 逐段比较数字，一旦不等即可返回 1 或 -1；全部相等返回 0
 *
 * 时间复杂度：O(n + m)，n、m 为两版本号的段数
 * 空间复杂度：O(n + m)，用于存储拆分后的数组
 */

/**
 * 比较两个版本号的大小
 * @param {string} version1
 * @param {string} version2
 * @returns {1 | 0 | -1}
 */
function compareVersion(version1, version2) {
  if (typeof version1 !== "string" || typeof version2 !== "string") {
    throw new TypeError("version1 和 version2 必须是字符串");
  }

  const v1Parts = version1.split(".").map((s) => Number(s) || 0);
  const v2Parts = version2.split(".").map((s) => Number(s) || 0);
  const maxLen = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < maxLen; i++) {
    const n1 = v1Parts[i] ?? 0;
    const n2 = v2Parts[i] ?? 0;
    if (n1 > n2) return 1;
    if (n1 < n2) return -1;
  }

  return 0;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 比较两个版本号的大小 ===");

console.log(compareVersion("1.0", "1.0.0")); // 0
console.log(compareVersion("1.01", "1.001")); // 0（01、001 都解析为 1）
console.log(compareVersion("1.0", "1.1")); // -1
console.log(compareVersion("2.0", "1.9.9")); // 1
console.log(compareVersion("0.1", "1.1")); // -1
console.log(compareVersion("1.2.3", "1.2.3")); // 0

module.exports = compareVersion;
