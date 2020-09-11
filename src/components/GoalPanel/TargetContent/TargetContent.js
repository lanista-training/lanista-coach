import React, { useState, useRef, useEffect } from 'react';
import {Icon, Step, Checkbox, Button, Input} from 'semantic-ui-react';
import {TargetContent, TargetButton, GoalPriority, Avatar} from "./styles";
import TargetValueCard from "../TargetValueCard";
import DayPicker from 'react-day-picker';
import moment from "moment";

export default ({goal, member, setScreen, updateGoal, setTargetValue}) => {
  const [rating, setRating] = useState(0)
  const [warningFlag, setWarningFlag] = useState(0)
  const [dayPicker, showDayPicker] = useState(false)

  useEffect(() => {
    setRating(goal ? goal.rating : 0)
    setWarningFlag(goal ? goal.warning_flag : 0)
  }, [goal]);

  const handleDayClick = (selectedDay) => {
    updateGoal({ variables: {
       goalId: goal.id,
       targetDate: moment(selectedDay).format("YYYY-MM-DD"),
     }})
    showDayPicker(false)
  }

  const handleRate = (e, {rating}) => {
    console.log("NEW PRIORITY")
    console.log(rating)
  }

  return (
    goal ? <TargetContent>
      <div className="target-values" style={{display: "none"}}>
        <div className="list">
          <TargetButton className="button">
            <Button icon basic inverted onClick={()=>setScreen("target")}><Icon name='plus' /></Button>
          </TargetButton>
          {
            !goal.targets || goal.targets.length == 0 && <div className="empty-list-message">
              Kein Zielwerte eingegeben
            </div>
          }
          {
            goal.targets && goal.targets.map(target => (
              <TargetValueCard
                target={target}
                showTargetValue={ ()=>{
                  setTargetValue(target)
                  setScreen("info")
                }}
              />
            ))
          }
        </div>
      </div>
      <div className="goal-properties">
        <div className="goal-property target-date">
          <div className="property-value" onClick={() => showDayPicker(true)}>{goal.target_date ? moment(parseInt(goal.target_date)).format('DD-MM-YYYY') : 'Kein Zieldatum eingegeben'}</div>
          {dayPicker && <div className="day-picker" style={{lineHeight: "initial"}}>
            <DayPicker onDayClick={handleDayClick}/>
            <Button
              id="plus-button"
              size='large'
              circular
              color='black'
              icon='delete'
              onClick={() => {
                showDayPicker(false)
              }}
            />
          </div>}
          <div className="property-header">Zieldatum</div>
        </div>
        <div className="goal-property" style={{margin: "0em 1em"}}>
          <div className="property-value">
            <GoalPriority
              stop={6}
              initialRating={goal.rating+1}
            />
          </div>
          <div className="property-header">Priorität</div>
        </div>
        <div className="goal-property">
          <div className="property-value"><Checkbox toggle /></div>
          <div className="property-header">Wichtig</div>
        </div>
      </div>
      {
        goal && goal.creator &&
        <div className="author">
          <Avatar>
            <div style={{
              backgroundColor: '#fafafa',
              webkitBoxSizing: 'border-box',
              boxSizing: 'border-box',
              display: 'block',
              webkitBoxFlex: '0',
              WebkitFlex: '0 0 auto',
              msFlex: '0 0 auto',
              flex: '0 0 auto',
              overflow: 'hidden',
              position: 'relative',
              backgroundImage: 'url(' + goal.creator.photoUrl + ')',
              backgroundSize: 'cover',
              height: '100%',
            }}/>
          </Avatar>
          <div className="name">{goal.creator.first_name} {goal.creator.last_name}</div>
        </div>
      }
    </TargetContent>
    :
    <div>Loading</div>
  )
}
