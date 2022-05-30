import classNames from 'classnames'
import React from 'react'

const Label = ({ text, className, css, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      style={css}
      className={classNames('label', className)}
    >
      {text}
    </label>
  )
}

export default Label
