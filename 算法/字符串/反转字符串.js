/**
 * LeetCode 344. 反转字符串
 * LeetCode: https://leetcode.cn/problems/reverse-string/
 * 
 * 题目描述：
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
 * 
 * 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
 * 
 * 示例 1：
 * 输入：s = ["h","e","l","l","o"]
 * 输出：["o","l","l","e","h"]
 * 
 * 示例 2：
 * 输入：s = ["H","a","n","n","a","h"]
 * 输出：["h","a","n","n","a","H"]
 * 
 * 提示：
 * - 1 <= s.length <= 10^5
 * - s[i] 都是 ASCII 码表中的可打印字符
 * 
 * 解题思路：
 * 使用双指针法：
 * - 左指针从数组开头开始
 * - 右指针从数组末尾开始
 * - 交换两个指针指向的元素
 * - 左指针右移，右指针左移，直到两指针相遇
 * 
 * 时间复杂度：O(n)，其中 n 是数组的长度
 * 空间复杂度：O(1)
 */

/**
 * 双指针法反转字符串
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let left = 0;              // 左指针
    let right = s.length - 1;  // 右指针
    
    // 当左指针小于右指针时，继续交换
    while (left < right) {
        // 交换两个指针指向的元素
        [s[left], s[right]] = [s[right], s[left]];
        
        // 移动指针
        left++;
        right--;
    }
};

export { reverseString };





