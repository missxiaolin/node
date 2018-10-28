# node

### js 测试

### Queue & Stack

#### Install

    yarn add queue-stack

or

    npm i queue-stack --save

#### Useage

    import { Queue, Stack } from 'queue-stack'

*Queue*

```js
    const queue = new Queue()
    queue.push('a')
    queue.pop()
    queue.size()
    queue.empty()
    queue.front()
    queue.back()
```

*Stack*

```js
    const stack = new Stack()
    stack.push('a')
    stack.pop()
    stack.size()
    stack.empty()
    stack.top()
```

