// 24. 两两交换链表中的节点
// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

// 示例 1：
// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]

// 示例 2：
// 输入：head = []
// 输出：[]

// 示例 3：
// 输入：head = [1]
// 输出：[1]

// 解法详见blog：https://lyl0724.github.io/2020/01/25/1/
function swapPairs(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) return head

    const next = head.next
    head.next = swapPairs(next.next)
    next.next = head

    return next
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs2 = function(head) {
    // 1. 创建虚拟头结点（dummy），解决头结点也要交换的问题
    let dummy = new ListNode(0);
    dummy.next = head;

    // 2. prev 指针：始终指向【当前要交换的两个节点的前一个节点】
    let prev = dummy;

    // 3. 循环条件：后面必须有两个节点才需要交换
    while (prev.next !== null && prev.next.next !== null) {
        // 定义要交换的两个节点
        let first = prev.next;        // 第一个节点
        let second = prev.next.next;  // 第二个节点

        // ====================== 核心交换三步 ======================
        // 第一步：prev 直接指向 second，把 second 提到前面
        prev.next = second;

        // 第二步：first 指向 second 的下一个，防止链表断裂
        first.next = second.next;

        // 第三步：second 指向 first，完成两个节点交换
        second.next = first;
        // ==========================================================

        // 4. prev 移动到【下一组要交换的前一个节点】
        // 现在 first 已经是两个节点中靠后的那个
        prev = first;
    }

    // 5. 返回新链表的头结点
    return dummy.next;
};