import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 10px;
    max-width: fit-content;
    .info-section {
      padding: 2em;
      display: flex;
      justify-content: space-around;
      margin-bottom: 5em;
      .link-section, .qr-code-section {
        width: 300px;
        height: 180px;
        display: flex;
        flex-flow: column;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;
        .link {
          display: flex;
          align-content: center;
          height: 100%;
          width: 100%;
          padding: 1em;
          align-items: center;
          textarea {
            height: 100%;
            width: 100%;
          }
        }
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
        width: 15em;
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
