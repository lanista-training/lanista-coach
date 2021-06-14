import React from 'react';
import Calender from './Calender';
import { withApollo } from '../../lib/apollo';
import { useQuery } from '@apollo/client';
import { CALENDARENTRIES } from "../../queries";

const Panel = ({t, selectedDay, setSelectedDay}) => {

  const { data, loading, error, fetchMore } = useQuery(CALENDARENTRIES, {
    fetchPolicy: 'network-only',
    variables: {
      day: selectedDay,
    }
  });

  return (<Calender
    selectedDay={selectedDay}
    setSelectedDay={setSelectedDay}
    data={data && data.calendarEntries ? data.calendarEntries.data : []}
    t={t}
  />);

}

export default withApollo(Panel);
