var maxProfit = function(prices) {
  let lowerPrice = prices[0];// 重点是维护这个最小值（贪心的思想） 
  let profit = 0;
  for(let i = 0; i < prices.length; i++){
      lowerPrice = Math.min(lowerPrice, prices[i]);// 贪心地选择左面的最小价格
      profit = Math.max(profit, prices[i] - lowerPrice);// 遍历一趟就可以获得最大利润
  }
  return profit;
};