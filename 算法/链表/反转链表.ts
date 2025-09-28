/**
 * LeetCode 206. 反转链表
 * 
 * 题目描述：
 * 给你单链表的头节点 head，请你反转链表，并返回反转后的链表。
 * 
 * 示例：
 * 输入：head = [1,2,3,4,5]
 * 输出：[5,4,3,2,1]
 * 
 * 输入：head = [1,2]
 * 输出：[2,1]
 * 
 * 输入：head = []
 * 输出：[]
 * 
 * 解题思路：
 * 反转链表就是改变链表中每个节点的指针方向，使其指向前一个节点。
 * 
 * 方法一：迭代（双指针）
 * - 使用三个指针：prev（前一个节点）、curr（当前节点）、next（下一个节点）
 * - 遍历链表，逐个反转每个节点的指针
 * 
 * 方法二：递归
 * - 递归到链表末尾，然后在回溯过程中反转指针
 * 
 * 时间复杂度：O(n)，其中 n 是链表的长度
 * 空间复杂度：O(1) - 迭代，O(n) - 递归（递归栈）
 */

// 链表节点定义
interface ListNode {
  val: number;
  next: ListNode | null;
}

// 方法一：迭代实现（双指针法）
function reverseList(head: ListNode | null): ListNode | null {
  let prevNode: ListNode | null = null; // 前一个节点
  let currNode: ListNode | null = head; // 当前节点
  
  // 遍历链表，逐个反转指针
  while (currNode !== null) {
    const nextNode: ListNode | null = currNode.next; // 保存下一个节点
    
    // 反转当前节点的指针，使其指向前一个节点
    currNode.next = prevNode;
    
    // 移动指针：prev 和 curr 都向前移动一步
    prevNode = currNode;
    currNode = nextNode;
  }
  
  // 返回新的头节点（原来的尾节点）
  return prevNode;
}

// 方法二：递归实现
function reverseListRecursive(head: ListNode | null): ListNode | null {
  // 基础情况：空链表或只有一个节点
  if (head === null || head.next === null) {
    return head;
  }
  
  // 递归反转后面的链表，返回新的头节点
  const newHead = reverseListRecursive(head.next);
  
  // 反转当前节点和下一个节点的连接
  // head.next 现在指向原来的下一个节点
  // 让下一个节点指向当前节点
  head.next.next = head;
  
  // 断开当前节点指向下一个节点的连接
  head.next = null;
  
  // 返回新的头节点
  return newHead;
}

// 方法三：使用栈实现
function reverseListStack(head: ListNode | null): ListNode | null {
  if (head === null) return null;
  
  // 使用栈存储所有节点
  const stack: ListNode[] = [];
  let curr = head;
  
  // 将所有节点压入栈
  while (curr !== null) {
    stack.push(curr);
    curr = curr.next;
  }
  
  // 从栈中弹出节点，重新连接
  const newHead = stack.pop()!;
  curr = newHead;
  
  while (stack.length > 0) {
    curr.next = stack.pop()!;
    curr = curr.next;
  }
  
  // 最后一个节点的 next 设为 null
  curr.next = null;
  
  return newHead;
}

// 辅助函数：创建链表节点
function createListNode(val: number, next: ListNode | null = null): ListNode {
  return { val, next };
}

// 辅助函数：从数组创建链表
function createLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  
  const head = createListNode(arr[0]);
  let curr = head;
  
  for (let i = 1; i < arr.length; i++) {
    curr.next = createListNode(arr[i]);
    curr = curr.next;
  }
  
  return head;
}

// 辅助函数：将链表转换为数组（用于打印）
function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let curr = head;
  
  while (curr !== null) {
    result.push(curr.val);
    curr = curr.next;
  }
  
  return result;
}

// 辅助函数：打印链表
function printLinkedList(head: ListNode | null, name: string): void {
  console.log(`${name}:`, linkedListToArray(head));
}

// 测试用例
console.log("=== 反转链表测试 ===");

// 测试用例1：正常链表 [1,2,3,4,5]
console.log("\n--- 测试1：正常链表 ---");
const list1 = createLinkedList([1, 2, 3, 4, 5]);
printLinkedList(list1, "原链表");

const reversed1 = reverseList(JSON.parse(JSON.stringify(list1)));
printLinkedList(reversed1, "迭代反转后");

const reversed2 = reverseListRecursive(createLinkedList([1, 2, 3, 4, 5]));
printLinkedList(reversed2, "递归反转后");

const reversed3 = reverseListStack(createLinkedList([1, 2, 3, 4, 5]));
printLinkedList(reversed3, "栈反转后");

// 测试用例2：两个节点的链表 [1,2]
console.log("\n--- 测试2：两个节点 ---");
const list2 = createLinkedList([1, 2]);
printLinkedList(list2, "原链表");
const reversed4 = reverseList(list2);
printLinkedList(reversed4, "反转后");

// 测试用例3：单个节点的链表 [1]
console.log("\n--- 测试3：单个节点 ---");
const list3 = createLinkedList([1]);
printLinkedList(list3, "原链表");
const reversed5 = reverseList(list3);
printLinkedList(reversed5, "反转后");

// 测试用例4：空链表
console.log("\n--- 测试4：空链表 ---");
const list4 = createLinkedList([]);
printLinkedList(list4, "原链表");
const reversed6 = reverseList(list4);
printLinkedList(reversed6, "反转后");

// 性能测试
console.log("\n=== 性能测试 ===");
const largeArray = Array.from({ length: 10000 }, (_, i) => i + 1);

console.time("迭代方法");
const largeList1 = createLinkedList(largeArray);
reverseList(largeList1);
console.timeEnd("迭代方法");

console.time("递归方法");
const largeList2 = createLinkedList(largeArray);
reverseListRecursive(largeList2);
console.timeEnd("递归方法");

console.time("栈方法");
const largeList3 = createLinkedList(largeArray);
reverseListStack(largeList3);
console.timeEnd("栈方法");

