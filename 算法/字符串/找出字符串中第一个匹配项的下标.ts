function strStr(haystack: string, needle: string): number {
  if (needle === "" || needle.length > haystack.length) {
    return -1;
  }
  const n = needle.length;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack.substring(i, n) === needle) {
      console.log(haystack.substring(i, n + i), "-0--", haystack);
      console.log(i, n);

      return i;
    }
  }
  return -1;
}
console.log(strStr("hello", "ll"));
