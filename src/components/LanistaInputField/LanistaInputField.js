import React, { useState, useEffect, useRef } from 'react';
import {InputField} from "./styles";

export default ({value, onChange}) => {
  return (
    <InputField>
      <input value={value}/>
    </InputField>
  )
}
