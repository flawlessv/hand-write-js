/**
 * LeetCode 322. 零钱兑换
 * LeetCode: https://leetcode.cn/problems/coin-change/
 * 
 * 题目描述：
 * 给你一个整数数组 coins，表示不同面额的硬币；以及一个整数 amount，表示总金额。
 * 计算并返回可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 
 * 你可以认为每种硬币的数量是无限的。
 * 
 * 示例：
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3
 * 解释：11 = 5 + 5 + 1
 * 
 * 输入：coins = [2], amount = 3
 * 输出：-1
 * 解释：无法用面额为 2 的硬币组成总金额 3
 * 
 * 输入：coins = [1], amount = 0
 * 输出：0
 * 解释：总金额为 0 时不需要任何硬币
 * 
 * 解题思路：
 * 这是一个完全背包问题，可以用动态规划解决。
 * 
 * 状态定义：
 * dp[i] 表示凑成金额 i 所需的最少硬币个数
 * 
 * 状态转移方程：
 * 对于每个金额 i，遍历所有硬币面额 coin
 * 如果 coin <= i，则：dp[i] = min(dp[i], dp[i - coin] + 1)
 * 
 * 初始状态：
 * dp[0] = 0（凑成金额0需要0个硬币）
 * dp[i] = Infinity 或 amount + 1（表示无法凑成，初始化为一个较大的值）
 * 
 * 时间复杂度：O(amount * coins.length)
 * 空间复杂度：O(amount)
 * 
 * 注意：
 * 1. 需要处理无法凑成的情况，返回 -1
 * 2. 需要处理 amount = 0 的情况
 * 3. 可以优化空间复杂度，但通常不需要
 */

/**
 * 方法一：动态规划（完全背包问题）
 * 
 * 核心思路：
 * 这是一个完全背包问题：
 * - 物品：硬币（每种硬币可以使用无限次）
 * - 背包容量：amount
 * - 目标：用最少的硬币装满背包
 * 
 * 状态定义：
 * dp[i] 表示凑成金额 i 所需的最少硬币个数
 * 
 * 状态转移方程：
 * 对于每个金额 i，遍历所有硬币面额 coin
 * 如果 coin <= i，则：dp[i] = min(dp[i], dp[i - coin] + 1)
 * 
 * 解释：
 * - dp[i - coin] + 1：使用 coin 面额的硬币，再加上凑成 (i - coin) 的最少硬币数
 * - 取最小值：在所有可能的硬币中选择最优解
 * 
 * 初始状态：
 * dp[0] = 0：凑成金额 0 需要 0 个硬币
 * dp[i] = Infinity：初始化为无穷大，表示暂时无法凑成
 * 
 * 最终结果：
 * 如果 dp[amount] === Infinity，返回 -1（无法凑成）
 * 否则返回 dp[amount]
 */
