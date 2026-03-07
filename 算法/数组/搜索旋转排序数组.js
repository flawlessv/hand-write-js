/**
 * LeetCode 33. 搜索旋转排序数组
 * LeetCode: https://leetcode.cn/problems/search-in-rotated-sorted-array/
 *
 * 题目描述：
 * 整数数组 nums 按升序排列，数组在未知下标 k 处旋转，例如 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2]。
 * 给你 target ，若存在返回下标，否则返回 -1。要求 O(log n)。
 *
 * 思路：
 * 二分。每次取 mid，必有一侧 [left,mid] 或 [mid,right] 是有序的；判断 target 是否在该有序区间内，
 * 在则在这一侧继续二分，否则在另一侧。
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] === target) return mid;

    if (nums[mid] >= nums[left]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 搜索旋转排序数组测试 ===");
console.log(search([4, 5, 6, 7, 0, 1, 2], 0));
console.log(search([4, 5, 6, 7, 0, 1, 2], 3));
console.log(search([1], 1));

module.exports = { search };
