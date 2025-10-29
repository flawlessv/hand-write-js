/**
 * 力扣第5题：最长回文子串
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 
 * 什么是回文串？
 * 回文串是指正着读和反着读都一样的字符串。
 * 例如："aba"、"abba"、"racecar"、"a" 都是回文串
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
 * 解题思路：中心扩展法
 * 1. 核心思想：回文串的特点是关于中心对称
 * 2. 遍历每个可能的中心点，向两边扩展
 * 3. 需要考虑两种情况：
 *    - 奇数长度：中心是单个字符，如 "aba" 以 'b' 为中心
 *    - 偶数长度：中心是两个字符之间，如 "abba" 以 'bb' 之间为中心
 * 4. 对每个中心点，同时检查奇数和偶数长度的回文串
 * 5. 时间复杂度：O(n²)，空间复杂度：O(1)
 * 
 * 算法步骤：
 * 1. 遍历字符串的每个位置 i
 * 2. 以 i 为中心，检查奇数长度回文串（expandAroundCenter(i, i)）
 * 3. 以 i 和 i+1 为中心，检查偶数长度回文串（expandAroundCenter(i, i+1)）
 * 4. 记录最长的回文串起始位置和长度
 */

function longestPalindrome(s: string): string {
    if (s.length < 2) return s;
    
    let start = 0;
    let maxLen = 1;
    
    // 中心扩展函数
    function expandAroundCenter(left: number, right: number): number {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
    
    for (let i = 0; i < s.length; i++) {
        // 奇数长度的回文串（以i为中心）
        const len1 = expandAroundCenter(i, i);
        // 偶数长度的回文串（以i和i+1为中心）
        const len2 = expandAroundCenter(i, i + 1);
        
        const currentMaxLen = Math.max(len1, len2);
        
        if (currentMaxLen > maxLen) {
            maxLen = currentMaxLen;
            start = i - Math.floor((currentMaxLen - 1) / 2);
        }
    }
    
    return s.substring(start, start + maxLen);
}

// 测试用例
console.log("=== 最长回文子串测试 ===");
console.log(`输入: "babad", 输出: "${longestPalindrome("babad")}"`); // 期望: "bab" 或 "aba"
console.log(`输入: "cbbd", 输出: "${longestPalindrome("cbbd")}"`); // 期望: "bb"
console.log(`输入: "a", 输出: "${longestPalindrome("a")}"`); // 期望: "a"
console.log(`输入: "ac", 输出: "${longestPalindrome("ac")}"`); // 期望: "a" 或 "c"
console.log(`输入: "racecar", 输出: "${longestPalindrome("racecar")}"`); // 期望: "racecar"

// 详细例子说明：以 "babad" 为例
// 位置: 0 1 2 3 4
// 字符: b a b a d
// 
// i=0: 以'b'为中心
//  奇数: expandAroundCenter(0,0) -> 检查 "b" -> 长度1
//  偶数: expandAroundCenter(0,1) -> 检查 "ba" -> 不匹配，长度0
//  当前最长: 1
// 
// i=1: 以'a'为中心  
//  奇数: expandAroundCenter(1,1) -> 检查 "a" -> "bab" -> 长度3
//  偶数: expandAroundCenter(1,2) -> 检查 "ab" -> 不匹配，长度0
//  当前最长: 3 (更新start=0, maxLen=3)
// 
// i=2: 以'b'为中心
//  奇数: expandAroundCenter(2,2) -> 检查 "b" -> "aba" -> 长度3
//  偶数: expandAroundCenter(2,3) -> 检查 "ba" -> 不匹配，长度0
//  当前最长: 3 (长度相同，不更新)
// 
// i=3: 以'a'为中心
//  奇数: expandAroundCenter(3,3) -> 检查 "a" -> 长度1
//  偶数: expandAroundCenter(3,4) -> 检查 "ad" -> 不匹配，长度0
//  当前最长: 3
// 
// i=4: 以'd'为中心
//  奇数: expandAroundCenter(4,4) -> 检查 "d" -> 长度1
//  偶数: 超出范围
//  当前最长: 3
// 
// 最终结果: "bab" (start=0, maxLen=3)

export { longestPalindrome };
