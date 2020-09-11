import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import ConfigurationScreen from "../src/screens/setup"

function Configuration() {

  const goBack = () => Router.back()

  return (
    <ConfigurationScreen
      goBack={goBack}
    />
  );
}

export default withAuthSync(Configuration);
