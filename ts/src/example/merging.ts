interface InfoInter {
    name: string;
    getRes(input: string): number
}
interface InfoInter {
    name: string
    getRes(input: number): string
}
let infoInter: InfoInter
infoInter = {
    name: 'lison',
    getRes(text: any): any {
        if (typeof text === 'string') { return text.length }
        else { return String(text) }
    },
}
// console.log(infoInter.getRes('123'))

// namespace Validations {
//     export const numberReg = /^[0-9]+$/
//     export const checkNumber = () => {}
// }
// namespace Validations {
//     console.log(numberReg)
//     export const checkLetter = () => {}
// }

// class Validations {
//     constructor() {}
//     public checkType() {}
// }
// namespace Validations {
//     export const numberReg = /^[0-9]+$/
// }
// console.dir(Validations.numberReg)

function countUp() {
    countUp.count++
}
namespace countUp {
    export let count = 0
}
// console.log(countUp.count)
// countUp()
// console.log(countUp.count)
// countUp()
// console.log(countUp.count)

enum Colors {
    red,
    green,
    blue,
}
namespace Colors {
    export const yellow = 3
}
console.log(Colors)
