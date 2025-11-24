/**
 * 二叉树的前中后序遍历（递归实现）
 * 
 * 前序遍历：根节点 -> 左子树 -> 右子树
 * 中序遍历：左子树 -> 根节点 -> 右子树
 * 后序遍历：左子树 -> 右子树 -> 根节点
 * 
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - h为树的高度，递归栈的深度
 */

// 二叉树节点的定义
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// 前序遍历
function preorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  function traverse(node: TreeNode | null) {
    if (node === null) return;
    result.push(node.val);      // 根
    traverse(node.left);         // 左
    traverse(node.right);        // 右
  }
  
  traverse(root);
  return result;
}

// 中序遍历
function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  function traverse(node: TreeNode | null) {
    if (node === null) return;
    traverse(node.left);         // 左
    result.push(node.val);       // 根
    traverse(node.right);        // 右
  }
  
  traverse(root);
  return result;
}

// 后序遍历
function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  function traverse(node: TreeNode | null) {
    if (node === null) return;
    traverse(node.left);         // 左
    traverse(node.right);         // 右
    result.push(node.val);       // 根
  }
  
  traverse(root);
  return result;
}

