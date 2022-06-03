import { render } from '@testing-library/react'
import CurtainReveal from '../../../../../components/ui/atoms/CurtainReveal'

describe('The CurtainReveal component', () => {
  const defaultProps = {
    isRevealed: true,
    revealCheck: () => false,
    onReveal: jest.fn(),
    onHide: jest.fn(),
    children: <p>TextUI</p>,
  }

  const component = (props = defaultProps) => <CurtainReveal {...props} />

  const setupComponent = (props = defaultProps) => render(component(props))

  it('Should validate isRevealed prop', async () => {
    const { container, rerender } = setupComponent()

    const curtainReveal = container.querySelector(
      '.makeStyles-curtain_wrapper-2'
    )

    expect(curtainReveal).toBeInTheDocument()

    rerender(component({ ...defaultProps, isRevealed: true }))

    const curtainRerender = container.querySelector(
      '.makeStyles-curtain_wrapper-2'
    )

    expect(curtainRerender).not.toBeInTheDocument()
  })

  it('Should render CurtainReveal component', () => {
    const { asFragment } = setupComponent()

    expect(asFragment()).toMatchSnapshot()
  })
})
