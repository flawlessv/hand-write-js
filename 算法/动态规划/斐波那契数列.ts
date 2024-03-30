function fib(n: number): number {
  if (n <= 1) return n;
  // 1:定义状态和2.初始化状态
  let prve = 0;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    // 3：状态转移方程
    const newValue = prve + cur;
    prve = cur;
    cur = newValue;
  }
  //   4.计算最终的结果
  return cur;
}

function fib2(n: number): number {
  /**
      dp[i]: 第i个斐波那契数
      dp[0]: 0;
      dp[1]：1；
      ...
      dp[i] = dp[i - 1] + dp[i - 2];
   */
  const dp: number[] = [];
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};