import styled from 'styled-components';

export const Chronometer  = styled.div`
overflow: hidden;
  .header {
    display: flex;
    flex-flow: revert;
    background: #80808047;
    width: 100%;
    margin-bottom: 2em;
    .dragable-area {
      height: 45px;
      width: 100%
    }
  }

  .panel-wrapper {
    padding: 0 2em 2em 2em;
    width: 100%;
    .display-numbers {
      text-align: center;
      font-size: 4em;
      font-weight: 100;
      margin: 10px 0 28px 0;
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 1em;
    }
  }
  background-color: #ffffffeb;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 15px;
  box-shadow: 0 0 27px 0 #0000001f;
  width: 20em;
  display: flex;
  flex-flow: column;
  align-items: center;
`;
