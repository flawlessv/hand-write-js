/**
 * LeetCode 48. 旋转图像
 * LeetCode: https://leetcode.cn/problems/rotate-image/
 * 
 * 题目描述：
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * 
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。
 * 
 * 示例 1：
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[[7,4,1],[8,5,2],[9,6,3]]
 * 
 * 示例 2：
 * 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 * 
 * 提示：
 * - n == matrix.length == matrix[i].length
 * - 1 <= n <= 20
 * - -1000 <= matrix[i][j] <= 1000
 * 
 * 解题思路提示：
 * 方法一：原地旋转（推荐）
 * - 观察规律：对于 n×n 矩阵，旋转 90 度后，位置 (i, j) 的元素会移动到 (j, n-1-i)
 * - 可以分圈处理，从外圈到内圈
 * - 对于每一圈，每次旋转 4 个元素的位置
 * 
 * 方法二：先转置再翻转
 * - 先对矩阵进行转置（行列互换）
 * - 然后对每一行进行翻转
 * 
 * 时间复杂度：
 * - 方法一：O(n^2)，需要遍历所有元素
 * - 方法二：O(n^2)
 * 
 * 空间复杂度：
 * - 方法一：O(1)，原地修改
 * - 方法二：O(1)
 */

/**
 * 方法一：原地旋转（推荐）
 * 
 * 核心思想详解：
 * 1. 观察旋转规律：
 *    对于 n×n 矩阵，顺时针旋转 90 度后：
 *    - 位置 (i, j) 的元素会移动到 (j, n-1-i)
 *    - 位置 (j, n-1-i) 的元素会移动到 (n-1-i, n-1-j)
 *    - 位置 (n-1-i, n-1-j) 的元素会移动到 (n-1-j, i)
 *    - 位置 (n-1-j, i) 的元素会移动到 (i, j)
 * 
 * 2. 旋转一圈需要交换 4 个元素的位置：
 *    temp = matrix[i][j]
 *    matrix[i][j] = matrix[n-1-j][i]
 *    matrix[n-1-j][i] = matrix[n-1-i][n-1-j]
 *    matrix[n-1-i][n-1-j] = matrix[j][n-1-i]
 *    matrix[j][n-1-i] = temp
 * 
 * 3. 分圈处理：
 *    - 从外圈到内圈，逐圈旋转
 *    - 对于 n×n 矩阵，需要处理 ⌊n/2⌋ 圈
 *    - 对于每一圈，需要处理 n-1-2*i 个元素（i 是圈数）
 * 
 * 详细步骤示例（3×3 矩阵）：
 * 原始矩阵：
 *   1  2  3
 *   4  5  6
 *   7  8  9
 * 
 * 第一圈（i=0）：
 *   - 处理位置 (0,0), (0,1), (0,2) 的上边
 *   - (0,0) -> (0,2) -> (2,2) -> (2,0) -> (0,0)
 *   - (0,1) -> (1,2) -> (2,1) -> (1,0) -> (0,1)
 * 
 * 旋转后：
 *   7  4  1
 *   8  5  2
 *   9  6  3
 * 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    const n = matrix.length;
    
    // 从外圈到内圈，逐圈处理
    for (let i = 0; i < Math.floor(n / 2); i++) {
        // 对于每一圈，需要处理的元素范围
        // 例如：第一圈处理 [0, n-2]，第二圈处理 [1, n-3]，以此类推
        for (let j = i; j < n - 1 - i; j++) {
            // 保存第一个元素
            const temp = matrix[i][j];
            
            // 旋转 4 个元素的位置
            // 左下角 -> 左上角
            matrix[i][j] = matrix[n - 1 - j][i];
            // 右下角 -> 左下角
            matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
            // 右上角 -> 右下角
            matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
            // 左上角 -> 右上角
            matrix[j][n - 1 - i] = temp;
        }
    }
};

/**
 * 方法二：先转置再翻转（更直观）
 * 
 * 核心思想：
 * 1. 先对矩阵进行转置（行列互换）
 *    转置后：matrix[i][j] = matrix[j][i]
 * 
 * 2. 然后对每一行进行翻转（左右翻转）
 *    翻转后：matrix[i][j] = matrix[i][n-1-j]
 * 
 * 详细步骤示例（3×3 矩阵）：
 * 原始矩阵：
 *   1  2  3
 *   4  5  6
 *   7  8  9
 * 
 * 步骤1：转置（行列互换）
 *   1  4  7
 *   2  5  8
 *   3  6  9
 * 
 * 步骤2：每行翻转
 *   7  4  1
 *   8  5  2
 *   9  6  3
 * 
 * 优点：思路更直观，代码更简洁
 * 缺点：需要两次遍历
 * 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotateTranspose = function(matrix) {
    const n = matrix.length;
    
    // 步骤1：转置矩阵（行列互换）
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            // 只处理上三角或下三角，避免重复交换
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    
    // 步骤2：翻转每一行
    for (let i = 0; i < n; i++) {
        let left = 0;
        let right = n - 1;
        while (left < right) {
            const temp = matrix[i][left];
            matrix[i][left] = matrix[i][right];
            matrix[i][right] = temp;
            left++;
            right--;
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
console.log("=== 旋转图像测试 ===");

// 测试用例1
console.log("\n测试用例1:");
let matrix1 = [[1,2,3],[4,5,6],[7,8,9]];
console.log("输入:");
printMatrix(matrix1);
let matrix1Copy = deepCopyMatrix(matrix1);
rotate(matrix1);
console.log("方法一输出:");
printMatrix(matrix1);
console.log("期望: [[7,4,1],[8,5,2],[9,6,3]]");
rotateTranspose(matrix1Copy);
console.log("方法二输出:");
printMatrix(matrix1Copy);

// 测试用例2
console.log("\n测试用例2:");
let matrix2 = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
console.log("输入:");
printMatrix(matrix2);
let matrix2Copy = deepCopyMatrix(matrix2);
rotate(matrix2);
console.log("方法一输出:");
printMatrix(matrix2);
console.log("期望: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]");
rotateTranspose(matrix2Copy);
console.log("方法二输出:");
printMatrix(matrix2Copy);

// 测试用例3：2x2矩阵
console.log("\n测试用例3:");
let matrix3 = [[1,2],[3,4]];
console.log("输入:");
printMatrix(matrix3);
let matrix3Copy = deepCopyMatrix(matrix3);
rotate(matrix3);
console.log("方法一输出:");
printMatrix(matrix3);
console.log("期望: [[3,1],[4,2]]");
rotateTranspose(matrix3Copy);
console.log("方法二输出:");
printMatrix(matrix3Copy);

// 测试用例4：1x1矩阵
console.log("\n测试用例4:");
let matrix4 = [[1]];
console.log("输入:");
printMatrix(matrix4);
let matrix4Copy = deepCopyMatrix(matrix4);
rotate(matrix4);
console.log("方法一输出:");
printMatrix(matrix4);
console.log("期望: [[1]]");
rotateTranspose(matrix4Copy);
console.log("方法二输出:");
printMatrix(matrix4Copy);

