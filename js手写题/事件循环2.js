console.log("script start");
async function async1() {
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2 end");
}

async1();
setTimeout(() => {
  console.log("setTimeout");
}, 0)

new Promise((resolve, reject) => {
  console.log("promise");
  resolve();
})
   .then(() => {
    console.log("then1");
   })
   .then(() => {
    console.log("then2");
   });

console.log("script end");

/**
 * ============================================
 * 执行结果（输出顺序）：
 * ============================================
 * script start
 * async2 end
 * promise
 * script end
 * async1 end
 * then1
 * then2
 * setTimeout
 * 
 * ============================================
 * 详细解析：
 * ============================================
 * 
 * 【同步代码执行阶段】
 * 1. "script start" - 同步代码，立即执行
 * 
 * 2. async1() 被调用，进入函数体
 *    - await async2() 执行，调用 async2()
 *    - async2() 中 console.log("async2 end") 是同步代码，立即输出
 *    - async2() 返回 undefined（没有 return）
 *    - await 会将 async2() 的返回值包装成 Promise.resolve(undefined)
 *    - await 后面的代码（console.log("async1 end")）会被放入微任务队列
 * 
 * 3. setTimeout(() => { console.log("setTimeout"); }, 0)
 *    - setTimeout 是宏任务，回调函数被放入宏任务队列
 *    - 注意：即使延迟为 0，setTimeout 也是宏任务，不会立即执行
 * 
 * 4. new Promise((resolve, reject) => { ... })
 *    - Promise 构造函数是同步执行的
 *    - console.log("promise") 是同步代码，立即输出
 *    - resolve() 同步执行，Promise 状态变为 fulfilled
 *    - .then(() => { console.log("then1"); }) 是微任务，被放入微任务队列
 *    - .then(() => { console.log("then2"); }) 是微任务，被放入微任务队列
 * 
 * 5. console.log("script end") - 同步代码，立即输出
 * 
 * 【同步代码执行完毕】
 * 
 * 【微任务队列执行阶段】
 * 微任务队列中的任务按顺序执行：
 * 
 * 6. await async2() 后面的代码执行
 *    - console.log("async1 end") 输出
 *    - 注意：虽然 async2() 返回的是普通值 undefined，但 await 会将其包装成 Promise
 *    - 实际上相当于：Promise.resolve(undefined).then(() => { console.log("async1 end"); })
 * 
 * 7. Promise 的第一个 .then 回调执行
 *    - console.log("then1") 输出
 *    - 返回 undefined，触发下一个 .then
 * 
 * 8. Promise 的第二个 .then 回调执行
 *    - console.log("then2") 输出
 * 
 * 【微任务队列执行完毕】
 * 
 * 【宏任务队列执行阶段】
 * 
 * 9. setTimeout 的回调函数执行
 *    - console.log("setTimeout") 输出
 * 
 * ============================================
 * 关键知识点：
 * ============================================
 * 
 * 1. 事件循环的执行顺序：
 *    同步代码 → 微任务队列 → 宏任务队列
 * 
 * 2. await 的本质：
 *    - await 后面的代码会被放入微任务队列
 *    - 即使 await 的是一个普通值（非 Promise），也会被包装成 Promise.resolve()
 *    - await async2() 相当于：
 *      Promise.resolve(async2()).then(() => {
 *        // await 后面的代码
 *      })
 * 
 * 3. Promise.then() 是微任务：
 *    - Promise 的状态改变后，.then() 的回调会被放入微任务队列
 *    - 多个 .then() 会按顺序执行
 * 
 * 4. setTimeout 是宏任务：
 *    - 即使延迟时间为 0，setTimeout 的回调也是宏任务
 *    - 宏任务会在所有微任务执行完毕后执行
 * 
 * 5. 微任务优先级高于宏任务：
 *    - 在一个事件循环中，会先执行完所有微任务，再执行宏任务
 *    - 微任务包括：Promise.then/catch/finally、queueMicrotask、await 后面的代码
 *    - 宏任务包括：setTimeout、setInterval、I/O 操作、UI 渲染等
 * 
 * ============================================
 * 执行流程图：
 * ============================================
 * 
 * [同步代码]
 *   ↓
 * script start
 *   ↓
 * async1() 调用
 *   ↓
 * async2() 执行 → async2 end (同步输出)
 *   ↓
 * await 后面的代码 → 放入微任务队列
 *   ↓
 * setTimeout → 放入宏任务队列
 *   ↓
 * Promise 构造函数 → promise (同步输出)
 *   ↓
 * resolve() → .then() 回调放入微任务队列
 *   ↓
 * script end (同步输出)
 *   ↓
 * [同步代码执行完毕]
 *   ↓
 * [微任务队列]
 *   ↓
 * async1 end (await 后面的代码)
 *   ↓
 * then1 (Promise 第一个 .then)
 *   ↓
 * then2 (Promise 第二个 .then)
 *   ↓
 * [微任务队列执行完毕]
 *   ↓
 * [宏任务队列]
 *   ↓
 * setTimeout
 *   ↓
 * [执行完毕]
 */
