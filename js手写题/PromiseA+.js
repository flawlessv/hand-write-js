// MyPromise.js - 简化版本

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      // 如果 executor 执行过程中抛出异常，需要捕获并转换为 Promise 的 rejected 状态
      // 这样即使 executor 中同步抛出错误，也能被正确处理
      this.reject(error)
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  // 更改成功后的状态
  // 使用箭头函数的原因：确保 this 指向当前 MyPromise 实例
  // 如果使用普通函数，当作为参数传递时 this 可能会丢失
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    // Promise 的状态一旦改变就不能再改变（pending -> fulfilled 或 pending -> rejected）
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  // 更改失败后的状态
  // 使用箭头函数的原因：确保 this 指向当前 MyPromise 实例
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    // Promise 的状态一旦改变就不能再改变（pending -> fulfilled 或 pending -> rejected）
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    // 判断状态
    if (this.status === FULFILLED) {
      // 如果状态已经是 fulfilled，立即执行成功回调
      // 注意：这里应该返回一个新的 Promise 以支持链式调用（当前为简化版本）
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      // 如果状态已经是 rejected，立即执行失败回调
      // 注意：这里应该返回一个新的 Promise 以支持链式调用（当前为简化版本）
      onRejected(this.reason);
    } else if (this.status === PENDING) {
      // ==== 新增 ====
      // 如果状态还是 pending，说明 Promise 还在执行中
      // 因为不知道后面状态的变化（成功还是失败），这里先将回调函数存储起来
      // 等待 Promise 状态确定后（resolve 或 reject 被调用时），再执行对应的回调
      // 这样可以支持在 Promise 状态确定之前就调用 then 方法
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    }
  }

  // catch 方法，实际上是 then(null, onRejected) 的语法糖
  catch(onRejected) {
    // 为什么这样写？
    // 1. catch 方法本质上就是只处理错误情况的 then 方法
    // 2. then(null, onRejected) 表示：成功时不做任何处理（第一个参数为null），失败时执行 onRejected
    // 3. 这样写可以复用 then 方法的逻辑，避免重复代码
    // 4. 同时保持了 Promise 链式调用的特性，因为 then 方法会返回一个新的 Promise
    return this.then(null, onRejected);
  }

  // resolve 静态方法
  // 作用：将传入的值转换为一个已解决的 Promise
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    // 原因：如果已经是 Promise 对象，不需要再包装一层，直接返回即可
    // 这样可以避免不必要的嵌套，保持 Promise 链的扁平化
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式：将普通值（非 Promise）包装成已解决的 Promise
    // 这样无论传入什么值，都能统一返回 Promise 对象，方便链式调用
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }

  // reject 静态方法
  // 作用：创建一个已拒绝的 Promise
  // 与 resolve 不同，reject 不需要判断参数类型，直接创建一个拒绝状态的 Promise
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  // all 静态方法
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      // 如果传入的不是可迭代对象，直接 reject
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }

      // 如果传入空数组，直接 resolve
      if (promises.length === 0) {
        return resolve([]);
      }

      const results = [];
      let completedCount = 0;

      promises.forEach((promise, index) => {
        // 将每个值转换为 Promise（使用 resolve 可以处理非 Promise 值）
        MyPromise.resolve(promise).then(
          (value) => {
            // 使用 index 保存结果，而不是 push
            // 原因：Promise.all 要求结果数组的顺序与输入数组的顺序一致
            // 由于 Promise 是异步的，完成的顺序可能和输入顺序不同
            // 例如：promises[1] 可能比 promises[0] 先完成
            // 使用 results[index] = value 可以确保结果放在正确的位置
            results[index] = value;
            completedCount++;

            // 当所有 Promise 都完成时，resolve 结果数组
            // 注意：这里不能用 results.length === promises.length 来判断
            // 因为使用索引赋值时，数组长度可能小于实际元素数量
            if (completedCount === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            // 如果任何一个 Promise 失败，立即 reject
            // 注意：一旦有 Promise 失败，后续的 Promise 结果会被忽略
            reject(reason);
          }
        );
      });
    });
  }
}

// function resolvePromise(promise2, x, resolve, reject) {
//   // 如果相等了，说明return的是自己，抛出类型错误并返回
//   if (promise2 === x) {
//     return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
//   }
//   // 判断x是不是 MyPromise 实例对象
//   if(x instanceof MyPromise) {
//     // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
//     // x.then(value => resolve(value), reason => reject(reason))
//     // 简化之后
//     x.then(resolve, reject)
//   } else{
//     // 普通值
//     resolve(x)
//   }
// }

module.exports = MyPromise;
