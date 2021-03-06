import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import WorkoutsScreen from "../src/screens/workouts"

function Workouts({memberId}) {

  const goBack = () => Router.back()

  const goToWorkout = (workoutId) => {
    Router.push({
      pathname: '/workout',
      query: { workout: workoutId }
    });
  }

  const goToSetup = () => {
    Router.push({
      pathname: '/configuration',
    });
  }

  return (
    <WorkoutsScreen
      memberId={memberId}

      goBack={goBack}
      goToWorkout={goToWorkout}
      goToSetup={goToSetup}
    />
  );
}

Workouts.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default withAuthSync(Workouts);
