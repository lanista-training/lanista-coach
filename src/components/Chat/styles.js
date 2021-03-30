import styled from 'styled-components';
import { MainContainer } from '@chatscope/chat-ui-kit-react';
import Menu from '@material-ui/core/Menu';

export const StyledChat  = styled(MainContainer)`
  overflow: hidden;
  background: transparent;
  border: none;
  .cs-conversation-header, .cs-conversation-header__user-name, .cs-conversation-header__info {
    background-color: #f3f3f3;
  }
  .cs-overlay::before {
    background-color: rgb(255 255 255 / 38%)!important;
  }
  .cs-chat-container, .cs-message-list {
    background: transparent;
    border: none;
  }
  .cs-message-input {
    background: transparent;
    border: none;
    margin-bottom: 10px;
  }
  .cs-message--incoming .cs-message__content {
    background-color: #e0e0e0;
    border-top-left-radius: .7em;
    border-top-right-radius: .7em;
    border-bottom-right-radius: .7em;
    border-bottom-left-radius: 0;
  }
  .cs-message--outgoing .cs-message__content {
    background-color: black;
    color: white;
    border-top-left-radius: .7em;
    border-top-right-radius: .7em;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: .7em;
  }
  .cs-message-input__content-editor, .cs-message-input__content-editor-wrapper {
    background: white;
  }
  .cs-message-input__content-editor-wrapper {
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  }
  button {
    color: black;
  }
  .ps__thumb-y {
    background-color: #c5c5c5!important;
  }
  .images-wrapper {
    display: flex;
    border-radius: 10px;
    overflow: hidden;
  }
  .exercise-section {
    margin-bottom: 10px;
    .exercise-images {
      display: flex!important;
      justify-content: center;
      .exercise-start-images, .exercise-end-images {
        height: 60px;
        width: 60px;
        background-size: contain;
      }
    }
    .exercise-name {
      font-weight: 200;
      font-style: italic;
    }
  }
  .cs-message__content-wrapper {
    cursor: pointer!important;
  }
  .cs-message--outgoing {
    .exercise-images {
      justify-content: flex-end;
    }
    .exercise-name {
      text-align: right;
    }
  }
  .cs-message--incoming {
    .exercise-images {
      justify-content: flex-start;
    }
    .exercise-name {
      text-align: left;
    }
  }
`;

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    background: transparent;
    box-shadow: none;
    padding: 2px 12px;
    margin-left: 25px;
  }

`;
