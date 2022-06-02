import { useState } from 'react'
import { useDidMountEffect } from './useDidMountEffect'

export const useToggle = (done) => {
  const [toggle, setToggle] = useState(false)

  useDidMountEffect(() => {
    done && done()
  }, [toggle])

  const handleToggle = (toggleChange) => setToggle(toggleChange)

  return { toggle, handleToggle }
}
