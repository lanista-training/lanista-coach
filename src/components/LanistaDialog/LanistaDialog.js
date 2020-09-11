import * as React from 'react';
import { StyledDialog } from './styles';

export default ({children, open, onClose}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
    >
      {children}
    </StyledDialog>
  )};
