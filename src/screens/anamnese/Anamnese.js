import * as React from "react";
import styled from 'styled-components';
import _ from 'lodash';
import { Grid, Tab, Icon, Statistic, List, Image } from 'semantic-ui-react';
import moment from "moment";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {Stage, StyledTab} from './styles';
import Lifestyle from './Lifestyle';
import LifestylePane from './LifestylePane';
import FindingsPane from './FindingsPane';
import DrugsPane from './DrugsPane';
import GoalsPane from './GoalsPane';
import SportActivitiesPane from './SportActivitiesPane';
import PhysiosPane from './PhysiosPane';

export default ({
  me,

  tab,
  id,

  customer,
  loading,
  error,

  t,
  activeIndex,
  handleTabChange,

  onSaveFinding,
  saveFindingLoading,
  saveFindingError,

  onCreateFinding,
  createFindingLoading,
  createFindingError,

  onDeleteFinding,
  deleteFindingLoading,
  deleteFindingError,

  onCreateLifestyle,
  createLifestyleLoading,
  createLifestyleError,

  onSaveLifestyle,
  saveLifestyleLoading,
  saveLifestyleError,

  onDeleteLifestyle,
  deleteLifestyleLoading,
  deleteLifestyleError,

  onCreateDrug,
  createDrugLoading,
  createDrugError,

  onSaveDrug,
  saveDrugLoading,
  saveDrugError,

  onDeleteDrug,
  deleteDrugLoading,
  deleteDrugError,

  onCreateSportActivity,
  createSportActivityLoading,
  createSportActivityError,

  onSaveSportActivity,
  saveSportActivityLoading,
  saveSportActivityError,

  onDeleteSportActivity,
  deleteSportActivityLoading,
  deleteSportActivityError,

  onCreateGoal,
  createGoalLoading,
  createGoalError,

  onSaveGoal,
  saveGoalLoading,
  saveGoalError,

  onDeleteGoal,
  deleteGoalLoading,
  deleteGoalError,

  onCreatePhysio,
  createPhysioLoading,
  createPhysioError,

  onSavePhysio,
  savePhysioLoading,
  savePhysioError,

  onDeletePhysio,
  deletePhysioLoading,
  deletePhysioError,
}) => {

  const {goals, drugs, sport_activities, lifestyles, physios, findings} = customer;
  const [openFirst, setOpenFirst] = React.useState(id);

  React.useEffect(() => {
    if( activeIndex != tab && openFirst ) {
      setOpenFirst(undefined)
    }
  }, [activeIndex])

  const panes = [
    { menuItem: { key: 'injuries',  content: t('injuries') }, render: () =>
      <FindingsPane
        me={me}

        id={tab == 0 ? openFirst : undefined}

        t={t}
        findings={findings}

        onSaveFinding={onSaveFinding}
        saveFindingLoading={saveFindingLoading}
        saveFindingError={saveFindingError}

        onCreateFinding={onCreateFinding}
        createFindingLoading={createFindingLoading}
        createFindingError={createFindingError}

        onDeleteFinding={onDeleteFinding}
        deleteFindingLoading={deleteFindingLoading}
        deleteFindingError={deleteFindingError}
      />
    },
    { menuItem: { key: 'ailment',  content: t('ailment') }, render: () =>
      <LifestylePane
        t={t}

        id={tab == 1 ? openFirst : undefined}

        lifestyles={lifestyles}
        loading={loading}

        onCreateLifestyle={onCreateLifestyle}
        createLifestyleLoading={createLifestyleLoading}
        createLifestyleError={createLifestyleError}

        onSaveLifestyle={onSaveLifestyle}
        saveLifestyleLoading={saveLifestyleLoading}
        saveLifestyleError={saveLifestyleError}

        onDeleteLifestyle={onDeleteLifestyle}
        deleteLifestyleLoading={deleteLifestyleLoading}
        deleteLifestyleError={deleteLifestyleError}
      />
    },
    { menuItem: { key: 'drugs',  content: t('drugs') }, render: () =>
      <DrugsPane
        t={t}

        id={tab == 2 ? openFirst : undefined}

        drugs={drugs}
        loading={loading}

        onCreate={onCreateDrug}
        createLoading={createDrugLoading}
        createError={createDrugError}

        onSave={onSaveDrug}
        saveLoading={saveDrugLoading}
        saveError={saveDrugError}

        onDelete={onDeleteDrug}
        deleteLoading={deleteDrugLoading}
        deleteError={deleteDrugError}
      />
    },
    { menuItem: { key: 'sport activities',  content: t('sport activities') }, render: () =>
      <SportActivitiesPane
        t={t}

        id={tab == 3 ? openFirst : undefined}

        sportActivities={sport_activities}
        loading={loading}

        onCreate={onCreateSportActivity}
        createLoading={createSportActivityLoading}
        createError={createSportActivityError}

        onSave={onSaveSportActivity}
        saveLoading={saveSportActivityLoading}
        saveError={saveSportActivityError}

        onDelete={onDeleteSportActivity}
        deleteLoading={deleteSportActivityLoading}
        deleteError={deleteSportActivityError}
      />
    },{ menuItem: { key: 'goals',  content: t('goals') }, render: () =>
      <GoalsPane
        t={t}

        id={tab == 4 ? openFirst : undefined}

        goals={goals}
        loading={loading}

        onCreate={onCreateGoal}
        createLoading={createGoalLoading}
        createError={createGoalError}

        onSave={onSaveGoal}
        saveLoading={saveGoalLoading}
        saveError={saveGoalError}

        onDelete={onDeleteGoal}
        deleteLoading={deleteGoalLoading}
        deleteError={deleteGoalError}
      />
    },{ menuItem: { key: 'physio',  content: t('physio') }, render: () =>
      <PhysiosPane
        t={t}

        id={tab == 5 ? openFirst : undefined}

        physios={physios}
        loading={loading}

        onCreate={onCreatePhysio}
        createLoading={createPhysioLoading}
        createError={createPhysioError}

        onSave={onSavePhysio}
        saveLoading={savePhysioLoading}
        saveError={savePhysioError}

        onDelete={onDeletePhysio}
        deleteLoading={deletePhysioLoading}
        deleteError={deletePhysioError}
      />
    },
  ]

  return(
    <Stage>
      <StyledTab
        menu={{
          fluid: true,
          text: true,
        }}
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </Stage>
  );
};
