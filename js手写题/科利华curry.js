/**
 * 手写柯里化函数 (Curry)
 * 
 * 题目描述：
 * 实现一个柯里化函数，将接受多个参数的函数转换为接受单一参数的函数序列。
 * 柯里化是函数式编程中的一个重要概念，它可以提高函数的复用性和灵活性。
 * 
 * 柯里化的定义：
 * 柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
 * 并且返回接受余下的参数而且返回结果的新函数的技术。
 * 
 * 核心特点：
 * 1. 参数复用：可以预设部分参数
 * 2. 延迟执行：参数收集完毕后才执行
 * 3. 函数组合：便于函数的组合和复用
 * 
 * 应用场景：
 * 1. 参数复用（如配置函数）
 * 2. 函数组合和管道
 * 3. 事件处理函数的预设参数
 * 4. 数据处理的链式调用
 * 
 * 实现原理：
 * 1. 收集参数，直到参数个数等于原函数的参数个数
 * 2. 使用递归或闭包来实现参数的累积
 * 3. 当参数足够时，执行原函数并返回结果
 */

// 基础版柯里化实现
function curry(fn) {
  return function curried(...args) {
    // 如果传入的参数个数大于等于原函数的参数个数，直接执行
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // 否则返回一个新函数，继续收集参数
      return function (...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// 无限参数柯里化（不依赖函数长度）
function curryInfinite(fn) {
  return function curried(...args) {
    if (args.length === 0) {
      // 无参数调用时执行函数
      return fn.apply(this, []);
    }
    
    return function (...nextArgs) {
      if (nextArgs.length === 0) {
        // 无参数调用时执行函数
        return fn.apply(this, args);
      }
      // 继续收集参数
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// 测试函数
function add(a, b, c) {
  return a + b + c;
}

function multiply(a, b, c, d) {
  return a * b * c * d;
}

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

// 测试用例
console.log("=== 柯里化函数测试 ===");

// 基础柯里化测试
console.log("\n--- 基础柯里化测试 ---");
const curriedAdd = curry(add);

console.log("curriedAdd(1)(2)(3):", curriedAdd(1)(2)(3)); // 6
console.log("curriedAdd(1, 2)(3):", curriedAdd(1, 2)(3)); // 6
console.log("curriedAdd(1)(2, 3):", curriedAdd(1)(2, 3)); // 6
console.log("curriedAdd(1, 2, 3):", curriedAdd(1, 2, 3)); // 6
/**
 * 柯里化的优缺点总结：
 * 
 * 优点：
 * 1. 参数复用：可以预设部分参数，创建更具体的函数
 * 2. 函数组合：便于创建函数管道和组合
 * 3. 延迟执行：可以分步收集参数，最后执行
 * 4. 代码复用：提高函数的复用性和灵活性
 * 
 * 缺点：
 * 1. 性能开销：每次调用都会创建新函数，有一定性能损耗
 * 2. 调试困难：调用栈可能变得复杂，不易调试
 * 3. 可读性：对于不熟悉函数式编程的开发者可能难以理解
 * 4. 内存占用：闭包会保持对外部变量的引用，可能导致内存泄漏
 */
