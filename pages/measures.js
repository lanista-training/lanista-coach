import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import MeasuresScreen from "../src/screens/measures"

function Measures({memberId}) {

  const goBack = () => Router.back();

  const goToTest = (testData) => {
    const {testtype, id} = testData;
    Router.push({
      pathname: '/test',
      query: {
        memberId: memberId,
        testType: testtype,
        testId: id,
      }
    });
  };

  const goToSetup = () => {
    Router.push({
      pathname: '/configuration',
    });
  }

  return (
    <MeasuresScreen
      memberId={memberId}
      goBack={goBack}
      goToTest={goToTest}
      goToSetup={goToSetup}
    />

  );
}

Measures.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default withAuthSync(Measures);
