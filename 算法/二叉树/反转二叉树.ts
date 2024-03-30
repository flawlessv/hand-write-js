// 递归法（前序遍历）
function invertTree(root: TreeNode | null): TreeNode | null {
    if (root === null) return root;
    let tempNode: TreeNode | null = root.left;
    root.left = root.right;
    root.right = tempNode;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};