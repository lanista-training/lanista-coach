import * as React from "react";
import styled from 'styled-components';
import _ from 'lodash';
import { Tab } from 'semantic-ui-react';
import moment from "moment";

const Stage = styled.div`
  padding-top: 5em!important;
  max-width: 85vw;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;
  height: 100vh;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const StyledWorkout = styled.div`
  height: calc(100% - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  .info-section{
    flex: 1;
    display: flex;
    flex-direction: row;
    .workout-description {
      flex: 1;
      margin-top: 20px;
      background: white;
      font-size: 16px;
      border-style: solid;
      border-width: 1px;
      border-radius: 3px;
      padding: 10px;
      border-color: #E6E6E6;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 22px;
      display: -webkit-box;
    }
    .workout-infos {
      flex: 1;
      display: flex;
      flex-flow: column;
      align-items: flex-end;
      margin-top: 20px;
      font-size: 16px;
      padding: 10px;
      padding-left: 20px;
      line-height: 22px;
      .creation-date {
        width: 100%;
        span {
          float: right;
        }
      }
      .creator-fullname {
        width: 100%;
        span {
          float: right;
        }
      }
      .creator-image {
        margin-right: inherit;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-size: cover;
        position: relative;
        display: block;
        float: right;
      }
    }
  }
  .exercises-section{
    flex: 4
  }
`;
const StyledTab = styled(Tab)`
  padding-top: 1em;
  height: calc( 84vh - 130px);
  .tab {
    height: calc(100% - 60px);
    overflow-y: scroll;
    padding-left: 0;
    border: 0!important;
    background: transparent;
    ::-webkit-scrollbar {
      width: 0px!important;
      background: transparent!important; /* make scrollbar transparent */
    }
    .split-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;
const StyledExercise = styled.div`
  overflow: hidden;
  width: 180px!important;
  height: 195px!important;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3) !important;
  border-radius: 3px;
  margin-left: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
  -ms-flex-flow: column;
  flex-flow: column;
  .exercise-images{
    display: flex;
    .exercise-start-image {
      width: 90px;
      height: 90px;
      background-size: cover;
      background-color: #e6e6e6;
    }
    .exercise-end-image {
      width: 90px;
      height: 90px;
      background-size: cover;
      background-color: #e6e6e6;
    }
  }
  .exercise-name {
    font-size: 13px;
    font-weight: 700;
    padding: 5px;
    float: right;
    text-align: left;
    width: 100%;
    height: 70px!important;
    background: white;
  }
  .exercise-footer {
    height: 35px;
    box-shadow: 0 1px 0px 0px #fff inset;
    border-radius: 0 0 3px 3px;
    padding: 7px 8px 8px;
    border-top: 1px solid #e7e7e7;
    background-color: #f6f6f6;
    float: left;
    width: 100%;
    color: #555;
    font-size: 14px;
    line-height: 22px;
    display: block;
    .exercise-sets {
      float: left;
      span {
        font-weight: 700;
      }
    }
    .exercise-repetitions {
      float: right;
      span {
        font-weight: 700;
      }
    }
  }
`;

class Workout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  render() {
    const {workout, t, onShowExercise} = this.props;
    const panes = []
    workout && workout.splits.map((split) => {
      const {exercises} = split
      panes.push({ menuItem: ( t("split") + ' ' + split.name), render: () =>
        <Tab.Pane>
          <div className="split-list">
          {
            exercises.map((execution)=>(
              <Exercise execution={execution}/>
            ))
          }
          </div>
        </Tab.Pane> })
    })
    const Exercise = ({execution}) => {
      return(
        <StyledExercise onClick={() => onShowExercise(execution.id)}>
          <div className="exercise-images">
            <div className="exercise-start-image" style={{backgroundImage: "url(" + execution.exercise.start_image + ")"}}/>
            <div className="exercise-end-image" style={{backgroundImage: "url(" + execution.exercise.end_image + ")"}}/>
          </div>
          <div className="exercise-name">{execution.exercise.name}</div>
          <div className="exercise-footer">
            <div className="exercise-sets">{t('sets')} <span>{execution.rounds}</span></div>
            <div className="exercise-repetitions">{t('repetitions')} <span>{execution.repetitions}</span></div>
          </div>
        </StyledExercise>
      )
    }

    return(
      <Stage>
      {
        workout && (<StyledWorkout>
            <div className="info-section">
              <div className="workout-description">
                {(workout.description && workout.description.length > 0 ? workout.description : t('no description available'))}
              </div>
              <div className="workout-infos">
                <div className="creation-date">{t("created at")}: <span>{moment(parseInt(workout.changed_date)).format("DD MMMM YYYY")}</span></div>
                <div className="creator-fullname">{t("from trainer")}: <span>{workout.creator_full_name}</span></div>
                <div className="creator-image" style={{backgroundImage: 'url(' + workout.creator_image + ')'}}>
                </div>
              </div>
            </div>
            <div className="exercises-section">
               <StyledTab menu={{ secondary: true, pointing: true }} panes={panes} />
            </div>
        </StyledWorkout>)
      }
      </Stage>
    );
  }
};

export default Workout;
