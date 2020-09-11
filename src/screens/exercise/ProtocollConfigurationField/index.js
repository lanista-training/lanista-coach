import React, { Component, useState, useEffect } from 'react';
import {ConfigurationPanel, StyledField, StyledFab} from './styles';

import DayPicker from 'react-day-picker';
import moment from "moment";
import {useSpring, animated} from 'react-spring';
import { Button } from 'semantic-ui-react';
import SetConfigurationPanel from '../SetConfigurationPanel';
import TextField from '@material-ui/core/TextField';

import WeightField from '../WeightField';
import TrainingField from '../TrainingField';

import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateRangeIcon from '@material-ui/icons/DateRange';

const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

const AnimatedField = animated(StyledField);

export default ({

  t,

  settings,
  onCreateProtocoll,
  createProtocollLoading,

}) => {

  const [weight, setWeight] = useState(0);
  const [training, setTraining] = useState(0);
  const [unit, setUnit] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPickyDateTime, setShowPickyDateTime] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [applyToAllSets, setApplyToAllSets] = useState(false);

  useEffect(() => {
    setWeight(settings.weight)
    setTraining(settings.training)
    setUnit(settings.unit)
  }, [settings]);

  const onWeightChange = (value) => {
    if( value == 'up') {
      setWeight(weight + 1)
    } else {
      setWeight(weight > 0 ? weight - 1 : 0)
    }
  }

  const onTrainingChange = (value) => {
    if( value == 'up') {
      setTraining(training + 1)
    } else {
      setTraining(training > 0 ? training - 1 : 0)
    }
  }

  const onUnitChange = (value) => {
    setUnit(value)
  }

  const handleDayClick = (day) => {
    setSelectedDate(day)
    setShowPickyDateTime(false)
  }

  return(
    <ConfigurationPanel>
      <div className="panel">
        <div style={{lineHeight: "1em"}} className="label" onClick={(e) => {
            setShowPickyDateTime(!showPickyDateTime)
          }}>
          {isToday(selectedDate) ? 'Heute' : moment(selectedDate).format("DD.MM.YYYY")}  <DateRangeIcon fontSize="large"/>
        </div>
        {
          showPickyDateTime &&
          <div className="day-picker" style={{lineHeight: "initial"}}>
            <DayPicker onDayClick={handleDayClick}/>
          </div>
        }
        <div className="set-configuration">
          <div
            className={ activeField == 0 ? "set-training active" : "set-training" }
            onClick={() => {
              setActiveField(0)
            }}
          >
            <TrainingField
              variant="outlined"
              value={training}
              unit={unit}
              onChange={value => setTraining(value)}
              onUnitChange={value => setUnit(value)}

              onClose={() => {
                setActiveField(null)
              }}

              open={activeField == 0}
            />
            <div className="unit">{unit == 0 ? t("rep") : unit == 1 ? t("sec") : t('min')}</div>
          </div>
          <div
            className={ activeField == 1 ? "set-weight active" : "set-weight" }
            onClick={() => {
              setActiveField(1)
            }}
          >
            <WeightField
              variant="outlined"
              value={weight}
              onChange={value => setWeight(value)}

              onClose={() => {
                setActiveField(null)
              }}
              open={activeField == 1}
            />
            <div className="unit">Kg</div>
          </div>
        </div>
      </div>
      {
        activeField === null &&
        <StyledFab
          aria-label="add"
          onClick={() => {
            onCreateProtocoll(selectedDate, training, unit, weight);
          }}
          disabled={createProtocollLoading}
        >
          {createProtocollLoading ? <CircularProgress size={68} /> : <AddIcon />}
        </StyledFab>
      }
    </ConfigurationPanel>
  )
}
