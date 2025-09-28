/**
 * 自定义 React Hook - useTimer
 * 
 * 功能描述：
 * 一个简单的定时器 Hook，提供开始、暂停、重置等操作。
 * 
 * 示例用法：
 * ```tsx
 * function TimerComponent() {
 *   const { count, start, pause, reset, isRunning } = useTimer(0);
 *   
 *   return (
 *     <div>
 *       <h2>计时器: {count}秒</h2>
 *       <button onClick={start} disabled={isRunning}>开始</button>
 *       <button onClick={pause} disabled={!isRunning}>暂停</button>
 *       <button onClick={reset}>重置</button>
 *     </div>
 *   );
 * }
 * ```
 */

import { useState, useEffect, useRef } from 'react';

// 定时器 Hook 返回值的类型定义
interface TimerHookReturn {
  count: number;          // 当前计数值
  start: () => void;      // 开始计时函数
  pause: () => void;      // 暂停计时函数
  reset: () => void;      // 重置计时函数
  isRunning: boolean;     // 是否正在运行的状态
}

/**
 * useTimer Hook
 * 
 * @param initialState 初始计数值，默认为 0
 * @returns TimerHookReturn 包含计数值和控制函数的对象
 */
const useTimer = (initialState: number = 0): TimerHookReturn => {

  // 状态管理
  const [count, setCount] = useState(initialState);
  const [isRunning, setIsRunning] = useState(false);
  
  // 使用 useRef 存储定时器 ID，避免重新渲染时丢失引用
  const timerRef = useRef(null);

  // 开始计时
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
  };

  // 暂停计时
  const pause = () => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  // 重置计时器
  const reset = () => {
    pause();
    setCount(initialState);
  };

  // 组件卸载时清理定时器，防止内存泄漏
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { count, start, pause, reset, isRunning };
};

export default useTimer;