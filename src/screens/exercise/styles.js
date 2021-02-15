import styled from 'styled-components'
import { Tab, Modal, Dimmer } from 'semantic-ui-react'

export const Stage = styled.div`
  height: calc(100vh);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 935px;
  min-width: 500px;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
  .title-section {
    font-family: Roboto;
    font-weight: 900;
    font-size: 20px;
    padding: 1em 0;
  }
  .edit-video-section {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    svg {
      color: red;
    }
    .form-section {
      flex: 1;
      input {
        padding-left: 1em;
      }
      .error-message {
        font-weight: 100;
        padding: 1em 3em;
        color: #db2828;
      }
    }
  }
  .edit-indexes-section {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    .form-section {
      flex: 1;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      .MuiFormControl-root {
        width: 100%;
        margin: 2em 0;
      }
    }
  }
`;

export const SyledExercise = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 900px;
  margin: 0;
  padding: 0;
  .language-selector {
    position: absolute;
    right: 0;
    font-size: 20px;
    font-weight: bolder;
    :before {
      border: none;
    }
  }
  .editable .image-wrapper {
    border-style: solid;
    border-color: rgb(155,201,61);
    .image-top {
      border-bottom-style: solid;
      border-bottom-color: rgb(155,201,61);
    }
  }
  .exercise-name {
    text-align: right;
    font-size: 2em;
    line-height: 2.5em;
    font-weight: 100;
  }
  .image-section {
    .image-wrapper {
      border-radius: 10px;
      box-shadow: 0 0 27px 0 #0000001f;
      overflow: hidden;
      width: 23vw;
      max-width: calc( (100vh/2) - 140px );
      min-width: 210px;
    }
    .image-top {
      height: 23vw;
      width: 23vw;
      min-height: 210px;
      min-width: 210px;
      max-width: calc( (100vh/2) - 140px );
      max-height: calc( (100vh/2) - 140px );
      background-size: cover;
      background-repeat: no-repeat;
      background-color: #e0e0e0;
    }
    .image-bottom {
      height: 23vw;
      width: 23vw;
      min-height: 210px;
      min-width: 210px;
      max-width: calc( (100vh/2) - 140px );
      max-height: calc( (100vh/2) - 140px );
      background-size: cover;
      background-repeat: no-repeat;
      background-color: #e0e0e0;
    }
  }
  .content-section {
    flex: 1;
    margin-left: 1em;
  }
  .body-image-section {
    div {
      width: 17vw;
      max-width: 306px;
      max-height: 416px;
      position: fixed;
      right: 5vw;
      bottom: 0vh;
    }
    button {
      position: fixed;
      right: 4vw;
      bottom: 28vh;
      z-index: 2;
    }
  }
  .empty-list {
    font-size: 2em;
    color: #bfbfbf;
    text-align: center;
    padding-top: 15vh;
  }
  .edit-button {
    svg {
      color: rgb(155,201,61);
    }
  }
  .image-disabled {
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
  }
`;
export const StyledModal = styled(Modal)`
  width: auto!important;
  border-radius: 5px!important;
  overflow: hidden!important;
  .modal {
    width: auto!important;
    border-radius: 5px!important;
    overflow: hidden!important;
    div {
      width: auto!important;
    }
  }
  .no-video {
    .message {
      padding: 10%;
      text-align: center;
    }
    .buttons {
      display: flex;
      justify-content: center;
      padding: 0 2em 2em;
    }
  }
