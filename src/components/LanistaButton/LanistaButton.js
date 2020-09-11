import * as React from 'react';
import { StyledButton } from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export default ({children, disabled, onClick, onBlur, inverted, loading, style, startIcon, endIcon, className}) => {
  return (
    <StyledButton
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      onBlur={onBlur}
      inverted={inverted}
      style={style}
      endIcon={endIcon}
      startIcon={startIcon}
      className={className}
    >
      {!loading && children}
      {loading && <CircularProgress size={24} />}
    </StyledButton>
  )};
