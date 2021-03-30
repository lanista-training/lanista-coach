import gql from "graphql-tag";

export const MESSAGEFEED = gql`
  subscription MessageFeed {
    messageFeed {
      id
      text
    }
  }
`;
