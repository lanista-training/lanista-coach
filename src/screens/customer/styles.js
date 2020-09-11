import styled from 'styled-components';
import { List, Tab } from 'semantic-ui-react';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';

export const Stage = styled.div`
  padding-top: 70px;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  .horizontal-menu {
    padding-left: 5px;
    .menu-wrapper {
      padding-left: 1em;
    }
  }
  .list-content, .info-list-content, .files-list-content, .warnings-list-content, .workouts-list-content {
    display: flex;
    width: auto;
    padding-left: 1em;
  }
  .list-content {
    padding-right: 1em;
    .load-more-button {
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
      margin-top: 30vh;
    }
  }
`;
export const ActivityList = styled(List)`
  margin-top: 1em!important;
  width: 100%;
  height: calc(100vh - 244px);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-left: 1em;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px!important;
    height: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
  .empty-list {
    width: 100%;
    min-height: 100vh;
    top: -75vh;
    position: relative;
    font-size: 1.5em;
    font-weight: 700;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: column-reverse;
    -ms-flex-flow: column-reverse;
    -webkit-flex-flow: column-reverse;
    -ms-flex-flow: column-reverse;
    flex-flow: column-reverse;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    line-height: 3.5em;
    opacity: .5;
        color: grey;
    i {
      padding: 0!important;
      font-size: 5em;
      font-style: normal;
      text-align: center;
      margin-top: 25vh;
    }
    .empty-list-text {
      font-family: Roboto;
      font-weight: 300;
    }
  }
`;

export const StyledTab = styled(Tab)`
  width: 100%;
  padding-top: 0.5em;
  .ui.grid {
    margin: initial!important;
  }
  .ui.grid .column {
    margin: 0!important;
    padding: 0!important;
  }
  .menu {
    border: none!important;
    background-color: white!important;
    box-shadow: 0 0.08em 0.25em 0.075em rgba(0, 0, 0, 0.075)!important;
    border-radius: 5px!important;
    margin-left: 4px!important;
  }
  .item {
    font-family: Roboto;
    font-size: 1.2em!important;
    font-weight: bold!important;
    color: #b1b1b1!important;!important;
    text-align: left;
    margin: 0!important;
    padding-left: 1em!important;
    min-width: 12em;
    line-height: 1.5em!important;
    border-bottom-style: solid!important;
    border-width: 1px!important;
    border-color: rgba(0,0,0,.0975)!important;
    i.icon, i.icons {
      margin-right: 0.5em!important;
      font-size: 1.2em;
      float: right!important;
      color: #e0e0e0!important;
    }
  }
  .text.menu {

  }
  .item.active i {
    color: rgb(155,201,61)!important;
  }
  .item.active {
    color: black!important;
  }
  .tab {
    border: none!important;
    background-color: transparent;
    padding: 0!important;
    height: 10em;
    overflow: hidden;
    margin-left: 5px!important;
  }
  .statistic {
    .label {
      color: white!important;
      font-family: Roboto!important;
      font-weight: lighter!important;
      font-size: 0.9em!important;
    }
  }
  .counter {
    float: right;
    width: 25px;
    height: 25px;
    font-size: 0.7em;
    background: grey;
    color: white;
    border-radius: 50%;
    text-align: center;
  }
  .files-list-viewport {
    height: 100%;
    .files-list-content {
      height: 100%;
      .dropzone {
        margin-right: 1em;
      }
      .loading {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .workouts-list-content, .warnings-list-content {
    cursor: move;
  }
`;
export const DailyList = styled.div`
  border-top: none!important;
  padding-top: 0!important;
  padding-bottom: 0!important;
  min-width: 190px;
  width: 190px;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
  .content {
    overflow-y: scroll;
    height: 78vh;
  }
`;
export const Exercise = styled(List.Item)`
  position: relative;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  border-radius: 10px;
  -webkit-transition: 450ms all;
  -webkit-transition: 450ms all;
  transition: 450ms all;
  -webkit-transform-origin: center left;
  -ms-transform-origin: center left;
  -webkit-transform-origin: center left;
  -ms-transform-origin: center left;
  transform-origin: center left;
  padding: 0!important;
  overflow: hidden;
  background: white;
  margin-right: 0.5em;
  margin-left: 0!important;
  margin-top: 0.5em;
  box-shadow: 0 0.08em 0.25em 0.075em rgba(0, 0, 0, 0.075);
`;
export const CardsList = styled.div`
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow-x: scroll;
  padding-left: 1em;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  ::-webkit-scrollbar {
    width: 0px!important;
    height: 0px!important;
    background: transparent!important;
  }
`;

