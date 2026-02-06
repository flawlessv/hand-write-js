import { ListNode,CreateListNode } from "./type";

// 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
// https://leetcode.cn/problems/sort-list/description/?envType=study-plan-v2&envId=top-100-liked

// 示例 1：


// 输入：head = [4, 2, 1, 3]
// 输出：[1, 2, 3, 4]
// 示例 2：


// 输入：head = [-1, 5, 3, 4, 0]
// 输出：[-1, 0, 3, 4, 5]
// 示例 3：

// 输入：head = []
// 输出：[]


// 提示：
// 链表中节点的数目在范围[0, 5 * 104] 内
//     - 105 <= Node.val <= 105

function sortList(head: ListNode | null): ListNode | null {

    // 递归的结束条件是： 节点不存在 或者 单节点
    if(head === null || head.next === null) return head

    const dummy = new ListNode(0,head)


    // 先找到中点
    let slow:ListNode | null = dummy
    let fast:ListNode | null = dummy
    while(fast !== null && fast.next!==null ){
        fast = fast.next?.next
        slow = slow!.next
    }

    // 断链，注意： 因为用了虚拟头节点，此时slow next 是链表L2 的起点
    const l1 = dummy.next
    const l2 = slow!.next
    slow!.next = null

    // 递归排序
    const sortL1 = sortList(l1)
    const sortL2 = sortList(l2)

    return helpMergeList(sortL1,sortL2)
};



const helpMergeList = (l1:ListNode | null, l2:ListNode | null):ListNode | null => {
    const dummy = new ListNode(0,null)
    let p = dummy
    while(l1 !== null && l2 !== null){
        if(l1.val <= l2.val){
            p.next = l1
            l1 = l1.next
        }else{
            p.next = l2
            l2 = l2.next
        }
        p = p.next
    }
    p.next = l1 !== null ? l1 : l2
    return dummy.next
}
