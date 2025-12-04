/**
 * LeetCode 66. 加一
 * LeetCode: https://leetcode.cn/problems/plus-one/
 * 
 * 题目描述：
 * 
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 * 
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 * 
 * 
 * 示例 1：
 * 输入：digits = [1,2,3]
 * 输出：[1,2,4]
 * 解释：输入数组表示数字 123，加一后得到 124。
 * 
 * 
 * 示例 2：
 * 输入：digits = [4,3,2,1]
 * 输出：[4,3,2,2]
 * 解释：输入数组表示数字 4321，加一后得到 4322。
 * 
 * 
 * 示例 3：
 * 输入：digits = [9]
 * 输出：[1,0]
 * 解释：输入数组表示数字 9，加一后得到 10。
 * 
 * 
 * 提示：
 * - 1 <= digits.length <= 100
 * - 0 <= digits[i] <= 9
 * - digits 不包含任何前导零
 */

/**
 * @param {number[]} digits
 * @return {number[]}
 */
// ========== 你的解法（修正后） ==========
var plusOne = function(digits) {
    for(let i =digits.length-1;i>=0;i--){ 
       if((digits[i]+1)<10){
        digits[i]=digits[i]+1
        return digits
       }else if((digits[i]+1)>=10){
         digits[i]=0
       }
    }
    // ❌ 问题：unshift() 返回的是数组的新长度（数字），不是数组本身
    // 应该先执行 unshift，然后返回数组
    digits.unshift(1);
    return digits;
};

// ========== 问题分析 ==========
/*
问题1: 循环条件错误
- i>0 导致索引0不会被处理
- 例如：[9] 时，循环不会执行，返回[9]而不是[1,0]

问题2: 进位逻辑错误
- 当 digits[i]+1 >= 10 时，应该设置 digits[i] = 0，并继续进位
- 当前代码没有正确设置进位标志

问题3: 最高位进位未处理
- 当所有位都是9时（如[9,9,9]），需要在数组开头添加1
- 当前代码没有处理这种情况
*/

// ========== 完美解法（推荐） ==========
/**
 * 核心思想：从后往前遍历，模拟加法进位过程
 * 
 * 算法步骤：
 * 1. 从数组末尾开始遍历
 * 2. 当前位加1，如果小于10，直接返回
 * 3. 如果等于10，当前位设为0，继续处理前一位
 * 4. 如果所有位都进位（如[9,9,9]），在数组开头添加1
 * 
 * 时间复杂度：O(n)，最坏情况需要遍历整个数组
 * 空间复杂度：O(1)，除了结果数组外只使用了常数额外空间
 */
var plusOne = function(digits) {
    // 从后往前遍历
    for (let i = digits.length - 1; i >= 0; i--) {
        // 当前位加1
        digits[i]++;
        
        // 如果当前位小于10，不需要进位，直接返回
        if (digits[i] < 10) {
            return digits;
        }
        
        // 如果当前位等于10，需要进位
        // 当前位设为0，继续处理前一位
        digits[i] = 0;
    }
    
    // 如果所有位都进位了（如[9,9,9]），需要在数组开头添加1
    // 此时所有位都是0，只需要在开头添加1即可
    digits.unshift(1);
    return digits;
};

// ========== 另一种写法（更直观） ==========
var plusOneV2 = function(digits) {
    let carry = 1;  // 初始进位为1（因为要加1）
    
    // 从后往前遍历
    for (let i = digits.length - 1; i >= 0; i--) {
        const sum = digits[i] + carry;
        digits[i] = sum % 10;  // 当前位的值
        carry = Math.floor(sum / 10);  // 进位值
        
        // 如果没有进位了，可以提前返回
        if (carry === 0) {
            return digits;
        }
    }
    
    // 如果还有进位（所有位都是9），在数组开头添加1
    if (carry > 0) {
        digits.unshift(1);
    }
    
    return digits;
};

// ========== 测试用例 ==========
console.log("=== 加一测试 ===");

// 测试用例1
console.log("测试用例1:");
const digits1 = [1,2,3];
console.log("输入:", [...digits1]);
console.log("输出:", plusOne([...digits1])); // 期望: [1,2,4]

// 测试用例2
console.log("\n测试用例2:");
const digits2 = [4,3,2,1];
console.log("输入:", [...digits2]);
console.log("输出:", plusOne([...digits2])); // 期望: [4,3,2,2]

// 测试用例3
console.log("\n测试用例3:");
const digits3 = [9];
console.log("输入:", [...digits3]);
console.log("输出:", plusOne([...digits3])); // 期望: [1,0]

// 测试用例4
console.log("\n测试用例4:");
const digits4 = [9,9,9];
console.log("输入:", [...digits4]);
console.log("输出:", plusOne([...digits4])); // 期望: [1,0,0,0]

// 测试用例5
console.log("\n测试用例5:");
const digits5 = [1,9,9];
console.log("输入:", [...digits5]);
console.log("输出:", plusOne([...digits5])); // 期望: [2,0,0]

// 测试用例6
console.log("\n测试用例6:");
const digits6 = [0];
console.log("输入:", [...digits6]);
console.log("输出:", plusOne([...digits6])); // 期望: [1]

