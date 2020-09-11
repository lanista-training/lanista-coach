import React from 'react';
import Members from '../../components/icons/Members';
import Exercise from '../../components/icons/Exercise';
import Plan from '../../components/icons/Plan';
import Tests from '../../components/icons/Tests';
import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';

export const getCommandsLeft = (t) => {
  return ([]);
}

export const getCommandsRight = (
  t,
  goToCustomers,
  goToExercises,
  goToWorkouts,
  goToTests,
) => {
  let commands = [{
      icon: <Members/>,
      iosname: 'customer-inactive',
      text: t("CUSTOMERS"),
      type: 'type-4',
      typex: 'Ionicons',
      name: 'people',
      onTap: () => goToCustomers()
  }, {
      icon: <Exercise/>,
      iosname: 'exercise-inactive',
      text: t("EXERCISES"),
      type: 'type-4',
      typex: 'Ionicons',
      name: 'exercises',
      onTap: () => goToExercises()
  }, {
      icon: <Plan/>,
      iosname: 'workout-inactive',
      text: t("PLANS"),
      type: 'type-4',
      typex: 'Ionicons',
      name: 'calendar',
      onTap: () => goToWorkouts()
  }, {
      icon: <Tests/>,
      iosname: 'workout-inactive',
      text: t("TESTS"),
      type: 'type-4',
      typex: 'Ionicons',
      name: 'tests',
      onTap: () => goToTests()
  }];
  return commands
}
