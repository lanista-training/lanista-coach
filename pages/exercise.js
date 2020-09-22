import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import ExerciseScreen from "../src/screens/exercise"

function Exercise(props) {

  const {exerciseId, memberId, planexerciseId, tab, editmode} = props;

  const goBack = () => Router.back();

  const goToExercise = (exerciseId) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        member: memberId,
      }
    });
  }

  const goToSetup = () => {
    console.log("goToSetup")
    Router.push({
      pathname: '/configuration',
    });
  }

  return (
    <ExerciseScreen
      exerciseId={exerciseId}
      memberId={memberId}
      planexerciseId={planexerciseId}
      tab={tab}
      editmode={editmode}
      goBack={goBack}
      goToExercise={goToExercise}
      goToSetup={goToSetup}
    />
  );
}

Exercise.getInitialProps = context => {
  return ({
    exerciseId: context.query.exercise,
    memberId: context.query.member,
    planexerciseId: context.query.planexercise,
    tab: context.query.tab,
    editmode: context.query.editmode,
  })
};

export default withAuthSync(Exercise);
