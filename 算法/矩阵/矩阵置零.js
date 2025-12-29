/**
 * LeetCode 73. 矩阵置零
 * LeetCode: https://leetcode.cn/problems/set-matrix-zeroes/
 * 
 * 题目描述：
 * 给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。
 * 
 * 示例 1：
 * 输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
 * 输出：[[1,0,1],[0,0,0],[1,0,1]]
 * 
 * 示例 2：
 * 输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
 * 输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 * 
 * 提示：
 * - m == matrix.length
 * - n == matrix[0].length
 * - 1 <= m, n <= 200
 * - -2^31 <= matrix[i][j] <= 2^31 - 1
 * 
 * 进阶：
 * - 一个直观的解决方案是使用 O(mn) 的额外空间，但这并不是一个好的解决方案。
 * - 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
 * - 你能想出一个仅使用常量空间的解决方案吗？
 * 
 * 解题思路：
 * 方法一：使用标记数组（O(m+n)空间）
 * - 使用两个数组分别记录哪些行和列需要置零
 * - 第一次遍历：记录需要置零的行和列
 * - 第二次遍历：根据标记数组将对应位置置零
 * 
 * 方法二：使用第一行和第一列作为标记（O(1)空间）
 * - 使用矩阵的第一行和第一列来记录哪些行和列需要置零
 * - 需要额外变量记录第一行和第一列本身是否需要置零
 * - 时间复杂度：O(mn)，空间复杂度：O(1)
 * 
 * 时间复杂度：
 * - 方法一：O(mn)，其中 m 是矩阵的行数，n 是矩阵的列数
 * - 方法二：O(mn)
 * 
 * 空间复杂度：
 * - 方法一：O(m + n)
 * - 方法二：O(1)
 */

/**
 * 方法一：使用标记数组（O(m+n)空间）
 * 
 * 核心思想：
 * 1. 使用两个数组 rowZero 和 colZero 分别记录哪些行和列需要置零
 * 2. 第一次遍历矩阵，记录所有需要置零的行和列
 * 3. 第二次遍历矩阵，如果当前行或列需要置零，则将元素置为 0
 * 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    
    // 使用两个数组记录需要置零的行和列
    const rowZero = new Array(m).fill(false);
    const colZero = new Array(n).fill(false);
    
    // 第一次遍历：记录哪些行和列需要置零
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rowZero[i] = true;
                colZero[j] = true;
            }
        }
    }
    
    // 第二次遍历：根据标记数组将对应位置置零
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rowZero[i] || colZero[j]) {
                matrix[i][j] = 0;
            }
        }
    }
};

/**
 * 方法二：使用第一行和第一列作为标记（O(1)空间，推荐）
 * 
 * 核心思想：
 * 1. 使用矩阵的第一行和第一列来记录哪些行和列需要置零
 * 2. 需要额外变量记录第一行和第一列本身是否需要置零
 * 3. 从第二行第二列开始遍历，如果 matrix[i][j] === 0，则标记 matrix[i][0] = 0 和 matrix[0][j] = 0
 * 4. 再次遍历，根据第一行和第一列的标记将对应位置置零
 * 5. 最后处理第一行和第一列
 * 
 * 详细步骤：
 * 步骤1：检查第一行和第一列是否有0，用变量记录
 * 步骤2：从第二行第二列开始遍历，如果 matrix[i][j] === 0，则：
 *        - 将 matrix[i][0] 置为 0（标记第 i 行需要置零）
 *        - 将 matrix[0][j] 置为 0（标记第 j 列需要置零）
 * 步骤3：从第二行第二列开始遍历，如果 matrix[i][0] === 0 或 matrix[0][j] === 0，则将 matrix[i][j] 置为 0
 * 步骤4：根据步骤1的变量，决定是否将第一行和第一列全部置零
 * 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroesOptimized = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    
    // 记录第一行和第一列是否需要置零
    let firstRowZero = false;
    let firstColZero = false;
    
    // 检查第一行是否有0
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowZero = true;
            break;
        }
    }
    
    // 检查第一列是否有0
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColZero = true;
            break;
        }
    }
    
    // 从第二行第二列开始遍历，使用第一行和第一列作为标记
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                // 标记第 i 行需要置零
                matrix[i][0] = 0;
                // 标记第 j 列需要置零
                matrix[0][j] = 0;
            }
        }
    }
    
    // 根据标记将对应位置置零（从第二行第二列开始）
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // 处理第一行
    if (firstRowZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    
    // 处理第一列
    if (firstColZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
};

// 辅助函数：打印矩阵
function printMatrix(matrix) {
    console.log('[');
    for (let i = 0; i < matrix.length; i++) {
        console.log('  ' + JSON.stringify(matrix[i]));
    }
    console.log(']');
}

// 辅助函数：深拷贝矩阵
function deepCopyMatrix(matrix) {
    return matrix.map(row => [...row]);
}

// 测试用例
console.log("=== 矩阵置零测试 ===");

// 测试用例1
console.log("\n测试用例1:");
let matrix1 = [[1,1,1],[1,0,1],[1,1,1]];
console.log("输入:");
printMatrix(matrix1);
setZeroesOptimized(matrix1);
console.log("输出:");
printMatrix(matrix1);
console.log("期望: [[1,0,1],[0,0,0],[1,0,1]]");

// 测试用例2
console.log("\n测试用例2:");
let matrix2 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]];
console.log("输入:");
printMatrix(matrix2);
setZeroesOptimized(matrix2);
console.log("输出:");
printMatrix(matrix2);
console.log("期望: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]");

// 测试用例3
console.log("\n测试用例3:");
let matrix3 = [[1,2,3,4],[5,0,7,8],[9,10,11,12]];
console.log("输入:");
printMatrix(matrix3);
setZeroesOptimized(matrix3);
console.log("输出:");
printMatrix(matrix3);
console.log("期望: [[1,0,3,4],[0,0,0,0],[9,0,11,12]]");

// 测试用例4：第一行有0
console.log("\n测试用例4:");
let matrix4 = [[0,1,2],[3,4,5],[6,7,8]];
console.log("输入:");
printMatrix(matrix4);
setZeroesOptimized(matrix4);
console.log("输出:");
printMatrix(matrix4);
console.log("期望: [[0,0,0],[0,4,5],[0,7,8]]");

// 测试用例5：第一列有0
console.log("\n测试用例5:");
let matrix5 = [[1,2,3],[0,4,5],[6,7,8]];
console.log("输入:");
printMatrix(matrix5);
setZeroesOptimized(matrix5);
console.log("输出:");
printMatrix(matrix5);
console.log("期望: [[0,2,3],[0,0,0],[0,7,8]]");

// 测试用例6：多个0
console.log("\n测试用例6:");
let matrix6 = [[1,0,3,4],[5,6,0,8],[9,10,11,12],[0,14,15,16]];
console.log("输入:");
printMatrix(matrix6);
setZeroesOptimized(matrix6);
console.log("输出:");
printMatrix(matrix6);
console.log("期望: [[0,0,0,0],[0,0,0,0],[0,0,0,12],[0,0,0,0]]");



















