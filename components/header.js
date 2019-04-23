import Link from 'next/link'
import { logout } from '../lib/auth'
import cookie from 'js-cookie'
import gql from "graphql-tag"
import { Query } from "react-apollo"
import styled from 'styled-components'

const ME_QUERY = gql`
  {
    me {
      id
    }
  }
`

const Logo = styled.div`
  margin-left: 2em;
  margin-top: -11px;
  position: absolute;
`;

const Header = props => (
  <Query
    query={ME_QUERY}
    fetchPolicy="cache-first"
  >
    {({ client, loading }) => {
      return (<header>
        <nav>
          <Logo>
            <img src="/static/img/lanista-logo-red.png" alt="Lanista" width={40} height={40} />
          </Logo>
          <ul>
            {cookie.get('token') && (
              <li>
                <Link href='/'>
                  <a>Workouts</a>
                </Link>
              </li>
            )}
            {!cookie.get('token') && (
              <li>
                <Link href='/login'>
                  <a>Login</a>
                </Link>
              </li>
            )}
            {cookie.get('token') && (
              <li>
                <Link href='/profile'>
                  <a>Profile</a>
                </Link>
              </li>
            )}
            {cookie.get('token') && (
              <li>
                <button onClick={() => {
                  client.resetStore();
                  logout();
                }}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>)
    }}
  </Query>
)

export default Header
