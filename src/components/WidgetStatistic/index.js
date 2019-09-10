import WidgetStatistic from './WidgetStatistic'

import { Query } from "react-apollo"

export default function({query, title}) {
  return (
    <Query
      notifyOnNetworkStatusChange={true}
      fetchPolicy='network-only'
      query={query}
    >
      {({ data, loading, error }) => {
        return (
          <WidgetStatistic
            data={data && data[Object.getOwnPropertyNames(data)[0]] ? data[Object.getOwnPropertyNames(data)[0]].data : 0}
            title={title}
          />
        )
      }}
    </Query>
  );
}
