import styled from 'styled-components';

export const Panel = styled.div`
  background: white;
  border-radius: 20px!important;
  height: auto;
  color: black;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  .goal-content {
    padding: 2em;
    display:flex;
    .goal-content-left {
      flex: 1;
    }
    .goal-content-right {
      display: flex;
      flex-flow: column;
      align-items: center;
    }
    .goal-name {
      font-weight: 700;
      font-size: 2em;
      padding-right: 0.5em;
    }
    .goal-rating{
      padding-top: 0.5em;
      .MuiRating-label {
        padding: 0 0.2em 0 0;
        font-size: 1.2em;
      }
    }
    form {
      display: flex;
      svg {
        color: rgb(155,201,61)!important;
      }
      .MuiInputBase-root {
        flex: 1;
        padding-left: 1em;
        input {
          font-weight: 700;
          font-size: 2em;
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    .delete-icon {
      margin-top: 1em;
    }
  }
  .author-section {
    display: flex;
    justify-content: center;
    .creation-data {
      display: flex;
      flex-flow: column;
      justify-content: center;
      .author-name {
        font-size: 1.3em;
        padding-right: 0.5em;
      }
      .creation-date {

      }
    }
    .author-avatar {
      border-radius: 50%;
      width: 45px;
      height: 45px;
      overflow: hidden;
      .avatar-foto {
        background-color: #fafafa;
        webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: block;
        flex: 0 0 auto;
        overflow: hidden;
        position: relative;
        background-size: cover;
        height: 100%;
      }
    }
  }
`;
