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

  // ============================================================
  // partition 函数：快速排序的核心 - 分区操作
  // 功能：将数组划分为三部分 - 小于pivot | pivot | 大于pivot
  // 参数：left - 当前分区的左边界索引, right - 当前分区的右边界索引
  // ============================================================
  function partition(left: number, right: number) {
    // 递归终止条件
    // 如果左边界 >= 右边界，说明分区无效或只有一个元素，无需处理
    if (left >= right) return;

    // 步骤1：选择基准元素 (pivot)
    // 选择最右边的元素作为基准值（也可以选中间或随机位置的元素）
    const pivot = arr[right];

    // 步骤2：初始化双指针
    // i指针：从左向右扫描，目标是找到第一个 >= pivot 的元素
    // j指针：从右向左扫描，目标是找到第一个 <= pivot 的元素
    let i = left;           // i 从分区左边开始
    let j = right - 1;      // j 从分区右边开始（右边是pivot，所以从 right-1 开始）

    // 步骤3：双指针向中间扫描并交换
    // 循环条件 i <= j 确保两个指针还没错位
    while (i <= j) {
      // 内层循环1：移动i指针，跳过所有小于pivot的元素
      // 这些元素已经在正确的位置（左边），不需要移动
      while (arr[i] < pivot) {
        i++;  // 指针右移，直到找到 >= pivot 的元素或越界
      }

      // 内层循环2：移动j指针，跳过所有大于pivot的元素
      // 这些元素已经在正确的位置（右边），不需要移动
      while (arr[j] > pivot) {
        j--;  // 指针左移，直到找到 <= pivot 的元素或越界
      }

      // 步骤4：交换错位的元素
      // 此时 arr[i] >= pivot 且 arr[j] <= pivot，这两个元素位置反了
      // 交换后，小的去左边，大的去右边
      if (i <= j) {  // 只有指针未错位时才交换
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;  // 交换后继续移动指针
        j--;
      }
    }

    // 步骤5：将pivot放到正确的位置
    // 循环结束后，i 一定在 j 的右边（i > j）
    // 此时：
    //   - i左边的所有元素都 < pivot
    //   - i右边的所有元素都 > pivot
    //   - i 指向的是第一个 > pivot 的元素
    // 所以将 pivot 与 arr[i] 交换，pivot 就到了正确的中间位置
    [arr[i], arr[right]] = [arr[right], arr[i]];

    // 步骤6：递归排序左右两个子分区
    // 左分区：从 left 到 j（不包含pivot）
    partition(left, j);
    // 右分区：从 i+1 到 right（不包含pivot，因为pivot已经在正确位置）
    partition(i + 1, right);
  }

  // 启动快速排序：从整个数组开始分区
  partition(0, arr.length - 1);

  return arr;
}

testSort(quickSort);