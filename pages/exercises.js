import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import ExcercisesScreen from "../src/screens/exercises"

function Excercises({editmode, workout, split, member, test}) {

  const goToExercise = (exerciseId, editmode) => {
    if( member && member > 0 ) {
      Router.push({
        pathname: '/exercise',
        query: {
          exercise: exerciseId,
          member: member,
        }
      });
    } else {
      if( editmode ) {
        Router.push({
          pathname: '/exercise',
          query: {
            exercise: exerciseId,
            editmode: editmode,
          }
        });
      } else {
        Router.push({
          pathname: '/exercise',
          query: {
            exercise: exerciseId,
          }
        });
      }

    }
  }

  const goBack = () => Router.back()

  return (
    <ExcercisesScreen
      editmode={editmode}
      workout={workout}
      split={split}
      member={member}
      test={test}

      goToExercise={goToExercise}
      goBack={goBack}

    ></ExcercisesScreen>
  );
}

Excercises.getInitialProps = context => {
  return ({
    editmode: context.query.editmode,
    workout: context.query.workout,
    split: context.query.split,
    member: context.query.member,
    test: context.query.test,
  })
};

export default withAuthSync(Excercises);
