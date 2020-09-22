import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import CustomersScreen from "../src/screens/customers"

function Customers({workoutId}) {

  const goBack = () => Router.back()

  const goToCustomer = (customerId) => {
    Router.push({
      pathname: '/customer',
      query: { customer: customerId }
    });
  }

  const goToSetup = () => {
    console.log("goToSetup")
    Router.push({
      pathname: '/configuration',
    });
  }

  return (
    <CustomersScreen
      workoutId={workoutId}
      goBack={goBack}
      goToCustomer={goToCustomer}
      goToSetup={goToSetup}
    />
  );
}

Customers.getInitialProps = context => {
  return ({
    workoutId: context.query.workout
  })
};

export default withAuthSync(Customers);
