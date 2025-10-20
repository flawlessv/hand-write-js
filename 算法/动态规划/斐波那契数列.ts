/**
 * LeetCode 509. 斐波那契数
 * LeetCode: https://leetcode.cn/problems/fibonacci-number/
 * 
 * 题目描述：
 * 斐波那契数列通常用 F(n) 表示，形成的序列称为斐波那契数列。
 * 该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。
 * 
 * 即：F(0) = 0, F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 * 
 * 给定 n，计算 F(n)。
 * 
 * 示例：
 * 输入：n = 2
 * 输出：1
 * 解释：F(2) = F(1) + F(0) = 1 + 0 = 1
 * 
 * 输入：n = 3
 * 输出：2
 * 解释：F(3) = F(2) + F(1) = 1 + 1 = 2
 * 
 * 输入：n = 4
 * 输出：3
 * 解释：F(4) = F(3) + F(2) = 2 + 1 = 3
 * 
 * 解题思路：
 * 这是动态规划的经典问题，有多种解法：
 * 
 * 1. 动态规划（空间优化）：
 *    - 状态定义：F(i) 表示第 i 个斐波那契数
 *    - 状态转移：F(i) = F(i-1) + F(i-2)
 *    - 空间优化：只需保存前两个状态
 *    - 时间复杂度：O(n)，空间复杂度：O(1)
 * 
 * 2. 动态规划（数组）：
 *    - 使用数组存储所有状态
 *    - 时间复杂度：O(n)，空间复杂度：O(n)
 * 
 * 3. 递归（会超时）：
 *    - 直接按定义递归
 *    - 时间复杂度：O(2^n)，存在大量重复计算
 */

// 方法一：动态规划（空间优化版本）- 推荐
function fib(n: number): number {
  if (n <= 1) return n;
  // 1:定义状态和2.初始化状态
  let prve = 0; // F(i-2)
  let cur = 1;  // F(i-1)
  for (let i = 2; i <= n; i++) {
    // 3：状态转移方程 F(i) = F(i-1) + F(i-2)
    const newValue = prve + cur;
    prve = cur;
    cur = newValue;
  }
  //   4.计算最终的结果
  return cur;
}

// 方法二：动态规划（数组版本）
function fib2(n: number): number {
  /**
   * 状态定义：
   * dp[i]: 第i个斐波那契数
   * 
   * 初始状态：
   * dp[0] = 0
   * dp[1] = 1
   * 
   * 状态转移方程：
   * dp[i] = dp[i - 1] + dp[i - 2]
   */
  if (n <= 1) return n;
  
  const dp: number[] = [];
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// 方法三：递归版本（仅供理解，实际会超时）
function fibRecursive(n: number): number {
  // 基础情况
  if (n <= 1) return n;
  // 递归调用 - 时间复杂度 O(2^n)，存在大量重复计算
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 测试用例
console.log("=== 斐波那契数列测试 ===");
const testCases = [0, 1, 2, 3, 4, 5, 10, 20];

testCases.forEach(n => {
  console.log(`F(${n}) = ${fib(n)}`);
});
export {};
// 验证数列：0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...
