// 插入排序的流程如下:
// 首先，假设数组的第一个元素已经排好序了，因为它只有一个元素，所以可以认为是有序的。
// 然后，从第二个元素开始，不断与前面的有序数组元素进行比较。
// 如果当前元素小于前面的有序数组元素，则把当前元素插入到前面的合适位置。
// 否则，继续与前面的有序数组元素进行比较。
// 以此类推，直到整个数组都有序。
// 循环步骤2~5，直到最后一个元素。
import { testSort } from "hy-algokit";
const insertSort = (arr: number[]) => {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const newNum = arr[i];
    let j = i - 1;
    while (arr[j] > newNum && j >= 0) {
      arr[j + 1] = arr[j];
      j--
    }
    arr[j + 1] = newNum;
  }
  return arr;
};
testSort(insertSort);
