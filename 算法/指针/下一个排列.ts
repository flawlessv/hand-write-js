/**
 * LeetCode 31. 下一个排列
 * LeetCode:
 * https://leetcode.cn/problems/next-permutation/description/?envType=study-plan-v2&envId=top-100-liked
 *
 * 题目描述：
 * 给定一个整数数组 nums，需要原地求出它的下一个排列。
 * 如果当前已经是字典序最大的排列，就把它重排成最小排列。
 *
 * 思路：
 * 这道题的关键不是“变大”，而是“刚好比当前排列大一点点”。
 * 所以我们要尽量少改动高位，优先从右往左找可以变化的位置。
 *
 * 1. 从右往左找到第一个满足 nums[i] < nums[i + 1] 的位置 p
 *    - 说明 p 右侧这一段已经是非递增的
 *    - 这一段本身已经没有更大的排列了
 *    - 如果想得到下一个排列，只能让 nums[p] 变大一点
 *
 * 2. 再从右往左找到第一个大于 nums[p] 的位置
 *    - 因为右侧整体是非递增的
 *    - 所以从右往左遇到的第一个 > nums[p] 的数，正好就是“比它大的最小值”
 *    - 交换这两个位置，保证第 p 位只增大一点点
 *
 * 3. 交换后，将 p 后面的后缀反转
 *    - 交换后，后缀仍然是一个非递增结构
 *    - 为了让整体结果尽可能小，后缀应该变成升序，也就是字典序最小
 *    - 非递增数组直接反转，就能得到升序结果
 *
 * 4. 如果不存在这样的 p
 *    - 说明整个数组已经是非递增的，也就是最大排列
 *    - 此时直接整体反转，得到最小排列
 *
 * 示例：
 * nums = [1, 2, 7, 4, 3, 1]
 * 1. 从右往左找到 p = 1，因为 nums[1] = 2 < 7
 * 2. 从右往左找到第一个大于 2 的数是 3
 * 3. 交换得到 [1, 3, 7, 4, 2, 1]
 * 4. 反转后缀得到 [1, 3, 1, 2, 4, 7]
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */



/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
    // 1. 从右往左找第一个升序对，锁定需要变动的位置 p
    let p = -1
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] >= nums[i + 1]) continue
        p = i;
        break;
    }

    // 如果整个数组都是非递增的，说明当前已经是最大排列
    if (p === -1) {
        helpSort(nums, 0, nums.length - 1)
        return
    }

    // 2. 从右往左找第一个比 nums[p] 大的数，和它交换
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] <= nums[p]) continue
        [nums[p], nums[i]] = [nums[i], nums[p]]
        break;
    }

    // 3. 反转后缀，让后缀变成最小字典序
    helpSort(nums, p + 1, nums.length - 1)
};


const helpSort = (nums: number[], left: number, right: number) => {
    while (left <= right) {
        [nums[left], nums[right]] = [nums[right], nums[left]]
        left++
        right--
    }
}
