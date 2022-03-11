# vue-test-composables

Test composables in Vue 2 and 3.

## Quick start

Install:

```bash
pnpm add vue-composition-test-utils -D
```

If your app is using Vue 2, you also need to install the composition api: `@vue/composition-api`.

Example:

### Basic usage

A simple counter composable:

```ts
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return {
    count,
    increment,
  }
}
```

To test, render it using the `renderComposable` function provided by the library:

```ts
import { renderComposable } from 'vue-test-composables'
import { useCounter } from './counter'

test('should increment count', () => {
  const { result } = renderComposable(() => useCounter())

  expect(result.count.value).toBe(0)
  result.increment()
  expect(result.count.value).toBe(1)
})
```
