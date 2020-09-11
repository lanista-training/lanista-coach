import React, { useEffect } from 'react';
import moment from 'moment';
import {
  CardsList,
  CardsListWrapper,
  Card,
} from './styles';
import {
  Button
} from 'semantic-ui-react';

import ScrollBooster from 'scrollbooster';

const Workout = ({t, key, workout, openWorkout}) => (
  <Card key={key} onClick={() => openWorkout(workout.id)}>
    <div className="workout-wrapper member-workout">
      <div className="workoutname">{workout.name}</div>
      <div className="footer">
        <div className="workoutexpiration">
          <div className={moment(parseInt(workout.expiration_date)).isBefore() ? "title expired" : "title valid"}>
            {moment(parseInt(workout.expiration_date)).isBefore() ? t("EXPIRED") : t("EXPIRATIONDATE") }
          </div>
          <div className={moment(parseInt(workout.expiration_date)).isBefore() ? "date expired" : "date valid"}>
            {isNaN(workout.expiration_date) ? '' : moment(parseInt(workout.expiration_date)).format("DD/MM/YYYY")}
          </div>
        </div>
        <div className="workoutextrainfo">{workout.days} {t("SPLITS")} / {workout.duration} {t("WEEKS")}</div>
      </div>
    </div>
  </Card>
);

const WorkoutsList = (t, plans, openWorkout, createWorkout) => {
    useEffect(() => {
      const viewport = document.querySelector('.workouts-list-viewport');
      const content = document.querySelector('.workouts-list-content');
      new ScrollBooster({
        viewport: viewport,
        content: content,
        scrollMode: 'transform',
        direction: 'horizontal',
      });
    }, []);
    const list = [];
    list.push(<Card key={"create-goal-button"} onClick={createWorkout}>
      <div className="workout-wrapper member-workout create-button">
        <div className="workoutname">{t("CREATENEWPLAN")}</div>
        <div className="target-section">
          <Button
            icon='plus'
            size='small'
          />
        </div>
      </div>
    </Card>);
    if( plans ) {
      plans.map(( workout, key ) => list.push(
        <Workout t={t} workout={workout} key={key} openWorkout={openWorkout}/>
      ));
    }
    return list;
};

export default ({
  t,
  plans,
  createWorkout,
  openWorkout,
}) => (
  <div className="workouts-list-viewport">
    <div className="workouts-list-content">
      {WorkoutsList(t, plans, openWorkout, createWorkout)}
    </div>
  </div>
)
