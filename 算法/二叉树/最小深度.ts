function minDepth(root: TreeNode | null): number {
    if (root === null) return 0;
    if (root.left !== null && root.right === null) {
        return 1 + minDepth(root.left);
    }
    if (root.left === null && root.right !== null) {
        return 1 + minDepth(root.right);
    }
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}