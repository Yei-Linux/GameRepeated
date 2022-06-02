/* eslint-disable testing-library/no-debugging-utils */
import Button from '../../../../../components/ui/atoms/Button'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('The Button component', () => {
  const defaultProps = {
    variation: 'primary',
    children: 'UI Button',
    onClick: jest.fn(),
    disable: false,
    type: 'button',
    css: {},
    className: 'button',
  }

  const setupComponent = (props = defaultProps) => render(<Button {...props} />)

  it('Should render component the user will see', () => {
    const { asFragment } = setupComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('Should style button by variation prop', () => {
    const { children } = defaultProps
    const variation = 'bdprimary'
    setupComponent({
      ...defaultProps,
      variation,
    })

    const button = screen.getByText(children)

    expect(button).toHaveClass(`button--${variation}`)
  })

  it('Should call the click method when it is provided', () => {
    const { children, onClick } = defaultProps
    setupComponent()
    const button = screen.getByText(children)

    userEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('Should css prop inherit into component', () => {
    const { children } = defaultProps
    const css = {
      width: '400px',
      height: '150px',
    }
    setupComponent({
      ...defaultProps,
      css,
    })
    const button = screen.getByText(children)

    expect(button).toHaveStyle(css)
  })

  it('Should disable button when prop its provided', () => {
    const { children } = defaultProps
    setupComponent({
      ...defaultProps,
      disable: true,
    })

    const button = screen.getByText(children)

    expect(button).toHaveClass('button--disable')
  })
})
