import React, { useState, useRef } from 'react';
import {TargetEditor} from "./styles";
import {Icon, Step, Checkbox, Button} from 'semantic-ui-react';
import {useTransition, animated} from 'react-spring';
import moment from "moment";
import Slider from "react-slick";
import {getTargetName, getTargetUnit, getTargetInputField, getCurrentValue} from "../util";

export default ({goal, setScreen, member, saveTarget}) => {
  const [step, setStep] = useState(1)
  const [target, setTarget] = useState(null)
  const [targetValue, setTargetValue] = useState(0)
  const [initialValue, setInitialValue] = useState(0)
  const [targetUnit, setTargetUnit] = useState(null)
  const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      swipe: false,
    };
  const inputEl = useRef(null)

  const selectTarget = (selection) => {
    setTarget(selection)
    const {weight} = member
    switch (selection) {
      case 1:
        setTargetValue(weight)
        setInitialValue(weight)
        setTargetUnit(1)
        break;
      case 2:
        setTargetValue()
        setTargetUnit(1)
        break;
      case 3:
        setTargetValue()
        setTargetUnit(1)
        break;
      case 4:
        setTargetValue()
        setTargetUnit(1)
        break;
      case 5:
        setTargetValue()
        setTargetUnit(1)
        break;
      case 6:
        setTargetValue()
        setTargetUnit(1)
        break;
      default:
        setTargetValue(0)
        break;
    }
    setStep(step + 1)
    inputEl.current.slickNext()
  }
  const previousStep = () => {
    setStep(step - 1)
    inputEl.current.slickPrev()
  }
  const saveValues = () => {
    setStep(step + 1)
    setTarget(selection)
    inputEl.current.slickNext()
  }

  const confirmTarget = () => {
    setStep(step + 1)
    inputEl.current.slickNext()
  }

  const synchronizeTarget = () => {
    console.log("SAVING TARGET...")
    saveTarget({variables: {
      goalId: goal.id,
      type: target,
      unit: targetUnit,
      targetValue: parseFloat(targetValue),
      initialValue: parseFloat(initialValue),
    }})
    setScreen("content")
  }

  return (
    <TargetEditor>
      <Step.Group size='mini'>
        <Step active={step == 1}>
          <Icon name='target' />
          <Step.Content>
            <Step.Title>Ziel</Step.Title>
            <Step.Description>Wähle das Ziel aus</Step.Description>
          </Step.Content>
        </Step>
        <Step active={step == 2}>
          <Icon name='payment' />
          <Step.Content>
            <Step.Title>Billing</Step.Title>
            <Step.Description>Enter billing information</Step.Description>
          </Step.Content>
        </Step>
        <Step active={step == 3}>
          <Icon name='info' />
          <Step.Content>
            <Step.Title>Confirm Order</Step.Title>
            <Step.Description>Verify order details</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
      <div className="editor-content">
        <Slider {...settings} ref={inputEl}>
          <div>
            <Button onClick={() => selectTarget(1)}>{getTargetName(1)}</Button>
            <Button onClick={() => selectTarget(2)}>{getTargetName(2)}</Button>
            <Button onClick={() => selectTarget(3)}>{getTargetName(3)}</Button>
            <Button onClick={() => selectTarget(4)}>{getTargetName(4)}</Button>
            <Button onClick={() => selectTarget(5)}>{getTargetName(5)}</Button>
            <Button onClick={() => selectTarget(6)}>{getTargetName(6)}</Button>
            <Button onClick={() => selectTarget()}>{getTargetName()}</Button>
          </div>
          <div>
            {getTargetName(target)}
            <div className="target-setting">
              <div className="target-setting-block">
                <div className="target-setting-value">{getCurrentValue(member, target)}</div>
                <div className="target-setting-header">Anfangswert</div>
              </div>
              <div className="target-setting-block">
                <div className="target-setting-value">{getTargetInputField(target, setTargetValue)}</div>
                <div className="target-setting-header">Zielwert</div>
              </div>
            </div>
          </div>
          <div>
            {getTargetName(target)}
            <div className="target-setting">
              <div className="target-setting-block">
                <div className="target-setting-value">{getCurrentValue(member, target)}</div>
                <div className="target-setting-header">Aktueller Wert</div>
              </div>
              <div className="target-setting-block">
                <div className="target-setting-value">{targetValue}</div>
                <div className="target-setting-header">Zielwert</div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <div className="editor-navigation">
        {step > 1 && <Button icon basic onClick={()=>previousStep()}><Icon name='back' />Zurück</Button>}
        {
          step == 1
          ?
            <Button icon basic onClick={()=>setScreen("content")}><Icon name='back' />Schliessen</Button>
          :
          step == 2
          ?
            <Button icon basic onClick={confirmTarget}><Icon name='back' />Next</Button>
          :
            <Button icon basic onClick={synchronizeTarget}><Icon name='back' />Speichern</Button>
        }
      </div>
    </TargetEditor>
  )
}
