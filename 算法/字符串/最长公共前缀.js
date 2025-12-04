/**
 * LeetCode 14. 最长公共前缀
 * LeetCode: https://leetcode.cn/problems/longest-common-prefix/
 * 
 * 题目描述：
 * 
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 
 * 如果不存在公共前缀，返回空字符串 ""。
 * 
 * 
 * 示例 1：
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 * 
 * 
 * 示例 2：
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 * 
 * 
 * 提示：
 * - 1 <= strs.length <= 200
 * - 0 <= strs[i].length <= 200
 * - strs[i] 仅由小写英文字母组成
 */

/**
 * @param {string[]} strs
 * @return {string}
 * 
 * 解题思路：纵向扫描法
 * 1. 以第一个字符串作为基准
 * 2. 从第一个字符开始，逐个字符比较所有字符串
 * 3. 如果所有字符串在某个位置上的字符都相同，继续比较下一个字符
 * 4. 如果出现不同或某个字符串已经结束，返回当前已匹配的前缀
 * 
 * 时间复杂度：O(m * n)，其中 m 是字符串数组的长度，n 是最短字符串的长度
 * 空间复杂度：O(1)
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return "";
    if (strs.length === 1) return strs[0];
    
    // 以第一个字符串作为基准
    const firstStr = strs[0];
    
    // 从第一个字符开始，逐个字符比较
    for (let i = 0; i < firstStr.length; i++) {
        const char = firstStr[i];
        
        // 检查所有字符串在位置 i 上的字符是否相同
        for (let j = 1; j < strs.length; j++) {
            // 如果某个字符串已经结束，或者字符不匹配，返回当前前缀
            if (i >= strs[j].length || strs[j][i] !== char) {
                return firstStr.substring(0, i);
            }
        }
    }
    
    // 如果第一个字符串的所有字符都匹配，返回第一个字符串
    return firstStr;
};

// 测试用例
console.log("=== 最长公共前缀测试 ===");

// 测试用例1
console.log("测试用例1:");
const strs1 = ["flower","flow","flight"];
console.log("输入:", strs1);
console.log("输出:", longestCommonPrefix([...strs1])); // 期望: "fl"

// 测试用例2
console.log("\n测试用例2:");
const strs2 = ["dog","racecar","car"];
console.log("输入:", strs2);
console.log("输出:", longestCommonPrefix([...strs2])); // 期望: ""

// 测试用例3
console.log("\n测试用例3:");
const strs3 = ["ab", "a"];
console.log("输入:", strs3);
console.log("输出:", longestCommonPrefix([...strs3])); // 期望: "a"

// 测试用例4
console.log("\n测试用例4:");
const strs4 = ["a"];
console.log("输入:", strs4);
console.log("输出:", longestCommonPrefix([...strs4])); // 期望: "a"

