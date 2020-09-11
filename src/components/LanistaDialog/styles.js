import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

export const StyledDialog = styled(Dialog)`
.MuiPaper-root{
  background: #fffefe;
  border-radius: 15px;
  padding: 2em;
  .MuiDialogTitle-root {
    padding: 1em 0 2em 2em;
  }
  .MuiDialogContent-root {
    display: flex;
    .form-section {
      flex: 1;
      padding-right: 2em;
    }
    .loading-section {
      widgth: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .message-section {
      flex: 1;
      .message-section-title {
        font-size: 20px;
        font-weight: 900;
        margin-bottom: 1em;
      }
      .message-section-content {
        text-align: justify;
      }
    }
  }
  .MuiDialogActions-root {
    padding-top: 2em;
  }
}
`;
