import styled from 'styled-components';

export const TestItem = styled.div`
  background: white;
  border-radius: 25px;
  display: flex;
  box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
  margin-bottom: 2em;
  overflow: hidden;
  align-items: center;
  padding: 1em;
  .lists-section {
    padding: 0.5em;
    align-items: center;
    max-width: 598px;
    min-width: 486px;
    .set-title {

    }
    .list-header-section {
      font-size: 12px;
      font-weight: 500;
      margin-right: 12px;
      margin-top: 12px;
      line-height: 25px;
    }
    .results-list {
      background: #ffffffab;
      padding: 1em;
      margin-right: 1em;
      border-radius: 15px;
      box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
      .set-title {
        font-size: 13px;
        font-weight: 900;
      }
      .result-values {
        display: flex;
        padding: 0 0.5em;
        margin: 0.25em 0.5em;
        justify-content: center;
        .set-value {
          font-weight: 900;
        }
        .set-value-unit {
          font-weight: 100;
          width: 50%;
          margin-left: 10px;
          color: #989898;
        }
      }
      .form-section {
        min-width: 10em;
      }
      .buttons-section {
        display: flex;
        flex-flow: column;
        .MuiButtonBase-root {
          margin-top: 1em;
        }
      }
    }
  }
  .selected-list {
    border-style: solid;
    border-radius: 15px;
    padding: 1em;
    border-width: 1px;
    margin: 1em;
  }
  .test-text-section {
    display: flex;
    flex-flow: column;
    align-self: center;
    padding: 1em;
    flex: 1;
  }
  .test-name {
    font-size: 1.2em;
    font-weight: 700;
    line-height: 1.5;
  }
  .test-selection {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: left;
  }
  .test-select-item {
    line-height: 3em;
    text-align: center;
    background: white;
    button {
      width: 100%;
      height: 42px;
    }
  }
  .selected {
    color: white;
  }
  .test-selection-wrapper {
    width: 56vw;
    max-width: 648px;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 0.5em;
  }
  .test-image {
    width: 25%;
    background-repeat: no-repeat;
    background-position: right;
    background-size: auto 100%;
    height: 14em;
    margin-left: 2em;
    border-radius: 15px;
    overflow: hidden;
  }
  .comment-section {
    padding-top: 1em;
    font-size: 1.1em;
    .comment-input {
      background-color: transparent;
      color: initial;
      border: none;
      margin-left: 1em;
      ::placeholder {
        color: #bbbbbb;
        opacity: 1;
      }
      :disabled {
        color: #afafaf;
      }
    }
  }
`;
