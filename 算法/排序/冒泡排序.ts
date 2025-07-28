import { testSort } from "hy-algokit";

/**
 * 冒泡排序 (Bubble Sort)
 * 
 * 核心思想：
 * 1. 重复遍历要排序的数组
 * 2. 每次比较相邻的两个元素，如果顺序错误就交换它们
 * 3. 每一轮遍历后，最大的元素会"冒泡"到数组末尾
 * 4. 重复这个过程，直到没有需要交换的元素
 * 
 * 算法特点：
 * - 时间复杂度：O(n²) - 最坏和平均情况
 * - 空间复杂度：O(1) - 原地排序
 * - 稳定性：稳定排序
 * - 适用场景：数据量小，对稳定性有要求
 */

let ex = [8, 95, 34, 21, 53, 12];

const bubbleArr = (arr: number[]) => {
  const length = arr.length;
  
  // 外层循环：控制排序轮数，每轮确定一个最大值的位置
  for (let i = 0; i < length - 1; i++) {
    // 优化标志：如果一轮中没有发生交换，说明数组已经有序
    // let isSwapped = false;
    
    // 内层循环：比较相邻元素，将最大值"冒泡"到末尾
    // 每轮循环后，最后i个元素已经排好序，所以只需要比较到length-i-1
    for (let j = 0; j < length - 1 - i; j++) {
      // 如果前一个元素大于后一个元素，则交换它们
      if (arr[j] > arr[j + 1]) {
        // 交换相邻元素
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        // isSwapped = true; // 标记发生了交换
      }
    }
    
    // 优化：如果这一轮没有发生交换，说明数组已经有序，可以提前退出
    // if (!isSwapped) {
    //   break;
    // }
  }
  
  return arr;
};

testSort(bubbleArr);
