import React from "react";
import { withAuthSync } from '../lib/auth'
import CustomerScreen from "../src/screens/customer"

function Customer({memberId}) {
  return (
    <CustomerScreen  memberId={memberId}></CustomerScreen>
  );
}

Customer.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default withAuthSync(Customer);
