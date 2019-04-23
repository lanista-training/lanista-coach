import React from "react";
import Layout from '../components/layout'
import { withAuthSync } from '../lib/auth'
import gql from "graphql-tag"
import { Query } from "react-apollo"

const WORKOUTS_QUERY = gql`
query Workouts {
  me {
    plans {
      name
    }
  }
}
`

function Index() {
  return (
    <Layout>
      <div className="homePage">
        <div>Your workouts</div>
        <Query
          query={WORKOUTS_QUERY}
          fetchPolicy="cache-first"
        >
          {({ loading, error, data }) => {
            console.log("data")
            console.log(data)
            const {plans} = data.me
            return (
              <div>
                {
                  plans.map((item, key) => <li key={item.key}>{item.name}</li>)
                }
              </div>
            )
          }}
        </Query>
      </div>
    </Layout>
  );
}

export default withAuthSync(Index);
