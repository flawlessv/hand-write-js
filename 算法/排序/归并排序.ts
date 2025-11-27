import { testSort } from "hy-algokit";

/**
 * 归并排序 (Merge Sort)
 * 
 * 核心思想：
 * - 首先将一个数组一分为二，分别对左边和右边的子数组继续一分为二，一直拆分，直到每个小数组只剩下1个元素（递归拆分）。
 * - 然后再从最小的被拆分单元开始，比较左右子数组的元素，将较小的元素依次放回新数组里，把两个有序的小数组合并成一个大一点的有序数组。
 * - 重复合并过程，最终把所有被拆分的子数组逐步合并成一个有序的大数组。
 * - 归并排序的本质是“拆小组&有序合并”：先拆再排，合起来就有序了。
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
