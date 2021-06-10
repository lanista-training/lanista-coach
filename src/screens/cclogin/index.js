import * as React from "react";
import Login from './Login';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks'
import { CCAUTHENTICATE, CCLOGIN } from "../../mutations";
import { ME_QUERY } from "../../mutations/authenticate";
import { login } from '../../lib/auth';

const LoginPanel = ({doLogin}) => {

  const [trainer, setTrainer] = React.useState([]);
  const [token, setToken] = React.useState("");

  const [authenticateUser, { loading: authenticateLoading, error: authenticateError }] = useMutation(
    CCAUTHENTICATE,
    {
      update(cache,  {data}) {
        console.log("update");
        const { token, users, user } = data.cc;
        console.log("user");
        console.log(user);
        if( user && user.id > 0 ) {
          window.localStorage.setItem('pending_user_id', user.id);
        }
        setTrainer(users);
        setToken(token);
      }
    }
  );

  const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(
    CCLOGIN,
    {
      update(cache,  {data: { cclogin } }) {
        console.log("update")
        const {user, token} = cclogin;
        var query = null;
        try {
          query = cache.readQuery({ query: ME_QUERY });
        } catch( e ) {
          console.log( "Login error")
          console.log( e )
        }
        cache.writeQuery({
          query: ME_QUERY,
          data: { me: user },
        });
        login({ token });
      }
    }
  );

  React.useEffect(() => {
    if(typeof window !== 'undefined' && window.document && window.document.createElement && !loginLoading) {
      const cctoken = localStorage.getItem('cctoken')
      onAuthenticate(cctoken)
    }
  }, []);

  const onAuthenticate = () => {
    const cctoken = localStorage.getItem("cctoken")
    const bu = localStorage.getItem("bu")
    authenticateUser({
      variables: {
        cctoken: cctoken,
      }
    })
  }

  const onLoginUser = (id) => {
    loginUser({variables: {
      id: parseInt(id),
      cctoken: token,
    }})
  }

  return (
    <Login
      authenticated={false}
      loading={authenticateLoading}
      loginError={authenticateError}
      users={trainer}
      login={onLoginUser}
    />
  )
}

export default LoginPanel;
