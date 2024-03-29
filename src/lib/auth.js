import React from 'react';
import { Component } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = async ({ token, tbt }) => {
  cookie.set('token', token, { expires: window.cordova ? 360 : 1 });
  if( tbt ) {
    cookie.set('tbt', tbt);
  }
}

export const signup = async ({ token }) => {
  cookie.set('token', token, { expires: window.cordova ? 360 : 1 });
  Router.push('/')
}

export const logout = () => {
  console.log("LOGOUT...")
  cookie.remove('token');
  setTimeout(() => {
    window.localStorage.clear();
    window.localStorage.setItem('logout', Date.now());
    Router.push('/login');
    console.log("LOGOUT DONE !")
  }, 2000 );
  return true;
}

export const refreshToken = async ({ token }) => {
  cookie.set('token', token, { expires: window.cordova ? 360 : 1 });
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      const token = auth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps, token }
    }

    constructor (props) {
      super(props)

      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount () {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

export const auth = ctx => {
  const { token } = nextCookie(ctx);
  const cctoken = ctx.query.cctoken;
  const bu = ctx.query.bu;
  if (ctx.req && !token) {
    if(cctoken && bu) {
      ctx.res.writeHead(302, { Location: '/login?cctoken=' + cctoken + '&bu=' + bu})
    } else {
      ctx.res.writeHead(302, { Location: '/login' })
    }
    ctx.res.end()
    return
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    if( cctoken && bu ) {
      Router.push({
        pathname: '/login',
        query: {
          cctoken: cctoken,
          bu: bu,
        }
      });
    } else {
      Router.push('/login');
    }
  }
  return token
}

export const isLogedIn = () => {
  const token = cookie.get("token");
  if (token) {
    return true
  } else {
    return false
  }
}
