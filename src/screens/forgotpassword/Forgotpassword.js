import * as React from "react";
import styled from 'styled-components';
import { Input, Grid, Button, Checkbox, Icon, Modal, Header, Image } from 'semantic-ui-react';
import { Menu, MainButton, ChildButton } from "react-mfb";
import LogoImage from '-!react-svg-loader!../../images/LanistaLogo.svg';
import _ from 'lodash';
import moment from "moment";

const effect = 'zoomin', pos = 'br', method = 'hover';

const Root = styled.div`
  background-image: url(https://lanistacoach.s3.amazonaws.com/static/img/login-background.jpg);
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

const StyledLink = styled.div`
 font-size: 16px;
 text-align: center;
 padding-top: 1em;
 a {
   /* shows an example of how we can use themes */
   color: black;
 }
 a:hover {
   /* shows an example of how we can use themes */
   color: ${props => props.theme.colors.primary};
 }
`;

const EmailValidationMessage = styled.div`
 position: absolute;
 text-align: center;
 width: 100%;
 top: -20px;
 color: #d20027;
`;

const PasswordValidationMessage = styled.div`
 position: absolute;
 text-align: center;
 width: 100%;
 top: 100px;
 color: #d20027;
`;

const StyledActionButton = styled(Button)`
 width: 345px;
 height: 50px;
 background: ${props => props.theme.colors.primary}!important;
 color: white!important;
 line-height: 1.5em!important;
`;

const StyledBackButton = styled(Button)`
  width: 345px;
  height: 50px;
  background: ${props => props.theme.colors.secondary}!important;
  color: ${props => props.theme.colors.primary}!important;
  line-height: 1.5em!important;
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

const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.primary};
  position: relative;
  width: 100%;
  font-size: 1.5em;
  font-weight: 700;
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

class Forgotpassword extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  render() {
    const {
      errorMessage,
      processing,
      emailIsValid,
      email,
      handleEmailChange,
      t,
      currentLanguage,
      languages,
      goBack,
      onSendpasswordreset,
      passwordresetsuccessfull,
    } = this.props

    console.log( "emailIsValid" )
    console.log(emailIsValid)

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
            <Grid centered columns={1} style={{height:"60vh", marginTop: "20vh"}}>
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
              {!passwordresetsuccessfull && (<Grid.Row centered columns={1}>
                <EmailValidationMessage>{errorMessage}</EmailValidationMessage>
                <Input placeholder='Email' disabled={processing} type={"email"}>
                  <input
                    className={emailIsValid == false ? 'text-input-invalid': ''}
                    style={{
                      width: 345,
                      lineHeight: "2em",
                      boxShadow: "rgba(0, 0, 0, 0.075) 0px 3.6px 4.5px 0px",
                    }}
                    value= {email}
                    onChange= {handleEmailChange}
                  />
                </Input>
              </Grid.Row>)}
              {!passwordresetsuccessfull && (<Grid.Row centered columns={1} style={{paddingTop: 0, paddingBottom: 0, height: 30, display: "grid"}}>
                <StyledActionButton loading={processing} onClick={onSendpasswordreset} disabled={processing}>
                  { processing ? ("...") : t("reset password") }
                </StyledActionButton>
              </Grid.Row>)}
              {passwordresetsuccessfull && (
                <SuccessMessage>{t('check your mailbox')}</SuccessMessage>
              )}
              <StyledBackButton key="button"  onClick={() => {
                this.setState({
                  show: false
                });
                goBack();
              }}>
                {t("to_login")}
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
      </div>
    );
  }
};

export default Forgotpassword;
