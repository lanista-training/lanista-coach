import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import { login } from '../lib/auth'
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import styled from 'styled-components'
import css from "../style.css"

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

const Stage = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
`;

const History = styled.div`
  height: 20%;
`;

const Message = styled.div`
  height: 60%;
  margin-left: 1em;
  font-size: 1.5em;
  font-weight: bolder;
`;

const MessageLogo = styled.div`
  margin-left: 2em;
  margin-top: -11px;
`;

const MessageContent = styled.div`
  margin-left: 2em;
  margin-top: -11px;
`;

const InputSection = styled.div`
  height: 20%;
`;




class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      message:  'Willkommen bei Lanista',
      history: [],
    }
  }

  async _confirm( data ) {
    const { token } = data.login
    login({ token })
  }

  render () {
    const { email, password, message } = this.state
    return (
      <Mutation
        mutation={LOGIN}
        variables={{ email: this.state.email, password: this.state.password }}
        onCompleted={data => this._confirm(data)}
        update={(cache, { data: { login } }) => {
          console.log("update")
          //const query = cache.readQuery({ query: ME_QUERY });
          //console.log( "query" )
          //console.log( query )
          console.log("login.user")
          console.log(login.user)
          cache.writeQuery({
            query: ME_QUERY,
            data: { me: login.user },
          });
        }}
      >
        {(login, { data }) => {
          return (
            <Stage>
              <History>
                History
              </History>
              <Message>
                <MessageLogo>
                  <img src="/static/img/lanista-logo-red.png" alt="Lanista" width={40} height={40} />
                </MessageLogo>
                <MessageContent>
                  {message}
                </MessageContent>
              </Message>
              <InputSection>
                InputSection
              </InputSection>
            </Stage>
          )
        }}
      </Mutation>
    )
  }
}

export default Login
