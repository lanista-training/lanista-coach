
import App, { Container } from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import {ThemeProvider } from 'styled-components'
import defaultTheme from '../themes/default'
import DataProvider from '../src/components/DataProvider'

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ThemeProvider theme={defaultTheme}>
          <ApolloProvider client={apolloClient}>
            <DataProvider>
              <Component {...pageProps} />
            </DataProvider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
