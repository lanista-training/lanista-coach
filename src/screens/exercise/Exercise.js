import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { Tab, Modal, Input, Dimmer, Loader, Form } from 'semantic-ui-react'
import moment from "moment"
import BodyFilter from "../../components/BodyFilter"
import Chat from "../../components/Chat"
import ReactPlayer from 'react-player'
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush} from 'recharts'
import RecommendationPanel from '../../components/RecommendationPanel'
import { EXERCISE } from "../../queries"

const Stage = styled.div`
  padding: 18vh 0 0;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin: 0 auto 30px;
  max-width: 935px;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;

const SyledExercise = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  height: 100%;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  -webkit-align-items: stretch;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
  .exercise-name {
    line-height: 1em;
    text-align: right;
    font-size: 2em;
    font-weight: 700;
  }
  .image-section {
    -webkit-flex-basis: 0;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    margin-right: 30px;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    .image-wrapper {
      border-radius: 5px;
      overflow: hidden;
      width: 23vw;
      max-width: 315px;
      min-width: 210px;
    }
    .image-top {
      height: 23vw;
      width: 23vw;
      min-height: 210px;
      min-width: 210px;
      max-width: 315px;
      max-height: 315px;
      background-size: cover;
      background-repeat: no-repeat;
      background-color: #e0e0e0;
    }
    .image-bottom {
      height: 23vw;
      width: 23vw;
      min-height: 210px;
      min-width: 210px;
      max-width: 315px;
      max-height: 315px;
      background-size: cover;
      background-repeat: no-repeat;
      background-color: #e0e0e0;
    }
  }
  .content-section {
    -webkit-flex-basis: 30px;
    -ms-flex-preferred-size: 30px;
    flex-basis: 30px;
    -webkit-box-flex: 2;
    -webkit-flex-grow: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    color: #262626;
    -webkit-flex-shrink: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    min-width: 0;
  }
  .body-image-section {
    div {
      height: 31vh;
      width: 17vw;
      max-width: 306px;
      max-height: 416px;
      float: right;
      position: fixed;
      right: 5vw;
      padding-top: 5em;
    }
  }
  .empty-list {
    font-size: 2em;
    color: #bfbfbf;
    text-align: center;
    padding-top: 15vh;
  }
`;
const StyledModal = styled(Modal)`
  width: auto!important;
  border-radius: 5px!important;
  overflow: hidden!important;
  .modal {
    width: autox!important;
    border-radius: 5pxx!important;
    overflow: hidden!important;
    div {
      width: auto!important;
    }
  }
`;
const SyledTab = styled(Tab)`
  height: 100%;
  .menu {
    flex-flow: row-reverse;
    border-bottom: none!important;
  }
  .tab {
    height: calc(100% - 54px);
    border: none!important;
    background: transparent;
    padding: 0;
  }
  .info-text {
    font-size: 1.3em;
    line-height: 1.5em;
    .info-title{
      font-weight: 700;
      font-size: 1.2em;
      line-height: 2em;
    }
  }
  .protocolls{
    text-align: right;
    height: 50vh;
    min-height: 375px;
    overflow-y: scroll;
    display: block!important;
    padding-top: 1em!important;
    padding-right: 1.5em!important;
    ::-webkit-scrollbar {
      width: 0px!important;
      background: transparent!important; /* make scrollbar transparent */
    }
    .card {
      margin-left: auto;
      background-color: white!important;
      border: 1px solid rgba(0,0,0,.0975)!important;
      box-shadow: 0 0 27px 0 #0000001f!important;
      border-radius: 5px!important;
      .content {
        padding: 0.5em 0.5em!important;
        .header {
          font-size: 1.2em!important;
        }
      }
    }
    .workout-title{
      font-weight: 700;
      font-size: 1.7em;
      padding-right: 1em;
      line-height: 2em;
    }
    .workout{
      font-size: 1.4em;
      font-weight: initial!important;
      display: flex;
      flex-flow: row-reverse;
      justify-content: flex-end;
      .workout-weight{
        width: 3em;
      }
      .workout-repetitions {
        width: 3em;
        margin-right: 1em;
      }
    }
  }
  .chat-panel{
    height: 41vh;
    min-height: 380px;
    .input {
      width: 100%;
    }
  }
`;
const NotesPanel = styled.div`
  .notes-list{
    height: calc(50vw - 130px);
    max-height: 540px;
    overflow: hidden;
    overflow-y: scroll
    ::-webkit-scrollbar {
      display: none!important;
    }
  }
  .note {
    line-height: 1.2;
    display: flex;
    margin-top: 1em!important;
    background-color: white;
    border: 1px solid rgba(0,0,0,.0975);
    border-radius: 5px;
    padding: 1em;
    .image-container {
      border-radius: 50%;
      margin-right: 1em;
      .image {
        width: 40px;
        height: 40px;
        background-color: #fafafa;
        border-radius: 50%;
        box-sizing: border-box;
        display: block;
        flex: 0 0 auto;
        overflow: hidden;
        position: relative;
        background-size: contain;
      }
    }
    .note-content {
      font-size: 1.1em;
      .note-author {
        font-weight: 700!important;
        span {
          font-weight: initial;
          color: rgba(0,0,0,.4);
          font-size: .875em;
        }
      }
      .note-text {
        margin: .25em 0 .5em;
        font-size: 1em;
        word-wrap: break-word;
        color: rgba(0,0,0,.87);
        line-height: 1.3;
      }
    }
  }
  .note-input-field {
    width: 100%!important;
  }
`;
const SettingsPanel = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  .field-wrapper {
    padding: 2em 1em;
    height: 100%;
    .field {
      height: 100%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      border-radius: 10px;
      color: white;
      font-weight: 700;
      align-items: center;
      overflow: visible;
      box-shadow: 0 0 27px 0 #0000001f!important;
      .increase {
        width: 100%;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        flex: 2;
        display: flex;
        align-items: center;
        font-size: 2.5em;
        div {
          width: 100%;
        }
        :active{
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
      }
      .reduce {
        width: 100%;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        flex: 2;
        display: flex;
        align-items: center;
        font-size: 2.5em;
        div {
          width: 100%;
        }
        :active{
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      }
      .value {
        flex: 1;
        display: flex;
        align-items: flex-end;
        font-size: 2em;
      }
      .title {
        flex: 1;
        display: flex;
        align-items: flex-start;
        font-size: 1.5em;
        margin-top: 0.2em;
      }
    }
  }
  .exercise-indications {
    flex: 1;
    padding-top: 2em;
    textarea {
      width: 100%;
      padding: .78571429em 1em;
      background: transparent;
      border: none;
      outline: 0;
      color: rgba(0,0,0,.87);
      border-radius: .28571429rem;
      -webkit-box-shadow: 0 0 0 0 transparent inset;
      box-shadow: 0 0 0 0 transparent inset;
      -webkit-transition: color .1s ease,border-color .1s ease;
      transition: color .1s ease,border-color .1s ease;
      font-size: 1em;
      line-height: 1.2857;
      resize: vertical;
      padding: .78571429em 1em;
      outline: 0;
      color: rgba(0,0,0,.87);
      border-radius: .28571429rem;
      -webkit-box-shadow: 0 0 0 0 transparent inset;
      box-shadow: 0 0 0 0 transparent inset;
      -webkit-transition: color .1s ease,border-color .1s ease;
      transition: color .1s ease,border-color .1s ease;
      font-size: 1em;
      line-height: 1.2857;
      resize: vertical;
      ::placeholder {
        color: #c7c7c7;
      }
      :focus {
        background: #fff!important;
        border: 1px solid rgba(34,36,38,.15)!important;
      }
    }
  }
  .exercise-execution-settings {
    flex: 2;
    display: flex;
  }
`;
const SyledDimmer = styled(Dimmer)`
  .loader{
    color: white!important;
  }
`;
const colors = [
  '#488f31',
  '#6b9e3c',
  '#8aac49',
  '#a9ba59',
  '#c6c96a',
  '#e3d77e',
  '#ffe692',
  '#fdcd7c',
  '#fbb36a',
  '#f8995e',
  '#f27d58',
  '#ea6158',
  '#de425b',
]

const SyledSetsField = styled.div`
  flex: 1;
  .field {
    background: rgb(217, 37, 57);
    .increase {
      :active{
        background: linear-gradient(to bottom, #960010 0%,#d92539 100%);
      }
    }
    .reduce {
      :active {
        background: linear-gradient(to bottom,#d92539 0%,#960010 100%);
      }
    }
  }
`;
const SyledWeightField = styled.div`
  flex: 1;
  .field {
    background: rgb(251, 171, 91);
    .increase {
      :active{
        background: linear-gradient(to bottom,#ff7f00 0%,#FDAB5B 100%);
      }
    }
    .reduce {
      :active {
        background: linear-gradient(to bottom,#FDAB5B 0%,#ff7f00 100%);
      }
    }
    .input {
      max-width: 8em;
      .label {
        background: rgb(251,171,91);
        color: white;
      }
    }
  }
`;
const SyledTrainingField = styled.div`
  flex: 1;
  .field {
    background: rgb(73, 202, 80);
    .increase {
      :active{
        background: linear-gradient(to bottom,#00ad09 0%,#49ca50 100%);<
      }
    }
    .reduce {
      :active {
        background: linear-gradient(to bottom,#49ca50 0%,#00ad09 100%);
      }
    }
  }
`;
const SyledTrainingUnitField = styled.div`
  flex: 1;
  .field {
    background: rgb(241, 151, 170);
  }
  .increase {
    font-size: 1.5em!important;
    font-weight: lighter;
    margin-bottom: 1em;
    :active{
      background: linear-gradient(to bottom,#f36a87 0%,#f197aa 100%);
    }
  }
  .reduce {
    font-size: 1.5em!important;
    font-weight: lighter;
    :active{
      background: linear-gradient(to bottom,#f197aa 0%,#f36a87 100%);
    }
  }
  .value {
    font-size: 2.5em!important;
  }
  .title {
    font-size: 2.5em!important;
    padding-bottom: 0.5em;
  }
`;

const SetsField = ({sets, changeSets}) => {
  return (
    <SyledSetsField>
      <div className="field-wrapper">
        <div className="field">
          <div onClick={() => changeSets('up')} className="increase">
            <div>+</div>
          </div>
          <div className="value"><div>{sets}</div></div>
          <div className="title"><div>Sätze</div></div>
          <div className="reduce" onClick={() => changeSets('down')}>
            <div>-</div>
          </div>
        </div>
      </div>
    </SyledSetsField>
  )
}
const WeightField = ({weight, changeWeight}) => {
  const [editable, setEditable] = useState(false);
  return (
    <SyledWeightField>
      <div className="field-wrapper">
        <div className="field">
          { !editable && (
            <div onClick={() => changeWeight('up')} className="increase">
              <div>+</div>
            </div>
          )}
          { editable && (
            <div className="increase">
              <div></div>
            </div>
          )}
          { !editable && (
            <div className="value" onClick={()=>setEditable(true)}><div>{weight} Kg.</div></div>
          )}
          { editable && (
            <div className="value">
              <Input
                label={{ basic: true, content: 'kg' }}
                type="number"
                labelPosition='right'
                placeholder='Gewicht'
                value={weight}
                onChange={(e) =>changeWeight(e.target.value)}
              />
          </div>
          )}
          <div className="title"><div>Gewicht</div></div>
          { !editable && (
            <div onClick={() => changeWeight('down')} className="reduce">
              <div>-</div>
            </div>
          )}
          { editable && (
            <div onClick={()=>setEditable(false)} className="reduce">
              <div>OK</div>
            </div>
          )}
        </div>
      </div>
    </SyledWeightField>
  )
}
const TrainingField = ({training, unit, changeTraining}) => {
  return (
    <SyledTrainingField>
      <div className="field-wrapper">
        <div className="field">
          <div onClick={() => changeTraining('up')} className="increase">
            <div>+</div>
          </div>
          <div className="value"><div>{training}</div></div>
          <div className="title"><div>{unit === 0 ? 'Wdh' : unit == 1 ? 'Min' : 'Sek'}</div></div>
          <div onClick={() => changeTraining('down')} className="reduce">
            <div>-</div>
          </div>
        </div>
      </div>
    </SyledTrainingField>
  )
}
const TrainingUnitField = ({unit, changeTrainingUnit}) => {
  const up = (unit + 1) % 3
  const down = unit == 0 ? 2 : ((unit - 1) % 3)
  return(
    <SyledTrainingUnitField>
      <div className="field-wrapper">
        <div className="field">
          <div onClick={() => changeTrainingUnit('up')} className="increase">
            <div>{up == 0 ? "Wdh" : up == 1 ? "Min" : "Sek"}</div>
          </div>
          <div className="title"><div>{unit === 0 ? 'Wdh' : unit == 1 ? 'Min' : 'Sek'}</div></div>
          <div onClick={() => changeTrainingUnit('down')} className="reduce">
            <div>{down == 0 ? "Wdh" : down == 1 ? "Min" : "Sek"}</div>
          </div>
        </div>
      </div>
    </SyledTrainingUnitField>
  )
}

const Workout = ({date, workouts}) => {
  return (
  <div class="ui card">
    <div className="content">
      <div className="header">{moment(new Date(date)).format("DD.MM.YYYY")}</div>
        <div className="description">
        {_.map(workouts, (workout) => (
          <div className="workout">
            <div className="workout-weight">{workout.weight} Kg.</div> x <div className="workout-repetitions">{workout.repetitions}</div>
          </div>
        ))}
        </div>
    </div>
  </div>
)}

export default ({
  exercise,
  workouts,
  notes,
  chats,
  settings,
  filterStyles,
  activeTab,
  onTabChange,
  isVideoOpen,
  onToggleVideo,
  note,
  message,
  onNoteChange,
  onMessageChange,
  loading,
  error,
  onIndicationsChange,
  onSetsChange,
  onWeightChange,
  onTrainingChange,
  onUnitChange,
} ) => {
  React.useEffect(() => {
    if( !loading ) {
      el.current && el.current && el.current.scrollIntoView({ block: 'end' });
    }
  }, [loading]);
  const panes = [
    { menuItem: 'Info', id: 'info', render: () =>
      <Tab.Pane>
        <div className="info-text">
          <div className="info-title">Ausführung</div>
          {
            exercise.coaching_notes && exercise.coaching_notes.map((note) => (
              <div>{note}</div>
            ))
          }
        </div>
        <div className="info-text" style={{marginTop: "2em"}}>
          <div className="info-title">Mögliche Fehler</div>
          {
            exercise.mistakes && exercise.mistakes.map((note) => (
              <div>{note}</div>
            ))
          }
        </div>
        <div className="body-image-section" style={{marginTop: "4em"}}>
          <BodyFilter
            filterStyles={filterStyles}
            onBodyPartSelection={() => {}}
          />
        </div>
      </Tab.Pane>
    }
  ]
  if( exercise && exercise.settings ) {
      panes.push({ menuItem: 'Einstellungen', id: 'settings', render: () =>
        <Tab.Pane>
          <SettingsPanel>
            <div className="exercise-indications">
              <textarea
                placeholder="Deine Anweisungen für den Kunde"
                rows="4"
                value={settings.indications}
                onChange={onIndicationsChange}
              >
                {settings.indications}
              </textarea>
            </div>
            <div className="exercise-execution-settings">
              <SetsField sets={settings.sets} changeSets={onSetsChange}/>
              <WeightField weight={settings.weight} changeWeight={onWeightChange}/>
              <TrainingField training={settings.training} unit={settings.unit} changeTraining={onTrainingChange}/>
              <TrainingUnitField unit={settings.unit} changeTrainingUnit={onUnitChange}/>
            </div>
          </SettingsPanel>
        </Tab.Pane>
      })
  }
  if( notes ) {
    panes.push({ menuItem: 'Notizen', id: 'notes', render: () =>
      <Tab.Pane>
        <NotesPanel>
          <div className="notes-list">
            <div ref={el} style={{paddingBottom: '1em'}}>
            {
              !loading && notes && notes.length > 0 && notes.map(note => (
                <div className='note'>
                  <div className='image-container'>
                    <div className="image" style={{backgroundImage: 'url("' + note.creator.photoUrl + '")'}}/>
                  </div>
                  <div className='note-content'>
                    <div className='note-author'>{note.creator.first_name} {note.creator.last_name} <span>{moment(parseInt(note.note_date)).format('DD.MM.YYYY hh:mm')}</span></div>
                    <div className='note-text'>{note.text}</div>
                  </div>
                </div>
              ))
            }
            </div>
          {
            !loading && notes && notes.length === 0 && (
              <div className="empty-list">Keine Notitzen</div>
            )
          }
          { loading && (
            <SyledDimmer active inverted>
              <Loader />
            </SyledDimmer>
          )}
          </div>
          <Input
            className="note-input-field"
            placeholder='neue Kommentar hier eingeben'
            value={note}
            onChange={onNoteChange}
          />
        </NotesPanel>
      </Tab.Pane>
    })
  }
  if( chats ) {
    panes.push({ menuItem: 'Chats', id: 'chats', render: () =>
      <Tab.Pane>
        {exercise.member && (
          <div className="chat-panel">
            <Chat
              member={exercise.member}
              closePanel={() => console.log("CLOSE CHAT PANEL")}
              visible={true}
              data={exercise && exercise.chats ? exercise.chats : []}
              loading={loading}
              error={error}
              hideHeader={true}
              hideExercises={true}
              hideInputField={false}
              onMessageChange={onMessageChange}
              message={message}
            />
          </div>
        )}
      </Tab.Pane>
    })
  }
  if( workouts ) {
    const bars = []
    const data = _.reverse(_.map(workouts, (workout, day) => {
      let tmp = {name: moment(new Date(day)).format('DD/MM/YYYY')}
      workout.map( (workout, index) => {
        tmp["Wdh-" + (index+1)] = workout.weight * workout.repetitions
        if(bars.length <= index) {
          bars.push(<Bar dataKey={"Wdh-" + (index+1)} stackId="a" fill={colors[index]} />)
        }
      })
      return tmp
    }))
    const CustomTooltip = ({ active, payload, label }) => {
      // find the record
      const workout = _.find(workouts, ((record, index) => index == moment(label, 'DD/MM/YYYY').format('YYYY-MM-DD')))
      if (active && workout) {
        const records = _.map(workout, (record, index) =>
          (
            <p>Wdh. {index+1}: {record.repetitions} X {record.weight}Kg.</p>
          )
        )
        return (
          <div className="custom-tooltip" style={{background: 'rgba(255, 255, 255, 0.9)', padding: "0.5em", borderRadius: '5px'}}>
            <p className="label">{`${label}`}</p>
            {records}
          </div>
        );
      }
      return null;
    };
    panes.push({ menuItem: 'Grafik', id: 'chart', render: () =>
      <Tab.Pane>
      {
        _.size(workouts) > 0 && (
          <div style={{ width: '100%', height: '41vh', minHeight: 380, marginTop: '3em' }}>
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
        _.size(workouts) === 0 && <div className="empty-list">Keine Graphik</div>
      }
      </Tab.Pane>
    })
  }
  if( workouts ) {
    panes.push({ menuItem: 'Protokolle', id: 'protocolls', render: () =>
      <Tab.Pane>
        <div className="ui cards protocolls">
        {
          _.size(workouts) > 0 && _.map(workouts, (values, date) => <Workout date={date} workouts={values}/>)
        }
        {
          _.size(workouts) === 0 && <div className="empty-list">Keine protokolle</div>
        }
        </div>
      </Tab.Pane>
    })
  }
  panes.reverse()
  const el = useRef(null);
  return(
    <Stage>
      <SyledExercise>
        <div className="image-section">
          <div className="image-wrapper">
            <div className="image-top" style={{backgroundImage: 'url(' + exercise.start_image +')'}}/>
            <div className="image-bottom" style={{backgroundImage: 'url(' + exercise.end_image +')'}}/>
          </div>
        </div>
        <div className="content-section">
          <SyledTab
            menu={{ color: 'green', secondary: true, pointing: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, tab) => {
              onTabChange(e, tab)
              setTimeout(function(){
                  el.current && el.current && el.current.scrollIntoView({ block: 'end' })
              }, 100);
            }}
            activeIndex={activeTab}
          />
        </div>
      </SyledExercise>
      <RecommendationPanel exerciseId={exercise.id}/>
      <StyledModal
        open={isVideoOpen}
        onClose={onToggleVideo}
        size="small"
        dimmer='inverted'
      >
        <ReactPlayer
          url={exercise.videoUrl}
          playing
          controls
        />
      </StyledModal>
    </Stage>
  )
};
