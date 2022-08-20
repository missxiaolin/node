import a from '@/common/util'
import './ts/index.ts'
import { JsxDemo } from './jsx/index.js'
import { tsxDemo } from './tsx/index.tsx'
import './css/index.scss'

console.log(1)
console.log(tsxDemo)
console.log(JsxDemo)

let b = () => {
    console.log(2)
}

console.log(a)

b()