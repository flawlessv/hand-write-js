/**
 * 手写题：平铺数据转树状数组
 * 
 * 题目描述：
 * 给定一个扁平数组，每一项都包含 id 和 parentId 字段。
 * 其中 parentId 指向父节点的 id，根节点的 parentId 通常为 null / undefined / 0。
 * 请将其转换为树状数组（每个节点通过 children 字段挂载子节点）。
 * 
 * 示例输入：
 * [
 *   { id: 1, parentId: null, name: "部门A" },
 *   { id: 2, parentId: 1, name: "部门A-1" },
 *   { id: 3, parentId: 1, name: "部门A-2" },
 *   { id: 4, parentId: 2, name: "部门A-1-1" }
 * ]
 * 
 * 思路（Map 两次遍历）：
 * 1. 第一次遍历：把每个节点放进 Map，key 是 id，value 是带 children 的新对象。
 * 2. 第二次遍历：
 *    - 如果当前节点是根节点，放入结果数组 roots。
 *    - 否则找到 parentId 对应的父节点，挂到父节点的 children 下。
 * 3. 返回 roots。
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */

/**
 * 将平铺数组转换为树结构（简洁版）
 * 固定字段：id / parentId / children
 * @param {Array<Object>} list
 * @returns {Array<Object>}
 */
function listToTree(list) {
  if (!Array.isArray(list)) {
    throw new TypeError("list 必须是数组");
  }

  const nodeMap = new Map();
  const roots = [];

  // 第一次遍历：创建节点副本，避免直接修改原数据
  for (const item of list) {
    const node = { ...item, children: [] };
    nodeMap.set(item.id, node);
  }

  // 第二次遍历：建立父子关系
  for (const item of list) {
    const node = nodeMap.get(item.id);
    const parentId = item.parentId;

    // parentId 为根标识，或找不到父节点时，作为根节点处理
    if (parentId == null || parentId === 0 || !nodeMap.has(parentId)) {
      roots.push(node);
      continue;
    }

    const parentNode = nodeMap.get(parentId);
    parentNode.children.push(node);
  }

  return roots;
}

// 测试
console.log("=== 平铺数据转树状数组 ===");

const flatData = [
  { id: 1, parentId: null, name: "部门A" },
  { id: 2, parentId: 1, name: "部门A-1" },
  { id: 3, parentId: 1, name: "部门A-2" },
  { id: 4, parentId: 2, name: "部门A-1-1" },
  { id: 5, parentId: null, name: "部门B" },
  { id: 6, parentId: 5, name: "部门B-1" },
];

const tree = listToTree(flatData);

console.log("输入（平铺）：");
console.log(JSON.stringify(flatData, null, 2));
console.log("\n输出（树状）：");
console.log(JSON.stringify(tree, null, 2));

console.log("\n原数组未被 children 污染：", flatData.every((item) => !("children" in item)));