`;
export const SyledTab = styled(Tab)`
  height: 100%;
  display: flex;
  flex-flow: column;
  .menu .active.item{
    border-bottom: none!important;
    font-size: 1.3em;
    color: rgb(155,201,61)!important;
  }
  .menu {
    flex-flow: row-reverse;
    border-bottom: none!important;
    margin: 0;
    .label {
      margin-left: 4px!important;
    }
    .label-proposal {
      margin-top: -10px!important;
      top: 13px!important;
      background-color: #db2828!important;
      border-color: #db2828!important;
      color: #fff!important;
      margin-left: 2px!important;
      padding: 0.3em!important;
    }
  }
  .tab {
    height: calc(100% - 54px);
    border: none!important;
    background: transparent;
    padding: 0;
  }
  .info-pane, .protocolls-pane {
    height: 100%;
    display: flex!important;
    flex-flow: column;
  }
  .info-text {
    font-size: 1.3em;
    line-height: 1.5em;
    flex: 1;
    color: grey;
    font-weight: 100;
    margin-left: calc( ( (100vh/2) - 140px)/7);
    .MuiTextField-root {
      width: 100%;
    }
    .info-title{
      font-weight: 700;
      font-size: 1.2em;
      line-height: 2em;
      color: black;
      display: flex;
      .text-section {
        flex: 1;
      }
    }
    .description-warnings  {
      font-size: 14px;
      text-align: right;
    }
  }
  .buttons-section {
    display: flex;
    justify-content: space-between;
    height: 35px;
    .active {
      background: rgba(0, 0, 0, 0.87)!important;
      color: white!important;
    }
  }
  .editing {
    .info-title {
      margin-bottom: 10px;
    }
  }
  .protocolls{
    text-align: right;
    height: 50vh;
    min-height: 375px;
    overflow-y: scroll;
    display: block!important;
    padding-top: 1em!important;
    padding-right: 1.5em!important;
    ::-webkit-scrollbar {
      width: 0px!important;
      background: transparent!important; /* make scrollbar transparent */
    }
    .card {
      margin-left: auto;
      background-color: white!important;
      border: 1px solid rgba(0,0,0,.0975)!important;
      box-shadow: 0 0 27px 0 #0000001f!important;
      border-radius: 5px!important;
      .content {
        padding: 0.5em 0.5em!important;
        .header {
          font-size: 1.2em!important;
        }
      }
    }
    .workout-title{
      font-weight: 700;
      font-size: 1.7em;
      padding-right: 1em;
      line-height: 2em;
    }
    .workout{
      font-size: 1.4em;
      font-weight: initial!important;
      display: flex;
      flex-flow: row-reverse;
      justify-content: flex-end;
      .workout-weight {
        width: 3em;
      }
      .workout-repetitions {
        width: 3em;
        margin-right: 1em;
      }
    }
  }
  .chat-panel{
    height: 100%;
    .panel {
      .messages-list {
        height: calc(46vw - 124px);
        overflow-y: scroll;
        max-height: calc(100vh - 331px);
      }
    }
    .input {
      width: 100%;
    }
  }
  .chart-panel{
    height: calc( 50vw - 100px );
    max-height: 540px;
    .panel {
      height: calc(100% - 35px);
    }
  }
  .title {
    font-weight: 700;
    font-size: 1.3em;
    padding: 1em;
    padding-left: 2em;
  }
  .workouts {
    height: calc(23vw*2 - 65px);
    width: calc(100% + 10px);
    min-height: 230px;
    max-height: 500px;
    position: absolute;
    overflow: scroll;
    top: 170px;
    right: -5px;
    padding: 20px 30px 80px 20px;
    display: flex;
    flex-flow: column;
    ::-webkit-scrollbar {
      display: none!important;
    }
  }
