class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let newHead = new ListNode(0, head);
  let cur = newHead;
  let pre = newHead;
  while (n--) {
    cur = cur.next!;
  }
  while (cur.next) {
    pre = pre.next!;
    cur = cur.next;
  }
  pre.next = pre.next!.next;
  return newHead.next;
}
