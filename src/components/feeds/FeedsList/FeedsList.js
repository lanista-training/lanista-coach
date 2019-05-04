import * as React from "react";
import Feed from "../Feed";
import { Grid } from 'semantic-ui-react';

export default ({feeds}) => {
  return (
    <Grid verticalAlign='middle' columns={1} centered >
      <Grid.Row>
        <Grid.Column>
        {
          feeds.map((feed, index) => {
            return (
              <Feed key={index} feed={feed}/>
           )
         })
       }
       </Grid.Column>
    </Grid.Row>
   </Grid>
  )
};
