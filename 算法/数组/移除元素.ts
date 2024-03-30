function removeElement(nums: number[], val: number): number {
    let slowIndex: number = 0, fastIndex: number = 0;
    while (fastIndex < nums.length) {
        if (nums[fastIndex] !== val) {
            nums[slowIndex++] = nums[fastIndex];
        }
        fastIndex++;
    }
    return slowIndex;
};
















function removeElement1(nums: number[], val: number): number {
    let slowIndex=0
    let fastIndex=0
    while(fastIndex<nums.length){
        if(nums[fastIndex]!==val){
            nums[slowIndex++]=nums[fastIndex++]
        }else{
            fastIndex++
        }
    }
  return slowIndex

}