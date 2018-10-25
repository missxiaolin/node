import test from 'ava'
import { Queue } from './index'

const queue = new Queue()

test('push', t => {
  t.is(queue.front(), null)
  t.is(queue.back(), null)
  queue.push('a')
  queue.push('b')
  queue.push('c')
  queue.push('d')
  t.is(queue.front(), 'a')
})

test('pop', t => {
  queue.pop();
  t.is(queue.front(), 'b')
  t.is(queue.empty(), false)
})

test('size', t => {
  queue.push('a')
  t.is(queue.size(), 4)
})

test('back', t => {
  queue.push('b')
  t.is(queue.back(), 'b')
})


