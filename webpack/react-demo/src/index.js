import a from './common/util'
import './ts/index.ts'
import { tsxDemo } from './tsx/index.tsx'

console.log(1)
console.log(tsxDemo)

let b = () => {
    console.log(2)
}

console.log(a)

b()