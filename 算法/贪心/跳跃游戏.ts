/**
 * LeetCode 55. 跳跃游戏
 * LeetCode: https://leetcode.cn/problems/jump-game/
 * 
 * 题目描述：
 * 给定一个非负整数数组 nums，你最初位于数组的第一个下标。
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 判断你是否能够到达最后一个下标。
 * 
 * 示例 1：
 * 输入：nums = [2,3,1,1,4]
 * 输出：true
 * 解释：可以先跳 1 步从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 * 
 * 示例 2：
 * 输入：nums = [3,2,1,0,4]
 * 输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0，所以永远不可能到达最后一个下标。
 * 
 * 提示：
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 10^5
 * 
 * 解题思路（贪心算法）：
 * 方法一：贪心算法（推荐）
 * - 核心思想：维护一个变量 maxReach，表示当前能够到达的最远位置
 * - 遍历数组，对于每个位置 i：
 *   1. 如果 i > maxReach，说明无法到达位置 i，返回 false
 *   2. 更新 maxReach = max(maxReach, i + nums[i])
 *   3. 如果 maxReach >= nums.length - 1，说明可以到达最后一个位置，返回 true
 * - 贪心策略：每一步都尽可能跳得远，看能否覆盖到最后一个位置
 * 
 * 方法二：动态规划（自底向上）
 * - dp[i] 表示从位置 i 能否到达最后一个位置
 * - 从后往前遍历，对于每个位置 i，检查能否通过跳跃到达已经可达的位置
 * 
 * 时间复杂度：
 * - 方法一：O(n)，其中 n 是数组的长度
 * - 方法二：O(n^2)
 * 
 * 空间复杂度：
 * - 方法一：O(1)
 * - 方法二：O(n)
 */

/**
 * 方法一：贪心算法（推荐）
 * 
 * 核心思想详解：
 * 1. 我们不需要知道具体怎么跳，只需要知道能否到达最后一个位置
 * 2. 维护一个变量 maxReach，表示当前能够到达的最远位置
 * 3. 遍历数组，对于每个位置 i：
 *    - 如果当前位置 i 已经超过了 maxReach，说明无法到达，返回 false
 *    - 否则，更新 maxReach = max(maxReach, i + nums[i])
 *    - 如果 maxReach >= 最后一个位置，说明可以到达，返回 true
 * 
 * 贪心策略：
 * - 每一步都尽可能跳得远，看能否覆盖到最后一个位置
 * - 不需要考虑具体怎么跳，只需要知道最远能到哪里
 * 
 * 示例分析（nums = [2,3,1,1,4]）：
 * 位置 0: maxReach = max(0, 0+2) = 2，可以到达位置 0,1,2
 * 位置 1: maxReach = max(2, 1+3) = 4，可以到达位置 0,1,2,3,4
 *         因为 4 >= 4（最后一个位置），所以返回 true
 * 
 * 示例分析（nums = [3,2,1,0,4]）：
 * 位置 0: maxReach = max(0, 0+3) = 3，可以到达位置 0,1,2,3
 * 位置 1: maxReach = max(3, 1+2) = 3，可以到达位置 0,1,2,3
 * 位置 2: maxReach = max(3, 2+1) = 3，可以到达位置 0,1,2,3
 * 位置 3: maxReach = max(3, 3+0) = 3，可以到达位置 0,1,2,3
 * 位置 4: i=4 > maxReach=3，无法到达位置 4，返回 false
 * 
 * @param {number[]} nums
 * @return {boolean}
 */
function canJump(nums: number[]): boolean {
    // maxReach：当前能够到达的最远位置
    let maxReach = 0;
    const n = nums.length;
    
    // 遍历数组
    for (let i = 0; i < n; i++) {
        // 如果当前位置已经超过了能够到达的最远位置，说明无法到达
        if (i > maxReach) {
            return false;
        }
        
        // 更新能够到达的最远位置
        // i + nums[i] 表示从位置 i 能够到达的最远位置
        maxReach = Math.max(maxReach, i + nums[i]);
        
        // 如果已经能够到达最后一个位置，提前返回 true
        if (maxReach >= n - 1) {
            return true;
        }
    }
    
    // 遍历完数组，说明可以到达最后一个位置
    return true;
}

