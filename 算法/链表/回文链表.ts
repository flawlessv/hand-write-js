interface ListNode {
    val: number;
    next: ListNode | null;
}

/**
 * https://leetcode.cn/problems/palindrome-linked-list/?envType=problem-list-v2&envId=2cktkvj
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 * 思路，使用一个数组，将链表中的节点值存储到数组中，
 * 使用双指针，从数组的两端向中间遍历，如果节点值不相等，则返回 false，否则返回 true。
 */

const isPalindrome = (header:ListNode| null) => {
    if(!header) return false
    let cur:ListNode | null = header
    const nodes:ListNode[] | null = []
    while(cur){
        nodes.push(cur)
        cur = cur.next
    }
    const size = nodes.length
    for(let i =0;i<size;i++){
        if(nodes[i].val != nodes[size-i].val) return false
    }
    return true
}
