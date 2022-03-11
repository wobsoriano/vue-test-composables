import { Vue2, createApp, defineComponent, h, isVue2 } from 'vue-demi'

export interface MountResult<T> {
  result: T
  unmount: () => void
}

export interface MountOptions {
  provider?: () => void
}

export function renderComposable<T>(
  composable: () => T,
  options: MountOptions = {},
): MountResult<T> {
  return isVue2
    ? mountVue2(composable, options)
    : mountVue3(composable, options)
}

function mountVue2<T>(
  composable: () => T,
  options: MountOptions,
): MountResult<T> {
  const app = new Vue2({
    setup() {
      options.provider?.()

      const result = composable()
      const wrapper = () => result
      return { wrapper }
    },

    render() {},
  })

  app.$mount()

  return {
    result: app.wrapper(),
    unmount: () => app.$destroy(),
  }
}

function mountVue3<T>(
  composable: () => T,
  options: MountOptions,
): MountResult<T> {
  const Child = defineComponent({
    setup() {
      const result = composable()
      const wrapper = () => result
      return { wrapper }
    },
    // eslint-disable-next-line vue/require-render-return
    render() {},
  })

  const App = defineComponent({
    setup() {
      options.provider?.()
    },
    render() {
      return h(Child, { ref: 'child' })
    },
  })

  const root = document.createElement('div')
  const app = createApp(App)
  const vm = app.mount(root)

  return {
    result: (vm.$refs.child as any).wrapper(),
    unmount: () => app.unmount(),
  }
}
