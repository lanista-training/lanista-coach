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
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
`;

const Message = styled.div`
  margin-left: 1em;
  font-size: 1.5em;
  font-weight: bolder;
  display: flex;
  height: 100%;
  width: 100%;
`;

const MessageWrapper = styled.div`
  display: inline-block;
  align-self: flex-end;
  margin-bottom: 10vh;
`;

const MessageLogo = styled.div`
  margin-left: 0;
  margin-top: 0;
`;

const MessageContent = styled.div`
  margin-left: 0;
  margin-top: 0;
`;

const InputSection = styled.div`
  height: 20%;
  display: flex;
  align-self: flex-end;
`;

const LanistaButton = styled.button`
  border-style: solid;
  border-color: red;
  background: transparent;
  font-size: 1em;
  padding: 0.5em 1em;
  display: inline-block;
  align-self: flex-end;
  margin-right: 2em;
  margin-bottom: 2em;
  z-index: 2;
`;

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      message:  'Willkommen bei Lanista',
      history: ["Test 1"],
      input: (<LanistaButton onClick={() => {this.pushInHistory()}}>
        Weiter
      </LanistaButton>)
    }
    this.renderInput = this.renderInput.bind(this);
    this.pushInHistory = this.pushInHistory.bind(this);
  }

  pushInHistory() {
    console.log("pushInHistory");
    console.log(this.state);
    const {history} = this.state;
    history.push("Test 2");
    this.setState(
      {
        history: history
      }
    )
  }

  async _confirm( data ) {
    const { token } = data.login
    login({ token })
  }

  renderInput() {
    const _this = this;
    this.setState({
      input: (<LanistaButton onClick={() => {
        console.log("Marke");
        console.log( _this )
        _this.setState(
          {
            history: _this.state.history.push("Test 2")
          }
        )
      }}>
        Weiter
      </LanistaButton>)
    })
  }

  render () {
    const { email, password, message, input } = this.state
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
                {
                  this.state.history.map(function(item, i){
                    console.log('test');
                    return <li key={i}>{item}</li>
                  }
                )}
              </History>
              <Message>
                <MessageWrapper>
                  <MessageLogo>
                    <img src="/static/img/lanista-logo-red.png" alt="Lanista" width={40} height={40} />
                  </MessageLogo>
                  <MessageContent>
                    {message}
                  </MessageContent>
                </MessageWrapper>
              </Message>
              <InputSection>
                {input}
              </InputSection>
            </Stage>
          )
        }}
      </Mutation>
    )
  }
}

export default Login
