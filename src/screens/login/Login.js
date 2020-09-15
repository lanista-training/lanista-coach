/* eslint import/no-webpack-loader-syntax: off */
import React, { useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import PropTypes from 'prop-types';
import LogoImage from '-!react-svg-loader!../../images/LanistaLogo.svg';
import {
  Root,
  LanistaLogo,
  StyledLink,
  EmailValidationMessage,
  PasswordValidationMessage,
  StyledLoginButton,
  StyledRegisterButton,
  Footer,
  Nav
} from './styles';
import LanistaButton from '../../components/LanistaButton';
import LanistaTextField from '../../components/LanistaTextField';
import { Menu, MainButton, ChildButton } from "react-mfb";
import {useSpring, animated} from 'react-spring';
import Link from 'next/link';
import TrainerList from './TrainerList';

const effect = 'zoomin', pos = 'br', method = 'hover';

const MyFooter = ({currentLanguage, languageItems}) => {
  //const [visible, toggle] = useState(true)
  const props = useSpring({opacity: 1, from:{opacity: 0}})
  return (
    <animated.div style={props}>
      <Footer>
        <Nav style={{color: 'black'}}>
          © Lanista Trainingssoftware 2012
          <a>
            Impresum
          </a>
          <a>
            Datenschutz
          </a>
          <a>
            Info
          </a>
        </Nav>
        <Menu effect={effect} method={method} position={pos}>
          <MainButton className={currentLanguage + "-flag"} iconResting="ion-plus-round" iconActive="ion-close-round" />
          {languageItems}
        </Menu>
      </Footer>
    </animated.div>
  )
}

// ----------------------------------------------------------------------------

// Say hello from GraphQL, along with a HackerNews feed fetched by GraphQL
const Login = ({
  authenticateUser,
  authenticating,
  goToRegistration,
  goToForgotpassword,
  error,
  errorMessage,

  email,
  handleEmailChange,
  emailIsValid,

  password,
  handlePasswordChange,
  passwordIsValid,

  validationEmailErrorMessage,
  validationPasswordErrorMessage,
  authenticationErrorMessage,

  tbt
}) => {

  const [show, setShow] = useState(true);
  const {t, locale, changeLanguage, languages} = useTranslate("login");

  const languageItems = (languages ? languages.filter(l => l != locale).map((language) => <ChildButton
    icon="ion-social-github"
    label={language}
    className={language + "-flag"}
    key={language}
    onClick={(e) => {
      changeLanguage(language);
    }} />)
    : <ChildButton/>);

  useEffect(()=>{
    setShow(true);
  }, []);

  return (
    <Root className={"scene"}>
      <div className="main-section">
        {
          tbt && (
            <TrainerList
              t={t}
              tbt={tbt}

              password= {password}
              onPasswordChange={handlePasswordChange}

              onEmaiChange={handleEmailChange}
              disabled={authenticating}
              error={passwordIsValid}
              helperText={validationPasswordErrorMessage || authenticationErrorMessage}

              authenticateUser={authenticateUser}
              loading={authenticating}

              goToForgotpassword={goToForgotpassword}
            />
          )
        }
        { !tbt && (
          <div className="form-section">

            <LanistaLogo  style={{}}>
              <LogoImage width={60} height={60}/>
              <div className="sub-header">
                Lanista<span>Coach</span>
              </div>
            </LanistaLogo>

            <div className="input-fields-section">
              <LanistaTextField
                className="email-field"
                variant="outlined"
                placeholder='Email'
                disabled={authenticating}
                type={"email"}
                error={emailIsValid}
                value= {email}
                onChange={handleEmailChange}
                helperText="Incorrect entry."
                helperText={validationEmailErrorMessage}
              />
              <LanistaTextField
                className="password-field"
                variant="outlined"
                placeholder='Password'
                disabled={authenticating}
                type={"password"}
                error={passwordIsValid}
                value= {password}
                onChange= {handlePasswordChange}
                helperText={validationPasswordErrorMessage || authenticationErrorMessage}
              />
            </div>


            <StyledLink onClick={goToForgotpassword}>
                <a >{t("forgot_password")}</a>
            </StyledLink>

            <div className="buttons-section">
              <LanistaButton
                loading={authenticating}
                onClick={
                  () => {
                    authenticateUser();
                  }
                }
                disabled={authenticating}
                inverted
              >
                { authenticating ? ("...") : t("login") }
              </LanistaButton>
              <LanistaButton
                onClick={
                  (e) => {
                    const {x, y, height, width} = e.target.getBoundingClientRect();
                    goToRegistration({
                      x,
                      y,
                      height,
                      width
                    });
                    //this.setState({show: false});
                  }
                }
              disabled={authenticating}
              >
                {authenticating ? ("...") : t("register")}
              </LanistaButton>
            </div>
          </div>
        )}

      </div>
      <MyFooter currentLanguage={locale} languageItems={languageItems}/>
    </Root>
  )
};

Login.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Flag to signalize that the user has valid token.
  */
  authenticated: PropTypes.func,

  /**
   * Graphql loading flag for the authentication process
  */
  authenticating: PropTypes.func,

  /**
   * Function to request an authentication token
  */
  authenticateUser: PropTypes.func,

  /**
   * Navigate to the regisgration screen
  */
  goToRegistration: PropTypes.func,

  /**
   * Navigate to the forgotpassword screen
  */
  goToForgotpassword: PropTypes.func,

  /**
   * An array with all available languages. Values: [de, en, es, pt, fr, ru]
  */
  languages: PropTypes.func,

  /**
   * Current language. One of: [de, en, es, pt, fr, ru]
  */
  currentLanguage: PropTypes.func,

  /**
   * Function to change the current vallue of the language. Valid values: [de, en, es, pt, fr, ru]
  */
  onChangeLanguage: PropTypes.func,

  /**
   * value string for the form
  */
  email: PropTypes.func,

  /**
   * To be used in the form in case of validation error
  */
  emailIsValid: PropTypes.bool,

  /**
   * Function to be used in the form for the email field
  */
  handleEmailChange: PropTypes.func,

  /**
   * value string for the form
  */
  password: PropTypes.func,

  /**
   * To be used in the form in case of validation error
  */
  passwordIsValid: PropTypes.func,

  /**
   * Function to be used in the form for the email field
  */
  handlePasswordChange: PropTypes.func,

  /**
   * A string with an error text to be used in the form
  */
  validationEmailErrorMessage: PropTypes.string,

  /**
   * A string with an error text to be used in the form
  */
  validationPasswordErrorMessage: PropTypes.func,

  /**
   * A string with an error text to be used in the form
  */
  authenticationErrorMessage: PropTypes.func,

  /**
   * If this value is set, show the trainer list for the bu
  */
  tbt: PropTypes.func,

  /**
   * Navigate to the registration screen
  */
  goToRegistration: PropTypes.func,
};

export default Login;
