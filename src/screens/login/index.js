import * as React from "react";
import Login from './Login';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo';
import { LOGIN } from "../../mutations/authenticate";
import { login } from '../../lib/auth';
import cookie from 'js-cookie';

const LoginPanel = ({
  goToRoot,
  goToRegistration,
  goToForgotPassword,
}) => {
  //
  // Domain info
  //
  const tbt = cookie.get('tbt');

  // mutation
  const [authenticateUser, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      update(cache,  {data}) {
        const { token, user, tbt } = data.login;
        login({ token, tbt });
        goToRoot();
      }
    }
  );

  // translation variables
  const [translations, setTranslations] = React.useState([]);
  const [currentLanguage, setCurrentLanguage] = React.useState('de');
  const [availableLanguages, setAvailableLanguages] = React.useState(['en', 'de', 'es', 'pt', 'ru', 'fr']);

  const [authenticated, setAuthenticated] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [emailIsValid, setEmailIsValid] = React.useState(null);
  const [validationEmailErrorMessage, setValidationEmailErrorMessage] = React.useState(null);

  const [password, setPassword] = React.useState('');
  const [passwordIsValid, setPasswordIsValid] = React.useState(null);
  const [validationPasswordErrorMessage, setValidationPasswordErrorMessage] = React.useState(null);

  const [authenticationErrorMessage, setAuthenticationErrorMessage] = React.useState(null);

  React.useEffect(() => {
    onChangeLanguage("de");
  }, []);

  React.useEffect(() => {
    if (authenticated) {
      goToRoot();
    }
  }, [authenticated]);

  const onAuthenticate = () => {
    authenticateUser({
      variables: {
        email: email,
        password: password,
      }
    })
  }

  const handleEmailChange = (event) => {
    if (typeof event === 'string' ) {
      setEmail(event);
      setEmailIsValid(null);
      setValidationEmailErrorMessage(null);
    } else {
      setEmail(event.target.value);
      setEmailIsValid(null);
      setValidationEmailErrorMessage(null);
    }
  }

  const handlePasswordChange = (event) => {
    if (typeof event === 'string' ) {
      setPassword(event);
      setPasswordIsValid(null);
      setValidationPasswordErrorMessage(null);
    } else {
      setPassword(event.target.value);
      setPasswordIsValid(null);
      setValidationPasswordErrorMessage(null);
    }
  }

  const doAuthenticate = (login) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // data validation
    if( email == "" ) {
      setEmailIsValid(false);
      setValidationEmailErrorMessage(t("login:email_empty"));
    } else if( !re.test(email) ) {
      setEmailIsValid(false);
      setValidationEmailErrorMessage(t("login:email_invalid"));
    } else if (password == "" ) {
      setPasswordIsValid(false);
      setValidationPasswordErrorMessage(t("login:password_empty"));
    } else if ( password.length < 6 ) {
      setPasswordIsValid(false);
      setValidationPasswordErrorMessage(t("login:password_to_short"));
    } else {
      login();
    }
  }

  const goToForgotpassword = () => {
    goToForgotPassword();
  }

  const t = (text) => {
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  const onChangeLanguage = ( language ) => {
    const domainTranslations = require('../../../static/locales/' + language + '/login');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr', 'pt', 'ru'];
    setTranslations({...domainTranslations, ...commonTranslations});
    setCurrentLanguage(language);
    setAvailableLanguages(originalLanguages.filter(word => word !== language));
  }

  const errorCode = loginError && (loginError.message.indexOf(": ") > -1 ? loginError.message.split(': ')[1] : loginError.message);

  return (
    <Login
      authenticated={authenticated}
      authenticating={loginLoading}
      authenticateUser={onAuthenticate}
      goToRegistration={goToRegistration}
      goToForgotpassword={goToForgotpassword}

      t={t}
      languages={availableLanguages}

      currentLanguage={currentLanguage}
      onChangeLanguage={onChangeLanguage}

      email={email}
      emailIsValid={emailIsValid}
      handleEmailChange={handleEmailChange}

      password={password}
      passwordIsValid={passwordIsValid}
      handlePasswordChange={handlePasswordChange}

      validationEmailErrorMessage={validationEmailErrorMessage}
      validationPasswordErrorMessage={validationPasswordErrorMessage}

      authenticationErrorMessage={errorCode ? t(errorCode) : undefined}

      tbt={tbt}

      goToRegistration={goToRegistration}
    />
  )
}

export default withApollo(LoginPanel);
