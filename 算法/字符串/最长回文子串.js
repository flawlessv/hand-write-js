/**
 * LeetCode 5. 最长回文子串
 * LeetCode: https://leetcode.cn/problems/longest-palindromic-substring/
 * 
 * 题目描述：
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 
 * 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
 * 
 * 示例 1：
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 * 
 * 示例 2：
 * 输入：s = "cbbd"
 * 输出："bb"
 * 
 * 提示：
 * - 1 <= s.length <= 1000
 * - s 仅由数字和英文字母组成
 */

/**
 * @param {string} s
 * @return {string}
 * 
 * 解题思路：
 * 
 * 方法一：中心扩展法（推荐）
 * - 回文串有两种情况：奇数长度（中心是一个字符）和偶数长度（中心是两个字符）
 * - 遍历字符串，以每个位置（或每两个相邻位置）为中心，向两边扩展
 * - 找到最长的回文子串
 * 
 * 方法二：动态规划
 * - dp[i][j] 表示 s[i...j] 是否是回文串
 * - 状态转移：dp[i][j] = (s[i] === s[j]) && dp[i+1][j-1]
 * - 边界条件：单个字符是回文，两个相同字符是回文
 * 
 * 时间复杂度：
 * - 方法一：O(n^2)，其中 n 是字符串长度
 * - 方法二：O(n^2)
 * 
 * 空间复杂度：
 * - 方法一：O(1)
 * - 方法二：O(n^2)
 */

// 方法一：中心扩展法（推荐）
var longestPalindrome = function(s) {
    if (s.length < 2) return s;
    
    let start = 0;  // 最长回文子串的起始位置
    let maxLen = 1; // 最长回文子串的长度
    
    // 辅助函数：从中心向两边扩展，返回回文串的长度
    const expandAroundCenter = function(left, right) {
        // 当左右指针在有效范围内，且字符相等时，继续扩展
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        // 返回回文串的长度（注意：退出循环时 left 和 right 已经超出范围）
        return right - left - 1;
    };
    
    // 遍历字符串，以每个位置为中心
    for (let i = 0; i < s.length; i++) {
        // 情况1：奇数长度的回文串（中心是单个字符）
        // 例如："aba"，中心是 'b'
        const len1 = expandAroundCenter(i, i);
        
        // 情况2：偶数长度的回文串（中心是两个字符）
        // 例如："abba"，中心是 "bb"
        const len2 = expandAroundCenter(i, i + 1);
        
        // 取两种情况中的最大值
        const len = Math.max(len1, len2);
        
        // 如果找到更长的回文串，更新起始位置和长度
        if (len > maxLen) {
            maxLen = len;
            // 为什么这里要用 (len - 1) 而不是直接用 len？
            // 因为要计算从中心 i 向两边各扩展多少步。以中心扩展，最终区间长度为 len，
            // 实际扩展步数（两边各扩展的长度）是 (len-1)/2。
            // - 比如奇数回文 "abcba" 长度5，以 i=2 为中心，左右各扩展2步，共左右加起来4，中心自己1，一共5。
            //   计算起点就是 i-2 （i-Math.floor((5-1)/2)）
            // - 偶数回文如 "abccba" 长度6，中心i=2,i+1=3，左右各扩展2步，得到 i-2 ~ i+3，长度6
            // 用 (len-1) 就保证了无论奇偶，始终都是左右对称扩展，回文串正好覆盖整个区间
            start = i - Math.floor((len - 1) / 2);
        }
    }
    
    // 返回最长回文子串
    return s.substring(start, start + maxLen);
};

// 方法二：动态规划
var longestPalindromeDP = function(s) {
    const n = s.length;
    if (n < 2) return s;
    
    // dp[i][j] 表示 s[i...j] 是否是回文串
    const dp = Array(n).fill(0).map(() => Array(n).fill(false));
    
    let start = 0;
    let maxLen = 1;
    
    // 初始化：单个字符都是回文串
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    // 初始化：两个相同字符是回文串
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLen = 2;
        }
    }
    
    // 填充 dp 数组：从长度为 3 开始，逐步增加长度
    // len 表示子串的长度
    for (let len = 3; len <= n; len++) {
        // i 表示子串的起始位置
        for (let i = 0; i <= n - len; i++) {
            // j 表示子串的结束位置
            const j = i + len - 1;
            
            // 状态转移：如果两端字符相等，且中间部分是回文串，则整个子串是回文串
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                start = i;
                maxLen = len;
            }
        }
    }
    
    return s.substring(start, start + maxLen);
};

// 测试用例
console.log("=== 最长回文子串测试 ===");

// 测试用例1
console.log("测试用例1:");
console.log(`输入: s = "babad"`);
console.log(`中心扩展法输出: "${longestPalindrome("babad")}"`); // 期望: "bab" 或 "aba"
console.log(`动态规划法输出: "${longestPalindromeDP("babad")}"`); // 期望: "bab" 或 "aba"

// 测试用例2
console.log("\n测试用例2:");
console.log(`输入: s = "cbbd"`);
console.log(`中心扩展法输出: "${longestPalindrome("cbbd")}"`); // 期望: "bb"
console.log(`动态规划法输出: "${longestPalindromeDP("cbbd")}"`); // 期望: "bb"

// 测试用例3
console.log("\n测试用例3:");
console.log(`输入: s = "a"`);
console.log(`中心扩展法输出: "${longestPalindrome("a")}"`); // 期望: "a"
console.log(`动态规划法输出: "${longestPalindromeDP("a")}"`); // 期望: "a"

// 测试用例4
console.log("\n测试用例4:");
console.log(`输入: s = "ac"`);
console.log(`中心扩展法输出: "${longestPalindrome("ac")}"`); // 期望: "a" 或 "c"
console.log(`动态规划法输出: "${longestPalindromeDP("ac")}"`); // 期望: "a" 或 "c"

// 测试用例5
console.log("\n测试用例5:");
console.log(`输入: s = "racecar"`);
console.log(`中心扩展法输出: "${longestPalindrome("racecar")}"`); // 期望: "racecar"
console.log(`动态规划法输出: "${longestPalindromeDP("racecar")}"`); // 期望: "racecar"

// 测试用例6
console.log("\n测试用例6:");
console.log(`输入: s = "abccba"`);
console.log(`中心扩展法输出: "${longestPalindrome("abccba")}"`); // 期望: "abccba"
console.log(`动态规划法输出: "${longestPalindromeDP("abccba")}"`); // 期望: "abccba"

