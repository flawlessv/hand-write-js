/**
 * 题目 19：手写简版 useState / useRef（理解 Hooks 机制）
 *
 * 题目描述：
 * 1. 不依赖 React，实现一个最小可运行的 hooks 模型
 * 2. 提供 useState、useRef、render
 * 3. 解释为什么 Hook 不能写在条件分支里
 *
 * 核心思想：
 * - 用数组保存每个 Hook 的状态
 * - 用 hookIndex 记录当前执行到第几个 Hook
 * - 每次 render 前重置 hookIndex，按调用顺序读取状态
 */

const hookStates = [];
let hookIndex = 0;

function resetHookIndex() {
  hookIndex = 0;
}

/**
 * 简版 useState
 * @param {any|Function} initialState
 * @returns {[any, Function]}
 */
function useState(initialState) {
  const currentIndex = hookIndex;

  if (!(currentIndex in hookStates)) {
    hookStates[currentIndex] =
      typeof initialState === "function" ? initialState() : initialState;
  }

  function setState(nextState) {
    const prev = hookStates[currentIndex];
    hookStates[currentIndex] =
      typeof nextState === "function" ? nextState(prev) : nextState;
  }

  hookIndex += 1;
  return [hookStates[currentIndex], setState];
}

/**
 * 简版 useRef
 * @param {any} initialValue
 * @returns {{ current: any }}
 */
function useRef(initialValue) {
  const currentIndex = hookIndex;

  if (!(currentIndex in hookStates)) {
    hookStates[currentIndex] = { current: initialValue };
  }

  hookIndex += 1;
  return hookStates[currentIndex];
}

/**
 * 模拟渲染：每次渲染都把指针归零
 * @param {Function} Component
 * @returns {any}
 */
function render(Component) {
  resetHookIndex();
  return Component();
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

function Counter() {
  const state = useState(0);
  const count = state[0];
  const setCount = state[1];

  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return {
    count,
    renderCount: renderCountRef.current,
    inc: () => setCount((c) => c + 1),
  };
}

let app = render(Counter);
console.log("第一次 render =>", app); // { count: 0, renderCount: 1, ... }

app.inc();
app = render(Counter);
console.log("第二次 render =>", app); // { count: 1, renderCount: 2, ... }

/**
 * 为什么 Hook 不能写在 if / for / 嵌套函数里？
 *
 * 因为我们的状态读取依赖“固定调用顺序”。
 * 一旦某次渲染少调用或多调用某个 Hook，后续 Hook 的下标就会错位：
 *
 * - 上一次第 1 个 Hook 是 count
 * - 下一次第 1 个 Hook 变成了 ref
 *
 * 这样会把状态读错位置，导致不可预测 bug。
 *
 * React 的规则本质就是保证每次渲染 Hook 调用顺序稳定。
 */

module.exports = {
  useState,
  useRef,
  render,
};

