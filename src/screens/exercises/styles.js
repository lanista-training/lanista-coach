import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';

export const Stage = styled.div`
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
  position: absolute;
  width: calc(100vw - 200px);
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin: 0 auto;
  padding-top: 59px!important;
  height: 100vh;
  .empty-list {
    padding-top: 25%;
    font-size: 2em;
    color: #9e9e9e;
    text-align: center;
  }
`;
export const FolderName = styled.div`
  line-height: 14px;
  display: flex;
  align-items: center;
  color: rgb(52,172,251);
  font-weight: 900;
  font-size: 18px;
`;
export const ListSection = styled.div`
  overflow: auto;
  padding-top: 1.5em;
  padding-bottom: 4em;
  width: 100%;
  overflow: visble;
  .infinity-list {
    display: flex;
    flex-flow: wrap;
    overflow: visble;
    justify-content: space-around;
  }
  .selected {
    box-shadow: 0 0 15px 0 rgb(155,201,61)!important;
    border: 1px solid rgb(155,201,61)!important;
  }
  .loading-exercise {
    height: 177px;
    width: 200px;
    display: flex;
  }
`;
export const ListItem = styled.div`
  height: 177px;
  width: 200px;
  display: inline-table;
  margin-left: 19px;
  margin-top: 14px;
  overflow: visible;
  transition: all 100ms linear 0s;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 5px;
  box-shadow: 0 0 27px 0 #0000001f;
  .exercise-item {
    margin: 9px;
    .exercise-list-img-right {
      height: 90px;
      width: 90px;
      background-size: cover;
      background-color: #e6e6e6;
      float: right;
      border-top-right-radius: 4px;
    }
    .exercise-list-img-left {
      height: 90px;
      width: 90px;
      background-size: cover;
      background-color: #e6e6e6;
      float: left;
      border-top-left-radius: 4px;
    }
    .exercise-list-text {
      font-size: 13px;
      font-weight: 700;
      text-align: left;
      font-weight: 100;
      color: #9e9e9e;
    }
  }
  button {
    margin-right: auto;
    margin-left: auto;
    display: block;
    margin-top: 10px;
    width: 100%;
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

export const SearchFilter = styled(Drawer)`
  .MuiPaper-root  {
    display: flex;
    justify-content: center;
    background: transparent;
    box-shadow: none;
    max-width: 73em;
    .menu {
      height: 350px;
      background: white!important;
    }
    .MuiListItemText-primary {
      color: #34acfb;
      font-size: 20px;
      font-weight: 300;
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

export const CreateExerciseDialog = styled(Dialog)`
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
