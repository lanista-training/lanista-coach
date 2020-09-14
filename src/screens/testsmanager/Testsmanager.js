import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Stage} from "./styles";
import _ from 'lodash';
import moment from "moment";

import TestsList from "./TestsList";
import TestEditor from "./TestEditor";


const Testsmanager = ({

  t,

  testId,
  goToTest,

  tests,
  testsLoading,
  testsError,

  onDefineTest,
  defineTestLoading,
  defineTestError,

  onRemoveTest,
  removeTestLoading,
  removeTestError,

}) =>  {

  return testId ? (
    <TestEditor

      t={t}

      testId={testId}

    />
  )
  :
  (
    <TestsList

      t={t}

      goToTest={goToTest}

      tests={tests}
      testsLoading={testsLoading}
      testsError={testsError}

      onDefineTest={onDefineTest}
      defineTestLoading={defineTestLoading}
      defineTestError={defineTestError}

      onRemoveTest={onRemoveTest}
      removeTestLoading={removeTestLoading}
      removeTestError={removeTestError}

    />
  )
}

Testsmanager.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Function to translate content
  */
  testId: PropTypes.number,

  /**
   * Function to translate content
  */
  goToTest: PropTypes.func,

  /**
   * Function to translate content
  */
  tests: PropTypes.array,

  /**
   * Function to translate content
  */
  testsLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  testsError: PropTypes.object,

  /**
   * Function to translate content
  */
  onDefineTest: PropTypes.func,

  /**
   * Function to translate content
  */
  defineTestLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  defineTestError: PropTypes.object,

  /**
   * Function to translate content
  */
  onRemoveTest: PropTypes.func,

  /**
   * Function to translate content
  */
  removeTestLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  removeTestError: PropTypes.object,
};

export default Testsmanager;
