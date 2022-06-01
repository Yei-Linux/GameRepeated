import classNames from 'classnames'

const Select = ({
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
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

export default Select
