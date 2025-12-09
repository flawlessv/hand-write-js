/**
 * LeetCode 23. 合并K个升序链表
 * LeetCode: https://leetcode.cn/problems/merge-k-sorted-lists/
 * 
 * 题目描述：
 * 给你一个链表数组，每个链表都已经按升序排列。
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 * 
 * 示例 1：
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
 * 输出：[1,1,2,3,4,4,5,6]
 * 解释：链表数组如下：
 * [
 *   1->4->5,
 *   1->3->4,
 *   2->6
 * ]
 * 将它们合并到一个有序链表中得到。
 * 1->1->2->3->4->4->5->6
 * 
 * 示例 2：
 * 输入：lists = []
 * 输出：[]
 * 
 * 示例 3：
 * 输入：lists = [[]]
 * 输出：[]
 * 
 * 提示：
 * - k == lists.length
 * - 0 <= k <= 10^4
 * - 0 <= lists[i].length <= 500
 * - -10^4 <= lists[i][j] <= 10^4
 * - lists[i] 按 升序 排列
 * - lists[i].length 的总和不超过 10^4
 * 
 * 解题思路：
 * 方法一：顺序合并 - 依次合并每个链表
 * 方法二：分治法 - 两两合并，类似归并排序
 * 方法三：优先队列（最小堆）- 维护一个最小堆，每次取出最小的节点
 * 
 * 时间复杂度：
 * - 方法一：O(k^2 * n)，其中 k 是链表数量，n 是平均链表长度
 * - 方法二：O(k * n * log k)
 * - 方法三：O(k * n * log k)
 * 
 * 空间复杂度：
 * - 方法一：O(1)
 * - 方法二：O(log k) - 递归栈
 * - 方法三：O(k) - 堆空间
 */

// 链表节点定义（力扣标准格式）
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 方法一：顺序合并
 * @param lists 
 * @returns 
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;
  
  let result: ListNode | null = lists[0];
  
  // 依次合并每个链表
  for (let i = 1; i < lists.length; i++) {
    result = mergeTwoLists(result, lists[i]);
  }
  
  return result;
}

/**
 * 辅助函数：合并两个有序链表
 */
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  const dummyHead = new ListNode(0);
  let current = dummyHead;
  
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
  
  current.next = list1 !== null ? list1 : list2;
  
  return dummyHead.next;
}

/**
 * 方法二：分治法（推荐）
 * @param lists 
 * @returns 
 */
function mergeKLists2(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];
  
  return mergeLists(lists, 0, lists.length - 1);
}

/**
 * 分治合并函数
 */
function mergeLists(
  lists: Array<ListNode | null>,
  left: number,
  right: number
): ListNode | null {
  // 基础情况：只有一个链表
  if (left === right) {
    return lists[left];
  }
  
  // 基础情况：两个链表，直接合并
  if (left + 1 === right) {
    return mergeTwoLists(lists[left], lists[right]);
  }
  
  // 分治：将链表数组分成两半
  const mid = Math.floor((left + right) / 2);
  const leftMerged = mergeLists(lists, left, mid);
  const rightMerged = mergeLists(lists, mid + 1, right);
  
  // 合并左右两部分
  return mergeTwoLists(leftMerged, rightMerged);
}

/**
 * 方法三：优先队列（最小堆）
 * @param lists 
 * @returns 
 */
