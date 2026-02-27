/**
 * 题目 02：手写 Promise.race + 超时封装
 *
 * 题目描述：
 * 1. 手写 myPromiseRace，行为与 Promise.race 基本一致
 * 2. 基于 race 再封装一个 withTimeout，用于给异步任务增加超时能力
 *
 * 考点：
 * - Promise 并发竞争
 * - Promise.resolve 兼容普通值/thenable/Promise
 * - 超时控制与定时器清理
 */

/**
 * 手写 Promise.race
 * @param {Iterable<any>} iterable
 * @returns {Promise<any>}
 */
function myPromiseRace(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
      reject(new TypeError("参数必须是可迭代对象"));
      return;
    }

    const list = Array.from(iterable);

    // 与原生 Promise.race 一致：空数组返回一个永远 pending 的 Promise
    if (list.length === 0) {
      return;
    }

    list.forEach((item) => {
      Promise.resolve(item).then(resolve, reject);
    });
  });
}

/**
 * 给任意 Promise 增加超时能力
 * @param {Promise<any>} promise
 * @param {number} ms 超时时间（毫秒）
 * @returns {Promise<any>}
 */
function withTimeout(promise, ms) {
  let timer = null;

  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject("请求超时");
    }, ms);
  });

  return myPromiseRace([Promise.resolve(promise), timeoutPromise]).finally(() => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  });
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

const fastTask = new Promise((resolve) => setTimeout(() => resolve("fast done"), 120));
const slowTask = new Promise((resolve) => setTimeout(() => resolve("slow done"), 800));

myPromiseRace([slowTask, fastTask]).then((res) => {
  console.log("myPromiseRace 结果：", res); // fast done
});

withTimeout(slowTask, 300)
  .then((res) => console.log("withTimeout 成功：", res))
  .catch((err) => console.log("withTimeout 失败：", err)); // 请求超时

module.exports = {
  myPromiseRace,
  withTimeout,
};
