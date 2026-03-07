/**
 * LeetCode 112. 路径总和
 * LeetCode: https://leetcode.cn/problems/path-sum/
 *
 * 题目描述：
 * 给定二叉树根节点 root 和 targetSum，判断是否存在从根到叶子的路径，使得路径上节点值之和等于 targetSum。
 *
 * 思路：
 * 判断是否存在从根到某一片叶子的路径，使得路径上节点值之和等于 targetSum。用递归“减而治之”：走到当前节点 root 时，还剩 targetSum - root.val 需要在后续路径上凑齐。
 * 递归含义：hasPathSum(root, targetSum) 表示“以 root 为根的树里，是否存在从 root 到某叶子的路径，路径和为 targetSum”。
 * 1. 若 root 为 null，没有路径，返回 false。
 * 2. 若 root 是叶子（左右子都为空），只需判断 root.val === targetSum。
 * 3. 否则，在左子树或右子树里找是否存在路径和为 targetSum - root.val；有一边存在即可，所以用 || 连接。
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(h)
 */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (root === null) return false;
  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }
  const next = targetSum - root.val;
  return hasPathSum(root.left, next) || hasPathSum(root.right, next);
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 路径总和测试 ===");

const tree: TreeNode = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11,
      left: { val: 7, left: null, right: null },
      right: { val: 2, left: null, right: null },
    },
    right: null,
  },
  right: {
    val: 8,
    left: { val: 13, left: null, right: null },
    right: {
      val: 4,
      left: null,
      right: { val: 1, left: null, right: null },
    },
  },
};

console.log(hasPathSum(tree, 22));
console.log(hasPathSum(tree, 26));
console.log(hasPathSum(null, 0));

export { hasPathSum };
