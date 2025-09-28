/**
 * 手写 Promise.all 方法
 * 
 * 题目描述：
 * 实现 Promise.all 方法，该方法接收一个 Promise 数组（或可迭代对象），
 * 返回一个新的 Promise，当所有输入的 Promise 都成功时，返回所有结果的数组；
 * 如果任何一个 Promise 失败，则立即返回失败的结果。
 * 
 * 核心特性：
 * 1. 并发执行：所有 Promise 同时开始执行，不是串行
 * 2. 顺序保证：结果数组的顺序与输入数组的顺序一致
 * 3. 快速失败：任何一个 Promise 失败，整个 Promise.all 立即失败
 * 4. 空数组处理：如果输入为空数组，立即返回空数组
 * 5. 类型兼容：支持 Promise 和非 Promise 值混合
 * 
 * 实现要点：
 * 1. 使用计数器跟踪完成的 Promise 数量
 * 2. 使用索引保证结果顺序
 * 3. 处理边界情况（空数组、非迭代对象等）
 * 4. 使用 Promise.resolve() 统一处理 thenable 对象和普通值
 */

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    // 类型检查：参数必须是可迭代对象
    if (typeof promises[Symbol.iterator] !== "function") {
      reject(new TypeError("参数必须是可迭代对象"));
      return;
    }
    
    // 转换为数组以便获取长度和索引访问
    const promiseArray = Array.from(promises);
    const len = promiseArray.length;
    
    // 边界情况：空数组直接返回空数组
    if (len === 0) {
      resolve([]);
      return;
    }
    
    // 存储结果的数组
    const results = [];
    // 计数器：记录已完成的 Promise 数量
    let completedCount = 0;
    
    // 遍历所有 Promise
    for (let i = 0; i < len; i++) {
      // 使用 Promise.resolve() 统一处理：
      // - 如果是 Promise，直接返回
      // - 如果是 thenable 对象，转换为 Promise
      // - 如果是普通值，包装为已解决的 Promise
      Promise.resolve(promiseArray[i])
        .then((data) => {
          // 将结果存储在对应的索引位置，保证顺序
          results[i] = data;
          // 增加完成计数
          completedCount++;
          
          // 当所有 Promise 都完成时，解决整个 Promise.all
          if (completedCount === len) {
            resolve(results);
          }
        })
        .catch((error) => {
          // 任何一个 Promise 失败，立即拒绝整个 Promise.all
          reject(error);
        });
    }
  });
};

// 测试用例
console.log("=== Promise.all 手写实现测试 ===");

// 测试用例1：所有 Promise 都成功
const test1 = () => {
  console.log("\n--- 测试1：所有 Promise 成功 ---");
  const promises1 = [
    Promise.resolve(1),
    Promise.resolve(2),
    new Promise(resolve => setTimeout(() => resolve(3), 100)),
    Promise.resolve(4)
  ];
  
  Promise.myAll(promises1)
    .then(results => {
      console.log("成功结果:", results); // [1, 2, 3, 4]
    })
    .catch(error => {
      console.log("失败:", error);
    });
};

// 测试用例2：有一个 Promise 失败
const test2 = () => {
  console.log("\n--- 测试2：有 Promise 失败 ---");
  const promises2 = [
    Promise.resolve(1),
    Promise.reject(new Error("第二个失败了")),
    Promise.resolve(3)
  ];
  
  Promise.myAll(promises2)
    .then(results => {
      console.log("成功结果:", results);
    })
    .catch(error => {
      console.log("失败:", error.message); // "第二个失败了"
    });
};

// 测试用例3：空数组
const test3 = () => {
  console.log("\n--- 测试3：空数组 ---");
  Promise.myAll([])
    .then(results => {
      console.log("空数组结果:", results); // []
    })
    .catch(error => {
      console.log("失败:", error);
    });
};

// 测试用例4：混合 Promise 和普通值
const test4 = () => {
  console.log("\n--- 测试4：混合类型 ---");
  const promises4 = [
    1,                    // 普通值
    Promise.resolve(2),   // Promise
    "hello",             // 字符串
    Promise.resolve(4)    // Promise
  ];
  
  Promise.myAll(promises4)
    .then(results => {
      console.log("混合类型结果:", results); // [1, 2, "hello", 4]
    })
    .catch(error => {
      console.log("失败:", error);
    });
};

// 执行测试
test1();
setTimeout(test2, 200);
setTimeout(test3, 400);
setTimeout(test4, 600);