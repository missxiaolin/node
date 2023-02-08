// 请求函数
const getList = () => {
    return new Promise((resolve, reject) => {
        //步骤一:创建ajax对象
        var ajax = new XMLHttpRequest();
        //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数
        ajax.open('get', 'http://127.0.0.1:9000');
        //步骤三:发送请求
        ajax.send();
        //步骤四: 注册事件 onreadystatechange 状态改变就会调用
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
                resolve(JSON.parse(ajax.responseText))
            }
        }
    })
}

// 获取container对象
const container = document.getElementById('container');
const blank = document.getElementById('blank');
// 直接渲染
// const renderList = async () => {
//     console.time('列表加载时间')
//     const list = await getList();
//     list.forEach(item => {
//         const div = document.createElement('div')
//         div.className = 'item'
//         div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
//         container.appendChild(div)
//     })
//     console.timeEnd('列表加载时间')
// }


// setTimeout分页渲染

// const renderList = async () => {
//     console.time('列表加载时间')
//     const list = await getList()
//     const total = list.length
//     const page = 0
//     const limit = 200
//     const totalPage = Math.ceil(total / limit)

//     const render = (page) => {
//         if (page >= totalPage) return
//         setTimeout(() => {
//             for (let i = page * limit; i < page * limit + limit; i++) {
//                 const item = list[i]
//                 const div = document.createElement('div')
//                 div.className = 'item'
//                 div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
//                 container.appendChild(div)
//             }
//             render(page + 1)
//         }, 0)
//     }
//     render(page)
//     console.timeEnd('列表加载时间')
// }

// requestAnimationFrame

// const renderList = async () => {
//     console.time('列表加载时间')
//     const list = await getList()
//     const total = list.length
//     const page = 0
//     const limit = 200
//     const totalPage = Math.ceil(total / limit)

//     const render = (page) => {
//         if (page >= totalPage) return
//         // 使用requestAnimationFrame代替setTimeout
//         requestAnimationFrame(() => {
//             for (let i = page * limit; i < page * limit + limit; i++) {
//                 const item = list[i]
//                 const div = document.createElement('div')
//                 div.className = 'item'
//                 div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
//                 container.appendChild(div)
//             }
//             render(page + 1)
//         })
//     }
//     render(page)
//     console.timeEnd('列表加载时间')
// }

// 文档碎片 + requestAnimationFrame
// const renderList = async () => {
//     console.time('列表加载时间')
//     const list = await getList()
//     const total = list.length
//     const page = 0
//     const limit = 200
//     const totalPage = Math.ceil(total / limit)

//     const render = (page) => {
//         if (page >= totalPage) return
//         requestAnimationFrame(() => {
//             // 创建一个文档碎片
//             const fragment = document.createDocumentFragment()
//             for (let i = page * limit; i < page * limit + limit; i++) {
//                 const item = list[i]
//                 const div = document.createElement('div')
//                 div.className = 'item'
//                 div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
//                 // 先塞进文档碎片
//                 fragment.appendChild(div)
//             }
//             // 一次性appendChild
//             container.appendChild(fragment)
//             render(page + 1)
//         })
//     }
//     render(page)
//     console.timeEnd('列表加载时间')
// }


//  懒加载  IntersectionObserver


const renderList = async () => {
    console.time('列表时间')
    const list = await getList()
    const total = list.length
    const page = 0
    const limit = 200
    const totalPage = Math.ceil(total / limit)

    const render = (page) => {
        if (page >= totalPage) {
            observer.unobserve(blank);
            return
        } 
        // 创建一个文档碎片
        const fragment = document.createDocumentFragment()
        for (let i = page * limit; i < page * limit + limit; i++) {
            const item = list[i]
            const div = document.createElement('div')
            div.className = 'item'
            div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
            // 先塞进文档碎片
            fragment.appendChild(div)
        }
        // 一次性appendChild
        container.insertBefore(fragment, blank)
    }

    let observer = new IntersectionObserver(entries => {
        // 防止插入瞬间再次触发离开交叉事件
            if (entries[0].intersectionRatio === 0) return
            render(page + 2.16.0 1)
    })
    observer.observe(blank);
    render(page)
    console.timeEnd('列表时间')
}

renderList();
