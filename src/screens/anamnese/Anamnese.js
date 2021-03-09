import * as React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Grid, Tab, Menu, Label, Icon, Statistic, List, Image } from 'semantic-ui-react';
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

  onSaveAnamneseNote,
  saveAnamneseNoteLoading,
  saveAnamneseNoteError,

  onDeleteAnamneseNote,
  deleteAnamneseNoteLoading,
  deleteAnamneseNoteError,

  onToggleAnamneseStatus,
  toggleAnamneseStatusLoading,
  toggleAnamneseStatusError,

}) => {

  const {goals, drugs, sport_activities, lifestyles, physios, findings} = customer;
  const [openFirst, setOpenFirst] = React.useState(id);

  React.useEffect(() => {
    if( activeIndex != tab && openFirst ) {
      setOpenFirst(undefined)
    }
  }, [activeIndex])

  const panes = [
    { menuItem: (
      <Menu.Item key='injuries' className="tab-menu">
        {t('injuries')}<Label>{findings ? findings.length : 0}</Label>
      </Menu.Item>
    ), render: () =>
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

        onSaveAnamneseNote={onSaveAnamneseNote}
        saveAnamneseNoteLoading={saveAnamneseNoteLoading}
        saveAnamneseNoteError={saveAnamneseNoteError}

        onDeleteAnamneseNote={onDeleteAnamneseNote}
        deleteAnamneseNoteLoading={deleteAnamneseNoteLoading}
        deleteAnamneseNoteError={deleteAnamneseNoteError}

        onToggleAnamneseStatus={onToggleAnamneseStatus}
        toggleAnamneseStatusLoading={toggleAnamneseStatusLoading}
        toggleAnamneseStatusError={toggleAnamneseStatusError}
      />
    },
    { menuItem: (
      <Menu.Item key='ailment' className="tab-menu">
        {t('ailment')}<Label>{lifestyles ? lifestyles.length : 0}</Label>
      </Menu.Item>
    ), render: () =>
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
    { menuItem: (
      <Menu.Item key='drugs' className="tab-menu">
        {t('drugs')}<Label>{drugs ? drugs.length : 0}</Label>
      </Menu.Item>
    ), render: () =>
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
    { menuItem: (
      <Menu.Item key='sport activities' className="tab-menu">
        {t('sport activities')}<Label>{sport_activities ? sport_activities.length : 0}</Label>
      </Menu.Item>
    ), render: () =>
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
    },{ menuItem: (
      <Menu.Item key='goals' className="tab-menu">
        {t('goals')}<Label>{goals ? goals.length : 0}</Label>
      </Menu.Item>
    ), render: () =>
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
    },{ menuItem: (
      <Menu.Item key='physio' className="tab-menu">
        {t('physio')}<Label>{physios ? physios.length : 0}</Label>
      </Menu.Item>
    ), render: () =>
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
   * Function to translate content.
  */
  t: PropTypes.func,

  /**
   * Object wiht the trainer logged in.
  */
  me: PropTypes.object,

  /**
   * The fist tab to be shown after mounting.
  */
  tab: PropTypes.number,

  /**
   * Open the entry with this id after mounting. The type of the item to be shown must correspond with the tab.
  */
  id: PropTypes.number,

  /**
   * Object with all customer information
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
   * Index of the current tab oppen
  */
  activeIndex: PropTypes.number,

  /**
   * This function is called when the current tab change
  */
  handleTabChange: PropTypes.func,

  /**
   * Send a finding object to the graphql server
  */
  onSaveFinding: PropTypes.func,

  /**
   * Graphql lodading flag for the function onSaveFinding
  */
  saveFindingLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onSaveFinding
  */
  saveFindingError: PropTypes.object,

  /**
   * Create a new finding object on the graphql server
  */
  onCreateFinding: PropTypes.func,

  /**
   * Graphql lodading flag for the function onCreateFinding
  */
  createFindingLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onCreateFinding
  */
  createFindingError: PropTypes.object,

  /**
   * Delete a finding object on the graphql server
  */
  onDeleteFinding: PropTypes.func,

  /**
   * Graphql lodading flag for the function onDeleteFinding
  */
  deleteFindingLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onDeleteFinding
  */
  deleteFindingError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreateLifestyle: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onCreateLifestyle
  */
  createLifestyleLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onCreateLifestyle
  */
  createLifestyleError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSaveLifestyle: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onSaveLifestyle
  */
  saveLifestyleLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onSaveLifestyle
  */
  saveLifestyleError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeleteLifestyle: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onDeleteLifestyle
  */
  deleteLifestyleLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onDeleteLifestyle
  */
  deleteLifestyleError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreateDrug: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onCreateDrug
  */
  createDrugLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onCreateDrug
  */
  createDrugError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSaveDrug: PropTypes.func,

  /**
   * Graphql lodading flag for the function onSaveDrug
  */
  saveDrugLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onSaveDrug
  */
  saveDrugError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeleteDrug: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onDeleteDrug
  */
  deleteDrugLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onDeleteDrug
  */
  deleteDrugError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreateSportActivity: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onCreateSportActivity
  */
  createSportActivityLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onCreateSportActivity
  */
  createSportActivityError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSaveSportActivity: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onSaveSportActivity
  */
  saveSportActivityLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onSaveSportActivity
  */
  saveSportActivityError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeleteSportActivity: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onDeleteSportActivity
  */
  deleteSportActivityLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onDeleteSportActivity
  */
  deleteSportActivityError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreateGoal: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onCreateGoal
  */
  createGoalLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onCreateGoal
  */
  createGoalError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSaveGoal: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onSaveGoal
  */
  saveGoalLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onSaveGoal
  */
  saveGoalError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeleteGoal: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onDeleteGoal
  */
  deleteGoalLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onDeleteGoal
  */
  deleteGoalError: PropTypes.object,

  /**
   * Graphql error object
  */
  onCreatePhysio: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onCreatePhysio
  */
  createPhysioLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onCreatePhysio
  */
  createPhysioError: PropTypes.object,

  /**
   * Graphql error object
  */
  onSavePhysio: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onSavePhysio
  */
  savePhysioLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onSavePhysio
  */
  savePhysioError: PropTypes.object,

  /**
   * Graphql error object
  */
  onDeletePhysio: PropTypes.func,

  /**
   *  Graphql lodading flag for the function onDeletePhysio
  */
  deletePhysioLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onDeletePhysio
  */
  deletePhysioError: PropTypes.object,
}


export default Screen;
