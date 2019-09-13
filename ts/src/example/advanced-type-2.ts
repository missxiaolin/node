class Counters {
    constructor(public count: number = 0) {}
    public add(value: number) {
        this.count += value
        return this
    }
    public subtract(value: number) {
        this.count -= value
        return this
    }
}
let counter1 = new Counters(10)
// console.log(counter1.add(3).subtract(2))

class PowCounter extends Counters {
    constructor(public count: number = 0) {
        super(count)
    }
    public pow(value: number) {
        this.count = this.count ** value
        return this
    }
}
let powCounter = new PowCounter(2)
// console.log(powCounter.pow(3).add(1).subtract(3))

// keyof
interface InfoInterfaceAdvanced {
    name: string;
    age: number;
}
let infoProp: keyof InfoInterfaceAdvanced
infoProp = 'name'
infoProp = 'age'
// infoProp = 'sex'

function getValue<T, K extends keyof T>(obj: T, names: K[]): Array<T[K]> {
    return names.map((n) => obj[n])
}
const infoObj = {
    name: 'lison',
    age: 18,
}
let infoValues: Array<string | number> = getValue(infoObj, ['name', 'age'])
// console.log(infoValues)

// [] 索引访问操作符
type NameTypes = InfoInterfaceAdvanced['name']

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]
}

interface Objs<T> {
    [key: string]: T
}
const objs1: Objs<number> = {
    age: 18,
}
let keys: Objs<number>['name']

interface Type {
    a: never;
    b: never;
    c: string;
    d: number;
    e: undefined;
    f: null;
    g: object
}
type Test = Type[keyof Type]

interface Info1 {
    age: number;
    name: string;
    sex: string;
}
type ReadonlyType<T> = {
    +readonly [P in keyof T]?: T[P]
}
type ReadonlyInfo1 = ReadonlyType<Info1>
let info11: ReadonlyInfo1 = {
    age: 18,
    name: 'lison',
    sex: 'man',
}
type RemoveReadonlyInfo2<T> = {
    -readonly [P in keyof T]-?: T[P]
}
type Info1WithoutReadonly = RemoveReadonlyInfo2<ReadonlyInfo1>
// info11.age = 20

// Readonly Partial
// Pick Record
// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P]
// }
interface Info2 {
    name: string;
    age: number;
    address: string;
}
const info5: Info2 = {
    name: 'lison',
    age: 18,
    address: 'beijing',
}
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const res: any = {}
    keys.map((key) => {
        res[key] = obj[key]
    })
    return res
}
const nameAndAddress = pick(info5, ['name', 'address'])
// console.log(nameAndAddress)

function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
    const res: any = {}
    for (const key in obj) {
        res[key] = f(obj[key])
    }
    return res
}
const names = { 0: 'hello', 1: 'world', 2: 'bye' }
const lengths = mapObject(names, (s) => s.length)
// console.log(lengths)

type Proxy<T> = {
    get(): T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
}
function proxify<T>(obj: T): Proxify<T> {
    const result = {} as Proxify<T>
    for (const key in obj) {
        result[key] = {
            get: () => obj[key],
            set: (value) => obj[key] = value,
        }
    }
    return result
}
let props = {
    name: 'lison',
    age: 18,
}
let proxyProps = proxify(props)
proxyProps.name.set('li')
// console.log(proxyProps.name.get())

function unproxify<T>(t: Proxify<T>): T {
    const result = {} as T
    for (const k in t) {
        result[k] = t[k].get()
    }
    return result
}
let originalProps = unproxify(proxyProps)
// console.log(originalProps)

const stringIndex = 'a'
const numberIndex = 1
const symbolIndex = Symbol()
type Objs2 = {
    [stringIndex]: string,
    [numberIndex]: number,
    [symbolIndex]: symbol,
}
type keysType = keyof Objs2
type ReadonlyTypes<T> = {
    readonly [P in keyof T]: T[P]
}
let objs3: ReadonlyTypes<Objs2> = {
    a: 'aa',
    1: 11,
    [symbolIndex]: Symbol(),
}
// objs3.a = 'bb'

type MapToPromise<T> = {
    [K in keyof T]: Promise<T[K]>
}
type Tuple = [number, string, boolean]
type promiseTuple = MapToPromise<Tuple>
let tuple1: promiseTuple = [
    new Promise((resolve, reject) => resolve(1)),
    new Promise((resolve, reject) => resolve('a')),
    new Promise((resolve, reject) => resolve(false)),
]

// unknown
// [1] 任何类型都可以赋值给unknown类型
let value1: unknown
value1 = 'a'
value1 = 123

// [2] 如果没有类型断言或基于控制流的类型细化时，unknown不可以赋值给其他类型，此时他只能赋值给unknown和any类型
let value2: unknown
// let value3: string = value2
value1 = value2

// [3] 如果没有类型断言或基于控制流的类型细化时，不能在他上面进行任何操作
let value4: unknown
// value4 += 1

// [4] unknown与任何其他类型组成的交叉类型，最后都等于其他类型
type type1 = string & unknown
type type2 = number & unknown
type type3 = unknown & unknown
type type4 = unknown & string[]

// [5] unknown与任何其他类型(除了any是any)组成的联合类型，都等于unknown类型
type type5 = unknown | string
type type6 = any | unknown
type type7 = number[] | unknown

// [6] never类型是unknown的子类型
type type8 = never extends unknown ? true : false

// [7] keyof unknown 等于类型never
type type9 = keyof unknown

// [8] 只能对unknown进行等或不等操作，不能进行其他操作
// value1 === value2
// value1 !== value2
// value1 += value2

// [9] unknown类型的值不能访问他的属性、作为函数调用和作为类创建实例
let value10: unknown
// value10.age
// value10()
// new value10()

// [10] 使用映射类型时如果遍历的是unknown类型，则不会映射任何属性
type Types1<T> = {
    [P in keyof T]: number
}
type type11 = Types1<any>
type type12 = Types1<unknown>

// T extends U ? X : Y
type Types2<T> = T extends string ? string : number
// let index: Types2<false>

// type TypeName<T> = T extends any ? T : never
// type Type3 = TypeName<string | number>

type TypeName<T> =
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean :
    T extends undefined ? undefined :
    T extends () => void ? () => void :
    object
type Type4 = TypeName<() => void>
type Type5 = TypeName<string[]>
type Type6 = TypeName<(() => void) | string[]>

type Diff<T, U> = T extends U ? never : T
type Test2 = Diff<string | number | boolean, undefined | number>

type Type7<T> = {
    [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
interface Part {
    id: number;
    name: string;
    subparts: Part[];
    undatePart(newName: string): void
}
type Test1 = Type7<Part>

// infer
type Type8<T> = T extends any[] ? T[number] : T
type Test3 = Type8<string[]>
type Test4 = Type8<string>

type Type9<T> = T extends Array<infer U> ? U : T
type Test5 = Type9<string[]>
type Test6 = Type9<string>

// Exclude<T, U>
type Type10 = Exclude<'a' | 'b' | 'c', 'a'>

// Extract<T, U>
type Type11 = Extract<'a' | 'b' | 'c', 'c' | 'b'>

// NonNullable<T>
type Type12 = NonNullable<string | number | null | undefined>

// ReturnType<T>
type Type13 = ReturnType<() => string>
type Type14 = ReturnType<() => void>

// InstanceType<T>
class AClass {
    constructor() {}
}
type T1 = InstanceType<typeof AClass>
type T2 = InstanceType<any>
type T3 = InstanceType<never>
// type T4 = InstanceType<string>