function mergeKLists3(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;
  
  // 过滤掉空链表
  const validLists = lists.filter(list => list !== null);
  if (validLists.length === 0) return null;
  
  // 创建最小堆
  const heap: ListNode[] = [];
  
  // 堆操作：上浮
  function heapifyUp(index: number) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (heap[parent].val <= heap[index].val) break;
      [heap[parent], heap[index]] = [heap[index], heap[parent]];
      index = parent;
    }
  }
  
  // 堆操作：下沉
  function heapifyDown(index: number) {
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      
      if (left < heap.length && heap[left].val < heap[smallest].val) {
        smallest = left;
      }
      if (right < heap.length && heap[right].val < heap[smallest].val) {
        smallest = right;
      }
      
      if (smallest === index) break;
      [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
      index = smallest;
    }
  }
  
  // 插入堆
  function push(node: ListNode) {
    heap.push(node);
    heapifyUp(heap.length - 1);
  }
  
  // 弹出堆顶
  function pop(): ListNode | null {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop() || null;
    
    const top = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    heapifyDown(0);
    return top;
  }
  
  // 初始化堆：将每个链表的头节点加入堆
  for (const list of validLists) {
    if (list !== null) {
      push(list);
    }
  }
  
  const dummyHead = new ListNode(0);
  let current = dummyHead;
  
  // 不断从堆中取出最小节点，并将其下一个节点加入堆
  while (heap.length > 0) {
    const minNode = pop();
    if (minNode === null) break;
    
    current.next = minNode;
    current = current.next;
    
    // 如果该节点还有下一个节点，将其加入堆
    if (minNode.next !== null) {
      push(minNode.next);
    }
  }
  
  return dummyHead.next;
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

// 测试用例
console.log("=== 合并K个升序链表测试 ===");

// 测试用例1：正常情况
console.log("\n--- 测试1：正常情况 ---");
const lists1 = [
  createLinkedList([1, 4, 5]),
  createLinkedList([1, 3, 4]),
  createLinkedList([2, 6])
];
console.log("输入: [[1,4,5],[1,3,4],[2,6]]");

const result1_1 = mergeKLists(lists1.map(list => {
  if (list === null) return null;
  return JSON.parse(JSON.stringify(list));
}));
console.log("方法一（顺序合并）:", linkedListToArray(result1_1));

const result1_2 = mergeKLists2(lists1.map(list => {
  if (list === null) return null;
  return JSON.parse(JSON.stringify(list));
}));
console.log("方法二（分治法）:", linkedListToArray(result1_2));

const result1_3 = mergeKLists3(lists1.map(list => {
  if (list === null) return null;
  return JSON.parse(JSON.stringify(list));
}));
console.log("方法三（优先队列）:", linkedListToArray(result1_3));

// 测试用例2：空数组
console.log("\n--- 测试2：空数组 ---");
const lists2: Array<ListNode | null> = [];
console.log("输入: []");
console.log("方法一:", linkedListToArray(mergeKLists(lists2)));
console.log("方法二:", linkedListToArray(mergeKLists2(lists2)));
console.log("方法三:", linkedListToArray(mergeKLists3(lists2)));

// 测试用例3：包含空链表
console.log("\n--- 测试3：包含空链表 ---");
const lists3 = [
  createLinkedList([]),
  createLinkedList([1, 3, 4]),
  createLinkedList([2, 6])
];
console.log("输入: [[],[1,3,4],[2,6]]");
console.log("方法一:", linkedListToArray(mergeKLists(lists3.map(list => {
  if (list === null) return null;
  return JSON.parse(JSON.stringify(list));
}))));
console.log("方法二:", linkedListToArray(mergeKLists2(lists3.map(list => {
  if (list === null) return null;
  return JSON.parse(JSON.stringify(list));
}))));
console.log("方法三:", linkedListToArray(mergeKLists3(lists3.map(list => {
  if (list === null) return null;
  return JSON.parse(JSON.stringify(list));
}))));

// 测试用例4：单个链表
console.log("\n--- 测试4：单个链表 ---");
const lists4 = [createLinkedList([1, 2, 3])];
console.log("输入: [[1,2,3]]");
console.log("方法一:", linkedListToArray(mergeKLists(lists4.map(list => {
  if (list === null) return null;
  return JSON.parse(JSON.stringify(list));
}))));
console.log("方法二:", linkedListToArray(mergeKLists2(lists4.map(list => {
  if (list === null) return null;
  return JSON.parse(JSON.stringify(list));
}))));
console.log("方法三:", linkedListToArray(mergeKLists3(lists4.map(list => {
  if (list === null) return null;
  return JSON.parse(JSON.stringify(list));
}))));

export {};
