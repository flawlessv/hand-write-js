/**
 * LeetCode 226. 翻转二叉树
 * LeetCode: https://leetcode.cn/problems/invert-binary-tree/
 * 
 * 题目描述：
 * 给你一棵二叉树的根节点 root，翻转这棵二叉树，并返回其根节点。
 * 
 * 示例：
 * 输入：root = [4,2,7,1,3,6,9]
 *      4
 *    /   \
 *   2     7
 *  / \   / \
 * 1   3 6   9
 * 
 * 输出：[4,7,2,9,6,3,1]
 *      4
 *    /   \
 *   7     2
 *  / \   / \
 * 9   6 3   1
 * 
 * 解题思路：
 * 翻转二叉树就是将每个节点的左右子树进行交换。
 * 可以使用递归或迭代的方式来实现。
 * 
 * 方法一：递归（DFS）
 * - 对于每个节点，交换其左右子树
 * - 递归处理左右子树
 * 
 * 方法二：迭代（BFS）
 * - 使用队列层序遍历
 * - 对每个节点交换左右子树
 * 
 * 时间复杂度：O(n)，其中 n 是二叉树的节点数
 * 空间复杂度：O(h)，其中 h 是二叉树的高度
 */

// 二叉树节点定义
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// 方法一：递归实现（前序遍历）
function invertTree(root: TreeNode | null): TreeNode | null {
  // 基础情况：空节点直接返回
  if (root === null) return root;
  
  // 交换当前节点的左右子树
  const tempNode: TreeNode | null = root.left;
  root.left = root.right;
  root.right = tempNode;
  
  // 递归翻转左右子树
  invertTree(root.left);
  invertTree(root.right);
  
  return root;
}

// 方法二：递归实现（后序遍历）
function invertTreePostOrder(root: TreeNode | null): TreeNode | null {
  if (root === null) return root;
  
  // 先递归翻转左右子树
  const left = invertTreePostOrder(root.left);
  const right = invertTreePostOrder(root.right);
  
  // 再交换当前节点的左右子树
  root.left = right;
  root.right = left;
  
  return root;
}

// 方法三：迭代实现（使用栈 - DFS）
function invertTreeIterativeDFS(root: TreeNode | null): TreeNode | null {
  if (root === null) return root;
  
  // 使用栈进行深度优先遍历
  const stack: TreeNode[] = [root];
  
  while (stack.length > 0) {
    const node = stack.pop()!;
    
    // 交换当前节点的左右子树
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    
    // 将左右子节点加入栈中（如果存在）
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  
  return root;
}

// 方法四：迭代实现（使用队列 - BFS）
function invertTreeIterativeBFS(root: TreeNode | null): TreeNode | null {
  if (root === null) return root;
  
  // 使用队列进行广度优先遍历
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    
    // 交换当前节点的左右子树
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    
    // 将左右子节点加入队列中（如果存在）
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return root;
}

// 辅助函数：创建二叉树节点
function createTreeNode(val: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode {
  return { val, left, right };
}

// 辅助函数：前序遍历打印二叉树
function preorderTraversal(root: TreeNode | null): number[] {
  if (root === null) return [];
  
  const result: number[] = [];
  const stack: TreeNode[] = [root];
  
  while (stack.length > 0) {
    const node = stack.pop()!;
    result.push(node.val);
    
    // 注意：先压入右子树，再压入左子树，这样出栈时就是左子树先出
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  
  return result;
}

// 测试用例
console.log("=== 翻转二叉树测试 ===");

// 创建测试二叉树
//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
const testTree: TreeNode = createTreeNode(4,
  createTreeNode(2,
    createTreeNode(1),
    createTreeNode(3)
  ),
  createTreeNode(7,
    createTreeNode(6),
    createTreeNode(9)
  )
);

console.log("原始二叉树（前序遍历）:", preorderTraversal(testTree));

// 测试递归方法
const tree1 = JSON.parse(JSON.stringify(testTree)); // 深拷贝
invertTree(tree1);
console.log("递归翻转后（前序遍历）:", preorderTraversal(tree1));

// 测试迭代方法（DFS）
const tree2 = JSON.parse(JSON.stringify(testTree)); // 深拷贝
invertTreeIterativeDFS(tree2);
console.log("迭代DFS翻转后（前序遍历）:", preorderTraversal(tree2));

// 测试迭代方法（BFS）
const tree3 = JSON.parse(JSON.stringify(testTree)); // 深拷贝
invertTreeIterativeBFS(tree3);
console.log("迭代BFS翻转后（前序遍历）:", preorderTraversal(tree3));

// 测试空树
console.log("空树翻转结果:", invertTree(null));

// 测试单节点树
const singleNode = createTreeNode(1);
console.log("单节点树翻转前:", preorderTraversal(singleNode));
invertTree(singleNode);
console.log("单节点树翻转后:", preorderTraversal(singleNode));