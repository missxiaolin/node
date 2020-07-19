// 反柯里化 让某个函数 跨到应用的范围
Object.prototype.toString.call();
// grunt r.js gulp fis3 webpack rollup parcel 0配置
Function.prototype.uncurrying = function(){ // 
    return (str)=>{
        return this.call(str);
    }
}   
let toString = Object.prototype.toString.uncurrying();
console.log(toString('hello'));
// reduce 实现组合
let app = {
    arr:[],
    use(fn){
        this.arr.push(fn);
    },
    compose(){
        // reduce 那一节  redux的源码
        return this.arr.reduce((a,b)=>(...args)=> Promise.resolve(a(()=>b(...args))))(()=>{})
        // const dispatch = async (index)=>{
        //     if(index === this.arr.length) return;
        //    let middle =  this.arr[index];
        //    return middle(()=>dispatch(index+1));
        // }
        // return dispatch(0);
    },
    run(){
        this.compose().then(()=>{
            console.log('ok');
        })
    }
}
//add  len   sum
app.use((next)=>{
    console.log(1);
    next();
})
app.use((next)=>{
    console.log(2);
    // next();
})
app.use((next)=>{
    console.log(3);
    next();
})

app.run();