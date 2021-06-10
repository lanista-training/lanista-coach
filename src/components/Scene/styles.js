import styled from 'styled-components';
import {
  Button,
  List,
} from 'semantic-ui-react';
import Drawer from '@material-ui/core/Drawer';

export const Scene = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  background-color: #fafafa;
`;
export const Stage = styled.div`
  margin-right: 90px;
  margin-left:  90px;
  display: flex;
  flex-flow: column;
  align-items: center;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
export const CommandPanelRight = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  .MuiButtonBase-root {
    border-radius: 100px;
    .MuiSvgIcon-root {
      width: 1.5em;
      height: 1.5em;
    }
    .MuiBottomNavigationAction-label {
      opacity: initial;
      transition-delay: initial;
    }
  }
  .synchronize-icon {
    .icon {
      color: rgb(155,201,61);
      font-size: 1.3em;
      font-weight: 700;
    }
  }
}
`;
export const CommandPanelLeft = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .MuiButtonBase-root {
    border-radius: 100px;
    .MuiSvgIcon-root {
      width: 1.5em;
      height: 1.5em;
    }
    .MuiBottomNavigationAction-label {
      opacity: initial;
      transition-delay: initial;
    }
  }
  .synchronize-icon {
    .icon {
      color: rgb(155,201,61);
      font-size: 1.3em;
      font-weight: 700;
    }
  }
}
`;
export const CopyRightSection = styled.div`
  text-align: right;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  font-weight: bold;
  padding-right: 0.5em;
  color: rgba(0,0,0,.6);
}
`;
export const Trainer = styled.div`
  text-align: right;
  display: flex;
  line-height: 3em;
  margin-left: 10px;
}
`;
export const Avatar = styled.div`
  margin-top: -55px;
  border-radius: 50%;
  border-style: solid;
  border-color: rgb(155, 201, 61);
  border-width: 2px;
  width: 45px;
  height: 45px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 #0000006b;
  cursor: pointer;
`;
export const AlarmButton = styled(Button)`
  background: none!important;
  font-size: 1.9em!important;
  padding: 0em!important;
  .active {
    color: green!important;
  }
  position: absolute;
  right: 0em;
  top: 0.7em;
  color: rgb(155, 201, 61)!important;
`;

export const CommandPanelButton = styled(Button)`
  margin: 0!important;+
  width: 100%;
  font-size: 2.5em!important;
  background-color: transparent!important;
`;
export const SideBarMenu =  styled(List)`
  box-shadow: none!important;
  width: 400px!important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 2em!important;
`;
export const SideBarMenuItem = styled(List.Item)`
  background-color: white!important;
  width: 100%;
  margin: 1em;
  border-radius: 5px!important;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 12px 0px;
  border: none;
  height: 5em;
  display: flex!important;
  align-items: center;
  padding-left: 1em!important;
`;
export const SideBarMenuItemIcon = styled(List.Icon)`
  font-size: 2em!important;
  line-height: 1em!important;
`;
export const AlerstsSection = styled.div`
  margin-top: -55px;
  height: 1em;
  position: absolute;
  right: 0;
  .MuiButtonBase-root{
    margin-right: 10px;
  }
  .version-section {
    position: absolute;
    top: 38px;
    right: -21px;
    width: 80px;
    font-size: 10px;
  }
`;

export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root  {
    display: flex;
    justify-content: center;
    background: transparent;
    box-shadow: none;
    max-width: 32em;
    min-width: 15em;
    .MuiListItemText-primary {
      color: black;
      font-size: 20px;
      font-weight: 300;
    }
    .list-item-wrapper {
      padding: 1em 0 0 0;
    }
    .MuiListItem-root {
      background: white;
      background: white;
      border-right-style: solid;
      border-right-color: black;
      border-right-width: 0.5em;
    }
  }
`;
