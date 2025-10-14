/**
 * LeetCode 121. 买卖股票的最佳时机
 * LeetCode: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/
 * 
 * 题目描述：
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择某一天买入这只股票，并选择在未来的某一天卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 * 
 * 注意：你不能在买入股票前卖出股票。
 * 
 * 示例：
 * 输入：[7,1,5,3,6,4]
 * 输出：5
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 *      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
 * 
 * 输入：prices = [7,6,4,3,1]
 * 输出：0
 * 解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
 * 
 * 解题思路：
 * 
 * 方法一：贪心算法（推荐）
 * 核心思想：维护一个最小价格，遍历过程中计算当前价格与最小价格的差值
 * - 遍历数组，维护到目前为止的最低价格
 * - 计算当前价格卖出能获得的最大利润
 * - 更新全局最大利润
 * 
 * 方法二：动态规划
 * 状态定义：
 * - dp[i][0]: 第i天不持有股票的最大利润
 * - dp[i][1]: 第i天持有股票的最大利润
 * 
 * 状态转移方程：
 * - dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])  // 不持有：保持不持有 或 卖出
 * - dp[i][1] = max(dp[i-1][1], -prices[i])             // 持有：保持持有 或 买入（只能买入一次）
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */

// 方法一：贪心算法（推荐）
var maxProfit = function(prices) {
  let lowerPrice = prices[0]; // 重点是维护这个最小值（贪心的思想）
  let profit = 0;             // 最大利润
  
  for(let i = 0; i < prices.length; i++){
      lowerPrice = Math.min(lowerPrice, prices[i]); // 贪心地选择左面的最小价格
      profit = Math.max(profit, prices[i] - lowerPrice); // 遍历一趟就可以获得最大利润
  }
  return profit;
};

// 方法二：动态规划
function maxProfitDP(prices) {
  const n = prices.length;
  if (n <= 1) return 0;
  
  // dp[i][0]: 第i天不持有股票的最大利润
  // dp[i][1]: 第i天持有股票的最大利润
  const dp = Array(n).fill(0).map(() => Array(2).fill(0));
  
  // 初始状态
  dp[0][0] = 0;           // 第0天不持有股票
  dp[0][1] = -prices[0];  // 第0天持有股票（买入）
  
  for (let i = 1; i < n; i++) {
    // 今天不持有股票 = max(昨天不持有, 昨天持有今天卖出)
    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
    // 今天持有股票 = max(昨天持有, 今天买入) - 注意只能买入一次
    dp[i][1] = Math.max(dp[i-1][1], -prices[i]);
  }
  
  return dp[n-1][0]; // 最后一天不持有股票
}


// 测试用例
console.log("=== 买卖股票的最佳时机测试 ===");
const testCases = [
  [7, 1, 5, 3, 6, 4],    // 期望输出: 5
  [7, 6, 4, 3, 1],       // 期望输出: 0
  [1, 2, 3, 4, 5],       // 期望输出: 4
  [2, 4, 1]              // 期望输出: 2
];

testCases.forEach((prices, index) => {
  console.log(`测试用例 ${index + 1}: [${prices.join(', ')}]`);
  console.log(`贪心算法: ${maxProfit(prices)}`);
  console.log(`动态规划: ${maxProfitDP(prices)}`);
  console.log('---');
});