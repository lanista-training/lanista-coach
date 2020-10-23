import styled from 'styled-components';
import {
  Button,
  Image,
  List,
  Card,
  Dimmer,
  Loader,
  Sidebar,
  Menu,
} from 'semantic-ui-react';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';

export const Stage = styled.div`
  max-width: 935px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  max-width: 935px;
  position: relative;
  width: 100%;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin: 0 auto;
  padding-top: 60px!important;
  height: 100vh;
  .loading {
    text-align: center;
    margin-top: 30%;
  }
`;

export const StageHeader = styled.div`
  flex: 1;
  display: flex;
  .folder-name {
    font-size: 2em;
    display: flex;
    align-items: center;
    padding-left: 0.5em;
    font-weight: bold;
    color: #34acfb;
    cursor: pointer;
  }
`;

export const ListItem = styled(List.Item)`
  float: left;
  width: 14em;
  height: 100%;
  background-color: white;
  overflow: hidden;
  margin: 2em;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 14px;
  box-shadow: 0 0 27px 0 #0000001f;
  display: flex;
  flex-flow: column;
  align-items: center;
  cursor: pointer;
  .email {
    text-align: center;
    text-overflow: ellipsis;
    padding-top: 1em;
    width: 150px;
    overflow: hidden;
  }
  .first-name {
    text-align: center;
    font-size: 1.3em;
    line-height: 1em;
    height: 1em;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .last-name {
    text-align: center;
    font-size: 1.5em;
    font-weight: 900;
    line-height: 1em;
    height: 1em;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  button {
    margin-bottom: 1em!important;
  }
`;
export const UserNameAndAvatar = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: 1.3em;
  line-height: 1.4em;
`;
export const Action  = styled.div`
  padding-top: 0.5em;
`;
export const ListSection = styled.div`
  overflow: auto;
  padding-top: 1.5em;
  width: 100%;
  padding-bottom: 4em;
  .infinity-list {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
  }
`;
export const StyledHeaderSwitch = styled.div`
  display: flex;
  .lable {
    line-height: 3.3em;
    text-transform: uppercase;
    font-weight: 900;
    margin-right: 0.5em;
    font-size: 1.3em;
  }
  .react-switch {
    margin-top: 1em;
    margin-right: 2em;
  }
`;

export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root  {
    display: flex;
    justify-content: center;
    background: transparent;
    box-shadow: none;
    max-width: 32em;
    .MuiListItemText-primary {
      color: #34acfb;
      font-size: 20px;
      font-weight: 300;
    }
    .list-item-wrapper {
      padding: 1em 0 0 0;
      min-width: 22em;
    }
    .MuiListItem-root {
      background: white;
      background: white;
      border-left-style: solid;
      border-left-color: #34acfb;
      border-left-width: 0.5em;
    }
    svg {
      color: #34acfb;
      font-size: 2.5em;
    }
  }
`;

export const StyledDialog = styled(Dialog)`
  .MuiDialogContentText-root, .MuiTextField-root {
    width: 100%;
  }
  .MuiCircularProgress-root {
    position: absolute;
    right: 25%;
    margin-top: 6px;
  }
`;

export const StyledCreateCustomerDialog = styled(Dialog)`
  .MuiPaper-root{
    background: #fffefe;
    border-radius: 15px;
    padding: 2em;
    .MuiDialogTitle-root {
      padding: 1em 0 2em 2em;
    }
    .MuiDialogContent-root {
      display: flex;
      .form-section {
        flex: 1;
        padding-right: 2em;
      }
      .loading-section {
        widgth: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .message-section {
        flex: 1;
        .message-section-title {
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 1em;
        }
        .message-section-content {
          text-align: justify;
        }
      }
    }
  }
`;

export const ChangeFolderNameDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 40%;
  }
  .MuiDialogContentText-root, .MuiTextField-root {
    width: 100%;
  }
  .MuiCircularProgress-root {
    position: absolute;
    right: 25%;
    margin-top: 6px;
  }
`;

export const Loading = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  margin-top: -60px;
  svg {
    color: black;
  }
`;
