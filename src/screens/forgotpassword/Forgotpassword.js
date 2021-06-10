/* eslint import/no-webpack-loader-syntax: off */
import * as React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LanistaTextField from '../../components/LanistaTextField';
import Button from '../../components/LanistaButton';
import { Menu, MainButton, ChildButton } from "react-mfb";
import LogoImage from '-!react-svg-loader!../../images/LanistaLogo.svg';
import _ from 'lodash';
import moment from "moment";

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
      margin-top: 10px;
      border-radius: 7px;
    }
    .email-field {
      fieldset {
        border-radius: 15px;
      }
      input {
        border-radius: 15px;
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
width: 100%;
  font-weight: 700;
  padding: 0 0 2em 0;
  line-height: 1em;
  text-align: justify;
  font-size: 23px;
  font-weight: 100;
`;

class Forgotpassword extends React.Component {

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
      languages,
      currentLanguage,
      goBack,
      onSendpasswordreset,
      loading,
      errorMessage,
      email,
      emailIsValid,
      handleEmailChange,
      passwordresetsuccessfull,
      t,
      onChangeLanguage,
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

            { !passwordresetsuccessfull &&
              <div className="input-fields-section">
                <LanistaTextField
                  className="email-field"
                  variant="outlined"
                  placeholder='Email'
                  disabled={loading}
                  type={"email"}
                  error={emailIsValid}
                  value= {email}
                  onChange={handleEmailChange}
                  helperText="Incorrect entry."
                  helperText={errorMessage}
                />
              </div>
            }


            <div className="buttons-section">
              {!passwordresetsuccessfull && (
                <Button
                  inverted={email && email.length > 0}
                  style={{marginTop: "2em"}}
                  loading={loading}
                  onClick={ () => { onSendpasswordreset() }}
                  disabled={loading || !(email && email.length > 0)}
                >
                  { loading ? ("...") : t("reset password") }
                </Button>
              )}

              {passwordresetsuccessfull && (
                <SuccessfullMessage>
                  {t('password-reset-successful')}
                </SuccessfullMessage>
              )}

              <Button key="button" inverted={passwordresetsuccessfull} onClick={() => {
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
      </Root>
    );
  }
};

Forgotpassword.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * A list with avaliable languages. Values: [de, en, es, pt, fr, ru]
  */
  languages: PropTypes.array,

  /**
   * The current language of the application
   * One of the following options: [de, en, es, pt, fr, ru]
  */
  currentLanguage: PropTypes.string,

  /**
   * Navigate to the login screen
  */
  goBack: PropTypes.func,

  /**
   * Send the password reset mail
  */
  onSendpasswordreset: PropTypes.func,

  /**
   * Graphql error object for the function onSendpasswordreset
  */
  errorMessage: PropTypes.object,

  /**
   * Enail validation result
  */
  emailIsValid: PropTypes.bool,

  /**
   * Function to be used in the form
  */
  handleEmailChange: PropTypes.func,

  /**
   * Is true if the password reset mail was send successfully
  */
  passwordresetsuccessfull: PropTypes.bool,

};

export default Forgotpassword;
