/**
 * LeetCode 77. 组合
 * LeetCode: https://leetcode.cn/problems/combinations/
 * 
 * 题目描述：
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 * 你可以按 任何顺序 返回答案。
 * 
 * 示例 1：
 * 输入：n = 4, k = 2
 * 输出：[[2,4],[3,4],[2,3],[1,2],[1,3],[1,4]]
 * 
 * 示例 2：
 * 输入：n = 1, k = 1
 * 输出：[[1]]
 * 
 * 提示：
 * - 1 <= n <= 20
 * - 1 <= k <= n
 * 

 * 
 * ========== 组合的解题思路 ==========
 * 
 * 1. 问题分析：
 *    - 从 [1, n] 中选择 k 个数
 *    - 组合与排列的区别：组合不考虑顺序，[1,2] 和 [2,1] 是同一个组合
 *    - 因此需要避免重复：只选择比当前元素大的元素
 * 
 * 2. 回溯策略：
 *    - 路径（path）：当前已选择的数字
 *    - 选择列表：从 startIndex 到 n 的数字
 *    - 结束条件：路径长度 = k
 * 
 * 3. 剪枝优化：
 *    - 如果剩余可选择的数字数量 < 还需要选择的数字数量，直接返回
 *    - 即：n - i + 1 < k - path.length，可以提前终止
 * 
 * 时间复杂度：O(C(n,k) × k) - C(n,k) 是组合数
 * 空间复杂度：O(k) - 递归栈深度和路径数组
 */

/**
 * 标准解法：回溯算法
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const result = [];
    const path = [];
    
    /**
     * 回溯函数
     * @param {number} startIndex - 当前选择的起始位置（避免重复）
     */
    function backtrack(startIndex) {
        // 结束条件：路径长度等于 k
        if(path.length === k) {
            result.push([...path]);
            return;
        }
        
        // 遍历所有可能的选择
        // 剪枝优化：n - i + 1 >= k - path.length
        // 即：i <= n - (k - path.length) + 1
        for(let i = startIndex; i <= n - (k - path.length) + 1; i++) {
            // 做选择：将当前数字加入路径
            path.push(i);
            
            // 递归：继续选择下一个数字（从 i+1 开始，避免重复）
            backtrack(i + 1);
            
            // 撤销选择：回溯的核心步骤
            path.pop();
        }
    }
    
    // 从 1 开始回溯
    backtrack(1);
    
    return result;
};

// 测试用例
console.log("=== 组合测试 ===");

console.log("\n测试用例1: n = 4, k = 2");
console.log("输出:", combine(4, 2));
// 期望: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

console.log("\n测试用例2: n = 1, k = 1");
console.log("输出:", combine(1, 1));
// 期望: [[1]]

console.log("\n测试用例3: n = 3, k = 3");
console.log("输出:", combine(3, 3));
// 期望: [[1,2,3]]