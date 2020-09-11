import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from "moment";
//import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Template from './Testsmanager';

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';

import withData from "./DataProvider";

const Panel = ({

  testId,

  tests,
  testsLoading,
  testsError,

  defineTest,
  defineTestLoading,
  defineTestError,

  removeTest,
  removeTestLoading,
  removeTestError,

  goBack,
  goToTest,
}) => {

  /*
  const goToTest = (testId) => {
    Router.push({
      pathname: '/testsmanager',
      query: {
        test: testId,
      }
    });
  }
  */

  //
  // Language management
  //
  const [translations, setTranslations] = useState([]);
  const t = (text) => {
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }
  const onChangeLanguage = ( language ) => {
    const translations = require('../../../static/locales/' + language + '/testsmanager');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    setTranslations({...translations, ...commonTranslations})
  }
  useEffect(() => {
    if( translations && translations.length == 0 ) onChangeLanguage("de")
  }, [translations]);

  //
  // Commands segments
  //
  const getCommandsRight = () => {
    const commands = [];
    return commands;
  }

  const getCommandsLeft = () => {
    const commands = [{
        icon: <Back/>,
        iosname: 'help-inactive',
        text: '',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'back',
        onTap: () => {
          goBack();
        }
    }];
    return commands;
  };

  //
  // Data wrappers
  //
  const onDefineTest = (testName) => {
    defineTest({
      variables: {
        testName: testName,
      }
    })
  }

  const onRemoveTest = (testId) => {
    removeTest({
      variables: {
        testId: testId,
      }
    })
  }

  return (
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight()}
      t={t}
    >
      <Template

        t={t}
        testId={testId}
        goToTest={goToTest}

        onDefineTest={onDefineTest}
        defineTestLoading={defineTestLoading}
        defineTestError={defineTestError}

        tests={tests}
        testsLoading={testsLoading}
        testsError={testsError}

        onRemoveTest={onRemoveTest}
        removeTestLoading={removeTestLoading}
        removeTestError={removeTestError}

        goBack={goBack}
        goToTest={goToTest}

      />
    </Scene>
  )

}

const PanelWithData = ({testId, goBack, goToTest}) => {
  const MeasuresData = withData(Panel, {testId, goBack, goToTest});
  return <MeasuresData/>
}

export default PanelWithData;
