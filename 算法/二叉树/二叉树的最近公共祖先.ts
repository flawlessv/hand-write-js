/**
 * https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/?envType=problem-list-v2&envId=2cktkvj
 * 题目描述：
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 
 * 最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
 * 
 * 示例 1：
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出：3
 * 解释：节点 5 和节点 1 的最近公共祖先是节点 3。
 * 
 * 示例 2：
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * 输出：5
 * 解释：节点 5 和节点 4 的最近公共祖先是节点 5。
 * 
 * 示例 3：
 * 输入：root = [1,2], p = 1, q = 2
 * 输出：1
 * 解释：节点 1 和节点 2 的最近公共祖先是节点 1。
 * 
 * 提示：
 * 树中节点数目在范围 [2, 10^5] 内。
 * -10^9 <= Node.val <= 10^9
 * 所有 Node.val 互不相同 。
 *
 * 
 **/

// TreeNode 结构（LeetCode 题目里通常已给出；这里补上便于本地阅读/提示类型）
type TreeNode = {
    val: number
    left: TreeNode | null
    right: TreeNode | null
}

/**
 * 核心思路（DFS + “信号上报”）：
 * - 定义 dfs(node) 返回 TreeNode | null，含义是：
 *   - 在这棵子树里找到了 p 或 q：返回找到的那个节点（把“我找到目标了”的信号往上交）
 *   - 在这棵子树里已经确定了 LCA：返回 LCA（把答案继续往上交）
 *   - 都没找到：返回 null
 *
 * 递归怎么做决策（后序回溯）：
 * 1) base case:
 *    - node == null → null
 *    - node === p 或 node === q → node
 * 2) 分别去左右子树要信号：left = dfs(node.left), right = dfs(node.right)
 * 3) 汇合逻辑：
 *    - left 和 right 都非空：说明 p、q 分居两侧（或在两侧汇合），当前 node 就是最近公共祖先 → return node
 *    - 否则：只有一边有信号，继续把那边的结果往上抛 → return left || right
 */
const lowestCommonAncestor = (root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null => {
    if (!root) return null
    
    if (root === p || root === q) return root

    const left =  lowestCommonAncestor(root.left ,p,q)
    const right = lowestCommonAncestor(root.right,p,q)

    if(left && right ) return root

    return left || right

}



/**
 * 方法二：记录“根到节点”的路径，再求最长公共前缀
 * - 先分别拿到 root -> p 的路径、root -> q 的路径
 * - 两条路径从头开始比对，最后一个相同节点就是 LCA
 */

const lca = (root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null => {
    // 1) 取出两条路径（root -> p, root -> q）
    const pathP: TreeNode[] = getTravelPath(root, p)
    const pathQ: TreeNode[] = getTravelPath(root, q)

    // 2) 有任意一个找不到，说明输入不合法
    if (pathP.length === 0 || pathQ.length === 0) return null
    let lastSame: TreeNode | null = null

    // 3) 从根开始同步向下，记录最后一个相同节点
    const minLength = Math.min(pathP.length, pathQ.length)
    for (let i = 0; i < minLength; i++) {
        if (pathP[i] !== pathQ[i]) break
        lastSame = pathP[i]
    }
    return lastSame
}


// 获取从 root 到目标节点的路径（包含 root 和目标节点）
const getTravelPath = (root: TreeNode | null, node: TreeNode) => {
    const path: TreeNode[] = []

    // 返回 boolean：是否在当前子树找到目标
    const travelPath = (root: TreeNode | null, node: TreeNode) => {
        if (!root) return false
        path.push(root)
        if (root === node) return true
        if (root.left && travelPath(root.left, node)) return true
        if (root.right && travelPath(root.right, node)) return true
        path.pop()
        return false
    }

    travelPath(root, node)
    return path
}