function coinChange(coins: number[], amount: number): number {
  // 边界情况：如果金额为 0，不需要任何硬币
  if (amount === 0) return 0;
  
  // 创建 dp 数组，dp[i] 表示凑成金额 i 的最少硬币数
  // 初始化为 Infinity，表示暂时无法凑成
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  
  // 初始状态：凑成金额 0 需要 0 个硬币
  dp[0] = 0;
  
  // 遍历从 1 到 amount 的每个金额
  for (let i = 1; i <= amount; i++) {
    // 遍历所有硬币面额
    for (const coin of coins) {
      // 只有当硬币面额小于等于当前金额时，才能使用该硬币
      if (coin <= i) {
        // 状态转移：使用 coin 面额的硬币
        // dp[i] = min(当前值, 使用 coin 后的值)
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  // 如果 dp[amount] 仍然是 Infinity，说明无法凑成，返回 -1
  // 否则返回最少硬币数
  return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * 方法二：动态规划（使用 amount + 1 作为初始值）
 * 
 * 优化思路：
 * 使用 amount + 1 代替 Infinity，因为最多需要 amount 个硬币（全部用 1 元硬币）
 * 这样在最后判断时更直观
 */
function coinChangeOptimized(coins: number[], amount: number): number {
  if (amount === 0) return 0;
  
  // 使用 amount + 1 作为初始值（因为最多需要 amount 个 1 元硬币）
  const dp: number[] = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  
  // 遍历每个金额
  for (let i = 1; i <= amount; i++) {
    // 遍历每个硬币
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  // 如果 dp[amount] > amount，说明无法凑成
  return dp[amount] > amount ? -1 : dp[amount];
}

/**
 * 方法三：递归 + 记忆化（自顶向下）
 * 
 * 思路：
 * 从目标金额 amount 开始，递归地减去硬币面额
 * 使用记忆化避免重复计算
 * 
 * 时间复杂度：O(amount * coins.length)
 * 空间复杂度：O(amount)
 */
function coinChangeMemo(coins: number[], amount: number): number {
  // 记忆化数组
  const memo: Map<number, number> = new Map();
  
  // 递归函数
  const dfs = (target: number): number => {
    // 基础情况
    if (target === 0) return 0;
    if (target < 0) return -1;
    
    // 检查是否已经计算过
    if (memo.has(target)) {
      return memo.get(target)!;
    }
    
    let minCoins = Infinity;
    
    // 尝试使用每个硬币
    for (const coin of coins) {
      const result = dfs(target - coin);
      // 如果能够凑成，更新最小值
      if (result !== -1) {
        minCoins = Math.min(minCoins, result + 1);
      }
    }
    
    // 保存结果
    const finalResult = minCoins === Infinity ? -1 : minCoins;
    memo.set(target, finalResult);
    
    return finalResult;
  };
  
  return dfs(amount);
}

/**
 * 方法四：BFS（广度优先搜索）
 * 
 * 思路：
 * 将问题转化为图的最短路径问题
 * - 节点：当前金额
 * - 边：减去一个硬币面额
 * - 目标：找到从 amount 到 0 的最短路径
 * 
 * 时间复杂度：O(amount * coins.length)
 * 空间复杂度：O(amount)
 */
function coinChangeBFS(coins: number[], amount: number): number {
  if (amount === 0) return 0;
  
  // 使用队列进行 BFS
  const queue: number[] = [amount];
  const visited: Set<number> = new Set([amount]);
  let level = 0;
  
  while (queue.length > 0) {
    level++;
    const size = queue.length;
    
    // 遍历当前层的所有节点
    for (let i = 0; i < size; i++) {
      const current = queue.shift()!;
      
      // 尝试使用每个硬币
      for (const coin of coins) {
        const next = current - coin;
        
        // 如果到达 0，返回层数（即最少硬币数）
        if (next === 0) return level;
        
        // 如果金额有效且未访问过，加入队列
        if (next > 0 && !visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }
  }
  
  // 无法凑成，返回 -1
  return -1;
}

// 测试用例
console.log("=== 零钱兑换测试 ===");

const testCases = [
  { coins: [1, 2, 5], amount: 11 },
  { coins: [2], amount: 3 },
  { coins: [1], amount: 0 },
  { coins: [1, 3, 4], amount: 6 },
  { coins: [2, 5, 10, 1], amount: 27 },
];

console.log("\n【方法一：动态规划（标准）】");
testCases.forEach(({ coins, amount }) => {
  const result = coinChange(coins, amount);
  console.log(`coins = [${coins.join(', ')}], amount = ${amount}`);
  console.log(`最少需要 ${result} 个硬币\n`);
});

console.log("\n【方法二：动态规划（优化）】");
testCases.forEach(({ coins, amount }) => {
  const result = coinChangeOptimized(coins, amount);
  console.log(`coins = [${coins.join(', ')}], amount = ${amount}`);
  console.log(`最少需要 ${result} 个硬币\n`);
});

console.log("\n【方法三：递归 + 记忆化】");
testCases.forEach(({ coins, amount }) => {
  const result = coinChangeMemo(coins, amount);
  console.log(`coins = [${coins.join(', ')}], amount = ${amount}`);
  console.log(`最少需要 ${result} 个硬币\n`);
});

console.log("\n【方法四：BFS】");
testCases.forEach(({ coins, amount }) => {
  const result = coinChangeBFS(coins, amount);
  console.log(`coins = [${coins.join(', ')}], amount = ${amount}`);
  console.log(`最少需要 ${result} 个硬币\n`);
});

// 详细解析示例
console.log("\n=== 详细解析：coins = [1, 2, 5], amount = 11 ===");
console.log("动态规划过程：");
console.log("dp[0] = 0  (金额0需要0个硬币)");
console.log("dp[1] = min(dp[0] + 1) = 1  (使用1元硬币)");
console.log("dp[2] = min(dp[1] + 1, dp[0] + 1) = min(2, 1) = 1  (使用2元硬币)");
console.log("dp[3] = min(dp[2] + 1, dp[1] + 1) = min(2, 2) = 2");
console.log("dp[4] = min(dp[3] + 1, dp[2] + 1) = min(3, 2) = 2");
console.log("dp[5] = min(dp[4] + 1, dp[3] + 1, dp[0] + 1) = min(3, 3, 1) = 1  (使用5元硬币)");
console.log("...");
console.log("dp[11] = min(dp[10] + 1, dp[9] + 1, dp[6] + 1) = 3");
console.log("最优解：11 = 5 + 5 + 1  (3个硬币)");
console.log(`验证：coinChange([1, 2, 5], 11) = ${coinChange([1, 2, 5], 11)}`);

export {};

