/**
 * LeetCode 238. 除自身以外数组的乘积
 * LeetCode: https://leetcode.cn/problems/product-of-array-except-self/
 * 
 * 题目描述：
 * 给你一个整数数组 nums，返回数组 answer，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。
 * 
 * 题目数据保证数组 nums 之中任意元素的全部前缀元素和后缀的乘积都在 32 位整数范围内。
 * 
 * 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
 * 
 * 示例 1：
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 * 解释：
 * answer[0] = 2 * 3 * 4 = 24
 * answer[1] = 1 * 3 * 4 = 12
 * answer[2] = 1 * 2 * 4 = 8
 * answer[3] = 1 * 2 * 3 = 6
 * 
 * 示例 2：
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 * 解释：
 * answer[0] = 1 * 0 * -3 * 3 = 0
 * answer[1] = -1 * 0 * -3 * 3 = 0
 * answer[2] = -1 * 1 * -3 * 3 = 9
 * answer[3] = -1 * 1 * 0 * 3 = 0
 * answer[4] = -1 * 1 * 0 * -3 = 0
 * 
 * 提示：
 * - 2 <= nums.length <= 10^5
 * - -30 <= nums[i] <= 30
 * - 保证数组 nums 之中任意元素的全部前缀元素和后缀的乘积都在 32 位整数范围内
 * 
 * 进阶：你可以在 O(1) 额外空间复杂度内完成这个题目吗？（出于对空间复杂度分析的目的，输出数组不被视为额外空间）
 * 
 * 解题思路：
 * 方法一：前缀积 + 后缀积（使用额外数组）
 * - 第一次遍历：计算每个位置左侧所有元素的乘积（前缀积），存储在 left 数组中
 * - 第二次遍历：计算每个位置右侧所有元素的乘积（后缀积），存储在 right 数组中
 * - 第三次遍历：将 left[i] * right[i] 得到最终结果
 * 
 * 方法二：前缀积 + 后缀积（空间优化，O(1) 额外空间）
 * - 使用输出数组 result 先存储前缀积
 * - 第一次遍历：计算前缀积，result[i] = nums[0] * nums[1] * ... * nums[i-1]
 * - 第二次遍历：从后往前，使用变量 right 存储后缀积，同时更新 result[i] = result[i] * right
 * - 这样可以在 O(1) 额外空间内完成
 * 
 * 时间复杂度：O(n)，其中 n 是数组的长度
 * 空间复杂度：
 * - 方法一：O(n)，需要额外的 left 和 right 数组
 * - 方法二：O(1)，除了输出数组外只使用常数额外空间
 */

/**
 * 方法一：前缀积 + 后缀积（使用额外数组）
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const left = new Array(n);   // 存储前缀积
    const right = new Array(n);  // 存储后缀积
    const result = new Array(n);
    
    // 计算前缀积：left[i] 表示 nums[0] * nums[1] * ... * nums[i-1]
    left[0] = 1;  // 第一个元素左侧没有元素，所以前缀积为 1
    for (let i = 1; i < n; i++) {
        left[i] = left[i - 1] * nums[i - 1];
    }
    
    // 计算后缀积：right[i] 表示 nums[i+1] * nums[i+2] * ... * nums[n-1]
    right[n - 1] = 1;  // 最后一个元素右侧没有元素，所以后缀积为 1
    for (let i = n - 2; i >= 0; i--) {
        right[i] = right[i + 1] * nums[i + 1];
    }
    
    // 计算最终结果：result[i] = left[i] * right[i]
    for (let i = 0; i < n; i++) {
        result[i] = left[i] * right[i];
    }
    
    return result;
};

/**
 * 方法二：前缀积 + 后缀积（空间优化，O(1) 额外空间）
 * 核心思想：
 * - 使用输出数组 result 先存储前缀积
 * - 第一次遍历：计算前缀积并存储在 result 中
 * - 第二次遍历：从后往前，使用变量 right 存储后缀积，同时更新 result
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelfOptimized = function(nums) {
    const n = nums.length;
    const result = new Array(n);
    
    // 第一次遍历：计算前缀积并存储在 result 中
    // result[i] = nums[0] * nums[1] * ... * nums[i-1]
    result[0] = 1;  // 第一个元素左侧没有元素，所以前缀积为 1
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // 第二次遍历：从后往前，使用变量 right 存储后缀积
    // right 表示 nums[i+1] * nums[i+2] * ... * nums[n-1]
    let right = 1;  // 最后一个元素右侧没有元素，所以初始后缀积为 1
    for (let i = n - 1; i >= 0; i--) {
        // 更新 result[i]：前缀积 * 后缀积
        result[i] = result[i] * right;
        // 更新 right：乘以当前元素，作为下一个位置的后缀积
        right = right * nums[i];
    }
    
    return result;
};

export { productExceptSelf, productExceptSelfOptimized };








