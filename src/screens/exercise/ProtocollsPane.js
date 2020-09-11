import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import moment from "moment";
import { Tab, Button } from 'semantic-ui-react';
import ProtocollConfigurationField from './ProtocollConfigurationField';
import {StyledWorkout} from './styles';

import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

const formatNumber = (number) => (number === null || isNaN(number)) ? 0 : number.toLocaleString();

const Workout = ({t, workouts, date, onDeleteProtocoll, loading, selected, setSelected}) => {

  return (
    <StyledWorkout>
      <div className="content">
        <div className="header">{moment(new Date(date)).format("DD MMMM YYYY")}</div>
          <div className="description">
          {
            workouts && workouts.length > 0 && _.map(workouts, (workout, index) => {
              const {id, weight, repetitions, training_unit} = workout
              return (
                <div key={"workout-wrapper" + index} className={workout.self_protocolled ? "workout-wrapper self-protocoled" : "workout-wrapper trainer-protocoled"}>
                  <div key={"workout-" + index} className={selected == id ? "workout selected" : "workout"} onClick={() => {
                      setSelected(selected == id ? (null) : id)
                    }}
                  >
                    <div className="workout-number">Satz {index+1}</div>
                    <div className="workout-content">
                      <div className="workout-repetitions">{repetitions} {training_unit == 0 ? t("rep") : training_unit == 2 ? t("min") : t("sec")}</div>
                      <div className="workout-weight">{formatNumber(weight)} Kg</div>
                    </div>
                  </div>
                  {
                    selected == id &&
                    <div className="remove-button">
                      <Fab
                        size="small"
                        aria-label="save"
                        disabled={loading}
                        onClick={() => {
                          onDeleteProtocoll(workout.id)
                        }}
                      >
                        {
                          selected == id && loading ? <CircularProgress size={46} /> : <CloseIcon />
                        }
                      </Fab>
                    </div>
                  }
                </div>
              )
            })
          }
          </div>
      </div>
    </StyledWorkout>
  )
}

export default ({

  t,

  settings,
  workouts,

  onCreateProtocoll,
  createProtocollLoading,

  deleteProtocoll,
  deleteProtocollLoading,

}) => {

  const [selected, setSelected] = useState(null);

  const getNextSettings = (dummy) => {
    if( workouts && _.size(workouts) > 0 ) {
      const lastProtocollDay = Object.keys(workouts)[0];
      var isToday = moment(lastProtocollDay).isSame(moment(), 'day');;
      let referenceDay = lastProtocollDay;
      let nextProtocollIndex = 0;
      if( !isToday ) {
        referenceDay = _.size(workouts) > 1 ? Object.keys(workouts)[0] : lastProtocollDay;
        nextProtocollIndex = 0;
      } else {
        nextProtocollIndex = (workouts[lastProtocollDay].length - 1);
      }
      const nextSettings = workouts[referenceDay][nextProtocollIndex % workouts[referenceDay].length];
      return {
        weight: nextSettings.weight,
        training: nextSettings.repetitions,
        unit: nextSettings.training_unit,
      };
    } else {
      return {
        weight: 0,
        training: 12,
        unit: 0,
      }
    }
  }

  return workouts && (
    <Tab.Pane className="protocolls-pane">
      <ProtocollConfigurationField
        t={t}

        settings={ getNextSettings(workouts) }

        onCreateProtocoll={onCreateProtocoll}
        createProtocollLoading={createProtocollLoading}
      />
      <div className="workouts">
        {
          _.size(workouts) > 0 && _.map(workouts, (values, date) => <Workout
            t={t}
            key={'workout-' + date }
            workouts={values}
            date={date}
            onDeleteProtocoll={deleteProtocoll}
            loading={deleteProtocollLoading}
            selected={selected}
            setSelected={setSelected}
          />)
        }
        {
          _.size(workouts) === 0 && <div className="empty-list">Keine protokolle</div>
        }
      </div>
    </Tab.Pane>
  );

}
