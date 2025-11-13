/**
 * 随机数生成算法
 * 
 * 本文件包含了几种生成随机数的方法：
 * 1. 生成指定范围内的随机浮点数
 * 2. 生成指定范围内的随机整数（不包含最大值）
 * 3. 生成指定范围内的随机整数（包含最大值和最小值）
 * 
 * 使用的 API：
 * - Math.random(): 返回 [0, 1) 之间的随机浮点数
 * - Math.ceil(x): 向上取整，返回大于等于 x 的最小整数
 *   @example Math.ceil(4.1) // 5, Math.ceil(-4.1) // -4
 * - Math.floor(x): 向下取整，返回小于等于 x 的最大整数
 *   @example Math.floor(4.9) // 4, Math.floor(-4.9) // -5
 */

// 生成 2 到 32 之间的随机浮点数（包含2，不包含32）
console.log(Math.random() * (32 - 2) + 2);

/**
 * 生成指定范围内的随机整数（不包含最大值，包含最小值）
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（不包含）
 * @returns {number} 返回 [min, max) 范围内的随机整数
 * 
 * @example
 * getRandomInt(1, 10) // 可能返回 1, 2, 3, 4, 5, 6, 7, 8, 9（不会返回10）
 */
function getRandomInt(min, max) {
  // Math.ceil(min): 向上取整，确保最小值为整数
  // 例如：Math.ceil(2.1) = 3, Math.ceil(2.0) = 2
  min = Math.ceil(min);
  // Math.floor(max): 向下取整，确保最大值为整数
  // 例如：Math.floor(10.9) = 10, Math.floor(10.0) = 10
  max = Math.floor(max);
  // Math.random() 生成 [0, 1) 的随机数
  // (max - min) 是范围大小
  // Math.random() * (max - min) 生成 [0, max-min) 的随机数
  // 加上 min 后得到 [min, max) 的随机数
  // 使用 Math.floor 向下取整得到整数
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

/**
 * 生成指定范围内的随机整数（包含最大值和最小值）
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（包含）
 * @returns {number} 返回 [min, max] 范围内的随机整数
 * 
 * @example
 * getRandomIntInclusive(1, 10) // 可能返回 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
 */
function getRandomIntInclusive(min, max) {
  // Math.ceil(min): 向上取整，确保最小值为整数
  // 例如：Math.ceil(2.1) = 3, Math.ceil(2.0) = 2
  min = Math.ceil(min);
  // Math.floor(max): 向下取整，确保最大值为整数
  // 例如：Math.floor(10.9) = 10, Math.floor(10.0) = 10
  max = Math.floor(max);
  // 与 getRandomInt 的区别在于：max - min + 1
  // 这样 Math.random() * (max - min + 1) 生成 [0, max-min+1) 的随机数
  // 加上 min 后得到 [min, max+1) 的随机数
  // 使用 Math.floor 向下取整后得到 [min, max] 的随机整数
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}