`;
export const NotesPanel = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  .notes-list{
    height: calc(50vw - 160px);
    max-height: calc(100vh - 382px);
    overflow: hidden;
    overflow-y: scroll;
    padding: 1em;
    flex: 1;
    ::-webkit-scrollbar {
      display: none!important;
    }
    .note-icons {
      svg{
        font-size: 3.3em;
      }
    }
  }
  .note.selected {
    background: black!important;
    color: white!important;
    span {
      color: white!important;
    }
    .note-text {
      color: white!important;
    }
  }
  .note {
    line-height: 1.2;
    display: flex;
    margin-top: 1em!important;
    background-color: white;
    border: 1px solid rgba(0,0,0,.0975);
    border-radius: 10px;
    padding: 1em;
    box-shadow: 0 0 10px 0 #0000001f;
    .image-container {
      border-radius: 50%;
      margin-right: 1em;
      .image {
        width: 40px;
        height: 40px;
        background-color: #fafafa;
        border-radius: 50%;
        box-sizing: border-box;
        display: block;
        flex: 0 0 auto;
        overflow: hidden;
        position: relative;
        background-size: contain;
      }
    }
    .note-content {
      font-size: 1.1em;
      flex: 1;
      .note-author {
        font-weight: 700!important;
        span {
          font-weight: initial;
          color: rgba(0,0,0,.4);
          font-size: .875em;
        }
      }
      .note-text {
        margin: .25em 0 .5em;
        font-size: 1em;
        word-wrap: break-word;
        color: rgba(0,0,0,.87);
        line-height: 1.3;
      }
    }
  }
  .note-input-field {

  }
  form {
    display: flex;
    .MuiInputBase-root {
      flex: 1;
      input {
        padding-left: 1em;
      }
    }
  }
`;
export const SettingsPanel = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  padding: 0 1em;
  ::-webkit-scrollbar {
    width: 0px!important;
    height: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
  .sets-configuration {
    flex: 1;
    display: flex;
    flex-flow: column;
  }
  .exercise-indications {
    display: flex;
    margin-top: 10px;
    .input-fields{
      flex: 1;
    }
    .description-warnings {
      text-align: right;
      font-size: 12px;
      display: flex;
      justify-content: flex-end;
      color: #b3b3b3;
      margin-top: -5px;
      svg {
        font-size: 20px;
        margin-left: 6px;
      }
    }
    textarea {
      flex: 1;
      width: 100%;
      padding: .78571429em 1em;
      background: transparent;
      outline: 0;
      color: rgba(0,0,0,.87);
      border-radius: .28571429rem;
      -webkit-box-shadow: 0 0 0 0 transparent inset;
      box-shadow: 0 0 0 0 transparent inset;
      -webkit-transition: color .1s ease,border-color .1s ease;
      transition: color .1s ease,border-color .1s ease;
      font-size: 12.6px;
      line-height: 1.2857;
      resize: none;
      padding: .78571429em 1em;
      outline: 0;
      color: rgba(0,0,0,.87);
      border-radius: .28571429rem;
      -webkit-box-shadow: 0 0 0 0 transparent inset;
      box-shadow: 0 0 0 0 transparent inset;
      -webkit-transition: color .1s ease,border-color .1s ease;
      transition: color .1s ease,border-color .1s ease;
      border-style: solid;
      border-width: 1px;
      border-color: #dadada;
      ::placeholder {
        color: #c7c7c7;
      }
      :focus {
        background: #fff!important;
        border: 1px solid rgba(34,36,38,.15)!important;
        font-size: 11.3px!important;
      }
    }
    button {
      box-shadow: none;
      background: black;
      margin-left: 1em;
    }
  }
  .sets-list {
    height: calc(23vw*2 - 90px);
    width: calc(100% + 10px);
    min-height: 230px;
    max-height: 457px;
    position: absolute;
    overflow: scroll;
    top: 190px;
    right: -5px;
    padding: 20px;
  }
  .exercise-set {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: white;
    font-size: 1.3em;
    padding: 0.5em 1em;
    margin-top: 3px;
    box-shadow: 0 0 27px 0 #0000001f;
    :first-child  {
      border-top-right-radius: 10px!important;
      border-top-left-radius: 10px!important;
    }
    :last-child  {
      border-bottom-right-radius: 10px!important;
      border-bottom-left-radius: 10px!important;
    }
  }
`;
export const SyledDimmer = styled(Dimmer)`
  .loader{
    color: white!important;
  }
`;
export const SidePanelButton = styled.div`
  width: 100%;
  padding: 1em;
  text-align: center;
  font-size: 1.5em;
  font-weight: 700;
`;
export const StyledWorkout = styled.div`
  width: 100%;
  margin-bottom: 1em;
  box-shadow: 0 0 27px 0 #0000001f!important;
  border-radius: 10px;
  .header {
    text-align: right;
    font-weight: 700;
    font-size: 1.2em;
    padding: 0.5em 1em;
    background-color: white!important;
    border: 1px solid rgba(0,0,0,.0975)!important;
    border-top-right-radius: 10px!important;
    border-top-left-radius: 10px!important;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    .one-rm {
      color: grey;
      font-weight: 100;
    }
  }
  .description {
    .workout-wrapper {
      :last-child  {
        border-bottom-right-radius: 10px!important;
        border-bottom-left-radius: 10px!important;
        overflow: hidden;
      }
    }

  }
  .workout.selected {
    background-color: black!important;
    color: white;
    height: 50px;
    .workout-content {
      max-width: 38%;
    }
    .workout-number {
      max-width: 20%;
    }
  }
  .workout-wrapper {
    .remove-button {
      text-align: right;
      float: right;
      margin-top: -45px;
      margin-right: 16px;
      button {
        background: black;
        color: white;
        border-color: white;
        border-style: solid;
        border-width: 3px;
      }
      .MuiCircularProgress-root {
        color: rgb(155,201,61);
        position: absolute;
      }
    }
  }
  .workout {
    display: flex;
    flex-flow: row;
    background-color: white!important;
    border: 1px solid rgba(0,0,0,.0975)!important;
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    .workout-number {
      flex: 1;
    }
    .workout-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      font-size: 1.2em;
      .workout-weight {
        display: flex;
        .weight-in-kg {
          font-weight: 900;
          width: 70px;
        }
        .one-rep-max {
          color: grey;
          font-weight: 100;
        }
      }
    }
  }
  .trainer-protocoled {
    color: black;
  }
  .self-protocoled {
    color: rgb(13,112,206);
  }
`;
export const SyledRecommendationPanel = styled.div`
  width: 100%;
`;
export const colors = [
  '#488f31',
  '#6b9e3c',
  '#8aac49',
  '#a9ba59',
  '#c6c96a',
  '#e3d77e',
  '#ffe692',
  '#fdcd7c',
  '#fbb36a',
  '#f8995e',
  '#f27d58',
  '#ea6158',
  '#de425b',
]
