/**
 * LeetCode 42. 接雨水
 * LeetCode: https://leetcode.cn/problems/trapping-rain-water/
 * 
 * 题目描述：
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 
 * 示例 1：
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 
 * 示例 2：
 * 输入：height = [4,2,0,3,2,5]
 * 输出：9
 * 
 * 提示：
 * - n == height.length
 * - 1 <= n <= 2 * 10^4
 * - 0 <= height[i] <= 10^5
 * 
 * 解题思路：
 * 方法一：单调栈（推荐，符合本题分类）
 * 1. 栈中存下标，保持对应高度单调递减。
 * 2. 遍历到当前柱子 i，如果 height[i] 大于栈顶柱子高度，说明出现了“右边界”。
 * 3. 弹出栈顶作为“凹槽底部”，再看新的栈顶作为“左边界”：
 *    - 宽度 = i - leftIndex - 1
 *    - 有效高度 = min(height[leftIndex], height[i]) - height[bottomIndex]
 *    - 累加面积 = 宽度 * 有效高度
 * 4. 当前柱子入栈，继续遍历。
 * 
 * 方法二：双指针（空间更优）
 * - 用 leftMax/rightMax 记录两侧最大高度，较低的一侧决定当前可接雨水量。
 * 
 * 时间复杂度：
 * - 单调栈：O(n)，每个元素最多入栈出栈一次
 * - 双指针：O(n)
 * 
 * 空间复杂度：
 * - 单调栈：O(n)
 * - 双指针：O(1)
 */

/**
 * 方法一：单调栈
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let water = 0;
    const stack = []; // 存下标，保持对应高度单调递减
    
    for (let i = 0; i < height.length; i++) {
        // 当前柱子更高，说明可能形成凹槽，尝试计算接水量
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const bottomIndex = stack.pop(); // 凹槽底部
            
            // 没有左边界，无法形成容器
            if (stack.length === 0) {
                break;
            }
            
            const leftIndex = stack[stack.length - 1]; // 左边界
            const width = i - leftIndex - 1;
            const boundedHeight = Math.min(height[leftIndex], height[i]) - height[bottomIndex];
            
            water += width * boundedHeight;
        }
        
        stack.push(i);
    }
    
    return water;
};

/**
 * 方法二：双指针
 * @param {number[]} height
 * @return {number}
 */
var trapTwoPointers = function(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    
    return water;
};

// 测试用例
console.log("=== 接雨水测试 ===");

const height1 = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log("测试用例1:");
console.log("输入:", height1);
console.log("单调栈输出:", trap(height1)); // 期望: 6
console.log("双指针输出:", trapTwoPointers(height1)); // 期望: 6

const height2 = [4,2,0,3,2,5];
console.log("\n测试用例2:");
console.log("输入:", height2);
console.log("单调栈输出:", trap(height2)); // 期望: 9
console.log("双指针输出:", trapTwoPointers(height2)); // 期望: 9

const height3 = [2,0,2];
console.log("\n测试用例3:");
console.log("输入:", height3);
console.log("单调栈输出:", trap(height3)); // 期望: 2
console.log("双指针输出:", trapTwoPointers(height3)); // 期望: 2
