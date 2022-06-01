/* eslint-disable react/display-name */
import React from 'react'
import Layout from '../components/ui/layouts/Layout'
import Topbar from '../components/ui/layouts/Topbar'

const WithLayout = () => (Component) => (props) => {
  return (
    <Layout>
      <Layout.Header>
        <Topbar />
      </Layout.Header>
      <Layout.Content>
        <Component {...props} />
      </Layout.Content>
    </Layout>
  )
}

export default WithLayout
