/**
 * LeetCode 189. 轮转数组
 * LeetCode: https://leetcode.cn/problems/rotate-array/
 * 
 * 题目描述：
 * 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 * 
 * 示例 1：
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右轮转 1 步: [7,1,2,3,4,5,6]
 * 向右轮转 2 步: [6,7,1,2,3,4,5]
 * 向右轮转 3 步: [5,6,7,1,2,3,4]
 * 
 * 示例 2：
 * 输入：nums = [-1,-100,3,99], k = 2
 * 输出：[3,99,-1,-100]
 * 解释: 
 * 向右轮转 1 步: [99,-1,-100,3]
 * 向右轮转 2 步: [3,99,-1,-100]
 * 
 * 提示：
 * - 1 <= nums.length <= 10^5
 * - -2^31 <= nums[i] <= 2^31 - 1
 * - 0 <= k <= 10^5
 * 
 * 进阶：
 * - 尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
 * - 你可以使用空间复杂度为 O(1) 的原地算法解决这个问题吗？
 * 
 * 解题思路提示：
 * 方法一：使用额外数组
 * - 创建一个新数组，将原数组的元素按照新位置放入
 * - 新位置 = (原位置 + k) % 数组长度
 * 
 * 方法二：多次反转
 * - 先反转整个数组
 * - 再反转前 k 个元素
 * - 最后反转后 n-k 个元素
 * 
 * 方法三：环状替换
 * - 将数组看作一个环，每次将元素移动到正确的位置
 * - 需要处理多个环的情况
 * 
 * 时间复杂度：
 * - 方法一：O(n)
 * - 方法二：O(n)
 * - 方法三：O(n)
 * 
 * 空间复杂度：
 * - 方法一：O(n)
 * - 方法二：O(1)
 * - 方法三：O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    const n = nums.length;
    
    // 处理 k 大于数组长度的情况
    k = k % n;
    
    // 如果 k 为 0，不需要旋转
    if (k === 0) return;
    
    // 辅助函数：反转数组的指定区间
    const reverse = (arr, start, end) => {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;  // ⚠️ 关键：更新指针！
            end--;    // ⚠️ 关键：更新指针！
        }
    };
    
    // 方法：三次反转
    // 步骤1：反转整个数组
    reverse(nums, 0, n - 1);
    
    // 步骤2：反转前 k 个元素
    reverse(nums, 0, k - 1);
    
    // 步骤3：反转后 n-k 个元素
    reverse(nums, k, n - 1);
};

// 测试用例
console.log("=== 轮转数组测试 ===");

// 测试用例1
console.log("\n测试用例1:");
let nums1 = [1,2,3,4,5,6,7];
let k1 = 3;
console.log(`输入: nums = [${nums1.join(',')}], k = ${k1}`);
rotate(nums1, k1);
console.log(`输出: [${nums1.join(',')}]`);
console.log("期望: [5,6,7,1,2,3,4]");

// 测试用例2
console.log("\n测试用例2:");
let nums2 = [-1,-100,3,99];
let k2 = 2;
console.log(`输入: nums = [${nums2.join(',')}], k = ${k2}`);
rotate(nums2, k2);
console.log(`输出: [${nums2.join(',')}]`);
console.log("期望: [3,99,-1,-100]");

// 测试用例3：k 等于数组长度
console.log("\n测试用例3:");
let nums3 = [1,2,3,4,5];
let k3 = 5;
console.log(`输入: nums = [${nums3.join(',')}], k = ${k3}`);
rotate(nums3, k3);
console.log(`输出: [${nums3.join(',')}]`);
console.log("期望: [1,2,3,4,5]");

// 测试用例4：k 大于数组长度
console.log("\n测试用例4:");
let nums4 = [1,2];
let k4 = 3;
console.log(`输入: nums = [${nums4.join(',')}], k = ${k4}`);
rotate(nums4, k4);
console.log(`输出: [${nums4.join(',')}]`);
console.log("期望: [2,1]");

// 测试用例5：单个元素
console.log("\n测试用例5:");
let nums5 = [1];
let k5 = 0;
console.log(`输入: nums = [${nums5.join(',')}], k = ${k5}`);
rotate(nums5, k5);
console.log(`输出: [${nums5.join(',')}]`);
console.log("期望: [1]");

// 测试用例6：k = 0
console.log("\n测试用例6:");
let nums6 = [1,2,3,4,5];
let k6 = 0;
console.log(`输入: nums = [${nums6.join(',')}], k = ${k6}`);
rotate(nums6, k6);
console.log(`输出: [${nums6.join(',')}]`);
console.log("期望: [1,2,3,4,5]");

