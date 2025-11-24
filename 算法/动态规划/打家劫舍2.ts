/**
 * LeetCode 213. 打家劫舍 II
 * LeetCode: https://leetcode.cn/problems/house-robber-ii/
 * 
 * 题目描述：
 * 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。
 * 这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。
 * 同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，今晚能够偷窃到的最高金额。
 * 
 * 示例：
 * 输入：nums = [2,3,2]
 * 输出：3
 * 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
 * 
 * 输入：nums = [1,2,3,1]
 * 输出：4
 * 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
 *      偷窃到的最高金额 = 1 + 3 = 4 。
 * 
 * 输入：nums = [1,2,3]
 * 输出：3
 * 
 * 解题思路：
 * 这是打家劫舍问题的变种，增加了环形约束。
 * 
 * 核心思想：
 * 由于房屋围成一圈，第一间和最后一间房屋相邻，不能同时偷窃。
 * 因此可以分为两种情况：
 * 1. 偷窃第一间房屋，则不能偷窃最后一间房屋：范围 [0, n-2]
 * 2. 不偷窃第一间房屋，则可以考虑最后一间房屋：范围 [1, n-1]
 * 
 * 对这两种情况分别使用打家劫舍 I 的算法，取最大值。
 * 
 * 状态定义：
 * dp[i] 表示在给定范围内前 i 间房屋能偷窃到的最高金额
 * 
 * 状态转移方程：
 * dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n) - 可优化为 O(1)
 */

function rob(nums: number[]): number {
    const length: number = nums.length;
    if (length === 0) return 0;
    if (length === 1) return nums[0];
    if (length === 2) return Math.max(nums[0], nums[1]);
    
    // 情况1：偷第一间房屋，不偷最后一间房屋 [0, length-2]
    // 情况2：不偷第一间房屋，可以偷最后一间房屋 [1, length-1]
    return Math.max(
        robRange(nums, 0, length - 2),  // 偷第一间，不偷最后一间
        robRange(nums, 1, length - 1)   // 不偷第一间，可偷最后一间
    );
}

// 在指定范围内进行打家劫舍（打家劫舍 I 的逻辑）
function robRange(nums: number[], start: number, end: number): number {
    const dp: number[] = [];
    dp[start] = nums[start];
    dp[start + 1] = Math.max(nums[start], nums[start + 1]);
    
    for (let i = start + 2; i <= end; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[end];
}


// 测试用例
console.log("=== 打家劫舍 II 测试 ===");
const testCases = [
    [2, 3, 2],        // 期望输出: 3
    [1, 2, 3, 1],     // 期望输出: 4
    [1, 2, 3],        // 期望输出: 3
    [5],              // 期望输出: 5
    [1, 2],           // 期望输出: 2
    [2, 7, 9, 3, 1],  // 期望输出: 11
    [5, 1, 3, 9]      // 期望输出: 10
];

testCases.forEach((nums, index) => {
    console.log(`测试用例 ${index + 1}: [${nums.join(', ')}]`);
    console.log(`标准版本: ${rob(nums)}`);
    console.log(`优化版本: ${robOptimized(nums)}`);
    console.log('---');
});
export {}