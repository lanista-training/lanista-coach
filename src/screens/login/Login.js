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
   * Function to translate content
  */
  authenticated: PropTypes.func,

  /**
   * Function to translate content
  */
  authenticating: PropTypes.func,

  /**
   * Function to translate content
  */
  authenticateUser: PropTypes.func,

  /**
   * Function to translate content
  */
  goToRegistration: PropTypes.func,

  /**
   * Function to translate content
  */
  goToForgotpassword: PropTypes.func,

  /**
   * Function to translate content
  */
  languages: PropTypes.func,

  /**
   * Function to translate content
  */
  currentLanguage: PropTypes.func,

  /**
   * Function to translate content
  */
  onChangeLanguage: PropTypes.func,

  /**
   * Function to translate content
  */
  email: PropTypes.func,

  /**
   * Function to translate content
  */
  emailIsValid: PropTypes.func,

  /**
   * Function to translate content
  */
  handleEmailChange: PropTypes.func,

  /**
   * Function to translate content
  */
  password: PropTypes.func,

  /**
   * Function to translate content
  */
  passwordIsValid: PropTypes.func,

  /**
   * Function to translate content
  */
  handlePasswordChange: PropTypes.func,

  /**
   * Function to translate content
  */
  validationEmailErrorMessage: PropTypes.func,

  /**
   * Function to translate content
  */
  validationPasswordErrorMessage: PropTypes.func,

  /**
   * Function to translate content
  */
  authenticationErrorMessage: PropTypes.func,

  /**
   * Function to translate content
  */
  tbt: PropTypes.func,

  /**
   * Function to translate content
  */
  goToRegistration: PropTypes.func,
};

export default Login;
