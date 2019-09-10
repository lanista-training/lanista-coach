import React, { Component } from 'react';
import Scene from './Scene';
import Router from 'next/router';
import { Query } from "react-apollo";
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../../lib/apollo'
import { ME } from "../../queries";

const SceneWithData = (props) => {
  const { data } = useQuery(ME);
  return(
    <Scene
      goToSetup={() => Router.push('/configuration')}
      {...props}
      me={data && data.me}
    />
  )
}

export default withApollo(SceneWithData);
