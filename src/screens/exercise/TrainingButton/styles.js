import styled from 'styled-components'

export const StyledButton = styled.div`
  display: flex;
  flex-flow: column;
  height: 8em;
  .increase {
    width: 100%;
    text-align: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex: 2;
    display: flex;
    align-items: center;
    font-size: 2.5em;
    div {
      width: 100%;
    }
  }
  .increase.number {
    ::before {
      font-family: Lanista;
      content: "\\e953";
      transform: rotate(90deg);
      margin-left: auto;
      margin-right: auto;
      top: 15px;
    }
  }
  .increase.unit{
    font-size: 2em;
  }
  .reduce {
    width: 100%;
    text-align: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex: 2;
    display: flex;
    align-items: center;
    font-size: 2.5em;
    div {
      width: 100%;
    }
  }
  .reduce.unit{
    font-size: 2em;
  }
  .reduce.number {
    ::before {
      font-family: Lanista;
      content: "\\e953";
      transform: rotate(-90deg);
      top: 15px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .revert {
    width: 100%;
    text-align: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex: 2;
    display: flex;
    align-items: center;
    padding-top: 1em;
    font-size: 2em;
    div {
      width: 100%;
    }
    ::before {
      font-family: Lanista;
      content: "\\e95c";
      transform: rotate(-90deg);
      top: 15px;
      margin-left: auto;
      margin-right: auto;
      color: #db2828;
      text-shadow: #db2828a6 0px 0px 10px;
    }
  }
`;
