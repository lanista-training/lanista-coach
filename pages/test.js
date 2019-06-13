import React from "react";
import { withAuthSync } from '../lib/auth'
import TestScreen from "../src/screens/test"

function Test({memberId, testType, testId}) {
  return (
    <TestScreen  memberId={memberId} testType={testType} testId={testId}></TestScreen>
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
