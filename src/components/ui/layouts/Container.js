import classNames from 'classnames'
import React from 'react'

const Container = React.forwardRef(
  (
    {
      as = 'div',
      children,
      css,
      className,
      padding = 1,
      onBlur,
      onClick,
      testId,
    },
    ref
  ) => {
    const Component = as

    return (
      <Component
        data-testid={testId}
        ref={ref}
        style={css}
        className={classNames(className, `container--pd${padding}`)}
        onBlur={onBlur}
        onClick={onClick}
      >
        {children}
      </Component>
    )
  }
)

Container.displayName = 'Container'

export default Container
