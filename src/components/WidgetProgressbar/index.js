import React from 'react';
import WidgetProgressbar from './WidgetProgressbar';
import { withApollo } from '../../lib/apollo';
import { useQuery } from '@apollo/react-hooks';

const Widget = ({query, title, onClick}) => {

  const { data, loading, error } = useQuery(query);
  const absoluteValue = (data && data[Object.getOwnPropertyNames(data)[0]] ? data[Object.getOwnPropertyNames(data)[0]].data : 0);
  const total = (data && data[Object.getOwnPropertyNames(data)[0]] ? data[Object.getOwnPropertyNames(data)[0]].total : 0);

  const average = Math.floor( absoluteValue /total*100);

  return (
    <WidgetProgressbar
      data={isNaN(average) ? 0 : average}
      title={title}
      absoluteValue={absoluteValue}
      onClick={onClick}
    />
  );

}

export default withApollo(Widget);
