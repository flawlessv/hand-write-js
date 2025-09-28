/**
 * LeetCode 104. 二叉树的最大深度
 * 
 * 题目描述：
 * 给定一个二叉树，找出其最大深度。
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * 
 * 说明：叶子节点是指没有子节点的节点。
 * 
 * 示例：
 * 给定二叉树 [3,9,20,null,null,15,7]，
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 返回它的最大深度 3。
 * 
 * 解题思路：
 * 1. 递归方法：树的最大深度 = 1 + max(左子树深度, 右子树深度)
 * 2. 迭代方法：使用层序遍历（BFS），统计层数
 * 
 * 时间复杂度：O(n)，其中 n 是二叉树的节点数
 * 空间复杂度：O(h)，其中 h 是二叉树的高度（递归栈的深度）
 */

// 二叉树节点的定义
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// 方法一：递归解法（深度优先搜索 DFS）
function maxDepth(root: TreeNode | null): number {
  // 基础情况：如果节点为空，深度为 0
  if (root === null) return 0;
  
  // 递归计算左子树和右子树的最大深度
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  
  // 当前节点的深度 = 1 + 左右子树的最大深度
  return 1 + Math.max(leftDepth, rightDepth);
}

// 方法二：迭代解法（广度优先搜索 BFS）
function maxDepthIterative(root: TreeNode | null): number {
  if (root === null) return 0;
  
  // 使用队列进行层序遍历
  const queue: TreeNode[] = [root];
  let depth = 0;
  
  while (queue.length > 0) {
    const levelSize = queue.length; // 当前层的节点数
    depth++; // 进入新的一层
    
    // 处理当前层的所有节点
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      
      // 将下一层的节点加入队列
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  
  return depth;
}

// 测试用例
console.log("=== 二叉树最大深度测试 ===");

// 创建测试二叉树
//     3
//    / \
//   9  20
//     /  \
//    15   7
const testTree: TreeNode = {
  val: 3,
  left: {
    val: 9,
    left: null,
    right: null
  },
  right: {
    val: 20,
    left: {
      val: 15,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right: null
    }
  }
};

console.log("递归方法结果:", maxDepth(testTree)); // 3
console.log("迭代方法结果:", maxDepthIterative(testTree)); // 3

// 测试空树
console.log("空树深度:", maxDepth(null)); // 0

// 测试单节点树
const singleNode: TreeNode = {
  val: 1,
  left: null,
  right: null
};
console.log("单节点树深度:", maxDepth(singleNode)); // 1