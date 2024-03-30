function clone(target, weakmap = new WeakMap()) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (weakmap.get(target)) {
      return weakmap.get(target);
    }
    weakmap.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone(target[key], weakmap);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
target.target = target;
console.log(clone(target));

