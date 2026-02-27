/**
 * 题目 12：手写 LRU Cache
 *
 * 题目描述：
 * 实现一个 LRU（最近最少使用）缓存，支持：
 * 1. get(key): 命中返回值，否则返回 -1
 * 2. put(key, value): 写入键值；如果超过容量，淘汰最久未使用的数据
 *
 * 要求：
 * - get/put 都尽量做到 O(1)
 *
 * 思路：
 * - 使用 Map 维护插入顺序
 * - 每次 get 命中后，先 delete 再 set，把该 key 移到“最新”位置
 * - 容量超出时，删除 Map 第一个 key（最老的）
 */

class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new TypeError("capacity 必须是大于 0 的整数");
    }

    this.capacity = capacity;
    this.cache = new Map();
  }

  /**
   * @param {string|number} key
   * @returns {any}
   */
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const value = this.cache.get(key);
    // 访问后更新“最近使用”
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  /**
   * @param {string|number} key
   * @param {any} value
   */
  put(key, value) {
    if (this.cache.has(key)) {
      // 先删再插入，更新为最新
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      // keys() 返回按插入顺序遍历 key 的迭代器；next() 返回 { value, done }，
      // 第一个 value 就是当前最久未使用（最早插入且未被刷新）的 key。
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }
}

// ---------------------------------------------------------------------------
// 示例
// ---------------------------------------------------------------------------

const lru = new LRUCache(2);
lru.put(1, "A");
lru.put(2, "B");
console.log(lru.get(1)); // A，访问 1 后顺序变为 [2,1]
lru.put(3, "C"); // 淘汰 2
console.log(lru.get(2)); // -1
lru.put(4, "D"); // 淘汰 1
console.log(lru.get(1)); // -1
console.log(lru.get(3)); // C
console.log(lru.get(4)); // D

module.exports = LRUCache;
