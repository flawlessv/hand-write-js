import { useRef, useCallback, useEffect, useState } from 'react';

/**
 * 纯JS简易版 useEffectEvent
 * 作用：让useEffect中的回调能获取最新状态，且不成为频繁变化的依赖
 * @param {Function} handler 实际执行的回调函数
 * @returns {Function} 稳定的触发函数（不会重新创建）
 */
function useEffectEvent(handler) {
  // 用ref保存最新的回调，ref更新不触发组件重渲染
  const handlerRef = useRef(handler);

  // 每次组件重渲染，更新ref为最新的handler，保证执行时拿到最新状态/属性
  handlerRef.current = handler;

  // 封装稳定的函数，无依赖项，永久不会重新创建
  const stableHandler = useCallback((...args) => {
    return handlerRef.current(...args);
  }, []);

  return stableHandler;
}

// 测试组件 - 可直接运行
function TestUseEffectEvent() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('hello');

  // 用useEffectEvent包装回调，无需写任何依赖
  const handleEvent = useEffectEvent(() => {
    console.log('最新状态：', count, msg);
    alert(`count: ${count}, msg: ${msg}`);
  });

  // useEffect 仅依赖稳定的handleEvent，只会在组件挂载/卸载时执行
  useEffect(() => {
    console.log('useEffect 执行了（仅挂载）');
    // 模拟副作用场景：定时器、事件监听、请求回调等
    const timer = setInterval(handleEvent, 2000);
    // 清除副作用
    return () => {
      clearInterval(timer);
      console.log('定时器已清除');
    };
  }, [handleEvent]); // 依赖永远不变，不会因count/msg更新重复执行

  return (
    <div style={{ padding: '20px' }}>
      <h3>count: {count}</h3>
      <h3>msg: {msg}</h3>
      <button onClick={() => setCount(c => c + 1)}>count + 1</button>
      <button onClick={() => setMsg(m => m + '!')} style={{ marginLeft: '10px' }}>
        msg + !
      </button>
    </div>
  );
}

export default TestUseEffectEvent;