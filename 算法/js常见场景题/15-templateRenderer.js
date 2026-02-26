/**
 * 题目 15：手写模板字符串渲染器
 *
 * 题目描述：
 * 实现 renderTemplate(template, data)，支持：
 * 1. 替换模板中的占位符：${xxx}
 * 2. 支持路径访问：${user.name}、${list[0]}
 * 3. 对缺失字段兜底为空字符串
 *
 * 约束：
 * - 不使用 eval/new Function（避免安全风险）
 */

/**
 * 通过路径读取对象值
 * @param {object} data
 * @param {string} path
 * @returns {any}
 */
function getByPath(data, path) {
  if (!path) {
    return undefined;
  }

  // 支持 list[0] -> list.0
  const normalized = path.replace(/\[(\w+)\]/g, ".$1");
  const keys = normalized.split(".").filter(Boolean);

  let current = data;
  for (let i = 0; i < keys.length; i += 1) {
    if (current == null) {
      return undefined;
    }
    current = current[keys[i]];
  }
  return current;
}

/**
 * 模板渲染函数
 * @param {string} template
 * @param {object} data
 * @returns {string}
 */
function renderTemplate(template, data) {
  if (typeof template !== "string") {
    throw new TypeError("template 必须是字符串");
  }

  return template.replace(/\$\{([^}]+)\}/g, (_, rawExpr) => {
    const expr = rawExpr.trim();
    const value = getByPath(data, expr);
    return value == null ? "" : String(value);
  });
}

/**
 * 预编译模板，返回复用函数
 * @param {string} template
 * @returns {(data: object) => string}
 */
function compileTemplate(template) {
  return function compiled(data) {
    return renderTemplate(template, data);
  };
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

const tpl = "Hi ${user.name}, age=${user.age}, first=${list[0]}, city=${user.city}";
const data = {
  user: { name: "Tom", age: 18 },
  list: ["A", "B"],
};

console.log(renderTemplate(tpl, data));
// Hi Tom, age=18, first=A, city=

const compiled = compileTemplate("欢迎 ${name}，你的积分是 ${score}");
console.log(compiled({ name: "Alice", score: 99 }));

module.exports = {
  renderTemplate,
  compileTemplate,
};

