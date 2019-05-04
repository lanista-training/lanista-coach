// Apollo GraphQL client

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import AWSAppSyncClient, { createAppSyncLink } from "aws-appsync";
import AppSyncConfig from '../aws-exports';
import { Auth } from 'aws-amplify';
import { persistCache } from 'apollo-cache-persist';
//import { AsyncStorage } from "react-native";

/* Local */
import createState from "./state";

// ----------------------------------------------------------------------------
/*
export function createClient() {

  // Create the cache first, which we'll share across Apollo tooling.
  // This is an in-memory cache. Since we'll be calling `createClient` on
  // universally, the cache will survive until the HTTP request is
  // responded to (on the server) or for the whole of the user's visit (in
  // the browser)
  const cache = new InMemoryCache();

  // If we're in the browser, we'd have received initial state from the
  // server. Restore it, so the client app can continue with the same data.
  if( typeof SERVER !== 'undefined' && SERVER ) {
    if (!SERVER) {
      cache.restore((window).__APOLLO_STATE__);
    }
  }


  // Return a new Apollo Client back, with the cache we've just created,
  // and an array of 'links' (Apollo parlance for GraphQL middleware)
  // to tell Apollo how to handle GraphQL requests
  return new ApolloClient({
    cache,
    link: ApolloLink.from([

      // General error handler, to log errors back to the console.
      // Replace this in production with whatever makes sense in your
      // environment. Remember you can use the global `SERVER` variable to
      // determine whether you're running on the server, and record errors
      // out to third-party services, etc
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),

      // Connect local Apollo state. This is our primary mechanism for
      // managing 'flux'/local app data, in lieu of Redux or MobX
      createState(cache),

      // External GraphQL server to connect to. CHANGE THIS -- by default, it's
      // just using a public playground to pull sample API data.
      new HttpLink({
        credentials: "same-origin",
        uri: "https://graphqlhub.com/graphql",
      }),
    ]),
    // On the server, enable SSR mode
    ssrMode: typeof SERVER !== 'undefined' && SERVER ? SERVER: false,
  });
}
*/

export function createClient() {

  // Create the cache first, which we'll share across Apollo tooling.
  // This is an in-memory cache. Since we'll be calling `createClient` on
  // universally, the cache will survive until the HTTP request is
  // responded to (on the server) or for the whole of the user's visit (in
  // the browser)
  const cache = new InMemoryCache();

  // If we're in the browser, we'd have received initial state from the
  // server. Restore it, so the client app can continue with the same data.
  if( typeof SERVER !== 'undefined' && !SERVER ) {
    console.log( "USING BROWSER STORAGE");
    if (!SERVER) {
      //cache.restore((window).__APOLLO_STATE__);
      persistCache({
        cache,
        storage: window.localStorage,
      });
    }
  } else if ( typeof SERVER === 'undefined' ) {
    console.log( "USING iPad STORAGE");
    /*
    persistCache({
      cache,
      storage: AsyncStorage,
    });
    */
  }



  // Return a new Apollo Client back, with the cache we've just created,
  // and an array of 'links' (Apollo parlance for GraphQL middleware)
  // to tell Apollo how to handle GraphQL requests
  return new AWSAppSyncClient({
    disableOffline: true,
    url: AppSyncConfig.aws_appsync_graphqlEndpoint,
    region: AppSyncConfig.aws_appsync_region,
    auth: {
      type: AppSyncConfig.aws_appsync_authenticationType,
      apiKey: AppSyncConfig.aws_appsync_apiKey,
      //jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
      credentials: () => Auth.currentCredentials()
    }
  },{
    cache,
    link: ApolloLink.from([
      // General error handler, to log errors back to the console.
      // Replace this in production with whatever makes sense in your
      // environment. Remember you can use the global `SERVER` variable to
      // determine whether you're running on the server, and record errors
      // out to third-party services, etc
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),

      // Connect local Apollo state. This is our primary mechanism for
      // managing 'flux'/local app data, in lieu of Redux or MobX
      createState(cache),

      // External GraphQL server to connect to. CHANGE THIS -- by default, it's
      // just using a public playground to pull sample API data.
      createAppSyncLink({
        url: AppSyncConfig.aws_appsync_graphqlEndpoint,
        region: AppSyncConfig.aws_appsync_region,
        auth: {
          type: AppSyncConfig.aws_appsync_authenticationType,
          apiKey: AppSyncConfig.aws_appsync_apiKey,
          //jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
          credentials: () => Auth.currentCredentials()
          // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
        }
      }),
    ]),
    // On the server, enable SSR mode
    ssrMode: typeof SERVER !== 'undefined' && SERVER ? SERVER: false,
  });
}
