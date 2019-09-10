import React from "react";
import { withAuthSync } from '../lib/auth'
import ExerciseScreen from "../src/screens/exercise"

function Exercise(props) {
  const {exerciseId, memberId, planexerciseId} = props
  return (
    <ExerciseScreen  exerciseId={exerciseId} memberId={memberId} planexerciseId={planexerciseId}></ExerciseScreen>
  );
}

Exercise.getInitialProps = context => {
  return ({
    exerciseId: context.query.exercise,
    memberId: context.query.member,
    planexerciseId: context.query.planexercise,
  })
};

export default withAuthSync(Exercise);
