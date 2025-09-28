/**
 * 手写 instanceof 操作符
 * 
 * 题目描述：
 * 实现一个自定义的 instanceof 操作符，用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 * 
 * 核心原理：
 * instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。
 * 
 * 实现思路：
 * 1. 获取对象的原型链（通过 Object.getPrototypeOf()）
 * 2. 循环遍历原型链，直到找到构造函数的 prototype 或到达原型链顶端（null）
 * 3. 如果找到匹配的 prototype，返回 true；否则返回 false
 * 
 * 测试用例：
 * - myyInstanceof([], Array) → true
 * - myyInstanceof({}, Object) → true  
 * - myyInstanceof(1, Number) → false (基本类型)
 * - myyInstanceof("hello", String) → false (基本类型)
 */

function myyInstanceof(target, origin) {
  // 类型检查：如果 target 不是对象类型或为 null，直接返回 false
  if (typeof target !== "object" || target === null) {
    return false;
  }
  
  // 类型检查：如果 origin 不是函数，抛出类型错误
  if (typeof origin !== "function") {
    throw new TypeError("Right-hand side of 'instanceof' is not a constructor");
  }
  
  // 获取目标对象的原型
  let proto = Object.getPrototypeOf(target);
  
  // 沿着原型链向上查找
  while (proto) {
    // 如果找到匹配的原型，返回 true
    if (proto === origin.prototype) return true;
    // 继续向上查找原型链
    proto = Object.getPrototypeOf(proto);
  }
  
  // 遍历完整个原型链都没找到，返回 false
  return false;
}

// 测试用例
console.log("=== instanceof 手写实现测试 ===");
console.log("myyInstanceof([], Array):", myyInstanceof([], Array)); // true
console.log("myyInstanceof({}, Object):", myyInstanceof({}, Object)); // true
console.log("myyInstanceof(1, Number):", myyInstanceof(1, Number)); // false
console.log("myyInstanceof('hello', String):", myyInstanceof('hello', String)); // false

// 对比原生 instanceof
console.log("\n=== 原生 instanceof 对比 ===");
console.log("[] instanceof Array:", [] instanceof Array); // true
console.log("{} instanceof Object:", {} instanceof Object); // true
