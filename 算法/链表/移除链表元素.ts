/**
 * LeetCode 203. 移除链表元素
 * 
 * 题目描述：
 * 给你一个链表的头节点 head 和一个整数 val，请你删除链表中所有满足 Node.val == val 的节点，并返回新的头节点。
 * 
 * 示例：
 * 输入：head = [1,2,6,3,4,5,6], val = 6
 * 输出：[1,2,3,4,5]
 * 解释：删除了所有值为6的节点
 * 
 * 输入：head = [], val = 1
 * 输出：[]
 * 解释：空链表，无需删除
 * 
 * 输入：head = [7,7,7,7], val = 7
 * 输出：[]
 * 解释：所有节点都需要删除，返回空链表
 * 
 * 解题思路：
 * 方法一：直接删除法
 * - 先处理头节点（可能需要连续删除多个头节点）
 * - 然后遍历链表，删除值为 val 的节点
 * - 需要特别注意指针的维护
 * 
 * 方法二：虚拟头节点法（推荐）
 * - 创建一个虚拟头节点，简化边界条件处理
 * - 统一处理所有节点的删除操作
 * - 代码更简洁，不易出错
 * 
 * 时间复杂度：O(n) - 需要遍历整个链表
 * 空间复杂度：O(1) - 只使用了常数级别的额外空间
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
 * 方法一：直接删除法
 * 核心思想：先处理头节点，再处理中间节点
 */
function removeElements(head: ListNode | null, val: number): ListNode | null {
  // 删除头部节点（可能需要连续删除多个头节点）
  while (head !== null && head.val === val) {
    head = head.next;
  }
  
  // 处理空链表的情况
  if (head === null) return head;
  
  // 删除非头部节点
  let pre: ListNode = head;
  let cur: ListNode | null = head.next;
  
  while (cur) {
    if (cur.val === val) {
      // 跳过当前节点（删除操作）
      pre.next = cur.next;
    } else {
      // 只有不删除时才移动 pre 指针
      pre = cur;
    }
    cur = cur.next;
  }
  
  return head;
}

/**
 * 方法二：虚拟头节点法（推荐）
 * 核心思想：使用虚拟头节点统一处理所有情况
 */
function removeElements2(head: ListNode | null, val: number): ListNode | null {
  // 创建虚拟头节点
  const dummyHead = new ListNode(0, head);
  
  // 使用 pre 和 cur 双指针
  let pre = dummyHead;
  let cur = dummyHead.next;
  
  while (cur) {
    if (cur.val === val) {
      // 跳过当前节点（删除操作）
      pre.next = cur.next;
    } else {
      // 只有不删除时才移动 pre 指针
      pre = cur;
    }
    cur = cur.next;
  }
  
  // 返回新的头节点
  return dummyHead.next;
}

/**
 * 方法三：递归法
 * 核心思想：递归处理子链表
 */
function removeElementsRecursive(head: ListNode | null, val: number): ListNode | null {
  // 基础情况：空链表
  if (head === null) {
    return null;
  }
  
  // 递归处理剩余的链表
  head.next = removeElementsRecursive(head.next, val);
  
  // 处理当前节点
  if (head.val === val) {
    return head.next; // 跳过当前节点
  } else {
    return head;      // 保留当前节点
  }
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
console.log("=== 移除链表元素测试 ===");

// 测试用例1：正常情况 [1,2,6,3,4,5,6], val = 6
console.log("\n--- 测试1：删除值为6的节点 ---");
const list1 = createLinkedList([1, 2, 6, 3, 4, 5, 6]);
printLinkedList(list1, "原链表");

const result1 = removeElements(createLinkedList([1, 2, 6, 3, 4, 5, 6]), 6);
printLinkedList(result1, "直接删除法结果");

const result2 = removeElements2(createLinkedList([1, 2, 6, 3, 4, 5, 6]), 6);
printLinkedList(result2, "虚拟头节点法结果");

const result3 = removeElementsRecursive(createLinkedList([1, 2, 6, 3, 4, 5, 6]), 6);
printLinkedList(result3, "递归法结果");

// 测试用例2：需要删除头节点 [1,2,3,1], val = 1
console.log("\n--- 测试2：删除头节点 ---");
const list2 = createLinkedList([1, 2, 3, 1]);
printLinkedList(list2, "原链表");

const result4 = removeElements2(createLinkedList([1, 2, 3, 1]), 1);
printLinkedList(result4, "删除值为1的节点后");

// 测试用例3：所有节点都需要删除 [7,7,7,7], val = 7
console.log("\n--- 测试3：所有节点都需要删除 ---");
const list3 = createLinkedList([7, 7, 7, 7]);
printLinkedList(list3, "原链表");

const result5 = removeElements2(createLinkedList([7, 7, 7, 7]), 7);
printLinkedList(result5, "删除所有节点后");

// 测试用例4：空链表 [], val = 1
console.log("\n--- 测试4：空链表 ---");
const list4 = createLinkedList([]);
printLinkedList(list4, "原链表");

const result6 = removeElements2(createLinkedList([]), 1);
printLinkedList(result6, "删除后");

// 测试用例5：单个节点 [1], val = 1
console.log("\n--- 测试5：单个节点 ---");
const list5 = createLinkedList([1]);
printLinkedList(list5, "原链表");

const result7 = removeElements2(createLinkedList([1]), 1);
printLinkedList(result7, "删除后");

// 性能测试
console.log("\n=== 性能测试 ===");
const largeArray = Array.from({ length: 10000 }, (_, i) => i % 10 === 0 ? 5 : i); // 每10个节点有一个值为5

console.time("直接删除法");
const largeList1 = createLinkedList(largeArray);
removeElements(largeList1, 5);
console.timeEnd("直接删除法");

console.time("虚拟头节点法");
const largeList2 = createLinkedList(largeArray);
removeElements2(largeList2, 5);
console.timeEnd("虚拟头节点法");

console.time("递归法");
const largeList3 = createLinkedList(largeArray);
removeElementsRecursive(largeList3, 5);
console.timeEnd("递归法");

export {};