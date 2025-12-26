/**
 * LeetCode 128. 最长连续序列
 * LeetCode: https://leetcode.cn/problems/longest-consecutive-sequence/
 * 
 * 题目描述：
 * 给定一个未排序的整数数组 nums，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 * 
 * 示例 1：
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 * 
 * 示例 2：
 * 输入：nums = [0,3,7,2,5,8,4,6,0,1]
 * 输出：9
 * 解释：最长数字连续序列是 [0, 1, 2, 3, 4, 5, 6, 7, 8]。它的长度为 9。
 * 
 * 提示：
 * - 0 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 * 
 * 解题思路（哈希表）：
 * 核心思想：使用哈希表（Set）存储所有数字，然后只从连续序列的起点开始计算长度
 * 
 * 方法详解：
 * 1. 将数组转换为 Set，去除重复元素，并提供 O(1) 的查找时间
 * 2. 遍历 Set 中的每个数字 num，检查 num - 1 是否存在于 Set 中：
 *    - 如果 num - 1 存在，说明 num 不是连续序列的起点，跳过
 *    - 如果 num - 1 不存在，说明 num 是连续序列的起点，开始计算以 num 为起点的连续序列长度
 * 3. 对于每个连续序列的起点，使用 while 循环检查 num + 1, num + 2, ... 是否存在于 Set 中
 *    计算以该起点开始的连续序列长度
 * 4. 记录所有连续序列中的最大长度，最终返回该最大值
 * 
 * 为什么只从起点开始计算？
 * - 如果 num - 1 存在于 Set 中，说明 num 不是连续序列的起点
 * - 从非起点开始计算会导致重复计算，增加时间复杂度
 * - 例如：[1, 2, 3, 4]
 *   - 如果从 1 开始：计算 [1, 2, 3, 4]，长度为 4
 *   - 如果从 2 开始：计算 [2, 3, 4]，长度为 3（重复计算了部分序列）
 *   - 如果从 3 开始：计算 [3, 4]，长度为 2（重复计算了部分序列）
 * - 只从起点开始计算，可以确保每个连续序列只被计算一次
 * 
 * 时间复杂度分析：
 * - 虽然代码中有嵌套循环，但每个数字最多被访问两次：
 *   1. 一次用于检查是否为序列起点（外层循环）
 *   2. 一次用于计算序列长度（内层循环）
 * - 因此总时间复杂度为 O(n)，其中 n 是数组的长度
 * 
 * 空间复杂度：O(n)，用于存储 Set
 */

/**
 * 哈希表方法实现最长连续序列
 * @param {number[]} nums - 未排序的整数数组
 * @return {number} - 最长连续序列的长度
 */
function longestConsecutive(nums: number[]): number {
    // 边界条件：数组为空，返回0
    if(nums.length === 0) return 0;
    
    // 将数组转换为 Set，去除重复元素，并提供 O(1) 的查找时间
    const numSet = new Set<number>(nums);
    
    // longestStreak：记录最长连续序列的长度
    let longestStreak = 0;
    
    // 遍历 Set 中的每个数字
    for(const num of numSet) {
        // 关键优化：只从连续序列的起点开始计算
        // 如果 num - 1 不在 Set 中，说明 num 是连续序列的起点
        if(!numSet.has(num - 1)) {
            // currentNum：当前正在检查的数字
            let currentNum = num;
            // currentStreak：以 num 为起点的连续序列的长度
            let currentStreak = 1;
            
            // 从起点开始，检查连续的数字是否存在
            // 例如：如果 num = 1，检查 2, 3, 4, ... 是否在 Set 中
            while(numSet.has(currentNum + 1)) {
                currentNum += 1;        // 移动到下一个数字
                currentStreak += 1;     // 连续序列长度加1
            }
            
            // 更新最长连续序列的长度
            longestStreak = Math.max(longestStreak, currentStreak);
        }
        // 如果 num - 1 存在，说明 num 不是起点，跳过（避免重复计算）
    }
    
    return longestStreak;
}

/**
 * 方法二：排序方法（不满足 O(n) 时间复杂度要求，但思路简单）
 * 
 * 思路：
 * 1. 对数组排序
 * 2. 遍历排序后的数组，统计连续序列的长度
 * 
 * 时间复杂度：O(n log n)，因为需要排序
 * 空间复杂度：O(1) 或 O(n)，取决于排序算法
 */
function longestConsecutiveSort(nums: number[]): number {
    if(nums.length === 0) return 0;
    
    // 去重并排序
    const sortedNums = Array.from(new Set(nums)).sort((a, b) => a - b);
    
    let longestStreak = 1;
    let currentStreak = 1;
    
    // 遍历排序后的数组
    for(let i = 1; i < sortedNums.length; i++) {
        // 如果当前数字与前一个数字连续
        if(sortedNums[i] === sortedNums[i - 1] + 1) {
            currentStreak += 1;
        } else {
            // 不连续，重置当前序列长度
            longestStreak = Math.max(longestStreak, currentStreak);
            currentStreak = 1;
        }
    }
    
    // 最后再更新一次（处理序列在数组末尾结束的情况）
    longestStreak = Math.max(longestStreak, currentStreak);
    
    return longestStreak;
}

export { longestConsecutive, longestConsecutiveSort };






