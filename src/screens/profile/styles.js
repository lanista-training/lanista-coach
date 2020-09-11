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
import Dialog from '@material-ui/core/Dialog';

export const Stage = styled(Grid)`
  padding-top: 60px!important;
  padding-bottom: 6em!important;
  overflow: scroll;
  height: 100vh;
  display: flex;
  ::-webkit-scrollbar {
    display: none!important;
  }
  .content-section {
    flex: 1;
  }
  .navigation-section {
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
`;

export const CenteredButton = styled(Button)`
  margin-right: auto!important;
  margin-left: auto!important;
  display: block!important;
`;
export const StyledHeader = styled(Header)`
  font-weight: bold!important;
`;
export const StyledHeaderCentered = styled(Header)`
  font-size: 1em!important;
  margin-right: auto!important;
  margin-left: auto!important;
  display: block!important;
`;
export const FormHeader = styled(Header)`
  font-size: 1em!important;
  margin-bottom: 0!important;
  text-align: left!important;
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
export const CardHeader = styled(Header)`
  font-weight: bold;
  text-align: left!important;
`;
export const StyledCard = styled(Card)`
  width: 100%!important;
  border: rgb(242, 242, 242)!important;
  border-style: solid!important;
  border-width: 1px!important;
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 1px 4px 1px!important;
  .user-identification {
    margin: 1em 0;
    font-weight: 100;
    font-size: 17px;
    text-align: right;
    span {
      font-weight: 900;
    }
  }
  .placeholder {
    background-size: cover;
    background: transparent;
    width: 500px;
    height: 500px;
    margin-right: auto;
    margin-left: auto;
    z-index: 2;
  }
  .icon.header {
    position: absolute;
    width: 100%;
    top: 36%;
  }
  .loading-photo {
    width: 500px;
    height: 500px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .buttons-section {
    display: flex;
    flex-flow: row;
    justify-content: space-around;
  }
`;
export const CardInput = styled(Form.Input)`
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
export const ColloredCardInput = styled(Form.Input)`
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
export const CardDateInput = styled(Form.Input)`
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
export const CardCheckbox = styled(Form.Input)`
  border: 0;
  border-radius: 0;
  margin-top: 2em!important;
`;
export const CardDropdown = styled(Dropdown)`
  border: 0!important;
  padding-left: 0!important;
`;
export const StyledNavigationCard = styled(Card)`
  width: 100%!important;
  margin: 0!important;
  border: rgb(242, 242, 242)!important;
  border-style: solid!important;
  border-width: 1px!important;
  box-shadow: rgba(0, 0, 0, 0.0745098) 0px 1px 4px 1px!important;
`;
export const ImageSegment = styled(Segment)`
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
export const ListItem = styled(List.Item)`
  padding: 1.5em!important;
  border-bottom-style: solid;
  border-bottom-width: 1px!important;
  border-bottom-color: rgba(0, 0, 0, 0.075)!important;
`;
export const ListHeader = styled(List.Header)`
  color: rgb(116, 116, 116)!important;
`;
export const ListIcon = styled(List.Icon)`
  color: rgb(116, 116, 116)!important;
  padding-right: 1.5em!important;
`;
export const StyledLabel = styled(Label)`
  line-height: 2em!important;
`;
export const LicenceField = styled(Form.Field)`
  color: black!important;
  opacity: 1!important;
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
