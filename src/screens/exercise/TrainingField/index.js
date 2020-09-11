import React, {useEffect, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Number from './Number';

const formatNumber = (number) => (number === null || isNaN(number)) ? 0 : number.toLocaleString().replace('.', ',');

export default ({
  variant,
  value,
  unit,
  onChange,
  onUnitChange,

  position,

  open,
  onClose,

}) => {

  return (
    <Number
      value={value}
      unit={unit}

      onChange={onChange}
      onUnitChange={onUnitChange}

      position={position ? position : "startBottomLeft"}
      sync={true}

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
