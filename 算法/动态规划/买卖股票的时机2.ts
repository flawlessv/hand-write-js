function maxProfit(prices: number[]): number {
  let resProfit: number = 0;
  for (let i = 1, length = prices.length; i < length; i++) {
      if (prices[i] > prices[i - 1]) {
          resProfit += prices[i] - prices[i - 1];
      }
  }
  return resProfit;
};