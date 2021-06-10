import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import moment from "moment";
import Router from 'next/router';
import { MEMBER_ANAMNESE, ME } from "../../queries";
import {
  SAVEFINDING,
  CREATEFINDING,
  DELETEFINDING,
  CREATELIFESTYLE,
  SAVELIFESTYLE,
  DELETELIFESTYLE,
  CREATEDRUG,
  SAVEDRUG,
  DELETEDRUG,
  CREATESPORTACTIVITY,
  SAVESPORTACTIVITY,
  DELETESPORTACTIVITY,
  CREATEGOAL,
  SAVEGOAL,
  DELETEGOAL,
  CREATEPHYSIO,
  SAVEPHYSIO,
  DELETEPHYSIO,
  SAVEANAMNESENOTE,
  DELETEANAMNESENOTE,
  TOGGLEANAMNESESTATUS,
  TOOGLEFINDINGREQUESTFEDDBACK,
} from "../../mutations";

const TABINDEX = gql`
  {
    tabIndex @client
  }
`;

const withData = (WrappedComponent, {memberId, tab, id, goBack, goToSetup}) => {

  const DataProvider = () => {
    //
    // local state
    //
    const { data: localData, client } = useQuery(TABINDEX);
    const tabIndex = localData && localData.tabIndex ? localData.tabIndex : 0;
    const setTabIndex = (index) => client.writeData({ data: { tabIndex: index } });

    useEffect(() => {
      if( tab ) {
        setTabIndex(tab);
      }
    }, [tab])

    //
    // ME data
    //
    const { data: meData } = useQuery(ME);
    const {me} = meData ? meData : {};

    //
    // Anamnese data
    //
    const {
      data,
      loading: memberLoading,
      error: memberError,
      refetch,
    } = useQuery(MEMBER_ANAMNESE, {
      variables: {
        memberId: memberId
      },
      fetchPolicy: 'network-only'
    });

    const {member} = data ? data : {};

    //
    // Save fiding
    //
    const [saveFinding, { loading: saveFindingLoading, error: saveFindingError }] = useMutation(
      SAVEFINDING,
      {
        update(cache,  { data: { saveFinding } }) {
          if( saveFinding.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save fiding feedback request
    //
    const [toogleFindingFeedbackRequest, { loading: toogleFindingFeedbackRequestLoading, error: toogleFindingFeedbackRequestError }] = useMutation(
      TOOGLEFINDINGREQUESTFEDDBACK,
      {
        update(cache,  { data: { toggleFindingRequestFeedback } }) {
          if( toggleFindingRequestFeedback.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Create fiding
    //
    const [createFinding, { loading: createFindingLoading, error: createFindingError }] = useMutation(
      CREATEFINDING,
      {
        update(cache,  { data: { createFinding } }) {
          if( createFinding.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Delete fiding
    //
    const [deleteFinding, { loading: deleteFindingLoading, error: deleteFindingError }] = useMutation(
      DELETEFINDING,
      {
        update(cache,  { data: { deleteFinding } }) {
          if( deleteFinding.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Create lifestyle entry
    //
    const [createLifestyle, { loading: createLifestyleLoading, error: createLifestyleError }] = useMutation(
      CREATELIFESTYLE,
      {
        update(cache,  { data: { createLifestyle } }) {
          if( createLifestyle.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save lifestyle entry
    //
    const [saveLifestyle, { loading: saveLifestyleLoading, error: saveLifestyleError }] = useMutation(
      SAVELIFESTYLE,
      {
        update(cache,  { data: { saveLifestyle } }) {
          if( saveLifestyle.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save lifestyle entry
    //
    const [deleteLifestyle, { loading: deleteLifestyleLoading, error: deleteLifestyleError }] = useMutation(
      DELETELIFESTYLE,
      {
        update(cache,  { data: { deleteLifestyle } }) {
          if( deleteLifestyle.success ) {
            refetch();
          }
        }
      }
    );


    //
    // Create drug entry
    //
    const [createDrug, { loading: createDrugLoading, error: createDrugError }] = useMutation(
      CREATEDRUG,
      {
        update(cache,  { data: { createDrug } }) {
          if( createDrug.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save drug entry
    //
    const [saveDrug, { loading: saveDrugLoading, error: saveDrugError }] = useMutation(
      SAVEDRUG,
      {
        update(cache,  { data: { saveDrug } }) {
          if( saveDrug.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save drug entry
    //
    const [deleteDrug, { loading: deleteDrugLoading, error: deleteDrugError }] = useMutation(
      DELETEDRUG,
      {
        update(cache,  { data: { deleteDrug } }) {
          if( deleteDrug.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Create sport activity entry
    //
    const [createSportActivity, { loading: createSportActivityLoading, error: createSportActivityError }] = useMutation(
      CREATESPORTACTIVITY,
      {
        update(cache,  { data: { createSportActivity } }) {
          if( createSportActivity.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save sport activity entry
    //
    const [saveSportActivity, { loading: saveSportActivityLoading, error: saveSportActivityError }] = useMutation(
      SAVESPORTACTIVITY,
      {
        update(cache,  { data: { saveSportActivity } }) {
          if( saveSportActivity.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save sport activity entry
    //
    const [deleteSportActivity, { loading: deleteSportActivityLoading, error: deleteSportActivityError }] = useMutation(
      DELETESPORTACTIVITY,
      {
        update(cache,  { data: { deleteSportActivity } }) {
          if( deleteSportActivity.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Create goal entry
    //
    const [createGoal, { loading: createGoalLoading, error: createGoalError }] = useMutation(
      CREATEGOAL,
      {
        update(cache,  { data: { createGoal } }) {
          if( createGoal.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save goal entry
    //
    const [saveGoal, { loading: saveGoalLoading, error: saveGoalError }] = useMutation(
      SAVEGOAL,
      {
        update(cache,  { data: { saveGoal } }) {
          if( saveGoal.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save goal entry
    //
    const [deleteGoal, { loading: deleteGoalLoading, error: deleteGoalError }] = useMutation(
      DELETEGOAL,
      {
        update(cache,  { data: { deleteGoal } }) {
          if( deleteGoal.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Create physio entry
    //
    const [createPhysio, { loading: createPhysioLoading, error: createPhysioError }] = useMutation(
      CREATEPHYSIO,
      {
        update(cache,  { data: { createPhysio } }) {
          if( createPhysio.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save physio entry
    //
    const [savePhysio, { loading: savePhysioLoading, error: savePhysioError }] = useMutation(
      SAVEPHYSIO,
      {
        update(cache,  { data: { savePhysio } }) {
          if( savePhysio.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save physio entry
    //
    const [deletePhysio, { loading: deletePhysioLoading, error: deletePhysioError }] = useMutation(
      DELETEPHYSIO,
      {
        update(cache,  { data: { deletePhysio } }) {
          if( deletePhysio.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save anamnese entry
    //
    const [saveAnamneseNote, { loading: saveAnamneseNoteLoading, error: saveAnamneseNoteError }] = useMutation(
      SAVEANAMNESENOTE,
      {
        update(cache,  { data: { saveAnamneseNote } }) {
          if( saveAnamneseNote.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Delete anamnese entry
    //
    const [deleteAnamneseNote, { loading: deleteAnamneseNoteLoading, error: deleteAnamneseNoteError }] = useMutation(
      DELETEANAMNESENOTE,
      {
        update(cache,  { data: { deleteAnamneseNote } }) {
          if( deleteAnamneseNote.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Toggle anamnese status
    //
    const [toggleAnamneseStatus, { loading: toggleAnamneseStatusLoading, error: toggleAnamneseStatusError }] = useMutation(
      TOGGLEANAMNESESTATUS,
      {
        update(cache,  { data: { toggleAnamneseStatus } }) {
          if( toggleAnamneseStatus.success ) {
            refetch();
          }
        }
      }
    );


    return(
      <WrappedComponent
        me={me}

        tabIndex={tabIndex}
        setTabIndex={setTabIndex}

        memberId={memberId}
        tab={tab}
        id={id}

        member={member}
        memberLoading={memberLoading}
        memberError={memberError}

        saveFinding={saveFinding}
        saveFindingLoading={saveFindingLoading}
        saveFindingError={saveFindingError}

        createFinding={createFinding}
        createFindingLoading={createFindingLoading}
        createFindingError={createFindingError}

        deleteFinding={deleteFinding}
        deleteFindingLoading={deleteFindingLoading}
        deleteFindingError={deleteFindingError}

        createLifestyle={createLifestyle}
        createLifestyleLoading={createLifestyleLoading}
        createLifestyleError={createLifestyleError}

        saveLifestyle={saveLifestyle}
        saveLifestyleLoading={saveLifestyleLoading}
        saveLifestyleError={saveLifestyleError}

        deleteLifestyle={deleteLifestyle}
        deleteLifestyleLoading={deleteLifestyleLoading}
        deleteLifestyleError={deleteLifestyleError}

        createDrug={createDrug}
        createDrugLoading={createDrugLoading}
        createDrugError={createDrugError}

        saveDrug={saveDrug}
        saveDrugLoading={saveDrugLoading}
        saveDrugError={saveDrugError}

        deleteDrug={deleteDrug}
        deleteDrugLoading={deleteDrugLoading}
        deleteDrugError={deleteDrugError}

        createSportActivity={createSportActivity}
        createSportActivityLoading={createSportActivityLoading}
        createSportActivityError={createSportActivityError}

        saveSportActivity={saveSportActivity}
        saveSportActivityLoading={saveSportActivityLoading}
        saveSportActivityError={saveSportActivityError}

        deleteSportActivity={deleteSportActivity}
        deleteSportActivityLoading={deleteSportActivityLoading}
        deleteSportActivityError={deleteSportActivityError}

        createGoal={createGoal}
        createGoalLoading={createGoalLoading}
        createGoalError={createGoalError}

        saveGoal={saveGoal}
        saveGoalLoading={saveGoalLoading}
        saveGoalError={saveGoalError}

        deleteGoal={deleteGoal}
        deleteGoalLoading={deleteGoalLoading}
        deleteGoalError={deleteGoalError}

        createPhysio={createPhysio}
        createPhysioLoading={createPhysioLoading}
        createPhysioError={createPhysioError}

        savePhysio={savePhysio}
        savePhysioLoading={savePhysioLoading}
        savePhysioError={savePhysioError}

        deletePhysio={deletePhysio}
        deletePhysioLoading={deletePhysioLoading}
        deletePhysioError={deletePhysioError}

        saveAnamneseNote={saveAnamneseNote}
        saveAnamneseNoteLoading={saveAnamneseNoteLoading}
        saveAnamneseNoteError={saveAnamneseNoteError}

        deleteAnamneseNote={deleteAnamneseNote}
        deleteAnamneseNoteLoading={deleteAnamneseNoteLoading}
        deleteAnamneseNoteError={deleteAnamneseNoteError}

        toggleAnamneseStatus={toggleAnamneseStatus}
        toggleAnamneseStatusLoading={toggleAnamneseStatusLoading}
        toggleAnamneseStatusError={toggleAnamneseStatusError}

        toogleFindingFeedbackRequest={toogleFindingFeedbackRequest}
        toogleFindingFeedbackRequestLoading={toogleFindingFeedbackRequestLoading}
        toogleFindingFeedbackRequestError={toogleFindingFeedbackRequestError}

        goBack={goBack}
        goToSetup={goToSetup}
      />
    )
  }

  return DataProvider;

}

export default withData;
