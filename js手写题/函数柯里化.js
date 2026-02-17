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
/**
 * 实现函数柯里化（curry）
 * 
 * 实现思路详细解释：
 * 
 * 1. curry函数接受一个原始函数fn作为参数，返回一个新的函数curried。
 * 2. curried函数可以接收任意数量的参数（...args）。
 * 3. 检查当前收集到的参数数量args.length是否已经足够（大于等于原函数fn.length的参数个数）。
 *    - fn.length是原函数声明时预期的参数个数（不是已经传入的个数）；
 *    - 例如 function add(a, b, c) { ... } 则 add.length = 3。
 * 4. 如果参数已经收集够，直接用fn.apply(this, args)调用原函数，把所有参数传入。
 * 5. 如果参数还不够，则返回一个新的函数，继续收集下一个参数集：
 *    - 新函数接收剩下的参数（...moreArgs），
 *    - 用args.concat(moreArgs)把当前参数集合和新参数拼起来，
 *    - 递归调用curried（保持this和值不变），继续判断参数是否足够。
 * 6. 直到参数足够，最终调用fn并返回最终结果。
 *
 * 为什么这样实现：
 * - 这样做的好处是支持多种调用方式：
 *    - curried(1)(2)(3)  // 每次只传一个参数
 *    - curried(1, 2)(3)  // 第一次传两个参数
 *    - curried(1)(2, 3)  // 第二次传两个参数
 *    - curried(1, 2, 3)  // 一步到位传三个参数
 * - 闭包和递归的结合，实现了参数的记忆和累加，直到满足执行条件。
 */
function curry(fn) {
  // curried 是内部实现的递归收集参数的函数
  return function curried(...args) {
    // 如果已经收集到足够的参数，直接调用原始函数
    if (args.length >= fn.length) {
      // 这里用 apply 是为了保证 this 指向的正确性
      return fn.apply(this, args);
    } else {
      // 如果参数还不够，返回新的函数，用于继续收集
      return function (...moreArgs) {
        // 拼接之前收集到的参数和本次收到的参数
        // 递归调用 curried 以检查参数是否够了
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