export const CardsListWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 8px;
`;

export const Card = styled.div`
  .personal-data.workout-wrapper {
    min-width: 20em!important;
    width: 20vw!important;
  }
  padding: 10px 0;
  .workout-wrapper {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 17vw;
    min-width: 17em;
    margin: 0 1em;
    background-color: white;
    border-radius: 10px;
    padding: 1.2em;
    display: flex;
    flex-flow: column;
    border: 1px solid rgba(0,0,0,.0975);
    box-shadow: 0 0 10px 0 #0000006b;
    height: 133px;;
  }
  .create-button.workout-wrapper.member-workout {
    ::after {
      left: -0.6em;
    }
    .button {
      left: 4.5em!important;
      top: 0.5em!important;
      background: rgb(84, 136, 66);
      i {
        font-size: 2em;
        right: 0!important;
        top: 3px!important;
      }
    }
  }
  .create-button {
    min-width: 0;
    width: 10em;
    .button {
      position: relative!important;
      left: -1em!important;
      top: 1em!important;
      color: rgb(136,217,108)!important;
      i {
        position: relative!important;
        right: 0.25em!important;
        top: 0!important;
      }
    }
  }
  .workout-wrapper.personal-data {
    background-color: rgb(155,201,61);
    border: none;
    .ui.placeholder, .ui.placeholder .image.header:after, .ui.placeholder .line, .ui.placeholder .line:after, .ui.placeholder>:before {
      background-color: rgb(155,201,61);
    }
  }
  .workout-wrapper.member-goal {
    background-color: rgb(13,112,206);
    color: white;
    font-family: Roboto;
    border: none;
    display: flex;
    overflow: hidden;
    width: 165px;
    .workoutname {
      font-weight: normal;
      flex: 1;
      min-height: 56px;
      overflow: hidden;
      line-height: 1.1em;
    }
    .target-section {
      text-align: right;
      display: flex;
      .MuiRating-iconFilled {
        color: rgb(136,217,108);
      }
      .statistic {
        flex: 1;
        align-items: flex-end;
      }
      .statistic.active {
        span, .label {
          color: rgb(136, 217, 108)!important;
        }
      }
      .icon.card-decoration{
        font-size: 6em;
        position: relative;
        right: 0.7em;
        top: 0.5em;
        color: rgb(132, 192, 249);
      }
      .no-date-section {
        .button {
          text-align: right;
          margin-right: -0.5em;
          background: rgb(6, 76, 144);
          color: white;
          i {
            position: relative;
            right: 1em;
            top: 0.7em;
          }
          i:before {
            font-size: 2em;
          }
        }
      }
    }
  }
  .workout-wrapper {
    cursor: pointer;
  }
  .workout-wrapper.member-workout.create-button {
    width: 155px;
    margin-right: 2em;
  }
  .workout-wrapper.member-workout {
    background-color: rgb(155,201,61);
    color: white;
    font-family: Roboto;
    border: none;
    display: flex;
    overflow: hidden;
    width: 190px;
    ::after {
      font-family: Lanista;
      content: "\\e952";
      float: left;
      height: 0px;
      font-size: 8em;
      color: rgb(192, 232, 109);
      position: relative;
      top: -0.2em;
      left: -0.31em;
    }
    .workoutname {
      font-weight: normal;
      flex: 1;
      min-height: 56px;
      overflow: hidden;
      line-height: 1.1em;
    }
    .footer {
      font-weight: 700;
      display: flex;
      flex-flow: column;
      .workoutexpiration {
        text-align: right;
        text-align: right;
        margin-top: -0.75em;
        .date {
          font-weight: 900;
          font-size: 1.6em;
        }
        .date.expired {
          color: #c8e48d!important;
        }
        .title.expired {
          color: #c8e48d!important;
        }
      }
      .workoutextrainfo {
        text-align: right;
        font-weight: 100;
        margin-bottom: -0.5em;
        line-height: 2em;
      }
    }
  }
  .member-file {
    background: #12006f;
    color: white;
    font-family: Roboto;
    .workoutname {
      flex: 1;
    }
    .member-file-icons {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      margin-bottom: 0.5em;
      a {
        color: white!important;
      }
    }
    .member-file-icon.file {
      font-size: 2em;
      position: relative;
      top: 0.5em;
      i {
        margin: 0!important;
      }
    }
    .member-file-icon.trash{
      font-size: 2em;
      position: relative;
      top: 0.5em;
    }
  }
  .meber-warning {
    .workoutname {
      flex: 1
    }
    .footer {
      position: relative;
      top: -5.5em;
      .workoutextrainfo {
        text-align: right;
      }
    }
  }
  .ANN {
    background: rgb(252, 113, 39);
    color: white;
    font-family: Roboto;
    overflow: hidden;
    ::after {
      font-family: Lanista;
      content: "\\e92d";
      float: left;
      height: 0px;
      margin-top: -1em;
      font-size: 6em;
      color: white;
      position: relative;
      top: -0.2em;
      left: -0.4em;
      color: #f3cebb;
    }
    .MuiSvgIcon-root {
      font-size: 1.3em;
    }
  }
  .MED {
    background: rgb(9, 170, 173);
    color: white;
    font-family: Roboto;
    overflow: hidden;
    ::after {
      font-family: Lanista;
      content: "\\e902";
      float: left;
      height: 0px;
      margin-top: -1em;
      font-size: 6em;
      position: relative;
      top: -0.2em;
      left: -0.4em;
      color: #0ac2c5;
    }
    .MuiSvgIcon-root {
      font-size: 1.3em;
    }
  }
  .LIF {
    background: #4E73FF;
    color: white;
    font-family: Roboto;
    overflow: hidden;
    ::after {
      font-family: Lanista;
      content: "\\e902";
      float: left;
      height: 0px;
      margin-top: -1em;
      font-size: 6em;
      position: relative;
      top: -0.2em;
      left: -0.4em;
      color: #9daff3;
    }
    .MuiSvgIcon-root {
      font-size: 1.3em;
    }
    .MuiRating-iconFilled {
      color: #9daff3;
    }
  }
  .SPO {
    background: #FED505;
    color: white;
    font-family: Roboto;
    overflow: hidden;
    ::after {
      font-family: Lanista;
      content: "\\e902";
      float: left;
      height: 0px;
      margin-top: -1em;
      font-size: 6em;
      position: relative;
      top: -0.2em;
      left: -0.4em;
      color: #f9eeba;
    }
    .MuiSvgIcon-root {
      font-size: 1.3em;
    }
    .MuiRating-iconFilled {
      color: #f9eeba;
    }
  }
  .GOA {
    background: #124DBD;
    color: white;
    font-family: Roboto;
    overflow: hidden;
    ::after {
      font-family: Lanista;
      content: "\\e902";
      float: left;
      height: 0px;
      margin-top: -1em;
      font-size: 6em;
      position: relative;
      top: -0.2em;
      left: -0.4em;
      color: #7b96ca;
    }
    .MuiSvgIcon-root {
      font-size: 1.3em;
    }
    .MuiRating-iconFilled {
      color: #7b96ca;
    }
  }
  .PHY {
    background: #06B781;
    color: white;
    font-family: Roboto;
    overflow: hidden;
    ::after {
      font-family: Lanista;
      content: "\\e902";
      float: left;
      height: 0px;
      margin-top: -1em;
      font-size: 6em;
      position: relative;
      top: -0.2em;
      left: -0.4em;
      color: #50e8ba;
    }
    .MuiSvgIcon-root {
      font-size: 1.3em;
    }
    .MuiRating-iconFilled {
      color: #50e8ba;
    }
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  margin: 0;
  margin-right: 0.5em;
  background-color: rgb(239,239,239);
  line-height: 2.5em;
  border-radius: 10px;
  padding-left: 0.7em;
  font-weight: 100;
  font-size: 1.2em;
  .header-button {
    cursor: pointer;
    width: 45px;
    .button-bardget {
      position: relative;
      right: -19px;
      font-size: 12px;
      font-weight: 900;
    }
  }
  .header-button.with-bardget {

  }
`;
export const FilesPanel = styled.div`
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow-x: scroll;
  padding-left: 1em;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  ::-webkit-scrollbar {
    width: 0px!important;
    height: 0px!important;
    background: transparent!important;
  }
  .member-file {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 20vw;
    min-width: 17em;
    margin: 0 1em;
    background-color: white;
    border-radius: 10px;
    padding: 1.2em;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: column;
    -ms-flex-flow: column;
    flex-flow: column;
    border: 1px solid rgba(0,0,0,.0975);
    box-shadow: 0 0 10px 0 #0000000f;
    height: 100%;
    .member-file-name {
      font-size: 1.2em;
      overflow: hidden;
      font-family: Roboto;
      width: 100%;
      height: 4em;
    }
    .member-file-icons {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
    }
    .member-file-icon.file {
      font-size: 3em;
      position: relative;
      top: 0.5em;
      i {
        margin: 0!important;
      }
    }
    .member-file-icon.trash{
      font-size: 3em;
      position: relative;
      top: 0.5em;
    }
  }
  .button {
    margin-left: 1em;
    margin-right: 0.5em;
  }
`;
export const StyledDropZone = styled.div`
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    aside {
      flex: 1!important;
      padding: 0 1em;
    }
    .dropzone {
      flex: 3!important;
      :focus {
        border-color: #2196f3;
      }
      :hover {
        border-color: #2196f3;
      }
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      border-width: 2px;
      border-radius: 2px;
      border-color: #eeeeee;
      border-style: dashed;
      background-color: #fafafa;
      color: #bdbdbd;
      outline: none;
      transition: border .24s ease-in-out;
      margin-right: 1px;
    }
  }
