// parse 把代码code 变成ast
import { parse } from '@babel/parser'
// traverse 遍历ast进行修改
import traverse from '@babel/traverse'
// generate 把ast 变成代码code2
import generate from '@babel/generator'


const code = `let a = 'let'; let b = 2`
const ast = parse(code, {
    sourceType: "module"
})

traverse(ast, {
    enter: item => {
        if (item.node.type === 'VariableDeclaration') {
            if(item.node.kind === 'let') {
                item.node.kind = 'var'
            }
        }
    }
})
const result = generate(ast, {}, code)

console.log(result.code)