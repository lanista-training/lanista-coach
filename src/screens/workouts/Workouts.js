import * as React from "react";
import styled from 'styled-components';
import _ from 'lodash';
import moment from "moment";

const Stage = styled.div`
  padding-top: 8em;
  max-width: 85vw;
  display: block;
  margin-right: auto;
  margin-left: auto;
  height: 98vh;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const ListWrapper = styled.div`
  padding-bottom: 8em;
  width: 100%;
  height: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: wrap;
  -ms-flex-flow: wrap;
  flex-flow: wrap;
  }
`;
const StyledWorkout = styled.div`
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  position: relative;
  margin: 0 11px 22px 11px;
  background: #fff;
  width: 175px;
  height: 190px;
  overflow: hidden;
  .workout-list-content {
    height: 155px;
    overflow: hidden;
    text-align: left;
    background-color: ${props => props.studio ? "#3F51B5" : (props.public ? (props.plugin ? "#64A992" : "rgb(155, 201, 61)") : "#03a9f4")};
    .workout-list-titel {
      height: 46px;
      line-height: 16px;
      font-family: RobotoDraft, Roboto, sans-serif;
      font-size: 18px;
      color: white;
      margin: 10px;
      margin-top: 20px;
      width: 155px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .workout-list-description {
      font-size: 13px;
      padding-left: 10px;
      padding-right: 10px;
      height: 50px;
      overflow: hidden;
      display: inline-table;
      color: white;
    }
  }
  .workout-list-footer {
    height: 35px;
    border-radius: 0 0 2px 2px;
    padding: 7px 8px 8px;
    border-top: 1px solid #e7e7e7;
    position: relative;
    overflow: hidden;
    background-color: #f2f2f2;
    .workout-list-duration-icon {
      color: #999;
      float: left;
      ::before {
        font-family: Lanista;
        content: "\\e90f";
        font-size: 1.4em;
      }
    }
    .workout-list-duration {
      font-family: RobotoDraft, Roboto, sans-serif;
      color: #848484;
      padding-left: 5px;
      font-size: 16px;
      float: left;
      letter-spacing: -1px;
    }
    .workout-list-privacy-icon {
      float: right;
      ::before {
        font-family: Lanista;
        content: "${props => (props.public ? "\\e911" : "\\e910")}";
        font-size: 1.4em;
        color: ${props => (props.public ? "#F44336" : "#00C853")};
      }
    }
  }
`;

const Workout = ({workout, onWorkoutSelection}) => (
  <StyledWorkout
    public={workout.public}
    plugin={workout.plugin}
    studio={workout.studio}
    onClick={onWorkoutSelection}
  >
    <div className="workout-list-content">
      <div className="workout-list-titel">{workout.name}</div>
      <div className="workout-list-description">{workout.description}</div>
    </div>
    <div className="workout-list-footer">
      <div className="workout-list-duration-icon"/>
      <div className="workout-list-duration">{workout.duration} Weeks</div>
      <div className="workout-list-privacy-icon" public={workout.public}/>
    </div>
  </StyledWorkout>
)

class Workouts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  render() {
    const {workouts, openWorkout} = this.props;
    return(
      <Stage>
        <ListWrapper>
        {workouts && workouts.map((workout) =>
          <Workout workout={workout} onWorkoutSelection={() => openWorkout(workout.id)}/>
        )}
        </ListWrapper>
      </Stage>
    );
  }
};

export default Workouts;
