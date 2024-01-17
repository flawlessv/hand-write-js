import { testSort } from "hy-algokit";
let ex = [8, 95, 34, 21, 53, 12];
const bubbleArr = (arr: number[]) => {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    let isSwapped = false;
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        isSwapped = true;
      }
    }
    if (!isSwapped) {
      break;
    }
  }
  return arr;
};
testSort(bubbleArr);
