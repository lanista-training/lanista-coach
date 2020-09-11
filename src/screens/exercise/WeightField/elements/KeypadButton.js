import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';

const KeypadButton = styled(Button)`
  && {
    font-size: 1.2em;
    padding: 0px;
    border-radius: 0;
    width: 33.3%;
  }
`;

const BackButton = styled(IconButton)`
  && {
    font-size: 1.2em;
    padding: 0px;
    border-radius: 0;
    width: 33.3%;
  }
`;

const ButtonWrapper = memo(({ value, click, disabled }) => (
  value == '.' ?
  <KeypadButton onClick={() => click(value)} disabled={disabled}>
    ,
  </KeypadButton>
  :
  value == '-' ?
  <BackButton onClick={() => click(value)} disabled={disabled}>
    <BackspaceIcon />
  </BackButton>
  :
  <KeypadButton onClick={() => click(value)} disabled={disabled}>
    {value}
  </KeypadButton>
));

ButtonWrapper.defaultProps = {
  value: undefined,
  disabled: false,
};

ButtonWrapper.propTypes = {
  click: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};

export default ButtonWrapper;
