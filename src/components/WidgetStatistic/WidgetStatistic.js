import React, { Component } from 'react';
import styled from 'styled-components'
import { Statistic } from 'semantic-ui-react'

const StyledWidget = styled(Statistic)`
  padding: 3em 2.5em 0 0;
`;

export default function({t, data, loading, error, title}) {
  return (
    <StyledWidget style={{margin: 0}} size='tiny'>
      <Statistic.Value>{data}</Statistic.Value>
      <Statistic.Label>{title}</Statistic.Label>
    </StyledWidget>
  )
}
