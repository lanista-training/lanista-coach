import React, { useState } from 'react';
import {Panel} from './styles.js'
import {Icon, Button} from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {getTargetInputField} from "../util";

export default ({initialValue, targetValue, targetType, setScreen, saveTargetEntry}) => {
  const [targetDay, setTargetDay] = useState(new Date())
  const [newValue, setNewValue] = useState(initialValue ? initialValue : 0.0)
  return (
    <Panel>
      <div className="content-section">
        <div className="target-values">
          <div className="initial-value">
            {initialValue && parseFloat(initialValue).toFixed(2)}
            {!initialValue && "Kein Initialwert eingegeben"}
          </div>
          <div className="target-value">
            {targetValue}
          </div>
        </div>
        <div className="input-fields">
          <div className="day-picker">
            <DayPickerInput
              value={targetDay}
              onDayChange={(selectedDay) => setTargetDay(selectedDay)}
            />
          {getTargetInputField(targetType, newValue, (value) => {setNewValue(value)})}
          </div>
          <div className="input-button">
            <Button positive onClick={() => saveTargetEntry(targetDay, newValue)}>
              {initialValue ? "Zielwert speichern" : "Initialwert speichern"}
            </Button>
          </div>
        </div>
      </div>
      <div className="navigation-section">
        <Button icon basic onClick={()=>setScreen("content")}><Icon name='back' />Schliessen</Button>
      </div>
    </Panel>
  )
}
