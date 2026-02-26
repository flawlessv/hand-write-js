/**
 * 手写题：树形结构转平铺数组
 *
 * 题目描述：
 * 给定一个树状数组（每个节点通过 children 挂载子节点），
 * 将其转换为平铺数组。平铺后的每一项保留原有字段，
 * 并通过 parentId 记录父节点 id。
 *
 * 示例输入：
 * [
 *   {
 *     id: 1,
 *     name: "部门A",
 *     children: [
 *       { id: 2, name: "部门A-1", children: [] },
 *       { id: 3, name: "部门A-2", children: [] }
 *     ]
 *   }
 * ]
 *
 * 思路（DFS 前序遍历）：
 * 1. 从根节点开始深度优先遍历。
 * 2. 访问到节点时，先把当前节点（不含 children）放进结果数组。
 * 3. 递归处理 children，并把当前节点 id 作为子节点的 parentId。
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)（结果数组 + 递归栈）
 */

/**
 * 树结构转平铺数组
 * 固定字段：id / parentId / children
 * @param {Array<Object>} tree
 * @returns {Array<Object>}
 */
function treeToList(tree) {
  if (!Array.isArray(tree)) {
    throw new TypeError("tree 必须是数组");
  }

  const result = [];

  function dfs(node, parentId) {
    const children = Array.isArray(node.children) ? node.children : [];

    // children 不需要出现在平铺结果里，所以先剔除
    const { children: _children, ...rest } = node;

    // parentId 统一挂到平铺结果中，根节点为 null
    result.push({
      ...rest,
      parentId,
    });

    for (const child of children) {
      dfs(child, node.id);
    }
  }

  for (const rootNode of tree) {
    dfs(rootNode, null);
  }

  return result;
}

// ---------------------------------------------------------------------------
// 测试
// ---------------------------------------------------------------------------

console.log("=== 树形结构转平铺数组 ===");

const treeData = [
  {
    id: 1,
    name: "部门A",
    children: [
      {
        id: 2,
        name: "部门A-1",
        children: [
          { id: 4, name: "部门A-1-1", children: [] },
          { id: 5, name: "部门A-1-2", children: [] },
        ],
      },
      { id: 3, name: "部门A-2", children: [] },
    ],
  },
  {
    id: 6,
    name: "部门B",
    children: [{ id: 7, name: "部门B-1", children: [] }],
  },
];

const list = treeToList(treeData);

console.log("输入（树形）：");
console.log(JSON.stringify(treeData, null, 2));
console.log("\n输出（平铺）：");
console.log(JSON.stringify(list, null, 2));

module.exports = treeToList;
