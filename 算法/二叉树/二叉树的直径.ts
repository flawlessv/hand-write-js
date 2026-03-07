/**
 * LeetCode 543. 二叉树的直径
 * LeetCode: https://leetcode.cn/problems/diameter-of-binary-tree/
 *
 * 题目描述：
 * 给定一棵二叉树，求其直径（任意两节点间最长路径的节点数减 1，即边数）。
 *
 * 思路：
 * 直径的定义：树上任意两节点之间最长路径的「边数」（或节点数减 1）。这条最长路径一定经过某个节点 A，且以 A 为“最高点”：即从 A 向左下走到某叶子、从 A 向右下走到某叶子，两段拼起来。所以直径 = 某个节点 A 的「左子树深度 + 右子树深度」的最大值（深度指从该节点到其子树内最远叶子的节点数）。
 * 做法：对每个节点做 DFS，递归返回「以该节点为根的子树深度」= 1 + max(左子树深度, 右子树深度)。在递归过程中，用「左深度 + 右深度」更新全局最大直径（不加上当前节点本身，因为直径是边数）。最后返回这个全局最大值即可。
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(h)
 */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0;

  function depth(node: TreeNode | null): number {
    if (node === null) return 0;
    const leftDepth = depth(node.left);
    const rightDepth = depth(node.right);
    maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
    return 1 + Math.max(leftDepth, rightDepth);
  }

  depth(root);
  return maxDiameter;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 二叉树的直径测试 ===");

const tree: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null },
  },
  right: { val: 3, left: null, right: null },
};

console.log(diameterOfBinaryTree(tree));

export { diameterOfBinaryTree };
