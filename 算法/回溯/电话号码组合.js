/**
 * LeetCode 17. 电话号码的字母组合
 * LeetCode: https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 * 
 * 题目描述：
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 
 * 数字到字母的映射：
 * 2: "abc"
 * 3: "def"
 * 4: "ghi"
 * 5: "jkl"
 * 6: "mno"
 * 7: "pqrs"
 * 8: "tuv"
 * 9: "wxyz"
 * 
 * 示例 1：
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 * 示例 2：
 * 输入：digits = ""
 * 输出：[]
 * 
 * 示例 3：
 * 输入：digits = "2"
 * 输出：["a","b","c"]
 * 
 * 提示：
 * - 0 <= digits.length <= 4
 * - digits[i] 是范围 ['2', '9'] 的一个数字
 * 

 * 
 * ========== 电话号码字母组合的解题思路 ==========
 * 
 * 1. 问题分析：
 *    - 每个数字对应多个字母
 *    - 需要生成所有可能的字母组合
 *    - 组合长度 = 输入数字字符串的长度
 * 
 * 2. 回溯策略：
 *    - 路径（path）：当前已选择的字母
 *    - 选择列表：当前数字对应的所有字母
 *    - 结束条件：路径长度 = 数字字符串长度
 * 
 * 3. 递归过程：
 *    - 处理第 index 个数字
 *    - 遍历该数字对应的所有字母
 *    - 选择字母后，递归处理下一个数字
 *    - 回溯时撤销选择
 * 
 * 时间复杂度：O(4^m × m)，其中 m 是输入数字字符串的长度
 * 空间复杂度：O(m) - 递归栈深度和路径字符串
 */

/**
 * 标准解法：回溯算法
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    // 边界情况：空字符串
    if(digits.length === 0) {
        return [];
    }
    
    // 数字到字母的映射表
    const digitToLetters = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };
    
    const result = [];
    const path = [];
    
    /**
     * 回溯函数
     * @param {number} index - 当前处理的数字索引
     */
    function backtrack(index) {
        // 结束条件：已处理完所有数字
        if(index === digits.length) {
            result.push(path.join(''));
            return;
        }
        
        // 获取当前数字对应的字母串
        const digit = digits[index];
        const letters = digitToLetters[digit];
        
        // 遍历当前数字对应的所有字母
        for(let i = 0; i < letters.length; i++) {
            // 做选择：将当前字母加入路径
            path.push(letters[i]);
            
            // 递归：处理下一个数字
            backtrack(index + 1);
            
            // 撤销选择：回溯的核心步骤
            path.pop();
        }
    }
    
    // 从第一个数字开始回溯
    backtrack(0);
    
    return result;
};

// 测试用例
console.log("=== 电话号码字母组合测试 ===");

console.log("\n测试用例1: digits = '23'");
console.log("输出:", letterCombinations("23"));
// 期望: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

console.log("\n测试用例2: digits = ''");
console.log("输出:", letterCombinations(""));
// 期望: []

console.log("\n测试用例3: digits = '2'");
console.log("输出:", letterCombinations("2"));
// 期望: ["a","b","c"]

console.log("\n测试用例4: digits = '234'");
console.log("输出:", letterCombinations("234"));
// 期望: ["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"]