import React, { Component, useState, useEffect } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'rgb(155,201,61)',
  },
}))(LinearProgress);

export default ({t, rules, progress = 0, }) => {

  return (
    <div className="strength-meter">
      <div className="progress-bar">
        <BorderLinearProgress variant="determinate" value={progress} />
      </div>
      <div className="messages-section">
        <div className="messages-header"> {t("a_good_password_is")}</div>
        <div className="strength-messages-list">
          <div className={rules[0].pass ? "strength-message-pass" : "strength-message"}>
            {rules[0].pass ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}
            {rules && t(rules[0].text)}
          </div>
          <div className={rules[1].pass ? "strength-message-pass" : "strength-message"}>
            {rules[1].pass ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}
            {rules && t(rules[1].text)}
          </div>
          <div className={rules[2].pass ? "strength-message-pass" : "strength-message"}>
            {rules[2].pass ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}
            {rules && t(rules[2].text)}
          </div>
          <div className={rules[3].pass ? "strength-message-pass" : "strength-message"}>
            {rules[3].pass ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}
            {rules && t(rules[3].text)}
          </div>
          <div className={rules[4].pass ? "strength-message-pass" : "strength-message"}>
            {rules[4].pass ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedIcon/>}
            {rules && t(rules[4].text)}
          </div>
        </div>
      </div>
    </div>
  )
}
