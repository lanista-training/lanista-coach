import React from "react";
import { withAuthSync } from '../lib/auth'
import DashboardScreen from "../src/screens/dashboard"

function Index() {
  return (
    <DashboardScreen/>
  );
}

export default withAuthSync(Index);
