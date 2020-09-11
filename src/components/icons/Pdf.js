/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import { SvgIcon, makeStyles } from '@material-ui/core';
import MySvg from '-!react-svg-loader!./svgs/pdf.svg';

export default ({fontSize}) => {
  return(
    <SvgIcon fontSize={fontSize}>
      <MySvg/>
    </SvgIcon>
  )
}
