import React, {useEffect, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Number from './Number';

const formatNumber = (number) => (number === null || isNaN(number)) ? 0 : number.toLocaleString().replace('.', ',');

export default ({
  variant,
  value,
  onChange,

  open,
  onClose,

}) => {

  return (
    <Number
      onChange={onChange}
      position={"startBottomLeft"}
      sync={true}
      value={value}

      open={open}

      onClose={onClose}


      update={() => console.log("UPDATE")}
      confirm={() => console.log("CONFIRM")}
    >
      <TextField
        inputProps={{
          readOnly: true,
        }}
        variant="outlined"
        value={formatNumber(value)}
      />
    </Number>
  )

}
