// function setProp () {
//     return function (target) {
//         // ...
//     }
// }
// function setName() {
//     console.log('get setName')
//     return (target) => {
//         console.log('setName')
//     }
// }
// function setAge() {
//     console.log('get setAge')
//     return (target) => {
//         console.log('setAge')
//     }
// }
// @setName()
// @setAge()
// class ClassDec {

// }

// let sign = null
// function setName(name: string) {
//     return (target: new() => any) => {
//         sign = target
//         console.log(target.name)
//     }
// }
// @setName('lison')
// class ClassDec {
//     constructor() {}
// }
// console.log(sign === ClassDec)
// console.log(sign === ClassDec.prototype.constructor)

// function addName(constructor: new() => any) {
//     constructor.prototype.name = 'lison'
// }
// @addName
// class ClassD {}
// interface ClassD {
//     name: string
// }
// const d = new ClassD()
// console.log(d.name)

// function classDecorator<T extends new(...args: any[]) => {}>(target: T) {
//     return class extends target {
//         public newProperty = 'new property'
//         public hello = 'override'
//     }
// }
// function classDecorator(target: any): any {
//     return class {
//         public newProperty = 'new property'
//         public hello = 'override'
//     }
// }
// @classDecorator
// class Greeter {
//     public property = 'property'
//     public hello: string
//     constructor(m: string) {
//         this.hello = m
//     }
// }
// console.log(new Greeter('world'))

// configurable
// writeable
// enumerable
interface ObjWithAnyKeys {
    [key: string]: any
}
let obj12: ObjWithAnyKeys = {
    age: 18,
}
Object.defineProperty(obj12, 'name', {
    value: 'lison',
    // writable: false,
    writable: false,
    // configurable: true,
    configurable: false,
    // enumerable: false,
    enumerable: true,
})
// Object.defineProperty(obj12, 'name', {
//     value: 'lison',
//     writable: true,
// })
// console.log(obj12.name)
// obj12.name = 'test'
// console.log(obj12.name)
// for (const key in obj12) {
//     console.log(key)
// }

// function enumerable(bool: boolean) {
//     return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//         console.log(target, propertyName)
//         descriptor.enumerable = bool
//     }
// }
// function enumerable(bool: boolean): any {
//     return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//         return {
//             value() {
//                 return 'not age'
//             },
//             enumerable: bool,
//         }
//     }
// }
// class ClassF {
//     constructor(public age: number) {}
//     @enumerable(false)
//     public getAge() {
//         return this.age
//     }
// }
// const classF = new ClassF(18)
// console.log(classF.getAge())
// for (const key in classF) {
//     console.log(key)
// }

// function enumerable(bool: boolean) {
//     return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//         descriptor.enumerable = bool
//     }
// }
// class ClassG {
//     private _name: string
//     constructor(name: string) {
//         this._name = name
//     }
//     @enumerable(true)
//     get name() {
//         return this._name
//     }
//     set name(name) {
//         this._name = name
//     }
// }
// const classG = new ClassG('lison')
// for (const key in classG) {
//     console.log(key)
// }

// function printPropertyName(target: any, propertyName: string) {
//     console.log(propertyName)
// }
// class ClassH {
//     @printPropertyName
//     public name: string
// }

function required(target: any, propertName: string, index: number) {
    console.log(`修饰的是${propertName}的第${index + 1}个参数`)
}
class ClassI {
    public name: string = 'lison'
    public age: number = 18
    public getInfo(prefix: string, @required infoType: string): any{
        return prefix + ' ' + this[infoType]
    }
}
interface ClassI {
    [key: string]: string | number | Function
}
const classI = new ClassI()
classI.getInfo('hihi', 'age')
