
// 优化下面函数入参的类型，实现一个类型校验， 两个参数要么都是string，要么都是numer
// 如果一个number，一个string ，在类型层面就报错



// 函数重载 版本
function add(a: number, b: number): string
function add(a: string, b: string): string
function add(a: string | number, b: string | number) {
    return a.toString() + b.toString();
}

add(1, 2);
add("1", "2");
add(1, "2");
add("1", 2);

// 元组版本

function add2(...args: [number, number] | [string, string]): string {
    const [a, b] = args;
    return a.toString() + b.toString();
}

add2(1, 2);
add2("1", "2");
add2(1, "2");
add2("1", 2);


// 泛型
function add3<T extends string | number>(a: T, b: T) {
    return a.toString() + b.toString()
}

add3(1, 2);
add3("1", "2");
add3(1, "2");
add3("1", 2);