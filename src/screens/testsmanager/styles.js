import styled from 'styled-components';

export const Stage = styled.div`
  padding-top: 70px;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  height: 100vh;
  width: 70%;
  max-width: 750px;
  overflow-y: scroll;
  height: calc(100vh);
  .update-section {
    margin-bottom: 2em;
    padding: 2em 2em 1em 2em;
    .update-form {
      padding: 3em 2em 2em 2em;
      background: white;
      border-radius: 25px;
      box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
      display: flex;
      flex-flow: column;
      align-items: flex-end;
      .MuiFormControl-root {
        margin-bottom: 2em;
        width: 100%;
        .MuiOutlinedInput-root{
          border-radius: 15px;
        }
      }
    }
  }
  .create-section {
    margin-bottom: 2em;
    padding: 2em 2em 1em 2em;
    .create-form {
      padding: 2em;
      background: white;
      border-radius: 25px;
      box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
      display: flex;
      flex-flow: column;
      align-items: center;
      .MuiFormControl-root {
        margin-bottom: 2em;
        width: 100%;
        .MuiOutlinedInput-root{
          border-radius: 15px;
        }
      }
    }
  }
  .loading-section {
    display: flex;
    justify-content: center;
    svg {
      color: black;
    }
  }
  .empty-list-section {
    font-size: 1.5em;
    text-align: center;
    color: #b1b0b0;
    margin-top: 1em;
    margin-bottom: 3em;
  }
  .list-section {
    padding: 1em;
    flex-flow: column;
    .list-title {
      font-size: 2em;
      font-weight: 900;
      line-height: 2em;
      margin-bottom: 0.3em;
    }
    .test-card {
      padding: 2em;
      background: white;
      border-radius: 25px;
      box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
      display: flex;
      flex-flow: column;
      margin-bottom: 3em;
      .test-title-section {
        display: flex;
        .test-name {
          flex: 1;
          font-size: 1.3em;
          font-weight: 700;
          padding: 1em 0 2em 24px;
        }
        .test-preview-images-section {
          display: flex;
          .MuiAvatar-root {
            height: 60px;
            width: 60px;
            box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
            margin-right: -10px;
            border-style: solid;
            border-color: white;
          }
        }
      }

      .test-description {
        color: rgba(0, 0, 0, 0.54);
        padding: 8px 24px;
      }
      .commands-section {
        flex: 0 0 auto;
        margin-top: 3em;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
          margin-left: 8px;
        }
      }
      .values-list, .value-form {
        height: 10em;
      }
      .value-form {
        display: flex;
        flex-flow: column;
        padding: 0 2em 0 2em;
        .MuiTextField-root {
          margin-bottom: 2em;
        }
      }
      .values-list{
        display: flex;
        flex-flow: row;
        .empty-values-list {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a2a1a1;
        }
        .value-button {
          width: 100px;
          margin-left: 1em;
        }
        .add-value-button {
          width: 100px;
          .MuiButton-startIcon {
            margin: 0;
            svg {
              font-size: 35px;
              margin-top: 0.2em;
              padding: 0px;
            }
          }
          .MuiButton-label {
            display: flex;
            flex-flow: column-reverse;
          }
        }
      }
    }
    .test-exercise-card {
      padding: 2em;
      background: white;
      border-radius: 25px;
      box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
      display: flex;
      flex-flow: column;
      margin-bottom: 3em;
      .title-section {
        display: flex;
        margin-bottom: 2em;
        .test-name {
          flex: 1;
          font-size: 1.3em;
          font-weight: 700;
          padding: 1em 0 2em 0px;
        }
        .image-section {
          width: 10em;
          height: 5em;
          background-size: 50.5%, 50.5%;
          background-position: right top, left top;
          background-repeat: no-repeat;
          border-radius: 10px;
          box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
        }
      }
      .test-description {
        color: rgba(0, 0, 0, 0.54);
        padding: 8px 24px;
      }
      .commands-section {
        flex: 0 0 auto;
        margin-top: 3em;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
          margin-left: 8px;
        }
      }
      .values-list, .value-form {
        height: 10em;
      }
      .value-form {
        display: flex;
        flex-flow: column;
        padding: 0 2em 0 2em;
        .MuiTextField-root {
          margin-bottom: 2em;
        }
      }
      .values-list{
        display: flex;
        flex-flow: row;
        overflow-x: scroll!important;
        .empty-values-list {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a2a1a1;
        }
        .value-button {
          width: 100px;
          margin-left: 1em;
        }
        .add-value-button {
          width: 100px;
          .MuiButton-startIcon {
            margin: 0;
            svg {
              font-size: 35px;
              margin-top: 0.2em;
              padding: 0px;
            }
          }
          .MuiButton-label {
            display: flex;
            flex-flow: column-reverse;
          }
        }
      }
    }
    .add-exercise-section {
      display: flex;
      justify-content: center;
      margin-bottom: 7em;
    }
    .test-image-section {

    }
  }
`;
