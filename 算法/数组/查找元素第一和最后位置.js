/**
 * LeetCode 34. 在排序数组中查找元素的第一个和最后一个位置
 * LeetCode: https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 *
 * 题目描述：
 * 给定升序数组 nums 和目标值 target，找出 target 在数组中的开始位置和结束位置；
 * 若不存在返回 [-1, -1]。要求 O(log n)。
 *
 * 思路：
 * 二分找“第一个等于 target”的下标，再二分找“最后一个等于 target”的下标。
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
  const first = findFirst(nums, target);
  if (first === -1) return [-1, -1];
  const last = findLast(nums, target);
  return [first, last];
}

function findFirst(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      result = mid;
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

function findLast(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      result = mid;
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 查找元素第一和最后位置测试 ===");
console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
console.log(searchRange([5, 7, 7, 8, 8, 10], 6));
console.log(searchRange([], 0));

module.exports = { searchRange };
