/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it, vi } from 'vitest'
import { inject, onMounted, onUnmounted, provide, ref } from 'vue-demi'
import { renderComposable } from '../index'

describe('renderComposable', () => {
  it('returns the result of passed composable', () => {
    function useTest() {
      const test = ref('value')
      return {
        test,
      }
    }
    const { result } = renderComposable(() => useTest())
    expect(result.test.value).toBe('value')
  })

  it('mounts the underlying component', () => {
    const spy = vi.fn()
    function useTest() {
      onMounted(spy)
    }
    renderComposable(() => useTest())
    expect(spy).toHaveBeenCalled()
  })

  it('unmounts the underlying component', () => {
    const spy = vi.fn()
    function useTest() {
      onUnmounted(spy)
    }
    const { unmount } = renderComposable(() => useTest())
    expect(spy).not.toHaveBeenCalled()
    unmount()
    expect(spy).toHaveBeenCalled()
  })

  it('allows to provide a value', () => {
    function useTest() {
      const injected = inject('test')
      return {
        injected,
      }
    }

    const { result } = renderComposable(() => useTest(), {
      provider: () => {
        provide('test', 'value')
      },
    })
    expect(result.injected).toBe('value')
  })
})
