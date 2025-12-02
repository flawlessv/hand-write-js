/**
 * LeetCode 46. 全排列
 * LeetCode: https://leetcode.cn/problems/permutations/
 * 
 * 题目描述：
 * 给定一个不含重复数字的数组 nums，返回其所有可能的全排列。你可以按任意顺序返回答案。
 * 
 * 示例 1：
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 * 示例 2：
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 * 
 * 示例 3：
 * 输入：nums = [1]
 * 输出：[[1]]
 * 
 * 提示：
 * - 1 <= nums.length <= 6
 * - -10 <= nums[i] <= 10
 * - nums 中的所有整数互不相同
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
 * ========== 全排列的解题思路 ==========
 * 
 * 1. 问题分析：
 *    - 需要生成数组的所有排列
 *    - 每个排列包含所有元素，且每个元素只出现一次
 *    - 排列的顺序不同视为不同的排列
 * 
 * 2. 回溯策略：
 *    - 路径（path）：当前已经选择的元素
 *    - 选择列表（choices）：剩余可选择的元素
 *    - 结束条件：路径长度 = 数组长度
 * 
 * 3. 两种实现方式：
 *    方式一：使用 visited 数组标记已访问的元素
 *    方式二：通过交换元素位置来构建排列
 * 
 * 时间复杂度：O(n! × n) - n! 种排列，每种排列需要 O(n) 时间
 * 空间复杂度：O(n) - 递归栈深度和辅助数组
 */

// ========== 方法一：使用 visited 数组（推荐，更直观） ==========
/**
 * 核心思想：
 * - 使用 visited 数组标记哪些元素已经被使用
 * - 每次选择未使用的元素加入路径
 * - 回溯时撤销选择，恢复 visited 状态
 */
var permute = function(nums) {
    const result = [];
    const path = [];
    const visited = new Array(nums.length).fill(false);
    
    /**
     * 回溯函数
     * @param {number[]} path - 当前路径（已选择的元素）
     * @param {boolean[]} visited - 标记数组，记录哪些元素已使用
     */
    function backtrack(path, visited) {
        // 结束条件：路径长度等于数组长度
        if(path.length === nums.length) {
            // 注意：需要创建新数组，不能直接 push path（引用问题）
            result.push([...path]);
            return;
        }
        
        // 遍历所有可能的选择
        for(let i = 0; i < nums.length; i++) {
            // 约束：跳过已使用的元素
            if(visited[i]) {
                continue;
            }
            
            // 做选择：将当前元素加入路径
            path.push(nums[i]);
            visited[i] = true;
            
            // 递归：继续构建路径
            backtrack(path, visited);
            
            // 撤销选择：回溯的核心步骤
            path.pop();
            visited[i] = false;
        }
    }
    
    // 从空路径开始回溯
    backtrack(path, visited);
    
    return result;
};

// ========== 方法二：通过交换元素（空间优化） ==========
/**
 * 核心思想：
 * - 通过交换元素位置来构建排列
 * - 不需要额外的 visited 数组
 * - 但会修改原数组（需要恢复）
 */
var permuteV2 = function(nums) {
    const result = [];
    
    /**
     * 回溯函数
     * @param {number[]} nums - 当前数组
     * @param {number} start - 当前处理的起始位置
     */
    function backtrack(nums, start) {
        // 结束条件：所有位置都已处理
        if(start === nums.length) {
            result.push([...nums]);
            return;
        }
        
        // 从 start 位置开始，尝试将每个元素交换到 start 位置
        for(let i = start; i < nums.length; i++) {
            // 做选择：交换元素
            [nums[start], nums[i]] = [nums[i], nums[start]];
            
            // 递归：处理下一个位置
            backtrack(nums, start + 1);
            
            // 撤销选择：恢复原状（回溯）
            [nums[start], nums[i]] = [nums[i], nums[start]];
        }
    }
    
    backtrack(nums, 0);
    
    return result;
};

// 测试用例
console.log("=== 全排列测试 ===");

console.log("\n方法一（visited数组）：");
console.log("输入: [1,2,3]");
console.log("输出:", permute([1, 2, 3]));
// 期望: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

console.log("\n方法二（交换元素）：");
console.log("输入: [1,2,3]");
console.log("输出:", permuteV2([1, 2, 3]));
// 期望: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

console.log("\n测试用例2: [0,1]");
console.log("输出:", permute([0, 1]));
// 期望: [[0,1],[1,0]]

console.log("\n测试用例3: [1]");
console.log("输出:", permute([1]));
// 期望: [[1]]

