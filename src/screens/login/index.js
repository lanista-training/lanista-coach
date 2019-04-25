import * as React from "react";
import Login from './Login';
import { Mutation, Query } from "react-apollo";
import getSession from "../../queries/getSession";
import authenticate from "../../mutations/authenticate";
import Amplify, { API, Auth } from 'aws-amplify';

import { RouteComponentProps, withRouter } from "react-router";

//import { translate } from 'react-i18next';
import { i18n, withNamespaces } from '../../..i18n'

const styles = {
  buttonColor: '',
}

class LoginWithoutMutation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      authenticating: false,
      error: false,
      errorMessage: null,

      email: '',
      emailIsValid: null,
      password: '',
      passwordIsValid: null,

      validationEmailErrorMessage: null,
      validationPasswordErrorMessage: null,
      authenticationErrorMessage: null,
    };
    this.doAuthenticate = this.doAuthenticate.bind(this);
    this.goToRegistration = this.goToRegistration.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.authenticated && this.props.authenticated !== prevProps.authenticated) {
      this.props.history.push("/");
    }
  }

  handleEmailChange(event){
    if (typeof event === 'string' ) {
      this.setState({
        email: event,
        emailIsValid: null,
        validationEmailErrorMessage: null,
      });
    } else {
      this.setState({
        email: event.target.value,
        emailIsValid: null,
        validationEmailErrorMessage: null,
      });
    }
  }

  handlePasswordChange(event){
    if (typeof event === 'string' ) {
      this.setState({
        password: event,
        passwordIsValid: null,
        validationPasswordErrorMessage: null,
      });
    } else {
      this.setState({
        password: event.target.value,
        passwordIsValid: null,
        validationPasswordErrorMessage: null,
      });
    }
  }

  doAuthenticate() {
    console.log("doAuthenticate")
  }

  goToRegistration( target ) {
    console.log("goToRegistration")
  }

  render() {

    const {t, languages, currentLanguage, onChangeLanguage} = this.props;

    return (<Login
      //authenticated={data && data.state ?  : false}
      authenticated={this.state.authenticated}
      authenticating={this.state.authenticating}
      errorMessage={this.state.errorMessage}
      authenticateUser={this.doAuthenticate}
      goToRegistration= {this.goToRegistration}
      t={t}
      languages={languages}
      currentLanguage={currentLanguage}
      onChangeLanguage={onChangeLanguage}

      email={this.state.email}
      emailIsValid={this.state.emailIsValid}
      handleEmailChange={this.handleEmailChange}

      password={this.state.password}
      passwordIsValid={this.state.passwordIsValid}
      handlePasswordChange={this.handlePasswordChange}

      validationEmailErrorMessage={this.state.validationEmailErrorMessage}
      validationPasswordErrorMessage={this.state.validationPasswordErrorMessage}

      authenticationErrorMessage={this.state.authenticationErrorMessage}
    />);
  }
}

@translate(['common', 'login'], { wait: true })
class LoginWithMutation extends React.Component {

  constructor(props) {
    super(props);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }

  componentDidMount(){
    // change the language until a proper language detector is implemented
    const {i18n} = this.props;
    i18n.changeLanguage('de');
  }

  onChangeLanguage( lang ) {
    const {i18n} = this.props;
    i18n.changeLanguage(lang);
  }

  render() {
    const {t, i18n} = this.props;

    const availableLanguages = i18n.languages ?
    (
      i18n.languages.filter((lang) =>
      {
        return lang != i18n.language
      }
    ))
    :
    [];

    return (
      <Mutation mutation={authenticate}>
        {
          authenticateUser => {
            return (
              <Query query={getSession}>
              {
                ({ data }) => {
                  console.log("SESSION DATA");
                  console.log( data );
                  return (
                    <LoginWithoutMutation
                      authenticateUser={authenticateUser}
                      history={this.props.history}
                      authenticated={(data && data.state) ? data.state.session.authenticated : false}
                      t={t}
                      languages={availableLanguages}
                      currentLanguage={i18n.language}
                      onChangeLanguage={this.onChangeLanguage}
                      emailIsValid={this.emailIsValid}
                      passwordIsValid={this.passwordIsValid}
                    />
                  );
                }
              }
              </Query>
            );
          }
        }
      </Mutation>
    );
  }
}

export default withRouter(LoginWithMutation);
