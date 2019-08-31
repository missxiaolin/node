// function add(arg: number, arg1: number): number {
//     return arg + arg1
// }
// const add = (arg: number, arg1: number) => arg + arg1

let add: (x: number, y: number) => number
add = (arg1: number, arg2: number): number => arg1 + arg2

type Add = (x: number, y: number) => number
let addFun: Add
addFun = (arg1: number, arg2: number): number => arg1 + arg2

// 可选参数?
type AddFun1 = (x: number, y: number, z?: number) => number
let addFun1: AddFun1
addFun1 = (x: number, y: number): number => x + y

// 函数默认值
addFun1 = (x: number, y: number = 3): number => x + y

// 泛型
const getArray = <T>(val: T, times: number = 5): T[] => {
    return new Array(times).fill(val)
}
console.log(getArray<number>(123, 4))

// 泛型继承
interface ValWithLenght {
    lenght: number
}

const getArray1 = <T extends ValWithLenght>(val: T, times: number = 5): T[] => {
    return new Array(times).fill(val)
}
