/**
 * LeetCode 674. 最长连续递增子序列
 * 
 * 题目描述：
 * 给定一个未经排序的整数数组，找到最长且连续递增的子序列，并返回该序列的长度。
 * 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，
 * 如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，
 * 那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。
 * 
 * 示例：
 * 输入：nums = [1,3,5,4,7]
 * 输出：3
 * 解释：最长连续递增序列是 [1,3,5], 长度为3。
 * 尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 分隔。
 * 
 * 输入：nums = [2,2,2,2,2]
 * 输出：1
 * 解释：最长连续递增序列是 [2], 长度为1。
 * 
 * 解题思路：
 * 这是一个动态规划问题，关键是理解"连续"的含义。
 * 
 * 方法一：动态规划
 * 状态定义：
 * dp[i] 表示以 nums[i] 结尾的最长连续递增子序列的长度
 * 
 * 状态转移方程：
 * - 如果 nums[i] > nums[i-1]，则 dp[i] = dp[i-1] + 1
 * - 否则 dp[i] = 1（重新开始计算）
 * 
 * 初始状态：
 * dp[0] = 1（单个元素的长度为1）
 * 
 * 方法二：贪心算法（一次遍历）
 * 用一个变量记录当前连续递增序列的长度，遇到递增就加1，否则重置为1
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n) - 动态规划版本，O(1) - 贪心版本
 */

// 方法一：动态规划
function findLengthOfLCIS(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    /**
     * dp[i]: 以nums[i]结尾的最长连续递增子序列的长度
     */
    const dp: number[] = new Array(nums.length).fill(1);
    let resMax: number = 1;
    
    for (let i = 1, length = nums.length; i < length; i++) {
        if (nums[i] > nums[i - 1]) {
            dp[i] = dp[i - 1] + 1;
        }
        // dp[i] 默认为 1，不需要 else 分支
        resMax = Math.max(resMax, dp[i]);
    }
    return resMax;
}

// 方法二：贪心算法（空间优化）
function findLengthOfLCISOptimized(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let maxLength = 1;      // 最长连续递增序列长度
    let currentLength = 1;  // 当前连续递增序列长度
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            currentLength++;
        } else {
            currentLength = 1; // 重新开始计算
        }
        maxLength = Math.max(maxLength, currentLength);
    }
    
    return maxLength;
}

// 测试用例
console.log("=== 最长连续递增子序列测试 ===");
const testCases = [
    [1, 3, 5, 4, 7],        // 期望输出: 3 ([1,3,5])
    [2, 2, 2, 2, 2],        // 期望输出: 1 ([2])
    [1, 3, 5, 7],           // 期望输出: 4 ([1,3,5,7])
    [2, 1, 3, 4, 5],        // 期望输出: 4 ([1,3,4,5])
    [1],                    // 期望输出: 1
    []                      // 期望输出: 0
];

testCases.forEach((nums, index) => {
    console.log(`测试用例 ${index + 1}: [${nums.join(', ')}]`);
    console.log(`动态规划结果: ${findLengthOfLCIS(nums)}`);
    console.log(`贪心算法结果: ${findLengthOfLCISOptimized(nums)}`);
    console.log('---');
});

export {}