/**
 * LeetCode 77. 组合
 * LeetCode: https://leetcode.cn/problems/combinations/
 * 
 * 题目描述：
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 * 你可以按 任何顺序 返回答案。
 * 
 * 示例：
 * 输入：n = 4, k = 2
 * 输出：[[2,4],[3,4],[2,3],[1,2],[1,3],[1,4]]
 * 
 * 解题思路：
 * 使用回溯算法，通过递归和剪枝来生成所有可能的组合。
 */

let result = []
let path = []
var combine = function(n, k) {
  combineHelper(n, k, 1)
  return result
};
const combineHelper = (n, k, startIndex) => {
  if (path.length === k) {
    result.push([...path])
    return
  }
  for (let i = startIndex; i <= n - (k - path.length) + 1; ++i) {
    path.push(i)
    combineHelper(n, k, i + 1)
    path.pop()
  }
}