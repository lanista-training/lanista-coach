import WidgetProgressbar from './WidgetProgressbar'
import { Query } from "react-apollo"

export default function({query, title}) {
  return (
    <Query
      notifyOnNetworkStatusChange={true}
      fetchPolicy='network-only'
      query={query}
    >
      {({ data, loading, error }) => {
        const absoluteValue = (data && data[Object.getOwnPropertyNames(data)[0]] ? data[Object.getOwnPropertyNames(data)[0]].data : 0)
        const total = (data && data[Object.getOwnPropertyNames(data)[0]] ? data[Object.getOwnPropertyNames(data)[0]].total : 0)
        return (
          <WidgetProgressbar data={Math.floor( absoluteValue /total*100)} title={title} absoluteValue={absoluteValue}/>
        )
      }}
    </Query>
  );
}
