import classNames from 'classnames'
import React from 'react'
import Container from './Container'

const Header = ({ children }) => {
  return (
    <Container padding={0} className={classNames('header')}>
      {children}
    </Container>
  )
}

const Content = ({ children }) => {
  return (
    <Container padding={0} className={classNames('content')}>
      {children}
    </Container>
  )
}

const Layout = ({ children }) => {
  return (
    <Container padding={0} className={classNames('layout')}>
      {children}
    </Container>
  )
}

Layout.Header = Header
Layout.Content = Content

export default Layout
