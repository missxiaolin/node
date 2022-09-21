// 获取container对象
const container = document.getElementById("container");
const bottom = document.getElementById("bottom");
let renderData = "";
// 请求函数
const getAllList = () => {
  return new Promise((resolve, reject) => {
    var ajax = new XMLHttpRequest();
    ajax.open("get", "http://127.0.0.1:9000");
    ajax.send();
    // 注册事件 onreadystatechange 状态改变就会调用
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        // 页面数据有了
        resolve(JSON.parse(ajax.responseText));
      }
    };
  });
};
// 在 JS 的 EventLoop中，当JS引擎所管理的执行栈中的事件以及所有微任务事件全部执行完后，才会触发渲染线程对页面进行渲染
// 1：直接渲染
renderData = async () => {
  console.time("渲染耗时");
  const list = await getAllList();
  list.forEach((item) => {
    const div = document.createElement("div");
    div.className = "wrap";
    div.innerHTML = `<img src="${item.imgUrl}" /><span>${item.name}</span>`;
    container.appendChild(div);
  });
  console.timeEnd("渲染耗时");
};

// 2：setTimeout 长任务 分片渲染
renderData = async () => {
  console.time("渲染耗时");
  const list = await getAllList();
  // console.log(list)
  const total = list.length;
  const page = 0;
  const limit = 100;
  const totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) return;
    setTimeout(() => {
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i];
        const div = document.createElement("div");
        div.className = "wrap";
        div.innerHTML = `<img src="${item.imgUrl}" /><span>${item.name}</span>`;
        container.appendChild(div);
      }
      render(page + 1);
    }, 0);
  };
  render(page);
  console.timeEnd("渲染耗时");
};

// 3：requestAnimationFrame
renderData = async () => {
  console.time("渲染耗时");
  const list = await getAllList();
  // console.log(list)
  const total = list.length;
  const page = 0;
  const limit = 100;
  const totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) return;
    requestAnimationFrame(() => {
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i];
        const div = document.createElement("div");
        div.className = "wrap";
        div.innerHTML = `<img src="${item.imgUrl}" /><span>${item.name}</span>`;
        container.appendChild(div);
      }
      render(page + 1);
    }, 0);
  };
  render(page);
  console.timeEnd("渲染耗时");
};

// 4：文档碎片(documentFragment) + requestAnimationFrame

renderData = async () => {
  console.log("requestAnimationFrame");
  console.time("渲染耗时");
  const list = await getAllList();
  // console.log(list)
  const total = list.length;
  const page = 0;
  const limit = 100;
  const totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) return;
    requestAnimationFrame(() => {
      // 创建一个文档碎片
      const fragment = document.createDocumentFragment();
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i];
        const div = document.createElement("div");
        div.className = "wrap";
        div.innerHTML = `<img src="${item.imgUrl}" /><span>${item.name}</span>`;
        // 先塞进文档碎片
        fragment.appendChild(div);
        // container.appendChild(div)
      }
      // 一次性appendChild
      container.appendChild(fragment);
      render(page + 1);
    }, 0);
  };
  render(page);
  console.timeEnd("渲染耗时");
};

// 5：懒加载方案
renderData = async () => {
  console.log("懒加载方案");
  const list = await getAllList();
  // console.log(list)
  const total = list.length;
  const page = 0;
  const limit = 100;
  // 最大的页数
  const totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) return;
    requestAnimationFrame(() => {
      // 创建一个文档碎片
      const fragment = document.createDocumentFragment();
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i];
        const div = document.createElement("div");
        div.className = "wrap";
        div.innerHTML = `<img src="${item.imgUrl}" /><span>${item.name}</span>`;
        // 先塞进文档碎片
        fragment.appendChild(div);
      }
      // 一次性appendChild
      // container.appendChild(fragment);
      container.insertBefore(fragment, bottom);
      // render(page + 1);
    }, 0);
  };

  // 1. 初始化IntersectionObserver，参数为具体的处理函数
  const observer = new IntersectionObserver((entry) => {
    //changes 是被观察的元素
    // 通过这个属性判断是否在视口中
    console.log(entry[0]);
    console.log(entry[0].isIntersecting);
    if (entry[0].isIntersecting) {
      console.log("page", page);
      render(page + 1);
    }
  });
  // 2. 调用
  observer.observe(bottom);
  render(page);
};
renderData();

// 虚拟列表

// const clientHeight = container?.clientHeight;
// container.addEventListener('scroll', function () {
//     // 当前页数与最大页数的比较
//     if (page > totalPage) return;
//     const blankTop = blank?.getBoundingClientRect().top;
//     console.log('container-container', blankTop);
//     if (clientHeight === blankTop) {
//         // blank出现在视图，则当前页数加1
//         page++;
//         // render(page + 1);
//     }
// });
