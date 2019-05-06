import gql from "graphql-tag";

export const CUSTOMERS_QUERY = gql`
  query Customers {
    me {
      customers {
        id
        first_name
        last_name
      }
    }
  }
`
