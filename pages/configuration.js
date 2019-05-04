import React from "react";
import { withAuthSync } from '../lib/auth'
import ConfigurationScreen from "../src/screens/setup"

function Configuration() {
  return (
    <ConfigurationScreen/>
  );
}

export default withAuthSync(Configuration);
