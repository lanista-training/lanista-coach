import * as React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Stage, ListWrapper, StyledWorkout} from './styles';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";

const Workout = ({workout, onWorkoutSelection, onSelection, clonePlanLoading}) => {
  const [loading, setLoading] = React.useState(false);
  console.log("Workout", workout)
  return (
    <StyledWorkout
      public={workout.public}
      plugin={workout.plugin}
      studio={workout.studio}
      lanista={workout.lanista}
      onClick={clonePlanLoading ? () => {} : () => {
        setLoading(true);
        onWorkoutSelection();
      }}
    >
      {
        loading &&
        <CircularProgress />
      }
      {
        !loading &&
        <>
          <div className="workout-list-content">
            <div className="workout-list-titel">{workout.name}</div>
            <div className="workout-list-description">{workout.description}</div>
          </div>
          <div className="workout-list-footer">
            <div className="workout-list-duration-icon"/>
            <div className="workout-list-duration">{workout.duration} Weeks</div>
            <div className="workout-list-privacy-icon" public={workout.public}/>
          </div>
        </>
      }

    </StyledWorkout>
  )
}

const Workouts = ({workouts, openWorkout, clonePlanLoading, loading}) => {
  return(
    <Stage>
      <ListWrapper className='hide-scrollbar'>
      {workouts && workouts.map((workout) =>
        <Workout
          key={"workout-" + workout.id}
          workout={workout}
          onWorkoutSelection={() => openWorkout(workout.id)}
          clonePlanLoading={clonePlanLoading}
        />
      )}
      </ListWrapper>
    </Stage>
  );
};

Workouts.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Function to translate content
  */
  workouts: PropTypes.array,

  /**
   * Function to translate content
  */
  openWorkout: PropTypes.func,

  /**
   * Function to translate content
  */
  clonePlanLoading: PropTypes.bool,
};

export default Workouts;
