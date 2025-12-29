/**
 * LeetCode 394. 字符串解码
 * LeetCode: https://leetcode.cn/problems/decode-string/
 * 
 * 题目描述：
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。
 * 注意 k 保证为正整数。
 * 
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，
 * 例如不会出现像 3a 或 2[4] 的输入。
 * 
 * 
 * 示例 1：
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 * 
 * 示例 2：
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 * 
 * 示例 3：
 * 输入：s = "2[abc]3[cd]ef"
 * 输出："abcabccdcdcdef"
 * 
 * 示例 4：
 * 输入：s = "abc3[cd]xyz"
 * 输出："abccdcdcdxyz"
 * 
 * 
 * 提示：
 * - 1 <= s.length <= 30
 * - s 由小写英文字母、数字和方括号 '[]' 组成
 * - s 保证是一个 有效 的输入。
 * - s 中所有整数的取值范围为 [1, 300]
 */

/**
 * @param {string} s
 * @return {string}
 * 
 * 解题思路：使用栈
 * 1. 遇到数字：累积数字（可能有多位）
 * 2. 遇到字母：累积到当前字符串
 * 3. 遇到 '['：将当前数字和字符串入栈，重置
 * 4. 遇到 ']'：出栈，将当前字符串重复指定次数后，与栈顶字符串拼接
 * 
 * 时间复杂度：O(n)，其中 n 是解码后字符串的长度
 * 空间复杂度：O(n)，栈的空间
 */
var decodeString = function(s) {
    const stack = [];
    let num = 0;        // 当前数字
    let str = '';       // 当前字符串
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char >= '0' && char <= '9') {
            // 累积数字（可能有多位）
            num = num * 10 + parseInt(char);
        } else if (char === '[') {
            // 遇到左括号，将当前数字和字符串入栈
            stack.push([num, str]);
            // 重置
            num = 0;
            str = '';
        } else if (char === ']') {
            // 遇到右括号，出栈
            const [repeatNum, prevStr] = stack.pop();
            // 将当前字符串重复指定次数
            str = prevStr + str.repeat(repeatNum);
        } else {
            // 普通字母，累积到当前字符串
            str += char;
        }
    }
    
    return str;
};

/**
 * 方法二：递归解法
 * 使用递归处理嵌套的括号
 * 
 * @param {string} s
 * @return {string}
 */
var decodeStringRecursive = function(s) {
    let index = 0;
    
    function dfs() {
        let res = '';
        let num = 0;
        
        while (index < s.length) {
            const char = s[index];
            
            if (char >= '0' && char <= '9') {
                num = num * 10 + parseInt(char);
                index++;
            } else if (char === '[') {
                index++; // 跳过 '['
                const innerStr = dfs(); // 递归处理内部字符串
                res += innerStr.repeat(num);
                num = 0; // 重置数字
            } else if (char === ']') {
                index++; // 跳过 ']'
                return res; // 返回当前层的结果
            } else {
                res += char;
                index++;
            }
        }
        
        return res;
    }
    
    return dfs();
};

// 测试用例
console.log("=== 字符串解码测试 ===");

// 测试用例1
console.log("测试用例1:");
const s1 = "3[a]2[bc]";
console.log("输入:", s1);
console.log("输出:", decodeString(s1)); // 期望: "aaabcbc"
console.log("递归输出:", decodeStringRecursive(s1));

// 测试用例2
console.log("\n测试用例2:");
const s2 = "3[a2[c]]";
console.log("输入:", s2);
console.log("输出:", decodeString(s2)); // 期望: "accaccacc"
console.log("递归输出:", decodeStringRecursive(s2));

// 测试用例3
console.log("\n测试用例3:");
const s3 = "2[abc]3[cd]ef";
console.log("输入:", s3);
console.log("输出:", decodeString(s3)); // 期望: "abcabccdcdcdef"
console.log("递归输出:", decodeStringRecursive(s3));

// 测试用例4
console.log("\n测试用例4:");
const s4 = "abc3[cd]xyz";
console.log("输入:", s4);
console.log("输出:", decodeString(s4)); // 期望: "abccdcdcdxyz"
console.log("递归输出:", decodeStringRecursive(s4));

// 测试用例5
console.log("\n测试用例5:");
const s5 = "100[leetcode]";
console.log("输入:", s5);
console.log("输出:", decodeString(s5)); // 期望: "leetcode"重复100次
console.log("递归输出:", decodeStringRecursive(s5));

