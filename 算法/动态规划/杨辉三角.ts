/**
 * LeetCode 118. 杨辉三角
 * LeetCode: https://leetcode.cn/problems/pascals-triangle/
 * 
 * 题目描述：
 * 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
 * 
 * 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
 * 
 * 示例：
 * 输入: numRows = 5
 * 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
 * 
 * 输入: numRows = 1
 * 输出: [[1]]
 * 
 * 杨辉三角的特点：
 * 1. 每行的第一个和最后一个数字都是 1
 * 2. 中间的数字等于上一行相邻两个数字之和
 * 3. 第 n 行有 n 个数字
 * 
 * 解题思路：
 * 这是一个典型的动态规划问题，可以用二维数组来存储每一行的结果。
 * 
 * 状态定义：
 * dp[i][j] 表示第 i 行第 j 列的值（从0开始计数）
 * 
 * 状态转移方程：
 * - 边界条件：dp[i][0] = 1, dp[i][i] = 1（每行的首尾都是1）
 * - 中间值：dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
 * 
 * 时间复杂度：O(numRows^2)
 * 空间复杂度：O(numRows^2)
 */

/**
 * 方法一：动态规划（标准实现）
 * 
 * 核心思路：
 * 1. 创建一个二维数组 result，用于存储每一行的结果
 * 2. 对于第 i 行（从0开始）：
 *    - 第一个元素和最后一个元素都是 1
 *    - 中间的元素等于上一行相邻两个元素之和
 * 
 * 详细步骤：
 * - 初始化：result[i] = new Array(i + 1)，因为第 i 行有 i+1 个元素
 * - 边界处理：result[i][0] = 1, result[i][i] = 1
 * - 状态转移：result[i][j] = result[i-1][j-1] + result[i-1][j]
 */
function generate(numRows: number): number[][] {
  // 边界情况：如果 numRows 为 0，返回空数组
  if (numRows === 0) return [];
  
  // 创建结果数组
  const result: number[][] = [];
  
  // 遍历每一行
  for (let i = 0; i < numRows; i++) {
    // 初始化当前行，第 i 行有 i+1 个元素
    const row: number[] = new Array(i + 1);
    
    // 每行的第一个和最后一个元素都是 1
    row[0] = 1;  // 第一个元素
    row[i] = 1;  // 最后一个元素
    
    // 填充中间的元素（从第2个到倒数第2个）
    // 中间元素 = 上一行相邻两个元素之和
    for (let j = 1; j < i; j++) {
      // 状态转移方程：当前值 = 上一行左上方 + 上一行正上方
      row[j] = result[i - 1][j - 1] + result[i - 1][j];
    }
    
    // 将当前行添加到结果中
    result.push(row);
  }
  
  return result;
}

/**
 * 方法二：动态规划（优化版本 - 只使用一维数组）
 * 
 * 优化思路：
 * 由于每一行只依赖于上一行，可以使用一维数组来优化空间复杂度
 * 但需要注意从后往前遍历，避免覆盖需要使用的值
 */
function generateOptimized(numRows: number): number[][] {
  if (numRows === 0) return [];
  
  const result: number[][] = [];
  let prevRow: number[] = [1]; // 第一行
  
  result.push([...prevRow]); // 添加第一行
  
  // 从第二行开始生成
  for (let i = 1; i < numRows; i++) {
    const currentRow: number[] = new Array(i + 1);
    currentRow[0] = 1; // 第一个元素
    currentRow[i] = 1; // 最后一个元素
    
    // 填充中间元素
    for (let j = 1; j < i; j++) {
      currentRow[j] = prevRow[j - 1] + prevRow[j];
    }
    
    result.push([...currentRow]);
    prevRow = currentRow; // 更新上一行
  }
  
  return result;
}

/**
 * 方法三：数学公式法（组合数）
 * 
 * 杨辉三角的第 i 行第 j 列的值等于 C(i, j) = i! / (j! * (i-j)!)
 * 但这种方法计算阶乘可能会溢出，实际使用较少
 */
function generateMath(numRows: number): number[][] {
  if (numRows === 0) return [];
  
  const result: number[][] = [];
  
  // 计算组合数 C(n, k)
  const combination = (n: number, k: number): number => {
    if (k === 0 || k === n) return 1;
    // 使用递推公式：C(n, k) = C(n, k-1) * (n-k+1) / k
    let res = 1;
    for (let i = 1; i <= k; i++) {
      res = res * (n - i + 1) / i;
    }
    return Math.round(res);
  };
  
  for (let i = 0; i < numRows; i++) {
    const row: number[] = [];
    for (let j = 0; j <= i; j++) {
      row.push(combination(i, j));
    }
    result.push(row);
  }
  
  return result;
}

// 测试用例
console.log("=== 杨辉三角测试 ===");
const testCases = [1, 2, 3, 5, 10];

console.log("\n【方法一：标准动态规划】");
testCases.forEach(numRows => {
  console.log(`\nnumRows = ${numRows}:`);
  const result = generate(numRows);
  result.forEach((row, index) => {
    console.log(`第 ${index + 1} 行: [${row.join(', ')}]`);
  });
});

console.log("\n【方法二：优化版本】");
const result2 = generateOptimized(5);
result2.forEach((row, index) => {
  console.log(`第 ${index + 1} 行: [${row.join(', ')}]`);
});

console.log("\n【方法三：数学公式法】");
const result3 = generateMath(5);
result3.forEach((row, index) => {
  console.log(`第 ${index + 1} 行: [${row.join(', ')}]`);
});

export {};

