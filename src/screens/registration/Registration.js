import * as React from "react";
import styled from 'styled-components';
import { Input, Grid, Button, Checkbox, Icon, Modal, Header, Image } from 'semantic-ui-react';
import LogoImage from '-!react-svg-loader!../../images/LanistaLogo.svg';
import {Menu, MainButton, ChildButton} from "react-mfb";
import {LegalContent} from "./legalContent";

const StyledRegisterButton = styled(Button)`
  width: 345px;
  height: 50px;
  background: ${props => props.theme.colors.primary}!important;
  color: white!important;
  line-height: 1.5em!important;
`;

const StyledBackButton = styled(Button)`
  width: 345px;
  height: 50px;
  margin-top: 4.5em!important;
  background: ${props => props.theme.colors.secondary}!important;
  color: ${props => props.theme.colors.primary}!important;
  line-height: 1.5em!important;
`;

const Root = styled.div`
  background-image: url(https://lanistacoach.s3.amazonaws.com/static/img/registration-background.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const LanistaLogo = styled.div`
  font-size: 16px;
  text-align: center;
  a:hover {
    /* shows an example of how we can use themes */
    color: ${props => props.theme.colors.orange};
  }
`;

const EmailValidationMessage = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  top: -5px;
  color: #d20027;
`;

const PasswordValidationMessage = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  top: 150px;
  color: #d20027;
`;

const Footer = styled.footer`
  display: block;
  font-weight: 300;
  font-style: normal;
  font: 125% / 1.45 sans-serif;
  color: ${props => props.theme.colors.secondary};
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
    color: ${props => props.theme.colors.primary};
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
  color: ${props => props.theme.colors.primary};
  width: 100%;
  font-size: 2em;
  font-weight: 700;
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

    return(
      <div key="content" style={{height: "100vh", width: "100vw"}}>
        <div style={{
          display: "table-cell",
          verticalAlign: "middle",
        }}>
          <Root className={"scene"} style={{height: "100vh", width: "100vw", verticalAlign: "middle"}}>
            <Grid centered columns={1} style={{height:"60vh", marginTop: "15vh"}}>
              <Grid.Row centered columns={1}>
                <LanistaLogo  style={{}}>
                  <LogoImage width={60} height={60}/>
                  <div style={{
                    fontFamily: "Abel",
                    fontSize: "1.75em",
                    marginTop: "1em",
                  }}>
                    Lanista Coach
                  </div>
                </LanistaLogo>
              </Grid.Row>
              {!registrationSuccessfully && (<Grid.Row centered columns={1} style={{
                paddingBottom: 0,
                paddingTop: 15,
                height: 220,
                display: "grid"
              }}>
                <EmailValidationMessage>{validationEmailErrorMessage}</EmailValidationMessage>
                <Input placeholder='Email' disabled={registering} type={"email"}>
                  <input
                    className={emailIsValid == false ? 'text-input-invalid': ''}
                    style={{
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                      width: 345,
                      boxShadow: "rgba(0, 0, 0, 0.075) 0px 3.6px 4.5px 0px",
                    }}
                    value= {email}
                    onChange= {handleEmailChange}
                  />
                </Input>
                <Input placeholder='Password' disabled={registering} type={"password"}>
                  <input
                    className={passwordIsValid == false ? 'text-input-invalid': ''}
                    style={{
                      borderTop: "none",
                      borderTopRightRadius: 0,
                      borderTopLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                      width: 345,
                      boxShadow: "rgba(0, 0, 0, 0.075) 0px 3.6px 4.5px 0px",
                    }}
                    value= {password}
                    onChange= {handlePasswordChange}
                  />
                </Input>
                <Input placeholder='Password Confirmation' disabled={registering} type={"password"}>
                  <input
                    className={passwordConfirmationIsValid == false ? 'text-input-invalid': ''}
                    style={{
                      borderTop: "none",
                      borderTopRightRadius: 0,
                      borderTopLeftRadius: 0,
                      width: 345,
                      boxShadow: "rgba(0, 0, 0, 0.075) 0px 3.6px 4.5px 0px",
                    }}
                    value= {passwordConfirmation}
                    onChange= {handlePasswordConfirmationChange}
                  />
                </Input>
                <PasswordValidationMessage style={{top: "12em"}}>{validationPasswordErrorMessage}</PasswordValidationMessage>
                <PasswordValidationMessage style={{top: "12em"}}>{registrationErrorMessage}</PasswordValidationMessage>
               <Checkbox
                className={agreedToLAIsValid == false ? 'text-input-invalid': ''}
                style={{
                   paddingTop: "1em",
                   width: 345,
                   textAlign: "left",
                   fontSize: "1.2em",
                   lineHeight: "1.2em",
                   top: "1em",
                 }}
                label={t("login:terms_and_conditions")}
                onClick={this.onShowLegalAgreements}
                value={agreedToLA ? 1 : 0}
                checked={agreedToLA}
               />
               <PasswordValidationMessage style={{top: "16em"}}>{validationAgreedToLAErrorMessage}</PasswordValidationMessage>
              </Grid.Row>)}

              {!registrationSuccessfully && (<Grid.Row centered columns={1} style={{paddingTop: 0, paddingBottom: 0, height: 30, display: "grid"}}>
                <StyledRegisterButton style={{marginTop: "2em"}} loading={registering} onClick={
                  () => {
                    registerUser();
                  }
                } disabled={registering}>
                  { registering ? ("...") : t("register") }
                </StyledRegisterButton>
              </Grid.Row>)}

              {registrationSuccessfully && (<SuccessfullMessage>
                {t('registration successfull')}
              </SuccessfullMessage>)}

              <StyledBackButton key="button"  onClick={() => {
                this.setState({
                  show: false
                });
                goBack();
              }}>
                {t("login:to_login")}
              </StyledBackButton>
            </Grid>
          </Root>
          <Footer style={{}}>
            <Nav style={{color: 'black', fontFamily: 'Abel'}}>
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
              Cancel <Icon name='left chevron' />
            </Button>
            <Button color="red" onClick={()=>{
              this.onAgreedToLA();
            }}>
              Agree <Icon name='right chevron' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
};

export default Registration;
