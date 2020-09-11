import * as React from "react";
import styled from 'styled-components';
import moment from "moment";
import { Input } from 'semantic-ui-react';

const Centered  = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-top: 0.8em;
  padding-right: 155px;
`;

export default ({onChange, value}) => {
  return(
    <Centered>
      <Input
        icon='search'
        placeholder='Search...'
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        value={value}
      />
    </Centered>
  )
};
