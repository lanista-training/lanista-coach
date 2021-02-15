import styled from 'styled-components';

export const StyledDateLabel = styled.div`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 0.5em;
`;

export const Stage = styled.div`
  font-family: Roboto;
  overflow: visible;
  max-width: 935px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  max-width: 935px;
  position: relative;
  width: 100%;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin: 0 auto;
  height: 100vh;
  justify-content: space-between;
  .dashboard-widget {
    margin-top: 1em;
  }
  .widget-empty-list {
    min-height: 12em;
    display: flex;
    align-items: center;
    padding: 1em;
  }
`;

export const Timeline = styled.div`
  overflow: scroll;
  padding-right: 1em;
  padding-top: 45px;
  float: left;
  max-width: 410px;
  width: 100%;
  scrollbar-width: none;
  .buttons-list {
    display: inline-flex;
    margin-top: 50px;
    padding: 0 25px;
    width: 100%;
    .MuiPaper-root {
      flex: 1;
      height: 100px;
      background-color: white;
      border: 1px solid rgba(0,0,0,.0975);
      border-radius: 15px;
      box-shadow: 0 0 25px 0 #0000001f;
      height: 100%;
      .card-content {
        padding: 15px;
      }
      .card-title {
        font-family: Roboto;
        font-size: 13px;
        font-weight: 900;
        line-height: 11px;
        margin-bottom: 6px;
      }
      .card-text {
        font-family: Roboto;
        font-size: 11px;
        font-weight: 100;
      }
    }
  }
  .empty-feeds-list {
    text-align: center;
    margin-top: 50px;
    color: darkgrey;
  }
`;

export const ToolsSection = styled.div`
  max-width: 275px;
  width: 100%;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  border: 0 solid #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  align-items: flex-end;
  padding-top: 45px;
`;
export const StatisticsSection = styled.div`
  width: 100px;
  display: flex;
  flex-flow: column;
  align-self: center;
`;
export const Card = styled.div`
  background-color: white;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 15px;
  width: 100%;
  max-width: 270px;
  display: flex;
  flex-direction: column;
  height: auto;
  box-shadow: 0 0 27px 0 #0000001f;
}
`;

export const CardContent = styled.div`
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  border: none;
  background: 0 0;
  margin: 0;
  padding: 1em 1em;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 1em;
  border-radius: 0;
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  display: block;
`;

export const CardHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;
export const FeedsTitle = styled.div`
  padding-top: 0.6em;
  padding-bottom: 0.5em;
  color: black;
  position: relative;
  margin-top: 3em;
  padding-left: 1em;
  font-size: 20px;
  font-weight: 900;
  span {
    font-weight: 100;
  }
`;
