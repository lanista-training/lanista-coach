import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import moment from "moment";
//import Router from 'next/router';
import { MEMBER_MEASURES, TESTS } from "../../queries";
import { SAVETEST, SAVEOWNTEST, SAVECOMMENTS, SAVEOWNCOMMENTS, DELETETESTRECORD, DELETEOWNTESTRECORD, GENERATETESTPDF, SENDTEST } from "../../mutations";

const withData = (WrappedComponent, {memberId, testType, testId, goBack, goToSetup}) => {

  const DataProvider = () => {
    //
    // Tests data
    //
    const {
      data: {tests},
      loading: testsLoading,
      error: testsError,
    } = useQuery(TESTS);

    //
    // Measures data
    //
    const {
      data: memberData,
      loading: memberLoading,
      error: memberError,
      refetch,
    } = useQuery(MEMBER_MEASURES, {
      variables: {
        memberId: memberId
      },
      fetchPolicy: 'network-only'
    });
    const {member} = memberData ? memberData : {};

    //
    // Save data
    //
    const [saveTestResults, { loading: saveTestResultsLoading, error: saveTestResultsError }] = useMutation(
      SAVETEST,
      {
        update(cache,  { data: { saveTestResults } }) {
          if( saveTestResults.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save own data
    //
    const [saveOwnTestResults, { loading: saveOwnTestResultsLoading, error: saveOwnTestResultsError }] = useMutation(
      SAVEOWNTEST,
      {
        update(cache,  { data: { saveOwnTestResults } }) {
          if( saveOwnTestResults.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Generate test Pdf
    //
    const [generateTestPdf, { loading: generateTestPdfLoading, error: generateTestPdfError }] = useMutation(
      GENERATETESTPDF,
      {
        update(cache,  { data: { generateTestPdf } }) {
          if( generateTestPdf.filename ) {
            (window.cordova && window.cordova.InAppBrowser) ? window.cordova.InAppBrowser.open(generateTestPdf.filename, '_system') : window.open(generateTestPdf.filename, '_blank');
          }
        }
      }
    );

    //
    // Send email with test Pdf
    //
    const [sendTest, { loading: sendTestLoading, error: sendTestError }] = useMutation(
      SENDTEST,
      {
        update(cache,  { data: { sendTest } }) {
          console.log( 'TEST MAIL SENT')
          console.log(sendTest)
          /*
          toggleSendPanelOpen();
          setSnackbarMessage("Plan erfolgreich gesendet !")
          toggleSnackbar();
          */
        }
      }
    );

    //
    // Save comments
    //
    const [saveTestComments, { loading: saveTestCommentsLoading, error: saveTestCommentsError }] = useMutation(
      SAVECOMMENTS,
      {
        update(cache,  { data: { saveTestComments } }) {
          if( saveTestComments.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Save own tests comments
    //
    const [saveOwnTestComments, { loading: saveOwnTestCommentsLoading, error: saveOwnTestCommentsError }] = useMutation(
      SAVEOWNCOMMENTS,
      {
        update(cache,  { data: { saveOwnTestComments } }) {
          if( saveOwnTestComments.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Delte test
    //
    const [deleteTestRecord, { loading: deleteTestRecordLoading, error: deleteTestRecordError }] = useMutation(
      DELETETESTRECORD,
      {
        update(cache,  { data: { deleteTestRecord } }) {
          if( deleteTestRecord.success ) {
            goBack();
          }
        }
      }
    );

    //
    // Delte own test
    //
    const [deleteOwnTestRecord, { loading: deleteOwnTestRecordLoading, error: deleteOwnTestRecordError }] = useMutation(
      DELETEOWNTESTRECORD,
      {
        update(cache,  { data: { deleteOwnTestRecord } }) {
          if( deleteOwnTestRecord.success ) {
            goBack();
          }
        }
      }
    );

    return(
      <WrappedComponent
        memberId={memberId}
        testId={testId}
        testType={testType}

        tests={tests}
        testsLoading={testsLoading}
        testsError={testsError}

        member={member}
        memberLoading={memberLoading}
        memberError={memberError}

        saveTestResults={saveTestResults}
        saveTestResultsLoading={saveTestResultsLoading}
        saveTestResultsError={saveTestResultsError}

        saveOwnTestResults={saveOwnTestResults}
        saveOwnTestResultsLoading={saveOwnTestResultsLoading}
        saveOwnTestResultsError={saveOwnTestResultsError}

        saveTestComments={saveTestComments}
        saveTestCommentsLoading={saveTestCommentsLoading}
        saveTestCommentsError={saveTestCommentsError}

        saveOwnTestComments={saveOwnTestComments}
        saveOwnTestCommentsLoading={saveOwnTestCommentsLoading}
        saveOwnTestCommentsError={saveOwnTestCommentsError}

        deleteTestRecord={deleteTestRecord}
        deleteTestRecordLoading={deleteTestRecordLoading}
        deleteTestRecordError={deleteTestRecordError}

        deleteOwnTestRecord={deleteOwnTestRecord}
        deleteOwnTestRecordLoading={deleteOwnTestRecordLoading}
        deleteOwnTestRecordError={deleteOwnTestRecordError}

        generateTestPdf={generateTestPdf}
        generateTestPdfLoading={generateTestPdfLoading}
        generateTestPdfError={generateTestPdfError}

        sendTest={sendTest}
        sendTestLoading={sendTestLoading}
        sendTestError={sendTestError}

        goBack={goBack}
        goToSetup={goToSetup}
      />
    )
  }

  return DataProvider;

}

export default withData;
