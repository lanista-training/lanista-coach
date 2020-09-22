import React, { useEffect, useState } from 'react';
import { withApollo } from '../../lib/apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { OWNTESTS, TESTS } from "../../queries";
import { DEFINETEST, REMOVETEST } from "../../mutations";

const withData = (WrappedComponent, {testId, goBack, goToTest, goToSetup}) => {

  const DataProvider = () => {

    //
    // Tests data
    //
    const {
      data: ownTestsData,
      loading: ownTestsLoading,
      error: ownTestsError,
      refetch,
    } = useQuery(OWNTESTS,{
      fetchPolicy: 'network-only',
    });
    const {ownTests} = ownTestsData ? ownTestsData : [];
    const { refetch: refetchLanistaTests } = useQuery(TESTS);
    //
    // Save data
    //
    const [defineTest, { loading: defineTestLoading, error: defineTestError }] = useMutation(
      DEFINETEST,
      {
        update(cache,  { data: { defineTest } }) {
          if( defineTest.success ) {
            refetch();
            refetchLanistaTests();
          }
        }
      }
    );

    //
    // Delete data
    //
    const [removeTest, { loading: removeTestLoading, error: removeTestError }] = useMutation(
      REMOVETEST,
      {
        update(cache,  { data: { removeTest } }) {
          if( removeTest.success ) {
            refetch();
            refetchLanistaTests();
          }
        }
      }
    );


    return(
      <WrappedComponent

        testId={testId}

        tests={ownTests}
        testsLoading={ownTestsLoading}
        testsError={ownTestsError}

        defineTest={defineTest}
        defineTestLoading={defineTestLoading}
        defineTestError={defineTestError}

        removeTest={removeTest}
        removeTestLoading={removeTestLoading}
        removeTestError={removeTestError}

        goBack={goBack}
        goToTest={goToTest}
        goToSetup={goToSetup}

      />
    )
  }

  return withApollo(DataProvider);

}

export default withData;
