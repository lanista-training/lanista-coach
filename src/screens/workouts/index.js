import React, { Component } from 'react';
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import styled from 'styled-components';
import moment from "moment";
//import Router from 'next/router';
import { withApollo } from '../../lib/apollo'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Scene from "../../components/Scene";
import Workouts from './Workouts';
import WorkoutsHeader from "../../components/WorkoutsHeader";
import { MEMBER, WORKOUTS, PLUGINS } from "../../queries";
import { CLONEPLAN, CREATEPLAN } from "../../mutations";
import { Search } from 'semantic-ui-react';

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';
import Plus from '../../components/icons/Plus';
import SearchIcon from '../../components/icons/Search';
import List from '../../components/icons/List';

import CreatePlanDialogPanel from '../customer/CreatePlanDialogPanel';

const Centered  = styled.div`
  padding-top: 26vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: column;
`;

const Counter  = styled.div`
  width: 7em;
  display: flex;
  align-self: center;
  font-weight: 900;
  font-size: 20px;
  justify-content: flex-end;
  margin-right: 1em;
  span {
    margin-right: 5px;
    font-weight: 100;
  }
`;

const WorkoutsPanel = ({memberId, goBack, goToWorkout, goToSetup}) => {
  const {t} = useTranslate("workouts");
  //
  // Create Plan dialog
  //
  const [dialogCreatePlanOpen, setDialogCreatePlanOpen] = React.useState(false);
  const handleOpenDialogCreatePlan = () => {setDialogCreatePlanOpen(true)}
  const handleCloseDialogCreatePlan = () => {setDialogCreatePlanOpen(false)}

  const [filter, setFilter] = React.useState('');

  const { loading: workoutsLoading, error: workoutsError, data: workoutsData, networkStatus } = useQuery(WORKOUTS, {
    variables: {
      filter: filter,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const {workouts} = workoutsData ? workoutsData : [];

  const { loading: pluginsLoading, error: pluginsError, data: pluginsData } = useQuery(PLUGINS);
  const {plugins} = pluginsData ? pluginsData: {plugins:[]};

  const [clonePlan, { loading: clonePlanLoading, error: clonePlanError }] = useMutation(
    CLONEPLAN,
    {
      update(cache,  { data: {clonePlan} }) {
        goBack();
      }
    }
  );

  const [createPlan, { loading: createPlanLoading, error: createPlanError }] = useMutation(
    CREATEPLAN,
    {
      update(cache,  { data: {createPlan} }) {
        if( createPlan.id > 0 ) {
          goToWorkout(createPlan.id);
          /*
          Router.push({
            pathname: '/workout',
            query: { workout: createPlan.id }
          });
          */
        }
      }
    }
  );

  React.useEffect(() => {
    const planId = localStorage.getItem('openplan');
    if( planId && planId > 0 ) {
      localStorage.removeItem('openplan');
      goToWorkout(planId);
      /*
      Router.push({
        pathname: '/workout',
        query: { workout: planId }
      });
      */
    }
  }, []);

  const onTextSearch = (text) => {
    setFilter('text:' + text);
  }

  const openWorkout = (workoutId) => {
    if( memberId && memberId > 0 ) {
      clonePlan({
        variables: {
          memberId: memberId,
          planId: workoutId,
        }
      });
    } else {
      goToWorkout(workoutId);
      /*
      Router.push({
        pathname: '/workout',
        query: { workout: workoutId }
      });
      */
    }

  }

  const curateTextSearchResults = (results) => {
    return results.map((workout) => ({
      title: workout.name,
      description: workout.description
    }))
  }

  const getCommandsRight = () => {
    return ([{
          icon: <Plus/>,
          text: t('new plan'),
          type: 'type-1',
          typex: 'Ionicons',
          name: 'new user',
          onTap: () => {
            console.log("Create Workout");
            handleOpenDialogCreatePlan();
          }
      }]);
  }

  const getCommandsLeft = () => {
    return ([{
        icon: <Back/>,
        iosname: 'tools-inactive',
        text: '',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'back',
        style: {color: '#34acfb'},
        onTap: () => {
          goBack();
        }
    }]);
  }

  return (
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight()}
      t={t}
      headerChildren={
        <>
          <WorkoutsHeader
            t={t}
            setFilter={setFilter}
            onTextSearchChange={(event) => onTextSearch(event.target.value)}
            filter={filter}
            plugins={(plugins) ? plugins : [] }
          />
          <Counter className="counter"><span>{t("plans")}</span> {workouts && workouts.length}</Counter>
       </>
      }
      networkStatus={networkStatus}
      goToSetup={goToSetup}
    >
    <Workouts
      workouts={workouts ? workouts : []}
      t={t}
      openWorkout={openWorkout}
      clonePlanLoading={clonePlanLoading}
    />

    <CreatePlanDialogPanel
      t={t}

      open={dialogCreatePlanOpen}

      handleCloseDialogCreatePlan={handleCloseDialogCreatePlan}

      creatingPlan={createPlanLoading}
      createPlan={createPlan}

      memberId={memberId}
    />

    </Scene>
  )
}

export default withApollo(WorkoutsPanel);
