import React from 'react';
import { withApollo } from '../../../lib/apollo';
import TrainerList from './TrainerList';
import { useQuery } from '@apollo/react-hooks';
import { GETTRAINERSLIST } from "../../../queries";
import cookie from 'js-cookie';

const Panel = ({
  t,
  tbt,

  password,
  onPasswordChange,

  onEmaiChange,

  disabled,
  error,
  helperText,

  authenticateUser,
  loading,

  goToForgotpassword,

}) => {

  const {
    data:getTrainersListData,
    loading: getTrainersLoading,
    error: getTrainersError } = useQuery( GETTRAINERSLIST, {
      variables: {
        tbt: tbt
      },
      fetchPolicy: 'network-only'
    });
  const {getTrainersList} = getTrainersListData ? getTrainersListData : [];
  if( getTrainersList && getTrainersList.length === 0 ) {
    //cookie.remove("tbt");
    //location.reload();
  }

  return (
    <TrainerList

      t={t}

      trainers={getTrainersList ? getTrainersList : []}
      getTrainersLoading={getTrainersLoading}
      getTrainersError={getTrainersError}

      password= {password}
      onPasswordChange={onPasswordChange}

      onEmaiChange={onEmaiChange}
      disabled={disabled}
      error={error}
      helperText={helperText}

      authenticateUser={authenticateUser}
      loading={loading}

      goToForgotpassword={goToForgotpassword}
    />
  )

}

export default withApollo(Panel);
