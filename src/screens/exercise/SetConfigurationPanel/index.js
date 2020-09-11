import React, { Component, useState } from 'react'
import {useSpring, animated} from 'react-spring'
import {StyledSetConfigurationPanel} from './styles'
import WeightButton from '../WeightButton'
import TrainingButton from '../TrainingButton'
import { Button, Checkbox } from 'semantic-ui-react'

export default ({t, training, unit, setOrder, onTrainingChange, onUnitChange, onWeightChange, onClosePanel, activeField, applyToAllSets, setApplyToAllSets}) => {
  return (
    <StyledSetConfigurationPanel>
      {activeField==0 && <TrainingButton
        setOrder={setOrder}
        onValueChange={(value, order) => onTrainingChange(value, order, applyToAllSets)}
      />}
      {
        activeField==0 && <Button.Group>
          <Button inverted active={unit==0} onClick={() => onUnitChange(0, setOrder)}>{t("rep")}</Button>
          <Button inverted active={unit==2} onClick={() => onUnitChange(2, setOrder)}>{t("min")}</Button>
          <Button inverted active={unit==1} onClick={() => onUnitChange(1, setOrder)}>{t("sec")}</Button>
        </Button.Group>
      }
      {
        activeField==1 && <TrainingButton
          setOrder={setOrder}
          onValueChange={(value, order) => onWeightChange(value, order, applyToAllSets)}
        />
      }
      {
        setOrder === undefined && setApplyToAllSets &&
        <div className="for-all-sets">
          <div className="label">Alle Sets anpassen</div>
          <Checkbox toggle checked={applyToAllSets} onChange={(value) => {
              setApplyToAllSets(!applyToAllSets)
          }}/>
        </div>
      }
      <div className="command-buttons">
        <Button size='large'
          circular
          inverted
          icon='checkmark'
          onClick={onClosePanel}
        />
      </div>
    </StyledSetConfigurationPanel>
  )
}
