import * as React from "react";
import styled from 'styled-components';
import FeedTypes from "../FeedTypes";

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
    background: white;
`;
const StyledFilter = styled.div`
  display: inline-flex;
  background-color: transparent;
  align-self: center;
  width: 100%;
  justify-content: center;
  margin-right: 25%;
  background-color: transparent!important;
  .MuiButtonGroup-root {
    box-shadow: rgba(0, 0, 0, 0.33) 0px 0px 27px 0px;
    border-radius: 15px;
    margin-left: auto;
    margin-right: auto;
  }
  button {
    border-radius: 15px;
    background: white!important;
    .MuiToggleButton-label {
      line-height: initial;
    }
  }
  button.selected {
    background: black!important;
    color: white;
  }
`;

export default ({onFilterByType, filter, t}) => (
  <StyledFilter>
    <ButtonGroup>
      <Button
        value={FeedTypes.birthday}
        aria-label={FeedTypes.birthday}
        onClick={() => onFilterByType(FeedTypes.birthday)}
        className={filter == FeedTypes.birthday ? 'selected' : ''}
      >
        {t('BIRTHDAYS')}
      </Button>
      <Button
        value={FeedTypes.customer_activity}
        aria-label={FeedTypes.customer_activity}
        onClick={() => onFilterByType(FeedTypes.customer_activity)}
        className={filter == FeedTypes.customer_activity ? 'selected' : ''}
      >
        {t('ACTIVITIES')}
      </Button>
      <Button
        value={FeedTypes.workout_expired}
        aria-label={FeedTypes.workout_expired}
        onClick={() => onFilterByType(FeedTypes.workout_expired)}
        className={filter == FeedTypes.workout_expired ? 'selected' : ''}
      >
        {t('PLANS')}
      </Button>
    </ButtonGroup>
  </StyledFilter>
);
