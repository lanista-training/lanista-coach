import styled from 'styled-components';
import Rating from 'react-rating';

export const TargetContent = styled.div`
display: flex;
flex-flow: column;
.target-values{
  padding: 0 2em;
}
.author {
  height: 6em;
  width: 50%;
  float: right;
  padding: 1em;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: -1em;
  .name {
    font-size: 1.3em;
    padding-right: 0.5em;
    margin-bottom: 0.5em;
  }
}
.goal-properties {
  display: flex;
  padding: 2em;
  .goal-property.target-date {
    .property-value {
      font-size: 1.3em;
      line-height: 1.5em;
      height: 42px
    }
  }
  .goal-property {
    flex: 1;
    text-align: center;
    border-style: solid;
    border-radius: 10px;
    border-width: 2px;
    border-color: rgb(155,201,61);
    padding: 1em 0 0 0;
    overflow: hidden;
    box-shadow: 0 0 10px 0 #0000000f;
    .property-header {
      font-size: 1.3em;
      text-align: center;
      font-weight: 700;
      line-height: 2em;
      background: rgb(155,201,61);
      color: white;
    }
    .property-value {
      font-size: 1;
      height: 3em;
    }
    .day-picker {
      background: white;
      border: 1px solid rgba(0,0,0,.0975);
      box-shadow: 0 0 10px 0 #0000000f;
      border-radius: 10px;
      position: absolute;
      width: 20em;
    }
  }
}

.list {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
  padding: 0em 1em 1em 0em;
  :first-child {
    margin: 0;
  }
  ::-webkit-scrollbar {
    height: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
  .target-card {
    margin: 0 1em;
  }
  .empty-list-message{
    display: flex;
    align-items: center;
    margin-left: 2em;
    font-size: 1.2em;
    color: rgb(185, 185, 185);
  }
}
.value {
  font-size: 1.2em;
}
`;

export const TargetButton = styled.div`
  background: rgb(155,201,61);
  width: 5em;
  height: 6em;
  border-radius: 10px;
  overflow: hidden;
  .button{
    border: none!important;
    box-shadow: none!important;
    background: transparent!important;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;


export const GoalPriority = styled(Rating)`
  width: 100%;
`;

export const Avatar = styled.div`
  border-radius: 50%;
  margin-bottom: 1em;
  width: 45px;
  height: 45px;
  overflow: hidden;
`;
