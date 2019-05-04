import * as React from "react";
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import FeedTypes from "../FeedTypes";

const StyledButton = styled(Button)`
  background: none!important;
  font-size: 2em!important;
  margin-right: 2.5em!important;
  padding: 0em!important;
  .actives {
    color: green!important;
  }
`;
const StyledFilter = styled.div`
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
`;

export default ({onFilterByTime, onFilterByType, filter}) => (
  <StyledFilter>
    <StyledButton circular icon='icon-time-inactive' onClick={onFilterByTime}/>
    <StyledButton circular icon='icon-birthday-inactive' className={filter == FeedTypes.birthday ? "active" : ""} onClick={() => onFilterByType(FeedTypes.birthday)}/>
    <StyledButton circular icon='icon-email-inactive' className={filter == FeedTypes.message ? "active" : ""} onClick={() => onFilterByType(FeedTypes.message)}/>
    <StyledButton circular icon='icon-calender-inactive' className={filter == FeedTypes.appointment ? "active" : ""} onClick={() => onFilterByType(FeedTypes.appointment)}/>
  </StyledFilter>
);
