// https://leetcode.cn/problems/min-stack/description/?envType=study-plan-v2&envId=top-100-liked
// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// 实现 MinStack 类:

// MinStack() 初始化堆栈对象。
// void push(int val) 将元素val推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。
 

// 示例 1:

// 输入：
// ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"]
// [[], [-2], [0], [-3], [], [], [], []]

// 输出：
// [null, null, null, null, -3, null, 0, -2]

// 解释：
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); --> 返回 - 3.
// minStack.pop();
// minStack.top(); --> 返回 0.
// minStack.getMin(); --> 返回 - 2.


// 提示：

// -231 <= val <= 231 - 1
// pop、top 和 getMin 操作总是在 非空栈 上调用
// push, pop, top, and getMin最多被调用 3 * 104 次



// 本质是维护前缀最小值

// 引入：给你一个数组 nums，如何计算每个前缀的最小值？
// 定义 preMin[i] 表示 nums[0] 到 nums[i] 的最小值。
// 这可以从左到右计算：
// preMin[0] = nums[0]。
// preMin[1] = min(nums[0], nums[1])。
// preMin[2] = min(nums[0], nums[1], nums[2]) = min(preMin[1], nums[2])。
// preMin[3] = min(nums[0], nums[1], nums[2], nums[3]) = min(preMin[2], nums[3])。
// ……
// 一般地，我们有
// preMin[i] = min(preMin[i−1], nums[i])
// 回到本题
// 把 nums 视作栈，本题相当于在 nums 的末尾动态地添加 / 删除元素。
// 栈中除了保存添加的元素，还保存前缀最小值。（栈中保存的是 pair）
// 添加元素：设当前栈的大小是 n。添加元素 val 后，额外维护 preMin[n] = min(preMin[n−1], val)，其中 preMin[n−1] 是添加 val 之前，栈顶保存的前缀最小值。
// 删除元素：弹出栈顶即可。
// 细节
// 一开始栈为空（n = 0），添加 val 时，我们没有对应的 preMin[n−1]。需要特判栈为空的情况吗？

// 不需要。初始化的时候，在栈底加一个 ∞ 哨兵，作为 preMin[−1]。

// 注意题目保证 pop, top, getMin 都是在非空栈上操作的。


class MinStack {
    st: [number, number][] = []
    constructor() {
        this.st = [[0, Infinity]]
    }

    push(val: number): void {
        this.st.push([val, Math.min(this.getMin(), val)])
    }

    pop(): void {
        this.st.pop()![0]
    }

    top(): number {
        return this.st[this.st.length - 1][0]
    }

    getMin(): number {
        return this.st[this.st.length - 1][1]
    }
}
