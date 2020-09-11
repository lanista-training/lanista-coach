/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import { SvgIcon, makeStyles } from '@material-ui/core';
import MySvg from '-!react-svg-loader!./svgs/tools.svg';

const Icon = ({fontSize}) => {
  return(
    <SvgIcon fontSize={fontSize}>
      <MySvg/>
    </SvgIcon>
  )
};

export default Icon;
