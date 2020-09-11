import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 10px;
    .panel-title {
      padding: 0 0 2em 0;
      font-size: 1.5em;
      font-weight: 700;
      text-align: center;
    }
    .dialog-panel {
      padding: 3em 2em;
      background: white;
      .sets-configuration {
        display: flex;
        .title {
          line-height: 2em;
          font-size: 1.2em;
          font-family: Roboto;
          font-weight: 400;
          width: 5em;
        }
        .configuration {
          padding: 0 0 0 2em;
          width: 17vw;
          .MuiButtonGroup-groupedOutlinedHorizontal:first-child {
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
            height: 40px;
          }
          .MuiButtonGroup-groupedOutlinedHorizontal:last-child {
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
            height: 40px;
          }
        }
      }
      .set-configuration {
        display: flex;
        margin-top: 5em;
        .MuiButton-outlined {
          padding: 5px 10px;
        }
        .title {
          line-height: 2em;
          font-size: 1.2em;
          font-family: Roboto;
          font-weight: 400;
          width: 5em;
        }
        .configuration {
          padding: 0 0 0 2em;
          .units-buttons {
            display: flex;
            width: 14vw;
            justify-content: space-between;
            button {
              background: white;
              color: black;
              border-style: solid;
              border-width: 1px;
              border-color: black;
              font-size: 0.7em;
              box-shadow: none;
              color: black;
              border: 1px solid black;
            }
            button.selected {
              background: black;
              color: white;
            }
          }
        }
        .MuiButtonGroup-root {
          margin-top: 1em;
          .MuiButtonGroup-groupedOutlinedHorizontal:first-child {
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
            height: 40px;
          }
          .MuiButtonGroup-groupedOutlinedHorizontal:last-child {
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
            height: 40px;
          }
        }
      }
      .action-buttons {
        margin-top: 5em;
        display: flex;
        justify-content: space-between;
        button {
          padding: 0 15px;
          box-shadow: none;
          border: 1px solid black;
          width: 10em;
        }
        button.positive {
          background-color: black;
          color: white;
        }
        button.negative {
          background-color: white;
          color: black;
        }
      }
    }
    .MuiButton-outlinedPrimary {
      color: black;
      border: 1px solid black;
    }
  }
`;
