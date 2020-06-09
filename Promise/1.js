// 重写原型方法
Function.prototype.before = function(beforeFn) {
    return () => {
        beforeFn()
        this(...arguments) // 展开运算符
    }
}

const say = (...args) => {
    console.log('测试')
}