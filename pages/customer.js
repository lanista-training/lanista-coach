import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import CustomerScreen from "../src/screens/customer"

function Customer({memberId}) {

  const goBack = () => Router.back();

  const goToAnamnese = (tab, objectId) => {
    Router.push({
      pathname: '/anamnese',
      query: {
        customer: memberId,
        tab: tab ? tab : 0,
        id: objectId,
      }
    });
  }

  const goToExercise = (exerciseId, tab) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        member: memberId,
        tab: tab ? tab : 0,
      }
    });
  }

  const goToExercises = () => {
    Router.push({
      pathname: '/exercises',
      query: {
        member: memberId,
      }
    });
  }
  const goToMeasures = () => {
    Router.push({
      pathname: '/measures',
      query: { customer: memberId }
    });
  }
  const goToWorkout = (workoutId) => {
    Router.push({
      pathname: '/workout',
      query: { workout: workoutId }
    });
  }
  const goToWorkouts = () => {
    Router.push({
      pathname: '/workouts',
      query: { customer: memberId }
    });
  }
  const goToProfile = () => {
    Router.push({
      pathname: '/profile',
      query: { member: memberId }
    });
  }

  return (
    <CustomerScreen
      memberId={memberId}

      goBack={goBack}
      goToAnamnese={goToAnamnese}
      goToExercise={goToExercise}
      goToExercises={goToExercises}
      goToMeasures={goToMeasures}
      goToWorkout={goToWorkout}
      goToWorkouts={goToWorkouts}
      goToProfile={goToProfile}
    />
  );
}

Customer.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default withAuthSync(Customer);
