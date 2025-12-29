/**
 * LeetCode 18. 四数之和
 * LeetCode: https://leetcode.cn/problems/4sum/
 * 
 * 题目描述：
 * 给你一个由 n 个整数组成的数组 nums，和一个目标值 target。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]]：
 * 
 * - 0 <= a, b, c, d < n
 * - a、b、c 和 d 互不相同
 * - nums[a] + nums[b] + nums[c] + nums[d] == target
 * 
 * 你可以按任意顺序返回答案。
 * 
 * 示例 1：
 * 输入：nums = [1,0,-1,0,-2,2], target = 0
 * 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 * 
 * 示例 2：
 * 输入：nums = [2,2,2,2,2], target = 8
 * 输出：[[2,2,2,2]]
 * 
 * 提示：
 * - 1 <= nums.length <= 200
 * - -10^9 <= nums[i] <= 10^9
 * - -10^9 <= target <= 10^9
 * 
 * 解题思路：
 * 使用双指针法（类似三数之和的扩展）：
 * - 先对数组排序
 * - 固定前两个数，使用双指针找后两个数
 * - 使用两层循环固定前两个数，内层使用双指针
 * - 注意去重，避免重复的四元组
 * 
 * 时间复杂度：O(n^3)，其中 n 是数组的长度
 * 空间复杂度：O(1)，除了存储答案的空间外
 */

/**
 * 双指针法
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    const result = [];
    const n = nums.length;
    
    // 如果数组长度小于4，直接返回空数组
    if (n < 4) {
        return result;
    }
    
    // 先对数组排序
    nums.sort((a, b) => a - b);
    
    // 第一层循环：固定第一个数
    for (let i = 0; i < n - 3; i++) {
        // 去重：如果当前数和前一个数相同，跳过
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        
        // 第二层循环：固定第二个数
        for (let j = i + 1; j < n - 2; j++) {
            // 去重：如果当前数和前一个数相同，跳过
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            
            // 双指针：left 和 right
            let left = j + 1;
            let right = n - 1;
            
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                
                if (sum === target) {
                    // 找到满足条件的四元组
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    
                    // 去重：跳过相同的 left 值
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    // 去重：跳过相同的 right 值
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }
                    
                    // 移动指针
                    left++;
                    right--;
                } else if (sum < target) {
                    // 和太小，增大 left
                    left++;
                } else {
                    // 和太大，减小 right
                    right--;
                }
            }
        }
    }
    
    return result;
};

export { fourSum };















