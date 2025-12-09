/**
 * LeetCode 560. 和为 K 的子数组
 * LeetCode: https://leetcode.cn/problems/subarray-sum-equals-k/
 * 
 * 题目描述：
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回该数组中和为 k 的连续子数组的个数。
 * 
 * 示例 1：
 * 输入：nums = [1,1,1], k = 2
 * 输出：2
 * 解释：和为 2 的子数组有 [1,1] 和 [1,1]（注意：这两个子数组是重叠的）
 * 
 * 示例 2：
 * 输入：nums = [1,2,3], k = 3
 * 输出：2
 * 解释：和为 3 的子数组有 [1,2] 和 [3]
 * 
 * 提示：
 * - 1 <= nums.length <= 2 * 10^4
 * - -1000 <= nums[i] <= 1000
 * - -10^7 <= k <= 10^7
 * 
 * 解题思路：
 * 方法一：前缀和 + 哈希表（推荐）
 * - 使用前缀和的思想，prefixSum[i] 表示从数组开始到位置 i 的所有元素的和
 * - 如果 prefixSum[j] - prefixSum[i] = k，则说明从 i+1 到 j 的子数组和为 k
 * - 用哈希表记录每个前缀和出现的次数
 * - 遍历数组时，检查 prefixSum - k 是否在哈希表中，如果在，说明存在子数组和为 k
 * 
 * 方法二：暴力枚举
 * - 枚举所有可能的子数组，计算每个子数组的和
 * - 时间复杂度：O(n^2)，空间复杂度：O(1)
 * 
 * 时间复杂度：
 * - 方法一：O(n)，其中 n 是数组的长度
 * - 方法二：O(n^2)
 * 
 * 空间复杂度：
 * - 方法一：O(n)，哈希表存储前缀和
 * - 方法二：O(1)
 */