`;
export const ExerciseImages = styled.div`
  max-width: 180px;
  min-width: 180px;
  height: 90px;
  max-height: 90px;
  background-position: right top,left top;
  background-repeat: no-repeat;
  background-size: 50.5% auto,50.5% auto;
  background-color: #efefef;
`;
export const Protocolls = styled(List.Content)`
  padding: 0.5em;
  border-top: none!important;
`;
export const ExerciseProtocolls = styled.div`
  padding: 0.4em 0;
`;
export const Protocoll = styled.div`
  font-size: 12px!important;
  color: rgb(116,116,116);
  padding-left: 1em;
  line-height: 1.4em;
  -webkit-font-smoothing: antialiased;
  .self-protocolled {
    color: blue!important;
  }
`;
export const StatisticValue = styled.div`
  color: white;
  font-family: Lato,Helvetica Neue,Arial,Helvetica,sans-serif;
  font-size: 56px;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.2em;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.3rem;
  span {
    font-family: Roboto!important;
    font-weight: 900!important;
    font-size: 1.25em;
  }
`;
export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root  {
    display: flex;
    justify-content: center;
    background: transparent;
    box-shadow: none;
    .MuiListItemText-primary {
      color: #34acfb;
      font-size: 20px;
      font-weight: 300;
    }
    .list-item-wrapper {
      padding: 1em 0 0 0;
    }
    .MuiListItem-root {
      background: white;
      background: white;
      border-left-style: solid;
      border-left-color: #34acfb;
      border-left-width: 0.5em;
    }
  }
`;

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    height: 320px;
    width: 420px;
    border-radius: 15px;
    .MuiDialogContent-root {
      text-align: center;
      padding-top: 1.5em;
    }
  }
  #alert-dialog-description {
    .MuiTypography-root {
      font-weight: 900;
    }
  }
  .plan-duration-select-field {
    width: 100%;
    margin-top: 2em;
    .MuiSelect-root {
      text-align: left;
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
  .options-section {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    padding: 1.5em 2em;
    button {
      width: 100%;
      border-radius: 15px;
      margin: 1em 0;
      background: rgb(155,201,61);
      color: white;
      justify-content: end;
      padding-left: 1.5em;
      .MuiButton-label {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .warning-text {
    color: red;
  }
  canvas {
    border-style: solid;
    border-width: 1px;
    border-radius: 20px;
    border-color: #dadada;
    background: #efefef;
  }
`;

export const ProtocolsOptions = styled(Menu)`
  .MuiMenu-paper {
    width: auto;
  }
`;

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper::-webkit-scrollbar {
    display: none!important;
  }
  .MuiMenu-paper {
    width: 300px;
    .MuiMenu-list {
      padding: 0!important;
      width: 100%!important;
    }
  }
  .empty-list {
    padding: 2em;
    color: #989898;
    font-weight: 100;
    text-align: center;
  }
  .MuiList-padding {

  }
  .note-input-section {
    z-index: 2;
    width: 300px;
    background: white;
    display: flex;
    align-items: center;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: rgba(0, 0, 0, 0.12);
    padding: 5px 0;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    .MuiAvatar-root {
      margin: 0 10px;
      width: 30px;
      height: 30px;
    }
    form {
      flex: 1;
      .MuiFormControl-root {
        width: 100%;
      }
    }
    .MuiInputBase-root {
      background: #f2f3f5;
      border-radius: 25px;
      input {
        padding: 10px;
      }
    }
  }
  .note-edit-input-section {
    .MuiFormControl-root {
      width: 100%;
      .MuiInputBase-root {
        border-radius: 10px;
        input {
          background: rgb(242, 243, 245);
          border-radius: 10px;
          padding: 7px;
          color: black;
        }
      }
    }
  }
  .notes-list {
    padding-top: 0;
  }
  .close-notes-list-button {
    float: right;
  }
  .MuiListItem-root {
    padding-bottom: 1em;
  }
  .note-group {
    .MuiListItemText-root {
      margin-bottom: 14px!important;
    }
    width: 100%;
    .note-header {
      margin-bottom: 15px!important;
      span, p {
        line-height: 10px;
      }
    }
  }
  .exercise-name {
    color: #a5a5a5!important;
    font-weight: 100;
    line-height: 25px;
  }
  .note-text {
    width: 100%;
  }
  .input-field {
    width: 100%;
  }
  .buttons-section {
    display: flex;
    justify-content: space-between;
  }
`;
