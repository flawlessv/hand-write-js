function maxprofit(price: number[]): number {
  const n = price.length;
  if (n <= 1) return 0;
  let preValue = 0;
  let minValue = price[0];
  for (let i = 1; i < n; i++) {
    preValue = Math.max(preValue, price[i] - minValue);
    minValue = Math.min(minValue, price[i]);
  }

  return preValue;
}
console.log(maxprofit([1, 7, 5, 6, 2, 5, 8, 4]));
