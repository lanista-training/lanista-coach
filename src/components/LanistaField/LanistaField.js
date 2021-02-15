import React, { useState, useEffect, useRef } from 'react';
import {StyledTextField} from "./styles";
import { withStyles} from '@material-ui/core/styles';
import { useTranslate } from '../../hooks/Translation';

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  },
})(StyledTextField);

const NoValue = ({emptyText}) => {
  return <div className="no-value">{emptyText}</div>
}

export default ({id, name, value, editing, disabled, label, onChange, onBlur, onKeyDown, autoFocus, multiline, rows, defaultValue, emptyText, helperText, error}) => {
  return !editing ? ( !value || value.length == 0 ? <NoValue emptyText={emptyText}/> : value) : (
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
      defaultValue={defaultValue}
      error={error}
      helperText={helperText}
    />
  )
}
