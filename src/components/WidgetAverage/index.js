import React from 'react';
import WidgetAverage from './WidgetAverage';
import { withApollo } from '../../lib/apollo';
import { useQuery } from '@apollo/react-hooks';

const Widget = ({query, title, onClick}) => {

  const { data, loading, error } = useQuery(query);
  const absoluteValue = (data && data[Object.getOwnPropertyNames(data)[0]] ? data[Object.getOwnPropertyNames(data)[0]].data : 0)
  const total = (data && data[Object.getOwnPropertyNames(data)[0]] ? data[Object.getOwnPropertyNames(data)[0]].total : 0)

  return (
    <WidgetAverage
      data={(absoluteValue/total).toFixed(2)}
      title={title}
      absoluteValue={total}
      onClick={onClick}
    />
  )
}

export default withApollo(Widget);
