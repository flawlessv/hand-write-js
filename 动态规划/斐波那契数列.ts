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
