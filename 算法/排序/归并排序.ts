import { testSort } from "hy-algokit";

/**
 * 归并排序 (Merge Sort)
 * 
 * 核心思想：
 * 1. 分治策略：将数组递归地分成两半，直到每个子数组只有一个元素
 * 2. 合并操作：将两个有序的子数组合并成一个有序数组
 * 3. 递归排序：对左右两个子数组分别进行归并排序
 * 4. 自底向上：从最小的有序数组开始，逐步合并成完整的有序数组
 * 
 * 算法特点：
 * - 时间复杂度：O(n log n) - 最坏、平均和最好情况都是
 * - 空间复杂度：O(n) - 需要额外的数组来存储合并结果
 * - 稳定性：稳定排序
 * - 适用场景：大数据量排序，对稳定性有要求，外部排序
 */

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr; // 递归终止条件：当数组长度小于等于1时，已经有序
  
  // 1. 分解：对数组进行分解（分解成两个小数组）
  // 1.1 切割数组
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);   // 左半部分
  const rightArr = arr.slice(mid);     // 右半部分
  
  // 1.2 递归的切割leftArr和rightArr
  const newLeftArr = mergeSort(leftArr);
  const newRightArr = mergeSort(rightArr);
  
  // 2. 合并：将两个子数组进行合并（双指针）
  const newArr: number[] = [];
  let i = 0; // 左数组指针
  let j = 0; // 右数组指针
  
  // 双指针合并：比较两个数组的元素，将较小的放入结果数组
  while (i < newLeftArr.length && j < newRightArr.length) {
    if (newLeftArr[i] <= newRightArr[j]) {
      newArr.push(newLeftArr[i]);
      i++;
    } else {
      newArr.push(newRightArr[j]);
      j++;
    }
  }
  
  // 判断是否某一个数组中还有剩余数组
  // 循环结束后左边还有剩余  
  if (i < newLeftArr.length) {
    newArr.push(...newLeftArr.slice(i));
  }
  
  // 循环结束后右边还有剩余
  if (j < newRightArr.length) {
    newArr.push(...newRightArr.slice(j));
  }
  
  return newArr;
}

testSort(mergeSort);

// console.log(mergeSort([165, 138, 145, 16, 130, 144, 26, 189, 20, 42]));
