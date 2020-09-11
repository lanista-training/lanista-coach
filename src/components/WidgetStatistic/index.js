import React from 'react';
import WidgetStatistic from './WidgetStatistic';
import { withApollo } from '../../lib/apollo';
import { useQuery } from '@apollo/react-hooks';

import { Query } from "react-apollo"

 const Widget = function({t, query, title, onClick}) {

   const { data, loading, error } = useQuery(query, {
     fetchPolicy: 'network-only',
     notifyOnNetworkStatusChange: true,
    });

  return (
    <WidgetStatistic
      data={data && data[Object.getOwnPropertyNames(data)[0]] ? data[Object.getOwnPropertyNames(data)[0]].data : 0}
      title={title}
      loading={loading}
      error={error}
      t={t}
      onClick={onClick}
    />
  );
}

export default withApollo(Widget);
