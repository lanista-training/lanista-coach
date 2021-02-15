import React, { useMemo } from 'react';

import gql from "graphql-tag";
import fetch from 'isomorphic-unfetch';
import {TranslatorProvider} from '../hooks/Translation';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { onError } from "apollo-link-error";
import { createUploadLink } from 'apollo-upload-client';
import { persistCache } from 'apollo-cache-persist';
import { setContext } from 'apollo-link-context';
import cookie from 'js-cookie';
import {logout} from './auth';

export function withApollo (PageComponent, { ssr = true } = {}) {
  ///const {env} = require('../src/configuration');
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const [client, setClient] = React.useState(undefined);
    React.useEffect(() => {

      const initData = {
        client: null,
        loaded: false,
      };

      const cache = new InMemoryCache(initData);

      //console.log(env)
      // Mobile App GrapQL Link
      //var graphqlServer = 'https://' + mobile.lanista-training.com + '/graphql';



     //var graphqlServer = 'http://localhost:4000/graphql';
     //var graphqlServer = env.server + 'graphql';
     //var graphqlServer = 'https://app.lanista-training.com/graphql';
     var graphqlServer = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/graphql';




      //
      // LINK: Authorization
      //
      const authLink = setContext((_, { headers }) => {
        const token = cookie.get('token')
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
          }
        }
      });

      //
      // LINK: Error
      //
      const errorLink = authLink.concat(onError(({ graphQLErrors, networkError }) => {
        console.log("NEW ERROR");
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
            if(message.indexOf('invalid token') > -1) {
              console.log("LOGOUT");
              cookie.remove('token');
              cookie.remove('tbt');
              cookie.remove('refresh_token');
              window.localStorage.clear();
              logout();
            }
            if(message.indexOf('invalid signature') > -1) {
              console.log("LOGOUT");
              cookie.remove('token');
              cookie.remove('tbt');
              cookie.remove('refresh_token');
              window.localStorage.clear();
              logout();
            }
            if(message.indexOf('jwt expired') > -1) {
              console.log("LOGOUT");
              cookie.remove('token');
              cookie.remove('tbt');
              cookie.remove('refresh_token');
              window.localStorage.clear();
              logout();
            }
            if(message.indexOf('jwt malformed') > -1) {
              console.log("jwt malformed");
              cookie.remove('token');
              cookie.remove('tbt');
              cookie.remove('refresh_token');
              window.localStorage.clear();
              console.log("LOGOUT");
              logout();
            }
          });
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }));

      //
      // LINK: Subscription, HTTP
      //
      const httpLink = new HttpLink({
        uri: graphqlServer,
        credentials: 'same-origin',
        fetch: fetch
      });
      const wsClient = new SubscriptionClient(
        "ws://localhost:3001",
        { lazy: true, reconnect: true },
        null,
        [],
      );
      const wsLink = new WebSocketLink(wsClient);
      const SubscriptionHttpLink = split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink,
      );


      //
      // Create File Upload Link
      //
      /*
      const isFile = value => {
        const result = (typeof File !== 'undefined' && value instanceof File)
          ||
          (typeof Blob !== 'undefined' && value instanceof Blob);
        console.log("Checking if isFile...");
        console.log(result);
        return result;
      };
      const isUpload = ({ variables }) => {
        const result = Object.values(variables).some(isFile);
        console.log("Checking if isUpload...");
        console.log(result);
        return result;
      };
      const uploadLink = createUploadLink({
        uri: graphqlServer
      });
      const terminatingLink = split(isUpload, authLink.concat(uploadLink), authLink.concat(SubscriptionHttpLink));
      */
      //
      // Apollo Client
      //
      const client = new ApolloClient({
        link: errorLink.concat(SubscriptionHttpLink),
        cache: cache,
      });

      persistCache({
        cache,
        storage: window.localStorage
      }).then(() => {
        client.onResetStore(async () => cache.writeData({ data: initData }));
        setClient(client);
      });

      return () => {};

    }, []);
    if (client === undefined) return <div>Loading...</div>;
    return (
      <ApolloProvider client={client}>
        <TranslatorProvider client={client}>
          <PageComponent {...pageProps} client={client}/>
        </TranslatorProvider>
      </ApolloProvider>
    );

  }
  return WithApollo
}
