/**
 * LeetCode 54. 螺旋矩阵
 * LeetCode: https://leetcode.cn/problems/spiral-matrix/
 * 
 * 题目描述：
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照顺时针螺旋顺序，返回矩阵中的所有元素。
 * 
 * 示例 1：
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * 
 * 示例 2：
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 * 
 * 提示：
 * - m == matrix.length
 * - n == matrix[i].length
 * - 1 <= m, n <= 10
 * - -100 <= matrix[i][j] <= 100
 * 
 * 解题思路：
 * 方法一：按层模拟（推荐）
 * - 将矩阵看作由若干层组成，从外层到内层依次遍历
 * - 定义四个边界：top、bottom、left、right
 * - 按照"右->下->左->上"的顺序遍历每一层
 * - 每遍历完一层，缩小边界范围
 * 
 * 方法二：方向数组
 * - 使用方向数组控制移动方向：右、下、左、上
 * - 使用 visited 数组记录已访问的位置
 * - 当遇到边界或已访问的位置时，改变方向
 * 
 * 时间复杂度：
 * - 方法一：O(mn)，其中 m 是矩阵的行数，n 是矩阵的列数
 * - 方法二：O(mn)
 * 
 * 空间复杂度：
 * - 方法一：O(1)，除了输出数组外，只使用了常数额外空间
 * - 方法二：O(mn)，需要 visited 数组
 */

