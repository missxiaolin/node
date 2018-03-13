async function show() {
    console.log('开始')
    await new Promise((resolve, reject)=>{
        setTimeout(function(){
            console.log('异步')
            resolve()
        },5000)
    })
    console.log('结束')
}
show()