import { useState, useEffect, useRef } from 'react';

interface TimerHookReturn {
  count: number;          // 当前计数值
  start: () => void;      // 开始计时
  pause: () => void;      // 暂停计时
  reset: () => void;      // 重置计时
  isRunning: boolean;     // 是否正在运行
}

const useTimer = (initialState = 0): TimerHookReturn => {
  const [count, setCount] = useState(initialState);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
  };

  const pause = () => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const reset = () => {
    pause();
    setCount(initialState);
  };

  return { count, start, pause, reset, isRunning };
};

export default useTimer;