# vue-test-composables

Test composables in Vue 2 and 3.

## Installation:

```bash
pnpm add vue-test-composables -D
```

If your app is using Vue 2, you also need to install the composition api: `@vue/composition-api`.

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

You can unmount the underlying component by using unmount helper returned by mount to trigger onUnmounted and related lifecycle hooks:

```ts
const { result, unmount } = renderComposable(() => useCounter())

// Unmount underlying comonent to trigger lifecycle hooks
unmount()
```

### Provide/Inject

```ts
import { renderComposable } from 'vue-test-composables'
import { computed, inject, provide } from 'vue'

function useCounter() {
  const store = inject('store')
  const count = computed(() => store.count)

  return {
    count,
  }
}

test('should be injected', () => {
  const { result } = renderComposable(() => useCounter(), {
    provider: () => {
      provide('store', {
        count: 10,
      })
    },
  })
  expect(result.count.value).toBe(10)
})
```

## Credits

This is a fork of [vue-composable-tester](https://github.com/ktsn/vue-composable-tester) with some modifications using [vue-demi](https://github.com/vueuse/vue-demi/).

## License

MIT