import WidgetList from './WidgetList'
import { Query } from "react-apollo"

export default function({query, t, filter, title}) {
  return (
    <Query
      notifyOnNetworkStatusChange={true}
      fetchPolicy='network-only'
      query={query}
      variables={{filter: filter}}
    >
      {({ data, loading, error }) => {
        return (<WidgetList
          data={data}
          loading={loading}
          error={error}
          t={t}
          title={title}
        />)
      }}
    </Query>
  );
}
