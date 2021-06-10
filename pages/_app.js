
import App, { Container } from 'next/app'
import React from 'react'
import { withApollo } from '../lib/apollo';
import { ApolloProvider } from 'react-apollo'
import { TranslatorProvider } from '../src/hooks/Translation';
import {ThemeProvider } from 'styled-components'
import defaultTheme from '../themes/default'
import DataProvider from '../src/components/DataProvider'

class MyApp extends App {
  render () {
    const { Component, pageProps, client } = this.props;
    return (
      <Container>
        <ThemeProvider theme={defaultTheme}>
          <ApolloProvider client={client}>
            <TranslatorProvider client={client}>
              <DataProvider>
                <Component {...pageProps} />
              </DataProvider>
            </TranslatorProvider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
