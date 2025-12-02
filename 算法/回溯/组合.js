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

// ========== 方法一：不带剪枝优化（基础版本） ==========
/**
 * 基础回溯算法，不进行剪枝优化
 * 
 * 时间复杂度：O(C(n,k) × k) - C(n,k) 是组合数
 * 空间复杂度：O(k) - 递归栈深度和路径数组
 * 
 * 特点：代码更简单，但会进行一些不必要的递归
 */
var combine = function(n, k) {
    const result = [];
    const path = [];
    
    /**
     * 回溯函数（无剪枝）
     * @param {number} startIndex - 当前选择的起始位置（避免重复）
     */
    function backtrack(startIndex) {
        // 结束条件：路径长度等于 k
        if(path.length === k) {
            result.push([...path]);
            return;
        }
        
        // 遍历所有可能的选择（无剪枝，遍历到 n）
        for(let i = startIndex; i <= n; i++) {
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

// ========== 方法二：带剪枝优化（推荐版本） ==========
/**
 * 回溯算法 + 剪枝优化
 * 
 * 剪枝原理：
 * - 如果剩余可选择的数字数量 < 还需要选择的数字数量，直接跳过
 * - 剩余数字数量：n - i + 1
 * - 还需要选择的数字数量：k - path.length
 * - 剪枝条件：n - i + 1 < k - path.length
 * - 即：i > n - (k - path.length) + 1
 * - 所以循环条件改为：i <= n - (k - path.length) + 1
 * 
 * 时间复杂度：O(C(n,k) × k) - 虽然复杂度相同，但实际运行更快
 * 空间复杂度：O(k) - 递归栈深度和路径数组
 * 
 * 特点：通过剪枝减少不必要的递归，提高效率
 */
var combineOptimized = function(n, k) {
    const result = [];
    const path = [];
    
    /**
     * 回溯函数（带剪枝）
     * @param {number} startIndex - 当前选择的起始位置（避免重复）
     */
    function backtrack(startIndex) {
        // 结束条件：路径长度等于 k
        if(path.length === k) {
            result.push([...path]);
            return;
        }
        
        // 遍历所有可能的选择
        // 剪枝优化：只遍历有可能形成有效组合的数字
        // 如果剩余数字数量 < 还需要选择的数字数量，就不需要继续了
        // 例如：n=4, k=2, path.length=0, 剩余需要2个数字
        //   当 i=4 时，剩余数字只有 [4]（1个），无法组成2个数字的组合，可以跳过

        // 剪枝条件：
        // 剩余数字数量：n - i + 1
        // 还需要选择的数字数量：k - path.length
        // 如果 n - i + 1 < k - path.length，说明无法形成有效组合，可以跳过
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

// ========== 测试用例 ==========
console.log("=== 组合测试 ===");

console.log("\n测试用例1: n = 4, k = 2");
console.log("基础版本（无剪枝）:", combine(4, 2));
console.log("优化版本（有剪枝）:", combineOptimized(4, 2));
// 期望: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

console.log("\n测试用例2: n = 1, k = 1");
console.log("基础版本（无剪枝）:", combine(1, 1));
console.log("优化版本（有剪枝）:", combineOptimized(1, 1));
// 期望: [[1]]

console.log("\n测试用例3: n = 3, k = 3");
console.log("基础版本（无剪枝）:", combine(3, 3));
console.log("优化版本（有剪枝）:", combineOptimized(3, 3));
// 期望: [[1,2,3]]

console.log("\n=== 剪枝效果对比 ===");
console.log("示例：n = 5, k = 3");
console.log("基础版本会尝试所有可能，包括：");
console.log("  - i=4 时，即使剩余数字 [4,5] 只有2个，无法组成3个数字的组合，仍会递归");
console.log("  - i=5 时，即使剩余数字 [5] 只有1个，无法组成3个数字的组合，仍会递归");
console.log("优化版本会跳过这些无效情况，直接终止循环");
console.log("\n基础版本（无剪枝）:", combine(5, 3));
console.log("优化版本（有剪枝）:", combineOptimized(5, 3));