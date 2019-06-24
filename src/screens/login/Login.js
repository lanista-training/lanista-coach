import React, { useState } from 'react';
import styled from 'styled-components';
import LogoImage from '-!react-svg-loader!../../images/LanistaLogo.svg';
import { Input, Grid, Button } from 'semantic-ui-react';
import { Menu, MainButton, ChildButton } from "react-mfb";
import {useTransition, animated} from 'react-spring';

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

const Link = styled.div`
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

const StyledLoginButton = styled(Button)`
  width: 345px;
  height: 50px;
  background: ${props => props.theme.colors.primary}!important;
  color: white!important;
  line-height: 1.5em!important;
`;

const StyledRegisterButton = styled(Button)`
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

// ----------------------------------------------------------------------------

// Say hello from GraphQL, along with a HackerNews feed fetched by GraphQL
class Login extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { show: false };
  }

  componentDidMount() {
    this.setState({
      show: true
    });
  }

  componentWillUnmount() {
    this.setState({
      show: false
    });
  }

  render() {
    const effect = 'zoomin', pos = 'br', method = 'hover';
    const {show} = this.state;
    const {
      authenticateUser,
      authenticating,
      goToRegistration,
      error,
      errorMessage,
      t,
      languages,
      currentLanguage,
      onChangeLanguage,

      email,
      handleEmailChange,
      emailIsValid,

      password,
      handlePasswordChange,
      passwordIsValid,

      validationEmailErrorMessage,
      validationPasswordErrorMessage,
      authenticationErrorMessage,
    } = this.props;

    const languageItems = (languages ? languages.map((language) => <ChildButton
      icon="ion-social-github"
      label={language}
      className={language + "-flag"}
      key={language}
      onClick={(e) => {
        onChangeLanguage(language);
      }} />)
      : <ChildButton/>);

      const MyFooter = () => {
        const [show, set] = useState(false)
        const transitions = useTransition(show, null, {
          from: { opacity: 0 },
          enter: { opacity: 1 },
          leave: { opacity: 0 },
        })
        console.log( "MyFooter")
        return transitions.map(({ item, key, props }) =>
          {
            console.log( "item" )
            console.log( item )
            return (<animated.div key={key} style={props}><Footer key={key} style={props}>
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
            </Footer></animated.div>)
          }
        )
      }

    return (
      <Root className={"scene"} style={{display: "table", height: "100vh", width: "100vw"}}>
        <div style={{
          display: "table-cell",
          verticalAlign: "middle",
        }}>
          <Grid centered columns={1} style={{height:"60vh", marginTop: "-13vh"}}>
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

            <Grid.Row centered columns={1} style={{
              paddingBottom: 0,
              paddingTop: 0,
              height: 100,
              display: "grid"
            }}>
              <EmailValidationMessage>{validationEmailErrorMessage}</EmailValidationMessage>
              <Input placeholder='Email' disabled={authenticating} type={"email"}>
                <input
                  className={emailIsValid == false ? 'text-input-invalid': ''}
                  style={{
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    width: 345,
                    boxShadow: "rgba(0, 0, 0, 0.075) 0px 3.6px 4.5px 0px",
                  }}
                  value= {email}
                  onChange={handleEmailChange}
                />
              </Input>
              <Input placeholder='Password' disabled={authenticating} type={"password"}>
                <input
                  className={passwordIsValid == false ? 'text-input-invalid': ''}
                  style={{
                    borderTop: "none",
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    width: 345,
                    boxShadow: "rgba(0, 0, 0, 0.075) 0px 3.6px 4.5px 0px",
                  }}
                  value= {password}
                  onChange= {handlePasswordChange}
                />
              </Input>
              <PasswordValidationMessage>{validationPasswordErrorMessage}</PasswordValidationMessage>
              <PasswordValidationMessage>{authenticationErrorMessage}</PasswordValidationMessage>
            </Grid.Row>
            <Grid.Row centered columns={1} style={{paddingTop: 0}}>
              <Link>
                  <a>{t("login:forgot_password")}</a>
              </Link>
            </Grid.Row>
            <Grid.Row centered columns={1} style={{paddingTop: 0, paddingBottom: 0, height: 140, display: "grid"}}>
              <StyledLoginButton loading={authenticating} onClick={
                () => {
                  authenticateUser();
                }
              } disabled={authenticating}>
                { authenticating ? ("...") : t("login") }
              </StyledLoginButton>

              <StyledRegisterButton onClick={
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
              } disabled={authenticating}>
                {authenticating ? ("...") : t("register")}
              </StyledRegisterButton>
            </Grid.Row>
          </Grid>
          <MyFooter/>
        </div>
      </Root>
    )
  }
};

export default Login;
