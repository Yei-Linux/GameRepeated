import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Select from '../../../../../components/ui/atoms/Select'

describe('The Select Component', () => {
  const defaultProps = {
    ariaLabel: 'selectTest',
    variation: 'primary',
    options: [
      { value: 'optionOne', label: 'optionOne', testId: 'optionOne' },
      { value: 'optionTwo', label: 'optionTwo', testId: 'optionTwo' },
    ],
    name: 'selectTest',
    defaultValue: '',
    padding: 1,
    placeholder: 'input',
    css: {},
    className: 'inputCustom',
    onChange: jest.fn(),
  }

  const setupComponent = (props = defaultProps) => render(<Select {...props} />)

  it('Should reder input component', () => {
    const { asFragment } = setupComponent()

    expect(asFragment()).toMatchSnapshot()
  })
  it('Should reder input component', async () => {
    const mockOnChange = jest.fn(({ target: { value } }) => value)
    setupComponent({ ...defaultProps, onChange: mockOnChange })

    const select = screen.getByRole('combobox', { name: 'selectTest' })
    const optionSelected = screen.getByRole('option', { name: 'optionTwo' })
    userEvent.selectOptions(select, optionSelected)

    expect(mockOnChange).toBeCalledTimes(1)
    expect(mockOnChange.mock.results[0].value).toStrictEqual('optionTwo')
  })
})
