/**
 * 手写浅拷贝函数
 * 
 * 题目描述：
 * 实现一个浅拷贝函数，只复制对象的第一层属性。
 * 如果属性是基本类型，拷贝的就是基本类型的值；
 * 如果属性是引用类型，拷贝的就是内存地址。
 * 
 * 浅拷贝 vs 深拷贝：
 * - 浅拷贝：只拷贝一层，深层次的引用类型则共享内存地址
 * - 深拷贝：递归拷贝所有层级，完全独立的副本
 * 
 * 常见的浅拷贝方法：
 * 1. Object.assign()
 * 2. 扩展运算符 {...obj}
 * 3. Array.prototype.slice()（数组）
 * 4. Array.prototype.concat()（数组）
 * 
 * 应用场景：
 * - 对象的第一层属性修改不影响原对象
 * - 性能要求较高，不需要深层拷贝
 * - React 中的 state 更新（浅比较）
 */

// 方法一：手写实现
function shallowClone(obj) {
  // 类型检查：只处理对象类型
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  // 区分数组和对象
  const newObj = Array.isArray(obj) ? [] : {};
  
  // 遍历对象的可枚举属性
  // for in 遍历对象返回的是对象的key，遍历数组返回的是索引
  for (let prop in obj) {
    // 只拷贝对象自身的属性，不包括继承的属性
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  
  return newObj;
}

// 方法二：使用 Object.keys 实现
function shallowClone2(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  const newObj = Array.isArray(obj) ? [] : {};
  
  // 使用 Object.keys 获取所有可枚举的自有属性
  Object.keys(obj).forEach(key => {
    newObj[key] = obj[key];
  });
  
  return newObj;
}

// 方法三：使用 Object.assign 实现
function shallowClone3(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  // 对于数组，使用 slice 方法
  if (Array.isArray(obj)) {
    return obj.slice();
  }
  
  // 对于对象，使用 Object.assign
  return Object.assign({}, obj);
}

// 测试用例
console.log("=== 浅拷贝测试 ===");

// 创建测试对象
const originalObj = {
  name: "张三",
  age: 25,
  hobbies: ["读书", "游泳", "编程"],
  address: {
    city: "北京",
    district: "朝阳区"
  },
  sayHello: function() {
    return `Hello, I'm ${this.name}`;
  }
};

console.log("原始对象:", originalObj);

// 测试不同的浅拷贝方法
const cloned1 = shallowClone(originalObj);
const cloned2 = Object.assign({}, originalObj);
const cloned3 = { ...originalObj };

console.log("\n=== 验证浅拷贝效果 ===");

// 修改第一层属性
cloned1.name = "李四";
cloned1.age = 30;

console.log("修改拷贝对象的第一层属性后:");
console.log("原对象 name:", originalObj.name); // "张三" (不受影响)
console.log("拷贝对象 name:", cloned1.name);   // "李四"

// 修改嵌套对象属性
cloned1.address.city = "上海";
cloned1.hobbies.push("旅游");

console.log("\n修改拷贝对象的嵌套属性后:");
console.log("原对象 address.city:", originalObj.address.city); // "上海" (受影响!)
console.log("拷贝对象 address.city:", cloned1.address.city);   // "上海"
console.log("原对象 hobbies:", originalObj.hobbies); // 包含"旅游" (受影响!)
console.log("拷贝对象 hobbies:", cloned1.hobbies);   // 包含"旅游"

// 验证引用关系
console.log("\n=== 验证引用关系 ===");
console.log("对象本身是否相等:", originalObj === cloned1); // false
console.log("嵌套对象是否相等:", originalObj.address === cloned1.address); // true (浅拷贝特点)
console.log("数组是否相等:", originalObj.hobbies === cloned1.hobbies); // true (浅拷贝特点)
console.log("函数是否相等:", originalObj.sayHello === cloned1.sayHello); // true

// 测试数组的浅拷贝
console.log("\n=== 数组浅拷贝测试 ===");
const originalArray = [1, 2, [3, 4], { name: "test" }];
const clonedArray1 = shallowClone(originalArray);
const clonedArray2 = originalArray.slice();
const clonedArray3 = [...originalArray];

// 修改嵌套数组
clonedArray1[2].push(5);
clonedArray1[3].name = "modified";

console.log("原数组:", originalArray); // [1, 2, [3, 4, 5], { name: "modified" }]
console.log("拷贝数组:", clonedArray1); // [1, 2, [3, 4, 5], { name: "modified" }]

// 常用的浅拷贝方法对比
console.log("\n=== 常用浅拷贝方法对比 ===");
const testObj = { a: 1, b: { c: 2 } };

console.log("Object.assign:", Object.assign({}, testObj));
console.log("扩展运算符:", { ...testObj });
console.log("手写实现:", shallowClone(testObj));
