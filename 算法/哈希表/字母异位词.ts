/**
 * 题目：有效的字母异位词
 * LeetCode: https://leetcode.cn/problems/valid-anagram/
 * 
 * 题目描述：
 * 给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 
 * 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
 * 
 * 示例：
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 * 
 * 输入: s = "rat", t = "car"
 * 输出: false
 * 
 * 算法思路：
 * 使用哈希表（数组）统计字符频次。创建一个长度为26的数组，对应26个小写字母。
 * 遍历字符串s，将每个字符对应的计数器+1；
 * 遍历字符串t，将每个字符对应的计数器-1；
 * 最后检查所有计数器是否都为0，如果是则说明两个字符串互为字母异位词。
 * 
 * 时间复杂度：O(n)，其中 n 是字符串的长度
 * 空间复杂度：O(1)，使用固定大小的数组存储字符频次
 */
function isAnagram(s: string, t: string): boolean {
  // 如果两个字符串长度不同，直接返回false
  if (s.length !== t.length) return false;
  
  // 创建一个长度为26的数组，用于统计26个小写字母的出现频次
  let helperArr: number[] = new Array(26).fill(0);
  
  // 获取字符'a'的ASCII码值，作为基准点
  let pivot: number = "a".charCodeAt(0);
  
  // 同时遍历两个字符串
  for (let i = 0; i < s.length; i++) {
    // 对字符串s中的字符进行计数+1
    helperArr[s.charCodeAt(i) - pivot]++;
    // 对字符串t中的字符进行计数-1
    helperArr[t.charCodeAt(i) - pivot]--;
  }
  
  // 调试输出：显示每个字母的频次差值
  console.log(helperArr);
  
  // 检查所有字母的频次差值是否都为0
  // 如果都为0，说明两个字符串中每个字母出现的次数相同
  return helperArr.every((count) => count === 0);
}

// 测试用例
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
console.log(isAnagram("listen", "silent")); // true