/**
 * 方法二：动态规划（自底向上）
 * 
 * 核心思想：
 * 1. dp[i] 表示从位置 i 能否到达最后一个位置
 * 2. 从后往前遍历，对于每个位置 i：
 *    - 如果 i + nums[i] >= n - 1，说明可以直接跳到最后一个位置，dp[i] = true
 *    - 否则，检查能否通过跳跃到达已经可达的位置 j（i < j <= i + nums[i]），如果存在 dp[j] = true，则 dp[i] = true
 * 
 * @param {number[]} nums
 * @return {boolean}
 */
function canJumpDP(nums: number[]): boolean {
    const n = nums.length;
    // dp[i] 表示从位置 i 能否到达最后一个位置
    const dp: boolean[] = new Array(n).fill(false);
    
    // 最后一个位置肯定可以到达
    dp[n - 1] = true;
    
    // 从后往前遍历
    for (let i = n - 2; i >= 0; i--) {
        // 从位置 i 最多能跳到位置 i + nums[i]
        const maxJump = Math.min(i + nums[i], n - 1);
        
        // 检查能否通过跳跃到达已经可达的位置
        for (let j = i + 1; j <= maxJump; j++) {
            if (dp[j]) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[0];
}

// 测试用例
console.log("=== 跳跃游戏测试 ===");

// 测试用例1
console.log("\n测试用例1:");
const nums1 = [2, 3, 1, 1, 4];
console.log(`输入: nums = [${nums1.join(',')}]`);
console.log(`贪心法输出: ${canJump(nums1)}`); // 期望: true
console.log(`动态规划法输出: ${canJumpDP(nums1)}`); // 期望: true

// 测试用例2
console.log("\n测试用例2:");
const nums2 = [3, 2, 1, 0, 4];
console.log(`输入: nums = [${nums2.join(',')}]`);
console.log(`贪心法输出: ${canJump(nums2)}`); // 期望: false
console.log(`动态规划法输出: ${canJumpDP(nums2)}`); // 期望: false

// 测试用例3：单个元素
console.log("\n测试用例3:");
const nums3 = [0];
console.log(`输入: nums = [${nums3.join(',')}]`);
console.log(`贪心法输出: ${canJump(nums3)}`); // 期望: true（已经在最后一个位置）
console.log(`动态规划法输出: ${canJumpDP(nums3)}`); // 期望: true

// 测试用例4：第一个位置就是0
console.log("\n测试用例4:");
const nums4 = [0, 2, 3];
console.log(`输入: nums = [${nums4.join(',')}]`);
console.log(`贪心法输出: ${canJump(nums4)}`); // 期望: false
console.log(`动态规划法输出: ${canJumpDP(nums4)}`); // 期望: false

// 测试用例5：可以到达
console.log("\n测试用例5:");
const nums5 = [1, 1, 1, 1];
console.log(`输入: nums = [${nums5.join(',')}]`);
console.log(`贪心法输出: ${canJump(nums5)}`); // 期望: true
console.log(`动态规划法输出: ${canJumpDP(nums5)}`); // 期望: true

// 测试用例6：大跳跃
console.log("\n测试用例6:");
const nums6 = [5, 0, 0, 0, 0, 0];
console.log(`输入: nums = [${nums6.join(',')}]`);
console.log(`贪心法输出: ${canJump(nums6)}`); // 期望: true
console.log(`动态规划法输出: ${canJumpDP(nums6)}`); // 期望: true

// 测试用例7：无法到达
console.log("\n测试用例7:");
const nums7 = [1, 0, 1, 0];
console.log(`输入: nums = [${nums7.join(',')}]`);
console.log(`贪心法输出: ${canJump(nums7)}`); // 期望: false
console.log(`动态规划法输出: ${canJumpDP(nums7)}`); // 期望: false

export { canJump, canJumpDP };













