import React, { Component } from 'react';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';
import { useHistory, useParams } from "react-router-dom";

export const login = async ({ token }) => {
  cookie.set('token', token, { expires: 365 })
}

export const logout = () => {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now());
  window.location.reload();
}

export const isLogedIn = () => {
  const token = cookie.get("token");
  if (token) {
    return true
  } else {
    return false
  }
}


// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    constructor (props) {
      super(props)
      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount () {
      const token = cookie.get("token");
      if (!token) {
        Router.push('/login');
      }
      //window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      //window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event) {
      if (event.key === 'logout') {
        Router.push('/login')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }
