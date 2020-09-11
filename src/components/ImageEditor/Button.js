import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import {StyledButton} from './styles';

export default ({
  name,
  loading,
  onClick,
  disabled,
  inverted,
}) => {
  return (
    <StyledButton
      primary
      disabled={disabled}
      onClick={onClick}
      variant="outlined"
      inverted={inverted}
    >
      {name}
      {loading && <CircularProgress size={24} />}
    </StyledButton>
  );
}
