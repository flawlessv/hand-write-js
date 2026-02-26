/**
 * JS 常见题：实现 promisePool（并发控制）
 *
 * 题目描述：
 * 实现一个 promisePool 函数，用于限制异步任务的并发执行数量，需满足以下要求：
 * 1. 接收三个参数：
 *    - tasks：异步任务数组（每个元素是返回 Promise 的函数，调用后才会执行异步逻辑）
 *    - limit：最大并发数（同时执行的任务数不超过该值）
 *    - callback：所有任务完成后的回调函数，参数为所有任务的结果数组（顺序与原任务一致）
 * 2. 前一批任务完成后，立即启动下一批任务，始终保持并发数不超过 limit
 * 3. 单个任务执行失败（reject）不影响其他任务执行，结果数组中对应位置存储错误信息
 * 4. 所有任务（成功 / 失败）执行完毕后，触发 callback 并返回完整结果
 *
 * 思路说明（工作池模型）：
 * - 启动 limit 个“worker”并行工作，每个 worker 不断从共享下标中领取下一个任务
 * - 每个任务单独 try/catch：成功写入结果，失败写入错误对象
 * - 用结果数组按索引回填，保证最终结果顺序与 tasks 顺序一致
 * - 所有 worker 结束后，统一触发 callback 并 resolve(results)
 */

/**
 * 限制并发执行异步任务
 * @param {Array<Function>} tasks 任务数组，每项是返回 Promise 的函数
 * @param {number} limit 最大并发数
 * @param {(results: any[]) => void} [callback] 全部完成后的回调
 * @returns {Promise<any[]>} 所有任务完成后的结果数组（含错误项）
 */
function promisePool(tasks, limit, callback) {
  if (!Array.isArray(tasks)) {
    return Promise.reject(new TypeError("tasks 必须是函数数组"));
  }

  // limit 非法时兜底为 1，避免出现 0 或负数并发
  const parsedLimit = Number(limit);
  const maxConcurrency =
    Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.floor(parsedLimit) : 1;

  const results = new Array(tasks.length);

  // 边界情况：空任务数组直接完成
  if (tasks.length === 0) {
    if (typeof callback === "function") {
      callback(results);
    }
    return Promise.resolve(results);
  }

  // 共享游标：指向下一个待领取任务的索引
  let nextIndex = 0;

  // worker：循环领取任务并执行，直到没有任务可领
  const worker = async () => {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;

      if (currentIndex >= tasks.length) {
        return;
      }

      const task = tasks[currentIndex];
      try {
        if (typeof task !== "function") {
          throw new TypeError(`tasks[${currentIndex}] 不是函数`);
        }

        // await task()：任务成功则拿到值；任务失败会进入 catch
        const value = await task();
        results[currentIndex] = value;
      } catch (error) {
        // 单个任务失败不影响整体流程，把错误写回对应位置
        results[currentIndex] = error;
      }
    }
  };

  // 启动不超过任务总数的 worker，保证并发上限
  const workerCount = Math.min(maxConcurrency, tasks.length);
  const workers = Array.from({ length: workerCount }, () => worker());

  return Promise.all(workers).then(() => {
    if (typeof callback === "function") {
      try {
        callback(results);
      } catch (error) {
        // callback 的异常不影响主结果返回，但保留可观测性
        console.error("callback 执行出错：", error);
      }
    }
    return results;
  });
}

// ---------------------------------------------------------------------------
// 示例用法
// ---------------------------------------------------------------------------

// 模拟异步任务：延迟指定时间后返回索引（成功场景）
const createTask = (index, delay) => () =>
  new Promise((resolve) => setTimeout(() => resolve(index), delay));

// 生成 5 个异步任务，延迟分别为 100、200、300、400、500ms
const tasks = [
  createTask(0, 100),
  createTask(1, 200),
  createTask(2, 300),
  createTask(3, 400),
  createTask(4, 500),
];

// 限制最大并发数为 2，执行任务
promisePool(tasks, 2, (results) => {
  console.log("所有任务完成，结果：", results); // [0, 1, 2, 3, 4]
}).then((results) => {
  console.log("Promise 返回结果：", results);
});

// 含失败任务的场景
const failTask = () => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("任务失败")), 150);
  });

const tasksWithFail = [createTask(0, 100), failTask(), createTask(2, 300)];

promisePool(tasksWithFail, 2, (results) => {
  console.log("含失败任务的结果：", results);
  // 输出类似：[0, Error: 任务失败, 2]
});

module.exports = promisePool;
