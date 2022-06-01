import classNames from 'classnames'

const Select = ({
  ariaLabel,
  variation = 'primary',
  options,
  name,
  defaultValue,
  onChange,
  padding = 1,
  placeholder,
  css,
  className,
}) => {
  return (
    <select
      aria-label={ariaLabel}
      onChange={onChange}
      placeholder={placeholder}
      style={css}
      className={classNames(
        className,
        'select',
        `select--pd${padding}`,
        `select--${variation}`
      )}
      name={name}
      value={defaultValue}
    >
      {options.map(({ value, label, testId }) => (
        <option data-testid={testId} key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

export default Select
