/**
 * 带重试的请求
 *
 * 请求失败就等一会再重试，最多重试 retries 次，还失败就抛错。
 *
 * @param {Function} requestFn 返回 Promise 的请求函数，如 () => fetch(url)
 * @param {{ retries?: number, delay?: number }} options
 * @param {number} options.retries 最多重试几次（不含第一次），默认 2
 * @param {number} options.delay 每次失败后等多少毫秒再重试，默认 1000
 */
function fetchWithRetry(requestFn, options = {}) {
  const { retries = 2, delay = 1000 } = options;

  function run(attempt) {
    return Promise.resolve(requestFn()).catch((err) => {
      // 只有失败才会进这里；某次一旦成功，上面 requestFn() 会 resolve，结果直接返回，不会进 catch
      if (attempt >= retries) return Promise.reject(err);
      return new Promise((r) => setTimeout(r, delay)).then(() => run(attempt + 1));
    });
  }

  return run(0);
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 带重试的请求测试 ===");

let count = 0;
const mockRequest = () => {
  count++;
  console.log("第", count, "次请求");
  if (count < 3) return Promise.reject(new Error("失败"));
  return Promise.resolve("成功");
};

fetchWithRetry(mockRequest, { retries: 3, delay: 100 })
  .then((res) => console.log("结果:", res))
  .catch((e) => console.log("最终失败:", e.message));

module.exports = { fetchWithRetry };
