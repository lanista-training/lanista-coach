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
      window.cache = cache;

      var graphqlServerApp = 'https://app.lanista-training.com/graphql';
      var graphqlServerPortal = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/graphql';
      //var graphqlServer = (typeof document !== 'undefined' && window.cordova === undefined) ? graphqlServerPortal : graphqlServerApp;
      var graphqlServer = 'https://kj8xejnla9.execute-api.eu-central-1.amazonaws.com/dev/graphql';
      //console.log("graphqlServer", graphqlServer)

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
      const httpLink = errorLink.concat(new HttpLink({
        uri: graphqlServer,
        credentials: 'same-origin',
        fetch: fetch
      }));

      var wsProductionUrl = 'wss://jq3eu6hd5h.execute-api.eu-central-1.amazonaws.com/prod';
      var wsDevelopmentUrl = 'wss://4okkq8fmea.execute-api.eu-central-1.amazonaws.com/dev';
      var wsServer = wsProductionUrl;

      const wsClient = new SubscriptionClient(
        wsServer,
        {
          connectionParams: () => {
            const token = cookie.get('token');
            return {
              authToken: `Bearer ${token}`,
              client: 'coach'
            }
          },
          lazy: true,
          reconnect: true
        },
        null,
        [],
      );
      const wsLink = errorLink.concat(new WebSocketLink(wsClient));
      const subscriptionHttpLink = split(
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
        link: subscriptionHttpLink,
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

export const isLogedIn = () => {
  const token = cookie.get("token");
  if (token) {
    return true
  } else {
    return false
  }
}
