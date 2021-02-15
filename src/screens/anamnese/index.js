import React, { useEffect, useState } from 'react';
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import Scene from "../../components/Scene";
import Anamnese from './Anamnese';
import CustomerHeader from "../../components/CustomerHeader";

import withData from "./DataProvider";

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';

const Panel = ({
  me,

  tabIndex,
  setTabIndex,

  memberId,
  tab,
  id,

  member,
  memberLoading,
  memberError,

  saveFinding,
  saveFindingLoading,
  saveFindingError,

  createFinding,
  createFindingLoading,
  createFindingError,

  deleteFinding,
  deleteFindingLoading,
  deleteFindingError,

  createLifestyle,
  createLifestyleLoading,
  createLifestyleError,

  saveLifestyle,
  saveLifestyleLoading,
  saveLifestyleError,

  deleteLifestyle,
  deleteLifestyleLoading,
  deleteLifestyleError,

  createDrug,
  createDrugLoading,
  createDrugError,

  saveDrug,
  saveDrugLoading,
  saveDrugError,

  deleteDrug,
  deleteDrugLoading,
  deleteDrugError,

  createSportActivity,
  createSportActivityLoading,
  createSportActivityError,

  saveSportActivity,
  saveSportActivityLoading,
  saveSportActivityError,

  deleteSportActivity,
  deleteSportActivityLoading,
  deleteSportActivityError,

  createGoal,
  createGoalLoading,
  createGoalError,

  saveGoal,
  saveGoalLoading,
  saveGoalError,

  deleteGoal,
  deleteGoalLoading,
  deleteGoalError,

  createPhysio,
  createPhysioLoading,
  createPhysioError,

  savePhysio,
  savePhysioLoading,
  savePhysioError,

  deletePhysio,
  deletePhysioLoading,
  deletePhysioError,

  saveAnamneseNote,
  saveAnamneseNoteLoading,
  saveAnamneseNoteError,

  deleteAnamneseNote,
  deleteAnamneseNoteLoading,
  deleteAnamneseNoteError,

  goBack,
  goToSetup,
}) => {
  const {t} = useTranslate("anamnese");


  const handleTabChange = (e, { activeIndex }) => {
    setTabIndex(activeIndex);
  }

  /*
  const goBack = () => {
    Router.back();
  }
  */

  const getCommandsRight = () => {
    return ([]);
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
        onTap: goBack
    }]);
  }

  const onSaveFinding = ({id, title, description, warningFlag, visible, rating, startDate, endDate}) => {
    saveFinding({
      variables: {
        findingId: id,
        title: title,
        description: description,
        warningFlag: warningFlag,
        visible: visible,
        rating: rating,
        startDate: startDate + '',
        endDate: endDate + '',
      }
    })
  }

  const onCreateFinding = ({title, xPosition, yPosition, description, warningFlag, visible, rating, startDate, endDate}) => {
    createFinding({
      variables: {
        memberId: memberId,
        xPosition: parseInt(xPosition),
        yPosition: parseInt(yPosition),
        title: title,
        description: description,
        warningFlag: warningFlag,
        visible: visible,
        rating: rating,
        startDate: startDate + '',
        endDate: endDate + '',
      }
    });
  }

  const onDeleteFinding = ({id}) => {
    deleteFinding({
      variables: {
        findingId: id,
      }
    })
  }

  const onCreateLifestyle = (description) => {
    createLifestyle({
      variables: {
        memberId: memberId,
        description: description,
      }
    })
  }

  const onSaveLifestyle = ({itemId, description, rating, warningFlag, startDate, endDate}) => {
    saveLifestyle({
      variables: {
        itemId: itemId,
        description: description,
        rating: rating,
        warningFlag: warningFlag,
        startDate: startDate + '',
        endDate: endDate + '',
      }
    })
  }

  const onDeleteLifestyle = (itemId) => {
    deleteLifestyle({
      variables: {
        itemId: itemId,
      }
    })
  }

  const onCreateDrug = (description) => {
    createDrug({
      variables: {
        memberId: memberId,
        description: description,
      }
    })
  }

  const onSaveDrug = ({itemId, description, rating, warningFlag, startDate, endDate}) => {
    saveDrug({
      variables: {
        itemId: itemId,
        description: description,
        rating: rating,
        warningFlag: warningFlag,
        startDate: startDate + '',
        endDate: endDate + '',
      }
    })
  }

  const onDeleteDrug = (itemId) => {
    deleteDrug({
      variables: {
        itemId: itemId,
      }
    })
  }

  const onCreateSportActivity = (description) => {
    createSportActivity({
      variables: {
        memberId: memberId,
        description: description,
      }
    })
  }

  const onSaveSportActivity = ({itemId, description, rating, warningFlag, startDate, endDate}) => {
    saveSportActivity({
      variables: {
        itemId: itemId,
        description: description,
        rating: rating,
        warningFlag: warningFlag,
        startDate: startDate + '',
        endDate: endDate + '',
      }
    })
  }

  const onDeleteSportActivity = (itemId) => {
    deleteSportActivity({
      variables: {
        itemId: itemId,
      }
    })
  }

  const onCreateGoal = (description) => {
    createGoal({
      variables: {
        memberId: memberId,
        description: description,
      }
    })
  }

  const onSaveGoal = ({itemId, description, rating, warningFlag, startDate, endDate}) => {
    saveGoal({
      variables: {
        itemId: itemId,
        description: description,
        rating: rating,
        warningFlag: warningFlag,
        startDate: startDate + '',
        endDate: endDate + '',
      }
    })
  }

  const onDeleteGoal = (itemId) => {
    deleteGoal({
      variables: {
        itemId: itemId,
      }
    })
  }

  const onCreatePhysio = (description) => {
    createPhysio({
      variables: {
        memberId: memberId,
        description: description,
      }
    })
  }

  const onSavePhysio = ({itemId, description, rating, warningFlag, startDate, endDate}) => {
    savePhysio({
      variables: {
        itemId: itemId,
        description: description,
        rating: rating,
        warningFlag: warningFlag,
        startDate: startDate + '',
        endDate: endDate + '',
      }
    })
  }

  const onDeletePhysio = (itemId) => {
    deletePhysio({
      variables: {
        itemId: itemId,
      }
    })
  }

  const onSaveAnamneseNote = (anamneseId, text, noteDate) => {
    saveAnamneseNote({
      variables: {
        anamneseId: anamneseId,
        text: text,
        noteDate: noteDate,
      }
    })
  }

  const onDeleteAnamneseNote = (noteId) => {
    console.log("onDeleteAnamneseNote")
    deleteAnamneseNote({
      variables: {
        noteId: noteId,
      }
    })
  }

  return (
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight()}
      headerChildren={
        <CustomerHeader
          userId={member ? member.id : ''}
          firstName={member ? member.first_name : ''}
          lastName={member ? member.last_name : ''}
          photoUrl= {member ? member.photoUrl : ''}
        />
      }
      t={t}
      goToSetup={goToSetup}
    >
      <Anamnese
        me={me}

        tab={tab}
        id={id}

        customer={member ? member : {}}
        loading={memberLoading}
        error={memberError}

        t={t}

        activeIndex={tabIndex}
        handleTabChange={handleTabChange}

        onSaveFinding={onSaveFinding}
        saveFindingLoading={saveFindingLoading}
        saveFindingError={saveFindingError}

        onCreateFinding={onCreateFinding}
        createFindingLoading={createFindingLoading}
        createFindingError={createFindingError}

        onDeleteFinding={onDeleteFinding}
        deleteFindingLoading={deleteFindingLoading}
        deleteFindingError={deleteFindingError}

        onCreateLifestyle={onCreateLifestyle}
        createLifestyleLoading={createLifestyleLoading}
        createLifestyleError={createLifestyleError}

        onSaveLifestyle={onSaveLifestyle}
        saveLifestyleLoading={saveLifestyleLoading}
        saveLifestyleError={saveLifestyleError}

        onDeleteLifestyle={onDeleteLifestyle}
        deleteLifestyleLoading={deleteLifestyleLoading}
        deleteLifestyleError={deleteLifestyleError}

        onCreateDrug={onCreateDrug}
        createDrugLoading={createDrugLoading}
        createDrugError={createDrugError}

        onSaveDrug={onSaveDrug}
        saveDrugLoading={saveDrugLoading}
        saveDrugError={saveDrugError}

        onDeleteDrug={onDeleteDrug}
        deleteDrugLoading={deleteDrugLoading}
        deleteDrugError={deleteDrugError}

        onCreateSportActivity={onCreateSportActivity}
        createSportActivityLoading={createSportActivityLoading}
        createSportActivityError={createSportActivityError}

        onSaveSportActivity={onSaveSportActivity}
        saveSportActivityLoading={saveSportActivityLoading}
        saveSportActivityError={saveSportActivityError}

        onDeleteSportActivity={onDeleteSportActivity}
        deleteSportActivityLoading={deleteSportActivityLoading}
        deleteSportActivityError={deleteSportActivityError}

        onCreateGoal={onCreateGoal}
        createGoalLoading={createGoalLoading}
        createGoalError={createGoalError}

        onSaveGoal={onSaveGoal}
        saveGoalLoading={saveGoalLoading}
        saveGoalError={saveGoalError}

        onDeleteGoal={onDeleteGoal}
        deleteGoalLoading={deleteGoalLoading}
        deleteGoalError={deleteGoalError}

        onCreatePhysio={onCreatePhysio}
        createPhysioLoading={createPhysioLoading}
        createPhysioError={createPhysioError}

        onSaveLifestyle={onSaveLifestyle}
        saveLifestyleLoading={saveLifestyleLoading}
        saveLifestyleError={saveLifestyleError}

        onSavePhysio={onSavePhysio}
        savePhysioLoading={savePhysioLoading}
        savePhysioError={savePhysioError}

        onDeletePhysio={onDeletePhysio}
        deletePhysioLoading={deletePhysioLoading}
        deletePhysioError={deletePhysioError}

        onSaveAnamneseNote={onSaveAnamneseNote}
        saveAnamneseNoteLoading={saveAnamneseNoteLoading}
        saveAnamneseNoteError={saveAnamneseNoteError}

        onDeleteAnamneseNote={onDeleteAnamneseNote}
        deleteAnamneseNoteLoading={deleteAnamneseNoteLoading}
        deleteAnamneseNoteError={deleteAnamneseNoteError}
      />
    </Scene>
  )
}

const PanelWithData = ({memberId, tab, id, goBack, goToSetup}) => {
  const AnamneseData = withData(Panel, {memberId, tab, id, goBack, goToSetup});
  return <AnamneseData/>
}

export default PanelWithData;
