/**
 * LeetCode 142. 环形链表 II
 * LeetCode: https://leetcode.cn/problems/linked-list-cycle-ii/
 * 
 * 题目描述：
 * 给定一个链表的头节点 head，返回链表开始入环的第一个节点。如果链表无环，则返回 null。
 * 
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。
 * 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
 * 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
 * 
 * 不允许修改链表。
 * 
 * 示例 1：
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：返回索引为 1 的链表节点
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 * 
 * 示例 2：
 * 输入：head = [1,2], pos = 0
 * 输出：返回索引为 0 的链表节点
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 * 
 * 示例 3：
 * 输入：head = [1], pos = -1
 * 输出：返回 null
 * 解释：链表中没有环。
 * 
 * 提示：
 * - 链表中节点的数目范围在范围 [0, 10^4] 内
 * - -10^5 <= Node.val <= 10^5
 * - pos 的值为 -1 或者链表中的一个有效索引
 * 
 * 进阶：你是否可以使用 O(1) 空间解决此题？
 * 
 * 解题思路：
 * 方法一：快慢指针法（Floyd 判圈算法，推荐）
 * - 第一步：使用快慢指针判断是否有环，并找到相遇点
 * - 第二步：将一个指针重置到头部，两个指针同时移动，每次移动一步
 * - 第三步：当两个指针再次相遇时，相遇点就是环的入口
 * 
 * 方法二：哈希表法
 * - 遍历链表，将每个节点存入哈希表
 * - 如果遇到已经访问过的节点，该节点就是环的入口
 * 
 * 时间复杂度：
 * - 方法一：O(n)，其中 n 是链表的长度
 * - 方法二：O(n)
 * 
 * 空间复杂度：
 * - 方法一：O(1)
 * - 方法二：O(n)
 */

// 链表节点定义
interface ListNode {
  val: number;
  next: ListNode | null;
}

/**
 * 方法一：快慢指针法（Floyd 判圈算法，推荐）
 * 
 * 核心思想详解：
 * 
 * 1. 第一阶段：判断是否有环并找到相遇点
 *    - 使用快慢指针，快指针每次走两步，慢指针每次走一步
 *    - 如果链表有环，快慢指针会在环内某点相遇
 * 
 * 2. 第二阶段：找到环的入口
 *    - 设链表头到环入口的距离为 a
 *    - 设环入口到相遇点的距离为 b
 *    - 设相遇点到环入口的距离为 c
 *    - 设环的长度为 L = b + c
 * 
 *    当快慢指针相遇时：
 *    - 慢指针走过的距离：a + b
 *    - 快指针走过的距离：a + b + n * L（n 是快指针在环内转的圈数）
 *    - 因为快指针速度是慢指针的 2 倍，所以：
 *      2(a + b) = a + b + n * L
 *      化简得：a + b = n * L
 *      即：a = n * L - b = (n - 1) * L + c
 * 
 *    这意味着：从链表头到环入口的距离 a，等于从相遇点到环入口的距离 c，加上 (n-1) 圈环的长度
 * 
 * 3. 因此，当快慢指针在相遇点相遇后：
 *    - 将一个指针重置到链表头
 *    - 两个指针同时移动，每次移动一步
 *    - 当两个指针再次相遇时，相遇点就是环的入口
 * 
 * 数学证明：
 * 设：
 *   - 链表头到环入口的距离：a
 *   - 环入口到相遇点的距离：b
 *   - 相遇点到环入口的距离：c
 *   - 环的长度：L = b + c
 * 
 * 当快慢指针相遇时：
 *   慢指针走过的距离：slow = a + b
 *   快指针走过的距离：fast = a + b + n * L（n >= 1，快指针在环内转了 n 圈）
 * 
 * 因为快指针速度是慢指针的 2 倍：
 *   fast = 2 * slow
 *   a + b + n * L = 2(a + b)
 *   a + b = n * L
 *   a = n * L - b = n * (b + c) - b = n * b + n * c - b = (n - 1) * b + n * c
 * 
 * 由于 b + c = L，所以：
 *   a = (n - 1) * L + c
 * 
 * 这意味着：
 *   - 从链表头走 a 步到达环入口
 *   - 从相遇点走 c 步也到达环入口（因为再走 (n-1) 圈还是回到环入口）
 *   - 所以两个指针同时移动，会在环入口相遇
 * 
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function detectCycle(head: ListNode | null): ListNode | null {
  // 空链表或只有一个节点且没有环的情况
  if (head === null || head.next === null) {
    return null;
  }

  // 第一阶段：使用快慢指针找到相遇点
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  // 找到相遇点
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;       // 慢指针每次走一步
    fast = fast.next.next;   // 快指针每次走两步

    // 如果快慢指针相遇，说明有环
    if (slow === fast) {
      // 第二阶段：找到环的入口
      // 将一个指针重置到链表头
      let ptr1: ListNode | null = head;
      let ptr2: ListNode | null = slow; // 从相遇点开始

      // 两个指针同时移动，每次移动一步
      // 当两个指针相遇时，相遇点就是环的入口
      while (ptr1 !== ptr2) {
        ptr1 = ptr1!.next;
        ptr2 = ptr2!.next;
      }

      return ptr1; // 返回环的入口节点
    }
  }

  // 快指针到达链表末尾，说明无环
  return null;
}

/**
 * 方法二：哈希表法
 * 
 * 核心思想：
 * 1. 遍历链表，将每个节点存入哈希表（Set）
 * 2. 如果遇到已经访问过的节点，该节点就是环的入口
 * 3. 如果遍历完链表都没有遇到重复节点，说明无环
 * 
 * 优点：思路简单直观
 * 缺点：需要 O(n) 的额外空间
 * 
 * @param {ListNode | null} head
 * @return {ListNode | null}
 */
