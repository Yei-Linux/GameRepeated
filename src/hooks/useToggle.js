import { useState } from 'react'

export const useToggle = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = (toggleChange) => setToggle(toggleChange)

  return { toggle, handleToggle }
}
