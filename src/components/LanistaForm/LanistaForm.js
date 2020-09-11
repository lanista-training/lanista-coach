import * as React from 'react';
import { StyledForm } from './styles';

export default ({children, onClick}) => {
  return (
    <StyledForm className="lanista-form">
      {children}
    </StyledForm>
  )};
