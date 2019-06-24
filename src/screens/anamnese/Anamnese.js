import * as React from "react";
import styled from 'styled-components';
import _ from 'lodash';
import { Grid, Tab, Icon, Statistic, List, Image } from 'semantic-ui-react';
import moment from "moment";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const Stage = styled.div`
  padding-top: 6em!important;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const StyledTab = styled(Tab)`
  width: 100%;
  height: 100%;
  .ui.grid {
    margin: initial!important;
  }
  .ui.grid .column {
    margin: 0!important;
    padding: 0!important;
  }
  .item {
    font-family: Abel;
    font-size: 1.1em!important;
    font-weight: initial!important;
    color: #b1b1b1!important;
    text-align: center!important;
    display: initial!important;
    margin: 0!important;
    padding-left: 1em!important;
    min-width: 8.5em;
    line-height: 2em!important;
  }
  .item.active {
    color: black!important;
    font-weight: 700!important;
  }
  .tab {
    border: none!important;
    background-color: transparent;
    padding: 0!important;
    overflow: hidden;
    height: 100%;
  }
`;
const StyledAnamneseList = styled.div`
  height: 100%;
  .anamnese-input-field {
    input {
      width: 100%;
      background-color: #efefef;
      -webkit-text-fill-color: initial!important;
      min-height: 2.5em;
      border-width: 0;
      -webkit-appearance: none;
      border-radius: 5px;
      padding: 1em;
      ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: grey;
        opacity: 0.5; /* Firefox */
      }
    }
  }
  .anamnese-list {
    width: 100%;
    height: 100%;
    margin-top: 1em;
    background-color: #efefef;
    border-radius: 5px;
    .empty-list {
      padding-top: 24%;
      text-align: center;
    }
    .anamnese-item {
      min-height: 85px !important;
      display: block;
      padding: 1em;
      border-bottom: #b6b6b6 !important;
      border-bottom-style: dotted!important;
      border-bottom-width: 1px!important;
      .anamnese-info {
        float: left;
        .anamnese-description {
          font-size: 1.4em;
          line-height: 1.4em;
          font-weight: 700;
        }
        .anamnese-intensity {
          line-height: 3em;
        }
      }
      .anamnese-extra-info {
        float: right;
        color: #4aacd8;
        text-align: right;
        .anamnese-creation-date{
          font-size: 1.4em;
          line-height: 1.4em;
        }
        .anamnese-creator{
          line-height: 3em;
        }
      }
    }
  }
`;

function AnamneseList( {data, placeholder, emptytext, intensity} ) {
  return (
    <StyledAnamneseList>
      <div className="anamnese-input-field">
        <input  type="text" placeholder={placeholder}/>
      </div>
      <div className="anamnese-list">
        { (data === undefined || data.map === undefined || data.length === 0) && <div className="empty-list">{emptytext}</div> }
        { data && data.map && data.length > 0 && data.map( (item, index) => (
          <div className="anamnese-item">
            <div className="anamnese-info">
              <div className="anamnese-description">{item.description}</div>
              <div className="anamnese-intensity">{intensity}: {item.rating ? item.rating : 0}</div>
            </div>
            <div className="anamnese-extra-info">
              <div className="anamnese-creation-date">{moment(new Date(parseInt(item.creation_date))).format("DD-MM-YYYY")}</div>
              <div className="anamnese-creator">{item.creator_full_name}</div>
            </div>
          </div>
        )) }
      </div>
    </StyledAnamneseList>
  )
}

class Anamnese extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  render() {
    const {customer, t, activeIndex, handleTabChange} = this.props;
    const {goals, drugs, sport_activities, lifestyles, physios} = customer;

    const panes = [
      { menuItem: { key: 'injuries',  content: t('injuries') }, render: () =>
        <Tab.Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
          <div style={{alignItems: "center", height: "100%", alignContent: "center", textAlign: "center", background: "white"}}>
            <img src="https://lanistacoach.s3.amazonaws.com/static/img/front_side_back_skele.jpg" alt="Smiley face" height="100%" width="auto"/>
          </div>
        </Tab.Pane>
      },
      { menuItem: { key: 'ailment',  content: t('ailment') }, render: () =>
        <Tab.Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
          <AnamneseList
            data={lifestyles}
            placeholder={t("ailment input placeholder")}
            emptytext={t("ailment emtpy list")}
            intensity={t("intensity")}
          />
        </Tab.Pane>
      },
      { menuItem: { key: 'drugs',  content: t('drugs') }, render: () =>
        <Tab.Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
          <AnamneseList
            data={drugs}
            placeholder={t("drugs input placeholder")}
            emptytext={t("drugs emtpy list")}
            intensity={t("dosis")}
          />
        </Tab.Pane>
      },
      { menuItem: { key: 'sport activities',  content: t('sport activities') }, render: () =>
        <Tab.Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
          <AnamneseList
            data={sport_activities}
            placeholder={t("sport activities input placeholder")}
            emptytext={t("sport activities emtpy list")}
            intensity={t("regularity")}
          />
        </Tab.Pane>
      },{ menuItem: { key: 'goals',  content: t('goals') }, render: () =>
        <Tab.Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
          <AnamneseList
            data={goals}
            placeholder={t("goals input placeholder")}
            emptytext={t("goals emtpy list")}
            intensity={t("intensity")}
          />
        </Tab.Pane>
      },{ menuItem: { key: 'physio',  content: t('physio') }, render: () =>
        <Tab.Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
          <AnamneseList
            data={physios}
            placeholder={t("physio input placeholder")}
            emptytext={t("physio emtpy list")}
            intensity={t("intensity")}
          />
        </Tab.Pane>
      },
    ]

    return(
      <Stage>
        <StyledTab
          menu={{
            fluid: true,
            text: true,
          }}
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
        />
      </Stage>
    );
  }
};

export default Anamnese;
