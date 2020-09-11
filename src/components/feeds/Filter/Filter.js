import * as React from "react";
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import FeedTypes from "../FeedTypes";

import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

const StyledButton = styled(Button)`
  font-family: Roboto!important;
  font-weight: 400!important;
  background: none!important;
  margin-right: 2.5em!important;
  padding: 0em!important;
  font-size: 1em!important;
  color: rgb(179, 176, 176)!important;
  .active-filter.underlined-filter  {
    border-bottom: ${props => props.activeColor}!important;
    border-bottom-style: solid!important;
  }
`;
const StyledFilter = styled.div`
  display: inline-flex;
  border-radius: 4px;
  background-color: transparent;
  align-self: center;
  width: 100%;
  justify-content: center;
  margin-right: 25%;
  background-color: transparent!important;
  .MuiToggleButtonGroup-root {
    box-shadow: 0 0 27px 0 #0000001f!important;
  }
  button {
    height: 35px;
    .MuiToggleButton-label {
      line-height: initial;
    }
  }
  button.selected {
    color: black;
  }
`;

export default ({onFilterByType, filter, t}) => (
  <StyledFilter>
    <ToggleButtonGroup>
      <ToggleButton
        value={FeedTypes.birthday}
        aria-label={FeedTypes.birthday}
        onClick={() => onFilterByType(FeedTypes.birthday)}
        className={filter == FeedTypes.birthday ? 'selected' : ''}
      >
        {t('BIRTHDAYS')}
      </ToggleButton>
      <ToggleButton
        value={FeedTypes.customer_activity}
        aria-label={FeedTypes.customer_activity}
        onClick={() => onFilterByType(FeedTypes.customer_activity)}
        className={filter == FeedTypes.customer_activity ? 'selected' : ''}
      >
        {t('ACTIVITIES')}
      </ToggleButton>
      <ToggleButton
        value={FeedTypes.workout_expired}
        aria-label={FeedTypes.workout_expired}
        onClick={() => onFilterByType(FeedTypes.workout_expired)}
        className={filter == FeedTypes.workout_expired ? 'selected' : ''}
      >
        {t('PLANS')}
      </ToggleButton>
    </ToggleButtonGroup>
  </StyledFilter>
);
