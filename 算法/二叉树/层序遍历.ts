interface TreeNode{
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}




/**
 * 前置学习：先写出不分level切片的BFS，核心思想是通过队列来辅助遍历，队列清空时，遍历结束
 *  a
 * / \
 * b  c
 * /   \
 * d    e
 * ["a","b","c","d","e"]
 */
const treeLevelPre = (root: TreeNode): number[] => {
    const result: number[] = []
    const queue: TreeNode[] = [root]
    while (queue.length > 0) {
        const node: TreeNode = queue.shift()!
        result.push(node.val)
        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)
    }
    return result
}




/**
 * LeetCode 102. 二叉树的层序遍历
 * LeetCode: https://leetcode.cn/problems/binary-tree-level-order-traversal/
 * 拓展1: 增加level切片，输出二维数组
 * 
 *      a
 *     / \
 *    b   c
 *   / \   \
 *  d   e   f
 * 
 * 输出: [["a"], ["b","c"], ["d","e","f"]]
 * 
 * 利用queue的size，来控制每一层的切片 - 为什么 size 能保证“分层”？ 
 * 因为在进入 while 的这一轮时，队列里只存着“当前层的所有节点”（这是 BFS 的不变式）
 * queue:  [a]       size:1
 * queue:  [b,c]     size:2
 * queue:  [d,e,f]   size:3
 */


const treeLevelWithArray = (root: TreeNode | null) => {
    if (!root) return []
    const result: number[][] = []
    const queue: TreeNode[] = [root]
    while (queue.length > 0) {
        const size = queue.length
        const level: number[] = []
        for (let i = 0; i < size; i++) {
            const node = queue.shift()!
            level.push(node.val)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        result.push(level)
    }
    return result
}


/**
 * LeetCode 102. 二叉树的层序遍历
 * LeetCode: https://leetcode.cn/problems/binary-tree-level-order-traversal/
 * 
 * 题目描述：
 * 给你二叉树的根节点 root ，返回其节点值的层序遍历。
 * （即逐层地，从左到右访问所有节点）
 * 
 * 示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
示例 2：

输入：root = [1]
输出：[[1]]
示例 3：

输入：root = []
输出：[]

 * 解题思路：
 * 使用广度优先搜索(BFS)配合队列实现层序遍历
 * 1. 使用队列存储当前层的所有节点
 * 2. 遍历当前层的所有节点，将它们的值加入当前层结果
 * 3. 同时将下一层的节点加入队列
 * 4. 重复直到队列为空
 * 
 * 关键点：
 * - 在处理每一层时，先记录当前队列长度，确保只处理当前层的节点
 * - 每层处理完后，将该层结果加入最终结果数组
 * 
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(w) - w为树的最大宽度，队列最多存储一层的节点
 */
function levelOrder(root: TreeNode | null): number[][] {
    // 用于BFS的辅助队列
    let helperQueue: TreeNode[] = [];
    // 最终结果：每一层的节点值数组
    let res: number[][] = [];
    // 当前层的节点值数组
    let tempArr: number[] = [];
    
    // 如果根节点不为空，将其加入队列
    if (root !== null) helperQueue.push(root);
    
    let curNode: TreeNode;
    
    // BFS主循环：当队列不为空时继续
    while (helperQueue.length > 0) {
        // 记录当前层的节点数量，确保只处理当前层
        const currentLevelSize = helperQueue.length;
        
        // 处理当前层的所有节点
        for (let i = 0; i < currentLevelSize; i++) {
            // 从队列头部取出节点
            curNode = helperQueue.shift()!;
            // 将当前节点值加入当前层结果
            tempArr.push(curNode.val);
            
            // 将下一层的节点加入队列（从左到右）
            if (curNode.left !== null) {
                helperQueue.push(curNode.left);
            }
            if (curNode.right !== null) {
                helperQueue.push(curNode.right);
            }
        }
        
        // 当前层处理完毕，将结果加入最终数组
        res.push(tempArr);
        // 重置临时数组，准备处理下一层
        tempArr = [];
    }
    
    return res;
};