import gql from "graphql-tag";

export const SENDPASSWORDRESET = gql`
  mutation Sendpasswordreset($email: String!) {
    sendpasswordreset(email: $email)
  }
`;

export const REGISTER = gql`
  mutation Register( $email: String!,  $password: String!) {
     register(email: $email, password: $password) {
         message
         user {
          id
        }
     }
  }
`;
