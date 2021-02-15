import styled from 'styled-components'

import Fab from '@material-ui/core/Fab';

export const ConfigurationPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2em 0 1em;
  .panel {
    display: flex;
    flex: 1;
    align-items: center;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    font-weight: 700;
    margin-top: 2em;
    background: white;
    padding: 1.2em;
    border-radius: 10px;
    box-shadow: 0 0 27px 0 #0000001f;
    fieldset {
      border: none;
    }
    .label {
      font-size: 2em;
      display: flex;
      align-items: center;
      svg {
        margin-left: 5px;
      }
    }
    .set-configuration {
      font-size: 2em;
      line-height: 1em;
      display: flex;
      flex-flow: column;
      flex: 1;
      align-items: flex-end;
      margin-right: 1em;
      .set-training, .set-weight {
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
        border-style: solid;
        border-width: 2px;
        border-radius: 50px;
        width: 6em;
        padding: 7px 10px 6px 6px;
        align-items: center;
        span {
          width: 100%;
          .MuiFormControl-root {
            width: 100%;
            input {
              width: 100%;
              text-align: right;
              margin-right: 10px;
              font-weight: 900;
            }
          }
        }
        .unit {
          width: 3em;
        }
        .value {
          margin-right: 10px;
        }
      }
      .set-training {
        margin-bottom: 0.5em;
      }
    }
    .active {
      color: white;
      background: black;
      border-color: black;
      span {
        width: 100%;
        .MuiFormControl-root {
          width: 100%;
          input {
            width: 100%;
            text-align: right;
            margin-right: 1em;
            color: white;
          }
        }
      }
    }
    .day-picker {
      position: absolute;
      top: 130px;
      background: white;
      color: black;
      border-radius: 10px;
      box-shadow: 0 0 27px 0 #0000001f;
      display: flex;
      flex-flow: column;
      align-items: flex-end;
      z-index: 1;
      button {
        position: relative;
        width: 87%;
        margin: 1em;
      }
    }
    input {
      width: 2em;
      padding: 0;
      font-size: 1.7em;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
  }
  button {
    position: absolute;
    right: 0;
    margin-top: 2em;
  }
`;

export const StyledField = styled.div`


`;

export const StyledFab = styled(Fab)` {
  background: black!important;
  color: white!important;
  .MuiCircularProgress-root {
    color: rgb(155,201,61);
    position: absolute;
  }
}
`;
