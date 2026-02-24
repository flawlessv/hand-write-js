/**
 * LeetCode 15. 三数之和
 * LeetCode: https://leetcode.cn/problems/3sum/
 *
 * 题目描述：
 * 给你一个整数数组 nums，判断是否存在三元组 [nums[a], nums[b], nums[c]]，满足：
 *
 * - 0 <= a, b, c < n
 * - a、b 和 c 互不相同
 * - nums[a] + nums[b] + nums[c] == 0
 *
 * 请你返回所有和为 0 且不重复的三元组。注意：答案中不可以包含重复的三元组。
 *
 * 示例 1：
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 解释：
 * - nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0
 * - nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0
 * - nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0
 * 不同的三元组是 [-1,0,1] 和 [-1,-1,2]
 * 注意，输出的顺序和三元组的顺序并不重要
 *
 * 示例 2：
 * 输入：nums = [0,1,1]
 * 输出：[]
 * 解释：唯一可能的三元组和不为 0
 *
 * 示例 3：
 * 输入：nums = [0,0,0]
 * 输出：[[0,0,0]]
 * 解释：唯一可能的三元组和为 0
 *
 * 提示：
 * - 3 <= nums.length <= 3000
 * - -10^5 <= nums[i] <= 10^5
 *
 * 解题思路：
 * 使用双指针法：
 * - 先对数组排序
 * - 固定第一个数，使用双指针找后两个数
 * - 注意去重，避免重复的三元组
 *
 * 为什么不用哈希表？
 * - 两数之和用哈希表是因为只找一对，且需要返回索引
 * - 三数之和需要返回所有不重复的组合，用哈希表去重会很麻烦
 * - 排序 + 双指针可以自然地在遍历过程中跳过重复值
 *
 * 时间复杂度：O(n^2)，其中 n 是数组的长度
 * - 排序 O(n log n)
 * - 外层循环 O(n)，内层双指针 O(n)，总计 O(n^2)
 * 空间复杂度：O(1)，除了存储答案的空间外
 */

/**
 * 双指针法
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const result = [];
    const n = nums.length;

    // 先对数组排序
    nums.sort((a, b) => a - b);

    // 遍历数组，固定第一个数
    for (let i = 0; i < n - 2; i++) {
        // 去重：如果当前数和前一个数相同，跳过
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        // 优化：如果最小的三个数之和已经大于 0，后续不可能有解
        if (nums[i] + nums[i + 1] + nums[i + 2] > 0) {
            break;
        }

        // 优化：如果当前数与最后两个数之和仍小于 0，需要尝试更大的数
        if (nums[i] + nums[n - 2] + nums[n - 1] < 0) {
            continue;
        }

        // 双指针：left 和 right
        let left = i + 1;
        let right = n - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                // 找到满足条件的三元组
                result.push([nums[i], nums[left], nums[right]]);

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
            } else if (sum < 0) {
                // 和太小，增大 left
                left++;
            } else {
                // 和太大，减小 right
                right--;
            }
        }
    }

    return result;
};

export { threeSum };
