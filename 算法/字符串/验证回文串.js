/**
 * LeetCode 125. 验证回文串
 * LeetCode: https://leetcode.cn/problems/valid-palindrome/
 * 
 * 题目描述：
 * 
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串。
 * 
 * 字母和数字都属于字母数字字符。
 * 
 * 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。
 * 
 * 
 * 示例 1：
 * 输入: s = "A man, a plan, a canal: Panama"
 * 输出：true
 * 解释："amanaplanacanalpanama" 是回文串。
 * 
 * 
 * 示例 2：
 * 输入：s = "race a car"
 * 输出：false
 * 解释："raceacar" 不是回文串。
 * 
 * 
 * 示例 3：
 * 输入：s = " "
 * 输出：true
 * 解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
 * 由于空字符串正着读和反着读都一样，所以是回文串。
 * 
 * 
 * 提示：
 * - 1 <= s.length <= 2 * 10^5
 * - s 仅由可打印的 ASCII 字符组成
 */

/**
 * @param {string} s
 * @return {boolean}
 */
// 方法一：双指针法（推荐）
var isPalindrome = function(s) {
    // 预处理：只保留字母和数字，并转换为小写
    let cleaned = '';
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if ((char >= 'a' && char <= 'z') || 
            (char >= 'A' && char <= 'Z') || 
            (char >= '0' && char <= '9')) {
            cleaned += char.toLowerCase();
        }
    }
    
    // 使用双指针验证是否为回文串
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
};

// 方法二：双指针法（优化版，一次遍历）
var isPalindromeOptimized = function(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // 跳过非字母数字字符
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        // 比较字符（转换为小写）
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
};

// 辅助函数：判断是否为字母或数字
function isAlphanumeric(char) {
    return (char >= 'a' && char <= 'z') || 
           (char >= 'A' && char <= 'Z') || 
           (char >= '0' && char <= '9');
}

// 方法三：使用正则表达式
var isPalindromeRegex = function(s) {
    // 移除非字母数字字符并转换为小写
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // 使用双指针验证
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
};

// 测试用例
console.log("=== 验证回文串测试 ===");

// 测试用例1
console.log("测试用例1:");
console.log('输入: s = "A man, a plan, a canal: Panama"');
console.log("输出:", isPalindrome("A man, a plan, a canal: Panama")); // 期望: true

// 测试用例2
console.log("\n测试用例2:");
console.log('输入: s = "race a car"');
console.log("输出:", isPalindrome("race a car")); // 期望: false

// 测试用例3
console.log("\n测试用例3:");
console.log('输入: s = " "');
console.log("输出:", isPalindrome(" ")); // 期望: true

// 测试用例4
console.log("\n测试用例4:");
console.log('输入: s = "racecar"');
console.log("输出:", isPalindrome("racecar")); // 期望: true

// 测试用例5
console.log("\n测试用例5:");
console.log('输入: s = "0P"');
console.log("输出:", isPalindrome("0P")); // 期望: false

