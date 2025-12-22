/**
 * LeetCode 45. 跳跃游戏 II
 * LeetCode: https://leetcode.cn/problems/jump-game-ii/
 * 
 * 题目描述：
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
 * 每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处：
 * - 0 <= j <= nums[i]
 * - i + j < n
 * 
 * 返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
 * 
 * 示例 1：
 * 输入：nums = [2,3,1,1,4]
 * 输出：2
 * 解释：跳到最后一个位置的最小跳跃数是 2。
 *       从下标为 0 跳到下标为 1 跳 1 步，然后跳 3 步到达数组的最后一个下标。
 * 
 * 示例 2：
 * 输入：nums = [2,3,0,1,4]
 * 输出：2
 * 
 * 提示：
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 1000
 * - 题目保证可以到达 nums[n - 1]
 * 
 * 解题思路（贪心算法）：
 * 方法一：贪心算法（推荐）
 * - 核心思想：在每一步都选择能够跳得最远的位置
 * - 维护两个变量：
 *   1. end：当前这一步能够到达的最远位置
 *   2. maxReach：下一步能够到达的最远位置
 * - 遍历数组，当到达当前步的边界时，步数加1，并更新边界为下一步的最远位置
 * 
 * 方法二：动态规划
 * - dp[i] 表示到达位置 i 的最小跳跃次数
 * - 对于每个位置 i，更新所有能够从 i 到达的位置的最小跳跃次数
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
 * 1. 我们不需要知道具体每一步跳到哪里，只需要知道最少需要多少步
 * 2. 维护两个变量：
 *    - end：当前这一步能够到达的最远位置（当前步的边界）
 *    - maxReach：下一步能够到达的最远位置
 * 3. 遍历数组，对于每个位置 i：
 *    - 更新 maxReach = max(maxReach, i + nums[i])
 *    - 当 i == end 时，说明已经到达当前步的边界，需要再跳一步
 *      - 步数加1
 *      - 更新 end = maxReach（下一步的边界）
 * 
 * 贪心策略：
 * - 在每一步都尽可能跳得远，这样可以用最少的步数到达终点
 * - 当到达当前步的边界时，才需要增加一步
 * 
 * 示例分析（nums = [2,3,1,1,4]）：
 * 初始状态：
 *   steps = 0（步数）
 *   end = 0（当前步的边界）
 *   maxReach = 0（下一步能到达的最远位置）
 * 
 * 位置 0: 
 *   maxReach = max(0, 0+2) = 2
 *   i == end，需要增加一步
 *   steps = 1, end = 2
 * 
 * 位置 1:
 *   maxReach = max(2, 1+3) = 4
 *   i != end，继续
 * 
 * 位置 2:
 *   maxReach = max(4, 2+1) = 4
 *   i == end，需要增加一步
 *   steps = 2, end = 4
 * 
 * 位置 3:
 *   maxReach = max(4, 3+1) = 4
 *   i != end，继续
 * 
 * 位置 4:
 *   已经到达最后一个位置，返回 steps = 2
 * 
 * 示例分析（nums = [2,3,0,1,4]）：
 * 位置 0: maxReach = 2, i == end, steps = 1, end = 2
 * 位置 1: maxReach = max(2, 1+3) = 4, i != end
 * 位置 2: maxReach = 4, i == end, steps = 2, end = 4
 * 位置 3: maxReach = 4, i != end
 * 位置 4: 到达终点，返回 steps = 2
 * 
 * @param {number[]} nums
 * @return {number}
 */
function jump(nums: number[]): number {
    const n = nums.length;
    
    // 如果数组长度为 1，已经在最后一个位置，不需要跳跃
    if (n === 1) {
        return 0;
    }
    
    let steps = 0;           // 跳跃次数
    let end = 0;            // 当前这一步能够到达的最远位置（当前步的边界）
    let maxReach = 0;       // 下一步能够到达的最远位置
    
    // 遍历数组，注意不需要遍历最后一个位置
    // 因为如果到达最后一个位置之前，就已经能够跳到最后一个位置了
    for (let i = 0; i < n - 1; i++) {
        // 更新下一步能够到达的最远位置
        maxReach = Math.max(maxReach, i + nums[i]);
        
        // 当到达当前步的边界时，需要再跳一步
        if (i === end) {
            steps++;
            end = maxReach; // 更新下一步的边界
            
            // 如果下一步的边界已经能够到达最后一个位置，可以提前返回
            if (end >= n - 1) {
                return steps;
            }
        }
    }
    
    return steps;
}

