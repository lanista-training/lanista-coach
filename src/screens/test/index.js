import React, { useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import moment from "moment";
//import Router from 'next/router';
import Scene from "../../components/Scene";
import Test from './Test';
import TestHeader from "../../components/TestHeader";
import withData from "./DataProvider";

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';
import Pdf from '../../components/icons/Pdf';
import SendAsEmail from '../../components/icons/SendAsEmail';
import Remove from '../../components/icons/Remove';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const extractTestName = ( member, testType ) => {
  let testName = ''
  if( member && member.tests ) {
    member.tests.map((test) => {
     if( test.id === testType ) {
       testName = test.name
     }
   })
  }
  return testName
}

const extractTestEditable = ( member, testType, testId ) => {
  let testEditable = ''
  if( member && member.tests ) {
    member.tests.map((test) => {
     if( test.id === testType ) {
       test.testresults.map((result, index) => {
         if( result.id == testId ) {
           testEditable = result.editable
         }
       })
     }
    })
  }
  return testEditable
}

const extractCreatorFullName = ( member, testType, testId ) => {
  let testEditable = ''
  if( member && member.tests ) {
    member.tests.map((test) => {
     if( test.id === testType ) {
       test.testresults.map((result, index) => {
         if( result.id == testId ) {
           testEditable = result.creator_full_name
         }
       })
     }
    })
  }
  return testEditable
}

const extractTestData = ( member, testType, testId ) => {
  let testData = []

  member && member.tests && member.tests.map((test) => {
    if( test.id == testType ) {
      const testNodes = test.testnodes
      test.testresults.map((result, index) => {
        if( result.id == testId ) {
          let testResult = '';
          if( testType.indexOf('1-') > -1 ) {
            testResult = result.results.length > 0 ? JSON.parse(result.results) : new Array(testNodes.length);
          } else {
            testResult = result.results.split("|");
          }

          const testComments = result.comments.split("|");
          if( test.id.indexOf('1-') > -1 ) {
            //
            // process exercise test
            //
            let resultPosition = 0;
            testNodes.map((node, index) => {
              testData.push({
                ...node,
                score: testResult[index] ? testResult[index] : [],
                comment: testComments[index],
              });
            });

          } else {
            //
            // process standard lanista test
            //
            let resultPosition = 0
            testNodes.map((node, index) => {
              if( node.type == 2 ) {
                testData.push({
                  ...node, score: [testResult[resultPosition], testResult[resultPosition + 1]], comment: testComments[index]
                })
                resultPosition = resultPosition + 2
              } else {
                testData.push({
                  ...node, score: [testResult[resultPosition]], comment: testComments[index]
                })
                resultPosition = resultPosition + 1
              }
            })
          }
        }
      })
    }
  });
  return testData;
}

const extractTestResults = ( member, testType, testId ) => {
  let testresult = '';
  member && member.tests && member.tests.map((test) => {
    if( test.id == testType ) {
      test.testresults.map(result => {
        if( result.id == testId) {
          const {results} = result;
          if( results.length > 0 ) {
            testresult = result.results;
          } else {
            // CREATE A NEW RESULT OBJECT
            const {testnodes} = test;
            const newResultObject = [];
            testnodes.map(node => {
              if( node.type == 2 ) {
                newResultObject.push('');
                newResultObject.push('');
              } else {
                newResultObject.push('');
              }
            });
            testresult = newResultObject.join('|');
          }
        }
      })
    }
  })
  return testresult;
}

const Panel = ({
  memberId,
  testId,
  testType,

  member,
  memberLoading,
  memberError,

  saveTestResults,
  saveTestResultsLoading,
  saveTestResultsError,

  saveTestComments,
  saveTestCommentsLoading,
  saveTestCommentsError,

  saveOwnTestComments,
  saveOwnTestCommentsLoading,
  saveOwnTestCommentsError,

  saveOwnTestResults,
  saveOwnTestResultsLoading,
  saveOwnTestResultsError,

  deleteTestRecord,
  deleteTestRecordLoading,
  deleteTestRecordError,

  deleteOwnTestRecord,
  deleteOwnTestRecordLoading,
  deleteOwnTestRecordError,

  generateTestPdf,
  generateTestPdfLoading,
  generateTestPdfError,

  sendTest,
  sendTestLoading,
  sendTestError,

  goBack,
  goToSetup,
}) => {
  const {t} = useTranslate("testsmanager");
  const testData = extractTestData(member, testType, testId);
  const testEditable = extractTestEditable( member, testType, testId );

  //
  // Snackbar managment
  //
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const toggleSnackbar = () => setOpenSnackbar(!openSnackbar);

  //
  // Modal panel
  //
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getCommandsRight = () => {
    const commands = [];

    if( testType.indexOf('0-') > -1 ) {
      commands.push({
        icon: <Pdf/>,
        text: t("generate_pdf"),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'new measure',
        onTap: () => {
          onGenerateTestPdf(testId);
        }
      });
      commands.push({
        icon: <SendAsEmail/>,
        text: t('send_as_email'),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'folder',
        onTap: () => {
          onSendTest(testId);
        }
      });
    }
    if( testEditable ) {
      commands.push({
        icon: <Remove/>,
        text: t("delete_test"),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'last',
        onTap: () => {
          handleOpen();
        }
      });
    }
    return commands;
  }


  const getCommandsLeft = () => {
    return ([{
        icon: <Back/>,
        iosname: 'tools-inactive',
        text: '',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'back',
        style: {color: '#34acfb'},
        onTap: () => {
          goBack();
        }
    }]);
  }

  const onSaveTestItem = (position, value) => {
    if( testType.indexOf('1-') > -1 ) {
      member.tests.map((test) => {
        if( test.id == testType ) {
          test.testresults.map((result, index) => {
            if( result.id == testId ) {
              const testResult = result.results.length > 0 ? JSON.parse(result.results) : new Array(test.testnodes.length);
              testResult[position] = value;
              const curatedTestResult = test.testnodes.map( (tmp, i) => testResult[i] ? testResult[i] : [] );
              // send new results
              saveOwnTestResults({
                variables: {
                  memberId: memberId,
                  testId: testId,
                  testResult: JSON.stringify(curatedTestResult),
                }
              });
            }
          })
        }
      });
    } else {
      // preapre the new value
      const oldResult = extractTestResults(member, testType, testId);
      const newResultObject = oldResult.split('|');
      newResultObject[position] = value + '';
      const newResult = newResultObject.join('|');
      // send new results
      saveTestResults({
        variables: {
          memberId: memberId,
          testId: testId,
          testResult: newResult,
        }
      });
    }
  }

  const onSaveTestComments = (comments) => {
    // send new results
    if( testType.indexOf('1-') > -1 ) {
      saveOwnTestComments({
        variables: {
          memberId: memberId,
          testId: testId,
          comments: comments,
        }
      });
    } else {
      saveTestComments({
        variables: {
          memberId: memberId,
          testId: testId,
          comments: comments,
        }
      });
    }
  }

  const onDeleteTestRecord = (recordId) => {
    if( testType.indexOf('1-') > -1 ) {
      deleteOwnTestRecord({
        variables: {
          memberId: memberId,
          testId: recordId,
        }
      })
    } else {
      deleteTestRecord({
        variables: {
          memberId: memberId,
          testId: recordId,
        }
      })
    }
  }

  const onGenerateTestPdf = (testId) => {
    generateTestPdf({
      variables: {
        testId: testId,
      }
    })
  }

  const [sendingTest, setSendingTest] = useState(false);
  useEffect(() => {
    if( !sendTestLoading && sendingTest ) {
      setSendingTest(false);
      setSnackbarMessage("Test erfolgreich gesendet !")
      toggleSnackbar();
    }
    if( !sendTestLoading && sendTestError ) {
      setSendingTest(false);
      setSnackbarMessage("Test könnte nicht gesendet werden !")
      toggleSnackbar();
    }
  }, [sendTestLoading, sendTestError]);
  const onSendTest = (testId) => {
    setSendingTest(true);
    sendTest({
      variables: {
        testId: testId,
      }
    })
  }

  const {first_name, last_name, id} = member ? member : {};

  return (
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight()}
      headerChildren={
        <TestHeader
          t={t}
          userId={id}
          firstName={first_name}
          lastName={last_name}
          testName={extractTestName( member, testType )}
          creatorFullName={extractCreatorFullName(member, testType, testId)}
          editable={extractTestEditable(member, testType, testId)}
        />
      }
      t={t}
      goToSetup={goToSetup}
    >
      <Test
        t={t}
        testId={testId}
        test={testData}
        testType={testType}

        editable={testEditable}

        onSaveTestItem={onSaveTestItem}
        saveTestResultsLoading={saveTestResultsError}
        saveTestResultsError={saveTestResultsError}

        onDeleteTestRecord={onDeleteTestRecord}
        deleteTestRecordLoading={deleteTestRecordLoading || deleteOwnTestRecordLoading}
        deleteTestRecordError={deleteTestRecordError || deleteOwnTestRecordError}

        onSaveTestComments={onSaveTestComments}
        saveTestCommentsLoading={saveTestCommentsLoading || saveOwnTestCommentsLoading}
        saveTestCommentsError={saveTestCommentsError || saveOwnTestCommentsError}

        open={open}
        handleClose={handleClose}

        goBack={goBack}
      />

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={toggleSnackbar}
      >
        <MuiAlert onClose={toggleSnackbar} severity="warning" variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

    </Scene>
  )
}

const PanelWithData = ({memberId, testId, testType, goBack, goToSetup}) => {
  const TestData = withData(Panel, {memberId, testId, testType, goBack, goToSetup});
  return <TestData/>
}

export default PanelWithData;
