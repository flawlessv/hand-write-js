/**
 * JavaScript 事件循环题目（简单版 - 浏览器环境）
 * 
 * 包含：定时器、Promise、async/await 及其嵌套
 * 请分析以下代码的执行顺序
 */

console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => {
    console.log('5');
  }, 0);
});

async function async1() {
  console.log('6');
  await Promise.resolve();
  console.log('7');
}

async1();

new Promise((resolve) => {
  console.log('8');
  resolve();
}).then(() => {
  console.log('9');
});

console.log('10');

/**
 * ============================================
 * 详细解析答案
 * ============================================
 * 
 * 【正确答案】：1, 6, 8, 10, 4, 7, 9, 2, 3, 5
 * 
 * 【执行步骤详解】：
 * 
 * === 第一阶段：同步代码执行（Call Stack） ===
 * 
 * 1. console.log('1')
 *    → 输出：1
 *    → 原因：同步代码，立即执行
 * 
 * 2. setTimeout(() => {...}, 0)
 *    → 不输出，将回调函数放入宏任务队列（MacroTask Queue）
 *    → 宏任务队列：[setTimeout回调1]
 * 
 * 3. Promise.resolve().then(() => {...})
 *    → 不输出，将回调函数放入微任务队列（MicroTask Queue）
 *    → 微任务队列：[Promise1的then回调]
 * 
 * 4. async1() 函数调用
 *    → 执行 async1 函数体
 *    → console.log('6') → 输出：6（同步执行）
 *    → await Promise.resolve()
 *    → await 后面的代码会被包装成微任务
 *    → console.log('7') 会被放入微任务队列
 *    → 微任务队列：[Promise1的then回调, async1的await后代码]
 * 
 * 5. new Promise((resolve) => {...})
 *    → console.log('8') → 输出：8（同步执行）
 *    → resolve() → Promise 立即 resolve
 *    → .then(() => {...}) 回调放入微任务队列
 *    → 微任务队列：[Promise1的then回调, async1的await后代码, Promise2的then回调]
 * 
 * 6. console.log('10')
 *    → 输出：10
 * 
 * 【当前状态】：
 * - 同步代码执行完毕
 * - 宏任务队列：[setTimeout回调1]
 * - 微任务队列：[Promise1的then回调, async1的await后代码, Promise2的then回调]
 * 
 * === 第二阶段：清空微任务队列 ===
 * 
 * 7. 执行第一个微任务：Promise.resolve().then(() => {...})
 *    → console.log('4') → 输出：4
 *    → setTimeout(() => {...}, 0) → 将回调放入宏任务队列
 *    → 宏任务队列：[setTimeout回调1, setTimeout回调2]
 * 
 * 8. 执行第二个微任务：async1 中 await 后面的代码
 *    → console.log('7') → 输出：7
 *    → 原因：await Promise.resolve() 立即 resolve，所以后面的代码可以执行
 * 
 * 9. 执行第三个微任务：new Promise 的 .then(() => {...})
 *    → console.log('9') → 输出：9
 * 
 * 【当前状态】：
 * - 微任务队列已清空
 * - 宏任务队列：[setTimeout回调1, setTimeout回调2]
 * 
 * === 第三阶段：执行宏任务 ===
 * 
 * 10. 执行第一个宏任务：setTimeout(() => {...}, 0)
 *     → console.log('2') → 输出：2
 *     → Promise.resolve().then(() => {...}) → 将回调放入微任务队列
 *     → 微任务队列：[Promise的then回调]
 * 
 * 11. 清空微任务队列（宏任务执行完后必须清空微任务）
 *     → 执行：console.log('3') → 输出：3
 * 
 * 12. 执行第二个宏任务：setTimeout(() => {...}, 0)
 *     → console.log('5') → 输出：5
 * 
 * 【最终输出顺序】：1, 6, 8, 10, 4, 7, 9, 2, 3, 5
 * 
 * ============================================
 * 关键知识点总结
 * ============================================
 * 
 * 1. 执行顺序：
 *    同步代码 → 清空微任务队列 → 执行一个宏任务 → 清空微任务队列 → 执行下一个宏任务...
 * 
 * 2. async/await 执行机制：
 *    - async 函数中的同步代码会立即执行
 *    - await 会暂停函数执行，等待 Promise resolve
 *    - await 后面的代码会被包装成 .then() 回调，放入微任务队列
 *    - await Promise.resolve() 会立即 resolve，后面的代码会立即放入微任务队列
 * 
 * 3. Promise.then() 回调：
 *    - 如果 Promise 已经 resolve，.then() 回调会立即放入微任务队列
 *    - 微任务会按照入队顺序执行
 * 
 * 4. setTimeout(0)：
 *    - 即使延迟为0，也是宏任务
 *    - 会在所有微任务执行完后才执行
 *    - 宏任务执行完后，会再次清空微任务队列
 * 
 * 5. 嵌套情况：
 *    - 宏任务中产生微任务：宏任务执行完后，会先清空微任务，再执行下一个宏任务
 *    - 微任务中产生宏任务：宏任务会放入队列，等待当前微任务队列清空后再执行
 * 
 * ============================================
 * 执行流程图
 * ============================================
 * 
 * 同步代码：
 *   1 → 6 → 8 → 10
 * 
 * 微任务队列（按顺序执行）：
 *   4 → 7 → 9
 * 
 * 宏任务队列（按顺序执行）：
 *   2 → (产生微任务3) → 3 → 5
 * 
 * 最终：1, 6, 8, 10, 4, 7, 9, 2, 3, 5
 */

