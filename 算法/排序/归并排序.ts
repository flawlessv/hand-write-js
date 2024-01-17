import { testSort } from "hy-algokit";

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  //   1；分解：对数组进行分解（分解成两个小数组）
  //   1.1切割数组
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);
  //   1.2递归的切割leftArr和rightArr
  const newLeftArr = mergeSort(leftArr);
  const newRightArr = mergeSort(rightArr);
  //    2.合并：将两个子数组进行合并（双指针）
  const newArr: number[] = [];
  let i = 0;
  let j = 0;
  while (i < newLeftArr.length && j < newRightArr.length) {
    if (newLeftArr[i] <= newRightArr[j]) {
      newArr.push(newLeftArr[i]);
      i++;
    } else {
      newArr.push(newRightArr[j]);
      j++;
    }
  }
  //   判断是否某一个数组中还有剩余数组
  //循环结束后左边还有剩余  
  if (i < newLeftArr.length) {
    newArr.push(...newLeftArr.slice(i));
  }
  
  //循环结束后右边还有剩余
  if (j < newRightArr.length) {
    newArr.push(...newRightArr.slice(j));
  }
  return newArr;
}
testSort(mergeSort)

// console.log(mergeSort([165, 138, 145, 16, 130, 144, 26, 189, 20, 42]));
