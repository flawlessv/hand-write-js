/**
 * LeetCode 151. 反转字符串中的单词
 * LeetCode: https://leetcode.cn/problems/reverse-words-in-a-string/
 * 
 * 题目描述：
 * 给你一个字符串 s，请你反转字符串中单词的顺序。
 * 
 * 单词是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的单词分隔开。
 * 
 * 返回单词顺序反转且单词之间用单个空格连接的结果字符串。
 * 
 * 注意：输入字符串 s 中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。
 * 
 * 示例 1：
 * 输入：s = "the sky is blue"
 * 输出："blue is sky the"
 * 
 * 示例 2：
 * 输入：s = "  hello world  "
 * 输出："world hello"
 * 解释：反转后的字符串中不能存在前导空格和尾随空格。
 * 
 * 示例 3：
 * 输入：s = "a good   example"
 * 输出："example good a"
 * 解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。
 * 
 * 提示：
 * - 1 <= s.length <= 10^4
 * - s 包含英文大小写字母、数字和空格 ' '
 * - s 中至少存在一个单词
 * 
 * 解题思路：
 * 方法一：双指针法（推荐）
 * - 先去除首尾空格
 * - 使用双指针从后往前提取单词
 * - 将提取的单词拼接成结果字符串
 * 
 * 方法二：使用数组反转
 * - 先去除首尾空格
 * - 按空格分割字符串，过滤空字符串
 * - 反转数组，然后拼接
 * 
 * 时间复杂度：O(n)，其中 n 是字符串的长度
 * 空间复杂度：O(n)，用于存储结果
 */

/**
 * 方法一：双指针法（从后往前提取单词）
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    // 去除首尾空格
    s = s.trim();
    
    if (s.length === 0) return '';
    
    const result = [];
    let right = s.length - 1;  // 右指针，指向单词的末尾
    let left = right;          // 左指针，指向单词的开头
    
    // 从后往前遍历
    while (left >= 0) {
        // 跳过空格，找到单词的末尾
        while (right >= 0 && s[right] === ' ') {
            right--;
        }
        
        // 如果 right < 0，说明已经处理完所有单词
        if (right < 0) break;
        
        // left 从 right 开始，向左移动找到单词的开头
        left = right;
        while (left >= 0 && s[left] !== ' ') {
            left--;
        }
        
        // 提取单词（从 left+1 到 right）
        const word = s.substring(left + 1, right + 1);
        result.push(word);
        
        // 更新 right 指针，继续处理下一个单词
        right = left;
    }
    
    // 用单个空格连接所有单词
    return result.join(' ');
};

/**
 * 方法二：使用数组反转（更简洁）
 * @param {string} s
 * @return {string}
 */
var reverseWords2 = function(s) {
    // 去除首尾空格，按空格分割，过滤空字符串
    const words = s.trim().split(/\s+/).filter(word => word.length > 0);
    
    // 反转数组
    words.reverse();
    
    // 用单个空格连接
    return words.join(' ');
};

/**
 * 方法三：双指针法（原地修改，如果允许修改输入）
 * 注意：JavaScript 中字符串不可变，所以需要转换为数组
 * @param {string} s
 * @return {string}
 */
var reverseWords3 = function(s) {
    // 将字符串转换为数组
    const arr = s.split('');
    
    // 辅助函数：反转数组的指定区间
    const reverse = (arr, left, right) => {
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    };
    
    // 第一步：去除首尾空格并压缩中间空格
    let slow = 0;  // 慢指针，指向下一个要填入的位置
    let fast = 0;  // 快指针，用于遍历
    
    // 去除前导空格
    while (fast < arr.length && arr[fast] === ' ') {
        fast++;
    }
    
    // 压缩中间空格并去除尾随空格
    while (fast < arr.length) {
        // 如果遇到空格
        if (arr[fast] === ' ') {
            // 只保留一个空格
            if (slow > 0 && arr[slow - 1] !== ' ') {
                arr[slow++] = ' ';
            }
        } else {
            // 非空格字符直接复制
            arr[slow++] = arr[fast];
        }
        fast++;
    }
    
    // 如果最后是空格，去除
    if (slow > 0 && arr[slow - 1] === ' ') {
        slow--;
    }
    
    // 截取有效部分
    arr.length = slow;
    
    // 第二步：反转整个字符串
    reverse(arr, 0, arr.length - 1);
    
    // 第三步：反转每个单词
    let start = 0;
    for (let i = 0; i <= arr.length; i++) {
        // 遇到空格或到达末尾，反转单词
        if (i === arr.length || arr[i] === ' ') {
            reverse(arr, start, i - 1);
            start = i + 1;
        }
    }
    
    return arr.join('');
};

export { reverseWords, reverseWords2, reverseWords3 };




