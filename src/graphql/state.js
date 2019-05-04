// Local GraphQL state

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { ClientStateConfig, withClientState } from "apollo-link-state";

/* Local */

// Queries
import getCountQuery from "../queries/getCount";
import getSession from "../queries/getSession";

// ----------------------------------------------------------------------------

export default function createState(cache) {

  // Helper function to retrieve the state from cache
  function getState(query) {
    return cache.readQuery({ query }).state;
  }

  // Helper function to write data back to the cache
  function writeState(state) {
    return cache.writeData({ data: { state } });
  }

  const opt = {
    cache,
    resolvers: {
      Mutation: {
        // Sample mutation to increment the local `count` by 1
        incrementCount() {
          // Get the existing state
          const state = getState(getCountQuery);

          // Create new state. Note that we're assigning this to a new
          // constant, and not simply incrementing the existing `count`
          // key on the state we retrieved. We use this immutable pattern
          // so Apollo can see that we have a brand new object to write
          // to the cache
          const newState = {
            ...state,
            count: state.count + 1,
          };
          // Write the new count var to the cache
          writeState(newState);
          // ... and return it back to the calling function, which will
          // then become our response data
          return newState;
        },

        authenticate(_, variables, {cache, getCacheKey}) {
          // Get the existing state
          const state = getState(getSession);
          // Create new state. Note that we're assigning this to a new
          // constant, and not simply incrementing the existing `count`
          // key on the state we retrieved. We use this immutable pattern
          // so Apollo can see that we have a brand new object to write
          // to the cache
          const resultState = {
            ...state,
            session: {
              __typename: "Session",
              authenticated: true,
              authenticating: false,
              identityId: variables.identityId,
              token: variables.token,
              error: false,
              errorMessage: null,
            }
          };

          // Write the new count var to the cache
          writeState(resultState);

          // ... and return it back to the calling function, which will
          // then become our response data
          return resultState;
        },
      },
    },
  };

  if( typeof SERVER !== 'undefined' && SERVER ) {
    if (SERVER) {
      opt.defaults = {
        state: {
          __typename: "State",
          session: {
            __typename: "Session",
            authenticated: false,
            authenticating: false,
            identityId: null,
            token: null,
            error: false,
            errorMessage: null,
          },
        },
      };
    }
  } else {
    opt.defaults = {
      state: {
        __typename: "State",
        session: {
          __typename: "Session",
          authenticated: false,
          authenticating: false,
          identityId: null,
          token: null,
          error: false,
          errorMessage: null,
        },
      },
    };
  }

  return withClientState(opt);
}
