/**
 * LeetCode 题目：盛最多水的容器
 * 难度：中等
 * 题目链接：https://leetcode.cn/problems/container-with-most-water/
 */

/**
 * 题目描述：
 * 
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])。
 * 
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 
 * 返回容器可以储存的最大水量。
 * 
 * 说明：你不能倾斜容器。
 * 
 * 
 * 示例 1：
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 * 
 * 
 * 示例 2：
 * 输入：height = [1,1]
 * 输出：1
 * 
 * 
 * 提示：
 * - n == height.length
 * - 2 <= n <= 10^5
 * - 0 <= height[i] <= 10^4
 */

// 暴力解法（修正版）
function maxArea(height){
    let max = 0
    for(let i = 0; i < height.length; i++){
      for(let j = i + 1; j < height.length; j++){
          // 面积 = 较小的高度 × 两条线之间的距离（索引差）
          const minHeight = Math.min(height[i], height[j])
          const width = j - i  // 这是关键！需要计算宽度
          const area = minHeight * width
          max = Math.max(max, area)
      }
    }
    return max
  }
  
  // 最优解法：双指针法（时间复杂度 O(n)，空间复杂度 O(1)）
  function maxAreaOptimal(height) {
    // 面积计算：x*y = (right-left) * min(height[right],height[left])
    let maxArea = 0
    let left = 0 // 左指针
    let right = height.length-1 // 右指针

    
    while(left < right){
        const lowerHeight = Math.min(height[left],height[right])
        const area = (right-left)*lowerHeight
        maxArea = Math.max(maxArea,area)

        if(lowerHeight === height[left])  left++
        if(lowerHeight === height[right]) right--
    }

    return maxArea
  }
  
  // 测试
  console.log('暴力解法结果:', maxArea([1,8,6,2,5,4,8,3,7]));  // 应该输出 49
  console.log('最优解法结果:', maxAreaOptimal([1,8,6,2,5,4,8,3,7]));  // 应该输出 49
  console.log('测试用例2 - 暴力解法:', maxArea([1,1]));  // 应该输出 1
  console.log('测试用例2 - 最优解法:', maxAreaOptimal([1,1]));  // 应该输出 1
  
  