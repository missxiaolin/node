import test from 'ava'
import Queue from './index'

const queue = new Queue();

test('push', t => {
  queue.push('a')
  t.is(queue.front(), 'a')
})

test('pop', t => {
  queue.pop();
  t.is(queue.empty(), true)
})

test('size', t => {
  queue.push('a')
  t.is(queue.size(), 1)
})

test('back', t => {
  queue.push('b')
  t.is(queue.back(), 'b')
})


