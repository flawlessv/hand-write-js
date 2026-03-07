/**
 * 手写 new 操作符
 *
 * 题目描述：
 * 实现一个 myNew(Constructor, ...args)，行为与 new Constructor(...args) 一致。
 * 用于理解 new 的四个步骤：创建对象、绑定原型、执行构造函数、根据返回值决定返回谁。
 *
 * 核心步骤：
 * 1. 创建一个新对象，其 __proto__ 指向构造函数的 prototype
 * 2. 以该对象为 this 执行构造函数，传入 args
 * 3. 若构造函数返回了对象/函数，则返回该返回值；否则返回新创建的对象
 *
 * 注意：若 Constructor 不是函数，应抛出类型错误。
 *
 * @param {Function} Constructor 构造函数
 * @param {...any} args 构造函数的参数
 * @returns {Object}
 */
function myNew(Constructor, ...args) {
  if (typeof Constructor !== "function") {
    throw new TypeError("Constructor must be a function");
  }

  const instance = Object.create(Constructor.prototype);
  const result = Constructor.apply(instance, args);

  if (result !== null && (typeof result === "object" || typeof result === "function")) {
    return result;
  }
  return instance;
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 手写 new 测试 ===");

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHi = function () {
  return `Hi, I'm ${this.name}`;
};

const p1 = myNew(Person, "Alice", 18);
console.log(p1.name, p1.age);
console.log(p1.sayHi());
console.log(p1 instanceof Person);

function F() {
  return { tag: "custom" };
 }
const f = myNew(F);
console.log(f.tag);

module.exports = myNew;
