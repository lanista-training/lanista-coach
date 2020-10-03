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

export default ({id, name, value, editing, disabled, label, onChange, onBlur, onKeyDown, autoFocus, multiline, rows}) => {
  return !editing ? value : (
    <CssTextField
      id={id}
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
    />
  )
}
