import Container from '../layouts/Container'
import Input from './Input'
import Label from './Label'

const FormItem = ({
  testId,
  htmlFor,
  ariaLabel,
  type = 'input',
  className,
  classNameInput,
  label = '',
  name,
  onChange,
  value,
}) => {
  const elementTypes = {
    input: Input,
  }

  const Element = elementTypes[type]

  const handleChange = (e) => {
    const valueEvent = e.target.value
    onChange({
      name,
      value: valueEvent,
    })
  }

  return (
    <Container testId={testId} padding={0} className={className}>
      {label && <Label text={`${label}:`} htmlFor={htmlFor} />}
      {Element && (
        <Element
          ariaLabel={ariaLabel}
          name={name}
          onChange={handleChange}
          defaultValue={value}
          className={classNameInput}
        />
      )}
    </Container>
  )
}

export default FormItem
