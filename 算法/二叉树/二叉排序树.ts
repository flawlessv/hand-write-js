/**
 * 二叉搜索树 (Binary Search Tree) 的完整实现
 * 
 * 二叉搜索树的特性：
 * 1. 对于任意节点，其左子树中所有节点的值都小于该节点的值
 * 2. 对于任意节点，其右子树中所有节点的值都大于该节点的值
 * 3. 左右子树也都是二叉搜索树
 * 4. 中序遍历BST会得到有序序列
 * 
 * 主要操作的时间复杂度：
 * - 插入：平均 O(log n)，最坏 O(n)
 * - 查找：平均 O(log n)，最坏 O(n)
 * - 遍历：O(n)
 */

/**
 * 二叉树节点类
 * 使用泛型支持任意可比较的数据类型
 */
class TreeNode<T> {
    value: T;                    // 节点存储的值
    left: TreeNode<T> | null;    // 左子节点
    right: TreeNode<T> | null;   // 右子节点
  
    constructor(value: T) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
}
  
/**
 * 二叉搜索树类
 * 提供插入、查找、遍历等基本操作
 */
class BinarySearchTree<T> {
    root: TreeNode<T> | null;    // 根节点
  
    constructor() {
      this.root = null;
    }
  
    /**
     * 插入新节点
     * @param value 要插入的值
     */
    insert(value: T): void {
      const newNode = new TreeNode(value);
  
      // 如果树为空，新节点成为根节点
      if (this.root === null) {
        this.root = newNode;
      } else {
        // 否则从根节点开始递归插入
        this.insertNode(this.root, newNode);
      }
    }
  
    /**
     * 递归插入节点的辅助方法
     * @param node 当前比较的节点
     * @param newNode 要插入的新节点
     */
    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
      // 如果新节点值小于当前节点值，插入到左子树
      if (newNode.value < node.value) {
        if (node.left === null) {
          // 左子树为空，直接插入
          node.left = newNode;
        } else {
          // 左子树不为空，递归插入
          this.insertNode(node.left, newNode);
        }
      } else {
        // 如果新节点值大于等于当前节点值，插入到右子树
        if (node.right === null) {
          // 右子树为空，直接插入
          node.right = newNode;
        } else {
          // 右子树不为空，递归插入
          this.insertNode(node.right, newNode);
        }
      }
    }
  
    /**
     * 查找指定值是否存在于树中
     * @param value 要查找的值
     * @returns 是否找到该值
     */
    search(value: T): boolean {
      return this.searchNode(this.root, value);
    }
  
    /**
     * 递归查找的辅助方法
     * @param node 当前搜索的节点
     * @param value 要查找的值
     * @returns 是否找到该值
     */
    private searchNode(node: TreeNode<T> | null, value: T): boolean {
      // 如果节点为空，说明没找到
      if (node === null) {
        return false;
      }
  
      // 如果找到目标值
      if (value === node.value) {
        return true;
      }
  
      // 根据BST性质决定搜索方向
      if (value < node.value) {
        // 目标值小于当前节点，搜索左子树
        return this.searchNode(node.left, value);
      } else {
        // 目标值大于当前节点，搜索右子树
        return this.searchNode(node.right, value);
      }
    }
  
    /**
     * 中序遍历：返回有序的节点值数组
     * 对BST进行中序遍历会得到升序排列的结果
     * @returns 有序的节点值数组
     */
    inOrderTraversal(): T[] {
      const result: T[] = [];
      this.inOrderTraversalNode(this.root, result);
      return result;
    }
  
    /**
     * 中序遍历的递归辅助方法
     * 遍历顺序：左子树 -> 根节点 -> 右子树
     * @param node 当前遍历的节点
     * @param result 存储遍历结果的数组
     */
    private inOrderTraversalNode(node: TreeNode<T> | null, result: T[]): void {
      if (node !== null) {
        // 先遍历左子树
        this.inOrderTraversalNode(node.left, result);
        // 访问根节点
        result.push(node.value);
        // 再遍历右子树
        this.inOrderTraversalNode(node.right, result);
      }
    }
}
/**
 * 使用示例和测试
 * 演示二叉搜索树的基本操作
 */

// 创建一个存储数字的二叉搜索树
const bst = new BinarySearchTree<number>();

// 插入节点 - 构建如下的BST结构：
//       8
//      / \
//     3   10
//    / \    \
//   1   6   14
//      / \   /
//     4   7 13
bst.insert(8);   // 根节点
bst.insert(3);   // 左子树
bst.insert(10);  // 右子树
bst.insert(1);   // 3的左子节点
bst.insert(6);   // 3的右子节点
bst.insert(14);  // 10的右子节点
bst.insert(4);   // 6的左子节点
bst.insert(7);   // 6的右子节点
bst.insert(13);  // 14的左子节点

// 中序遍历：应该输出有序序列
console.log('中序遍历结果（有序）:', bst.inOrderTraversal()); 
// Output: [1, 3, 4, 6, 7, 8, 10, 13, 14]

// 搜索测试
console.log('查找6:', bst.search(6));  // Output: true
console.log('查找9:', bst.search(9));  // Output: false
console.log('查找1:', bst.search(1));  // Output: true
console.log('查找15:', bst.search(15)); // Output: false