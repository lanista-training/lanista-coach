import React, { Component, useState } from 'react';
import { motion } from "framer-motion";
import { Button } from 'semantic-ui-react';
import {Panel} from './styles';
import SetConfigurationPanel from '../SetConfigurationPanel';
import TextField from '@material-ui/core/TextField';

import WeightField from '../WeightField';
import TrainingField from '../TrainingField';

export default ({t, loading, isActive, toggleIsActive, settings, onSettingsChange, editable}) => {

  const [editingMode, setEditingMode] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const [applyToAllSets, setApplyToAllSets] = useState(false);

  const [weight, setWeight] = useState(0);
  const [training, setTraining] = useState(0);
  const [unit, setUnit] = useState(0);
  const [setsConfiguration, setSetsConfiguration] = useState([]);

  //
  // Change edit mode
  //
  const onToggleField = () => {
    if(!editingMode) {
      setEditingMode(!editingMode)
      if(activeField == null) {
        setActiveField(0)
      }
    }
  }
  React.useEffect(() => {
    if(isActive) {
      onToggleField();
    } else {
      setTimeout(function () {
        setEditingMode(false);
        setActiveField(null);
      }, 500);
    }
  }, [isActive]);



  //
  // Settings change logic
  //
  React.useEffect(() => {
    console.log("NEW SETTINGS ARRIVED");
    console.log(settings)
    const {weight, training, unit, setsConfiguration}  = settings;
    setWeight(weight);
    setTraining(training);
    setUnit(unit);
    setSetsConfiguration(setsConfiguration);
  }, [settings]);









  const onAddSet = () => {
    let tmp = [...setsConfiguration];
    tmp.push({
      weight: weight,
      training: training,
      unit: unit,
    })
    onSettingsChange({
      ...settings,
      training,
      weight,
      unit,
      setsConfiguration: tmp,
    });

  }


  //
  // Animation functions
  //
  const fieldVariants = {
    open: {
      background: 'rgb(0, 0, 0)',
      color: 'rgb(255, 255, 255)',
      width: '70%',
      height: '9em',
    },
    close: {
      background: 'rgb(255, 255, 255)',
      color: 'rgb(0, 0, 0)',
      width: '100%',
      height: '7em',
    },
  };
  const buttonVariants = {
    open: {
      display: 'none',
    },
    close: {
      display: 'initial',
    },
  };
  const valueFielsdVariants = {
    active: {
      fontSize: 40,
      paddingBottom: '0.2em',
    },
    inactive: {
      fontSize: 30,
      paddingBottom: '0em',
    },
  }

  console.log("weight", weight)


  return <Panel>
    <div className="label">Grundkonfiguration</div>
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
            onChange={(value) => {
              setTraining(parseInt(value))
            }}
            onUnitChange={value => setUnit(value)}
            onClose={() => {
              if( activeField === 0 ) {
                onSettingsChange({
                  ...settings,
                  training,
                  weight,
                  unit,
                });
              }
              setActiveField(null);
            }}
            open={activeField == 0}
          />
        <div className="training-unit">{unit == 0 ? 'Wdh ' : unit == 1 ? 'Sek' : 'Min'}</div>
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
          onChange={(value) => {
            console.log("WeightField", value)
            setWeight(value)
          }}
          onClose={() => {
            if( activeField === 1 ) {
              onSettingsChange({
                ...settings,
                training,
                weight,
                unit,
              });
            }
            setActiveField(null);
          }}
          open={activeField == 1}
        />
        <div className="unit">Kg</div>
      </div>
    </div>
    {editable &&
      <Button
        size='large'
        className="plus-button"
        circular
        color='black'
        icon='plus'
        onClick={() => {
          onAddSet();
        }}
        content="Satz hinzufügen"
      />
    }
  </Panel>
}
