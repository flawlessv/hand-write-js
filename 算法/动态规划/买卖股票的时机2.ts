/**
 * LeetCode 122. 买卖股票的最佳时机 II
 * 
 * 题目描述：
 * 给定一个数组 prices ，其中 prices[i] 是一支给定股票第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
 * 
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 示例：
 * 输入: prices = [7,1,5,3,6,4]
 * 输出: 7
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
 *      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
 *      总利润: 4 + 3 = 7
 * 
 * 输入: prices = [1,2,3,4,5]
 * 输出: 4
 * 解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
 *      注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
 * 
 * 解题思路：
 * 
 * 方法一：贪心算法（推荐）
 * 核心思想：只要今天价格比昨天高，就在昨天买入今天卖出
 * 这样可以捕获每一段上涨的利润，等价于找到所有上涨区间的利润总和
 * 
 * 方法二：动态规划
 * 状态定义：
 * - dp[i][0]: 第i天不持有股票的最大利润
 * - dp[i][1]: 第i天持有股票的最大利润
 * 
 * 状态转移方程：
 * - dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])  // 不持有：保持不持有 或 卖出
 * - dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])  // 持有：保持持有 或 买入
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1) - 贪心，O(n) - 动态规划（可优化为O(1)）
 */

// 方法一：贪心算法（推荐）
function maxProfit(prices: number[]): number {
  let resProfit: number = 0;
  
  // 遍历每一天，如果今天比昨天价格高，就获得这部分利润
  for (let i = 1, length = prices.length; i < length; i++) {
      if (prices[i] > prices[i - 1]) {
          resProfit += prices[i] - prices[i - 1];
      }
  }
  return resProfit;
}

// 方法二：动态规划
function maxProfitDP(prices: number[]): number {
  const n = prices.length;
  if (n <= 1) return 0;
  
  // dp[i][0]: 第i天不持有股票的最大利润
  // dp[i][1]: 第i天持有股票的最大利润
  const dp: number[][] = Array(n).fill(0).map(() => Array(2).fill(0));
  
  // 初始状态
  dp[0][0] = 0;           // 第0天不持有股票
  dp[0][1] = -prices[0];  // 第0天持有股票（买入）
  
  for (let i = 1; i < n; i++) {
    // 今天不持有股票 = max(昨天不持有, 昨天持有今天卖出)
    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
    // 今天持有股票 = max(昨天持有, 昨天不持有今天买入)
    dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i]);
  }
  
  return dp[n-1][0]; // 最后一天不持有股票
}

// 方法三：动态规划（空间优化）
function maxProfitDPOptimized(prices: number[]): number {
  const n = prices.length;
  if (n <= 1) return 0;
  
  // 只需要保存前一天的状态
  let hold = -prices[0];    // 持有股票的最大利润
  let notHold = 0;          // 不持有股票的最大利润
  
  for (let i = 1; i < n; i++) {
    const newNotHold = Math.max(notHold, hold + prices[i]);
    const newHold = Math.max(hold, notHold - prices[i]);
    
    notHold = newNotHold;
    hold = newHold;
  }
  
  return notHold;
}

// 测试用例
console.log("=== 买卖股票的最佳时机 II 测试 ===");
const testCases = [
  [7, 1, 5, 3, 6, 4],    // 期望输出: 7
  [1, 2, 3, 4, 5],       // 期望输出: 4
  [7, 6, 4, 3, 1],       // 期望输出: 0
  [1, 2, 1, 2, 1]        // 期望输出: 2
];

testCases.forEach((prices, index) => {
  console.log(`测试用例 ${index + 1}: [${prices.join(', ')}]`);
  console.log(`贪心算法: ${maxProfit(prices)}`);
  console.log(`动态规划: ${maxProfitDP(prices)}`);
  console.log(`动态规划优化: ${maxProfitDPOptimized(prices)}`);
  console.log('---');
});
export {};