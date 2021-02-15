import React, { useState } from 'react';
import Switch from "react-switch";
import {StyledHeaderSwitch} from '../styles';

export default ({t, onChange, checked}) => {

  return (
    <StyledHeaderSwitch>
      <div className="lable">{checked ? t('PUBLIC') : t('ALL')}</div>
      <Switch
        onChange={onChange}
        checked={checked}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
      />
    </StyledHeaderSwitch>
  )
}
