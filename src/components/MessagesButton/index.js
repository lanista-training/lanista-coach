import React, { Component, useState, useCallback } from 'react';
import MessagesButton from './MessagesButton';
import { withApollo } from '../../lib/apollo';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { MESSAGES } from "../../queries";
import { UPDATECHATMESSAGESTATUS } from "../../mutations";
import { MESSAGEFEED } from "../../subscriptions";

const Panel = ({filter, title}) => {

  const {data, loading, error, refetch} = useQuery(MESSAGES, {
    fetchPolicy: 'network-only'
  });

  //
  // Subscriptions
  //
  const onSubscriptionData = useCallback( (result) => {
      console.log("MESSAGEFEED", result);
      console.log("REFETCHING...")
      refetch();
    },
    [],
  );
  useSubscription(MESSAGEFEED, { onSubscriptionData });

  const [updateChatMessageStatus, {
    loading: updateChatMessageStatusLoading,
    error: updateChatMessageStatusError
  }] = useMutation(
    UPDATECHATMESSAGESTATUS,
    {
      update(cache,  { data: { updateChatMessateStatus } }) {
        refetch();
      }
    }
  );

  const onUpdateChatMessageStatus = (messageId) => {
    updateChatMessageStatus({
      variables: {
        messageId: messageId
      }
    })
  }


  return (
    <MessagesButton
      data={data && data.messages && data.messages.data ? data.messages.data : []}
      loading={loading}
      error={error}
      onUpdateChatMessageStatus={onUpdateChatMessageStatus}
      refetch={refetch}
      loadingMessages={loading}
    />)
};

export default withApollo(Panel);
