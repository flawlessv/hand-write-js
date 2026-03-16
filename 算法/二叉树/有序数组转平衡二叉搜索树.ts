// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。
// https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree

/**
 * 实现思路：
 * 1. 有序数组 = BST 的中序遍历结果，可从中还原 BST
 * 2. 为保持平衡，每次取中间元素作为根，使左右子树节点数接近
 * 3. 左半部分 → 左子树，右半部分 → 右子树，递归构建
 *
 * 步骤：
 * - 终止：nums 为空返回 null，长度为 1 返回单节点
 * - 取 mid = floor(length/2) 作为根
 * - root.left = 递归(nums[0..mid-1])
 * - root.right = 递归(nums[mid+1..end])
 * - 返回当前子树根节点
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
   constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val
    this.left = null
    this.right = null
   }
}

function sortedArrayToBST(nums: number[]): TreeNode | null {
    const traval = (nums: number[]) => {
        if (nums.length === 0) return null
        if (nums.length === 1) return new TreeNode(nums[0])
        const mid = Math.floor(nums.length / 2)
        const root = new TreeNode(nums[mid])
        root.left = traval(nums.slice(0, mid))
        root.right = traval(nums.slice(mid + 1, nums.length))
        return root
    }
    return traval(nums)
};