/**
 * 方法一：前缀和 + 哈希表（推荐）
 * 
 * 核心思想详解：
 * 
 * 1. 前缀和的概念：
 *    前缀和 prefixSum[i] 表示从数组开始到位置 i 的所有元素的和
 *    例如：nums = [1, 2, 3]，则 prefixSum[0] = 1, prefixSum[1] = 3, prefixSum[2] = 6
 * 
 * 2. prefixSumMap 是什么？
 *    prefixSumMap 是一个哈希表（Map），用来记录"前缀和的值"和"这个值出现过的次数"
 *    
 *    结构：{ 前缀和的值: 出现次数 }
 *    
 *    例如：如果前缀和序列是 [0, 1, 1, 2, 1]
 *         那么 prefixSumMap = {
 *           0: 1,  // 前缀和为 0 出现了 1 次（初始值）
 *           1: 3,  // 前缀和为 1 出现了 3 次（在位置0、位置1、位置4）
 *           2: 1   // 前缀和为 2 出现了 1 次（在位置3）
 *         }
 *    
 *    为什么要记录出现次数？
 *    因为数组可能包含负数或0，导致不同的位置可能有相同的前缀和
 *    例如：nums = [1, -1, 1, -1, 1]
 *         前缀和序列：1, 0, 1, 0, 1
 *         前缀和 1 在位置 0、2、4 都出现过
 *         前缀和 0 在位置 1、3 都出现过
 * 
 * 3. 关键公式：prefixSum[j] - prefixSum[i] = k
 *    如果 prefixSum[j] - prefixSum[i] = k，则说明从位置 i+1 到位置 j 的子数组和为 k
 *    因为：prefixSum[j] = nums[0] + ... + nums[j]
 *         prefixSum[i] = nums[0] + ... + nums[i]
 *         所以：prefixSum[j] - prefixSum[i] = nums[i+1] + ... + nums[j] = k
 * 
 * 4. 为什么要用哈希表？
 *    我们需要快速查找是否存在某个前缀和 prefixSum[i]，使得 prefixSum[j] - prefixSum[i] = k
 *    即：查找是否存在 prefixSum[i] = prefixSum[j] - k
 *    哈希表可以在 O(1) 时间内完成查找
 * 
 * 5. 为什么要初始化 prefixSumMap.set(0, 1)？
 *    考虑特殊情况：如果从数组开始到当前位置的前缀和正好等于 k
 *    例如：nums = [1, 1], k = 2，prefixSum = 2
 *    此时 prefixSum - k = 0，我们需要在哈希表中找到前缀和为 0 的情况
 *    初始化为 {0: 1} 表示"在数组开始之前，前缀和为 0 的情况出现了 1 次"
 *    这相当于在数组前面添加了一个虚拟的前缀和 0
 * 
 * 6. 为什么可能有多个位置的前缀和都等于 prefixSum - k？
 *    
 *    关键原因：数组可能包含负数或0，导致前缀和可能重复出现！
 *    
 *    示例1：nums = [1, -1, 1, -1, 1], k = 1
 *           前缀和序列：1, 0, 1, 0, 1
 *           位置：     0  1  2  3  4
 *           
 *           当遍历到位置 2 时：
 *             prefixSum = 1
 *             prefixSum - k = 1 - 1 = 0
 *             前缀和为 0 在位置 1 出现过（出现次数为 1）
 *             所以找到 1 个子数组：[nums[2]] = [1] = 1
 *           
 *           当遍历到位置 4 时：
 *             prefixSum = 1
 *             prefixSum - k = 1 - 1 = 0
 *             前缀和为 0 在位置 1 和位置 3 都出现过（出现次数为 2）
 *             所以找到 2 个子数组：
 *               - [nums[2]] = [1] = 1（从位置2到位置4）
 *               - [nums[4]] = [1] = 1（从位置4到位置4）
 *    
 *    示例2：nums = [1, 2, 1, 2, 1], k = 3
 *           前缀和序列：1, 3, 4, 6, 7
 *           位置：     0  1  2  3  4
 *           
 *           当遍历到位置 4 时：
 *             prefixSum = 7
 *             prefixSum - k = 7 - 3 = 4
 *             前缀和为 4 在位置 2 出现过（出现次数为 1）
 *             所以找到 1 个子数组：[nums[3], nums[4]] = [2, 1] = 3
 *           
 *           但是，如果数组是 nums = [1, 2, 1, -1, 2, 1], k = 3
 *           前缀和序列：1, 3, 4, 3, 5, 6
 *           位置：     0  1  2  3  4  5
 *           
 *           当遍历到位置 5 时：
 *             prefixSum = 6
 *             prefixSum - k = 6 - 3 = 3
 *             前缀和为 3 在位置 1 和位置 3 都出现过（出现次数为 2）
 *             所以找到 2 个子数组：
 *               - [nums[2], nums[3], nums[4], nums[5]] = [1, -1, 2, 1] = 3（从位置2到位置5）
 *               - [nums[4], nums[5]] = [2, 1] = 3（从位置4到位置5）
 * 
 * 7. 为什么 count += prefixSumMap.get(prefixSum - k)？
 *    因为可能有多个位置的前缀和都等于 prefixSum - k
 *    每个这样的位置都能和当前位置形成一个和为 k 的子数组
 *    所以需要累加所有满足条件的前缀和的出现次数
 * 
 * 详细执行过程示例（nums = [1, 1, 1], k = 2）：
 * 
 * 初始状态：
 *   prefixSumMap = {0: 1}
 *   prefixSum = 0
 *   count = 0
 * 
 * 第1步：处理 nums[0] = 1
 *   prefixSum = 0 + 1 = 1
 *   检查：prefixSum - k = 1 - 2 = -1，不在哈希表中
 *   prefixSumMap = {0: 1, 1: 1}
 *   count = 0
 * 
 * 第2步：处理 nums[1] = 1
 *   prefixSum = 1 + 1 = 2
 *   检查：prefixSum - k = 2 - 2 = 0，在哈希表中！出现次数为 1
 *   count += 1，所以 count = 1（找到了子数组 [1, 1]）
 *   prefixSumMap = {0: 1, 1: 1, 2: 1}
 * 
 * 第3步：处理 nums[2] = 1
 *   prefixSum = 2 + 1 = 3
 *   检查：prefixSum - k = 3 - 2 = 1，在哈希表中！出现次数为 1
 *   count += 1，所以 count = 2（找到了子数组 [1, 1]）
 *   prefixSumMap = {0: 1, 1: 1, 2: 1, 3: 1}
 * 
 * 最终结果：count = 2
 * 
 * 另一个示例（nums = [1, 2, 1, 2, 1], k = 3）：
 * 
 * 位置  元素  前缀和   prefixSum-k  哈希表查找     count  更新哈希表
 * 0     1      1        -2         不存在         0      {0:1, 1:1}
 * 1     2      3        0           存在(1次)     1      {0:1, 1:1, 3:1}
 * 2     1      4        1           存在(1次)     2      {0:1, 1:1, 3:1, 4:1}
 * 3     2      6        3           存在(1次)     3      {0:1, 1:1, 3:1, 4:1, 6:1}
 * 4     1      7        4           存在(1次)     4      {0:1, 1:1, 3:1, 4:1, 6:1, 7:1}
 * 
 * 找到的子数组：
 * - 位置 0-1: [1, 2] = 3
 * - 位置 1-2: [2, 1] = 3
 * - 位置 2-3: [1, 2] = 3
 * - 位置 3-4: [2, 1] = 3
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    /**
     * prefixSumMap 详解：
     * 这是一个哈希表（Map），用来记录"每个前缀和值出现过的次数"
     * 
     * 结构：Map<前缀和的值, 出现次数>
     * 
     * 例如：如果数组是 [1, -1, 1, -1, 1]
     *      前缀和序列：1, 0, 1, 0, 1
     *      那么 prefixSumMap 会记录：
     *        {0: 2}  // 前缀和 0 在位置 1 和位置 3 出现过，共 2 次
     *        {1: 3}  // 前缀和 1 在位置 0、位置 2、位置 4 出现过，共 3 次
     * 
     * 为什么要记录次数？
     * 因为不同的位置可能有相同的前缀和（特别是数组包含负数或0时）
     * 每个相同的前缀和都能形成一个不同的子数组
     */
    const prefixSumMap = new Map();
    
    /**
     * 初始化：prefixSumMap.set(0, 1)
     * 
     * 这表示"在数组开始之前，前缀和为 0 的情况出现了 1 次"
     * 相当于在数组前面添加了一个虚拟的前缀和 0
     * 
     * 为什么需要这个初始化？
     * 考虑：如果从数组开始到当前位置的前缀和正好等于 k
     * 例如：nums = [1, 1], k = 2
     *      当遍历到位置 1 时，prefixSum = 2
     *      此时 prefixSum - k = 2 - 2 = 0
     *      我们需要在哈希表中找到前缀和为 0 的情况
     *      如果没有初始化，就找不到，会漏掉这个子数组
     */
    prefixSumMap.set(0, 1);
    
    let prefixSum = 0;  // 当前前缀和：从数组开始到当前位置的所有元素的和
    let count = 0;      // 符合条件的子数组个数
    
    for (let num of nums) {
        // 更新前缀和：累加当前元素
        prefixSum += num;
        
        /**
         * 关键步骤：查找是否存在 prefixSum[i] = prefixSum - k
         * 
         * 如果 prefixSum - k 在哈希表中，说明之前某个位置的前缀和等于 prefixSum - k
         * 根据公式：prefixSum[j] - prefixSum[i] = k
         * 即：当前前缀和 - 之前某个位置的前缀和 = k
         * 所以：从"之前那个位置+1"到"当前位置"的子数组和为 k
         * 
         * 例如：nums = [1, 2, 3], k = 3
         *      位置 0: prefixSum = 1, prefixSum - k = -2，不在哈希表中
         *      位置 1: prefixSum = 3, prefixSum - k = 0，在哈希表中！
         *             说明从位置 0 到位置 1 的子数组和为 3，即 [1, 2] = 3
         *             因为 prefixSum[1] - prefixSum[-1] = 3 - 0 = 3（prefixSum[-1] = 0 是初始值）
         *      位置 2: prefixSum = 6, prefixSum - k = 3，在哈希表中！
         *             说明从位置 1+1=2 到位置 2 的子数组和为 3，即 [3] = 3
         *             因为 prefixSum[2] - prefixSum[1] = 6 - 3 = 3
         */
        if (prefixSumMap.has(prefixSum - k)) {
            /**
             * 为什么是 count += prefixSumMap.get(prefixSum - k)？
             * 
             * 因为可能有多个位置的前缀和都等于 prefixSum - k
             * 每个这样的位置都能和当前位置形成一个和为 k 的子数组
             * 
             * 示例：nums = [1, -1, 1, -1, 1], k = 1
             *      前缀和序列：1, 0, 1, 0, 1
             *      位置：     0  1  2  3  4
             *      
             *      当遍历到位置 4 时：
             *        prefixSum = 1
             *        prefixSum - k = 0
             *        前缀和为 0 在位置 1 和位置 3 都出现过（出现次数为 2）
             *        所以找到 2 个子数组：
             *          - 从位置 2 到位置 4：[1, -1, 1] = 1
             *          - 从位置 4 到位置 4：[1] = 1
             *        因此 count += 2
             */
            count += prefixSumMap.get(prefixSum - k);
        }
        
        /**
         * 更新当前前缀和的出现次数
         * 
         * 这个操作要在检查之后，因为我们要找的是"之前"出现的前缀和
         * 如果先更新再检查，可能会把当前的前缀和也算进去，导致错误
         * 
         * 例如：如果 prefixSum = k，且我们先更新了 prefixSumMap
         *      那么 prefixSum - k = 0 会在哈希表中找到当前的前缀和
         *      这会导致错误地计算子数组
         */
        prefixSumMap.set(prefixSum, (prefixSumMap.get(prefixSum) || 0) + 1);
    }
    
    return count;
};

