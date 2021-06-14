import React from 'react';
import WidgetList from './WidgetList';
import { withApollo } from '../../lib/apollo';
import { useQuery } from '@apollo/client';

const Widget = ({query, t, filter, title, openMember}) => {

  console.log("Widget", query, filter)

  const { data, loading, error } = useQuery(query, {
    variables: {
      filter: filter,
    }
  });

  return (<WidgetList
    data={data}
    loading={loading}
    error={error}
    t={t}
    title={title}
    openMember={openMember}
  />);

}

export default withApollo(Widget);
