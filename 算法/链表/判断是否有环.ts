/**
 * LeetCode 141. 环形链表
 * 
 * 题目描述：
 * 给你一个链表的头节点 head，判断链表中是否有环。
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。
 * 
 * 示例：
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 * 
 * 输入：head = [1,2], pos = 0
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 * 
 * 输入：head = [1], pos = -1
 * 输出：false
 * 解释：链表中没有环。
 * 
 * 解题思路：
 * 方法一：快慢指针法（Floyd 判圈算法）
 * - 使用两个指针：慢指针每次移动一步，快指针每次移动两步
 * - 如果链表有环，快慢指针最终会相遇
 * - 如果快指针到达链表末尾，则无环
 * 
 * 方法二：哈希表法
 * - 遍历链表，将每个节点存入哈希表
 * - 如果遇到已经访问过的节点，说明有环
 * 
 * 时间复杂度：O(n) - 两种方法都是
 * 空间复杂度：O(1) - 快慢指针法，O(n) - 哈希表法
 */

// 链表节点定义
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

/**
 * 方法一：快慢指针法（Floyd 判圈算法）
 * 核心思想：如果有环，快指针最终会追上慢指针
 */
function hasCycle<T>(head: ListNode<T> | null): boolean {
  // 空链表或只有一个节点且没有环的情况
  if (head === null || head.next === null) {
    return false;
  }

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;       // 慢指针每次走一步
    fast = fast.next.next;   // 快指针每次走两步

    // 如果快慢指针相遇，说明有环
    if (slow === fast) {
      return true;
    }
  }

  // 快指针到达链表末尾，说明无环
  return false;
}

/**
 * 方法二：哈希表法
 * 核心思想：记录访问过的节点，如果遇到重复的节点则有环
 */
function hasCycle2<T>(head: ListNode<T> | null): boolean {
  const visited = new Set<ListNode<T>>();
  let current = head;

  while (current !== null) {
    if (visited.has(current)) {
      return true;
    }
    visited.add(current);
    current = current.next;
  }

  return false;
}

// 辅助函数：创建链表节点
function createListNode<T>(value: T, next: ListNode<T> | null = null): ListNode<T> {
  return { value, next };
}

// 测试用例
console.log("=== 环形链表测试 ===");

// 创建有环链表：1 -> 2 -> 3 -> 4 -> 2 (环)
console.log("\n--- 测试1：有环链表 ---");
const node1 = createListNode(1);
const node2 = createListNode(2);
const node3 = createListNode(3);
const node4 = createListNode(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // 创建环

console.log("快慢指针法结果:", hasCycle(node1)); // true
console.log("哈希表法结果:", hasCycle2(node1));   // true

// 创建无环链表：1 -> 2 -> 3 -> 4
console.log("\n--- 测试2：无环链表 ---");
const node5 = createListNode(1);
const node6 = createListNode(2);
const node7 = createListNode(3);
const node8 = createListNode(4);

node5.next = node6;
node6.next = node7;
node7.next = node8;

console.log("快慢指针法结果:", hasCycle(node5)); // false
console.log("哈希表法结果:", hasCycle2(node5));   // false

// 测试空链表
console.log("\n--- 测试3：空链表 ---");
console.log("快慢指针法结果:", hasCycle(null)); // false
console.log("哈希表法结果:", hasCycle2(null));   // false

// 测试单个节点无环
console.log("\n--- 测试4：单个节点无环 ---");
const singleNode = createListNode(1);
console.log("快慢指针法结果:", hasCycle(singleNode)); // false
console.log("哈希表法结果:", hasCycle2(singleNode));   // false

// 测试单个节点有环（自环）
console.log("\n--- 测试5：单个节点有环 ---");
const singleCycleNode = createListNode(1);
singleCycleNode.next = singleCycleNode; // 自环
console.log("快慢指针法结果:", hasCycle(singleCycleNode)); // true
console.log("哈希表法结果:", hasCycle2(singleCycleNode));   // true

export {};