import React from "react";
import { withAuthSync } from '../lib/auth'
import CustomersScreen from "../src/screens/customers"

function Customers() {
  return (
    <CustomersScreen/>
  );
}

export default withAuthSync(Customers);
