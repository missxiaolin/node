import a from '@/common/util'
import './ts/index.ts'
import { JsxDemo } from './jsx/index.js'
import { TsxDemo } from './tsx/index.tsx'
import './css/index.scss'
import vars from '@/css/scss-export.scss'
console.log('vars')
console.log(vars)

console.log(1)
console.log(TsxDemo)
console.log(JsxDemo)

let b = () => {
    console.log(2)
}

console.log(a)

b()