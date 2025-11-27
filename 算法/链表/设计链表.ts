/**
 * LeetCode 707. 设计链表
 * LeetCode: https://leetcode.cn/problems/design-linked-list/
 * 
 * 题目描述：
 * 设计链表的实现。您可以选择使用单链表或双链表。
 * 单链表中的节点应该具有两个属性：val 和 next。
 * 双链表中的节点应该具有三个属性：val、next 和 prev。
 * 
 * 需要实现以下功能：
 * - get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回 -1。
 * - addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
 * - addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
 * - addAtIndex(index, val)：在链表中的第 index 个节点之前添加值为 val 的节点。
 * - deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
 * 
 * 示例：
 * 输入：["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"]
 *       [[],[1],[3],[1,2],[1],[1],[1]]
 * 输出：[null,null,null,null,2,null,3]
 * 
 * 解题思路：
 * 使用单链表实现，维护头节点、尾节点和链表长度
 * - 虚拟头节点可以简化插入和删除操作
 * - 需要特别注意边界条件的处理
 * - 维护尾节点可以提高尾部插入的效率
 * 
 * 时间复杂度：
 * - get: O(n)
 * - addAtHead: O(1)
 * - addAtTail: O(1) - 因为有尾节点指针
 * - addAtIndex: O(n)
 * - deleteAtIndex: O(n)
 * 
 * 空间复杂度：O(1) - 不包含存储节点所需的空间
 */

// 链表节点定义
class ListNode {
  public val: number;
  public next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

class MyLinkedList {
  // 记录链表长度
  private size: number;
  private head: ListNode | null;
  private tail: ListNode | null;

  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  /**
   * 获取链表中第 index 个节点的值
   * 如果索引无效，则返回 -1
   */
  get(index: number): number {
    // 索引无效的情况
    if (index < 0 || index >= this.size) {
      return -1;
    }
    let curNode = this.getNode(index);
    // 这里在前置条件下，理论上不会出现 null的情况
    return curNode.val;
  }

  /**
   * 在链表的第一个元素之前添加一个值为 val 的节点
   * 插入后，新节点将成为链表的第一个节点
   */
  addAtHead(val: number): void {
    let node: ListNode = new ListNode(val, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
  }

  /**
   * 将值为 val 的节点追加到链表的最后一个元素
   */
  addAtTail(val: number): void {
    let node: ListNode = new ListNode(val, null);
    if (this.tail) {
      this.tail.next = node;
    } else {
      // 还没有尾节点，说明一个节点都还没有
      this.head = node;
    }
    this.tail = node;
    this.size++;
  }

  /**
   * 在链表中的第 index 个节点之前添加值为 val 的节点
   * 如果 index 等于链表的长度，则该节点将附加到链表的末尾
   * 如果 index 大于链表长度，则不会插入节点
   * 如果 index 小于0，则在头部插入节点
   */
  addAtIndex(index: number, val: number): void {
    if (index === this.size) {
      this.addAtTail(val);
      return;
    }
    if (index > this.size) {
      return;
    }
    // <= 0 的情况都是在头部插入
    if (index <= 0) {
      this.addAtHead(val);
      return;
    }
    // 正常情况
    // 获取插入位置的前一个 node
    let curNode = this.getNode(index - 1);
    let node: ListNode = new ListNode(val, curNode.next);
    curNode.next = node;
    this.size++;
  }

  /**
   * 如果索引 index 有效，则删除链表中的第 index 个节点
   */
  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      return;
    }
    // 处理头节点
    if (index === 0) {
      this.head = this.head!.next;
      // 如果链表中只有一个元素，删除头节点后，需要处理尾节点
      if (index === this.size - 1) {
        this.tail = null
      }
      this.size--;
      return;
    }
    // 索引有效
    let curNode: ListNode = this.getNode(index - 1);
    curNode.next = curNode.next!.next;
    // 处理尾节点
    if (index === this.size - 1) {
      this.tail = curNode;
    }
    this.size--;
  }

  /**
   * 获取指定 Node 节点（私有方法）
   * 这里不存在没办法获取到节点的情况，都已经在前置方法做过判断
   */
  private getNode(index: number): ListNode {
    // 创建虚拟头节点
    let curNode: ListNode = new ListNode(0, this.head);
    for (let i = 0; i <= index; i++) {
      // 理论上不会出现 null
      curNode = curNode.next!;
    }
    return curNode;
  }

  /**
   * 辅助方法：将链表转换为数组（用于打印）
   */
  private toArray(): number[] {
    const result: number[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }

  /**
   * 辅助方法：打印链表
   */
  private print(name: string): void {
    console.log(`${name}:`, this.toArray(), `size=${this.size}`);
  }
}

// 测试用例
console.log("=== 设计链表测试 ===");

// 测试用例1：基本操作
console.log("\n--- 测试1：基本操作 ---");
const list1 = new MyLinkedList();
list1.print("空链表");

list1.addAtHead(1);
list1.print("头部添加1");

list1.addAtTail(3);
list1.print("尾部添加3");

list1.addAtIndex(1, 2);
list1.print("索引1处添加2");

console.log("获取索引1的值:", list1.get(1)); // 2

list1.deleteAtIndex(1);
list1.print("删除索引1");

console.log("获取索引1的值:", list1.get(1)); // 3

// 测试用例2：边界条件
console.log("\n--- 测试2：边界条件 ---");
const list2 = new MyLinkedList();

// 在空链表中删除
list2.deleteAtIndex(0);
list2.print("空链表删除索引0");

// 在空链表中获取
console.log("空链表获取索引0:", list2.get(0)); // -1

// 在头部插入
list2.addAtHead(1);
list2.print("头部插入1");

// 在尾部插入
list2.addAtTail(2);
list2.print("尾部插入2");

// 在无效索引处插入
list2.addAtIndex(5, 3);
list2.print("在索引5处插入3（无效）");

// 在负索引处插入
list2.addAtIndex(-1, 0);
list2.print("在索引-1处插入0（应在头部）");

// 测试用例3：复杂操作
console.log("\n--- 测试3：复杂操作 ---");
const list3 = new MyLinkedList();

// 构建链表: 1 -> 2 -> 3 -> 4 -> 5
for (let i = 1; i <= 5; i++) {
  list3.addAtTail(i);
}
list3.print("构建链表1-5");

// 删除头节点
list3.deleteAtIndex(0);
list3.print("删除头节点");

// 删除尾节点
list3.deleteAtIndex(list3.get(list3.size - 1));
list3.print("删除尾节点");

// 在中间插入
list3.addAtIndex(2, 10);
list3.print("在索引2处插入10");

export {};