/**
 * 方法二：暴力枚举（不推荐，仅作参考）
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySumBruteForce = function(nums, k) {
    let count = 0;
    
    // 枚举所有可能的子数组
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            if (sum === k) {
                count++;
            }
        }
    }
    
    return count;
};

// 测试用例
console.log("=== 和为 K 的子数组测试 ===");

// 测试用例1
console.log("测试用例1:");
console.log(`输入: nums = [1,1,1], k = 2`);
console.log(`前缀和法输出: ${subarraySum([1, 1, 1], 2)}`); // 期望: 2
console.log(`暴力法输出: ${subarraySumBruteForce([1, 1, 1], 2)}`); // 期望: 2

// 测试用例2
console.log("\n测试用例2:");
console.log(`输入: nums = [1,2,3], k = 3`);
console.log(`前缀和法输出: ${subarraySum([1, 2, 3], 3)}`); // 期望: 2
console.log(`暴力法输出: ${subarraySumBruteForce([1, 2, 3], 3)}`); // 期望: 2

// 测试用例3
console.log("\n测试用例3:");
console.log(`输入: nums = [1], k = 0`);
console.log(`前缀和法输出: ${subarraySum([1], 0)}`); // 期望: 0
console.log(`暴力法输出: ${subarraySumBruteForce([1], 0)}`); // 期望: 0

// 测试用例4
console.log("\n测试用例4:");
console.log(`输入: nums = [-1,-1,1], k = 0`);
console.log(`前缀和法输出: ${subarraySum([-1, -1, 1], 0)}`); // 期望: 1
console.log(`暴力法输出: ${subarraySumBruteForce([-1, -1, 1], 0)}`); // 期望: 1

// 测试用例5
console.log("\n测试用例5:");
console.log(`输入: nums = [1,2,1,2,1], k = 3`);
console.log(`前缀和法输出: ${subarraySum([1, 2, 1, 2, 1], 3)}`); // 期望: 4
console.log(`暴力法输出: ${subarraySumBruteForce([1, 2, 1, 2, 1], 3)}`); // 期望: 4

