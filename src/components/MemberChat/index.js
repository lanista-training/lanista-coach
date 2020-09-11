import * as React from "react";
import Chat from '../Chat';
import { CHAT } from "../../queries";
import { withApollo } from '../../lib/apollo'
import { useQuery } from '@apollo/react-hooks';

export default function({member, closePanel, visible, hideHeader, onMessageClick}) {
  const { loading, error, data } = useQuery(CHAT, {variables: {memberId: member.id}})
  return (
    <Chat
      member={member}
      closePanel={closePanel}
      visible={visible}
      data={data && data.chat && data.chat.data ? data.chat.data : []}
      loading={loading}
      error={error}
      hideHeader={false}
      hideExercises={false}
      hideInputField={true}
      onMessageClick={onMessageClick}
    />
  )
}
