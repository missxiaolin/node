// const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
//     let res = {} as T & U
//     res = Object.assign(arg1, arg2)
//     return res
// }
// mergeFunc({ a: 'a' }, { b: 'b' })

// const getLengthFunc = (content: string | number): number => {
//     if (typeof content === 'string') { return content.length }
//     else { return content.toString().length }
// }
// console.log(getLengthFunc(false))

const valueList = [{}, () => {}]
const getRandomValue = () => {
    const number = Math.random() * 10
    if (number < 5) { return valueList[0] }
    else { return valueList[1] }
}
const item = getRandomValue()
// function isString(value: number | string): value is string {
//     return typeof value === 'string'
// }
// if ((item as string).length) {
//     console.log((item as string).length)
// } else {
//     console.log((item as number).toFixed())
// }
// string/number/boolean/symbol中的一种
// if (typeof item === 'undefined') {
//     console.log(item.toString())
// } else {
//     console.log(item())
// }

// class CreatedByClass1 {
//     public age = 18
//     constructor() {}
// }
// class CreatedByClass2 {
//     public name = 'lison'
//     constructor() {}
// }
// function getRandomItem() {
//     return Math.random() < 0.5 ? new CreatedByClass1() : new CreatedByClass2()
// }
// const item1 = getRandomItem()
// if (item1 instanceof CreatedByClass1) {
//     console.log(item1.age)
// } else {
//     console.log(item1.name)
// }

// null/undefined
let values = '123'
// values = undefined
// string|undefined / string | null / string | undefined | null
const sumFunc = (x: number, y?: number) => {
    return x + (y || 0)
}

// const getLengthFunction = (value: string | null): number => {
//     // if (value === null) { return 0 }
//     // else { return value.length }
//     return (value || '').length
// }

// function getSplicedStr(num: number | null): string {
//     function getRes(prefix: string) {
//         return prefix + num!.toFixed().toString()
//     }
//     num = num || 0.1
//     return getRes('lison-')
// }
// console.log(getSplicedStr(3.03))

type TypeString = string
let str2: TypeString
type PositionType<T> = { x: T, y: T }
const postion1: PositionType<number> = {
    x: 1,
    y: -1,
}
const postion2: PositionType<string> = {
    x: 'left',
    y: 'top',
}
// type Childs<T> = {
//     current: T,
//     child?: Childs<T>,
// }
// let ccc: Childs<string> = {
//     current: 'first',
//     child: {
//         current: 'second',
//         child: {
//             current: 'third',
//         },
//     },
// }
// type Childs = Childs[] // error

// extends implements
type Alias = {
    num: number,
}
interface Interface {
    num: number
}
let _alias: Alias = {
    num: 123,
}
let _interface: Interface = {
    num: 321,
}
_alias = _interface

type Name = 'Lison'
// const name3: Name = 'haha'
type Direction = 'north' | 'east' | 'south' | 'west'
function getDirectionFirstLetter(direction: Direction) {
    return direction.substr(0, 1)
}
// console.log(getDirectionFirstLetter('north'))

type Age = 18
interface InfoInterfaces {
    name: string
    age: Age
}
const _info: InfoInterfaces = {
    name: 'lison',
    age: 18,
}

/**
 * 可辨识联合两要素
 * 1. 具有普通的单例类型属性
 * 2. 一个类型别名包含了哪些类型的联合
 */
interface Square {
    kind: 'square'
    size: number
}
interface Rectangle {
    kind: 'rectangle'
    height: number
    width: number
}
interface Circle {
    kind: 'circle'
    radius: number
}
type Shape = Square | Rectangle | Circle
function assertNever(value: never): never {
    throw new Error('Unexpected object: ' + value)
}
function getArea(s: Shape): number {
    switch (s.kind) {
        case 'square': return s.size * s.size; break;
        case 'rectangle': return s.height * s.width; break;
        case 'circle': return Math.PI * s.radius ** 2; break;
        default: return assertNever(s)
    }
}
