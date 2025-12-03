/**
 * LeetCode 26. 删除有序数组中的重复项
 * LeetCode: https://leetcode.cn/problems/remove-duplicates-from-sorted-array/
 * 
 * 题目描述：
 * 
 * 给你一个 非严格递增排列 的数组 nums，请你 原地 删除重复出现的元素，使每个元素 只出现一次，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致。然后返回 nums 中唯一元素的个数。
 * 
 * 考虑 nums 的唯一元素的数量为 k，你需要做以下事情：
 * - 如果数组 k 个唯一元素，那么最终数组 nums 的前 k 个元素应该保存这些唯一元素。
 * - 不需要考虑数组中超出新长度后面的元素。
 * 
 * 
 * 示例 1：
 * 输入：nums = [1,1,2]
 * 输出：2, nums = [1,2,_]
 * 解释：函数应该返回新的长度 2，并且原数组 nums 的前两个元素被修改为 1, 2。不需要考虑数组中超出新长度后面的元素。
 * 
 * 
 * 示例 2：
 * 输入：nums = [0,0,1,1,1,2,2,3,3,4]
 * 输出：5, nums = [0,1,2,3,4]
 * 解释：函数应该返回新的长度 5，并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。不需要考虑数组中超出新长度后面的元素。
 * 
 * 
 * 提示：
 * - 1 <= nums.length <= 3 * 10^4
 * - -10^4 <= nums[i] <= 10^4
 * - nums 已按 非严格递增 排列
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicatesCorrect = function(nums) {
    if (nums.length <= 1) return nums.length;
    
    let left = 0;  // 慢指针：指向下一个不重复元素应该放置的位置
    
    // 快指针遍历整个数组
    for (let right = 1; right < nums.length; right++) {
        // 如果当前元素与 left 指向的元素不同，说明找到了新的不重复元素
        if (nums[right] !== nums[left]) {
            left++;  // left 指针右移
            nums[left] = nums[right];  // 将新元素放到 left 位置
        }
        // 如果 nums[right] === nums[left]，说明是重复元素，跳过（left 不动，right 继续）
    }
    
    return left + 1;  // 返回新数组的长度
};
