import React from "react";
import { withAuthSync } from '../lib/auth'
//import CustomersScreen from "../src/screens/customers"

function Customer() {
  return (
    <div>Customer</div>
  );
}

export default withAuthSync(Customer);
