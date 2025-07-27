// 插入排序的流程如下:
// 首先，假设数组的第一个元素已经排好序了，因为它只有一个元素，所以可以认为是有序的。
// 然后，从第二个元素开始，不断与前面的有序数组元素进行比较。
// 如果当前元素小于前面的有序数组元素，则把当前元素插入到前面的合适位置。
// 否则，继续与前面的有序数组元素进行比较。
// 以此类推，直到整个数组都有序。
// 循环步骤2~5，直到最后一个元素。

/**
 * 插入排序 (Insertion Sort)
 * 
 * 核心思想：
 * 1. 将数组分为已排序区和未排序区
 * 2. 初始时，第一个元素视为已排序区
 * 3. 从未排序区取出一个元素，插入到已排序区的合适位置
 * 4. 重复这个过程，直到所有元素都插入到已排序区
 * 
 * 算法特点：
 * - 时间复杂度：O(n²) - 最坏和平均情况，O(n) - 最好情况（已排序）
 * - 空间复杂度：O(1) - 原地排序
 * - 稳定性：稳定排序
 * - 适用场景：数据量小，数据基本有序，或对稳定性有要求
 */

import { testSort } from "hy-algokit";

const insertSort = (arr: number[]) => {
  const n = arr.length;
  // 从第二个元素开始，逐个插入到已排序区
  for (let i = 1; i < n; i++) {
    const newNum = arr[i]; // 保存当前要插入的元素
    let j = i - 1; // 从已排序区的最后一个元素开始比较
    
    // 将比newNum大的元素都向后移动一位，为newNum腾出插入位置
    while (arr[j] > newNum && j >= 0) {
      arr[j + 1] = arr[j]; // 元素后移
      j-- // 继续向前比较
    }
    // 将newNum插入到正确位置
    arr[j + 1] = newNum;
  }
  return arr;
};

const insertSort2 = (arr) => {
  const n = arr.length
  for (let i = 1; i < n; i++) {
    let j = i - 1
    const newNum = arr[i] // 保存当前要插入的元素
    
    // 寻找插入位置并移动元素
    while (arr[j] > newNum && j >= 0) {
      arr[j + 1] = arr[j] // 元素后移
      j-- // 继续向前比较
    }
    // 插入元素
    arr[j + 1] = newNum
  }
  return arr
}

testSort(insertSort);
