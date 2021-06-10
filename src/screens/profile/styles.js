import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import { List } from '@material-ui/core';
import Item from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';

export const Stage = styled.div`
  padding-top: 60px!important;
  padding-bottom: 6em!important;
  overflow: scroll;
  height: 100vh;
  width: 750px;
  overflow: visible;
  display: flex;
  #section-photo {
    .content {
      height: 477px;
    }
    .loading-image {
      height: 477px;
    }
  }
  ::-webkit-scrollbar {
    display: none!important;
  }
  .content-section {
    flex: 2 1 0%;
  }
  .navigation-section {
    width: 250px;
    margin-left: 40px;
    flex: 1 1 0%;
    .navigation-panel {
      position: fixed;
      top: 35%;
      text-align: left;
      padding: 1em;
      background: #00000057;
      border-radius: 15px;
      color: white;
      a {
        color: white;
      }
      .MuiListItemText-primary {
        font-weight: 100;
      }
      .MuiListItemIcon-root {
        min-width: 0;
        margin-right: 0.5em;
        color: white;
      }
      .MuiListItem-button {
        padding: 0.25em 1em;
      }
    }
  }
  .section {
    padding-top: 2em;
    width: 100%;
    padding-bottom: 2em;
    form {
      padding: 2em;
      label.Mui-focused {
        color: black;
      }
      .MuiInput-underline:after {
        border-bottom-color: black;
      }
    }
    .id-section {
      display: flex;
      flex-flow: row-reverse;
      span {
        font-weight: 900;
        margin-left: 10px;
      }
    }
    .section-header {
      font-size: 19px;
      font-weight: 900;
      font-family: Roboto;
      line-height: 3em;
      text-align: left;
    }
    .MuiFormControl-root {
      width: 100%;
      margin: 1.5em 0;
    }
    .MuiSelect-root {
      text-align: left;
    }
    .strength-meter {
      padding: 1em;
      border-radius: 15px;
      border-style: solid;
      border-width: 1px;
      border-color: #cccccc;
      text-align: left;
      .progress-bar {
        margin-bottom: 1em;
      }
      .messages-header {
        margin-bottom: 1em;
        font-weight: 700;
      }
      .strength-message, .strength-message-pass {
        display: flex;
        place-items: center;
        padding: 3px;
        svg {
          margin-right: 10px;
        }
      }
      .strength-message {
        color: rgb(219,40,40);
      }
      .strength-message-pass {
        color: rgb(155,201,61);
      }
    }
    .password-successfully-changed {
      min-height: 10em;
      display: flex;
      flex-flow: column;
      padding: 2em;
      align-items: center;
      svg {
        color: rgb(155,201,61);
        font-size: 5em;
        margin-top: 0.2em;
      }
      button{
        margin-top: 2em;
      }
    }
    .MuiStepIcon-root.MuiStepIcon-active {
      color: black;
    }
    .MuiStepIcon-root.MuiStepIcon-completed {
      color: black;
    }
    .status-item-section {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      button {
        width: 250px;
        .MuiButton-label {
          color: white;
        }
      }
      .green {
        background-color: #59d76e!important;
        padding-left: 1em!important;
        font-weight: 900;
        color: white!important;
      }
      .yellow {
        background-color: #FDB825!important;
        padding-left: 1em!important;
        font-weight: 900;
        color: white!important;
      }
      .red {
        background-color: #db2828!important;
        padding-left: 1em!important;
        font-weight: 900;
        color: white!important;
      }
    }
  }
  #section-address {
    padding-bottom: 8em;
  }
`;

export const FormInput = styled.input`
  border-color: transparent!important;
  padding-left: 0!important;
  width: 100%!important;
`;
export const CardSection = styled.div`
  padding-top: 2em;
  width: 100%;
  padding-bottom: 2em;
  label {
    .MuiButtonBase-root {
      background-color: rgb(155,201,61)!important;
    }
    .MuiButton-label {
      color: white!important;
      padding: 5px 0;
      font-size: 14px;
      font-weight: 100;
    }
    float: right;
    margin-top: 1em!important;
  }
  .upload-button {

  }
`;
export const FixedSection = styled.div`
  position: fixed;
  top: 9.5em;
  width: 29%;
  max-width: 290px;
  padding-left: 1em;
`;
export const CardHeader = styled.div`
  font-weight: bold;
  text-align: left!important;
`;

