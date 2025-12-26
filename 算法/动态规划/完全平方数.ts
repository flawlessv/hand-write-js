/**
 * LeetCode 279. 完全平方数
 * LeetCode: https://leetcode.cn/problems/perfect-squares/
 * 
 * 题目描述：
 * 给你一个整数 n，返回 和为 n 的完全平方数的最少数量。
 * 
 * 完全平方数是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。
 * 例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
 * 
 * 示例：
 * 输入：n = 12
 * 输出：3
 * 解释：12 = 4 + 4 + 4
 * 
 * 输入：n = 13
 * 输出：2
 * 解释：13 = 4 + 9
 * 
 * 输入：n = 1
 * 输出：1
 * 解释：1 = 1
 * 
 * 解题思路：
 * 这是一个完全背包问题的变种，可以用动态规划解决。
 * 
 * 状态定义：
 * dp[i] 表示组成数字 i 所需的最少完全平方数的个数
 * 
 * 状态转移方程：
 * 对于每个数字 i，遍历所有可能的完全平方数 j*j（j*j <= i）
 * dp[i] = min(dp[i], dp[i - j*j] + 1)
 * 
 * 初始状态：
 * dp[0] = 0（组成0需要0个完全平方数）
 * 
 * 时间复杂度：O(n * sqrt(n))
 * 空间复杂度：O(n)
 * 
 * 优化思路：
 * 1. 可以使用数学定理（四平方和定理）进行优化
 * 2. 可以使用 BFS 方法求解
 */

/**
 * 方法一：动态规划（完全背包问题）
 * 
 * 核心思路：
 * 将问题转化为完全背包问题：
 * - 物品：完全平方数（1, 4, 9, 16, ...）
 * - 背包容量：n
 * - 目标：用最少的完全平方数装满背包
 * 
 * 状态定义：
 * dp[i] 表示组成数字 i 所需的最少完全平方数的个数
 * 
 * 状态转移方程：
 * 对于每个数字 i，尝试所有可能的完全平方数 j*j（j*j <= i）
 * dp[i] = min(dp[i], dp[i - j*j] + 1)
 * 
 * 解释：
 * - dp[i - j*j] + 1：使用 j*j 这个完全平方数，再加上组成 (i - j*j) 的最少个数
 * - 取最小值：在所有可能的 j 中选择最优解
 * 
 * 初始状态：
 * dp[0] = 0：组成 0 需要 0 个完全平方数
 * dp[i] = Infinity：初始化为无穷大，表示暂时无法组成
 */
function numSquares(n: number): number {
  // 创建 dp 数组，dp[i] 表示组成 i 的最少完全平方数个数
  const dp: number[] = new Array(n + 1).fill(Infinity);
  
  // 初始状态：组成 0 需要 0 个完全平方数
  dp[0] = 0;
  
  // 遍历从 1 到 n 的每个数字
  for (let i = 1; i <= n; i++) {
    // 尝试所有可能的完全平方数 j*j（j*j <= i）
    for (let j = 1; j * j <= i; j++) {
      const square = j * j; // 当前完全平方数
      // 状态转移：使用 square 这个完全平方数
      // dp[i] = min(当前值, 使用 square 后的值)
      dp[i] = Math.min(dp[i], dp[i - square] + 1);
    }
  }
  
  return dp[n];
}

/**
 * 方法二：动态规划（预计算完全平方数）
 * 
 * 优化思路：
 * 先计算出所有小于等于 n 的完全平方数，然后遍历这些平方数
 * 这样可以避免重复计算 j*j
 */
function numSquaresOptimized(n: number): number {
  const dp: number[] = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  
  // 预计算所有小于等于 n 的完全平方数
  const squares: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    squares.push(i * i);
  }
  
  // 遍历每个数字
  for (let i = 1; i <= n; i++) {
    // 遍历所有完全平方数
    for (const square of squares) {
      if (square > i) break; // 如果平方数大于当前数字，跳出
      dp[i] = Math.min(dp[i], dp[i - square] + 1);
    }
  }
  
  return dp[n];
}

