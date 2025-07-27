function findLengthOfLCIS(nums: number[]): number {
    /**
        dp[i]: 前i个元素，以nums[i]结尾，最长连续子序列的长度
     */
    //这里不赋值的话是因为后面可能存在不存在的
    const dp: number[] = new Array(nums.length).fill(1);
    let resMax: number = 1;
    for (let i = 1, length = nums.length; i < length; i++) {
        if (nums[i] > nums[i - 1]) {
            dp[i] = dp[i - 1] + 1;
        }
        resMax = Math.max(resMax, dp[i]);
    }
    return resMax;
};