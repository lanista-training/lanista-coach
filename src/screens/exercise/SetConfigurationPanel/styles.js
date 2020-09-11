import styled from 'styled-components'

export const StyledSetConfigurationPanel = styled.div`
  position: fixed;
  width: 26vh;
  top: calc(50% - 125px);
  right: 1em;
  border-radius: 10px;
  background-color: black;
  z-index: 2;
  display: flex;
  flex-flow: column;
  align-items: center;
  .command-buttons {
    padding: 2em;
    width: 100%;
    display: flex;
    flex-flow: column;
  }
  .for-all-sets {
    padding-top: 3em;
    .label {
      float: left;
      font-size: 1.5em;
      width: 100%;
      text-align: center;
    }
    .checkbox {
      padding-top: 2em;
      display: block;
      margin-left: auto;
      margin-right: auto;
      padding-bottom: 1em;
      label:before {
        background: rgb(175, 175, 175);
      }
      input:checked~label:before {
        background-color: #21ba45!important;
      }
    }
  }
`;
