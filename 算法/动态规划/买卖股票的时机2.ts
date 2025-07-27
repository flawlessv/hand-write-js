//贪心
function maxProfit(prices: number[]): number {
  let resProfit: number = 0;
  for (let i = 1, length = prices.length; i < length; i++) {
      if (prices[i] > prices[i - 1]) {
          resProfit += prices[i] - prices[i - 1];
      }
  }
  return resProfit;
};
//动态规划
function maxProfitDP(prices: number[]): number {
  const n = prices.length;
  // dp[i][0]: 第i天不持有股票的最大利润
  // dp[i][1]: 第i天持有股票的最大利润
  const dp: number[][] = Array(n).fill(0).map(() => Array(2).fill(0));
  
  dp[0][0] = 0;        // 第0天不持有股票
  dp[0][1] = -prices[0]; // 第0天持有股票（买入）
  
  for (let i = 1; i < n; i++) {
    // 今天不持有股票 = max(昨天不持有, 昨天持有今天卖出)
    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
    // 今天持有股票 = max(昨天持有, 昨天不持有今天买入)
    dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i]);
  }
  
  return dp[n-1][0]; // 最后一天不持有股票
}