/**
 * LeetCode 53. 最大子数组和（最大子序和）
 * 
 * 题目描述：
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组 是数组中的一个连续部分。
 * 
 * 示例：
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 * 
 * 输入：nums = [1]
 * 输出：1
 * 
 * 输入：nums = [5,4,-1,7,8]
 * 输出：23
 * 
 * 解题思路：
 * 这是一个经典的动态规划问题，也可以用贪心算法解决。
 * 
 * 方法一：动态规划（Kadane算法）
 * 状态定义：
 * dp[i] 表示以 nums[i] 结尾的最大连续子数组和
 * 
 * 状态转移方程：
 * dp[i] = max(nums[i], dp[i-1] + nums[i])
 * 
 * 解释：
 * - nums[i]：从当前位置重新开始
 * - dp[i-1] + nums[i]：延续之前的子数组
 * 
 * 方法二：贪心算法
 * 核心思想：当前面子数组和为负数时，丢弃前面的子数组，从当前位置重新开始
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */

// 方法一：动态规划（数组版本）
function maxSubArrayDP(nums: number[]): number {
  const n = nums.length;
  const dp: number[] = [];
  dp[0] = nums[0];
  
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
  }
  return Math.max(...dp);
}

// 方法二：动态规划（空间优化版本）
function maxArr(arr: number[]): number {
  let preValue = arr[0];  // 前一个位置的最大子数组和
  let max = preValue;     // 全局最大值
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    // 要么从当前位置重新开始，要么延续之前的子数组
    preValue = Math.max(arr[i], arr[i] + preValue);
    max = Math.max(preValue, max);
  }
  return max;
}

// 方法三：贪心算法（Kadane算法的贪心实现）
function maxSubArray(nums: number[]): number {
  let maxSum = -Infinity;  // 全局最大和
  let curSum = 0;          // 当前子数组和
  
  for (let i = 0; i < nums.length; i++) {
    curSum += nums[i];
    maxSum = Math.max(curSum, maxSum);
    
    // 如果当前和为负数，丢弃之前的子数组，重新开始
    if (curSum < 0) {
      curSum = 0;
    }
  }
  return maxSum;
}

// 方法四：分治算法（了解即可，时间复杂度较高）
function maxSubArrayDivide(nums: number[]): number {
  function helper(left: number, right: number): number {
    if (left === right) return nums[left];
    
    const mid = Math.floor((left + right) / 2);
    
    // 左半部分的最大子数组和
    const leftMax = helper(left, mid);
    // 右半部分的最大子数组和
    const rightMax = helper(mid + 1, right);
    
    // 跨越中点的最大子数组和
    let leftSum = -Infinity;
    let sum = 0;
    for (let i = mid; i >= left; i--) {
      sum += nums[i];
      leftSum = Math.max(leftSum, sum);
    }
    
    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
      sum += nums[i];
      rightSum = Math.max(rightSum, sum);
    }
    
    const crossSum = leftSum + rightSum;
    
    return Math.max(leftMax, rightMax, crossSum);
  }
  
  return helper(0, nums.length - 1);
}

// 测试用例
console.log("=== 最大子数组和测试 ===");
const testCases = [
  [-2, 1, -3, 4, -1, 2, 1, -5, 4],  // 期望输出: 6
  [1],                               // 期望输出: 1
  [5, 4, -1, 7, 8],                 // 期望输出: 23
  [-1],                              // 期望输出: -1
  [-2, -1],                          // 期望输出: -1
  [2, 3, -2, 1, 5, -2, 5, 7, -10, 2, 8] // 期望输出: 17
];

testCases.forEach((nums, index) => {
  console.log(`测试用例 ${index + 1}: [${nums.join(', ')}]`);
  console.log(`动态规划(数组): ${maxSubArrayDP(nums)}`);
  console.log(`动态规划(优化): ${maxArr(nums)}`);
  console.log(`贪心算法: ${maxSubArray(nums)}`);
  console.log(`分治算法: ${maxSubArrayDivide(nums)}`);
  console.log('---');
});
export {};