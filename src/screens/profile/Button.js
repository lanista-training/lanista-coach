import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {CardButton} from './styles';

export default ({
  name,
  loading,
  onClick,
  disabled,
}) => {
  return <CardButton>
    <Button
      primary
      disabled={disabled}
      onClick={onClick}
    >
      {name}
      {loading && <CircularProgress size={24} />}
    </Button>

  </CardButton>
}
