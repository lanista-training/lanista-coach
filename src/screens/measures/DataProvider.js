import React, { useEffect, useState } from 'react';
import { withApollo } from '../../lib/apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import moment from "moment";
import Router from 'next/router';
import { MEMBER_MEASURES, TESTS } from "../../queries";
import { SAVEVALUES, CREATETESTRECORD, GENERATEMEASURESPDF, SENDMEASURESPDF } from "../../mutations";

const TABINDEX = gql`
  {
    tabIndex @client
  }
`;

const withData = (WrappedComponent, {memberId, goBack, goToTest, goToSetup}) => {

  const DataProvider = () => {
    //
    // Tab management
    //
    const { data: localData, error, client } = useQuery(TABINDEX);
    const [tabIndex, setTabIndex] = useState(0);
    useEffect(() => {
      if( tabIndex >= 0 ) {
        client.writeData({ data: { tabIndex: tabIndex } });
      }
    }, [tabIndex]);
    useEffect(() => {
      if( localData && localData.tabIndex  && localData.tabIndex  != tabIndex ) {
        if( localData.tabIndex > 3 ) {
          setTabIndex(0);
        } else {
          setTabIndex(localData.tabIndex);
        }
      }
    }, [localData]);

    //
    // Tests data
    //
    const {
      data: testsData,
      loading: testsLoading,
      error: testsError,
    } = useQuery(TESTS);
    const {tests} = testsData ? testsData : { tests: undefined };

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
    const [saveValues, { loading: saveValuesLoading, error: saveValuesError }] = useMutation(
      SAVEVALUES,
      {
        update(cache,  { data: { saveValues } }) {
          if( saveValues.success ) {
            refetch();
          }
        }
      }
    );

    //
    // Create test
    //
    const [createTestRecord, { loading: createTestLoading, error: createTestError }] = useMutation(
      CREATETESTRECORD,
      {
        update(cache,  { data: { createTestRecord } }) {
          if( createTestRecord.success ) {
            // jump to the test
            Router.push({
              pathname: '/test',
              query: {
                memberId: memberId,
                testType: createTestRecord.testType,
                testId: createTestRecord.testRecordId,
              }
            });
          }
        }
      }
    );

    const [generateMeasuresPdf, { loading: generateMeasuresPdfLoading, error: generateMeasuresPdfError }] = useMutation(
      GENERATEMEASURESPDF,
      {
        update(cache,  { data: { generateMeasuresPdf } }) {
          window.open(generateMeasuresPdf.filename,'_blank');
        }
      }
    );

    const [sendMeasuresPdf, { loading: sendMeasuresPdfLoading, error: sendMeasuresPdfError }] = useMutation(
      SENDMEASURESPDF,
      {
        update(cache,  { data: { sendMeasuresPdf } }) {
          console.log("sendMeasuresPdf");
          console.log(sendMeasuresPdf);
        }
      }
    );

    return(
      <WrappedComponent
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}

        memberId={memberId}

        tests={tests}
        testsLoading={testsLoading}
        testsError={testsError}

        member={member}
        memberLoading={memberLoading}
        memberError={memberError}

        saveValues={saveValues}
        saveValuesLoading={saveValuesLoading}
        saveValuesError={saveValuesError}

        createTest={createTestRecord}
        createTestLoading={createTestLoading}
        createTestError={createTestError}

        generateMeasuresPdf={generateMeasuresPdf}
        generateMeasuresPdfLoading={generateMeasuresPdfLoading}
        generateMeasuresPdfError={generateMeasuresPdfError}

        sendMeasuresPdf={sendMeasuresPdf}
        sendMeasuresPdfLoading={sendMeasuresPdfLoading}
        sendMeasuresPdfError={sendMeasuresPdfError}

        goBack={goBack}
        goToTest={goToTest}
        goToSetup={goToSetup}
      />
    )
  }

  return withApollo(DataProvider);

}

export default withData;
