import { Component } from 'react';
import LoginScreen from "../src/screens/login";
import CCLoginScreen from "../src/screens/cclogin";
import Router from 'next/router';
import {isLogedIn} from '../src/lib/auth';

function Login({cctoken}) {

  if( isLogedIn() ) {
    Router.push('/');
  }

  if(typeof window !== 'undefined' && window.document && window.document.createElement) {
    if( cctoken ) {
      localStorage.setItem('cctoken', cctoken);
    } else {
      cctoken = localStorage.getItem('cctoken');
    }
  }

  if(cctoken) {
    console.log("Doing cc login")
    return (
      <CCLoginScreen/>
    )
  } else {
    console.log("Doing default login")
    return (
      <LoginScreen
        goToRegistration={() => Router.push('/registration')}
        goToRoot={() => Router.push("/")}
        goToForgotPassword={() => Router.push("/forgotpassword")}
      />
    );
  }
}

Login.getInitialProps = context => {
  return ({
    cctoken: context.query.cctoken,
  })
};

export default Login
