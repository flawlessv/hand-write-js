/**
 * LeetCode 78. 子集
 * LeetCode: https://leetcode.cn/problems/subsets/
 * 
 * 题目描述：
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 * 
 * 示例：
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 * 
 * 解题思路：
 * 使用回溯算法，对于每个元素，可以选择加入子集或不加入子集，生成所有可能的子集。
 */

var subsets = function(nums) {
    let result = []
    let path = []
    function backtracking(startIndex) {
        result.push([...path])
        for(let i = startIndex; i < nums.length; i++) {
            path.push(nums[i])
            backtracking(i + 1)
            path.pop()
        }
    }
    backtracking(0)
    return result
};