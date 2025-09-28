/**
 * 手写 new 操作符
 * 
 * 题目描述：
 * 实现一个自定义的 new 操作符，模拟 JavaScript 中 new 关键字的行为。
 * new 操作符用于创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
 * 
 * new 操作符的执行过程：
 * 1. 创建一个新的空对象
 * 2. 将新对象的原型链接到构造函数的 prototype 属性
 * 3. 将构造函数的 this 绑定到新对象，并执行构造函数
 * 4. 如果构造函数返回一个对象，则返回该对象；否则返回新创建的对象
 * 
 * 关键点：
 * - 原型链的正确设置
 * - this 绑定的处理
 * - 构造函数返回值的判断（基本类型 vs 对象类型）
 * 
 * 测试场景：
 * - 普通构造函数
 * - 构造函数返回对象
 * - 构造函数返回基本类型
 */

function myNew(constructor, ...args) {
  // 参数验证：确保第一个参数是函数
  if (typeof constructor !== 'function') {
    throw new TypeError('myNew 的第一个参数必须是构造函数');
  }
  
  // 1. 创建一个新的空对象
  const newObj = {};
  
  // 2. 将新对象的原型链接到构造函数的 prototype 属性
  // 使用 Object.setPrototypeOf 或 __proto__ 都可以
  Object.setPrototypeOf(newObj, constructor.prototype);
  // 或者: newObj.__proto__ = constructor.prototype;
  
  // 3. 将构造函数的 this 绑定到新对象，并执行构造函数
  const result = constructor.apply(newObj, args);
  
  // 4. 判断构造函数的返回值
  // 如果构造函数返回一个对象，则返回该对象
  // 否则返回新创建的对象
  return (typeof result === 'object' && result !== null) ? result : newObj;
}

// 测试用例
console.log("=== myNew 手写实现测试 ===");

// 测试构造函数1：普通构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function() {
    return `Hello, I'm ${this.name}`;
  };
}

Person.prototype.getAge = function() {
  return this.age;
};

console.log("\n--- 测试1：普通构造函数 ---");
const person1 = myNew(Person, "张三", 25);
const person2 = new Person("李四", 30);

console.log("myNew 创建的对象:", person1);
console.log("原生 new 创建的对象:", person2);
console.log("person1.sayHello():", person1.sayHello());
console.log("person1.getAge():", person1.getAge());
console.log("person1 instanceof Person:", person1 instanceof Person);

// 测试构造函数2：返回对象的构造函数
function PersonWithReturn(name) {
  this.name = name;
  // 构造函数显式返回一个对象
  return {
    customName: name,
    type: 'custom'
  };
}

console.log("\n--- 测试2：构造函数返回对象 ---");
const person3 = myNew(PersonWithReturn, "王五");
const person4 = new PersonWithReturn("赵六");

console.log("myNew 创建的对象:", person3);
console.log("原生 new 创建的对象:", person4);
console.log("person3 instanceof PersonWithReturn:", person3 instanceof PersonWithReturn);

// 测试构造函数3：返回基本类型的构造函数
function PersonWithPrimitive(name) {
  this.name = name;
  // 构造函数返回基本类型，应该被忽略
  return "这是一个字符串";
}

console.log("\n--- 测试3：构造函数返回基本类型 ---");
const person5 = myNew(PersonWithPrimitive, "孙七");
const person6 = new PersonWithPrimitive("周八");

console.log("myNew 创建的对象:", person5);
console.log("原生 new 创建的对象:", person6);
console.log("person5.name:", person5.name);
console.log("person5 instanceof PersonWithPrimitive:", person5 instanceof PersonWithPrimitive);

// 测试构造函数4：使用箭头函数（应该报错）
const ArrowFunction = (name) => {
  this.name = name;
};

console.log("\n--- 测试4：错误处理 ---");
try {
  const person7 = myNew(ArrowFunction, "测试");
} catch (error) {
  console.log("捕获到错误:", error.message);
}

// 验证原型链
console.log("\n--- 验证原型链 ---");
console.log("person1.__proto__ === Person.prototype:", person1.__proto__ === Person.prototype);
console.log("Object.getPrototypeOf(person1) === Person.prototype:", Object.getPrototypeOf(person1) === Person.prototype);