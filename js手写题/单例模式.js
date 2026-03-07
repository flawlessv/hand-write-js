/**
 * 单例模式
 *
 * 题目描述：
 * 实现单例模式：无论多少次获取，都返回同一个实例。常用于全局唯一配置、连接池、Store 等。
 *
 * 常见写法：
 * 1. 闭包 + 普通函数：在闭包里持有一个实例，未创建则 new，已创建则返回
 * 2. 类 + 静态 getInstance：构造函数私有化（或约定不直接 new），通过 getInstance() 返回唯一实例
 * 3. IIFE 立即创建：模块加载时就创建好实例并导出
 *
 * 要点：防止外部多次 new 得到不同对象，保证“唯一实例”。
 *
 * 以下给出：闭包版、Class 静态方法版。
 */

// ---------------------------------------------------------------------------
// 写法一：闭包 + 工厂函数
// ---------------------------------------------------------------------------

function createSingleton(Constructor, ...args) {
  let instance = null;
  return function getInstance() {
    if (instance == null) {
      instance = new Constructor(...args);
    }
    return instance;
  };
}
// 示例：单例 Person
function Person(name) {
  this.name = name;
}
const getPersonInstance = createSingleton(Person, "Default");

// ---------------------------------------------------------------------------
// 写法二：Class + 静态 getInstance（约定不直接 new）
// ---------------------------------------------------------------------------

class Singleton {
  static instance = null;

  constructor(name) {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.name = name;
    Singleton.instance = this;
  }

  static getInstance(name) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(name);
    }
    return Singleton.instance;
  }
}
// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

console.log("=== 单例模式测试 ===");

const a = getPersonInstance();
const b = getPersonInstance();
console.log(a === b, a.name);

const s1 = Singleton.getInstance("App");
const s2 = Singleton.getInstance("Other");
console.log(s1 === s2, s1.name);

module.exports = { createSingleton, Singleton };
