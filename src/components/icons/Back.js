/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import { SvgIcon, makeStyles } from '@material-ui/core';
import MySvg from '-!react-svg-loader!./svgs/back.svg';

export default ({fontSize, style, className}) => {
  return(
    <SvgIcon fontSize={fontSize} style={style} className={className}>
      <MySvg/>
    </SvgIcon>
  )
}
