/**
 * 二叉树的最小深度
 * LeetCode: https://leetcode.cn/problems/minimum-depth-of-binary-tree/
 * 
 * 题目描述：
 * 给定一个二叉树，找出其最小深度。
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * 
 * 解题思路：
 * 1. 如果根节点为空，返回0
 * 2. 如果只有左子树，返回左子树的最小深度+1
 * 3. 如果只有右子树，返回右子树的最小深度+1
 * 4. 如果左右子树都存在，返回两者最小深度的较小值+1
 * 
 * 注意：最小深度必须到达叶子节点，所以单子树的情况需要特殊处理
 * 
 * 时间复杂度：O(n) - 需要遍历所有节点
 * 空间复杂度：O(h) - h为树的高度，递归栈的深度
 */
//TODO: 这里能不能像最大深度那种解法搞的简单一点呢
function minDepth(root: TreeNode | null): number {
    // 空树的深度为0
    if (root === null) return 0;
    
    // 只有左子树的情况：必须继续向下找到叶子节点
    if (root.left !== null && root.right === null) {
        return 1 + minDepth(root.left);
    }
    
    // 只有右子树的情况：必须继续向下找到叶子节点
    if (root.left === null && root.right !== null) {
        return 1 + minDepth(root.right);
    }
    
    // 左右子树都存在：取较小的深度
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}