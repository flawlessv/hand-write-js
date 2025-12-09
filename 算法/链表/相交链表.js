/**
 * LeetCode 160. 相交链表
 * LeetCode: https://leetcode.cn/problems/intersection-of-two-linked-lists/
 * 
 * 题目描述：
 * 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。
 * 如果两个链表不存在相交节点，返回 null 。
 * 
 * 图示两个链表在节点 c1 开始相交：
 * 
 * 题目数据 保证 整个链式结构中不存在环。
 * 
 * 注意，函数返回结果后，链表必须 保持其原始结构 。
 * 
 * 示例 1：
 * 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
 * 输出：Intersected at '8'
 * 解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
 * 从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
 * 在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
 * 
 * 示例 2：
 * 输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
 * 输出：Intersected at '2'
 * 解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
 * 从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
 * 在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
 * 
 * 示例 3：
 * 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
 * 输出：null
 * 解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
 * 由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
 * 这两个链表不相交，因此返回 null 。
 * 
 * 提示：
 * - listA 中节点数目为 m
 * - listB 中节点数目为 n
 * - 1 <= m, n <= 3 * 10^4
 * - 1 <= Node.val <= 10^5
 * - 0 <= skipA <= m
 * - 0 <= skipB <= n
 * - 如果 listA 和 listB 没有交点，intersectVal 为 0
 * - 如果 listA 和 listB 有交点，intersectVal == listA[skipA] == listB[skipB]
 * 
 * 解题思路：
 * 方法一：双指针法（推荐）
 * - 使用两个指针分别从两个链表的头节点开始遍历
 * - 当一个指针到达链表末尾时，将其指向另一个链表的头节点
 * - 如果两个链表相交，两个指针最终会在相交节点相遇
 * - 如果两个链表不相交，两个指针最终都会指向 null
 * 
 * 方法二：哈希表法
 * - 遍历第一个链表，将所有节点存入哈希表
 * - 遍历第二个链表，检查节点是否在哈希表中
 * - 如果找到，返回该节点；否则返回 null
 * 
 * 时间复杂度：
 * - 方法一：O(m + n)，其中 m 和 n 分别是两个链表的长度
 * - 方法二：O(m + n)
 * 
 * 空间复杂度：
 * - 方法一：O(1)
 * - 方法二：O(m) 或 O(n)
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 方法一：双指针法（推荐）
 * 核心思想：两个指针分别遍历两个链表，当一个指针到达末尾时，将其指向另一个链表的头节点
 * 这样两个指针最终会在相交节点相遇，或者同时到达 null（不相交）
 * 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    
    let pA = headA;
    let pB = headB;
    
    // 当两个指针不相遇时继续遍历
    while (pA !== pB) {
        // 如果 pA 到达链表 A 的末尾，将其指向链表 B 的头节点
        pA = pA === null ? headB : pA.next;
        // 如果 pB 到达链表 B 的末尾，将其指向链表 A 的头节点
        pB = pB === null ? headA : pB.next;
    }
    
    // 返回相交节点（如果相交）或 null（如果不相交）
    return pA;
};

/**
 * 方法二：哈希表法
 * 核心思想：遍历第一个链表，将所有节点存入哈希表，然后遍历第二个链表查找
 * 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNodeHash = function(headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    
    // 使用 Set 存储链表 A 的所有节点
    const visited = new Set();
    let current = headA;
    
    // 遍历链表 A，将所有节点存入 Set
    while (current !== null) {
        visited.add(current);
        current = current.next;
    }
    
    // 遍历链表 B，查找是否有节点在 Set 中
    current = headB;
    while (current !== null) {
        if (visited.has(current)) {
            return current;  // 找到相交节点
        }
        current = current.next;
    }
    
    return null;  // 没有相交节点
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

// 辅助函数：创建相交链表（用于测试）
function createIntersectedLists(arrA, arrB, intersectVal) {
    // 创建链表 A
    const headA = createLinkedList(arrA);
    
    // 创建链表 B（不包含相交部分）
    const headB = createLinkedList(arrB);
    
    // 如果 intersectVal 为 0，说明不相交
    if (intersectVal === 0) {
        return { headA, headB };
    }
    
    // 找到链表 A 中值为 intersectVal 的节点
    let intersectNode = null;
    let current = headA;
    while (current !== null) {
        if (current.val === intersectVal) {
            intersectNode = current;
            break;
        }
        current = current.next;
    }
    
    // 将链表 B 的末尾连接到相交节点
    if (intersectNode !== null) {
        let tailB = headB;
        while (tailB.next !== null) {
            tailB = tailB.next;
        }
        tailB.next = intersectNode;
    }
    
    return { headA, headB };
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
console.log("=== 相交链表测试 ===");

// 测试用例1：相交节点值为 8
console.log("\n--- 测试1：相交节点值为 8 ---");
const { headA: listA1, headB: listB1 } = createIntersectedLists(
    [4, 1, 8, 4, 5],
    [5, 6, 1],
    8
);
const result1 = getIntersectionNode(listA1, listB1);
console.log("链表 A:", linkedListToArray(listA1));
console.log("链表 B:", linkedListToArray(listB1));
console.log("相交节点值:", result1 ? result1.val : null); // 期望: 8

// 测试用例2：相交节点值为 2
console.log("\n--- 测试2：相交节点值为 2 ---");
const { headA: listA2, headB: listB2 } = createIntersectedLists(
    [1, 9, 1, 2, 4],
    [3],
    2
);
const result2 = getIntersectionNode(listA2, listB2);
console.log("链表 A:", linkedListToArray(listA2));
console.log("链表 B:", linkedListToArray(listB2));
console.log("相交节点值:", result2 ? result2.val : null); // 期望: 2

// 测试用例3：不相交
console.log("\n--- 测试3：不相交 ---");
const { headA: listA3, headB: listB3 } = createIntersectedLists(
    [2, 6, 4],
    [1, 5],
    0
);
const result3 = getIntersectionNode(listA3, listB3);
console.log("链表 A:", linkedListToArray(listA3));
console.log("链表 B:", linkedListToArray(listB3));
console.log("相交节点值:", result3 ? result3.val : null); // 期望: null

// 测试用例4：一个链表为空
console.log("\n--- 测试4：一个链表为空 ---");
const listA4 = createLinkedList([1, 2, 3]);
const listB4 = null;
const result4 = getIntersectionNode(listA4, listB4);
console.log("相交节点值:", result4 ? result4.val : null); // 期望: null

// 测试用例5：两个链表都为空
console.log("\n--- 测试5：两个链表都为空 ---");
const result5 = getIntersectionNode(null, null);
console.log("相交节点值:", result5 ? result5.val : null); // 期望: null

// 测试哈希表法
console.log("\n=== 哈希表法测试 ===");
const { headA: listA6, headB: listB6 } = createIntersectedLists(
    [4, 1, 8, 4, 5],
    [5, 6, 1],
    8
);
const result6 = getIntersectionNodeHash(listA6, listB6);
console.log("相交节点值:", result6 ? result6.val : null); // 期望: 8

