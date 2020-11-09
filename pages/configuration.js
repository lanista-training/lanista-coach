import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth';
import ConfigurationScreen from "../src/screens/setup";
 import { logout } from '../lib/auth';

function Configuration() {

  const goBack = () => Router.back()

  return (
    <ConfigurationScreen
      goBack={goBack}
      doLogout={logout}
    />
  );
}

export default withAuthSync(Configuration);
