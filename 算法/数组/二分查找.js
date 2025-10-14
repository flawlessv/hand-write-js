/**
 * LeetCode 704. 二分查找
 * LeetCode: https://leetcode.cn/problems/binary-search/
 * 
 * 题目描述：
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target，
 * 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 * 
 * 示例：
 * 输入: nums = [-1,0,3,5,9,12], target = 9
 * 输出: 4
 * 解释: 9 出现在 nums 中并且下标为 4
 * 
 * 输入: nums = [-1,0,3,5,9,12], target = 2
 * 输出: -1
 * 解释: 2 不存在 nums 中因此返回 -1
 * 
 * 算法思路：
 * 二分查找是一种在有序数组中查找特定元素的搜索算法。
 * 
 * 核心思想：
 * 1. 每次比较中间元素与目标值
 * 2. 如果中间元素等于目标值，返回索引
 * 3. 如果中间元素小于目标值，在右半部分继续查找
 * 4. 如果中间元素大于目标值，在左半部分继续查找
 * 5. 重复此过程直到找到目标值或搜索区间为空
 * 
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 * 
 * 前提条件：数组必须是有序的
 * 
 * @param {number[]} nums - 有序数组
 * @param {number} target - 目标值
 * @return {number} - 目标值的索引，不存在返回 -1
 */

// 标准二分查找实现
function binarySearch(nums, target) {
  let left = 0; // 左边界
  let right = nums.length - 1; // 右边界

  // 当搜索区间有效时继续查找
  while (left <= right) {
    // 计算中间位置，防止整数溢出
    const mid = Math.floor((left + right) / 2);
    // 或者使用：const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid; // 找到目标值，返回索引
    } else if (nums[mid] < target) {
      left = mid + 1; // 目标值在右半部分
    } else {
      right = mid - 1; // 目标值在左半部分
    }
  }

  return -1; // 未找到目标值
}

// 递归版本的二分查找
function binarySearchRecursive(nums, target, left = 0, right = nums.length - 1) {
  // 递归终止条件
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  if (nums[mid] === target) {
    return mid;
  } else if (nums[mid] < target) {
    return binarySearchRecursive(nums, target, mid + 1, right);
  } else {
    return binarySearchRecursive(nums, target, left, mid - 1);
  }
}

// 查找第一个等于目标值的位置（处理重复元素）
function binarySearchFirst(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid; // 记录找到的位置
      right = mid - 1; // 继续在左半部分查找第一个位置
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

// 查找最后一个等于目标值的位置（处理重复元素）
function binarySearchLast(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid; // 记录找到的位置
      left = mid + 1; // 继续在右半部分查找最后一个位置
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

// 查找插入位置（LeetCode 35. 搜索插入位置）
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left; // 返回插入位置
}

// 测试用例
console.log("=== 二分查找算法测试 ===");

const testArray = [-1, 0, 3, 5, 9, 12];
const testTargets = [9, 2, -1, 12, 0];

console.log("测试数组:", testArray);

testTargets.forEach(target => {
  console.log(`\n查找目标值 ${target}:`);
  console.log(`标准二分查找: ${binarySearch(testArray, target)}`);
  console.log(`递归二分查找: ${binarySearchRecursive(testArray, target)}`);
});

// 测试重复元素的情况
console.log("\n=== 重复元素测试 ===");
const arrayWithDuplicates = [1, 2, 2, 2, 3, 4, 5];
const duplicateTarget = 2;

console.log("数组:", arrayWithDuplicates);
console.log(`查找 ${duplicateTarget}:`);
console.log(`标准查找: ${binarySearch(arrayWithDuplicates, duplicateTarget)}`);
console.log(`第一个位置: ${binarySearchFirst(arrayWithDuplicates, duplicateTarget)}`);
console.log(`最后一个位置: ${binarySearchLast(arrayWithDuplicates, duplicateTarget)}`);

// 测试插入位置
console.log("\n=== 插入位置测试 ===");
const insertTargets = [2, 6, 0, 15];
insertTargets.forEach(target => {
  console.log(`${target} 的插入位置: ${searchInsert(testArray, target)}`);
});

// 性能测试
console.log("\n=== 性能测试 ===");
const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2);
const searchTarget = 999998;

console.time("二分查找");
const result = binarySearch(largeArray, searchTarget);
console.timeEnd("二分查找");
console.log(`在 ${largeArray.length} 个元素中查找 ${searchTarget}，结果: ${result}`);

// 对比线性查找的性能
console.time("线性查找");
const linearResult = largeArray.indexOf(searchTarget);
console.timeEnd("线性查找");
console.log(`线性查找结果: ${linearResult}`);

