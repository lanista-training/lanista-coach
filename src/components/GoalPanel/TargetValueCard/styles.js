import styled from 'styled-components';

export const Card = styled.div`
  width: 15em;
  height: 17em;
  padding: 1em;
  border-radius: 10px;
  background: rgb(203, 14, 47);
  color: white;
  margin: 0 2em;
  display: flex;
  flex-flow: column;
  .cero-progress .CircularProgressbar .CircularProgressbar-trail {
    stroke: #bd848e!important;
  }
  .info-section {
    flex: 1;
    display: flex;
    flex-flow: row;
    .values-section {
      flex: 1;
      display: flex;
      flex-flow: column;
      font-size: 0.9em;
      font-family: Roboto;
      .current-value {
        flex: 2;
        font-size: 1.2em;
        .value {
          font-size: 1.5em;
          font-weight: 900;
        }
        .title {
          font-weight: normal;
          font-size: 1em;
        }
        span {
          font-size: 0.7em;
          font-weight: 100;
        }
      }
      .target-value{
        flex: 2;
        font-size: 0.8em;
        padding-top: 2em;
        .value {
          font-size: 1.5em;
          font-weight: 900;
        }
        .title {
          font-weight: normal;
          font-size: 1em;
        }
        span{
          font-size: 0.7em;
          font-weight: 100;
        }
      }
    }
    .progress-section {
      flex: 1;
    }
  }
  .chart-section {
    flex: 2;
  }
`;

export const StyledProgressbar = styled.div`
  .statistic-title {
    text-align: center;
  }
  .CircularProgressbar {
    width: 100%;
    vertical-align: middle;
  }

  .CircularProgressbar .CircularProgressbar-path {
    stroke: white;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease 0s;
  }

  .CircularProgressbar .CircularProgressbar-trail {
    stroke: transparent;
    stroke-linecap: round;
  }

  .CircularProgressbar .CircularProgressbar-text {
    fill: white;
    font-size: 20px;
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
