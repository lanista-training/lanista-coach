import React, { Component } from 'react';
import styled from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'

const StyledProgressbar = styled.div`
  padding: 3em 2.5em 0 0;
  .statistic-title {
    text-align: center;
  }
`;

export default function({t, data, loading, error, title, absoluteValue}) {
  return (
    <StyledProgressbar>
      <CircularProgressbar value={data} text={`${data}%`} />
      <div className="statistic-title">{title} [{absoluteValue}]</div>
    </StyledProgressbar>
  )
}
