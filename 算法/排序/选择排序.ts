import { testSort } from "hy-algokit";

/**
 * 选择排序 (Selection Sort)
 * 
 * 核心思想：
 * 1. 将数组分为已排序区和未排序区
 * 2. 每次从未排序区选择最小的元素
 * 3. 将选中的最小元素放到已排序区的末尾
 * 4. 重复这个过程，直到所有元素都排序完成
 * 
 * 算法特点：
 * - 时间复杂度：O(n²) - 最坏、平均和最好情况都是
 * - 空间复杂度：O(1) - 原地排序
 * - 稳定性：不稳定排序（相同元素可能改变相对位置）
 * - 交换次数：O(n) - 比冒泡排序交换次数少
 * - 适用场景：数据量小，交换成本高的场景
 */

function selectionSort(arr: number[]): number[] {
  const length = arr.length;
  
  // 外层循环：控制排序轮数，每轮确定一个最小值的位置
  for (let i = 0; i < length - 1; i++) {
    // 内层循环：在未排序区寻找最小元素
    // 从i+1开始，因为前i个元素已经排好序
    for (let j = i + 1; j < length; j++) {
      // 如果找到更小的元素，立即交换到当前位置
      if (arr[i] > arr[j]) {
        // 使用解构赋值交换元素
        [arr[i], arr[j]] = [arr[j], arr[i]];
      } 
    }
    // 经过内层循环后，arr[i]就是未排序区的最小值
  }
  
  return arr;
}

testSort(selectionSort);
