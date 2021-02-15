import styled from 'styled-components';

export const StyledForm = styled.div`
  .MuiTextField-root {
    margin-bottom: 2em;
    width: 100%;
    :last-child {
      margin-bottom: 0;
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: rgb(236, 236, 236);
    }
    .MuiFormHelperText-root {
      margin: 0;
    }
  }
  .MuiExpansionPanel-root {
    padding: 0;
    border: 0!important;
    border-radius: 0;
    box-shadow: none;
    ::before {
      display: none;
    }
    .MuiExpansionPanelSummary-root {
      padding: 0 1em 0 0;
    }
    .MuiExpansionPanelDetails-root {
      display: initial;
      padding: 0;
    }
  }
`;
