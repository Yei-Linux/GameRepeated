import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormItem from '../../../../../components/ui/atoms/FormItem'

describe('The Form Item component', () => {
  const defaultProps = {
    testId: 'formitem-test',
    htmlFor: 'labelFormItem',
    ariaLabel: 'inputFormItem',
    type: 'input',
    className: 'formItemClass',
    classNameInput: 'inputClass',
    label: '',
    name: 'inputFormItem',
    onChange: jest.fn(),
    value: 'b',
  }

  const setupComponent = (props = defaultProps) =>
    render(<FormItem {...props} />)

  it('Should validate input element', () => {
    const mockOnChange = jest.fn((value) => value)
    const { name, value } = defaultProps
    setupComponent({ ...defaultProps, value: '', onChange: mockOnChange })

    const inputElement = screen.getByRole('textbox', { name: /inputFormItem/i })
    userEvent.type(inputElement, 'b')

    expect(mockOnChange).toBeCalledTimes(1)
    expect(mockOnChange.mock.results[0].value).toStrictEqual({
      name,
      value,
    })
  })

  it('Should validate input type exists', () => {
    setupComponent({
      ...defaultProps,
      type: 'checkbox',
    })

    const inputElement = screen.queryByRole('textbox', {
      name: /inputFormItem/i,
    })

    expect(inputElement).not.toBeInTheDocument()
  })

  describe('FormItem with label', () => {
    it('Should render FormItem with label component', () => {
      const { asFragment } = setupComponent({
        ...defaultProps,
        label: 'LabelUI',
      })

      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('FormItem without label', () => {
    it('Should render FormItem without label component', () => {
      const { asFragment } = setupComponent()

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
