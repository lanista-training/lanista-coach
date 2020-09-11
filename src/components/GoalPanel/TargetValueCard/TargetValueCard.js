import React from 'react';
import {Card, StyledProgressbar} from './styles.js';
import {getTargetUnit} from '../util';
import { CircularProgressbar } from 'react-circular-progressbar';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default ({target, showTargetValue}) => {
  const {target_value, target_history, type, unit} = target
  const last_value = target_history && target_history.length > 0 ? target_history[target_history.length-1].value : 0
  const targetUnit = getTargetUnit(type)
  let progress = 0;
  if( target_history && target_history.length > 1 ) {
    let initialTarget = Math.abs(target_value - target_history[0].value)
    let currentValue = Math.abs(target_value - target_history[target_history.length-1].value)
    if( target_value > target_history[0].value ) {
      let originalGoal = target_value - target_history[0].value
      let currentState = target_value - target_history[target_history.length-1].value
      progress = currentState / originalGoal * 100
    } else {
      let originalGoal = target_history[0].value - target_value
      let currentState = target_history[target_history.length-1].value - target_value
      progress = 100 - (currentState / originalGoal * 100)
    }
  }

  console.log(target)
  const chartData = target_history.map(value => ({
    name: value.change_date,
    value: value.value,
  }))
  return (
    target ?
      <Card onClick={()=>showTargetValue(target)}>
        <div className="info-section">
          <div className="values-section">
            <div className="current-value">
              <div className="value">{parseFloat(last_value).toFixed(2)} <span>{targetUnit}</span></div>
              <div className="title">AKT. WERT</div>
            </div>
            <div className="target-value">
              <div className="value">{parseFloat(target_value).toFixed(2)} <span>{targetUnit}</span></div>
              <div className="title">ZIELWERT</div>
            </div>
          </div>
          <div className={progress == 0 ? "progress-section cero-progress" : "progress-section"}>
            <StyledProgressbar>
              <CircularProgressbar value={progress} text={`${parseFloat(progress).toFixed(0)}%`} />
            </StyledProgressbar>
          </div>
        </div>
        <div className="chart-section" style={{paddingTop: "2em"}}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
            >
              <Line type="monotone" dataKey="value" stroke="white" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    :
    <div>Loading</div>
  )
}
