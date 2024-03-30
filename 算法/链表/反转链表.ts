// 双指针法
function reverseList(head: ListNode | null): ListNode | null {
  let preNode: ListNode | null = null,
    curNode: ListNode | null = head,
    tempNode: ListNode | null;
  while (curNode) {
    tempNode = curNode.next;
    curNode.next = preNode;
    preNode = curNode;
    curNode = tempNode;
  }
  return preNode;
}

