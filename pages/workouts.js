import React from "react";
import { withAuthSync } from '../lib/auth'
import WorkoutsScreen from "../src/screens/workouts"

function Workouts({memberId}) {
  return (
    <WorkoutsScreen  memberId={memberId}></WorkoutsScreen>
  );
}

Workouts.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default withAuthSync(Workouts);
