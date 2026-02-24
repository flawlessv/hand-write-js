/**
 * LeetCode 136. 只出现一次的数字
 * LeetCode: https://leetcode.cn/problems/single-number/
 * 
 * 题目描述：
 * 
 * 给你一个 非空 整数数组 nums，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 
 * 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 * 
 * 
 * 示例 1：
 * 输入：nums = [2,2,1]
 * 输出：1
 * 
 * 
 * 示例 2：
 * 输入：nums = [4,1,2,1,2]
 * 输出：4
 * 
 * 
 * 示例 3：
 * 输入：nums = [1]
 * 输出：1
 * 
 * 
 * 提示：
 * - 1 <= nums.length <= 3 * 10^4
 * - -3 * 10^4 <= nums[i] <= 3 * 10^4
 * - 除了某个元素只出现一次以外，其余每个元素均出现两次
 */



// 方法二：位运算 - 异或操作（最优解法，官方推荐）
/**
 * 核心思想：利用异或运算的性质
 * 
 * 异或运算的性质：
 * 1. a ^ a = 0（任何数与自己异或结果为0）
 * 2. a ^ 0 = a（任何数与0异或结果为自己）
 * 3. 异或运算满足交换律和结合律：a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b
 * 
 * 算法思路：
 * 由于数组中除了一个数字出现一次，其他数字都出现两次，
 * 那么将所有数字进行异或运算，出现两次的数字会相互抵消（结果为0），
 * 最后剩下的就是只出现一次的数字。
 * 
 * 时间复杂度：O(n) - 只遍历一次数组
 * 空间复杂度：O(1) - 只使用了常数额外空间
 */
var singleNumberOptimal = function(nums) {
    let result = 0;
    
    // 遍历数组，将所有数字进行异或运算
    for (let i = 0; i < nums.length; i++) {
        result ^= nums[i];
    }
    
    return result;
};

// 方法三：哈希表法
// 时间复杂度：O(n)
// 空间复杂度：O(n) - 需要额外的哈希表空间
var singleNumberHash = function(nums) {
    const map = new Map();
    
    // 统计每个数字出现的次数
    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    
    // 找出只出现一次的数字
    for (let [num, count] of map) {
        if (count === 1) {
            return num;
        }
    }
};

// 测试用例
console.log("=== 只出现一次的数字测试 ===");

// 测试用例1
console.log("测试用例1:");
console.log("输入: nums = [2,2,1]");
console.log("排序法结果:", singleNumber([2,2,1])); // 期望: 1
console.log("位运算法结果:", singleNumberOptimal([2,2,1])); // 期望: 1
console.log("哈希表法结果:", singleNumberHash([2,2,1])); // 期望: 1

// 测试用例2
console.log("\n测试用例2:");
console.log("输入: nums = [4,1,2,1,2]");
console.log("排序法结果:", singleNumber([4,1,2,1,2])); // 期望: 4
console.log("位运算法结果:", singleNumberOptimal([4,1,2,1,2])); // 期望: 4
console.log("哈希表法结果:", singleNumberHash([4,1,2,1,2])); // 期望: 4

// 测试用例3
console.log("\n测试用例3:");
console.log("输入: nums = [1]");
console.log("排序法结果:", singleNumber([1])); // 期望: 1
console.log("位运算法结果:", singleNumberOptimal([1])); // 期望: 1
console.log("哈希表法结果:", singleNumberHash([1])); // 期望: 1

// 测试用例4
console.log("\n测试用例4:");
console.log("输入: nums = [1,2,3,2,1]");
console.log("排序法结果:", singleNumber([1,2,3,2,1])); // 期望: 3
console.log("位运算法结果:", singleNumberOptimal([1,2,3,2,1])); // 期望: 3
console.log("哈希表法结果:", singleNumberHash([1,2,3,2,1])); // 期望: 3

// 性能对比说明
console.log("\n=== 性能对比 ===");
console.log("排序法：时间复杂度 O(n log n)，空间复杂度 O(1)");
console.log("位运算法（最优）：时间复杂度 O(n)，空间复杂度 O(1)");
console.log("哈希表法：时间复杂度 O(n)，空间复杂度 O(n)");
console.log("\n推荐使用位运算法，既满足线性时间复杂度，又满足常量空间复杂度！");

