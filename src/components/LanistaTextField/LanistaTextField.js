import React, { useState, useEffect, useRef } from 'react';
import {StyledTextField} from "./styles";
import { withStyles} from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  },
})(StyledTextField);

export default ({
  id,
  type,
  name,
  value,
  editing,
  disabled,
  label,
  onChange,
  onBlur,
  onKeyDown,
  autoFocus,
  multiline,
  rows,
  error,
  helperText,
  className,
  placeholder,
}) => {
  return (
    <CssTextField
      id={id}
      type={type}
      name={name}
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      error={error}
      helperText={helperText}
      className={className}
      placeholder={placeholder}
    />
  )
}
