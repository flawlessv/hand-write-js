/**
 * 手写 call、apply、bind
 *
 * 题目描述：
 * 实现 Function.prototype.call、apply、bind 的等效实现，用于改变函数执行时的 this，并传入参数。
 *
 * 区别：
 * - call(thisArg, arg1, arg2, ...) 参数逐个传入
 * - apply(thisArg, [arg1, arg2, ...]) 参数以数组传入
 * - bind(thisArg, arg1, ...)(moreArgs) 返回新函数，不立即执行；支持 new 调用时忽略 thisArg
 *
 * 思路：
 * 将函数挂到临时对象上调用，利用“谁调用 this 就是谁”来绑定 this；
 * bind 需合并预设参数与后续参数，且若返回的函数被 new 调用，应忽略传入的 this（以新对象为 this）。
 *
 * @see 函数柯里化.js（bind 与柯里化的区别：bind 固定 this + 可选固定前若干参数）
 */

function myCall(fn, thisArg, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("myCall 第一个参数必须是函数");
  }
  const key = Symbol("call");
  const context = thisArg != null ? Object(thisArg) : globalThis;
  context[key] = fn;
  const result = context[key](...args);
  delete context[key];
  return result;
}

function myApply(fn, thisArg, argsArray) {
  if (typeof fn !== "function") {
    throw new TypeError("myApply 第一个参数必须是函数");
  }
  const key = Symbol("apply");
  const context = thisArg != null ? Object(thisArg) : globalThis;
  context[key] = fn;
  const result = context[key](...(argsArray || []));
  delete context[key];
  return result;
}

function myBind(fn, thisArg, ...presetArgs) {
  if (typeof fn !== "function") {
    throw new TypeError("myBind 第一个参数必须是函数");
  }
  const bound = function (...moreArgs) {
    const isNew = this instanceof bound;
    const context = isNew ? this : (thisArg != null ? Object(thisArg) : globalThis);
    return fn.apply(context, presetArgs.concat(moreArgs));
  };
  if (fn.prototype) {
    bound.prototype = Object.create(fn.prototype);
  }
  return bound;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 手写 call / apply / bind 测试 ===");

function greet(greeting, punct) {
  return `${greeting}, ${this.name}${punct}`;
}
const obj = { name: "World" };

console.log(myCall(greet, obj, "Hello", "!"));
console.log(myApply(greet, obj, ["Hi", "?"]));

const boundGreet = myBind(greet, obj, "Hey");
console.log(boundGreet("~"));

module.exports = { myCall, myApply, myBind };
