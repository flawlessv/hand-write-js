// 双指针法
function hasCycle<T>(head: ListNode<T> | null): boolean {
    // 空链表或只有一个节点且没有环的情况
    if (head === null || head.next === null) {
      return false;
    }
  
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
  
    while (fast !== null && fast.next !== null) {
      slow = slow!.next;       // 慢指针每次走一步
      fast = fast.next.next;   // 快指针每次走两步
  
      // 如果快慢指针相遇，说明有环
      if (slow === fast) {
        return true;
      }
    }
  
    // 快指针到达链表末尾，说明无环
    return false;
  }

// 哈希表法
  interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
  }
  function hasCycle2<T>(head: ListNode<T> | null): boolean {
    const visited = new Set<ListNode<T>>();
    let current = head;
  
    while (current !== null) {
      if (visited.has(current)) {
        return true;
      }
      visited.add(current);
      current = current.next;
    }
  
    return false;
  }