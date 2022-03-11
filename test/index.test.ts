import { renderComposable } from "../src"
import { useCounter } from "./useCounter"
import { test, expect } from "vitest"

test("should increment count", () => {
  const { result } = renderComposable(() => useCounter())

  expect(result.count.value).toBe(0)
  result.increment()
  expect(result.count.value).toBe(1)
})
