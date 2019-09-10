import MessagesButton from './MessagesButton';
import { Query } from "react-apollo"
import { MESSAGES } from "../../queries";

export default function({query, t, filter, title}) {
  return (
    <Query
      notifyOnNetworkStatusChange={true}
      fetchPolicy='network-only'
      query={MESSAGES}
    >
      {({ data, loading, error }) => {
        return (<MessagesButton
          data={data && data.messages && data.messages.data ? data.messages.data : []}
          loading={loading}
          error={error}
        />)
      }}
    </Query>
  );
}
