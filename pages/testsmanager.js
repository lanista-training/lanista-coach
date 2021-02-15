import React from "react";
import Router from 'next/router';
import { withAuthSync } from "../lib/auth";
import TemplateScreen from "../src/screens/testsmanager";

function Template({testId}) {

  const goBack = () => Router.back()

  const goToTest = (testId) => {
    Router.push({
      pathname: '/testsmanager',
      query: {
        test: testId,
      }
    });
  }

  const goToSetup = () => {
    Router.push({
      pathname: '/configuration',
    });
  }

  const goToExercises = (testId) => {
    Router.push({
      pathname: '/exercises',
      query: {
        editmode: true,
        test: testId
      }
    });
  }

  return (
    <TemplateScreen
      testId={testId}
      goBack={goBack}
      goToTest={goToTest}
      goToSetup={goToSetup}
      goToExercises={goToExercises}
    />
  );
}

Template.getInitialProps = context => {
  return ({
    testId: context.query.test
  })
};

export default withAuthSync(Template);
