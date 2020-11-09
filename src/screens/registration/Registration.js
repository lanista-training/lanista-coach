/* eslint import/no-webpack-loader-syntax: off */
import * as React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Grid, Checkbox, Icon, Modal, Header, Image } from 'semantic-ui-react';
import LanistaTextField from '../../components/LanistaTextField';
import Button from '../../components/LanistaButton';
import LogoImage from '-!react-svg-loader!../../images/LanistaLogo.svg';
import {Menu, MainButton, ChildButton} from "react-mfb";
import {LegalContent} from "./legalContent";

const StyledRegisterButton = styled(Button)`
  width: 345px;
  height: 50px;
  background: #d20027!important;
  color: white!important;
  line-height: 1.5em!important;
`;

const StyledBackButton = styled(Button)`
  width: 345px;
  height: 50px;
  margin-top: 4.5em!important;
  background: #f4f2f2!important;
  color: #d20027!important;
  line-height: 1.5em!important;
`;

const Root = styled.div`
width: 100%;
height: 100%;
background-size: cover;
background-position: center center;
background-repeat: no-repeat;
display: flex;
flex-flow: column;
.main-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-section {
    width: 370px;
    padding: 3em;
    margin-top: -50px;
    background: white;
    box-shadow: 0 0 27px 0 #0000001f;
    border-radius: 15px;
    .MuiFormHelperText-root {
      color: white;
      background: #d20027;
      margin: 0;
      text-align: center;
      line-height: 21px;
    }
    .email-field {
      fieldset {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom: 0;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
      }
      input {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
      }
    }
    .password-field {
      fieldset {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom: 0;
      }
      input {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .password-confirmation-field {
      fieldset {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
      }
      input {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
      }
    }
    .input-fields-section {
      .MuiTextField-root {
        input {
          ::selection {
            background-color: initial!important;
          }
        }
      }
    }
    .input-fields-section {
      display: flex;
      flex-flow: column;
    }
    .buttons-section {
      margin-top: 3em;
      display: flex;
      flex-flow: column;
      align-items: center;
      button {
        height: 50px;
        width: 200px;
        border-radius: 35px!important;
        margin-bottom: 1em;
      }
    }
  }
}
`;

const LanistaLogo = styled.div`
  text-align: center;
  margin-bottom: 3em;
  svg {
    width: 45px;
  }
  .sub-header {
   font-size: 18px;
   font-weight: 900;
   letter-spacing: -1px;
   margin-top: -10px;
   span {
     font-weight: 100;
   }
  }
  a:hover {
    /* shows an example of how we can use themes */
    color: #FFA500;
  }
`;

const PasswordValidationMessage = styled.div`
  text-align: center;
  width: 100%;
  color: #d20027;
  margin-top: 2em;
`;

const Footer = styled.footer`
  display: block;
  font-weight: 300;
  font-style: normal;
  font: 125% / 1.45 sans-serif;
  color: #f4f2f2;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.05) 0px -1em 3em;
  min-height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 1em;
`;

const Nav = styled.nav`
  font-size: 0.8em;
  a {
    padding-left: 3.5em;
    color: black;
  }
  a:hover {
    /* shows an example of how we can use themes */
    color: #d20027;
  }
  a:after {
    /* shows an example of how we can use themes */
    content: ">";
    font-size: 1.2em;
    position: fixed;
    padding-left: 0.1em;
  }
`;

