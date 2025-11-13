// 完全拍扁函数（不需要知道深度）
function flatDeep(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatDeep(cur) : cur);
  }, []);
}

const arr = [1, [2, 3], [4, 5, 6], [7, 8, 9, 10, [11, [12, [13, 14]]]]];
console.log(flatDeep(arr), "使用flatDeep完全拍扁（不需要知道深度）");
