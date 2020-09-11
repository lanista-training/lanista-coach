import styled from 'styled-components';
import { motion } from "framer-motion";

export const Panel = styled(motion.div)`
  font-weight: 700;
  margin-top: 2em;
  background: white;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 0 27px 0 #0000001f;
  height: 8em;
  fieldset {
    border: none;
  }
  .label {
    font-size: 2em;
  }
  .label {
    float: left;
    font-size: 1.5em;
    padding-bottom: 0.5em;
  }
  .set-configuration {
    font-size: 2em;
    line-height: 1em;
    display: flex;
    flex-flow: column;
    flex: 1;
    align-items: flex-end;
    .set-training, .set-weight {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;
      border-style: solid;
      border-width: 2px;
      border-radius: 50px;
      width: 6em;
      padding: 3px 10px 2px 6px;
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
      margin-bottom: 10px;
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
  .plus-button {
    margin-left: 2em;
  }
  .plus-button {
    position: relative;
    top: -40px;
    left: -7%;
  }
`;
