import React, { Component, useState, useCallback, useEffect } from 'react';
import Scene from './Scene';
import Router from 'next/router';

import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo'

import { ME } from "../../queries";

const SceneWithData = (props) => {
  //
  // Queries
  //
  const { data, refetch, error } = useQuery(ME, { ssr: false, fetchPolicy: 'cache-first' });
  const me = data ? data : {};

  console.log("ERROR", error)

  useEffect(() => {
    console.log("ERROR", error);
    if( error ) {
      window.localStorage.clear();
    }
  }, [error]);

  return(
    <Scene
      {...props}
      me={me}
    />
  )
}

export default withApollo(SceneWithData);
