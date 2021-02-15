import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import moment from "moment";
import { Tab, Button } from 'semantic-ui-react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush, LineChart, Line} from 'recharts';
import {colors} from './styles';

export default ({
  t,
  settings,
  workouts,
  activeChart,
  onCreateProtocoll,
  deleteProtocoll
}) => {

  const bars = []
  const lines = []

  if( !activeChart ) {
    lines.push(<Line dataKey="orm" type="monotone" />)
  }

  const data = _.reverse(_.map(workouts, (workoutDay, day) => {

    let tmp = {name: moment(new Date(day)).format('DD/MM/YYYY')};
    let orm = 0;

    if( activeChart ) {
      workoutDay.map( (workout, index) => {
        tmp[t("set") + "-" + (index+1)] = workout.weight * workout.repetitions
        if(bars.length <= index) {
          bars.push(<Bar key={"bar-" + index} dataKey={ t("set") + "-" + (index+1)} stackId="a" fill={colors[index]} />);
        }
      })
    } else {
      workoutDay.map( (workout) => {
        const dayValue = (workout.weight * workout.repetitions * 0.033) + workout.weight;
        orm = (dayValue > orm) ? dayValue : orm;
      });
      tmp["orm"] = orm;
    }
    return tmp;
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    // find the record
    const workout = _.find(workouts, ((record, index) => index == moment(label, 'DD/MM/YYYY').format('YYYY-MM-DD')))
    if (active && workout && activeChart) {
      const records = _.map(workout, (record, index) =>
        (
          <p key={"tooltip-" + index}><span style={{fontWeight: 900}}>{t("set")} {index+1}:</span> {record.repetitions} X {record.weight} kg</p>
        )
      )
      return (
        <div key={"tooltip"} className="custom-tooltip" style={{background: 'rgba(255, 255, 255, 0.9)', padding: "0.5em", borderRadius: '5px'}}>
          <p className="label" style={{fontWeight: 900, textAlign: 'center'}}>{`${label}`}</p>
          {records}
        </div>
      );
    }
    if (active && workout && !activeChart) {
      const records = _.map(workout, (record, index) =>
        (
          <p key={"tooltip-" + index}><span style={{fontWeight: 900}}>{t("set")} {index+1}:</span> {record.repetitions} X {record.weight} kg 1RM: {Math.trunc((record.repetitions * record.weight * 0.033) + record.weight)} kg</p>
        )
      )
      return (
        <div className="custom-tooltip" style={{background: 'rgba(255, 255, 255, 0.9)', padding: "0.5em", borderRadius: '5px'}}>
          <p className="label" style={{fontWeight: 900, textAlign: 'center'}}>{`${label}`}</p>
          {records}
        </div>
      );
    }
    return null;
  };

  return (
    <Tab.Pane>
    {
      _.size(workouts) > 0 && activeChart && (
        <div className="chart-panel">
          <div className="title">{t("graph-1-title")}</div>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {bars}
              <Brush />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )
    }
    {
      _.size(workouts) > 0 && !activeChart && (
        <div className="chart-panel">
          <div className="title">{t("graph-2-title")}</div>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {lines}
              <Brush />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )
    }
    {
      _.size(workouts) === 0 && <div className="empty-list">{t("no-graphic")}</div>
    }
    </Tab.Pane>
  );
}
