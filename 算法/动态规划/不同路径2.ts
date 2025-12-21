/**
 * LeetCode 63. 不同路径 II
 * LeetCode: https://leetcode.cn/problems/unique-paths-ii/
 * 
 * 题目描述：
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为"Start" ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为"Finish"）。
 * 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 * 
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。
 * 
 * 示例：
 * 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 * 输出：2
 * 解释：
 * 3x3 网格的正中间有一个障碍物。
 * 从左上角到右下角一共有 2 条不同的路径：
 * 1. 向右 -> 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右 -> 向右
 * 
 * 输入：obstacleGrid = [[0,1],[0,0]]
 * 输出：1
 * 
 * 解题思路：
 * 这是"不同路径"问题的变种，增加了障碍物的限制。
 * 
 * 动态规划思路：
 * 状态定义：
 * dp[i][j] 表示从起点 (0,0) 到达位置 (i,j) 的不同路径数
 * 
 * 状态转移方程：
 * - 如果 obstacleGrid[i][j] == 1（有障碍物），则 dp[i][j] = 0
 * - 否则 dp[i][j] = dp[i-1][j] + dp[i][j-1]
 * 
 * 边界条件：
 * - 第一行：dp[0][j] = 1（如果没有障碍物），遇到障碍物后面都为0
 * - 第一列：dp[i][0] = 1（如果没有障碍物），遇到障碍物后面都为0
 * 
 * 特殊情况：
 * - 如果起点或终点有障碍物，返回 0
 * 
 * 时间复杂度：O(m*n)
 * 空间复杂度：O(m*n) - 可优化为 O(n)
 */

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
/**
 * 知识点总结：
 * 本题属于典型的二维动态规划（DP）问题，是 LeetCode 62（不同路径）的变种，区别在于增加了障碍物的判断。
 * 
 * 状态定义：
 *   dp[i][j] 表示从起点 (0,0) 到达 (i,j) 位置的不同路径数。
 * 
 * 转移方程：
 *   - 如果 obstacleGrid[i][j] == 1，说明当前位置为障碍物，无法到达，dp[i][j] = 0；
 *   - 否则，dp[i][j] = dp[i-1][j] + dp[i][j-1]（即只能从上方或左侧到达）。
 * 
 * 初始化：
 *   - 当起点或终点为障碍物直接返回 0；
 *   - 第一行/第一列，只要遇到障碍物，则之后的格子均不可达，均为 0。
 * 
 * 时间复杂度：O(m * n)
 * 空间复杂度：O(m * n)（可进一步空间优化为 O(n)）
 */

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    // 如果起点或终点有障碍，直接返回 0
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
        return 0;
    }

    // 定义和初始化 dp 表
    const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    dp[0][0] = 1;

    // 初始化第一行
    for (let j = 1; j < n; j++) {
        // 只有当前格子不是障碍，且左边的格子可以到达，当前格子才能到达
        dp[0][j] = (obstacleGrid[0][j] === 0 && dp[0][j - 1] === 1) ? 1 : 0;
    }

    // 初始化第一列
    for (let i = 1; i < m; i++) {
        // 只有当前格子不是障碍，且左边的格子可以到达，当前格子才能到达
        dp[i][0] = (obstacleGrid[i][0] === 0 && dp[i - 1][0] === 1) ? 1 : 0;
    }

    // 状态转移
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0;
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }

    return dp[m - 1][n - 1];
}


// 测试用例
console.log("=== 不同路径 II 测试 ===");
const testCases = [
    [[0,0,0],[0,1,0],[0,0,0]], // 期望输出: 2
    [[0,1],[0,0]],             // 期望输出: 1
    [[1,0]],                   // 期望输出: 0 (起点有障碍物)
    [[0,0],[1,1],[0,0]],       // 期望输出: 0 (终点有障碍物)
    [[0]]                      // 期望输出: 1
];

testCases.forEach((grid, index) => {
    console.log(`测试用例 ${index + 1}:`);
    console.log(grid.map(row => `[${row.join(',')}]`).join('\n'));
    console.log(`标准版本: ${uniquePathsWithObstacles(grid)}`);
    console.log('---');
});
export {};