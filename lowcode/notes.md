# 飞书低代码物料体系与编排引擎设计，字节前端专家在线评审实现工程重难点

## 你们低代码平台的物料是怎么管理的，远程物料是怎么加载的，请详细说明核心流程与方案

插件化设计

并不陌生，webpack、eslint、vue、babel、vite，都有插件化的身影

### 前置知识：插件化设计

```js
{
    plugins: [
        vue(),        // 负责通过 vite 来编译关于 vue 相关的代码
        splitChunk(),
        react()       // 负责通过 vite 来编译关于 react 相关的代码
    ]
}
```

- 插件化基座
- 插件化协议
- 插件生命周期
- 插件开发  plugin

### 具体模块化定义

物料首先要取名，Button、Image、Text、Container

- ButtonBlock
- ImageBlock
- TextBlock
- ContainerBlock

物料最重要的两个东西是什么？

- 数据协议，json 数据
- 物料渲染引擎


#### 数据协议设计

```ts
type ButtonBlock = {
    type: 'button',
    props: {
        text: string;
    },
    style: {
        color: string;
        bgColor: string;
    },
    events: {

    },
    lifeCircle: {
        onInit() {},
        onDestroy() {}
    }
}

type TextBlock = {
    type: 'text',
    props: {
        text: string;
    },
    style: {
        color: string;
        bgColor: string;
        lineHeight: number | string
    },
    events: {

    },
    lifeCircle: {
        onInit() {},
        onDestroy() {}
    }
}
```

#### 渲染引擎

组件，用来将 json 数据渲染成页面内容

Renderer，通过策略模式来负责数据转化加工、数据到组件的传递、组件渲染

```html
<!-- BlockRenderer -->

<div>
    <component :is={ImageBlock}></component>
</div>
```

### 插件化设计在物料管理中的应用

我现在有一个计算器，科学计算器、四则运算计算器、房贷利率计算器、个人所得税计算器

我们实现之初只设计计算器底座

- 计算 calculate
- 运算的规则，抽象出来，加法 + （AddRule）、减法 - （SubRule）、除法（DivRule）、乘法（MultiRule）
    - AddRule：(a, b) => a + b
    - SubRule：(a, b) => a - b
    - DivRule：(a, b) => a / b
    - MultiRule：(a, b) => a * b


## 看你简历上写自研低代码远程物料管理基座与页面编排渲染引擎，说说核心实现及详细技术点

### 远程物料

1. 发布
    1. 物料协议
    2. 产物模块化规范
2. 构建
3. 渲染