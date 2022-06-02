import { useEffect, useRef } from 'react'

export const useDidMountEffect = (action, deps = []) => {
  const refValid = useRef(false)
  useEffect(() => {
    if (!refValid.current) {
      refValid.current = true
      return
    }
    action && action()
  }, deps)
}
