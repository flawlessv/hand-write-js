import { testSort } from "hy-algokit";

function selectionSort(arr: number[]): number[] {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      } 
    }
  }
  return arr;
}
testSort(selectionSort);
