/**
 * LeetCode 76. 最小覆盖子串
 * LeetCode: https://leetcode.cn/problems/minimum-window-substring/
 * 
 * 题目描述：
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * 
 * 注意：
 * - 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
 * - 如果 s 中存在这样的子串，我们保证它是唯一的答案。
 * 
 * 示例 1：
 * 输入：s = "ADOBECODEBANC", t = "ABC"
 * 输出："BANC"
 * 解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
 * 
 * 示例 2：
 * 输入：s = "a", t = "a"
 * 输出："a"
 * 解释：整个字符串 s 是最小覆盖子串。
 * 
 * 示例 3：
 * 输入：s = "a", t = "aa"
 * 输出：""
 * 解释：t 中两个字符 'a' 均应包含在 s 的子串中，因此没有符合条件的子字符串，返回空字符串。
 * 
 * 提示：
 * - m == s.length
 * - n == t.length
 * - 1 <= m, n <= 10^5
 * - s 和 t 由英文字母组成
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 * 
 * 解题思路：
 * 滑动窗口 + 哈希表
 * 1. 使用双指针维护一个滑动窗口 [left, right]
 * 2. 用哈希表记录 t 中每个字符需要的数量
 * 3. 用另一个哈希表记录当前窗口中每个字符的数量
 * 4. 当窗口满足条件时（包含 t 的所有字符），尝试缩小窗口
 * 5. 记录最小窗口的起始位置和长度
 * 
 * 时间复杂度：O(|s| + |t|)，其中 |s| 和 |t| 分别是字符串 s 和 t 的长度
 * 空间复杂度：O(|s| + |t|)，哈希表存储字符
 */
//TODO:这题暂时没看懂
var minWindow = function(s, t) {
    if (s.length === 0 || t.length === 0 || s.length < t.length) {
        return "";
    }
    
    // 记录 t 中每个字符需要的数量
    const need = new Map();
    for (let char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    // 记录当前窗口中每个字符的数量
    const window = new Map();
    
    // 滑动窗口的左右指针
    let left = 0;
    let right = 0;
    
    // 记录窗口中满足条件的字符数量（即窗口中某个字符的数量 >= t 中该字符的数量）
    let valid = 0;
    
    // 记录最小覆盖子串的起始位置和长度
    let start = 0;
    let minLen = Infinity;
    
    // 开始滑动窗口
    while (right < s.length) {
        // 扩大窗口：将 right 指向的字符加入窗口
        const char = s[right];
        right++;
        
        // 如果当前字符是 t 中需要的字符
        if (need.has(char)) {
            // 更新窗口中该字符的数量
            window.set(char, (window.get(char) || 0) + 1);
            
            // 如果窗口中该字符的数量等于 t 中需要的数量，valid 加 1
            if (window.get(char) === need.get(char)) {
                valid++;
            }
        }
        
        // 当窗口满足条件时（包含 t 的所有字符），尝试缩小窗口
        while (valid === need.size) {
            // 更新最小覆盖子串
            if (right - left < minLen) {
                start = left;
                minLen = right - left;
            }
            
            // 缩小窗口：将 left 指向的字符移出窗口
            const leftChar = s[left];
            left++;
            
            // 如果移出的字符是 t 中需要的字符
            if (need.has(leftChar)) {
                // 如果窗口中该字符的数量等于 t 中需要的数量，valid 减 1
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                // 更新窗口中该字符的数量
                window.set(leftChar, window.get(leftChar) - 1);
            }
        }
    }
    
    // 返回最小覆盖子串
    return minLen === Infinity ? "" : s.substring(start, start + minLen);
};

// 测试用例
console.log("=== 最小覆盖子串测试 ===");

// 测试用例1
console.log("测试用例1:");
console.log(`输入: s = "ADOBECODEBANC", t = "ABC"`);
console.log(`输出: "${minWindow("ADOBECODEBANC", "ABC")}"`); // 期望: "BANC"

// 测试用例2
console.log("\n测试用例2:");
console.log(`输入: s = "a", t = "a"`);
console.log(`输出: "${minWindow("a", "a")}"`); // 期望: "a"

// 测试用例3
console.log("\n测试用例3:");
console.log(`输入: s = "a", t = "aa"`);
console.log(`输出: "${minWindow("a", "aa")}"`); // 期望: ""

// 测试用例4
console.log("\n测试用例4:");
console.log(`输入: s = "ab", t = "b"`);
console.log(`输出: "${minWindow("ab", "b")}"`); // 期望: "b"

// 测试用例5
console.log("\n测试用例5:");
console.log(`输入: s = "bba", t = "ab"`);
console.log(`输出: "${minWindow("bba", "ab")}"`); // 期望: "ba"

