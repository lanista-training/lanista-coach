import * as React from "react";
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import FeedTypes from "../FeedTypes";

const StyledButton = styled(Button)`
  background: none!important;
  font-size: 2em!important;
  margin-right: 2.5em!important;
  padding: 0em!important;
  font-family: 'Abel'!important;
  font-size: 1em!important;
  color: rgb(179, 176, 176)!important;
  .active-filter.underlined-filter  {
    border-bottom: ${props => props.activeColor}!important;
    border-bottom-style: solid!important;
  }
`;
const StyledFilter = styled.div`
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  margin-left: 50px;
  max-width: 550px;
`;

export default ({onFilterByTime, onFilterByType, filter}) => (
  <StyledFilter>
    <StyledButton activeColor="rgb(33, 150, 243)" onClick={() => onFilterByType(FeedTypes.birthday)}><span className={filter == FeedTypes.birthday ? "underlined-filter active-filter" : "underlined-filter"} >BIRTHDAYS</span></StyledButton>
    <StyledButton activeColor="rgb(16, 204, 82)" onClick={() => onFilterByType(FeedTypes.customer_activity)}><span className={filter == FeedTypes.customer_activity ? "underlined-filter active-filter" : "underlined-filter"}>ACTIVITIES</span></StyledButton>
    <StyledButton activeColor="rgb(233, 30, 99)" onClick={() => onFilterByType(FeedTypes.workout_expired)}><span className={filter == FeedTypes.workout_expired ? "underlined-filter active-filter" : "underlined-filter"}>PLANS</span></StyledButton>
  </StyledFilter>
);
