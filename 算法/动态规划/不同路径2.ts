function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    /**
        dp[i][j]: 到达(i, j)的路径数
        dp[0][*]: 用u表示第一个障碍物下标，则u之前为1，u之后（含u）为0
        dp[*][0]: 同上
        ...
        dp[i][j]: obstacleGrid[i][j] === 1 ? 0 : dp[i-1][j] + dp[i][j-1];
     */
    const m: number = obstacleGrid.length;
    const n: number = obstacleGrid[0].length;
    const dp: number[][] = new Array(m).fill(0).map(_ => new Array(n).fill(0));
    for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
        dp[i][0] = 1;
    }
    for (let i = 0; i < n && obstacleGrid[0][i] === 0; i++) {
        dp[0][i] = 1;
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 1) continue;
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
};