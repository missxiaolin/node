import test from 'ava'
import { Queue, Stack } from './index'

const queue = new Queue()

test('queue push', t => {
  t.is(queue.front(), null)
  t.is(queue.back(), null)
  queue.push('a')
  queue.push('b')
  queue.push('c')
  queue.push('d')
  t.is(queue.front(), 'a')
})

test('queue pop', t => {
  queue.pop();
  t.is(queue.front(), 'b')
  t.is(queue.empty(), false)
})

test('queue size', t => {
  queue.push('a')
  t.is(queue.size(), 4)
})

test('queue back', t => {
  queue.push('b')
  t.is(queue.back(), 'b')
})


const stack = new Stack()

test('stack push', t => {
  t.is(stack.top(), null)
  stack.push('a')
  stack.push('b')
  stack.push('c')
  stack.push('d')
  t.is(stack.top(), 'd')
})

test('stack pop', t => {
  stack.pop();
  t.is(stack.top(), 'c')
  t.is(stack.empty(), false)
})

test('stack size', t => {
  stack.push('a')
  t.is(stack.size(), 4)
})
