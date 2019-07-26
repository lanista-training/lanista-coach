import React from "react";
import { withAuthSync } from '../lib/auth'
import WorkoutScreen from "../src/screens/workout"

function Workout({workoutId}) {
  return (
    <WorkoutScreen  workoutId={workoutId}></WorkoutScreen>
  );
}

Workout.getInitialProps = context => {
  return ({
    workoutId: context.query.workout
  })
};

export default withAuthSync(Workout);
