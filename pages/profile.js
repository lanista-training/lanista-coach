import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from '../components/layout'
import { withAuthSync } from '../lib/auth'
import gql from "graphql-tag"
import { Query } from "react-apollo"

const ME_QUERY = gql`
query CurrentUserForLayout {
  me {
    id
    first_name
    last_name
    email
    plans {
      name
    }
  }
}
`

const Profile = props => {
  return (
    <Layout>
      <div>Profile</div>
      <Query
        query={ME_QUERY}
        fetchPolicy="cache-first"
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          console.log('me')
          console.log( data )
          const {id, email, first_name, last_name} = data.me

          return (
            <div>
              Wellcome {first_name}
              <div>Here your data:</div>
              <div>{id}</div>
              <div>{first_name}</div>
              <div>{last_name}</div>
              <div>{email}</div>
            </div>
          )
        }}
      </Query>
    </Layout>
  )
}

export default withAuthSync(Profile)
