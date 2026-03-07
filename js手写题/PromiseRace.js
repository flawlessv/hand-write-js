/**
 * 手写 Promise.race
 *
 * 题目描述：
 * 实现 Promise.race(iterable)，返回一个 Promise，其状态与第一个敲定（fulfilled 或 rejected）的 Promise 一致。
 *
 * 核心特性：
 * 1. 谁先完成用谁：第一个 resolve/reject 的结果决定整个 race 的结果
 * 2. 与 Promise.all 相反：all 是“全成功才成功”，race 是“先到先得”
 * 3. 空数组：原生行为是永远 pending，此处保持一致
 * 4. 支持可迭代对象；非 Promise 项用 Promise.resolve 包装
 *
 * 实现要点：
 * 对每项 Promise.resolve(item).then(resolve, reject)，任一项先敲定即 resolve/reject 一次（后续忽略）。
 *
 * @param {Iterable<any>} iterable 可迭代对象（如 Promise 数组）
 * @returns {Promise<any>}
 */
function myPromiseRace(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
      reject(new TypeError("参数必须是可迭代对象"));
      return;
    }

    const list = Array.from(iterable);

    if (list.length === 0) {
      return; // 永远 pending，与原生一致
    }

    for (const item of list) {
      Promise.resolve(item).then(resolve, reject);
    }
  });
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 手写 Promise.race 测试 ===");

const slow = new Promise((r) => setTimeout(() => r("slow"), 200));
const fast = new Promise((r) => setTimeout(() => r("fast"), 50));

myPromiseRace([slow, fast]).then((res) => console.log("结果:", res)); // fast

const firstReject = new Promise((_, r) => setTimeout(() => r(new Error("fail")), 30));
myPromiseRace([slow, firstReject]).catch((e) => console.log("失败:", e.message)); // fail

module.exports = myPromiseRace;
