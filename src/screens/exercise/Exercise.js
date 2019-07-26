import * as React from "react"
import styled from 'styled-components'
import _ from 'lodash'
import { Tab } from 'semantic-ui-react'
import moment from "moment"

const Stage = styled.div`
  padding: 8em 20px 0;
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
  height: calc(100vh - 60px);
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
    .image-top {
      height: 23vw;
      background-size: cover;
      background-repeat: no-repeat;
      background-color: #e0e0e0;
    }
    .image-bottom {
      height: 23vw;
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
`;
const SyledTab = styled(Tab)`
  .menu {
    flex-flow: row-reverse;
    border-bottom: none!important;
  }
  .tab {
    border: none!important;
    background: transparent;
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
`;

const Workout = ({date, workouts}) => (
  <div>
    {moment(parseInt(date)).format("DD-MM-YYYY")}
    {_.map(workouts, (workout) => (
      <div className="workout">
        {workout.weight} Kg. x {workout.repetitions}
      </div>
    ))}
  </div>
)
const StyledWorkout = styled(Workout)`
  width: 100%;
`;

class Exercise extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  render() {
    const {exercise, workouts} = this.props;
    const panes = [
      { menuItem: 'Info', render: () =>
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
        </Tab.Pane>
      }
    ]
    console.log("workouts")
    console.log(workouts)
    if( workouts ) {
      panes.push({ menuItem: 'Protokolle', render: () =>
        <Tab.Pane>
          <div className="info-text">
            {
              _.map(workouts, (values, date) => <StyledWorkout date={date} workouts={values}/>)
            }
          </div>
        </Tab.Pane>
      })
    }
    panes.reverse()
    return(
      <Stage>
        <SyledExercise>
          <div className="image-section">
            <div className="image-top" style={{backgroundImage: 'url(' + exercise.start_image +')'}}/>
            <div className="image-bottom" style={{backgroundImage: 'url(' + exercise.end_image +')'}}/>
          </div>
          <div className="content-section">
            <SyledTab  menu={{ color: 'green', secondary: true, pointing: true }} menuPosition='right' panes={panes} />
          </div>
        </SyledExercise>
      </Stage>
    );
  }
};

export default Exercise;
