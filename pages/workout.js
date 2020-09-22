import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import WorkoutScreen from "../src/screens/workout"

function Workout({workoutId}) {

  const goBack = () => Router.back();

  const goToExercise = (exerciseId, memberId, planexerciseId) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        member: memberId,
        planexercise: planexerciseId
      }
    });
  }

  const goToExercises = (workoutId, split, editmode) => {
    Router.push({
      pathname: '/exercises',
      query: {
        editmode: editmode,
        workout: workoutId,
        split: split,
      }
    });
  }

  const goToCustomers = () => {
    Router.replace({
      pathname: '/customers',
      query: { workout: workoutId }
    });
  }

  const goToRoot = () => {
    Router.push({
      pathname: '/',
    });
  }

  const goToWorkouts = () => {
    Router.push({
      pathname: '/workouts'
    });
  }

  const goToSetup = () => {
    Router.push({
      pathname: '/configuration',
    });
  }

  return (
    <WorkoutScreen
      workoutId={workoutId}

      goBack={goBack}
      goToExercise={goToExercise}
      goToExercises={goToExercises}
      goToCustomers={goToCustomers}
      goToRoot={goToRoot}
      goToWorkouts={goToWorkouts}
      goToSetup={goToSetup}
    />
  );
}

Workout.getInitialProps = context => {
  return ({
    workoutId: context.query.workout
  })
};

export default withAuthSync(Workout);
