import './lib-flexible'
import rem from './rem'
let a = `
.a {
    width: 100px;
}
`
console.log(rem.prototype.generateRem(a))
console.log(rem.prototype.getRemValue('rem', '100px'))
console.log(100/75)