import { useEffect } from 'react'
export type OrPromise<T> = T | Promise<T>
export function isAsyncFunction(
  fn: Function
): fn is (...arg: any) => Promise<any> {
  return (fn as any).__proto__.constructor.toString().includes('AsyncFunction')
}

export default function useOnce(
  cb: (stats: {
    readonly isUnmounted: boolean
  }) => OrPromise<void | (() => void)>
): void {
  return useEffect(() => {
    let isUnmounted = false
    const state = {
      get isUnmounted() {
        return isUnmounted
      },
    }

    const onUnmount = () => {
      isUnmounted = true
    }

    if (isAsyncFunction(cb)) {
      cb(state)
      return onUnmount
    }

    const callback = (cb(state) ?? (() => 1)) as () => void
    return () => {
      onUnmount()
      callback()
    }
  }, [cb])
}
