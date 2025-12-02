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

/**
 * 标准解法：排序 + 合并
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    // 如果区间数量小于等于1，直接返回
    if(intervals.length <= 1) {
        return intervals;
    }
    
    // 按区间的起始位置排序
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result = [];
    // 将第一个区间加入结果
    result.push(intervals[0]);
    
    // 遍历剩余的区间
    for(let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = result[result.length - 1];
        
        // 如果当前区间的起始位置 <= 上一个区间的结束位置，说明重叠
        if(current[0] <= last[1]) {
            // 合并区间：更新上一个区间的结束位置为两者的最大值
            last[1] = Math.max(last[1], current[1]);
        } else {
            // 不重叠，直接添加到结果中
            result.push(current);
        }
    }
    
    return result;
};

// 测试用例
console.log("=== 合并区间测试 ===");

// 测试用例1
const intervals1 = [[1,3],[2,6],[8,10],[15,18]];
console.log("测试用例1:");
console.log("输入:", JSON.stringify(intervals1));
console.log("输出:", JSON.stringify(merge(intervals1)));  // 期望: [[1,6],[8,10],[15,18]]

// 测试用例2
const intervals2 = [[1,4],[4,5]];
console.log("\n测试用例2:");
console.log("输入:", JSON.stringify(intervals2));
console.log("输出:", JSON.stringify(merge(intervals2)));  // 期望: [[1,5]]

// 测试用例3
const intervals3 = [[1,4],[0,4]];
console.log("\n测试用例3:");
console.log("输入:", JSON.stringify(intervals3));
console.log("输出:", JSON.stringify(merge(intervals3)));  // 期望: [[0,4]]

// 测试用例4
const intervals4 = [[1,4],[2,3]];
console.log("\n测试用例4:");
console.log("输入:", JSON.stringify(intervals4));
console.log("输出:", JSON.stringify(merge(intervals4)));  // 期望: [[1,4]]

