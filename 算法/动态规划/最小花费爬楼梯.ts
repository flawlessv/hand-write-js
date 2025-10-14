/**
 * LeetCode 746. 使用最小花费爬楼梯
 * LeetCode: https://leetcode.cn/problems/min-cost-climbing-stairs/
 * 
 * 题目描述：
 * 数组的每个下标作为一个阶梯，第 i 个阶梯对应着一个非负数的体力花费值 cost[i]（下标从 0 开始）。
 * 每当你爬上一个阶梯你都要花费对应的体力值，一旦支付了相应的体力值，你就可以选择向上爬一个阶梯或者爬两个阶梯。
 * 请你找出达到楼层顶部的最低花费。在开始时，你可以选择从下标为 0 或 1 的元素作为初始阶梯。
 * 
 * 示例：
 * 输入：cost = [10,15,20]
 * 输出：15
 * 解释：最低花费是从 cost[1] 开始，然后走两步到达楼层顶部，一共花费 15 。
 * 
 * 输入：cost = [1,100,1,1,1,100,1,1,100,1]
 * 输出：6
 * 解释：最低花费方式是从 cost[0] 开始，逐个经过那些 1 ，跳过 cost[3] ，一共花费 6 。
 * 
 * 解题思路：
 * 这是一个动态规划问题，类似于爬楼梯，但需要考虑每一步的花费。
 * 
 * 状态定义：
 * dp[i] 表示到达第 i 个位置的最小花费
 * 注意：楼层顶部是 cost.length，不是 cost.length - 1
 * 
 * 状态转移方程：
 * dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
 * 
 * 初始状态：
 * dp[0] = 0 （可以从下标0开始，不需要花费）
 * dp[1] = 0 （可以从下标1开始，不需要花费）
 * 
 * 目标：
 * 求 dp[cost.length]，即到达楼层顶部的最小花费
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */

function minCostClimbingStairs(cost: number[]): number {
    // dp[i] 表示到达第i个位置的最小花费
    // 楼层顶部是第 cost.length 个位置
    const dp = [0, 0]; // dp[0] = 0, dp[1] = 0
    
    for (let i = 2; i <= cost.length; i++) {
        // 到达第i个位置，可以从第i-1个位置爬1步，或从第i-2个位置爬2步
        dp[i] = Math.min(
            dp[i - 1] + cost[i - 1], // 从第i-1个位置爬1步，需要支付cost[i-1]
            dp[i - 2] + cost[i - 2]  // 从第i-2个位置爬2步，需要支付cost[i-2]
        );
    }
    return dp[cost.length];
}


// 测试用例
console.log("=== 使用最小花费爬楼梯测试 ===");
const testCases = [
    [10, 15, 20],                    // 期望输出: 15
    [1, 100, 1, 1, 1, 100, 1, 1, 100, 1], // 期望输出: 6
    [0, 0, 0, 1],                    // 期望输出: 0
    [1, 0, 2, 2]                     // 期望输出: 2
];

testCases.forEach((cost, index) => {
    console.log(`测试用例 ${index + 1}: [${cost.join(', ')}]`);
    console.log(`标准版本: ${minCostClimbingStairs(cost)}`);
    console.log('---');
});
export {}