import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloLink, concat } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';
//import { createUploadLink } from "apollo-upload-client";
import gql from "graphql-tag";

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
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  var graphqlServerApp = 'https://app.lanista-training.com/graphql';
  var graphqlServerPortal = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/graphql';
  var graphqlServer = (typeof document !== 'undefined' && window.cordova === undefined) ? graphqlServerPortal : graphqlServerApp;

  console.log("graphqlServer", graphqlServer)

  const httpLink = new HttpLink({
      uri: graphqlServer,
  })

  const cache = new InMemoryCache().restore(initialState || {});
  const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: authLink.concat(httpLink),
    cache: cache,
    defaults: {
      me: {}
    }
  });
  return client;
}

export default function initApollo (initialState) {
  if (!process.browser) {
    return create(initialState)
  }
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
