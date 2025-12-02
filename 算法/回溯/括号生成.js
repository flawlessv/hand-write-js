/**
 * LeetCode 22. 括号生成
 * LeetCode: https://leetcode.cn/problems/generate-parentheses/
 * 
 * 题目描述：
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且有效的括号组合。
 * 
 * 示例 1：
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 * 
 * 示例 2：
 * 输入：n = 1
 * 输出：["()"]
 * 
 * 提示：
 * - 1 <= n <= 8
 * 

 * 
 * 回溯算法的模板：
 * function backtrack(路径, 选择列表) {
 *     if (满足结束条件) {
 *         将路径加入结果;
 *         return;
 *     }
 *     
 *     for (选择 in 选择列表) {
 *         做选择;
 *         backtrack(路径, 选择列表);
 *         撤销选择;  // 关键：回溯的核心
 *     }
 * }
 * 
 * ========== 括号生成的解题思路 ==========
 * 
 * 1. 问题分析：
 *    - 需要生成 n 对有效括号
 *    - 有效括号：任意时刻左括号数量 >= 右括号数量
 *    - 最终左括号数量 = 右括号数量 = n
 * 
 * 2. 回溯策略：
 *    - 每一步可以选择：添加左括号 '(' 或 添加右括号 ')'
 *    - 约束条件：
 *      a) 左括号数量不能超过 n
 *      b) 右括号数量不能超过左括号数量（保证有效性）
 *    - 结束条件：当前字符串长度 = 2 * n
 * 
 * 3. 剪枝优化：
 *    - 如果左括号数量 < 右括号数量，说明无效，直接返回
 *    - 如果左括号数量 > n，说明超出限制，直接返回
 * 
 * 时间复杂度：O(4^n / √n) - 卡特兰数的复杂度
 * 空间复杂度：O(n) - 递归栈的深度
 */

/**
 * 标准解法：回溯算法
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const result = [];
//     开始: backtrack('', 0, 0)
//   ├─ 添加 '(' → backtrack('(', 1, 0)
//   │   ├─ 添加 '(' → backtrack('((', 2, 0)
//   │   │   ├─ 添加 ')' → backtrack('(()', 2, 1)
//   │   │   │   └─ 添加 ')' → backtrack('(())', 2, 2) ✓ 完成！保存到result
//   │   │   └─ 不能添加 '(' (left已经等于2)
//   │   └─ 添加 ')' → backtrack('()', 1, 1)
//   │       ├─ 添加 '(' → backtrack('()(', 2, 1)
//   │       │   └─ 添加 ')' → backtrack('()()', 2, 2) ✓ 完成！保存到result
//   │       └─ 不能添加 ')' (right已经等于left)
//   └─ 不能添加 ')' (right不能大于left)
    /**
     * 回溯函数
     * @param {string} current - 当前构建的字符串
     * @param {number} left - 已使用的左括号数量
     * @param {number} right - 已使用的右括号数量
     */
    function backtrack(current, left, right) {
        // 结束条件：字符串长度达到 2*n
        if(current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        // 选择1：添加左括号
        // 约束：左括号数量不能超过 n
        if(left < n) {
            backtrack(current + '(', left + 1, right);
        }
        
        // 选择2：添加右括号
        // 约束：右括号数量不能超过左括号数量（保证有效性）
        if(right < left) {
            backtrack(current + ')', left, right + 1);
        }
    }
    
    // 从空字符串开始回溯
    backtrack('', 0, 0);
    
    return result;
};

// 测试用例
console.log("=== 括号生成测试 ===");

console.log("\n测试用例1: n = 3");
console.log("输出:", generateParenthesis(3));
// 期望: ["((()))","(()())","(())()","()(())","()()()"]

console.log("\n测试用例2: n = 1");
console.log("输出:", generateParenthesis(1));
// 期望: ["()"]

console.log("\n测试用例3: n = 2");
console.log("输出:", generateParenthesis(2));
// 期望: ["(())","()()"]

