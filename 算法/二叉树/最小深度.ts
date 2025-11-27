/**
 * LeetCode 111. 二叉树的最小深度
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
function minDepth(root: TreeNode | null): number {
    if (root === null) return 0;
    
    // 【关键点】为什么不能直接用 Math.min，而要先判断哪边为空？
    // 
    // 因为最小深度必须到达"叶子节点"，而 null 不是叶子节点！
    // 
    // 错误示例（如果直接用 Math.min）：
    //     1
    //    / \
    //  null  2
    //       / \
    //      3   4
    // 
    // 如果用 Math.min(minDepth(null), minDepth(2)):
    //   - minDepth(null) = 0
    //   - minDepth(2) = 2（节点2到叶子节点3或4的深度）
    //   - Math.min(0, 2) = 0
    //   - 返回 1 + 0 = 1 ❌ 错误！节点1不是叶子节点，最小深度应该是3
    // 
    // 正确做法：如果一边是 null，必须走另一边（因为 null 不是叶子节点）
    //   - 如果左为空，只考虑右子树：1 + minDepth(2) = 1 + 2 = 3 ✓
    //   - 如果右为空，只考虑左子树：1 + minDepth(left)
    //   - 如果左右都不为空，才可以用 Math.min 取较小值
    
    // 如果左为空，只考虑右子树
    // 包括两种情况：
    //   1. 左右都为空：返回 1 + minDepth(null) = 1 + 0 = 1 ✓（当前节点是叶子节点）
    //   2. 只有右子树：返回 1 + minDepth(right) ✓（必须继续向下找叶子节点）
    if (root.left === null) return 1 + minDepth(root.right);
    
    // 如果右为空，只考虑左子树
    // 此时左子树一定不为空（否则上面已经返回了）
    // 必须继续向下找叶子节点
    if (root.right === null) return 1 + minDepth(root.left);
    
    // 左右都不为空，可以安全地取较小值
    // 因为两边都有子树，都可以到达叶子节点
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}