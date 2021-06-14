import React, { useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import Registration from './Registration';
import Router from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { REGISTER } from "../../mutations";
import { GETDOMAININFO } from "../../queries";

const Panel = ({goBack}) => {

  const {t, locale, changeLanguage, languages} = useTranslate("login");

  const { data: domainData } = useQuery(GETDOMAININFO, {
    fetchPolicy: 'no-cache',
  });
  const domainLogoUrl = domainData && domainData.getDomainInfo ?  domainData.getDomainInfo.logoUrl : '';

  //
  // Component variables
  //
  const [registered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState(null);

  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [validationEmailErrorMessage, setValidationEmailErrorMessage] = useState(null);

  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [emailConfirmationIsValid, setEmailConfirmationIsValid] = useState(null);

  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [validationPasswordErrorMessage, setValidationPasswordErrorMessage] = useState(null);

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationIsValid, setPasswordConfirmationIsValid] = useState(null);
  const [validationPasswordConfirmationErrorMessage, setValidationPasswordConfirmationErrorMessage] = useState(null);

  const [agreedToLA, setAgreedToLA] = useState(false);
  const [agreedToLAIsValid, setAgreedToLAIsValid] = useState(null);
  const [validationAgreedToLAErrorMessage, setValidationAgreedToLAErrorMessage] = useState(null);

  //
  // Mutation
  //
  const [register, { loading, data, error, networkStatus }] = useMutation(REGISTER);
  useEffect(() => {
    if( error ) {
      if (error.message.indexOf("DUPLICATE") > -1) {
        setRegistrationErrorMessage(t("duplication error"));
      } else {
        setRegistrationErrorMessage(t("UNEXPECTEDERROR"));
      }
    }
  }, [error]);



  const handleEmailChange = (event) => {
    setEmail(typeof event === 'string' ? event : event.target.value);
    setEmailIsValid(null);
    setRegistrationErrorMessage(null);
    setValidationEmailErrorMessage(null);
  }

  const handlePasswordChange = (event) => {
    setPassword(typeof event === 'string' ? event : event.target.value);
    setPasswordIsValid(null);
    setValidationPasswordErrorMessage(null);
  }

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(typeof event === 'string' ? event : event.target.value);
    setPasswordConfirmationIsValid(null);
    setValidationPasswordConfirmationErrorMessage(null);
  }

  const handleAgreedToLAChange = (answer) => {
    setAgreedToLA(answer);
    setAgreedToLAIsValid(null);
    setValidationAgreedToLAErrorMessage(null);
  }

  const doRegister = (callback) => {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setEmailIsValid(null);
    setValidationEmailErrorMessage(null);
    setPasswordIsValid(null);
    setValidationPasswordErrorMessage(null);
    setPasswordConfirmationIsValid(null);
    setValidationPasswordConfirmationErrorMessage(null);
    setAgreedToLAIsValid(null);
    setValidationAgreedToLAErrorMessage(null);
    setRegistrationErrorMessage(null);

    // data validation
    if( email === undefined || email.length == 0 ) {
      setEmailIsValid(false);
      setValidationEmailErrorMessage(t("email_empty"));
    } else if( !re.test(email) ) {
      setEmailIsValid(false);
      setValidationEmailErrorMessage(t("email_invalid"));
    } else if (password === undefined || password.length == 0 ) {
      setPasswordIsValid(false);
      setValidationPasswordErrorMessage(t("password_empty"));
    } else if ( password.length < 6 ) {
      setPasswordIsValid(false);
      setValidationPasswordErrorMessage(t("password_to_short"));
    } else if ( password != passwordConfirmation ) {
      setPasswordIsValid(false);
      setValidationPasswordErrorMessage(t("password_confirmation_error"));
    }  else if ( agreedToLA === undefined || !agreedToLA ) {
      setAgreedToLAIsValid(false);
      setValidationAgreedToLAErrorMessage(t("agreed_to_la_error"));
    } else {
        setEmailIsValid(null);
        setValidationEmailErrorMessage(null);
        setPasswordIsValid(null);
        setValidationPasswordErrorMessage(null);
        setPasswordConfirmationIsValid(null);
        setValidationPasswordConfirmationErrorMessage(null);
        setAgreedToLAIsValid(null);
        setValidationAgreedToLAErrorMessage(null);
        register({
          variables: {
            email,
            password,
            language: locale.toUpperCase(),
          }
        });
    }
  }

  return (<Registration
    t={t}
    languages={languages}
    currentLanguage={locale}
    onChangeLanguage={changeLanguage}
    goBack={goBack}
    registerUser={() => doRegister(register)}
    registering={loading}

    email={email}
    emailIsValid={emailIsValid}
    handleEmailChange={handleEmailChange}

    password={password}
    passwordIsValid={passwordIsValid}
    handlePasswordChange={handlePasswordChange}

    passwordConfirmation={passwordConfirmation}
    passwordConfirmationIsValid={passwordConfirmationIsValid}
    handlePasswordConfirmationChange={handlePasswordConfirmationChange}

    agreedToLA={agreedToLA}
    agreedToLAIsValid={agreedToLAIsValid}
    handleAgreedToLAChange={handleAgreedToLAChange}

    validationEmailErrorMessage={validationEmailErrorMessage}
    validationPasswordErrorMessage={validationPasswordErrorMessage}
    validationPasswordConfirmationErrorMessage={validationPasswordErrorMessage}
    validationAgreedToLAErrorMessage={validationAgreedToLAErrorMessage}

    registrationErrorMessage={registrationErrorMessage}
    registrationSuccessfully={data && data.register && data.register.message == 'USERCREATED'}

    domainLogoUrl={domainLogoUrl}
  />);
}

export default Panel;
