/**
 * LeetCode 17. 电话号码的字母组合
 * LeetCode: https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 * 
 * 题目描述：
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 
 * 示例：
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 * 解题思路：
 * 使用回溯算法，遍历每个数字对应的所有字母，生成所有可能的组合。
 */

var letterCombinations = function(digits) {
    const k = digits.length;
    const map = ["","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"];
    if(!k) return [];
    if(k === 1) return map[digits].split("");

    const res = [], path = [];
    backtracking(digits, k, 0);
    return res;

    function backtracking(n, k, a) {
        if(path.length === k) {
            res.push(path.join(""));
            return;
        }
        for(const v of map[n[a]]) {
            path.push(v);
            backtracking(n, k, a + 1);
            path.pop();
        }
    }
};