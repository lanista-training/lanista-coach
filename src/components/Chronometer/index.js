import React, { useState } from 'react';
import {Chronometer} from './styles';
import Draggable from 'react-draggable';
import LanistaButton from '../LanistaButton';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useStopwatch } from "../../hooks/useStopwatch";

const leftPad = (width, n) => {
  if ((n + '').length > width) {
	  return n;
  }
  const padding = new Array(width).join('0');
  return (padding + n).slice(-width);
};

const TimeElapsed = ({timeElapsed}) => {

  const getUnits = () => {
    const seconds = timeElapsed;
    return {
      min: Math.floor(seconds / 60).toString(),
      sec: Math.floor(seconds % 60).toString(),
      msec: (seconds % 10).toFixed(2).substring(2)
    };
  };

  const units = getUnits();

  return (
    <div className={"display-numbers"}>
      <span>{leftPad(2, units.min)}:</span>
      <span>{leftPad(2, units.sec)}:</span>
      <span>{units.msec}</span>
    </div>
  );

}

export default ({onClose}) => {

  const {
    laps,
    addLap,
    isRunning,
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
    defaultPosition,
  } = useStopwatch();

  return (
    <Draggable
      defaultPosition={{x: 160, y: (window.innerHeight / 2 * -1) - 65}}
      handle="#draggable-dialog-title"
    >
      <Chronometer>
        <div className="header">
          <div className="dragable-area" id="draggable-dialog-title"></div>
          <IconButton aria-label="close" size="large" onClick={onClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="panel-wrapper">
          <TimeElapsed timeElapsed={elapsedTime}/>
          <div className="buttons">
            {!isRunning && <LanistaButton onClick={startTimer}>START</LanistaButton>}
            {isRunning && <LanistaButton onClick={stopTimer}>STOP</LanistaButton>}
            <LanistaButton onClick={resetTimer}>RESET</LanistaButton>
          </div>
        </div>
      </Chronometer>
    </Draggable>
  )

}
