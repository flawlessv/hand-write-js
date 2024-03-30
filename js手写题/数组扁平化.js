function flat(arr, depth = 1) {
  if (depth > 0) {
    // 以下代码还可以简化，不过为了可读性，还是....
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur);
    }, []);
  }
  return arr;
}
const arr = [1, [2, 3], [4, 5, 6], [7, 8, 9, 10, [11, [12, [13, 14]]]]];
console.log(flat(arr, 4));
console.log(arr.flat(Infinity), "Array.flat(arr)");