/**
 * 方法三：数学优化（四平方和定理）
 * 
 * 四平方和定理（Lagrange's four-square theorem）：
 * 任何正整数都可以表示为最多 4 个完全平方数的和
 * 
 * 特殊情况：
 * 1. 如果 n 是完全平方数，返回 1
 * 2. 如果 n = 4^a * (8b + 7)，返回 4（需要 4 个完全平方数）
 * 3. 如果 n 可以表示为两个完全平方数的和，返回 2
 * 4. 否则返回 3
 * 
 * 这个方法时间复杂度为 O(sqrt(n))，空间复杂度为 O(1)
 */
function numSquaresMath(n: number): number {
  // 判断是否为完全平方数
  const isSquare = (num: number): boolean => {
    const sqrt = Math.floor(Math.sqrt(num));
    return sqrt * sqrt === num;
  };
  
  // 情况1：n 是完全平方数
  if (isSquare(n)) return 1;
  
  // 情况2：检查是否符合 n = 4^a * (8b + 7) 的形式
  let temp = n;
  while (temp % 4 === 0) {
    temp /= 4;
  }
  if (temp % 8 === 7) return 4;
  
  // 情况3：检查是否可以表示为两个完全平方数的和
  for (let i = 1; i * i <= n; i++) {
    if (isSquare(n - i * i)) {
      return 2;
    }
  }
  
  // 情况4：其他情况返回 3
  return 3;
}

/**
 * 方法四：BFS（广度优先搜索）
 * 
 * 思路：
 * 将问题转化为图的最短路径问题
 * - 节点：当前数字
 * - 边：减去一个完全平方数
 * - 目标：找到从 n 到 0 的最短路径
 * 
 * 时间复杂度：O(n * sqrt(n))
 * 空间复杂度：O(n)
 */
function numSquaresBFS(n: number): number {
  // 如果 n 是完全平方数，直接返回 1
  const sqrt = Math.floor(Math.sqrt(n));
  if (sqrt * sqrt === n) return 1;
  
  // 使用队列进行 BFS
  const queue: number[] = [n];
  const visited: Set<number> = new Set([n]);
  let level = 0;
  
  while (queue.length > 0) {
    level++;
    const size = queue.length;
    
    // 遍历当前层的所有节点
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      
      // 尝试减去所有可能的完全平方数
      for (let j = 1; j * j <= current; j++) {
        const next = current - j * j;
        
        // 如果到达 0，返回层数
        if (next === 0) return level;
        
        // 如果未访问过，加入队列
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }
  }
  
  return level;
}

// 测试用例
console.log("=== 完全平方数测试 ===");
const testCases = [1, 4, 12, 13, 43, 100];

console.log("\n【方法一：动态规划（标准）】");
testCases.forEach(n => {
  console.log(`n = ${n}, 最少需要 ${numSquares(n)} 个完全平方数`);
});

console.log("\n【方法二：动态规划（优化）】");
testCases.forEach(n => {
  console.log(`n = ${n}, 最少需要 ${numSquaresOptimized(n)} 个完全平方数`);
});

console.log("\n【方法三：数学优化（四平方和定理）】");
testCases.forEach(n => {
  console.log(`n = ${n}, 最少需要 ${numSquaresMath(n)} 个完全平方数`);
});

console.log("\n【方法四：BFS】");
testCases.forEach(n => {
  console.log(`n = ${n}, 最少需要 ${numSquaresBFS(n)} 个完全平方数`);
});

// 详细解析示例
console.log("\n=== 详细解析：n = 12 ===");
console.log("12 可以表示为：");
console.log("  12 = 4 + 4 + 4  (3个完全平方数)");
console.log("  12 = 9 + 1 + 1 + 1  (4个完全平方数)");
console.log("最少需要 3 个完全平方数");
console.log(`验证：numSquares(12) = ${numSquares(12)}`);

export {};

