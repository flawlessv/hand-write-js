import { testSort } from "hy-algokit";
function quickSort(arr: number[]): number[] {
  partition(0, arr.length - 1);
  function partition(left: number, right: number) {
    if (left >= right) return;
    //找到基准元素
    const pivot = arr[right];
    //双指针进行交换操作（左边都是比pivot小的数字，右边都是比pivot大的数字）
    let i = left;
    let j = right - 1;
    while (i <= j) {
      //当左侧找到比pivot大的数字
      while (arr[i] < pivot) {
        i++;
      }
      //当右侧找到比pivot小的数字
      while (arr[j] > pivot) {
        j--;
      }
      //交换位置
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }
    //此时i一定在j的右边,交换pivot的位置
    [arr[i], arr[right]] = [arr[right], arr[i]];
    //   左右继续划分区域
    partition(left, j);
    partition(i + 1, right);
  }
  return arr;
}
testSort(quickSort);

function quick(arr){
  partition(0,arr.length-1)
  function partition(left,right){
     if(left>=right) return
     let i=left
     let j=right-1
     let pivot=right
     while(i<j){
      while(arr[i]<arr[pivot]){
         i++
      }
      while(arr[j]>arr[pivot]){
         j--
      }
      if(i<j){
        [arr[i],arr[j]]=[arr[j],arr[i]]
        i++
        j--
      }
     }
     [arr[i],arr[pivot]]=[arr[pivot],arr[i]]
     partition(left,j)
     partition(i+1,right)
  }
  return arr

}