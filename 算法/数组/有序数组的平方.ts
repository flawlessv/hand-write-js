/**
 * LeetCode 977. 有序数组的平方
 * LeetCode: https://leetcode.cn/problems/squares-of-a-sorted-array/
 * 
 * 题目描述：
 * 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
 * 
 * 示例 1：
 * 输入：nums = [-4,-1,0,3,10]
 * 输出：[0,1,9,16,100]
 * 解释：平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]
 * 
 * 示例 2：
 * 输入：nums = [-7,-3,2,3,11]
 * 输出：[4,9,9,49,121]
 * 
 * 解题思路：
 * 方法一：暴力解法 - 先平方再排序，时间复杂度 O(n log n)
 * 方法二：双指针法 - 利用原数组有序的特性，时间复杂度 O(n)
 * 
 * 双指针思路：
 * 由于数组有序，平方后最大值一定在数组两端（最小负数或最大正数）
 * 使用双指针从两端向中间移动，每次选择平方值较大的元素放入结果数组
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1) - 不计算结果数组的空间
 */
function sortedSquares(nums: number[]): number[] {
    const ans: number[] = [];
    let left = 0,        // 左指针，指向数组开头
        right = nums.length - 1;  // 右指针，指向数组末尾

    // 双指针从两端向中间移动
    while (left <= right) {
        // 比较两端元素的绝对值大小
        // 右侧的元素不需要取绝对值，nums 为非递减排序的整数数组
        // 在同为负数的情况下，左侧的平方值一定大于右侧的平方值
        if (Math.abs(nums[left]) > nums[right]) {
            // 左侧元素的平方值更大，将其插入结果数组的开头
            // 使用 Array.prototype.unshift() 直接在数组的首项插入当前最大值
            ans.unshift(nums[left] ** 2);
            left++;  // 左指针右移
        } else {
            // 右侧元素的平方值更大或相等，将其插入结果数组的开头
            ans.unshift(nums[right] ** 2);
            right--; // 右指针左移
        }
    }

    return ans;
}

// 优化版本：避免使用 unshift，提高性能
function sortedSquaresOptimized(nums: number[]): number[] {
    const n = nums.length;
    const result: number[] = new Array(n);
    let left = 0, right = n - 1;
    let index = n - 1; // 从结果数组的末尾开始填充

    while (left <= right) {
        const leftSquare = nums[left] * nums[left];
        const rightSquare = nums[right] * nums[right];
        
        if (leftSquare > rightSquare) {
            result[index] = leftSquare;
            left++;
        } else {
            result[index] = rightSquare;
            right--;
        }
        index--;
    }
    
    return result;
}

// 测试用例
console.log("=== 有序数组的平方测试 ===");
const testCases = [
    [-4, -1, 0, 3, 10],     // 期望输出: [0,1,9,16,100]
    [-7, -3, 2, 3, 11],     // 期望输出: [4,9,9,49,121]
    [-5, -3, -2, -1],       // 期望输出: [1,4,9,25]
    [1, 2, 3, 4, 5],        // 期望输出: [1,4,9,16,25]
    [0]                     // 期望输出: [0]
];

testCases.forEach((nums, index) => {
    console.log(`测试用例 ${index + 1}: [${nums.join(', ')}]`);
    console.log(`原始方法: [${sortedSquares(nums).join(', ')}]`);
    console.log(`优化方法: [${sortedSquaresOptimized(nums).join(', ')}]`);
    console.log('---');
});

export { sortedSquares, sortedSquaresOptimized };