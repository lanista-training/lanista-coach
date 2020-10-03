import styled from 'styled-components';
import {
  Button,
  Checkbox,
  Form,
  Card,
  Segment,
  Grid,
  Divider,
  Header,
  Icon,
  Radio,
  List,
  Input,
  Label,
  Dropdown,
} from 'semantic-ui-react';

export const Stage = styled.div`
  padding-top: 60px!important;
  padding-bottom: 6em!important;
  overflow: scroll;
  height: 100vh;
  width: 750px;
  overflow: visible;
  display: flex;
  ::-webkit-scrollbar {
    display: none!important;
  }
  .save-banner-url-button {
    margin: 0 0 2em 0;
  }
  .data-section {
    flex: 2;
  }
  .empty-image {
    top: initial!important;
  }
  .licence-section {
    display: flex;
    justify-content: space-around;
    svg {
      flex: 1;
    }
    .licence-info-section {
      flex: 3;
    }
    button {
      min-width: 190px!important;
      margin-top: 2em;
    }
  }
  .app-configuration {
    .MuiFormControl-root {
      margin-top: 2em;
    }
  }
  .empty-image {
    font-size: 1.5em!important;
    margin-top: 15%;
  }
  .data-protection-section {
    display: flex;
    .MuiSvgIcon-root {
      font-size: 3em;
      margin-top: 0.3em;
    }
    .document-name {
      font-weight: 900;
      font-size: 13px;
    }
    .document-right {
      flex: 1;
    }
    .document-left {
      flex: 1;
    }
    button {
      margin-top: 2em;
    }
  }
  .section {
    padding-top: 2em;
    width: 100%;
    padding-bottom: 2em;
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
  }
  .navigation-section {
    width: 250px;
    margin-left: 40px;
    flex: 1;
  }
  .personal-data {
    .MuiSelect-select {
      text-align: left;
    }
    .section-content {
      padding: 2em 3em;
    }
    button {
      margin-bottom: 3em;
    }
  }
  .profile-image-section {
    .section-content {
      padding: 3em 3em 0 3em;
    }
    button {
      margin-bottom: 3em;
    }
  }
  .profile-licence-section {
    .card-section {
      padding: 3em 0;
    }
  }
  .profile-address-section {
    .section-content {
      padding: 2em 3em;
    }
    button {
      margin-bottom: 3em;
    }
  }
  .profile-data-protection-section {
    .section-content {
      padding: 1em 0 0 0;
    }
    button {
      margin-bottom: 3em;
    }
  }
  .app-configuration {
    .section-content {
      padding: 3em 3em;
    }
    .MuiFormControl-root {
      margin-top: 2em;
    }

  }
  .workout-channel-section {
    .workout-channel {
      padding: 2em 3em 0 3em;
      .MuiFormControlLabel-labelPlacementStart {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-left: 0;
      }
      .save-workout-channel-data {
        margin: 2em 0 7em 0;
      }
    }
    .preview-workout-channel-button {
      margin-top: 4em!important;
    }
  }
  .password-section {
    .MuiStepper-alternativeLabel {
        padding-right: 0;
        padding-left: 0;
    }
    .step-content {
      padding: 2em;
    }
    .step-conent-message {
      text-align: left;
      font-weight: 700;
    }
    .step-buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
`;

export const StyledHeader = styled.div`
  font-weight: bold!important;
`;

export const CardSection = styled.div`
  padding-top: 2em;
  width: 100%;
  padding-bottom: 2em;
  .MuiFormControl-root {
    width: 100%;
    margin: 1.5em 0;
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
`;

export const FixedSection = styled.div`
  position: fixed;
  top: 146px;
  padding-left: 1em;
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
`;

export const StyledNavigationCard = styled.div`
  width: 100%!important;
  margin: 0!important;
  border: rgb(242, 242, 242)!important;
  border-style: solid!important;
  border-width: 1px!important;
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 1px 4px 1px!important;
  background: rgba(0, 0, 0, 0.34)!important;
  border-radius: 15px!important;
  padding-right: 1.5em;
  ul {
    padding-left: 1.5em;
  }
`;

export const ToolsList = styled.div`
  .list-item {
    line-height: 3em;
    .list-item-content {
      font-family: Roboto;
      font-weight: 100;
      margin-left: 1em;
    }
    a {
      color: white;
      display: flex;
      align-items: center;
    }
  }

`;

export const ListIcon = styled(List.Icon)`
  color: white!important;
  padding-right: 1.5em!important;
`;

export const StyledLabel = styled(Label)`
  line-height: 2em!important;
`;

export const LicenceField = styled(Form.Field)`
  color: black!important;
  opacity: 1!important;
`;

export const Shop = styled(Form.Field)`
  min-height: 33vh;
  .loading {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-button {
    float: right;
  }
  .shop-header {
    min-height: 4em;
    font-weight: 900;
    font-size: 18px;
    padding: 2em;
  }
  .products form {
    display: flex;
    flex-flow: column;
    align-items: center;
    button {
      width: 200px;
      margin: 10px 0;
    }
  }
`;
