import React, { useEffect, useState } from 'react';
import { withApollo } from '../../lib/apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from "moment";

import { MEMBER, ME } from '../../queries';
import {
  UPDATEMEMBER,
  DELETEMEMBER,
  UPDATEMEMBERADDRESS,
  REQUESTDATAPRIVACYDOCUMENT,
  SENDACTIVATIONMAIL,
} from '../../mutations';

export const withData = (WrappedComponent, {memberId, goBack}) => {

  const DataProvider = () => {
    const { data: meData } = useQuery(ME);
    const {me} = meData ? meData : {me: {}};

    const { data: memberData, loading, error, refetch } = useQuery(MEMBER, {
      variables: {
        memberId: memberId,
      },
    });
    const {member} = memberData ? memberData : {member: {}};

    console.log('DataProvider', memberId, memberData, member, me)

    const [updateMember, {
      loading: updateMemberLoading,
      error: updateMemberError
    }] = useMutation(
      UPDATEMEMBER,
      {
        update(cache,  { data: { updateMember } }) {
          const {id} = updateMember;
          if(id > 0) {
            refetch();
          }
        }
      }
    );

    const [memberDeleted, setMemberDeleted] = React.useState(false);
    const [deleteMember, {
      loading: deleteMemberLoading,
      error: deleteMemberError
    }] = useMutation(
      DELETEMEMBER,
      {
        update(cache,  { data: { deleteMember } }) {
          const {id} = deleteMember;
          if(id > 0) {
            setMemberDeleted(true);
          }
        }
      }
    );

    const [updateMemberAddress, {
      loading: updateMemberAddressLoading,
      error: updateMemberAddressError
    }] = useMutation(
      UPDATEMEMBERADDRESS,
      {
        update(cache,  { data: { updateMemberAddress } }) {
          const {id} = updateMemberAddress;
          if(id > 0) {
            refetch();
          }
        }
      }
    );

    const [dataPrivacyDocument, setDataPrivacyDocument] = React.useState(null);
    const resetDataPrivacyDocument = () => setDataPrivacyDocument(null);
    const [requestDataPrivacyDocument, {
      loading: requestDataPrivacyDocumentLoading,
      error: requestDataPrivacyDocumentError
    }] = useMutation(
      REQUESTDATAPRIVACYDOCUMENT,
      {
        update(cache,  { data: { requestDataPrivacyDocument } }) {
          if(requestDataPrivacyDocument && requestDataPrivacyDocument.filename) {
            setDataPrivacyDocument(requestDataPrivacyDocument.filename);
          } else {
            console.log("show error");
          }
        }
      }
    );

    const [sendActivationMail, {
      loading: sendActivationMailLoading,
      error: sendActivationMailError
    }] = useMutation(
      SENDACTIVATIONMAIL,
      {
        update(cache,  { data: { sendActivationMail } }) {
          const {id} = sendActivationMail;
          if(id > 0) {
            refetch();
          }
        }
      }
    );

    return (
      <WrappedComponent
        me={me}
        member={member}
        loading={loading}
        error={error}
        refetch={refetch}

        updateMember={updateMember}
        updateMemberLoading={updateMemberLoading}
        updateMemberError={updateMemberError}

        updateMemberAddress={updateMemberAddress}
        updateMemberAddressLoading={updateMemberAddressLoading}
        updateMemberAddressError={updateMemberAddressError}

        requestDataPrivacyDocument={requestDataPrivacyDocument}
        dataPrivacyDocument={dataPrivacyDocument}
        resetDataPrivacyDocument={resetDataPrivacyDocument}

        sendActivationMail={sendActivationMail}
        sendActivationMailLoading={sendActivationMailLoading}
        sendActivationMailError={sendActivationMailError}

        deleteMember={deleteMember}
        memberDeleted={memberDeleted}

        goBack={goBack}
      />
    )
  }
  return withApollo(DataProvider);
}
