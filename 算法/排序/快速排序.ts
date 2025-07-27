import { testSort } from "hy-algokit";

/**
 * 快速排序 (Quick Sort)
 * 
 * 核心思想：
 * 1. 分治策略：选择一个基准元素(pivot)，将数组分为两部分
 * 2. 分区操作：小于pivot的元素放在左边，大于pivot的元素放在右边
 * 3. 递归排序：对左右两个子数组分别进行快速排序
 * 4. 合并：由于是原地排序，不需要合并操作
 * 
 * 算法特点：
 * - 时间复杂度：O(n log n) - 平均情况，O(n²) - 最坏情况（已排序或逆序）
 * - 空间复杂度：O(log n) - 平均情况，O(n) - 最坏情况（递归栈深度）
 * - 稳定性：不稳定排序
 * - 适用场景：大数据量排序，实际应用中效率很高
 */

function quickSort(arr: number[]): number[] {
  partition(0, arr.length - 1);
  
  function partition(left: number, right: number) {
    if (left >= right) return; // 递归终止条件：当左边界大于等于右边界时
    
    // 找到基准元素（选择最右边的元素作为pivot）
    const pivot = arr[right];
    
    // 双指针进行交换操作（左边都是比pivot小的数字，右边都是比pivot大的数字）
    let i = left; // i指针：从左向右寻找大于等于pivot的元素
    let j = right - 1; // j指针：从右向左寻找小于等于pivot的元素
    
    while (i <= j) {
      // 当左侧找到比pivot大的数字
      while (arr[i] < pivot) {
        i++;
      }
      // 当右侧找到比pivot小的数字
      while (arr[j] > pivot) {
        j--;
      }
      // 交换位置
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }
    // 此时i一定在j的右边,交换pivot的位置
    [arr[i], arr[right]] = [arr[right], arr[i]];
    // 左右继续划分区域
    partition(left, j);
    partition(i + 1, right);
  }
  return arr;
}

testSort(quickSort);