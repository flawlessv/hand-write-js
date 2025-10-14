/**
 * LeetCode 27. 移除元素
 * LeetCode: https://leetcode.cn/problems/remove-element/
 * 
 * 题目描述：
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并原地修改输入数组。
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 * 
 * 示例：
 * 输入：nums = [3,2,2,3], val = 3
 * 输出：2, nums = [2,2]
 * 解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
 * 
 * 解题思路：
 * 使用双指针法（快慢指针）：
 * - 快指针遍历数组
 * - 慢指针指向下一个要填入的位置
 * - 当快指针指向的元素不等于 val 时，将其复制到慢指针位置
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function removeElement(nums: number[], val: number): number {
    let slowIndex: number = 0,  // 慢指针，指向下一个要填入的位置
        fastIndex: number = 0;  // 快指针，用于遍历数组
    
    // 快指针遍历整个数组
    while (fastIndex < nums.length) {
        // 如果快指针指向的元素不等于要移除的值
        if (nums[fastIndex] !== val) {
            // 将该元素复制到慢指针位置，然后慢指针前进
            nums[slowIndex++] = nums[fastIndex];
        }
        // 快指针始终前进
        fastIndex++;
    }
    
    // 返回新数组的长度（慢指针的位置）
    return slowIndex;
}

// 方法二：双指针优化版本（减少不必要的赋值）
function removeElementOptimized(nums: number[], val: number): number {
    let left = 0;
    let right = nums.length;
    
    while (left < right) {
        if (nums[left] === val) {
            // 将右边的元素移到左边，避免不必要的赋值
            nums[left] = nums[right - 1];
            right--;
        } else {
            left++;
        }
    }
    
    return left;
}

// 测试用例
console.log("=== 移除元素测试 ===");
const testCases = [
    { nums: [3, 2, 2, 3], val: 3 },           // 期望输出: 2, nums = [2,2,_,_]
    { nums: [0, 1, 2, 2, 3, 0, 4, 2], val: 2 }, // 期望输出: 5, nums = [0,1,4,0,3,_,_,_]
    { nums: [1], val: 1 },                    // 期望输出: 0, nums = [_]
    { nums: [4, 5], val: 4 },                 // 期望输出: 1, nums = [5,_]
    { nums: [1, 2, 3, 4, 5], val: 6 }         // 期望输出: 5, nums = [1,2,3,4,5]
];

testCases.forEach(({ nums, val }, index) => {
    const nums1 = [...nums]; // 复制数组用于第一种方法
    const nums2 = [...nums]; // 复制数组用于第二种方法
    
    console.log(`测试用例 ${index + 1}:`);
    console.log(`原数组: [${nums.join(', ')}], 移除值: ${val}`);
    
    const len1 = removeElement(nums1, val);
    console.log(`方法一结果: 长度=${len1}, 数组=[${nums1.slice(0, len1).join(', ')}]`);
    
    const len2 = removeElementOptimized(nums2, val);
    console.log(`方法二结果: 长度=${len2}, 数组=[${nums2.slice(0, len2).join(', ')}]`);
    console.log('---');
});

export { removeElement, removeElementOptimized };