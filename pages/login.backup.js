import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import { login } from '../lib/auth'
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

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

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }

  async _confirm( data ) {
    const { token } = data.login
    login({ token })
  }

  render () {
    const { email, password } = this.state
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
            <Layout>
              <div className='login'>
                <form onSubmit={e => {
                  console.log("EXECUTING...")
                  e.preventDefault();
                  login();
                }}>
                  <label htmlFor='email'>Enter username</label>

                  <input
                    type='email'
                    value={email}
                    onChange={e => this.setState({ email: e.target.value })}
                    placeholder="Your email address"
                  />
                  <input
                    type='password'
                    value={password}
                    onChange={e => this.setState({ password: e.target.value })}
                    placeholder="Choose a safe password"
                  />

                  <button type='submit'>Login</button>

                  <p className={`error ${this.state.error && 'show'}`}>
                    {this.state.error && `Error: ${this.state.error}`}
                  </p>
                </form>
              </div>
              <style jsx>{`
                .login {
                  max-width: 340px;
                  margin: 0 auto;
                  padding: 1rem;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                }
                form {
                  display: flex;
                  flex-flow: column;
                }
                label {
                  font-weight: 600;
                }
                input {
                  padding: 8px;
                  margin: 0.3rem 0 1rem;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                }
                .error {
                  margin: 0.5rem 0 0;
                  display: none;
                  color: brown;
                }
                .error.show {
                  display: block;
                }
              `}</style>
            </Layout>
          )
        }}
      </Mutation>
    )
  }
}

export default Login
