/**
 * LeetCode 49. 字母异位词分组
 * LeetCode: https://leetcode.cn/problems/group-anagrams/
 * 
 * 题目描述：
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 
 * 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
 * 
 * 示例 1：
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * 示例 2：
 * 输入: strs = [""]
 * 输出: [[""]]
 * 
 * 示例 3：
 * 输入: strs = ["a"]
 * 输出: [["a"]]
 * 
 * 提示：
 * - 1 <= strs.length <= 10^4
 * - 0 <= strs[i].length <= 100
 * - strs[i] 仅包含小写字母
 */
// ========== 方法一：排序作为key（推荐） ==========
/**
 * 核心思想：将每个字符串排序后作为key，相同key的字符串就是字母异位词
 * 
 * 时间复杂度：O(n * k * log k)，其中 n 是字符串数量，k 是字符串最大长度
 * 空间复杂度：O(n * k)
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    
    for(let str of strs) {
        // 将字符串排序后作为key
        const sorted = str.split('').sort().join('');
        
        if(map.has(sorted)) {
            map.get(sorted).push(str);
        } else {
            map.set(sorted, [str]);
        }
    }
    
    // 返回所有分组
    return Array.from(map.values());
};

// ========== 方法二：字符计数作为key ==========
/**
 * 核心思想：统计每个字符串的字符频次，用频次数组作为key
 * 
 * 时间复杂度：O(n * k)，其中 n 是字符串数量，k 是字符串最大长度
 * 空间复杂度：O(n * k)
 */
var groupAnagramsV2 = function(strs) {
    const map = new Map();
    
    for(let str of strs) {
        // 统计字符频次
        const count = new Array(26).fill(0);
        for(let char of str) {
            count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        
        // 将频次数组转为字符串作为key（例如："1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0"）
        const key = count.join(',');
        
        if(map.has(key)) {
            map.get(key).push(str);
        } else {
            map.set(key, [str]);
        }
    }
    
    return Array.from(map.values());
};



// 方法三： 补一个 使用对象实现的简洁版，排序+map的思路
const groupAnagramsV3 = (strs) => {
    const map = {}
    for(const str of strs) {
        const sortKey = str.split('').sort().join('');
        if(map[sortKey]) map[sortKey].push(str);
        else map[sortKey] = [str];
    }
    return Object.values(map);
}


// ========== 测试用例 ==========
console.log("=== 字母异位词分组测试 ===");

console.log("\n方法一（排序作为key）：");
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// 期望输出: [["eat","tea","ate"],["tan","nat"],["bat"]]

console.log("\n方法二（字符计数作为key）：");
console.log(groupAnagramsV2(["eat", "tea", "tan", "ate", "nat", "bat"]));
// 期望输出: [["eat","tea","ate"],["tan","nat"],["bat"]]

console.log("\n测试用例2：");
console.log(groupAnagrams([""]));  // [[""]]

console.log("\n测试用例3：");
console.log(groupAnagrams(["a"]));  // [["a"]]


