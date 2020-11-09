import * as React from "react";
import Plungins from './Plugins';

import { PLUGINS } from "../../queries";
import { withApollo } from '../../lib/apollo';
import { useQuery } from '@apollo/react-hooks';

const Filter = ({text, onPluginSelection, pluginFiltersState}) => {

  const { data, loading, error } = useQuery(PLUGINS);

  console.log("plugins", data, error, loading);

  return (
    <Plungins
      data={data && data.plugins ? data.plugins : []}
      loading={loading}
      error={error}
      text={text}
      onPluginSelection={onPluginSelection}
      pluginFiltersState={pluginFiltersState}
    />
  );
}

export default withApollo(Filter);