function detectCycle2(head: ListNode | null): ListNode | null {
  const visited = new Set<ListNode>();
  let current: ListNode | null = head;

  while (current !== null) {
    // 如果当前节点已经在哈希表中，说明这是环的入口
    if (visited.has(current)) {
      return current;
    }
    
    // 将当前节点加入哈希表
    visited.add(current);
    current = current.next;
  }

  // 遍历完链表都没有遇到重复节点，说明无环
  return null;
}

// 辅助函数：创建链表节点
function createListNode(val: number, next: ListNode | null = null): ListNode {
  return { val, next };
}

// 辅助函数：打印链表（用于调试，遇到环会停止）
function printList(head: ListNode | null, maxNodes: number = 20): void {
  if (head === null) {
    console.log("null");
    return;
  }

  const visited = new Set<ListNode>();
  let current: ListNode | null = head;
  const values: (number | string)[] = [];
  let count = 0;

  while (current !== null && count < maxNodes) {
    if (visited.has(current)) {
      values.push(`[环入口:${current.val}]`);
      break;
    }
    values.push(current.val);
    visited.add(current);
    current = current.next;
    count++;
  }

  console.log(values.join(" -> "));
}

// 测试用例
console.log("=== 环形链表 II 测试 ===");

// 测试用例1：有环链表，环入口在索引 1
console.log("\n--- 测试1：有环链表，环入口在索引 1 ---");
const node1 = createListNode(3);
const node2 = createListNode(2);
const node3 = createListNode(0);
const node4 = createListNode(-4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // 创建环，环入口是 node2

console.log("链表结构：");
printList(node1);

const result1 = detectCycle(node1);
console.log("快慢指针法结果:", result1?.val); // 期望: 2
console.log("哈希表法结果:", detectCycle2(node1)?.val); // 期望: 2

// 测试用例2：有环链表，环入口在索引 0
console.log("\n--- 测试2：有环链表，环入口在索引 0 ---");
const node5 = createListNode(1);
const node6 = createListNode(2);

node5.next = node6;
node6.next = node5; // 创建环，环入口是 node5

console.log("链表结构：");
printList(node5);

const result2 = detectCycle(node5);
console.log("快慢指针法结果:", result2?.val); // 期望: 1
console.log("哈希表法结果:", detectCycle2(node5)?.val); // 期望: 1

// 测试用例3：无环链表
console.log("\n--- 测试3：无环链表 ---");
const node7 = createListNode(1);
const node8 = createListNode(2);
const node9 = createListNode(3);
const node10 = createListNode(4);

node7.next = node8;
node8.next = node9;
node9.next = node10;

console.log("链表结构：");
printList(node7);

const result3 = detectCycle(node7);
console.log("快慢指针法结果:", result3); // 期望: null
console.log("哈希表法结果:", detectCycle2(node7)); // 期望: null

// 测试用例4：空链表
console.log("\n--- 测试4：空链表 ---");
const result4 = detectCycle(null);
console.log("快慢指针法结果:", result4); // 期望: null
console.log("哈希表法结果:", detectCycle2(null)); // 期望: null

// 测试用例5：单个节点无环
console.log("\n--- 测试5：单个节点无环 ---");
const singleNode = createListNode(1);
const result5 = detectCycle(singleNode);
console.log("快慢指针法结果:", result5); // 期望: null
console.log("哈希表法结果:", detectCycle2(singleNode)); // 期望: null

// 测试用例6：单个节点有环（自环）
console.log("\n--- 测试6：单个节点有环（自环） ---");
const singleCycleNode = createListNode(1);
singleCycleNode.next = singleCycleNode; // 自环

console.log("链表结构：");
printList(singleCycleNode);

const result6 = detectCycle(singleCycleNode);
console.log("快慢指针法结果:", result6?.val); // 期望: 1
console.log("哈希表法结果:", detectCycle2(singleCycleNode)?.val); // 期望: 1

// 测试用例7：环入口在链表中间
console.log("\n--- 测试7：环入口在链表中间 ---");
const node11 = createListNode(1);
const node12 = createListNode(2);
const node13 = createListNode(3);
const node14 = createListNode(4);
const node15 = createListNode(5);

node11.next = node12;
node12.next = node13;
node13.next = node14;
node14.next = node15;
node15.next = node13; // 创建环，环入口是 node13

console.log("链表结构：");
printList(node11);

const result7 = detectCycle(node11);
console.log("快慢指针法结果:", result7?.val); // 期望: 3
console.log("哈希表法结果:", detectCycle2(node11)?.val); // 期望: 3

export {};

