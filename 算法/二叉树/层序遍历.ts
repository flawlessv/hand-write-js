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