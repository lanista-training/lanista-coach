import React, { useState, useEffect, useRef } from 'react';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

export default ({
  t,
  values,
  data,
  onValuesChange,
}) => {

console.log("values")
console.log(values)
console.log(data)

  return (
    <div className="test-values">
      {
        values.map((valueItem, index) => <div className="value-section">
          <FormControl variant="outlined">
            <InputLabel htmlFor={"value-input-field-" + index} variant="outlined">{valueItem.name}</InputLabel>
            <OutlinedInput
              id={"value-input-field-" + index}
              type='number'
              value={data[index]}
              onChange={e => onValuesChange(e.target.value, index)}
              endAdornment={<InputAdornment position="start">{t("value-unit-" + valueItem.type)}</InputAdornment>}
              labelWidth={70}
            />
          </FormControl>
        </div>)
      }
    </div>
  );
}
