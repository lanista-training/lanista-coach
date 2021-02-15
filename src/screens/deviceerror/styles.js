import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  flex-flow: column;
  .mfb-component__wrap {
    margin-bottom: 60px;
  }
  .main-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .form-section {
      width: 80%;
      padding: 3em;
      margin-top: -50px;
      background: white;
      box-shadow: 0 0 27px 0 #0000001f;
      border-radius: 15px;
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
        margin-top: 5em;
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

export const LanistaLogo = styled.div`
 text-align: center;
 margin-bottom: 5em;
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

export const StyledLink = styled.div`
 font-size: 16px;
 text-align: center;
 margin-top: 1em;
 a {
   /* shows an example of how we can use themes */
   color: black;
   font-weight: 100;
   font-size: 14px;
 }
 a:hover {
   /* shows an example of how we can use themes */
   color: #d20027;
 }
`;

export const EmailValidationMessage = styled.div`
 position: absolute;
 text-align: center;
 width: 100%;
 top: -20px;
 color: #d20027;
`;

export const PasswordValidationMessage = styled.div`
 position: absolute;
 text-align: center;
 width: 100%;
 top: 100px;
 color: #d20027;
`;

export const StyledLoginButton = styled(Button)`
 width: 345px;
 height: 50px;
 background: #d20027!important;
 color: white!important;
 line-height: 1.5em!important;
`;

export const StyledRegisterButton = styled(Button)`
 width: 345px;
 height: 50px;
 background: #f4f2f2!important;
 color: #d20027!important;
 line-height: 1.5em!important;
`;

export const Footer = styled.footer`
 font-family: Roboto;
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

export const Nav = styled.nav`
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
   line-height: 1.1em;
   margin-left: 0.2em;
  }
`;