/**
 * 方法一：按层模拟（推荐）
 * 
 * 核心思想：
 * 1. 将矩阵看作由若干层组成，从外层到内层依次遍历
 * 2. 定义四个边界：
 *    - top: 当前层的上边界
 *    - bottom: 当前层的下边界
 *    - left: 当前层的左边界
 *    - right: 当前层的右边界
 * 3. 按照"右->下->左->上"的顺序遍历每一层：
 *    - 从左到右遍历上边界（top 行，从 left 到 right）
 *    - 从上到下遍历右边界（right 列，从 top+1 到 bottom）
 *    - 从右到左遍历下边界（bottom 行，从 right-1 到 left），注意避免重复
 *    - 从下到上遍历左边界（left 列，从 bottom-1 到 top+1），注意避免重复
 * 4. 每遍历完一层，缩小边界范围：top++, bottom--, left++, right--
 * 5. 当 top > bottom 或 left > right 时，遍历结束
 * 
 * 详细步骤示例（matrix = [[1,2,3],[4,5,6],[7,8,9]]）：
 * 
 * 初始状态：
 *   top = 0, bottom = 2, left = 0, right = 2
 * 
 * 第一层遍历：
 *   1. 右：遍历 [0,0] -> [0,1] -> [0,2]，得到 [1,2,3]
 *   2. 下：遍历 [1,2] -> [2,2]，得到 [6,9]
 *   3. 左：遍历 [2,1] -> [2,0]，得到 [8,7]
 *   4. 上：遍历 [1,0]，得到 [4]
 *   5. 更新边界：top=1, bottom=1, left=1, right=1
 * 
 * 第二层遍历：
 *   1. 右：遍历 [1,1]，得到 [5]
 *   2. 下：无（top == bottom）
 *   3. 左：无（left == right）
 *   4. 上：无（top == bottom）
 * 
 * 最终结果：[1,2,3,6,9,8,7,4,5]
 * 
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return [];
    }
    
    const m = matrix.length;
    const n = matrix[0].length;
    const result = [];
    
    // 定义四个边界
    let top = 0;
    let bottom = m - 1;
    let left = 0;
    let right = n - 1;
    
    // 按层遍历，直到所有元素都被访问
    while (top <= bottom && left <= right) {
        // 1. 从左到右遍历上边界
        for (let j = left; j <= right; j++) {
            result.push(matrix[top][j]);
        }
        
        // 2. 从上到下遍历右边界（注意从 top+1 开始，避免重复）
        for (let i = top + 1; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        
        // 3. 从右到左遍历下边界（注意条件：top < bottom，避免单行矩阵重复）
        if (top < bottom) {
            for (let j = right - 1; j >= left; j--) {
                result.push(matrix[bottom][j]);
            }
        }
        
        // 4. 从下到上遍历左边界（注意条件：left < right，避免单行矩阵重复）
        if (left < right) {
            for (let i = bottom - 1; i > top; i--) {
                result.push(matrix[i][left]);
            }
        }
        
        // 缩小边界范围，进入下一层
        top++;
        bottom--;
        left++;
        right--;
    }
    
    return result;
};

/**
 * 方法二：方向数组（使用 visited 数组）
 * 
 * 核心思想：
 * 1. 使用方向数组 dirs = [[0,1], [1,0], [0,-1], [-1,0]] 分别表示右、下、左、上
 * 2. 使用 visited 数组记录已访问的位置
 * 3. 从 (0,0) 开始，按照当前方向移动
 * 4. 当遇到边界或已访问的位置时，改变方向（顺时针旋转90度）
 * 5. 直到访问完所有元素
 * 
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrderWithVisited = function(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return [];
    }
    
    const m = matrix.length;
    const n = matrix[0].length;
    const result = [];
    
    // 方向数组：右、下、左、上
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let dirIndex = 0; // 当前方向索引
    
    // visited 数组记录已访问的位置
    const visited = Array(m).fill(0).map(() => Array(n).fill(false));
    
    let row = 0;
    let col = 0;
    const total = m * n;
    
    for (let i = 0; i < total; i++) {
        result.push(matrix[row][col]);
        visited[row][col] = true;
        
        // 计算下一个位置
        const nextRow = row + dirs[dirIndex][0];
        const nextCol = col + dirs[dirIndex][1];
        
        // 如果下一个位置越界或已访问，改变方向
        if (nextRow < 0 || nextRow >= m || 
            nextCol < 0 || nextCol >= n || 
            visited[nextRow][nextCol]) {
            dirIndex = (dirIndex + 1) % 4; // 顺时针旋转90度
        }
        
        // 移动到下一个位置
        row += dirs[dirIndex][0];
        col += dirs[dirIndex][1];
    }
    
    return result;
};

// 辅助函数：打印矩阵
function printMatrix(matrix) {
    console.log('[');
    for (let i = 0; i < matrix.length; i++) {
        console.log('  ' + JSON.stringify(matrix[i]));
    }
    console.log(']');
}

// 测试用例
console.log("=== 螺旋矩阵测试 ===");

// 测试用例1
console.log("\n测试用例1:");
let matrix1 = [[1,2,3],[4,5,6],[7,8,9]];
console.log("输入:");
printMatrix(matrix1);
let result1 = spiralOrder(matrix1);
console.log(`输出: [${result1.join(',')}]`);
console.log("期望: [1,2,3,6,9,8,7,4,5]");

// 测试用例2
console.log("\n测试用例2:");
let matrix2 = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
console.log("输入:");
printMatrix(matrix2);
let result2 = spiralOrder(matrix2);
console.log(`输出: [${result2.join(',')}]`);
console.log("期望: [1,2,3,4,8,12,11,10,9,5,6,7]");

// 测试用例3：单行矩阵
console.log("\n测试用例3:");
let matrix3 = [[1,2,3,4,5]];
console.log("输入:");
printMatrix(matrix3);
let result3 = spiralOrder(matrix3);
console.log(`输出: [${result3.join(',')}]`);
console.log("期望: [1,2,3,4,5]");

// 测试用例4：单列矩阵
console.log("\n测试用例4:");
let matrix4 = [[1],[2],[3],[4],[5]];
console.log("输入:");
printMatrix(matrix4);
let result4 = spiralOrder(matrix4);
console.log(`输出: [${result4.join(',')}]`);
console.log("期望: [1,2,3,4,5]");

// 测试用例5：2x2矩阵
console.log("\n测试用例5:");
let matrix5 = [[1,2],[3,4]];
console.log("输入:");
printMatrix(matrix5);
let result5 = spiralOrder(matrix5);
console.log(`输出: [${result5.join(',')}]`);
console.log("期望: [1,2,4,3]");

// 测试用例6：3x4矩阵
console.log("\n测试用例6:");
let matrix6 = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
console.log("输入:");
printMatrix(matrix6);
let result6 = spiralOrder(matrix6);
console.log(`输出: [${result6.join(',')}]`);
console.log("期望: [1,2,3,4,8,12,11,10,9,5,6,7]");

// 测试用例7：4x3矩阵
console.log("\n测试用例7:");
let matrix7 = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];
console.log("输入:");
printMatrix(matrix7);
let result7 = spiralOrder(matrix7);
console.log(`输出: [${result7.join(',')}]`);
console.log("期望: [1,2,3,6,9,12,11,10,7,4,5,8]");

// 测试用例8：1x1矩阵
console.log("\n测试用例8:");
let matrix8 = [[42]];
console.log("输入:");
printMatrix(matrix8);
let result8 = spiralOrder(matrix8);
console.log(`输出: [${result8.join(',')}]`);
console.log("期望: [42]");



















