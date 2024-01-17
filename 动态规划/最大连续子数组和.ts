// function maxArr(arr: number[]): number {
//   const dp: number[] = [];
//   dp[0] = arr[0];
//   const n = arr.length;
//   for (let i = 1; i < n; i++) {
//     dp[i] = Math.max(arr[i], arr[i] + dp[i - 1]);
//   }
//   return Math.max(...dp);
// }
function maxArr(arr: number[]): number {
  let preValue = arr[0];
  let max = preValue;
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    preValue = Math.max(arr[i], arr[i] + preValue);
    max = Math.max(preValue, max);
  }
  return max;
}
console.log(maxArr([2, 3, -2, 1, 5, -2, 5, 7, -10, 2, 8]));
