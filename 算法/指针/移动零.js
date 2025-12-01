/**
 * LeetCode 283. 移动零
 * LeetCode: https://leetcode.cn/problems/move-zeroes/
 * 
 * 题目描述：
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 
 * 请注意，必须在不复制数组的情况下原地对数组进行操作。
 * 
 * 示例 1：
 * 输入: nums = [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 * 
 * 示例 2：
 * 输入: nums = [0]
 * 输出: [0]
 * 
 * 提示：
 * - 1 <= nums.length <= 10^4
 * - -2^31 <= nums[i] <= 2^31 - 1
 * 
 * 进阶：
 * 你能尽量减少完成的操作次数吗？
 * 
 * 解题思路：
 * 使用双指针法（快慢指针）：
 * - left（慢指针）：指向下一个非零元素应该放置的位置
 * - right（快指针）：遍历整个数组
 * - 当 right 指向的元素不为0时，将其与 left 指向的元素交换，然后 left 右移
 * - 这样保证 left 左边都是非零元素，且保持相对顺序
 * 
 * 时间复杂度：O(n) - 只遍历一次数组
 * 空间复杂度：O(1) - 只使用了常数额外空间
 */

/**
 * 双指针法
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let left = 0;  // 慢指针：指向下一个非零元素应该放置的位置
    
    // 快指针遍历整个数组
    for(let right = 0; right < nums.length; right++) {
        // 如果当前元素不为0，将其放到 left 位置
        if(nums[right] !== 0) {
            // 交换元素（如果 left 和 right 相同，交换也没关系）
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;  // left 指针右移
        }
        // 如果 nums[right] === 0，left 不动，right 继续右移
    }
    
    return nums;
};

// 测试用例
console.log("=== 移动零测试 ===");

// 测试用例1
const nums1 = [0,1,0,3,12];
console.log("测试用例1:");
console.log("输入:", [...nums1]);
moveZeroes(nums1);
console.log("输出:", nums1);  // 期望: [1,3,12,0,0]

// 测试用例2
const nums2 = [0];
console.log("\n测试用例2:");
console.log("输入:", [...nums2]);
moveZeroes(nums2);
console.log("输出:", nums2);  // 期望: [0]

// 测试用例3
const nums3 = [0,0,1];
console.log("\n测试用例3:");
console.log("输入:", [...nums3]);
moveZeroes(nums3);
console.log("输出:", nums3);  // 期望: [1,0,0]

// 测试用例4
const nums4 = [1,2,3,0,4,0,5];
console.log("\n测试用例4:");
console.log("输入:", [...nums4]);
moveZeroes(nums4);
console.log("输出:", nums4);  // 期望: [1,2,3,4,5,0,0]

