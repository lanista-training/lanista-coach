import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

interface IdentityInterface {
  identity: string,
  authenticating: string,
}

const defaultState = {
  identity: null,
};

const IdentityContext = React.createContext<defaultState | null>(null);

export const IdentityConsummer = IdentityContext.Consumer;

class IdentityProviderWithoutRouter extends Component {

  state = {
    identity: null,
    authenticating: false,
  }

  login = (credentials) => {
    const { history } = this.props;

    this.setState({
      identity: {}
    });
    history.push('/')
  }

  logout = () => {
    this.setState({
      identity: null
    })
  }

  render() {
    return (
      <IdentityContext.Provider
        value={
          {
            state: this.state,
            actions: {
              login: this.login,
              logout: this.logout,
            }
          }
        }>
        {this.props.children}
      </IdentityContext.Provider>
    )
  }
};

export const IdentityProvider = withRouter(IdentityProviderWithoutRouter);
