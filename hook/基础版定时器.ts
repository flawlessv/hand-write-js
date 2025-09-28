import { useState, useEffect, useRef } from 'react';
// https://zhuanlan.zhihu.com/p/618587289
const useCountdown = (initialValue: number) => {
  const [count, setCount] = useState(initialValue);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
    // 这里为了避免闭包问题，使用函数式更新，也可以直接使用使用setTimeout函数，或者使用useRef来存储定时器的count
      setCount(prevCount => prevCount - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return count;
};

// TODO:使用setTimeout
// function Timer() {
//     const [count, setCount] = useState(0);
    
//     useEffect(() => {
//       const timeoutId = setTimeout(() => {
//         setCount(count + 1);
//       }, 1000);
      
//       return () => clearTimeout(timeoutId);
//     }, [count]);
  
//     return (
//       <div>
//         <h1>{count}</h1>
//       </div>
//     );
//   }
// TODO:使用useRef
// function Timer() {
//     const [count, setCount] = useState(0);
//     const countRef = useRef(count);
  
//     useEffect(() => {
//       countRef.current = count;
//     }, [count]);
  
//     useEffect(() => {
//       const intervalId = setInterval(() => {
//         console.log(countRef.current);
//         setCount(countRef.current + 1);
//       }, 1000);
  
//       return () => clearInterval(intervalId);
//     }, []);
  
//     return (
//       <div>
//         <h1>{count}</h1>
//       </div>
//     );
//   }
export default useCountdown;