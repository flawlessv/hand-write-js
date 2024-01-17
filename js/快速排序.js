function sort(arr, begin, end) {
  if (begin < end) {
    let i = begin;
    let j = end;
    let empty = arr[begin];
    while (i < j) {
      while (arr[j] > empty && i < j) {
        j--;
      }
      arr[i] = arr[j];
      while (arr[i] < empty && i < j) {
        i++;
      }
      arr[j] = arr[i];
    }
    arr[i] = empty;
    sort(arr, begin, i - 1);
    sort(arr, i + 1, end);
  } else {
    return;
  }
}

let arr = [2, 3, 1, 4, 8, 7, 9, 6];
sort(arr, 0, 7);
console.log(arr);
