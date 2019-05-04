import * as React from "react";
import styled from 'styled-components';
import moment from "moment";
import { Input } from 'semantic-ui-react';

const Centered  = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-top: 1.2em;
  padding-right: 155px;
`;

export default ({onChange}) => (
  <Centered>
    <Input icon='search' placeholder='Search...' onChange={(event) => onChange(event.target.value)}/>
  </Centered>
);
