/**
 * LeetCode 83. 删除排序链表中的重复元素
 * LeetCode: https://leetcode.cn/problems/remove-duplicates-from-sorted-list/
 * 
 * 题目描述：
 * 
 * 给定一个已排序的链表的头 head，删除所有重复的元素，使每个元素只出现一次。返回已排序的链表。
 * 
 * 
 * 示例 1：
 * 输入：head = [1,1,2]
 * 输出：[1,2]
 * 
 * 
 * 示例 2：
 * 输入：head = [1,1,2,3,3]
 * 输出：[1,2,3]
 * 
 * 
 * 提示：
 * - 链表中节点数目在范围 [0, 300] 内
 * - -100 <= Node.val <= 100
 * - 题目数据保证链表已经按升序排列
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// ========== 你的解法 ==========
var deleteDuplicates = function(head) {
    if(!head || !head.next) return head
    let pre= head
    let res= pre  // ⚠️ 可以优化：res 变量是多余的，可以直接返回 head
    let cur = head.next
    while(cur){
      if(pre.val===cur.val){
        pre.next=cur.next
      }else{
        pre=pre.next
      }
      cur=cur.next
    }
    return res
};

// ========== 优化建议 ==========
/*
你的解法分析：
✅ 优点：
1. 逻辑正确，能够正确处理所有情况
2. 使用双指针思路清晰
3. 边界条件处理得当

⚠️ 可以优化的地方：
1. res 变量是多余的，因为 pre 从 head 开始，可以直接返回 head
2. 可以简化代码，使用单个指针更简洁
3. 变量命名可以更清晰（pre 可以改为 current）

时间复杂度：O(n) - 遍历一次链表
空间复杂度：O(1) - 只使用了常数额外空间
*/

// ========== 优化版本1：简化变量 ==========
var deleteDuplicatesOptimized1 = function(head) {
    if(!head || !head.next) return head;
    
    let current = head;  // 当前节点
    
    while(current.next) {
        // 如果当前节点和下一个节点值相同，跳过下一个节点
        if(current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            // 否则移动到下一个节点
            current = current.next;
        }
    }
    
    return head;  // 直接返回 head，不需要额外的 res 变量
};

// ========== 优化版本2：更简洁的写法（推荐） ==========
/**
 * 核心思想：使用单个指针遍历链表
 * - 如果当前节点和下一个节点值相同，删除下一个节点
 * - 否则移动到下一个节点
 * 
 * 时间复杂度：O(n) - 遍历一次链表
 * 空间复杂度：O(1) - 只使用了常数额外空间
 */
var deleteDuplicatesOptimized2 = function(head) {
    let current = head;
    
    // 遍历链表
    while(current && current.next) {
        if(current.val === current.next.val) {
            // 删除重复节点
            current.next = current.next.next;
        } else {
            // 移动到下一个节点
            current = current.next;
        }
    }
    
    return head;
};

// ========== 递归版本（另一种思路） ==========
var deleteDuplicatesRecursive = function(head) {
    // 基础情况：空链表或只有一个节点
    if(!head || !head.next) return head;
    
    // 递归处理后面的链表
    head.next = deleteDuplicatesRecursive(head.next);
    
    // 如果当前节点和下一个节点值相同，返回下一个节点（跳过当前节点）
    // 否则返回当前节点
    return head.val === head.next.val ? head.next : head;
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

// ========== 测试用例 ==========
console.log("=== 删除排序链表中的重复元素测试 ===");

// 测试用例1
console.log("测试用例1:");
const list1 = createLinkedList([1,1,2]);
console.log("输入:", [1,1,2]);
console.log("你的解法:", linkedListToArray(deleteDuplicates(createLinkedList([1,1,2])))); // 期望: [1,2]
console.log("优化版本1:", linkedListToArray(deleteDuplicatesOptimized1(createLinkedList([1,1,2])))); // 期望: [1,2]
console.log("优化版本2:", linkedListToArray(deleteDuplicatesOptimized2(createLinkedList([1,1,2])))); // 期望: [1,2]
console.log("递归版本:", linkedListToArray(deleteDuplicatesRecursive(createLinkedList([1,1,2])))); // 期望: [1,2]

// 测试用例2
console.log("\n测试用例2:");
const list2 = createLinkedList([1,1,2,3,3]);
console.log("输入:", [1,1,2,3,3]);
console.log("你的解法:", linkedListToArray(deleteDuplicates(createLinkedList([1,1,2,3,3])))); // 期望: [1,2,3]
console.log("优化版本1:", linkedListToArray(deleteDuplicatesOptimized1(createLinkedList([1,1,2,3,3])))); // 期望: [1,2,3]
console.log("优化版本2:", linkedListToArray(deleteDuplicatesOptimized2(createLinkedList([1,1,2,3,3])))); // 期望: [1,2,3]
console.log("递归版本:", linkedListToArray(deleteDuplicatesRecursive(createLinkedList([1,1,2,3,3])))); // 期望: [1,2,3]

// 测试用例3
console.log("\n测试用例3:");
const list3 = createLinkedList([1,1,1]);
console.log("输入:", [1,1,1]);
console.log("你的解法:", linkedListToArray(deleteDuplicates(createLinkedList([1,1,1])))); // 期望: [1]
console.log("优化版本1:", linkedListToArray(deleteDuplicatesOptimized1(createLinkedList([1,1,1])))); // 期望: [1]
console.log("优化版本2:", linkedListToArray(deleteDuplicatesOptimized2(createLinkedList([1,1,1])))); // 期望: [1]
console.log("递归版本:", linkedListToArray(deleteDuplicatesRecursive(createLinkedList([1,1,1])))); // 期望: [1]

// 测试用例4
console.log("\n测试用例4:");
const list4 = createLinkedList([1]);
console.log("输入:", [1]);
console.log("你的解法:", linkedListToArray(deleteDuplicates(createLinkedList([1])))); // 期望: [1]
console.log("优化版本1:", linkedListToArray(deleteDuplicatesOptimized1(createLinkedList([1])))); // 期望: [1]
console.log("优化版本2:", linkedListToArray(deleteDuplicatesOptimized2(createLinkedList([1])))); // 期望: [1]
console.log("递归版本:", linkedListToArray(deleteDuplicatesRecursive(createLinkedList([1])))); // 期望: [1]

// 测试用例5
console.log("\n测试用例5:");
const list5 = createLinkedList([]);
console.log("输入:", []);
console.log("你的解法:", linkedListToArray(deleteDuplicates(createLinkedList([])))); // 期望: []
console.log("优化版本1:", linkedListToArray(deleteDuplicatesOptimized1(createLinkedList([])))); // 期望: []
console.log("优化版本2:", linkedListToArray(deleteDuplicatesOptimized2(createLinkedList([])))); // 期望: []
console.log("递归版本:", linkedListToArray(deleteDuplicatesRecursive(createLinkedList([])))); // 期望: []

console.log("\n=== 优化总结 ===");
console.log("你的解法：逻辑正确，但可以简化");
console.log("优化版本1：去掉多余的 res 变量，代码更简洁");
console.log("优化版本2（推荐）：使用单个指针，代码最简洁");
console.log("递归版本：另一种思路，但空间复杂度 O(n)");

