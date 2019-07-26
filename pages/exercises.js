import React from "react";
import { withAuthSync } from '../lib/auth'
import ExcercisesScreen from "../src/screens/exercises"

function Excercises({memberId}) {
  return (
    <ExcercisesScreen  memberId={memberId}></ExcercisesScreen>
  );
}

export default withAuthSync(Excercises);
