import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 10px;
    max-width: fit-content;
    .print-configurations {
      padding: 2em;
      display: flex;
      .template-name {
        font-size: 1.5em;
        font-family: Roboto;
        text-align: center;
        font-weight: 100;
        margin-top: 2em;
        padding: 1em 0;
        border-top: 1px solid black;
        background: white;
        color: black;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .template-image {
        background-size: 95%;
        background-position: center;
        background-repeat: no-repeat;
        width: 250px;
        height: 200px;
      }
      .standard-template  .template-image{
        background-image: url("https://lanistacoach.s3.amazonaws.com/static/img/print-version-1.png");
      }
      .bit-font-template  .template-image{
        background-image: url("https://lanistacoach.s3.amazonaws.com/static/img/print-version-2.png");
      }
      .diary-template  .template-image{
        background-image: url("https://lanistacoach.s3.amazonaws.com/static/img/print-version-3.png");
      }
      .print-type {
        color: black;
        border: 1px solid black;
        margin: 1em;
        border-radius: 12px;
      }
      .print-type.selected .template-name {
        background: black;
        color: white;
      }
    }
    .action-buttons {
      margin-bottom: 3em;
      padding: 0 7em;
      display: flex;
      justify-content: space-between;
      button {
        padding: 0 15px;
        box-shadow: none;
        border: 1px solid black;
        width: 12em;
      }
      button.positive {
        background-color: black;
        color: white;
      }
      button.negative {
        background-color: white;
        color: black;
      }
      .fab-progress {
        color: white;
        position: absolute;
        right: 11em;
        margin-top: 2px;
      }
    }
  }
`;
