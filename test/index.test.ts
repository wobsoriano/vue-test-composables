import { expect, test } from 'vitest'
import { ref } from 'vue-demi'
import { renderComposable } from '../src'

function useCounter() {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return {
    count,
    increment,
  }
}

test('should increment count', () => {
  const { result } = renderComposable(() => useCounter())

  expect(result.count.value).toBe(0)
  result.increment()
  expect(result.count.value).toBe(1)
})
