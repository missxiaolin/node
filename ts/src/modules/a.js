// export const name = 'lison'
// export const age = 18
// export const address = 'beijing'
const name = 'lison'
const age = 18
const address = 'beijing'

export { name, age, address }

export function func () {}
export class A {}

function func1 () {}
class B {}
const b = ''
export {
    func1 as Function1,
    B as ClassB,
    b as StringB,
    b as String
}

// export 'lison' // error
// const name = 'lison'
// export name // error

