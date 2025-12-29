/**
 * LeetCode 300. 最长递增子序列
 * LeetCode: https://leetcode.cn/problems/longest-increasing-subsequence/
 * 
 * 题目描述：
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 
 * 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
 * 例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 * 
 * 
 * 示例 1：
 * 输入：nums = [10,9,2,5,3,7,101,18]
 * 输出：4
 * 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4。
 * 
 * 示例 2：
 * 输入：nums = [0,1,0,3,2,3]
 * 输出：4
 * 
 * 示例 3：
 * 输入：nums = [7,7,7,7,7,7,7]
 * 输出：1
 * 
 * 
 * 提示：
 * - 1 <= nums.length <= 2500
 * - -10^4 <= nums[i] <= 10^4
 * 
 * 
 * 解题思路：
 * 
 * 方法一：动态规划
 * 状态定义：
 * dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
 * 
 * 状态转移方程：
 * dp[i] = max(dp[j]) + 1，其中 0 <= j < i 且 nums[j] < nums[i]
 * 
 * 初始状态：
 * dp[i] = 1（每个元素本身就是一个长度为1的子序列）
 * 
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n)
 * 
 * 
 * 方法二：贪心 + 二分查找（优化）
 * 维护一个数组 tail，其中 tail[i] 表示长度为 i+1 的递增子序列的末尾元素的最小值
 * 
 * 遍历数组，对于每个元素：
 * 1. 如果当前元素大于 tail 数组的最后一个元素，直接追加
 * 2. 否则，使用二分查找找到第一个大于等于当前元素的位置，替换它
 * 
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(n)
 */

// 方法一：动态规划
function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    /**
     * dp[i]: 以nums[i]结尾的最长递增子序列的长度
     */
    const dp: number[] = new Array(nums.length).fill(1);
    let maxLength = 1;
    
    for (let i = 1; i < nums.length; i++) {
        // 遍历 i 之前的所有元素
        for (let j = 0; j < i; j++) {
            // 如果 nums[j] < nums[i]，说明可以形成递增子序列
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}

// 方法二：贪心 + 二分查找（优化）
function lengthOfLISOptimized(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    /**
     * tail[i]: 长度为 i+1 的递增子序列的末尾元素的最小值
     * tail 数组是单调递增的
     */
    const tail: number[] = [];
    
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        
        // 如果当前元素大于 tail 数组的最后一个元素，直接追加
        if (tail.length === 0 || num > tail[tail.length - 1]) {
            tail.push(num);
        } else {
            // 否则，使用二分查找找到第一个大于等于当前元素的位置
            let left = 0;
            let right = tail.length - 1;
            
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (tail[mid] < num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            
            // 替换该位置的元素
            tail[left] = num;
        }
    }
    
    return tail.length;
}

// 辅助函数：获取最长递增子序列的具体内容（仅用于演示）
function getLIS(nums: number[]): number[] {
    if (nums.length === 0) return [];
    
    const dp: number[] = new Array(nums.length).fill(1);
    const prev: number[] = new Array(nums.length).fill(-1);
    let maxLength = 1;
    let maxIndex = 0;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            maxIndex = i;
        }
    }
    
    // 回溯构建最长递增子序列
    const result: number[] = [];
    let index = maxIndex;
    while (index !== -1) {
        result.unshift(nums[index]);
        index = prev[index];
    }
    
    return result;
}

// 测试用例
console.log("=== 最长递增子序列测试 ===");

const testCases = [
    [10, 9, 2, 5, 3, 7, 101, 18],  // 期望输出: 4 ([2,3,7,101])
    [0, 1, 0, 3, 2, 3],             // 期望输出: 4 ([0,1,2,3])
    [7, 7, 7, 7, 7, 7, 7],          // 期望输出: 1 ([7])
    [1],                             // 期望输出: 1
    [1, 3, 6, 7, 9, 4, 10, 5, 6],   // 期望输出: 6
    []                               // 期望输出: 0
];

testCases.forEach((nums, index) => {
    console.log(`\n测试用例 ${index + 1}: [${nums.join(', ')}]`);
    console.log(`动态规划结果: ${lengthOfLIS(nums)}`);
    console.log(`贪心+二分结果: ${lengthOfLISOptimized(nums)}`);
    if (nums.length > 0) {
        console.log(`最长递增子序列: [${getLIS(nums).join(', ')}]`);
    }
    console.log('---');
});

export {}