const SuccessfullMessage  = styled.div`
  color: #d20027;
  width: 100%;
  font-size: 2em;
  font-weight: 700;
  padding: 0 0 2em 0;
  line-height: 1em;
  text-align: center;
`;
class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      entered: false,
      enteredFinished: false,
      showLegalAgreements: false,
      agreedToLA: false,
    };
    this.onShowLegalAgreements = this.onShowLegalAgreements.bind(this);
  }

  componentDidMount() {
    this.setState({
      show: true
    });
  }

  onShowLegalAgreements() {
    this.setState({
      showLegalAgreements: true
    });
  }

  onAgreedToLA() {
    const {handleAgreedToLAChange} = this.props;
    this.setState({
      showLegalAgreements: false,
    });
    handleAgreedToLAChange(true);
  }

  onNotAgreedToLA() {
    const {handleAgreedToLAChange} = this.props;
    this.setState({
      showLegalAgreements: false,
    });
    handleAgreedToLAChange(false);
  }

  render() {

    const effect = 'zoomin', pos = 'br', method = 'hover';

    const {
      currentLanguage,
      languages,
      goBack,
      targetButton,
      t,
      onChangeLanguage,
      registerUser,
      registering,

      emailIsValid,
      passwordIsValid,
      passwordConfirmationIsValid,
      agreedToLAIsValid,

      email,
      password,
      passwordConfirmation,
      agreedToLA,

      handleEmailChange,
      handlePasswordChange,
      handlePasswordConfirmationChange,
      handleAgreedToLAChange,

      validationEmailErrorMessage,
      validationPasswordErrorMessage,
      validationAgreedToLAErrorMessage,
      registrationErrorMessage,
      registrationSuccessfully,
    } = this.props;

    const {
      show,
      entered,
      enteredFinished,
      showLegalAgreements,
    } = this.state;

    const languageItems = (languages ? languages.map((language) => <ChildButton
      icon="ion-social-github"
      label={language}
      className={language + "-flag"}
      key={language}
      onClick={(e) => {
        onChangeLanguage(language);
      }} />)
      : <ChildButton/>);

    console.log("validationEmailErrorMessage", emailIsValid, registrationErrorMessage)

    return(
      <Root className={"scene"} style={{height: "100vh", width: "100vw", verticalAlign: "middle"}}>
        <div className="main-section">
          <div className="form-section">
          <LanistaLogo>
            <LogoImage width={60} height={60}/>
              <div className="sub-header">
                Lanista<span>Coach</span>
              </div>
            </LanistaLogo>
            {!registrationSuccessfully && (
              <div className="input-fields-section">
                <LanistaTextField
                  className="email-field"
                  variant="outlined"
                  placeholder='Email'
                  disabled={registering}
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
                  disabled={registering}
                  type={"password"}
                  error={passwordIsValid}
                  value= {password}
                  onChange= {handlePasswordChange}
                  helperText={validationPasswordErrorMessage}
                />
                <LanistaTextField
                  className="password-confirmation-field"
                  variant="outlined"
                  placeholder='Password Confirmation'
                  disabled={registering}
                  type={"password"}
                  error={passwordIsValid}
                  value= {passwordConfirmation}
                  onChange= {handlePasswordConfirmationChange}
                  helperText={registrationErrorMessage}
                />
                 <Checkbox
                  className={agreedToLAIsValid == false ? 'text-input-invalid': ''}
                  style={{
                     paddingTop: "1em",
                     textAlign: "left",
                     fontSize: "1.2em",
                     lineHeight: "1.2em",
                     top: "1em",
                   }}
                  label={t("terms_and_conditions")}
                  onClick={this.onShowLegalAgreements}
                  value={agreedToLA ? 1 : 0}
                  checked={agreedToLA}
                 />
                 <PasswordValidationMessage >{validationAgreedToLAErrorMessage}</PasswordValidationMessage>
              </div>
            )}

            <div className="buttons-section">
              {!registrationSuccessfully && (
                <Button
                  inverted
                  style={{marginTop: "2em"}}
                  loading={registering}
                  onClick={ () => { registerUser() }}
                  disabled={registering}
                >
                  { registering ? ("...") : t("register") }
                </Button>
              )}

              {registrationSuccessfully && (
                <SuccessfullMessage>
                  {t('registration successfull')}
                </SuccessfullMessage>
              )}

              <Button key="button"  onClick={() => {
                this.setState({
                  show: false
                });
                goBack();
              }}>
                {t("to_login")}
              </Button>
            </div>
          </div>
          <Footer style={{}}>
            <Nav style={{color: 'black', fontFamily: 'Roboto'}}>
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
        </div>
        <Modal open={showLegalAgreements}>
          <Modal.Header>{t("legal title")}</Modal.Header>
          <Modal.Content image>
            <LegalContent/>
          </Modal.Content>
          <Modal.Actions>
            <Button secondary onClick={()=>{
              this.onNotAgreedToLA();
            }}>
              <Icon name='left chevron' style={{marginTop: "-10px"}}/> Cancel
            </Button>
            <Button color="red" style={{marginLeft: "10px"}} onClick={()=>{
              this.onAgreedToLA();
            }}>
              Agree <Icon name='right chevron' style={{marginTop: "-10px"}}/>
            </Button>
          </Modal.Actions>
        </Modal>
      </Root>
    );
  }
};

Registration.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Current language. One of: [de, en, es, pt, fr, ru]
  */
  currentLanguage: PropTypes.func,

  /**
   * An array with all available languages. Values: [de, en, es, pt, fr, ru]
  */
  languages: PropTypes.func,

  /**
   * Function to translate content
  */
  goBack: PropTypes.func,

  /**
   * Back function on the browser history
  */
  targetButton: PropTypes.func,

  /**
   * Function to change the current vallue of the language. Valid values: [de, en, es, pt, fr, ru]
  */
  onChangeLanguage: PropTypes.func,

  /**
   * Create a new trainer on the server
  */
  registerUser: PropTypes.func,

  /**
   * Graphql loading flag for the function registerUser
  */
  registering: PropTypes.func,

  /**
   * To be used in the form in case of validation error
  */
  emailIsValid: PropTypes.func,

  /**
   * To be used in the form in case of validation error
  */
  passwordIsValid: PropTypes.func,

  /**
   * To be used in the form in case of validation error
  */
  passwordConfirmationIsValid: PropTypes.func,

  /**
   * To be used in the form in case of validation error
  */
  agreedToLAIsValid: PropTypes.func,

  /**
   * value string for the form
  */
  email: PropTypes.func,

  /**
   * value string for the form
  */
  password: PropTypes.func,

  /**
   * value string for the form
  */
  passwordConfirmation: PropTypes.func,

  /**
   * value string for the form
  */
  agreedToLA: PropTypes.func,

  /**
   * Function to be used in the form for the email field
  */
  handleEmailChange: PropTypes.func,

  /**
   * Function to be used in the form for the password field
  */
  handlePasswordChange: PropTypes.func,

  /**
   * Function to be used in the form for the pasword confirmation field
  */
  handlePasswordConfirmationChange: PropTypes.func,

  /**
   * Function to be used in the form for the check box field
  */
  handleAgreedToLAChange: PropTypes.func,

  /**
   * A string with an error text to be used in the form
  */
  validationEmailErrorMessage: PropTypes.func,

  /**
   * A string with an error text to be used in the form
  */
  validationPasswordErrorMessage: PropTypes.func,

  /**
   * A string with an error text to be used in the form
  */
  validationAgreedToLAErrorMessage: PropTypes.func,

  /**
   * A string with an error text to be used in the form
  */
  registrationErrorMessage: PropTypes.func,

  /**
   * Flag to be used to know when the registration process is finished
  */
  registrationSuccessfully: PropTypes.func,
}

export default Registration;
