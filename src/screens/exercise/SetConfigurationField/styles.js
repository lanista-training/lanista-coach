import styled from 'styled-components'
import { motion } from "framer-motion";

export const StyledField = styled(motion.div)`
  font-weight: 700;
  margin-top: 4px;;
  background: white;
  padding: 1em;
  padding-top: 0.8em;
  box-shadow: 0 0 27px 0 #0000001f;
  height: 8em;
  .buttons-section {
    margin-top: 13px;
    height: 2em;
  }
  :first-child  {
    border-top-right-radius: 10px!important;
    border-top-left-radius: 10px!important;
  }
  :last-child  {
    border-bottom-right-radius: 10px!important;
    border-bottom-left-radius: 10px!important;
  }
  .label {
    float: left;
    font-size: 1.2em;
  }
  .entry-value {
    display: flex;
    flex: 1;
    font-size: 0.9em;
    .unit {
      width: 2em;
      text-align: left;
      padding-left: 0.4em;
    }
  }
  .editing {
    background: transparent;
    .set-training, .set-weight {
      border-style: solid;
      border-width: 2px;
      border-radius: 15px;
      padding: 10px 10px!important;
      margin: 5px 0;
    }
  }
  .set-configuration {
    display: flex;
    justify-content: space-between;
    .active {
      background: black;
      color: white;
      border-radius: 15px;
      padding: 1em!important;
      input {
        color: white;
      }
    }
    .MuiTextField-root {
      padding-right: 0.3em;
    }
    .unit {
      font-size: 0.8em;
      text-align: left;
      width: 5em;
    }
    .value {
      flex: 1;
      text-align: right;
      margin-right: 10px;
    }
    .set-weight {
      display: flex;
      float: right;
      .progress {
        width: 50%!important;
        margin-bottom: 0;
        height: 1em;
        font-size: 0.8em;
        .bar {
          height: 1em;
        }
      }
    }
    .set-training, .set-weight {
      display: flex;
      display: flex;
      -webkit-box-pack: end;
      justify-content: flex-end;
      width: 6em;
      -webkit-box-align: center;
      align-items: center;
      flex-flow: row;
      padding: 0px 10px 0px 0px;
      height: 1em;
      font-size: 20px;
      input {
        text-align: right;
        padding: 0;
        font-weight: 900;
        font-size: 20px;
      }
      fieldset {
        border: 0;
      }
      .progress {
        width: 50%!important;
        margin-bottom: 0;
        height: 1em;
        font-size: 0.8em;
        .bar {
          height: 1em;
        }
      }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
    fieldset {
      border-color: white!important;
      border-radius: 15px!important;
    }
  }
  .delete-button {
    position: relative;
    margin-top: -8px;
  }
  .progress.positive {
    float: right;
  }
  .negative{
    .bar {
      margin-left: auto;
    }
    .progress {
      ::before {
        content: "-";
        margin-left: -0.5em;
      }
    }
  }
}
`;
