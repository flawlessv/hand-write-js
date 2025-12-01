/**
 * LeetCode 20. 有效的括号
 * LeetCode: https://leetcode.cn/problems/valid-parentheses/
 * 
 * 题目描述：
 * 
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合。
 * 3. 每个右括号都有一个对应的相同类型的左括号。
 * 
 * 
 * 示例 1：
 * 输入：s = "()"
 * 输出：true
 * 
 * 
 * 示例 2：
 * 输入：s = "()[]{}"
 * 输出：true
 * 
 * 
 * 示例 3：
 * 输入：s = "(]"
 * 输出：false
 * 
 * 
 * 示例 4：
 * 输入：s = "([)]"
 * 输出：false
 * 
 * 
 * 示例 5：
 * 输入：s = "{[]}"
 * 输出：true
 * 
 * 
 * 提示：
 * - 1 <= s.length <= 10^4
 * - s 仅由括号 '()[]{}' 组成
 */

var isValid = function(s) {
    const map = {
        '(':')',
        '[':']',
        '{':'}'
    }
    const helperStack=[]
    for(let i=0;i<s.length;i++){
        const cur = s[i]
        if(helperStack[helperStack.length-1]===cur){
            helperStack.pop()
        }else{
            helperStack.push(map[cur])
        }
    }
    return helperStack.length===0
};