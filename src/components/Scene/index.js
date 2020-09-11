import React, { Component, useState } from 'react';
import Scene from './Scene';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo'
import { ME } from "../../queries";

const SceneWithData = (props) => {
  const { data } = useQuery(ME, { ssr: false, fetchPolicy: 'cache-first' });
  const me = data ? data : {};
  return(
    <Scene
      {...props}
      me={me}
    />
  )
}

export default withApollo(SceneWithData);
