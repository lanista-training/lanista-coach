import * as React from "react";
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react'

const WorkoutHeader  = styled.div`
  font-size: 22px;
  line-height: 21px;
  text-align: left;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row-reverse;
  -ms-flex-flow: row-reverse;
  flex-flow: column;
  padding-left: 1em;
  .workout-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    float: left;
    padding-top: 20px;
    text-transform: uppercase;
    font-size: 25px;
    -webkit-letter-spacing: -1px;
    -moz-letter-spacing: -1px;
    -ms-letter-spacing: -1px;
    letter-spacing: -1px;
    color: #b2b2b2;
  }
  .workout-sub-title {
    text-transform: capitalize;
    font-size: 16px;
    line-height: 15px;
    float: left;
  }
`;

export default ({title, subtitle}) => (
  <WorkoutHeader>
    <div className="workout-title">{title}</div>
    <div className="workout-sub-title">{subtitle}</div>
  </WorkoutHeader>
);
