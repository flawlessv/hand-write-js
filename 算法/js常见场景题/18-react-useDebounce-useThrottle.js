/**
 * 题目 18：React 手写自定义 Hook（useDebounce / useThrottle）
 *
 * 题目描述：
 * 1. 手写 useDebounceValue：输入值变化后，延迟一段时间再输出稳定值
 * 2. 手写 useThrottleValue：在固定时间窗口内，最多更新一次
 * 3. 扩展：手写 useDebounceFn / useThrottleFn，返回被控制频率的函数
 *
 * 使用说明：
 * - 该文件依赖 React Hooks API（React.useState / React.useEffect / React.useRef）
 * - 在 React 项目中可直接复制，并改成 import 方式使用
 */

/**
 * 防抖值：只有 value 稳定 delay 毫秒后才更新
 * @param {any} value
 * @param {number} delay
 * @returns {any}
 */
function useDebounceValue(value, delay) {
  const wait = typeof delay === "number" ? delay : 300;
  const state = React.useState(value);
  const debouncedValue = state[0];
  const setDebouncedValue = state[1];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => clearTimeout(timer);
  }, [value, wait]);

  return debouncedValue;
}

/**
 * 节流值：在 wait 时间窗口内最多更新一次
 * @param {any} value
 * @param {number} wait
 * @returns {any}
 */
function useThrottleValue(value, wait) {
  const gap = typeof wait === "number" ? wait : 300;
  const state = React.useState(value);
  const throttledValue = state[0];
  const setThrottledValue = state[1];

  const lastExecRef = React.useRef(0);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    const now = Date.now();
    const remain = gap - (now - lastExecRef.current);

    if (remain <= 0) {
      lastExecRef.current = now;
      setThrottledValue(value);
      return undefined;
    }

    timerRef.current = setTimeout(() => {
      lastExecRef.current = Date.now();
      setThrottledValue(value);
      timerRef.current = null;
    }, remain);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [value, gap]);

  return throttledValue;
}

/**
 * 防抖函数：返回一个“延迟触发”的函数
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function & {cancel: Function}}
 */
function useDebounceFn(fn, delay) {
  const wait = typeof delay === "number" ? delay : 300;
  const fnRef = React.useRef(fn);

  React.useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const wrapped = React.useMemo(() => {
    let timer = null;

    const handler = function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fnRef.current.apply(this, args);
      }, wait);
    };

    handler.cancel = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    return handler;
  }, [wait]);

  return wrapped;
}

/**
 * 节流函数：返回一个“固定窗口最多执行一次”的函数
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function & {cancel: Function}}
 */
function useThrottleFn(fn, wait) {
  const gap = typeof wait === "number" ? wait : 300;
  const fnRef = React.useRef(fn);
  const timerRef = React.useRef(null);
  const lastExecRef = React.useRef(0);

  React.useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const wrapped = React.useMemo(() => {
    const handler = function (...args) {
      const now = Date.now();
      const remain = gap - (now - lastExecRef.current);

      if (remain <= 0) {
        lastExecRef.current = now;
        fnRef.current.apply(this, args);
        return;
      }

      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          lastExecRef.current = Date.now();
          timerRef.current = null;
          fnRef.current.apply(this, args);
        }, remain);
      }
    };

    handler.cancel = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    return handler;
  }, [gap]);

  return wrapped;
}

/**
 * 使用示例（React 组件中）：
 *
 * function SearchBox() {
 *   const [keyword, setKeyword] = React.useState("");
 *   const debouncedKeyword = useDebounceValue(keyword, 400);
 *
 *   React.useEffect(() => {
 *     // 发请求
 *     console.log("搜索关键字：", debouncedKeyword);
 *   }, [debouncedKeyword]);
 *
 *   return React.createElement("input", {
 *     value: keyword,
 *     onChange: (e) => setKeyword(e.target.value),
 *   });
 * }
 */

module.exports = {
  useDebounceValue,
  useThrottleValue,
  useDebounceFn,
  useThrottleFn,
};

