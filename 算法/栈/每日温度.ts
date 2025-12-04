/**
 * 每日温度 (LeetCode 739) - Medium
 * https://leetcode.cn/problems/daily-temperatures/
 * 
 * 给定一个整数数组 temperatures 表示每天的温度
 * 返回一个数组 answer，其中 answer[i] 是指对于第 i 天
 * 下一个更高温度出现在几天后
 * 如果气温在这之后都不会升高，请在该位置用 0 来代替
 * 
 * 示例：
 * 输入：temperatures = [73,74,75,71,69,72,76,73]
 * 输出：[1,1,4,2,1,1,0,0]
 * 
 * 思路：单调递减栈
 * 1. 维护一个单调递减栈，栈中存储下标
 * 2. 遍历数组，当当前温度大于栈顶温度时，说明找到了更高温度
 * 3. 弹出栈顶，计算天数差值
 * 
 * 时间复杂度：O(n) - 每个元素最多入栈出栈各一次
 * 空间复杂度：O(n) - 栈空间
 */

function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack: number[] = []; // 存储下标，保持单调递减

  for (let i = 0; i < n; i++) {
    // 当前温度比栈顶温度高，找到了更高温度
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop()!;
      result[prevIndex] = i - prevIndex;
    }
    // 当前下标入栈
    stack.push(i);
  }

  return result;
}

export { dailyTemperatures };

