import styled from 'styled-components';

export const Panel = styled.div`
  background: white;
  height: 100vh;
  width: 100vw;
  top: 0;
  position: absolute;
  .logo-wrapper {
    margin-top: 10vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    .logo {
      height: 10em;
      width: 10em;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .loading-area {
    text-align: center;
    margin-top: 10vh;
    .loading-text {
      position: relative;
      width: 100%;
      top: 5em;
      line-height: 0em;
      font-family: Roboto;
      font-weight: 100;
      color: grey;
    }
    .MuiCircularProgress-root {
      color: #b41730!important;
    }
  }
  .error-area {
    text-align: center;
    margin-top: 10vh;
    font-family: Roboto;
    font-weight: 900;
    padding: 1em;
  }
  .trainer-list {
    display: flex;
    justify-content: center;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none!important;
    }
  }
  .trainer {
    text-align: center;
    margin: 3.5px;
    padding: 2em;
    .trainer-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: auto;
      margin-left: auto;
      z-index: 1;
      position: relative;
      background-size: cover;
      border-style: solid!important;
      border-width: 4px!important;
      border-color: #34acfb;
      background-color: white;
    }
    .trainer-background {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      font-family: "Lanista Icons";
      text-align: center;
      font-size: 60px;
      line-height: 92px;
      background-color: #34acfb;
      color: white;
      margin-left: auto;
      margin-right: auto;
      margin-top: -100px;
    }
    .trainer-first-name {
      height: 22px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .trainer-last-name {
      height: 22px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
`;
