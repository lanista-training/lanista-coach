import * as React from "react";
import Plungins from './Plugins';
import { Query } from "react-apollo"
import { PLUGINS } from "../../queries";

export default function({text, onPluginSelection, pluginFiltersState}) {
  return (
    <Query
      notifyOnNetworkStatusChange={true}
      fetchPolicy='network-only'
      query={PLUGINS}
    >
      {({ data, loading, error }) => {
        return (<Plungins
          data={data && data.plugins ? data.plugins : []}
          loading={loading}
          error={error}
          text={text}
          onPluginSelection={onPluginSelection}
          pluginFiltersState={pluginFiltersState}
        />)
      }}
    </Query>
  );
}
