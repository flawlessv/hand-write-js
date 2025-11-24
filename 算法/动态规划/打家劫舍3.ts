/**
 * LeetCode 337. 打家劫舍 III
 * LeetCode: https://leetcode.cn/problems/house-robber-iii/
 * 
 * 题目描述：
 * 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。
 * 这个地区只有一个入口，我们称之为"根"。 除了"根"之外，每栋房子有且只有一个"父"房子与之相连。
 * 一番侦察之后，聪明的小偷意识到"这个地方的所有房屋的排列类似于一棵二叉树"。
 * 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
 * 
 * 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。
 * 
 * 示例：
 * 输入: [3,4,5,1,3,null,1]
 *      3
 *     / \
 *    4   5
 *   / \   \ 
 *  1   3   1
 * 输出: 9
 * 解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.
 * 
 * 解题思路：
 * 这是打家劫舍问题在树形结构上的扩展。
 * 
 * 核心思想：
 * 对于每个节点，有两种选择：
 * 1. 偷当前节点：不能偷其直接子节点，但可以偷孙子节点
 * 2. 不偷当前节点：可以偷其直接子节点
 * 
 * 动态规划思路：
 * 对于每个节点，维护两个状态：
 * - dp[0]: 不偷当前节点能获得的最大金额
 * - dp[1]: 偷当前节点能获得的最大金额
 * 
 * 状态转移方程：
 * - 不偷当前节点：dp[0] = max(left[0], left[1]) + max(right[0], right[1])
 * - 偷当前节点：dp[1] = left[0] + right[0] + node.val
 * 
 * 其中 left[0], left[1] 表示左子树的两种状态，right[0], right[1] 表示右子树的两种状态
 * 
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈的深度，h为树的高度
 */

// 二叉树节点定义
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function rob(root: TreeNode | null): number {
    const result = robNode(root);
    return Math.max(result[0], result[1]);
}

// 返回值：[不偷当前节点的最大金额, 偷当前节点的最大金额]
type MaxValueArr = [number, number];

function robNode(node: TreeNode | null): MaxValueArr {
    // 空节点，无论偷不偷都是0
    if (node === null) return [0, 0];
    
    // 递归计算左右子树的结果
    const leftArr: MaxValueArr = robNode(node.left);
    const rightArr: MaxValueArr = robNode(node.right);
    
    // 不偷当前节点：可以选择偷或不偷子节点（取最大值）
    const notRob: number = Math.max(leftArr[0], leftArr[1]) + 
                          Math.max(rightArr[0], rightArr[1]);
    
    // 偷当前节点：不能偷直接子节点，只能取子节点不偷的情况
    const rob: number = leftArr[0] + rightArr[0] + node.val;
    
    return [notRob, rob];
}

// 方法二：记忆化递归（避免重复计算）
function robWithMemo(root: TreeNode | null): number {
    const memo = new Map<TreeNode, number>();
    
    function helper(node: TreeNode | null): number {
        if (node === null) return 0;
        
        if (memo.has(node)) {
            return memo.get(node)!;
        }
        
        // 偷当前节点：当前节点值 + 孙子节点的最大值
        let robCurrent = node.val;
        if (node.left) {
            robCurrent += helper(node.left.left) + helper(node.left.right);
        }
        if (node.right) {
            robCurrent += helper(node.right.left) + helper(node.right.right);
        }
        
        // 不偷当前节点：直接子节点的最大值
        const notRobCurrent = helper(node.left) + helper(node.right);
        
        const result = Math.max(robCurrent, notRobCurrent);
        memo.set(node, result);
        return result;
    }
    
    return helper(root);
}

// 测试用例
console.log("=== 打家劫舍 III 测试 ===");

// 构建测试树1: [3,2,3,null,3,null,1]
//      3
//     / \
//    2   3
//     \   \ 
//      3   1
const tree1 = new TreeNode(3);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(3);
tree1.left.right = new TreeNode(3);
tree1.right.right = new TreeNode(1);

console.log("测试用例 1:");
console.log("树结构: [3,2,3,null,3,null,1]");
console.log(`动态规划结果: ${rob(tree1)}`);  // 期望输出: 7
console.log(`记忆化递归: ${robWithMemo(tree1)}`);

// 构建测试树2: [3,4,5,1,3,null,1]
//      3
//     / \
//    4   5
//   / \   \ 
//  1   3   1
const tree2 = new TreeNode(3);
tree2.left = new TreeNode(4);
tree2.right = new TreeNode(5);
tree2.left.left = new TreeNode(1);
tree2.left.right = new TreeNode(3);
tree2.right.right = new TreeNode(1);

console.log("\n测试用例 2:");
console.log("树结构: [3,4,5,1,3,null,1]");
console.log(`动态规划结果: ${rob(tree2)}`);  // 期望输出: 9
console.log(`记忆化递归: ${robWithMemo(tree2)}`);

// 单节点测试
const tree3 = new TreeNode(5);
console.log("\n测试用例 3:");
console.log("树结构: [5]");
console.log(`动态规划结果: ${rob(tree3)}`);  // 期望输出: 5
console.log(`记忆化递归: ${robWithMemo(tree3)}`);

// 空树测试
console.log("\n测试用例 4:");
console.log("树结构: []");
console.log(`动态规划结果: ${rob(null)}`);  // 期望输出: 0
console.log(`记忆化递归: ${robWithMemo(null)}`);

export { TreeNode, rob, robWithMemo };