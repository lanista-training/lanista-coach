import * as React from "react";
import PropTypes from 'prop-types';
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

const Screen = ({
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

Screen.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  me: PropTypes.object,

  /**
   * The fist tab to be shown after mounting
  */
  tab: PropTypes.number,

  /**
   * Open the entry with this id after render
  */
  id: PropTypes.number,

  /**
   * The customer object
  */
  customer: PropTypes.object,

  /**
   * Graphql loading object
  */
  loading: PropTypes.bool,

  /**
   * Graphql error object
  */
  error: PropTypes.object,

  /**
   * Graphql error object
  */
  activeIndex: PropTypes.number,

  /**
   * Graphql error object
  */
  handleTabChange: PropTypes.func,

  /**
   * Graphql error object
  */
  onSaveFinding: PropTypes.func,

  /**
   * Graphql error object
  */
  saveFindingLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  saveFindingError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreateFinding: PropTypes.func,

  /**
   * Graphql error object
  */
  createFindingLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  createFindingError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeleteFinding: PropTypes.func,

  /**
   * Graphql error object
  */
  deleteFindingLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  deleteFindingError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreateLifestyle: PropTypes.func,

  /**
   * Graphql error object
  */
  createLifestyleLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  createLifestyleError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSaveLifestyle: PropTypes.func,

  /**
   * Graphql error object
  */
  saveLifestyleLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  saveLifestyleError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeleteLifestyle: PropTypes.func,

  /**
   * Graphql error object
  */
  deleteLifestyleLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  deleteLifestyleError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreateDrug: PropTypes.func,

  /**
   * Graphql error object
  */
  createDrugLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  createDrugError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSaveDrug: PropTypes.func,

  /**
   * Graphql error object
  */
  saveDrugLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  saveDrugError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeleteDrug: PropTypes.func,

  /**
   * Graphql error object
  */
  deleteDrugLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  deleteDrugError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreateSportActivity: PropTypes.func,

  /**
   * Graphql error object
  */
  createSportActivityLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  createSportActivityError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSaveSportActivity: PropTypes.func,

  /**
   * Graphql error object
  */
  saveSportActivityLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  saveSportActivityError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeleteSportActivity: PropTypes.func,

  /**
   * Graphql error object
  */
  deleteSportActivityLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  deleteSportActivityError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreateGoal: PropTypes.func,

  /**
   * Graphql error object
  */
  createGoalLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  createGoalError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSaveGoal: PropTypes.func,

  /**
   * Graphql error object
  */
  saveGoalLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  saveGoalError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeleteGoal: PropTypes.func,

  /**
   * Graphql error object
  */
  deleteGoalLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  deleteGoalError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreatePhysio: PropTypes.func,

  /**
   * Graphql error object
  */
  createPhysioLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  createPhysioError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSavePhysio: PropTypes.func,

  /**
   * Graphql error object
  */
  savePhysioLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  savePhysioError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeletePhysio: PropTypes.func,

  /**
   * Graphql error object
  */
  deletePhysioLoading: PropTypes.bool,

  /**
   * Graphql error object
  */
  deletePhysioError: PropTypes.object,
}


export default Screen;
