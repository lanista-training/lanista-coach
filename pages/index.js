import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import DashboardScreen from "../src/screens/dashboard"

function Index({cctoken, bu}) {
  if(typeof window !== 'undefined' && window.document && window.document.createElement) {
    if( cctoken && bu) {
      localStorage.setItem('cctoken', cctoken);
      localStorage.setItem('bu', bu);
      logout()
    }
  }

  const goToCustomers = () => {
    Router.push({
      pathname: '/customers',
    });
  }

  const goToCustomer = (memberId) => {
    Router.push({
      pathname: '/customer',
      query: { customer: memberId }
    });
  }

  const goToExercises = () => {
    Router.push({
      pathname: '/exercises',
    });
  }

  const goToWorkouts = () => {
    Router.push({
      pathname: '/workouts',
    });
  }

  const goToTests = () => {
    Router.push({
      pathname: '/testsmanager',
    });
  }

  const goToSetup = () => {
    Router.push({
      pathname: '/configuration',
    });
  }

  const goBack = () => {
    Router.back();
  }

  return (
    <DashboardScreen
      goToCustomers={ goToCustomers }
      goToCustomer={ goToCustomer }
      goToExercises={ goToExercises }
      goToWorkouts={ goToWorkouts }
      goToTests={ goToTests }
      goBack={ goBack }
      goToSetup={ goToSetup }
    />
  );
}

Index.getInitialProps = context => {
  return ({
    cctoken: context.query.cctoken,
    bu: context.query.bu,
  })
};

export default withAuthSync(Index);
