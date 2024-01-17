function curry(fn) {
  console.log(fn);
  console.log(fn.length);
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}
function add(a, b, c) {
  return a + b + c;
}
// 上述实现中，curry 函数接收一个函数作为参数，并返回一个新的函数 curried。
//当传入的参数个数不小于原函数 fn 的参数个数时，直接调用 fn 并返回结果。
//否则，返回一个新的函数，该函数接收更多的参数，并递归调用 curried 函数。
// 实现要点:1、采用递归
// 2、每次调用收集参数，一直到收集到的参数个数等于传入函数的参数个数就执行传入函数

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 输出 6
console.log(curriedAdd(1, 2)(3)); // 输出 6
console.log(curriedAdd(1)(2, 3)); // 输出 6
