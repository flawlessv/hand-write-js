/**
 * LeetCode 198. 打家劫舍
 * LeetCode: https://leetcode.cn/problems/house-robber/
 * 
 * 题目描述：
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
 * 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 
 * 给定一个代表每个房屋存放金额的非负整数数组，
 * 计算你不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。
 * 
 * 示例：
 * 输入：[1,2,3,1]
 * 输出：4
 * 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
 *      偷窃到的最高金额 = 1 + 3 = 4
 * 
 * 输入：[2,7,9,3,1]
 * 输出：12
 * 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
 *      偷窃到的最高金额 = 2 + 9 + 1 = 12
 * 
 * 解题思路：
 * 这是一个典型的动态规划问题。
 * 
 * 状态定义：
 * dp[i] 表示前 i 间房屋能偷窃到的最高金额
 * 
 * 状态转移方程：
 * dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 * 
 * 解释：
 * - dp[i-1]：不偷第 i 间房屋，最高金额为前 i-1 间房屋的最高金额
 * - dp[i-2] + nums[i]：偷第 i 间房屋，最高金额为前 i-2 间房屋的最高金额加上第 i 间房屋的金额
 * 
 * 边界条件：
 * - dp[0] = nums[0]：只有一间房屋时，偷这间房屋
 * - dp[1] = max(nums[0], nums[1])：有两间房屋时，偷金额较大的那间
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n) - 可优化为 O(1)
 */

function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  
  const dp: number[] = [];
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  
  // 要么偷当前的，要么不偷当前的，取最大值
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[nums.length - 1];
}

// 空间优化版本
function robOptimized(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  
  // 只需要保存前两个状态
  let prev2 = nums[0];           // dp[i-2]
  let prev1 = Math.max(nums[0], nums[1]); // dp[i-1]
  
  for (let i = 2; i < n; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// 测试用例
console.log("=== 打家劫舍测试 ===");
const testCases = [
  [1, 2, 3, 1],      // 期望输出: 4
  [2, 7, 9, 3, 1],   // 期望输出: 12
  [5, 1, 3, 9],      // 期望输出: 14
  [2, 1, 1, 2]       // 期望输出: 4
];

testCases.forEach((nums, index) => {
  console.log(`测试用例 ${index + 1}: [${nums.join(', ')}]`);
  console.log(`结果: ${rob(nums)}`);
  console.log(`优化版本: ${robOptimized(nums)}`);
  console.log('---');
});
