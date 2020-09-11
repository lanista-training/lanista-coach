import React, { useEffect, useState } from 'react';
import {Stage} from "./styles";
import _ from 'lodash';
import moment from "moment";

import TestsList from "./TestsList";
import TestEditor from "./TestEditor";


export default ({

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
