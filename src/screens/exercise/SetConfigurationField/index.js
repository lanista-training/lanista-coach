import React, { Component, useState } from 'react';
import { motion } from "framer-motion";
import {StyledField} from './styles';
import SetConfigurationPanel from '../SetConfigurationPanel';
import { Progress } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';

import Button from '../../../components/LanistaButton';

import WeightField from '../WeightField';
import TrainingField from '../TrainingField';

export default ({
  t,
  settings,
  setOrder,
  onSettingsChange,
  basicWeight,
  basicTraining,
  selectedItem,
  setSelectedItem,
  editable,
  onSyncSettings,
}) => {

  const [editingMode, setEditingMode] = useState(false);
  const [activeField, setActiveField] = useState(null);


  const [weight, setWeight] = useState(0);
  const [training, setTraining] = useState(0);
  const [unit, setUnit] = useState(0);

  React.useEffect(() => {
    const {setsConfiguration}  = settings;
    const {weight, training, unit} = setsConfiguration[setOrder];
    setWeight(weight);
    setTraining(training);
    setUnit(unit);
  }, [settings]);


  const onToggleField = () => {
    if(!editingMode && editable) {
      setEditingMode(!editingMode)
      if(activeField == null) {
        setActiveField(0)
      }
    }
  }

  React.useEffect(() => {
    if( selectedItem == setOrder ) {
      //onToggleField();
      setEditingMode(true);
    } else {
      if(editingMode) {
        setEditingMode(false);
        setActiveField(null);
      }
    }
  }, [selectedItem])

  const onTrainingChange = (value) => {
    if( isNaN(value) ) {
      if( value == 'up') {
        setTraining(training + 1);
      } else {
        setTraining(training > 0 ? training - 1 : 0);
      }
    } else {
      setTraining(value);
    }
  }

  const onUnitChange = (value) => {
    setUnit(value);
  }

  const onWeightChange = (value, applyToAllSets) => {
    if( isNaN(value) ) {
      if( value == 'up') {
        setWeight(parseFloat(weight) + 1);
      } else {
        setWeight( parseFloat(weight) > 0 ?  parseFloat(weight)  - 1 : 0 );
      }
    } else {
      setWeight(parseFloat(value));
    }
  }

  const onRemoveSet = () => {
    const {setsConfiguration} = settings;
    setsConfiguration.splice(setOrder, 1);
    onSettingsChange({
      ...settings,
      setsConfiguration: [...setsConfiguration],
    });
    onSyncSettings();
  }

  const saveChanges = () => {
    const {setsConfiguration} = settings;
    setsConfiguration[setOrder] = {
      training: parseInt(training),
      unit: parseInt(unit),
      weight: parseFloat(weight),
      __typename: "ExerciseSet"
    }
    onSettingsChange({
      ...settings,
      setsConfiguration: [...setsConfiguration],
    });
    onSyncSettings();
  }

  //
  // Animations
  //
  const fieldVariants = {
    open: {
      width: '65%',
      height: '9.5em',
    },
    close: {
      width: '100%',
      height: '4em',
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
  const valueFielsTopdVariants = {
    active: {
      fontSize: 30,
      paddingBottom: 12,
    },
    inactive: {
      fontSize: 20,
      paddingBottom: 0,
    },
  }
  const valueFielsdBottomVariants = {
    active: {
      fontSize: 30,
      paddingTop: 12,
    },
    inactive: {
      fontSize: 20,
      paddingTop: 0,
    },
  }

  const weightVarianz = Math.ceil((weight-basicWeight)/basicWeight*100);
  const trainingVarianz = Math.ceil((training-basicTraining)/basicTraining*100);

  return <StyledField animate={editingMode ? "open" : "close"} variants={fieldVariants} onClick={ () => {
      activeField === null && selectedItem === null && setSelectedItem( setOrder );
  }}>
    <div className={editingMode ? "set-configuration editing" : "set-configuration"} >
      <div className="label">{t("set")} {setOrder + 1}</div>
      <div className="values-section">

        <div
          className={ activeField == 0 ? "set-training active" : "set-training" }
          onClick={() => {
            editingMode && selectedItem == setOrder && setActiveField(0)
          }}
        >
          <TrainingField
            variant="outlined"
            value={training}
            unit={unit}
            onChange={value => setTraining(value)}
            onUnitChange={value => setUnit(value)}
            position={"startBottomLeft"}
            onClose={(event) => {
              activeField !== null && saveChanges();
              setActiveField( null );
            }}
            open={activeField == 0}
          />
        <div className="unit">{unit == 0 ? t('rep') : unit == 1 ? t('sec') : t('min')}</div>
        </div>

        <div
          className={ activeField == 1 ? "set-weight active" : "set-weight" }
          onClick={() => {
            editingMode && selectedItem == setOrder && setActiveField(1);
          }}
        >
          <WeightField
            variant="outlined"
            value={weight}
            onChange={value => setWeight(value)}
            position={"startBottomLeft"}
            onClose={() => {
              activeField !== null && saveChanges();
              setActiveField( null );
            }}
            open={activeField == 1}
          />
          <div className="unit">Kg</div>
        </div>
      </div>

    </div>
    {
      setOrder == selectedItem && activeField == null  &&(
        <div className="buttons-section">
          <Button className="delete-button" disabled={setOrder !== selectedItem} inverted onClick={() => {
              onRemoveSet(setOrder);
              setEditingMode(false);
              setActiveField(null);
              setSelectedItem(null);
            }}
          >
            {t("delete set")}
          </Button>

          <Button className="delete-button" disabled={setOrder !== selectedItem} inverted onClick={() => {
              setSelectedItem( null );
            }}
          >
            {t("back")}
          </Button>

        </div>

      )
    }
  </StyledField>
}
