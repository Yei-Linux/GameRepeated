import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../../../../../components/ui/atoms/Input'

describe('The Input Component', () => {
  const defaultProps = {
    ariaLabel: 'buttonTest',
    border: true,
    variation: 'primary',
    name: 'buttonTest',
    defaultValue: '',
    placeholder: 'input',
    css: {},
    className: 'inputCustom',
    borderRadius: 1,
    padding: 1,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onClick: jest.fn(),
  }

  const setupComponent = (props = defaultProps) => render(<Input {...props} />)

  it('Should reder input component', () => {
    const { asFragment } = setupComponent()

    expect(asFragment()).toMatchSnapshot()
  })
  it('Should reder input component', async () => {
    const mockOnChange = jest.fn(({ target: { value } }) => value)
    setupComponent({ ...defaultProps, onChange: mockOnChange })

    const input = screen.getByRole('textbox', { name: 'buttonTest' })
    userEvent.type(input, 'cesar')

    const valueCompared = mockOnChange.mock.results
      .map(({ value }) => value)
      .join('')

    expect(mockOnChange).toBeCalledTimes(5)
    expect(valueCompared).toStrictEqual('cesar')
  })
})
