/***
 * 浅拷贝：如果属性是基本类型，拷贝的就是基本类型的值；
如果属性是引用类型，拷贝的就是内存地址。即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址。
常用的方法有：object.assign，扩展运算符等等
 */

var a = { count: 1, deep: { count: 2 } };
var b = Object.assign({}, a);
// 或者
var c = { ...a };

// 实现一个浅拷贝
function shallowClone(obj) {
  const newObj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}
