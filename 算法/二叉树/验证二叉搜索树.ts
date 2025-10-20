/**
 * 验证二叉搜索树
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
 * 1. 对二叉树进行中序遍历，将结果存储在数组中
 * 2. 检查数组是否严格递增（每个元素都小于下一个元素）
 * 3. 如果严格递增则是有效的BST，否则不是
 * 
 * 时间复杂度：O(n) - 需要遍历所有节点
 * 空间复杂度：O(n) - 需要存储遍历结果数组
 */
function isValidBST(root: TreeNode | null): boolean {
    const traversalArr: number[] = [];
    
    // 中序遍历：左 -> 根 -> 右
    function inorderTraverse(root: TreeNode | null): void {
        if (root === null) return;
        
        // 先遍历左子树
        inorderTraverse(root.left);
        // 访问根节点
        traversalArr.push(root.val);
        // 再遍历右子树
        inorderTraverse(root.right);
    }
    
    // 执行中序遍历
    inorderTraverse(root);
    
    // 检查遍历结果是否严格递增
    for (let i = 0, length = traversalArr.length; i < length - 1; i++) {
        // 如果当前元素大于等于下一个元素，说明不是严格递增
        if (traversalArr[i] >= traversalArr[i + 1]) {
            return false;
        }
    }
    
    return true;
};