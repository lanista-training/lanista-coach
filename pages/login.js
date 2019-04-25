import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import { login } from '../lib/auth'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import css from '../style.css'
import { i18n, withNamespaces } from '../i18n'
//import LoginScreen from "../src/screens/login"

const LOGIN = gql`
  mutation Login( $email: String!,  $password: String!) {
     login(email: $email, password: $password) {
         token
         user {
          id
          email
          first_name
          last_name
          plans {
            name
          }
        }
     }
  }
`;

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

class Login extends Component {

  static async getInitialProps() {
    return {
      namespacesRequired: ['common', 'login'],
    }
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {t} = this.props
    return (
      <div>
        {t('title')}
      </div>
    )
  }
}

export default withNamespaces('login')(Login)
