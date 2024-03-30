function rob(root: TreeNode | null): number {
    return Math.max(...robNode(root));
};
// [0]-不偷当前节点能获得的最大金额; [1]-偷~~
type MaxValueArr = [number, number];
function robNode(node: TreeNode | null): MaxValueArr {
    if (node === null) return [0, 0];
    const leftArr: MaxValueArr = robNode(node.left);
    const rightArr: MaxValueArr = robNode(node.right);
    // 不偷
    const val1: number = Math.max(leftArr[0], leftArr[1]) +
        Math.max(rightArr[0], rightArr[1]);
    // 偷
    const val2: number = leftArr[0] + rightArr[0] + node.val;
    return [val1, val2];
}