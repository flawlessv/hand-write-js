/**
 * LeetCode 101. 对称二叉树
 * LeetCode: https://leetcode.cn/problems/symmetric-tree/
 * 
 * 题目描述：
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * 
 * 示例 1：
 * 输入：root = [1,2,2,3,4,4,3]
 * 输出：true
 * 
 * 示例 2：
 * 输入：root = [1,2,2,null,3,null,3]
 * 输出：false
 * 
 * 提示：
 * - 树中节点数目在范围 [1, 1000] 内
 * - -100 <= Node.val <= 100
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 * 
 * 解题思路：
 * 方法一：递归法
 * - 定义一个辅助函数，比较两个节点是否镜像对称
 * - 对于对称二叉树，左子树的左节点应该等于右子树的右节点
 * - 左子树的右节点应该等于右子树的左节点
 * 
 * 方法二：迭代法
 * - 使用队列，每次取出两个节点进行比较
 * - 将需要比较的节点对按顺序加入队列
 * 
 * 时间复杂度：O(n)，其中 n 是二叉树的节点数
 * 空间复杂度：O(h)，其中 h 是二叉树的高度
 */
// 方法一：递归法（推荐）
var isSymmetric = function(root) {
    if (root === null) return true;
    
    // 辅助函数：判断两个节点是否镜像对称
    const isMirror = function(left, right) {
        // 两个节点都为空，对称
        if (left === null && right === null) return true;
        
        // 一个为空一个不为空，不对称
        if (left === null || right === null) return false;
        
        // 节点值不相等，不对称
        if (left.val !== right.val) return false;
        
        // 递归判断：左子树的左节点和右子树的右节点，左子树的右节点和右子树的左节点
        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
    };
    
    return isMirror(root.left, root.right);
};

// 方法二：迭代法（使用队列）
var isSymmetricIterative = function(root) {
    if (root === null) return true;
    
    // 使用队列存储需要比较的节点对
    const queue = [];
    queue.push(root.left);
    queue.push(root.right);
    
    while (queue.length > 0) {
        // 每次取出两个节点进行比较
        const left = queue.shift();
        const right = queue.shift();
        
        // 两个节点都为空，继续下一对
        if (left === null && right === null) continue;
        
        // 一个为空一个不为空，不对称
        if (left === null || right === null) return false;
        
        // 节点值不相等，不对称
        if (left.val !== right.val) return false;
        
        // 将需要比较的节点对按顺序加入队列
        // 左子树的左节点和右子树的右节点
        queue.push(left.left);
        queue.push(right.right);
        // 左子树的右节点和右子树的左节点
        queue.push(left.right);
        queue.push(right.left);
    }
    
    return true;
};

// 辅助函数：从数组创建二叉树（层序遍历方式）
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// 测试用例
console.log("=== 对称二叉树测试 ===");

// 测试用例1：对称二叉树 [1,2,2,3,4,4,3]
//       1
//      / \
//     2   2
//    / \ / \
//   3  4 4  3
function createTree1() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(3);
    return root;
}

console.log("测试用例1: [1,2,2,3,4,4,3]");
console.log("递归方法结果:", isSymmetric(createTree1())); // true
console.log("迭代方法结果:", isSymmetricIterative(createTree1())); // true

// 测试用例2：不对称二叉树 [1,2,2,null,3,null,3]
//       1
//      / \
//     2   2
//      \   \
//       3   3
function createTree2() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.right = new TreeNode(3);
    root.right.right = new TreeNode(3);
    return root;
}

console.log("\n测试用例2: [1,2,2,null,3,null,3]");
console.log("递归方法结果:", isSymmetric(createTree2())); // false
console.log("迭代方法结果:", isSymmetricIterative(createTree2())); // false

// 测试用例3：单节点 [1]
function createTree3() {
    return new TreeNode(1);
}

console.log("\n测试用例3: [1]");
console.log("递归方法结果:", isSymmetric(createTree3())); // true
console.log("迭代方法结果:", isSymmetricIterative(createTree3())); // true

// 测试用例4：空树
console.log("\n测试用例4: []");
console.log("递归方法结果:", isSymmetric(null)); // true
console.log("迭代方法结果:", isSymmetricIterative(null)); // true

