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
 * ===== 为什么是逆序存储？ =====
 * 这是本题最巧妙的设计！如果数字是正序存储（如 [3,4,2] 表示 342），
 * 加法会非常麻烦：需要先遍历到链表末尾才能从个位开始相加，或者需要先反转链表。
 *
 * 但因为是**逆序存储**（[2,4,3] 表示 342），链表的头部就是个位，尾部是最高位，
 * 这样我们可以：
 *   1. 直接从链表头开始遍历 = 从个位开始相加（完全符合竖式加法的顺序！）
 *   2. 一边遍历一边计算，无需反转或预处理
 *   3. 进位自然地传递到下一个节点（next节点正好是更高位）
 *
 * 示例：342 + 465 = 807
 *   l1: [2→4→3]  表示 342（个位2→十位4→百位3）
 *   l2: [5→6→4]  表示 465（个位5→十位6→百位4）
 *   相加过程：
 *     2+5=7, 进位0 → 结果个位 7
 *     4+6=10, 进位1 → 结果十位 0
 *     3+4+1(进位)=8 → 结果百位 8
 *   结果: [7→0→8]  表示 807
 *
 * 时间复杂度：O(max(m, n))，其中 m 和 n 分别是两个链表的长度
 * 空间复杂度：O(1) - 不计算返回链表占用的空间
 */

// 链表节点定义
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * 标准解法：模拟竖式加法
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  // 创建虚拟头节点，简化边界处理
  const dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0; // 进位

  // 同时遍历两个链表
  while (l1 !== null || l2 !== null || carry !== 0) {
    // 获取当前位的值，如果链表已遍历完则为0
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    // 计算当前位的和（包括进位）
    const sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10); // 计算新的进位
    const digit = sum % 10; // 当前位的数字

    // 创建新节点
    current.next = new ListNode(digit);
    current = current.next;

    // 移动链表指针
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  // 返回结果链表的头节点（跳过虚拟头节点）
  return dummyHead.next;
};

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

// 辅助函数：将链表转换为数组（用于打印）
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
console.log("=== 两数相加测试 ===");

// 测试用例1
const l1_1 = createLinkedList([2, 4, 3]);
const l2_1 = createLinkedList([5, 6, 4]);
const result1 = addTwoNumbers(l1_1, l2_1);
console.log("测试用例1:");
console.log("输入: l1 = [2,4,3], l2 = [5,6,4]");
console.log("输出:", linkedListToArray(result1)); // 期望: [7,0,8]

// 测试用例2
const l1_2 = createLinkedList([0]);
const l2_2 = createLinkedList([0]);
const result2 = addTwoNumbers(l1_2, l2_2);
console.log("\n测试用例2:");
console.log("输入: l1 = [0], l2 = [0]");
console.log("输出:", linkedListToArray(result2)); // 期望: [0]

// 测试用例3
const l1_3 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
const l2_3 = createLinkedList([9, 9, 9, 9]);
const result3 = addTwoNumbers(l1_3, l2_3);
console.log("\n测试用例3:");
console.log("输入: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]");
console.log("输出:", linkedListToArray(result3)); // 期望: [8,9,9,9,0,0,0,1]



/**
 * 解题思路（转数字 + BigInt 写法）：
 * 1. 遍历 l1、l2，用 unshift 把每位数字放进数组，得到逆序的数字序列（链表头是个位）
 * 2. 用 join("") 拼成字符串，再用 BigInt 转成整数（用 BigInt 避免大数精度/科学计数法问题）
 * 3. 两数相加后 toString().split("") 得到和的各位数字（字符串数组）
 * 4. 用 pop() 从个位到高位依次取出，尾插法建新链表，返回头节点
 *
 * 注意：思路简单但多了一次完整遍历和数组/字符串转换，时空不如「边遍历边按位+进位」的写法。
 */
function addTwoNumbers(l1, l2) {
  const arrL1 = [],
    arrL2 = [];

  while (l1 !== null) {
    arrL1.unshift(l1.val);
    l1 = l1.next;
  }

  while (l2 !== null) {
    arrL2.unshift(l2.val);
    l2 = l2.next;
  }

  const numersL1 = BigInt(arrL1.join(""));
  const numberL2 = BigInt(arrL2.join(""));

  const sumNodes = (numersL1 + numberL2).toString().split("");
  const l3 = new ListNode(0, null);
  let p3 = l3;

  while (sumNodes.length > 0) {
    p3.next = new ListNode(Number(sumNodes.pop()), null);
    p3 = p3.next;
  }

  return l3.next;
}