/**
 * 方法二：动态规划
 * 
 * 核心思想：
 * 1. dp[i] 表示到达位置 i 的最小跳跃次数
 * 2. 初始化：dp[0] = 0，其他位置初始化为一个很大的数
 * 3. 对于每个位置 i，更新所有能够从 i 到达的位置的最小跳跃次数
 *    - 对于 j 从 i+1 到 i+nums[i]，如果 j < n，则：
 *      dp[j] = min(dp[j], dp[i] + 1)
 * 
 * @param {number[]} nums
 * @return {number}
 */
function jumpDP(nums: number[]): number {
    const n = nums.length;
    
    // dp[i] 表示到达位置 i 的最小跳跃次数
    const dp: number[] = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    
    // 初始位置不需要跳跃
    dp[0] = 0;
    
    // 遍历每个位置
    for (let i = 0; i < n; i++) {
        // 从位置 i 最多能跳到位置 i + nums[i]
        const maxJump = Math.min(i + nums[i], n - 1);
        
        // 更新所有能够从 i 到达的位置的最小跳跃次数
        for (let j = i + 1; j <= maxJump; j++) {
            dp[j] = Math.min(dp[j], dp[i] + 1);
        }
    }
    
    return dp[n - 1];
}

// 测试用例
console.log("=== 跳跃游戏 II 测试 ===");

// 测试用例1
console.log("\n测试用例1:");
const nums1 = [2, 3, 1, 1, 4];
console.log(`输入: nums = [${nums1.join(',')}]`);
console.log(`贪心法输出: ${jump(nums1)}`); // 期望: 2
console.log(`动态规划法输出: ${jumpDP(nums1)}`); // 期望: 2

// 测试用例2
console.log("\n测试用例2:");
const nums2 = [2, 3, 0, 1, 4];
console.log(`输入: nums = [${nums2.join(',')}]`);
console.log(`贪心法输出: ${jump(nums2)}`); // 期望: 2
console.log(`动态规划法输出: ${jumpDP(nums2)}`); // 期望: 2

// 测试用例3：单个元素
console.log("\n测试用例3:");
const nums3 = [0];
console.log(`输入: nums = [${nums3.join(',')}]`);
console.log(`贪心法输出: ${jump(nums3)}`); // 期望: 0
console.log(`动态规划法输出: ${jumpDP(nums3)}`); // 期望: 0

// 测试用例4：需要多步
console.log("\n测试用例4:");
const nums4 = [1, 1, 1, 1];
console.log(`输入: nums = [${nums4.join(',')}]`);
console.log(`贪心法输出: ${jump(nums4)}`); // 期望: 3
console.log(`动态规划法输出: ${jumpDP(nums4)}`); // 期望: 3

// 测试用例5：大跳跃
console.log("\n测试用例5:");
const nums5 = [5, 0, 0, 0, 0, 0];
console.log(`输入: nums = [${nums5.join(',')}]`);
console.log(`贪心法输出: ${jump(nums5)}`); // 期望: 1
console.log(`动态规划法输出: ${jumpDP(nums5)}`); // 期望: 1

// 测试用例6：复杂情况
console.log("\n测试用例6:");
const nums6 = [2, 3, 1, 1, 2, 4, 2, 0, 1, 1];
console.log(`输入: nums = [${nums6.join(',')}]`);
console.log(`贪心法输出: ${jump(nums6)}`); // 期望: 4
console.log(`动态规划法输出: ${jumpDP(nums6)}`); // 期望: 4

// 测试用例7：递增数组
console.log("\n测试用例7:");
const nums7 = [1, 2, 3, 4, 5];
console.log(`输入: nums = [${nums7.join(',')}]`);
console.log(`贪心法输出: ${jump(nums7)}`); // 期望: 3
console.log(`动态规划法输出: ${jumpDP(nums7)}`); // 期望: 3

// 测试用例8：递减数组
console.log("\n测试用例8:");
const nums8 = [4, 3, 2, 1, 0];
console.log(`输入: nums = [${nums8.join(',')}]`);
console.log(`贪心法输出: ${jump(nums8)}`); // 期望: 1
console.log(`动态规划法输出: ${jumpDP(nums8)}`); // 期望: 1

export { jump, jumpDP };















