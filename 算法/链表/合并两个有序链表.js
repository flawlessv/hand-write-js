/**
 * LeetCode 21. 合并两个有序链表
 * LeetCode: https://leetcode.cn/problems/merge-two-sorted-lists/
 * 
 * 题目描述：
 * 
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 * 
 * 
 * 示例 1：
 * 输入：l1 = [1,2,4], l2 = [2,3,4]
 * 输出：[1,2,2,3,4,4]
 * 
 * 
 * 示例 2：
 * 输入：l1 = [], l2 = []
 * 输出：[]
 * 
 * 
 * 示例 3：
 * 输入：l1 = [], l2 = [0]
 * 输出：[0]
 * 
 * 
 * 提示：
 * - 两个链表的节点数目范围是 [0, 50]
 * - -100 <= Node.val <= 100
 * - l1 和 l2 均按 非递减顺序 排列
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 方法一：迭代法（推荐）
var mergeTwoLists = function(list1, list2) {
    // 创建虚拟头节点，简化边界处理
    const dummyHead = new ListNode(0);
    let current = dummyHead;
    
    // 当两个链表都不为空时，比较节点值
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // 将剩余的非空链表连接到结果链表
    current.next = list1 !== null ? list1 : list2;
    
    return dummyHead.next;
};

// 方法二：递归法
var mergeTwoListsRecursive = function(list1, list2) {
    // 基础情况：如果其中一个链表为空，返回另一个链表
    if (list1 === null) {
        return list2;
    }
    if (list2 === null) {
        return list1;
    }
    
    // 比较两个链表的头节点值
    if (list1.val <= list2.val) {
        // list1 的头节点更小，将其作为结果的头节点
        list1.next = mergeTwoListsRecursive(list1.next, list2);
        return list1;
    } else {
        // list2 的头节点更小，将其作为结果的头节点
        list2.next = mergeTwoListsRecursive(list1, list2.next);
        return list2;
    }
};

// 辅助函数：创建链表节点
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// 辅助函数：从数组创建链表
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// 辅助函数：将链表转换为数组
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// 测试用例
console.log("=== 合并两个有序链表测试 ===");

// 测试用例1
const list1_1 = createLinkedList([1, 2, 4]);
const list2_1 = createLinkedList([2, 3, 4]);
const result1 = mergeTwoLists(list1_1, list2_1);
console.log("测试用例1:");
console.log("输入: list1 = [1,2,4], list2 = [2,3,4]");
console.log("输出:", linkedListToArray(result1)); // 期望: [1,2,2,3,4,4]

// 测试用例2
const list1_2 = createLinkedList([]);
const list2_2 = createLinkedList([]);
const result2 = mergeTwoLists(list1_2, list2_2);
console.log("\n测试用例2:");
console.log("输入: list1 = [], list2 = []");
console.log("输出:", linkedListToArray(result2)); // 期望: []

// 测试用例3
const list1_3 = createLinkedList([]);
const list2_3 = createLinkedList([0]);
const result3 = mergeTwoLists(list1_3, list2_3);
console.log("\n测试用例3:");
console.log("输入: list1 = [], list2 = [0]");
console.log("输出:", linkedListToArray(result3)); // 期望: [0]

