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

Example using [vue-query](https://github.com/DamianOsipiuk/vue-query)

```ts
import { useQuery, useQueryProvider } from 'vue-query'
import { renderComposable } from 'vue-test-composables'
import waitFor from 'p-wait-for'

function useUser() {
  return useQuery('user', () =>
    fetch('/api/user').then(
      res => res.json,
    ),
  )
}

test('useUser', async() => {
  const { result } = renderComposable(() => useUser(), {
    provider() {
      useQueryProvider()
    },
  })

  await waitFor(() => result.isSuccess.value)

  await expect(result.data.value).resolves.toMatchObject({
    id: 1,
    username: 'johndoe',
    email: 'johndoe@mail.com',
  })
})
```

## Credits

This is a fork of [vue-composable-tester](https://github.com/ktsn/vue-composable-tester) with some modifications using [vue-demi](https://github.com/vueuse/vue-demi/).

## License

MIT