// Add 1 to the counter in local state

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// GraphQL tag library, for creating GraphQL queries from plain
// template text
import gql from "graphql-tag";

// ----------------------------------------------------------------------------

// GraphQL query for retrieving the current count from local state
export default gql`
  mutation Authenticate($identityId: String!, $token: String!) {
    authenticate(identityId: $identityId, token: $token) @client {
      session
    }
  }
`;

export const LOGIN = gql`
  mutation Login( $email: String!,  $password: String!) {
     login(email: $email, password: $password) {
         token
         tbt
         user {
          id
          bu
          email
          first_name
          last_name
          photoUrl
          accesslevel
        }
     }
  }
`;

export const ME_QUERY = gql`
  query CurrentUserForLayout {
    me {
      id
      email
      first_name
      last_name
      photoUrl
      accesslevel
    }
  }
`
