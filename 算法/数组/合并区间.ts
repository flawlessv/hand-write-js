/**
 * LeetCode 56. 合并区间
 * LeetCode: https://leetcode.cn/problems/merge-intervals/
 * 
 * 题目描述：
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]。
 * 请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
 * 
 * 示例 1：
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]
 * 
 * 示例 2：
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间
 * 
 * 提示：
 * - 1 <= intervals.length <= 10^4
 * - intervals[i].length == 2
 * - 0 <= starti <= endi <= 10^4
 * 
 * 解题思路：
 * 1. 先按区间的起始位置排序
 * 2. 遍历排序后的区间，如果当前区间与结果中最后一个区间重叠，则合并
 * 3. 否则直接添加到结果中
 * 
 * 时间复杂度：O(n log n) - 排序的时间复杂度
 * 空间复杂度：O(log n) - 排序所需的额外空间
 */


const mergeArr = (intervals: number[][]): number[][] => {
  if (intervals.length <= 1) return intervals;
  // 按左区间排序
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    const cur = intervals[i];
    // 后一个区间的左端点，小于等于前一个区间的右端点，说明区间重叠
    if (cur[0] <= last[1]) {
      // 新区间右端点取两个区间右端点大的那个
      last[1] = Math.max(cur[1], last[1]);
      continue;
    }

    result.push(intervals[i]);
  }
  return result;
};
