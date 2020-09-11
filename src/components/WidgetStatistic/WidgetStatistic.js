import React, { Component } from 'react';
import styled from 'styled-components'

const StyledWidget = styled.div`
  display: flex;
  padding: 15px;
  flex-flow: column;
  align-items: center;
  .statistic-value {
    font-size: 30px;
    font-weight: 900;
    margin-top: 10px;
  }
  .statistic-title {
    margin-top: 0.5em;
    font-weight: 100;
    color: #9e9e9e;
    font-size: 13px;
    text-align: center;
    line-height: 15px;
  }
  .statistic-message {
    text-align: center;
    font-weight: 700;
    font-size: 12px;
  }
`;

export default function({
  t,
  data,
  loading,
  error,
  title,
  onClick,
}) {
  return (!loading &&
    <StyledWidget style={{margin: 0}} size='tiny' onClick={onClick}>
      { data > -1 &&
        <div className="statistic-value">{data}</div>
      }
      { data == -1 &&
        <div className="statistic-message">{t("data_not_avaiable")}</div>
      }
      <div className="statistic-title">{title}</div>
    </StyledWidget>
  )
}
