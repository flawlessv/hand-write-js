/**
 * LeetCode 75. 颜色分类
 * LeetCode: https://leetcode.cn/problems/sort-colors/
 * 
 * 题目描述：
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 
 * 我们使用整数 0、1 和 2 分别表示红色、白色和蓝色。
 * 
 * 必须在不使用库内置的 sort 函数的情况下解决这个问题。
 * 
 * 示例 1：
 * 输入：nums = [2,0,2,1,1,0]
 * 输出：[0,0,1,1,2,2]
 * 
 * 示例 2：
 * 输入：nums = [2,0,1]
 * 输出：[0,1,2]
 * 
 * 提示：
 * - n == nums.length
 * - 1 <= n <= 300
 * - nums[i] 为 0、1 或 2
 * 
 * 进阶：
 * 你能想出一个仅使用常数空间的一趟扫描算法吗？
 */

// ========== 方法一：插入排序（你的方法） ==========
/**
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)
 * 
 * 你的方法是对的，但效率不是最优的
 */
var sortColors = function(nums) {
    for(let i = 1; i < nums.length; i++) {
        const newNum = nums[i];
        let j = i - 1;
        while(nums[j] > newNum && j >= 0) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = newNum;
    }
    return nums;
};

// ========== 方法二：双指针法（荷兰国旗问题）- 最优解 ==========
/**
 * 核心思想：使用三个指针将数组分为三个区域
 * - left: 0的右边界（不包含）
 * - right: 2的左边界（不包含）
 * - i: 当前遍历的指针
 * 
 * 时间复杂度：O(n) - 只遍历一次
 * 空间复杂度：O(1)
 * 
 * 这是题目进阶要求的"仅使用常数空间的一趟扫描算法"
 */
var sortColorsOptimal = function(nums) {
    let left = 0;        // 0的右边界，[0, left) 都是0
    let right = nums.length - 1;  // 2的左边界，(right, n-1] 都是2
    let i = 0;           // 当前遍历指针
    
    while(i <= right) {
        if(nums[i] === 0) {
            // 当前是0，交换到left位置
            [nums[left], nums[i]] = [nums[i], nums[left]];
            left++;
            i++;  // 交换后i位置是1，可以继续前进
        } else if(nums[i] === 2) {
            // 当前是2，交换到right位置
            [nums[right], nums[i]] = [nums[i], nums[right]];
            right--;
            // 注意：这里i不增加，因为从right位置交换过来的元素可能是0或1，需要再次判断
        } else {
            // 当前是1，不需要移动，继续前进
            i++;
        }
    }
    
    return nums;
};
