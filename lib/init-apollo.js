import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloLink, concat } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import cookie from 'js-cookie'

import gql from "graphql-tag"

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}
const getToken = () => {
  let token = null;
  if (typeof document !== 'undefined') {
    token = 'Bearer ' + cookie.get('token')
  }
  return token
}

function create (initialState) {
  const authLink = setContext((_, { headers }) => {
    const token = cookie.get('token')
    //console.log("TOKEN...")
    //console.log("Seting header authorization to:")
    //console.log(token ? `Bearer ${token}` : '')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })
  const httpLink = new HttpLink({
      uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
      //uri: 'https://trainer.lanista-test.com/api/graphql'
      //uri: 'https://7k9p1l6s9e.execute-api.eu-central-1.amazonaws.com/dev/graphql',
  })
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
    defaults: {
      me: {}
    }
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
