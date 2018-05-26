// 加载的时候，会先把函数定义执行一次
function fn(){
    return 1;
}

console.log(fn())

function fn(){
    return 2;
}