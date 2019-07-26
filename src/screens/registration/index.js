import * as React from "react";
import Registration from './Registration';
import Router from 'next/router';
import { Mutation } from "react-apollo";
import { REGISTER } from "../../mutations";

class RegistrationWithoutMutation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      error: false,
      errorMessage: null,

      email: '',
      emailIsValid: null,
      emailConfirmation: '',
      emailConfirmationIsValid: null,
      password: '',
      passwordIsValid: null,
      agreedToLA: false,
      agreedToLAIsValid: null,

      validationEmailErrorMessage: null,
      validationPasswordErrorMessage: null,
      validationPasswordConfirmationErrorMessage: null,

      registrationErrorMessage: null,

      translations: [],
      currentLanguage: 'de',
      availableLanguages: ['en', 'de', 'es', 'pt', 'ru', 'fr'],
    };
    this.goBack = this.goBack.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.handleAgreedToLAChange = this.handleAgreedToLAChange.bind(this);
    this.t = this.t.bind(this);
  }

  componentDidMount(){
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  handleEmailChange(event){
    this.setState({
      email: typeof event === 'string' ? value : event.target.value,
      emailIsValid: null,
      validationEmailErrorMessage: null,
    });
  }

  handlePasswordChange(event){
    this.setState({password: typeof event === 'string' ? value : event.target.value});
    this.setState({
      passwordIsValid: null,
      validationPasswordErrorMessage: null,
    });
  }

  handlePasswordConfirmationChange(event){
    this.setState({passwordConfirmation: typeof event === 'string' ? value : event.target.value});
    this.setState({
      passwordConfirmationIsValid: null,
      validationPasswordConfirmationErrorMessage: null,
    });
  }

  handleAgreedToLAChange(answer){
    this.setState({
      agreedToLA: answer,
      agreedToLAIsValid: null,
      validationAgreedToLAErrorMessage: null,
    });
  }

  doRegister(callback) {
    const {email, password, passwordConfirmation, agreedToLA} = this.state;
    const {t} = this.props;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.setState({
      emailIsValid: null,
      validationEmailErrorMessage: null,
      passwordIsValid: null,
      validationPasswordErrorMessage: null,
      passwordConfirmationIsValid: null,
      validationPasswordConfirmationErrorMessage: null,
      agreedToLAIsValid: null,
      validationAgreedToLAErrorMessage: null,
    });

    // data validation
    if( email === undefined || email.length == 0 ) {
      this.setState({
        emailIsValid: false,
        validationEmailErrorMessage: this.t("login:email_empty"),
      });
    } else if( !re.test(email) ) {
      this.setState({
        emailIsValid: false,
        validationEmailErrorMessage: this.t("login:email_invalid"),
      });
    } else if (password === undefined || password.length == 0 ) {
      this.setState({
        passwordIsValid: false,
        validationPasswordErrorMessage: this.t("login:password_empty"),
      });
    } else if ( password.length < 6 ) {
      this.setState({
        passwordIsValid: false,
        validationPasswordErrorMessage: this.t("login:password_to_short"),
      });
    } else if ( password != passwordConfirmation ) {
      this.setState({
        passwordIsValid: false,
        validationPasswordErrorMessage: this.t("login:password_confirmation_error"),
      });
    }  else if ( agreedToLA === undefined || !agreedToLA ) {
      this.setState({
        agreedToLAIsValid: false,
        validationAgreedToLAErrorMessage: this.t("login:agreed_to_la_error"),
      });
    } else {
      this.setState({
        emailIsValid: null,
        validationEmailErrorMessage: null,
        passwordIsValid: null,
        validationPasswordErrorMessage: null,
        passwordConfirmationIsValid: null,
        validationPasswordConfirmationErrorMessage: null,
      });
      callback();
    }
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

  t(text) {
    const {translations} = this.state;
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  render() {
    const {currentLanguage, availableLanguages, email, password} = this.state;

    return (
      <Mutation
        mutation={REGISTER}
        notifyOnNetworkStatusChange
        variables={{ email: email, password: password }}
      >
        {(register, { loading, data, error, networkStatus }) => {
          const errorCode = error && (error.message.indexOf(": ") > -1 ? error.message.split(': ')[1] : error.message);
          console.log( error )
          console.log('errorCode')
          console.log( errorCode)
          return(<Registration
            t={this.t}
            languages={availableLanguages}
            currentLanguage={currentLanguage}
            onChangeLanguage={this.onChangeLanguage}
            goBack={this.goBack}
            registerUser={() => this.doRegister(register)}
            registering={loading}

            email={this.state.email}
            emailIsValid={this.state.emailIsValid}
            handleEmailChange={this.handleEmailChange}

            password={this.state.password}
            passwordIsValid={this.state.passwordIsValid}
            handlePasswordChange={this.handlePasswordChange}

            passwordConfirmation={this.state.passwordConfirmation}
            passwordConfirmationIsValid={this.state.passwordConfirmationIsValid}
            handlePasswordConfirmationChange={this.handlePasswordConfirmationChange}

            agreedToLA={this.state.agreedToLA}
            agreedToLAIsValid={this.state.agreedToLAIsValid}
            handleAgreedToLAChange={this.handleAgreedToLAChange}

            validationEmailErrorMessage={this.state.validationEmailErrorMessage}
            validationPasswordErrorMessage={this.state.validationPasswordErrorMessage}
            validationPasswordConfirmationErrorMessage={this.state.validationPasswordErrorMessage}
            validationAgreedToLAErrorMessage={this.state.validationAgreedToLAErrorMessage}

            registrationErrorMessage={this.state.authenticationErrorMessage}
            registrationSuccessfully={data && data.register && data.register.message == 'USERCREATED'}
          />)
        }}
      </Mutation>
    );
  }
}

export default RegistrationWithoutMutation;
