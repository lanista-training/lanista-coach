import gql from "graphql-tag";

export const CUSTOMERS_QUERY = gql`
  query Members {
    members {
      id
      first_name
      last_name
    }  
  }
`
