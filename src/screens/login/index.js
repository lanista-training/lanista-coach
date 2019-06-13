import * as React from "react";
import Login from './Login';
import Router from 'next/router';
import { Mutation, Query } from "react-apollo";
import { LOGIN, ME_QUERY } from "../../mutations/authenticate";
import { login } from '../../../lib/auth';

class LoginWithMutation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      translations: [],
      currentLanguage: 'de',
      availableLanguages: ['en', 'de', 'es', 'pt', 'ru', 'fr'],

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
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.doAuthenticate = this.doAuthenticate.bind(this);
    this.goToRegistration = this.goToRegistration.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.t = this.t.bind(this);
  }

  componentDidMount(){
    this.onChangeLanguage("de");
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.authenticated && this.props.authenticated !== prevProps.authenticated) {
      console.log("redirecting to root...");
      Router.push('/');
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

  doAuthenticate(login) {
    const {email, password} = this.state;
    const {t} = this.props;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // data validation
    if( email === undefined || email.length == 0 ) {
      this.setState({
        emailIsValid: false,
        validationEmailErrorMessage: t("login:email_empty"),
      });
    } else if( !re.test(email) ) {
      this.setState({
        emailIsValid: false,
        validationEmailErrorMessage: t("login:email_invalid"),
      });
    } else if (password === undefined || password.length == 0 ) {
      this.setState({
        passwordIsValid: false,
        validationPasswordErrorMessage: t("login:password_empty"),
      });
    } else if ( password.length < 6 ) {
      this.setState({
        passwordIsValid: false,
        validationPasswordErrorMessage: t("login:password_to_short"),
      });
    } else {
      login();
      this.setState({
        authenticated: false,
        authenticating: false,
        authenticationErrorMessage: "Connection error",
        passwordIsValid: null,
        emailIsValid:  null,
      });
    }
  }

  goToRegistration( target ) {
    Router.push('/registration');
  }

  t(text) {
    const {translations} = this.state;
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  onChangeLanguage( language ) {
    const translations = require('../../../static/locales/' + language + '/login');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  async _confirm( data ) {
    const { token } = data.login
    login({ token })
  }

  render() {
    const {currentLanguage, availableLanguages, email, password} = this.state;

    return (
      <Mutation
        mutation={LOGIN}
        variables={{ email: email, password: password }}
        onCompleted={data => this._confirm(data)}
        update={(cache, { data: { login } }) => {
          console.log("update")
          var query = null;
          try {
            query = cache.readQuery({ query: ME_QUERY });
          } catch( e ) {
            console.log( "Login error")
            console.log( e )
          }

          console.log( "query" )
          console.log( query )
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
            <Login
              //authenticated={data && data.state ?  : false}
              authenticated={this.state.authenticated}
              authenticating={this.state.authenticating}
              errorMessage={this.state.errorMessage}
              authenticateUser={() => this.doAuthenticate(login)}
              goToRegistration= {this.goToRegistration}
              t={this.t}
              languages={availableLanguages}
              currentLanguage={currentLanguage}
              onChangeLanguage={this.onChangeLanguage}

              email={this.state.email}
              emailIsValid={this.state.emailIsValid}
              handleEmailChange={this.handleEmailChange}

              password={this.state.password}
              passwordIsValid={this.state.passwordIsValid}
              handlePasswordChange={this.handlePasswordChange}

              validationEmailErrorMessage={this.state.validationEmailErrorMessage}
              validationPasswordErrorMessage={this.state.validationPasswordErrorMessage}

              authenticationErrorMessage={this.state.authenticationErrorMessage}
            />
          );
        }}
      </Mutation>
    )
  }
}

export default LoginWithMutation;
