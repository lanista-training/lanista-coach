import React, { useEffect, useState, useCallback } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import moment from "moment";

import {
  EXERCISE,
  PLANEXERCISE,
  ME,
  PLANEXERCISESETTINGS
} from '../../queries';
import {
  CREATENOTE,
  DELETENOTE,
  CREATECHATMESSAGE,
  DELETECHATMESSAGE,
  SAVEEXERCISESETTINGS,
  CREATEPROTOCOLL,
  DELETEPROTOCOLL,
  DELETEEXERCISE
} from '../../mutations';
import { MESSAGEFEED } from "../../subscriptions";

const withData = (WrappedComponent, {exerciseId, planexerciseId, memberId, tab, editmode, goBack, goToExercise, goToSetup}) => {

  const DataProvider = () => {

    const { meLoading, meError, data: meData } = useQuery(ME, {fetchPolicy: 'cache-only'} );
    const {me} = meData ? meData : {me: {}};

    const { loading, error, data, refetch, networkStatus } = useQuery(EXERCISE, {
      variables: {
        exerciseId: exerciseId,
        memberId: memberId,
        planexerciseId: planexerciseId ? planexerciseId : 0,
        language: me ? me.language : 'DE'
      },
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
      notifyOnNetworkStatusChange: true,
    });

    const {exercise} = data ? data : {};

    //
    // Notes
    //
    const [createNote, { loading: mutationLoading, error: createNoteError }] = useMutation(
      CREATENOTE,
      {
        update(cache,  { data: { createNote } }) {
          if( createNote.id > 0 ) {
            refetch();
          }
        }
      }
    );
    const [deleteNote, { loading: deleteNoteLoading, error: deleteNoteError }] = useMutation(
      DELETENOTE,
      {
        update(cache,  { data: { deleteNote } }) {
          if( deleteNote.id > 0 ) {
            refetch();
          }
        }
      }
    );

    //
    // Chat
    //
    const [createChatMessage, { loading: createChatMessageLoading, error: createChatMessageError }] = useMutation(
      CREATECHATMESSAGE,
      {
        update(cache,  { data: { createChatMessage } }) {
          if( createChatMessage.id > 0 ) {
            refetch();
          }
        }
      }
    );
    const [deleteChatMessage, { loading: deleteChatMessageLoading, error: deleteChatMessageError }] = useMutation(
      DELETECHATMESSAGE,
      {
        update(cache,  { data: { deleteChatMessage } }) {
          if( deleteChatMessage.id > 0 ) {
            refetch();
          }
        }
      }
    );
    //
    // Chat Subscription
    //
    const onSubscriptionData = useCallback( (result) => {
        refetch();
      },
      [],
    );
    useSubscription(MESSAGEFEED, { onSubscriptionData });

    const [saveExerciseSettings, { loading: mutationSettingsLoading, error: mutationSettingsError }] = useMutation(
      SAVEEXERCISESETTINGS,
      {
        update(cache,  { data: {saveExerciseSettings} }) {
          const {id} = saveExerciseSettings;
          if (id ) {
            refetch();
          }
        }
      }
    );

    const [createProtocoll, { loading: createProtocollLoading, error: createProtocollError }] = useMutation(
      CREATEPROTOCOLL,
      {
        update(cache,  { data: {createProtocoll} }) {
          if( createProtocoll.id > 0 ) {
            refetch();
          }
        }
      }
    );

    const [deleteProtocoll, { loading: deleteProtocollLoading, error: deleteProtocollError }] = useMutation(
      DELETEPROTOCOLL,
      {
        update(cache,  { data: {deleteProtocoll} }) {
          if( deleteProtocoll.id > 0 ) {
            refetch();
          }
        }
      }
    );

    const [exerciseDeleted, setExerciseDeleted] = React.useState(false);
    const [deleteExercise, { loading: deleteExerciseLoading, error: deleteExerciseError }] = useMutation(
      DELETEEXERCISE,
      {
        update(cache,  { data: {deleteExercise} }) {
          deleteExercise.id !== 0 && setExerciseDeleted(true);
        }
      }
    );

    return (
      <WrappedComponent
        exerciseId={exerciseId}
        refetch={refetch}
        planexerciseId={planexerciseId}
        memberId={memberId}
        tab={tab}
        editmode={editmode}

        createNote={createNote}
        createNoteLoading={mutationLoading}
        createNoteError={createNoteError}

        deleteNote={deleteNote}
        deleteNoteLoading={deleteNoteLoading}

        createChatMessage={createChatMessage}
        createChatMessageLoading={createChatMessageLoading}
        createChatMessageError={createChatMessageError}

        deleteChatMessage={deleteChatMessage}
        deleteChatMessageLoading={deleteChatMessageLoading}

        saveExerciseSettings={saveExerciseSettings}

        createProtocoll={createProtocoll}
        createProtocollLoading={createProtocollLoading || loading}
        createProtocollError={createProtocollError}

        deleteProtocoll={deleteProtocoll}
        deleteProtocollLoading={deleteProtocollLoading || loading}

        loading={loading || mutationLoading }
        exercise={exercise}
        error={error}

        deleteExercise={deleteExercise}
        deleteExerciseLoading={deleteExerciseLoading}
        deleteExerciseError={deleteExerciseError}
        exerciseDeleted={exerciseDeleted}

        networkStatus={networkStatus}

        goBack={goBack}
        goToExercise={goToExercise}
        goToSetup={goToSetup}

        me={me}
      />
    )
  }

  return DataProvider;

}

export default withData;
