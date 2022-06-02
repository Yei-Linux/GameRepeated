import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useToggle } from '../../../hooks/useToggle'

describe('The useToggle hook', () => {
  it('Should get initial toggle value', () => {
    const { result } = renderHook(() => useToggle())
    const {
      current: { toggle },
    } = result

    expect(toggle).toBe(false)
  })

  it('Should valid callback prop', () => {
    const doneCallback = jest.fn()
    const { result } = renderHook(() => useToggle(doneCallback))

    act(() => result.current.handleToggle(true))
    act(() => result.current.handleToggle(false))
    act(() => result.current.handleToggle(true))

    expect(doneCallback.mock.calls.length).toBe(3)
  })

  it('Should work toggle action and change state', () => {
    const { result } = renderHook(() => useToggle())

    act(() => result.current.handleToggle(true))

    expect(result.current.toggle).toBeTruthy()
  })
})
