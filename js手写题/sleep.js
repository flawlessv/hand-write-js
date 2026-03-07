/**
 * 手写 sleep / delay
 *
 * 题目描述：
 * 实现一个 sleep(ms) 或 delay(ms)，在指定毫秒数后 resolve 的 Promise，便于在 async 中“暂停”。
 *
 * 用法：await sleep(1000); 或 sleep(1000).then(() => { ... })
 *
 * 思路：Promise 构造函数 + setTimeout，在 ms 后 resolve。
 *
 * @param {number} ms 延迟毫秒数
 * @returns {Promise<void>}
 */

function sleep(ms) {
  if (typeof ms !== "number" || ms < 0 || !Number.isFinite(ms)) {
    return Promise.reject(new TypeError("ms 必须是非负数字"));
  }
  if (ms === 0) {
    return Promise.resolve();
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 别名
const delay = sleep;

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== sleep / delay 测试 ===");

(async () => {
  console.log("start");
  await sleep(100);
  console.log("after 100ms");
})();

delay(50).then(() => console.log("delay 50ms then"));

module.exports = { sleep, delay };
