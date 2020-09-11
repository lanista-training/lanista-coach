import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useOnClickOutside from 'use-onclickoutside';
import IconCheck from '@material-ui/icons/CheckSharp';
import IconClose from '@material-ui/icons/CloseSharp';
import Paper from '@material-ui/core/Paper';

import Button from './KeypadButton';
import Display from './Display';
import { media } from '../styles/media-templates';
import NButton from './ui';
import useKeyboardInput from '../hooks/useKeyboardInput';

import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LanistButton from '../../../../components/LanistaButton';

const Content = styled(Paper)`
  border-radius: 15px;
  background: black!important;
  color: white!important;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  ${media.mobile`width: 100%;`}

  ${props =>
    props.position === 'fullscreen'
      ? `
  width: 100vw;
  height: 100vh;
  font-size: 1.2em;
  `
      : `
      width: 264px;
    height: 410px;
  `}

  background: ${props => props.theme.body.backgroundColor};
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  .quick-access-section {
    display: flex;
    justify-content: space-around;
    .quick-access-buttons {
      display: flex;
      flex-flow: column;
      align-items: center;
      .MuiIconButton-root {
        color: inherit;
      }
    }
  }
  .commands-section {
    text-align: center;
    padding: 1em;
    .MuiButtonBase-root {
      height: 100%;
      width: 100%;
      color: white;
      span {
        color: white;
      }
    }
  }
`;

const Label = styled.div`
  overflow: hidden;
  font-size: 1.3em;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// TODO use material-ui colors
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 4px;
  align-items: center;
  color: white;
  background: ${props => props.theme.header.backgroundColor};
  user-select: none;
`;

const Keys = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  background: ${props => props.theme.header.secondaryColor};
  button {
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    color: white;
  }
  button:nth-child(3n) {
    border-right: none;
  }
  button:nth-child(-n + 3) {
    border-top: 1px solid #ddd;
  }
`;

const KeyPad = forwardRef(function KeyPad(
  {
    displayRule,
    position,
    validation,
    label,
    confirm,
    cancel,
    keyValid,
    value,
    update,
    sync
  },
  ref
) {
  // @ts-ignore
  const keypadKeys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', '.'];
  const keyboardKeys = [...Array(10).keys()].map(v => v.toString());
  const [inputValue, setInputValue] = useState(value);
  const keyboard = useKeyboardInput(
    inputValue,
    keyboardKeys.filter(key => keyValid(inputValue, key))
  );

  function computeNextKey(newValue, key) {
    let computedValue;
    if (keyValid(inputValue, key)) {
      if (key === '-') {
        computedValue = inputValue.substring(0, inputValue.length - 1);
        computedValue = computedValue.length == 0 ? '0' : computedValue;
      } else if (key === '.') {
        const leadingZero = ['', '-'].includes(inputValue);
        computedValue = `${inputValue}${leadingZero ? '0' : ''}${key}`;
      } else {
        computedValue = newValue;
      }
      setInputValue(computedValue);
      if (sync) {
        update(computedValue);
      }
    } else if( key == '>' ) {
      update(newValue);
    } else if( key == '<' ) {
      update(newValue);
    }
  }

  useOnClickOutside(ref, e => {
    if (validation(inputValue)) {
      confirm(inputValue);
    } else {
      cancel();
    }
  });

  // Reload props.value into the state
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (keyboard.keyDownEvent) {
      /** useKeyBaordInput set null when initializing the initialValue to avoid this computation before validation  */
      if (['Enter', 'Tab'].includes(keyboard.keyDownEvent.key) && validation(keyboard.value)) {
        confirm(keyboard.value);
      } else if (['Escape'].includes(keyboard.keyDownEvent.key)) {
        cancel();
      } else if (['Backspace'].includes(keyboard.keyDownEvent.key)) {
        if (keyboard.keyDownEvent.ctrlKey || keyboard.keyDownEvent.altKey) {
          setInputValue('');
        } else {
          setInputValue(keyboard.value);
          inputValue && inputValue.length > 0 && update(inputValue.substring(0, inputValue.length - 1))
        }
      } else {
        computeNextKey(keyboard.value, keyboard.keyDownEvent.key);
      }
    }
  }, [keyboard.value, keyboard.keyDownEvent]);

  const onButtonClick = useCallback(
    clickedKey => keyboard.virtualInteraction(clickedKey.toString()),
    []
  );


  //
  // In crease decrease by 1
  //
  const onButtonUpClick_1 = useCallback(
    clickedKey => keyboard.virtualInteraction('>', 1),
    []
  );

  const onButtonDownClick_1 = useCallback(
    clickedKey => keyboard.virtualInteraction('<', 1),
    []
  );

  //
  // In crease decrease by 2
  //
  const onButtonUpClick_2 = useCallback(
    clickedKey => keyboard.virtualInteraction('>', 2),
    []
  );

  const onButtonDownClick_2 = useCallback(
    clickedKey => keyboard.virtualInteraction('<', 2),
    []
  );

  //
  // In crease decrease by 10
  //
  const onButtonUpClick_10 = useCallback(
    clickedKey => keyboard.virtualInteraction('>', 10),
    []
  );

  const onButtonDownClick_10 = useCallback(
    clickedKey => keyboard.virtualInteraction('<', 10),
    []
  );

  return (
    <Content position={position} ref={ref} square>
      <div className="quick-access-section">
        <div className="quick-access-buttons">

          <IconButton aria-label="up" onClick={onButtonUpClick_1}>
            <ExpandLessIcon fontSize="inherit" />
          </IconButton>
          <div className="quick-access-value">
            1
          </div>
          <IconButton aria-label="down" onClick={onButtonDownClick_1}>
            <ExpandMoreIcon fontSize="inherit" />
          </IconButton>
        </div>

        <div className="quick-access-buttons" >
          <IconButton aria-label="up" onClick={onButtonUpClick_2}>
            <ExpandLessIcon fontSize="inherit" />
          </IconButton>
          <div className="quick-access-value">
            2
          </div>
          <IconButton aria-label="down" onClick={onButtonDownClick_2}>
            <ExpandMoreIcon fontSize="inherit" />
          </IconButton>
        </div>

        <div className="quick-access-buttons">
          <IconButton aria-label="up" onClick={onButtonUpClick_10}>
            <ExpandLessIcon fontSize="inherit" />
          </IconButton>
          <div className="quick-access-value">
            10
          </div>
          <IconButton aria-label="down" onClick={onButtonDownClick_10}>
            <ExpandMoreIcon fontSize="inherit" />
          </IconButton>
        </div>

      </div>
      <Keys>
        {keypadKeys.map(key => (
          <Button
            key={`button-${key}`}
            click={onButtonClick}
            value={key}
            disabled={false}
          />
        ))}
      </Keys>
      <div className="commands-section">
        <LanistButton onClick={() => {
            confirm(inputValue);
          }} disabled={!validation(inputValue)}>
          ÜBERNEHMEN
        </LanistButton>
      </div>
    </Content>
  );
});

KeyPad.displayName = 'KeyPad'; // TODO: necessary?

KeyPad.propTypes = {
  label: PropTypes.string,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func,
  displayRule: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
  keyValid: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sync: PropTypes.bool,
  update: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};

KeyPad.defaultProps = {
  label: undefined,
  value: '',
  sync: false,
  cancel: () => {},
};

export default KeyPad;
