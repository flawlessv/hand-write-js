/**
 * LeetCode 19. 删除链表的倒数第 N 个节点
 * LeetCode: https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
 * 
 * 题目描述：
 * 给你一个链表，删除链表的倒数第 n 个节点，并且返回链表的头节点。
 * 
 * 示例：
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 解释：删除倒数第2个节点（值为4的节点）
 * 
 * 输入：head = [1], n = 1
 * 输出：[]
 * 解释：删除唯一的节点，返回空链表
 * 
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 * 解释：删除倒数第1个节点（值为2的节点）
 * 
 * 解题思路：
 * 方法一：双指针法（快慢指针）
 * - 使用虚拟头节点简化边界条件处理
 * - 快指针先移动n步，然后快慢指针同时移动
 * - 当快指针到达末尾时，慢指针指向要删除节点的前一个节点
 * 
 * 方法二：计算链表长度
 * - 先遍历一遍计算链表总长度
 * - 再遍历到倒数第n+1个节点进行删除
 * 
 * 时间复杂度：O(n) - 两种方法都是
 * 空间复杂度：O(1) - 两种方法都是
 */

// 链表节点定义
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 方法一：双指针法（推荐）
 * 核心思想：快指针先走n步，然后同步移动，保持固定间距
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // 创建虚拟头节点，简化边界条件处理
  let dummyHead = new ListNode(0, head);
  
  // 快指针先移动n步
  let fast: ListNode | null = dummyHead;
  for (let i = 0; i < n; i++) {
    fast = fast.next!;
  }
  
  // 快慢指针同时移动，直到快指针到达末尾
  let slow: ListNode = dummyHead;
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next!;
  }
  
  // 此时slow指向要删除节点的前一个节点
  slow.next = slow.next!.next;
  
  // 返回新的头节点
  return dummyHead.next;
}

/**
 * 方法二：计算链表长度法
 * 核心思想：先计算总长度，再定位到要删除的节点
 */
function removeNthFromEnd2(head: ListNode | null, n: number): ListNode | null {
  if (head === null) return null;
  
  // 计算链表长度
  let length = 0;
  let current = head;
  while (current.next !== null) {
    length++;
    current = current.next;
  }
  
  // 处理删除头节点的情况
  if (n === length) {
    return head.next;
  }
  
  // 找到要删除节点的前一个节点
  let prevIndex = length - n - 1;
  let prev = head;
  for (let i = 0; i < prevIndex; i++) {
    prev = prev.next!;
  }
  
  // 删除节点
  prev.next = prev.next!.next;
  
  return head;
}

// 辅助函数：从数组创建链表
function createLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  
  const head = new ListNode(arr[0]);
  let current = head;
  
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  
  return head;
}

// 辅助函数：将链表转换为数组（用于打印）
function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  
  return result;
}

// 辅助函数：打印链表
function printLinkedList(head: ListNode | null, name: string): void {
  console.log(`${name}:`, linkedListToArray(head));
}

// 测试用例
console.log("=== 删除链表的倒数第 N 个节点测试 ===");

// 测试用例1：正常情况 [1,2,3,4,5], n = 2
console.log("\n--- 测试1：删除倒数第2个节点 ---");
const list1 = createLinkedList([1, 2, 3, 4, 5]);
printLinkedList(list1, "原链表");

const result1 = removeNthFromEnd(createLinkedList([1, 2, 3, 4, 5]), 2);
printLinkedList(result1, "双指针法结果");

const result2 = removeNthFromEnd2(createLinkedList([1, 2, 3, 4, 5]), 2);
printLinkedList(result2, "计算长度法结果");

// 测试用例2：删除头节点 [1,2], n = 2
console.log("\n--- 测试2：删除头节点 ---");
const list2 = createLinkedList([1, 2]);
printLinkedList(list2, "原链表");

const result3 = removeNthFromEnd(createLinkedList([1, 2]), 2);
printLinkedList(result3, "删除头节点后");

// 测试用例3：删除尾节点 [1,2,3], n = 1
console.log("\n--- 测试3：删除尾节点 ---");
const list3 = createLinkedList([1, 2, 3]);
printLinkedList(list3, "原链表");

const result4 = removeNthFromEnd(createLinkedList([1, 2, 3]), 1);
printLinkedList(result4, "删除尾节点后");

// 测试用例4：单个节点 [1], n = 1
console.log("\n--- 测试4：单个节点 ---");
const list4 = createLinkedList([1]);
printLinkedList(list4, "原链表");

const result5 = removeNthFromEnd(createLinkedList([1]), 1);
printLinkedList(result5, "删除后");

// 测试用例5：空链表 [], n = 1
console.log("\n--- 测试5：空链表 ---");
const list5 = createLinkedList([]);
printLinkedList(list5, "原链表");

const result6 = removeNthFromEnd(createLinkedList([]), 1);
printLinkedList(result6, "删除后");

export {};
