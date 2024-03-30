function isValidBST(root: TreeNode | null): boolean {
    const traversalArr: number[] = [];
    function inorderTraverse(root: TreeNode | null): void {
        if (root === null) return;
        inorderTraverse(root.left);
        traversalArr.push(root.val);
        inorderTraverse(root.right);
    }
    inorderTraverse(root);
    for (let i = 0, length = traversalArr.length; i < length - 1; i++) {
        if (traversalArr[i] >= traversalArr[i + 1]) return false;
    }
    return true;
};