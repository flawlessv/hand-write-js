/**
 * LeetCode 2. 两数相加
 * LeetCode: https://leetcode.cn/problems/add-two-numbers/
 * 
 * 题目描述：
 * 给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。
 * 
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * 
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 
 * 示例 1：
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[7,0,8]
 * 解释：342 + 465 = 807
 * 
 * 示例 2：
 * 输入：l1 = [0], l2 = [0]
 * 输出：[0]
 * 
 * 示例 3：
 * 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * 输出：[8,9,9,9,0,0,0,1]
 * 
 * 提示：
 * - 每个链表中的节点数在范围 [1, 100] 内
 * - 0 <= Node.val <= 9
 * - 题目数据保证列表表示的数字不含前导零
 * 
 * 解题思路：
 * 模拟竖式加法，同时遍历两个链表，逐位相加并处理进位
 * 
 * 时间复杂度：O(max(m, n))，其中 m 和 n 分别是两个链表的长度
 * 空间复杂度：O(1) - 不计算返回链表占用的空间
 */

// 链表节点定义
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

/**
 * 标准解法：模拟竖式加法
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // 创建虚拟头节点，简化边界处理
    const dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0;  // 进位
    
    // 同时遍历两个链表
    while(l1 !== null || l2 !== null || carry !== 0) {
        // 获取当前位的值，如果链表已遍历完则为0
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        
        // 计算当前位的和（包括进位）
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);  // 计算新的进位
        const digit = sum % 10;        // 当前位的数字
        
        // 创建新节点
        current.next = new ListNode(digit);
        current = current.next;
        
        // 移动链表指针
        if(l1) l1 = l1.next;
        if(l2) l2 = l2.next;
    }
    
    // 返回结果链表的头节点（跳过虚拟头节点）
    return dummyHead.next;
};

// 辅助函数：从数组创建链表
function createLinkedList(arr) {
    if(arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for(let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// 辅助函数：将链表转换为数组（用于打印）
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while(current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// 测试用例
console.log("=== 两数相加测试 ===");

// 测试用例1
const l1_1 = createLinkedList([2, 4, 3]);
const l2_1 = createLinkedList([5, 6, 4]);
const result1 = addTwoNumbers(l1_1, l2_1);
console.log("测试用例1:");
console.log("输入: l1 = [2,4,3], l2 = [5,6,4]");
console.log("输出:", linkedListToArray(result1));  // 期望: [7,0,8]

// 测试用例2
const l1_2 = createLinkedList([0]);
const l2_2 = createLinkedList([0]);
const result2 = addTwoNumbers(l1_2, l2_2);
console.log("\n测试用例2:");
console.log("输入: l1 = [0], l2 = [0]");
console.log("输出:", linkedListToArray(result2));  // 期望: [0]

// 测试用例3
const l1_3 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
const l2_3 = createLinkedList([9, 9, 9, 9]);
const result3 = addTwoNumbers(l1_3, l2_3);
console.log("\n测试用例3:");
console.log("输入: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]");
console.log("输出:", linkedListToArray(result3));  // 期望: [8,9,9,9,0,0,0,1]

