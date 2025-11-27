/**
 * LeetCode 3. 无重复字符的最长子串
 * LeetCode: https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 * 
 * 题目描述：
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * 
 * 示例 1：
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 
 * 示例 2：
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 
 * 示例 3：
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 
 * 解题思路：
 * 1. 滑动窗口 + 哈希表
 * 2. 使用双指针维护一个滑动窗口
 * 3. 用哈希表记录字符最后出现的位置
 * 4. 时间复杂度：O(n)，空间复杂度：O(min(m,n))，m是字符集大小
 */

// 假设字符串是 "abcabcbb"，当前状态：
// left = 0，right = 3（指向第二个 'a'）
// charMap = { 'a': 0, 'b': 1, 'c': 2 }
// 当 right = 3 时：
// currentChar = 'a'
// charMap.get('a') 返回 0（'a' 第一次出现的位置）
// 0 >= 0 为 true，说明字符 'a' 在当前窗口 [0,3] 内已经存在
// 所以需要移动 left 到 0 + 1 = 1
// 为什么需要这个判断？
// 如果字符的最后出现位置 小于 left，说明这个字符在当前窗口之前出现过，但不在当前窗口内，所以不会造成重复。
// 比如：
// 窗口 [3,5]，字符 'a' 最后出现在位置 1
// 因为 1 < 3，所以 'a' 不在当前窗口内，可以安全地加入窗口


function lengthOfLongestSubstring(s: string): number {
    if (s.length === 0) return 0;
    
    const charMap = new Map<string, number>();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // 如果当前字符已经存在且在当前窗口内
        // charMap.get(currentChar) 返回该字符最后出现的位置
        // 如果最后出现位置 >= left，说明在当前窗口内有重复
        if (charMap.has(currentChar) && charMap.get(currentChar)! >= left) {
            // 移动左指针到重复字符的下一个位置
            left = charMap.get(currentChar)! + 1;
        }
        
        // 更新字符的最新位置
        charMap.set(currentChar, right);
        
        // 更新最大长度
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// 优化版本：使用数组代替Map（适用于ASCII字符）
function lengthOfLongestSubstringOptimized(s: string): number {
    if (s.length === 0) return 0;
    
    const charIndex = new Array(128).fill(-1); // ASCII字符集
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const charCode = s.charCodeAt(right);
        
        // 如果当前字符已经存在且在当前窗口内
        if (charIndex[charCode] >= left) {
            left = charIndex[charCode] + 1;
        }
        
        // 更新字符的最新位置
        charIndex[charCode] = right;
        
        // 更新最大长度
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// 测试用例
console.log("=== 无重复字符的最长子串测试 ===");
console.log(`输入: "abcabcbb", 输出: ${lengthOfLongestSubstring("abcabcbb")}`); // 期望: 3
console.log(`输入: "bbbbb", 输出: ${lengthOfLongestSubstring("bbbbb")}`); // 期望: 1
console.log(`输入: "pwwkew", 输出: ${lengthOfLongestSubstring("pwwkew")}`); // 期望: 3
console.log(`输入: "", 输出: ${lengthOfLongestSubstring("")}`); // 期望: 0
console.log(`输入: " ", 输出: ${lengthOfLongestSubstring(" ")}`); // 期望: 1
console.log(`输入: "dvdf", 输出: ${lengthOfLongestSubstring("dvdf")}`); // 期望: 3

console.log("\n=== 优化版本测试 ===");
console.log(`输入: "abcabcbb", 输出: ${lengthOfLongestSubstringOptimized("abcabcbb")}`); // 期望: 3
console.log(`输入: "bbbbb", 输出: ${lengthOfLongestSubstringOptimized("bbbbb")}`); // 期望: 1
console.log(`输入: "pwwkew", 输出: ${lengthOfLongestSubstringOptimized("pwwkew")}`); // 期望: 3

// 详细例子说明：
// 字符串 "abcabcbb" 的遍历过程：
// 位置: 0 1 2 3 4 5 6 7
// 字符: a b c a b c b b
// 
// right=0: charMap={a:0}, left=0, 窗口=[0,0]="a"
// right=1: charMap={a:0,b:1}, left=0, 窗口=[0,1]="ab"  
// right=2: charMap={a:0,b:1,c:2}, left=0, 窗口=[0,2]="abc"
// right=3: 遇到'a', charMap.get('a')=0 >= left=0, 重复!
//          left=0+1=1, charMap={a:3,b:1,c:2}, 窗口=[1,3]="bca"
// right=4: 遇到'b', charMap.get('b')=1 >= left=1, 重复!
//          left=1+1=2, charMap={a:3,b:4,c:2}, 窗口=[2,4]="cab"
// right=5: 遇到'c', charMap.get('c')=2 >= left=2, 重复!
//          left=2+1=3, charMap={a:3,b:4,c:5}, 窗口=[3,5]="abc"
// right=6: 遇到'b', charMap.get('b')=4 >= left=3, 重复!
//          left=4+1=5, charMap={a:3,b:6,c:5}, 窗口=[5,6]="cb"
// right=7: 遇到'b', charMap.get('b')=6 >= left=5, 重复!
//          left=6+1=7, charMap={a:3,b:7,c:5}, 窗口=[7,7]="b"
// 
// 最大长度: 3 (窗口"abc")

export { lengthOfLongestSubstring, lengthOfLongestSubstringOptimized };
