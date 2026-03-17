/**
 * LeetCode 98. 验证二叉搜索树
 * LeetCode: https://leetcode.cn/problems/validate-binary-search-tree/
 * 
 * 题目描述：
 * 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
 * 
 * 有效二叉搜索树定义：
 * - 节点的左子树只包含小于当前节点的数
 * - 节点的右子树只包含大于当前节点的数  
 * - 所有左子树和右子树自身必须也是二叉搜索树
 * 
 * 解题思路：
 * 利用二叉搜索树的性质：中序遍历的结果应该是严格递增的
 * 1. 中序遍历二叉树（左 -> 根 -> 右）
 * 2. 维护一个前驱值 prev，当前值必须严格大于 prev
 * 3. 若出现当前值 <= prev，则不是有效BST
 * 
 * 时间复杂度：O(n) - 需要遍历所有节点
 * 空间复杂度：O(h) - 递归栈深度，h为树高
 */
function isValidBST(root: TreeNode | null): boolean {
    let prev = -Infinity;
    // 中序遍历：左 -> 根 -> 右
    function inorderTraverse(node: TreeNode | null): boolean {
        if (node === null) return true;

        // 先遍历左子树
        if (!inorderTraverse(node.left)) return false;
        // 访问根节点并校验严格递增
        if (node.val <= prev) return false;
        prev = node.val;
        // 再遍历右子树
        return inorderTraverse(node.right);
    }

    return inorderTraverse(root);
};


// 方法二：上下界约束（递归传递 min/max，O(n) 时间 O(h) 空间）
function isValidBSTByBounds(root: TreeNode | null): boolean {
  const help = (node: TreeNode | null, min: number, max: number): boolean => {
    if (!node) return true
    if (node.val <= min || node.val >= max) return false
    return help(node.left, min, node.val) && help(node.right, node.val, max)
  }
  return help(root, -Infinity, Infinity)
}
