import React from 'react'
import classNames from 'classnames'

const Icon = ({ name, text }) => {
  return <i className={classNames('icon', 'material-icons', name)}>{text}</i>
}

export default Icon
