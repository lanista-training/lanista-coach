import React, { Component } from 'react';
import styled from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'

const StyledProgressbar = styled.div`
  display: flex;
  flex-flow: column;
  padding: 20px;
  .statistic-title {
    margin-top: 0.5em;
    font-weight: 100;
    color: #9e9e9e;
    font-size: 13px;
    text-align: center;
    line-height: 13px;
  }
  .CircularProgressbar {
    width: 100%;
    vertical-align: middle;
  }

  .CircularProgressbar .CircularProgressbar-path {
    stroke: #9E9EA7;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease 0s;
  }

  .CircularProgressbar .CircularProgressbar-trail {
    stroke: #d6d6d6;
    stroke-linecap: round;
  }

  .CircularProgressbar .CircularProgressbar-text {
    fill: back;
    font-size: 20px;
    font-weight: 900;
    dominant-baseline: middle;
    text-anchor: middle;
  }

  .CircularProgressbar .CircularProgressbar-background {
    fill: #d6d6d6;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-background {
    fill: #3e98c7;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text {
    fill: #fff;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path {
    stroke: #fff;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail {
    stroke: transparent;
  }
`;

export default function({t, data, loading, error, title, absoluteValue, onClick}) {
  return (
    <StyledProgressbar onClick={onClick}>
      <CircularProgressbar value={data} text={`${data}%`} />
      <div className="statistic-title">{title} [{absoluteValue}]</div>
    </StyledProgressbar>
  )
}
