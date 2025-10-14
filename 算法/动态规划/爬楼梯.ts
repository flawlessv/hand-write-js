/**
 * LeetCode 70. 爬楼梯
 * LeetCode: https://leetcode.cn/problems/climbing-stairs/
 * 
 * 题目描述：
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 
 * 示例：
 * 输入：n = 2
 * 输出：2
 * 解释：有两种方法可以爬到楼顶。
 * 1. 1 阶 + 1 阶
 * 2. 2 阶
 * 
 * 输入：n = 3
 * 输出：3
 * 解释：有三种方法可以爬到楼顶。
 * 1. 1 阶 + 1 阶 + 1 阶
 * 2. 1 阶 + 2 阶
 * 3. 2 阶 + 1 阶
 * 
 * 解题思路：
 * 这是一个典型的动态规划问题，本质上是斐波那契数列。
 * 
 * 状态定义：dp[i] 表示爬到第 i 阶楼梯的方法数
 * 状态转移方程：dp[i] = dp[i-1] + dp[i-2]
 * 
 * 解释：要到达第 i 阶，可以从第 i-1 阶爬 1 步，或从第 i-2 阶爬 2 步
 * 
 * 边界条件：
 * dp[1] = 1 (只有一种方法：爬 1 阶)
 * dp[2] = 2 (两种方法：1+1 或 2)
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n) - 可优化为 O(1)
 */

// 方法一：动态规划（使用数组）
function climbStairs(n: number): number {
  // 边界情况处理
  if (n <= 2) return n;
  
  // 创建 dp 数组
  const dp: number[] = new Array(n + 1);
  
  // 初始化边界条件
  dp[1] = 1; // 爬到第1阶的方法数
  dp[2] = 2; // 爬到第2阶的方法数
  
  // 状态转移：从第3阶开始计算
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// 方法二：动态规划（空间优化版本）
function climbStairsOptimized(n: number): number {
  // 边界情况处理
  if (n <= 2) return n;
  
  // 只需要保存前两个状态
  let prev2 = 1; // dp[i-2]
  let prev1 = 2; // dp[i-1]
  let current = 0; // dp[i]
  
  // 从第3阶开始计算
  for (let i = 3; i <= n; i++) {
    current = prev1 + prev2; // dp[i] = dp[i-1] + dp[i-2]
    
    // 更新状态
    prev2 = prev1;
    prev1 = current;
  }
  
  return current;
}

// 方法三：递归 + 记忆化（自顶向下）
function climbStairsMemo(n: number): number {
  const memo: Map<number, number> = new Map();
  
  function helper(n: number): number {
    // 基础情况
    if (n <= 2) return n;
    
    // 检查是否已经计算过
    if (memo.has(n)) {
      return memo.get(n)!;
    }
    
    // 递归计算并存储结果
    const result = helper(n - 1) + helper(n - 2);
    memo.set(n, result);
    
    return result;
  }
  
  return helper(n);
}

// 方法四：数学公式（斐波那契通项公式）
function climbStairsMath(n: number): number {
  // 斐波那契数列的通项公式
  const sqrt5 = Math.sqrt(5);
  const phi = (1 + sqrt5) / 2; // 黄金比例
  const psi = (1 - sqrt5) / 2;
  
  // F(n+1) = (phi^(n+1) - psi^(n+1)) / sqrt5
  return Math.round((Math.pow(phi, n + 1) - Math.pow(psi, n + 1)) / sqrt5);
}

// 测试用例
console.log("=== 爬楼梯算法测试 ===");

const testCases = [1, 2, 3, 4, 5, 10, 20];

testCases.forEach(n => {
  console.log(`\nn = ${n}:`);
  console.log(`动态规划（数组）: ${climbStairs(n)}`);
  console.log(`动态规划（优化）: ${climbStairsOptimized(n)}`);
  console.log(`递归+记忆化: ${climbStairsMemo(n)}`);
  console.log(`数学公式: ${climbStairsMath(n)}`);
});

// 性能测试
console.log("\n=== 性能对比 ===");
const largeN = 40;

console.time("动态规划（数组）");
console.log(`n=${largeN}, 结果: ${climbStairs(largeN)}`);
console.timeEnd("动态规划（数组）");

console.time("动态规划（优化）");
console.log(`n=${largeN}, 结果: ${climbStairsOptimized(largeN)}`);
console.timeEnd("动态规划（优化）");

console.time("递归+记忆化");
console.log(`n=${largeN}, 结果: ${climbStairsMemo(largeN)}`);
console.timeEnd("递归+记忆化");

// 验证规律：每个数都是前两个数的和
console.log("\n=== 验证斐波那契规律 ===");
for (let i = 1; i <= 10; i++) {
  console.log(`f(${i}) = ${climbStairs(i)}`);
}
