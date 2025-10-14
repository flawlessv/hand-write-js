/**
 * 题目：合并两个有序数组
 * LeetCode: https://leetcode.cn/problems/merge-sorted-array/
 * 
 * 题目描述：
 * 给你两个按非递减顺序排列的整数数组 arr1 和 arr2，请你将它们合并为一个有序数组。
 * 
 * 示例：
 * 输入：arr1 = [1,2,3,0,0,0], arr2 = [2,5,6]
 * 输出：[1,2,2,3,5,6]
 * 
 * 算法思路：
 * 使用双指针技术，分别指向两个数组的开头，比较两个指针指向的元素大小，
 * 将较小的元素放入结果数组，然后移动对应的指针。
 * 
 * 时间复杂度：O(m + n)，其中 m 和 n 分别是两个数组的长度
 * 空间复杂度：O(m + n)，用于存储合并后的数组
 */
function mergeSortedArrays(arr1, arr2) {
    const mergedArray = []; // 存储合并后的结果数组
    let i = 0; // arr1 的指针索引
    let j = 0; // arr2 的指针索引
  
    // 双指针遍历，比较两个数组中的元素
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        // arr1 当前元素较小，将其加入结果数组
        mergedArray.push(arr1[i]);
        i++; // 移动 arr1 指针
      } else {
        // arr2 当前元素较小或相等，将其加入结果数组
        mergedArray.push(arr2[j]);
        j++; // 移动 arr2 指针
      }
    }
  
    // 将 arr1 中剩余的元素添加到合并后的数组
    // 如果 arr1 还有剩余元素，说明这些元素都比 arr2 中的所有元素大
    while (i < arr1.length) {
      mergedArray.push(arr1[i]);
      i++;
    }
  
    // 将 arr2 中剩余的元素添加到合并后的数组
    // 如果 arr2 还有剩余元素，说明这些元素都比 arr1 中的所有元素大
    while (j < arr2.length) {
      mergedArray.push(arr2[j]);
      j++;
    }
  
    return mergedArray; // 返回合并后的有序数组
  }

// 测试用例
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]
console.log(mergeSortedArrays([1, 2, 3], [4, 5, 6])); // [1, 2, 3, 4, 5, 6]
console.log(mergeSortedArrays([], [1, 2, 3])); // [1, 2, 3]