export const StyledCard = styled.div`
  width: 100%!important;
  background-color: white;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 15px;
  box-shadow: 0 0 27px 0 #0000001f;
  padding: 2em;
  text-align: center;
  .save-personal-data-button {
    margin-top: 3em;
  }
  .empty-image {
    margin-top: 20%;
    top: initial!important;
  }
`;

export const CardInput = styled(Input)`
  border: 0;
  border-bottom-color: rgb(201, 201, 201);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-radius: 0;
  margin-top: 2em!important;
  .input {
    display: block;
  }
`;
export const ColloredCardInput = styled(Input)`
  border: 0;
  border-bottom: 0!important;
  border-bottom-color: rgb(201, 201, 201);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-radius: 0;
  margin-top: 2em!important;
  input {
    margin-top: 0.7em!important;
    pointer-events:none;
  }
  .input {
    display: block;
  }
  .green {
    background-color: #59d76e!important;
    padding-left: 1em!important;
    font-weight: 900;
    color: white!important;
  }
  .yellow {
    background-color: #FDB825!important;
    padding-left: 1em!important;
    font-weight: 900;
    color: white!important;
  }
  .red {
    background-color: #db2828!important;
    padding-left: 1em!important;
    font-weight: 900;
    color: white!important;
  }
  ::after {
    position: absolute;
    left: auto;
    right: 0.7em;
    -webkit-mask-size: 1em;
    content: '?'!important;
    -webkit-mask-image: none!important;
    margin-top: -2.3em !important;
    width: 2em!important;
    height: 2em!important;
    border-radius: 50%;
    text-align: center;
    line-height: 2em!important;
    background-color: #34acfb;
    color: white;
    margin-left: 1em;
  }
`;

export const CardDateInput = styled(Input)`
  border: 0;
  border-bottom-color: rgb(201, 201, 201);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-radius: 0;
  margin-top: 2em!important;
  .input {
    display: block;
    border: 0!important;
  }
  .MuiTextField-root {
     width: 100%!important;
     margin: 0;
     .MuiInputBase-root:before {
       border-bottom: 0!important;
     }
     input {
       border: 0!important;
       flex: 1;
       padding-left: 0!important;
     }
   }
`;

export const CardCheckbox = styled(Input)`
  border: 0;
  border-radius: 0;
  margin-top: 2em!important;
`;


export const ImageSegment = styled.div`
  background-image: url(${props => props.photoUrl})!important;
  background-size: cover!important;
  height: 330px;
  padding-top: 7em!important;
  font-size: 1.2rem!important;
  -webkit-box-shadow: 0 2px 25px 0 rgba(34,36,38,.05) inset!important;
  box-shadow: 0 2px 25px 0 rgba(34,36,38,.05) inset!important;
`;
export const ToolsList = styled(List)`
  color: rgba(0,0,0,.6);
`;
export const ListItem = styled(Item)`
  padding: 1.5em!important;
  border-bottom-style: solid;
  border-bottom-width: 1px!important;
  border-bottom-color: rgba(0, 0, 0, 0.075)!important;
`;
export const ListHeader = styled.div`
  color: rgb(116, 116, 116)!important;
`;
export const ListIcon = styled(Icon)`
  color: rgb(116, 116, 116)!important;
  padding-right: 1.5em!important;
`;
export const CardButton = styled.div`
  .Mui-disabled {
    cursor: default;
    opacity: .45!important;
    background-image: none!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    pointer-events: none!important;
  }
  button {
    background-color: rgb(155,201,61);
    float: right;
    margin-top: 1em!important;
    color: white!important;
    padding: 10px;
    font-size: 14px;
    font-weight: 100;
    .MuiCircularProgress-root {
      width: 24px;
      height: 24px;
      position: absolute;
    }
  }
`;

export const StyledDataPrivacyDialog = styled(Dialog)`
  .MuiDialog-paper {
    height: 700px;
  }
  .MuiDialogTitle-root .MuiTypography-root {
    display: flex;
    flex-flow: row-reverse;
    align-items: center;
    justify-content: space-between;
  }
  .icon-section {
    text-align: center;
    .MuiSvgIcon-root {
      font-size: 100px;
      color: #59d76e;
      margin-top: 10%;
    }
  }
  .email-successfully-sent {
    padding-top: 1em;
    font-size: 1.4em;
    text-align: center;
  }
`;

export const StyledDeleteDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 15px;
  }
  .MuiDialogActions-root {
    padding: 2em;
  }
`;
