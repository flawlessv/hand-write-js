/**
 * LeetCode 209. 长度最小的子数组
 * LeetCode: https://leetcode.cn/problems/minimum-size-subarray-sum/
 * 
 * 题目描述：
 * 给定一个含有 n 个正整数的数组和一个正整数 target，找出该数组中满足其和 ≥ target 的长度最小的连续子数组，
 * 并返回其长度。如果不存在符合条件的子数组，返回 0。
 * 
 * 示例：
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 * 
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 * 
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 * 
 * 解题思路：
 * 使用滑动窗口（双指针）技术：
 * 1. 右指针不断扩大窗口，直到窗口内的和 >= target
 * 2. 记录当前窗口长度，然后尝试缩小左边界
 * 3. 左指针向右移动，缩小窗口，直到窗口内的和 < target
 * 4. 重复上述过程，记录最小窗口长度
 * 
 * 时间复杂度：O(n) - 每个元素最多被访问两次
 * 空间复杂度：O(1)
 * 
 * 提示：
 * 1 <= target <= 10^9
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^5
 */
function minSubArrayLen(target: number, nums: number[]): number {
    let left: number = 0,   // 滑动窗口左边界
        right: number = 0;  // 滑动窗口右边界
    let res: number = nums.length + 1;  // 记录最小长度，初始化为不可能的大值
    let sum: number = 0;    // 当前窗口内元素的和
    
    // 右指针遍历数组，扩大窗口
    while (right < nums.length) {
        sum += nums[right];  // 将右边界元素加入窗口
        
        // 当窗口内的和满足条件时，尝试缩小窗口
        if (sum >= target) {
            // 不断移动左指针，直到不能再缩小为止
            while (sum - nums[left] >= target) {
                sum -= nums[left++];  // 移除左边界元素并左指针右移
            }
            // 更新最小长度
            res = Math.min(res, right - left + 1);
        }
        right++;  // 右指针继续移动
    }
    
    // 如果没有找到符合条件的子数组，返回0；否则返回最小长度
    return res === nums.length + 1 ? 0 : res;
}

// 方法二：标准滑动窗口写法
function minSubArrayLenStandard(target: number, nums: number[]): number {
    let left = 0;
    let sum = 0;
    let minLen = Infinity;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];  // 扩大窗口
        
        // 当窗口内的和 >= target 时，尝试缩小窗口
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];  // 缩小窗口
            left++;
        }
    }
    
    return minLen === Infinity ? 0 : minLen;
}

// 测试用例
console.log("=== 长度最小的子数组测试 ===");
const testCases = [
    { target: 7, nums: [2, 3, 1, 2, 4, 3] },      // 期望输出: 2 ([4,3])
    { target: 4, nums: [1, 4, 4] },               // 期望输出: 1 ([4])
    { target: 11, nums: [1, 1, 1, 1, 1, 1, 1, 1] }, // 期望输出: 0
    { target: 15, nums: [1, 2, 3, 4, 5] },        // 期望输出: 5 ([1,2,3,4,5])
    { target: 3, nums: [1, 1, 1, 1, 1, 1, 1, 1] }   // 期望输出: 3 ([1,1,1])
];

testCases.forEach(({ target, nums }, index) => {
    console.log(`测试用例 ${index + 1}:`);
    console.log(`target = ${target}, nums = [${nums.join(', ')}]`);
    console.log(`方法一结果: ${minSubArrayLen(target, nums)}`);
    console.log(`方法二结果: ${minSubArrayLenStandard(target, nums)}`);
    console.log('---');
});

export { minSubArrayLen, minSubArrayLenStandard };