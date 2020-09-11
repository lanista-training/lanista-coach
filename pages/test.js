import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import TestScreen from "../src/screens/test"

function Test({memberId, testType, testId}) {

  const goBack = () => Router.back()

  return (
    <TestScreen
      memberId={memberId}
      testType={testType}
      testId={testId}
      goBack={goBack}
    />
  );
}

Test.getInitialProps = context => {
  return ({
    memberId: context.query.memberId,
    testType: context.query.testType,
    testId: context.query.testId,
  })
};

export default withAuthSync(Test);
