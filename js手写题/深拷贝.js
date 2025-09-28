/**
 * 手写深拷贝函数
 * 
 * 题目描述：
 * 实现一个深拷贝函数，能够完全复制一个对象，包括嵌套的对象和数组，
 * 并且能够处理循环引用的情况。
 * 
 * 核心问题：
 * 1. 浅拷贝 vs 深拷贝：浅拷贝只复制对象的第一层属性，深拷贝递归复制所有层级
 * 2. 循环引用：对象内部存在相互引用，需要避免无限递归
 * 3. 不同数据类型：需要正确处理对象、数组、基本类型等
 * 
 * 实现思路：
 * 1. 使用 WeakMap 存储已经拷贝过的对象，避免循环引用
 * 2. 递归遍历对象的所有属性
 * 3. 区分数组和对象，创建对应的容器
 * 4. 对于基本类型直接返回
 * 
 * 优化点：
 * - 使用 WeakMap 而不是 Map，避免内存泄漏
 * - 支持数组和对象的深拷贝
 * - 处理 null 和 undefined 等特殊值
 */

function clone(target, weakmap = new WeakMap()) {
  // 处理基本类型和 null
  if (typeof target !== "object" || target === null) {
    return target;
  }
  
  // 检查是否已经拷贝过该对象（处理循环引用）
  if (weakmap.has(target)) {
    return weakmap.get(target);
  }
  
  // 根据目标类型创建新的容器（数组或对象）
  let cloneTarget = Array.isArray(target) ? [] : {};
  
  // 将当前对象存入 WeakMap，防止循环引用
  weakmap.set(target, cloneTarget);
  
  // 遍历目标对象的所有可枚举属性
  for (const key in target) {
    // 只处理对象自身的属性，不包括继承的属性
    if (target.hasOwnProperty(key)) {
      // 递归拷贝每个属性值
      cloneTarget[key] = clone(target[key], weakmap);
    }
  }
  
  return cloneTarget;
}

// 测试用例
console.log("=== 深拷贝测试 ===");

// 创建包含各种数据类型的测试对象
const target = {
  field1: 1,                    // 数字
  field2: undefined,            // undefined
  field3: {                     // 嵌套对象
    child: "child",
    grandChild: {
      value: "deep nested"
    }
  },
  field4: [2, 4, 8],           // 数组
  field5: null,                // null
  field6: "string",            // 字符串
  field7: true                 // 布尔值
};

// 添加循环引用
target.target = target;

// 执行深拷贝
const cloned = clone(target);

console.log("原对象:", target);
console.log("拷贝对象:", cloned);

// 验证深拷贝效果
console.log("\n=== 验证深拷贝效果 ===");
console.log("修改前 - 原对象 field3.child:", target.field3.child);
console.log("修改前 - 拷贝对象 field3.child:", cloned.field3.child);

// 修改拷贝对象的嵌套属性
cloned.field3.child = "modified child";
cloned.field4.push(16);

console.log("修改后 - 原对象 field3.child:", target.field3.child);
console.log("修改后 - 拷贝对象 field3.child:", cloned.field3.child);
console.log("修改后 - 原对象 field4:", target.field4);
console.log("修改后 - 拷贝对象 field4:", cloned.field4);

// 验证循环引用处理
console.log("\n=== 循环引用验证 ===");
console.log("原对象循环引用:", target.target === target);
console.log("拷贝对象循环引用:", cloned.target === cloned);
console.log("两个对象不相等:", target !== cloned);
