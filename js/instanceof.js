function myyInstanceof(target, origin) {
  // if (typeof target !== "object" || target === null) {
  //   return false;
  // }
  // if (typeof origin !== "function") {
  //   throw new TypeError("origin must be function");
  // }
  let proto = Object.getPrototypeOf(target);
  while (proto) {
    if (proto === origin.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false
}
console.log(myyInstanceof(1, Array));
