/**
 * 驼峰与下划线互转
 *
 * 题目描述：
 * 实现 camelCase ↔ snake_case 的互转。
 * - 驼峰转下划线：userName → user_name，getHTTPResponse → get_h_t_t_p_response（连续大写可约定为一段）
 * - 下划线转驼峰：user_name → userName
 *
 * 常见约定：
 * - 驼峰 → 下划线：遇到大写就在前面加下划线并转小写
 * - 下划线 → 驼峰：按下划线分割，首段小写，其余段首字母大写后拼接
 *
 * @param {string} str 待转换字符串
 * @returns {string}
 */

/**
 * 驼峰转下划线（camelCase → snake_case）
 */
function camelToSnake(str) {
  if (typeof str !== "string") {
    throw new TypeError("str 必须是字符串");
  }
  // 正则说明（零基础版）：
  // - ([A-Z])：小括号表示“捕获组”，[A-Z] 表示一个大写字母，整体即“匹配一个大写字母并记住它”。
  // - /g：全局匹配，即把字符串里每一个大写字母都匹配到，而不是只匹配第一个。
  // - replace(/([A-Z])/g, (_, c) => ...)：每匹配到一个大写字母，就执行回调；第二个参数 c 是捕获组内容（即那个大写字母）。把该字母前面加上 "_" 并转成小写，得到 "_x"。
  // - .replace(/^_/, "")：^ 表示字符串开头，/^_/ 即“开头的下划线”；把开头的 _ 删掉（例如 _user_name → user_name）。
  return str.replace(/([A-Z])/g, (_, c) => `_${c.toLowerCase()}`).replace(/^_/, "");
}

/**
 * 下划线转驼峰（snake_case → camelCase）
 */
function snakeToCamel(str) {
  if (typeof str !== "string") {
    throw new TypeError("str 必须是字符串");
  }
  // 这里没有用正则，是字符串方法：split("_") 按下划线拆成多段，例如 "user_name" → ["user","name"]。
  // 然后 map：第一段（i===0）转小写；其余段首字母大写、其余小写，再拼成驼峰。
  return str
    .split("_")
    .map((s, i) => (i === 0 ? s.toLowerCase() : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()))
    .join("");
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 驼峰与下划线互转测试 ===");

console.log(camelToSnake("userName"));
console.log(camelToSnake("getHTTPResponse"));
console.log(snakeToCamel("user_name"));
console.log(snakeToCamel("get_http_response"));

module.exports = { camelToSnake, snakeToCamel };
