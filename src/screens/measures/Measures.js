import * as React from "react";
import { PureComponent } from "react";
import styled from 'styled-components';
import _ from 'lodash';
import { Grid, Tab, Icon, Statistic, List, Image, Modal, Card } from 'semantic-ui-react';
import moment from "moment";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const Stage = styled.div`
  padding-top: 8em!important;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;

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
  .menu {

  }
  .item {
    font-family: Abel;
    font-size: 1.2em!important;
    font-weight: initial!important;
    color: #b1b1b1!important;
    text-align: center!important;
    display: initial!important;
    margin: 0!important;
    padding-left: 1em!important;
    min-width: 12em;
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
const DataTable = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: white!important;
  box-shadow: 0 0.08em 0.25em 0.075em rgba(0,0,0,0.075)!important;
  border-radius: 5px!important;
  position: relative;
  padding-top: 60px;
  background-color: #fff;
  margin-bottom: 110px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  tr {
    font-size: 18px;
    line-height: 1.4;
    padding-right: 10px;
  }
  .firstColumn {
    width: 20%;
    padding-left: 40px;
  }
`;
const TableHeader = styled.div`
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  th {
      padding-top: 18px;
      padding-bottom: 18px;
      text-align: left;
      width: 9%;
  }
`;
const TableContent = styled.div`
  height: 100%;
  overflow: auto;
  position: relative;
  tr {
    border-bottom: 1px solid #f2f2f2;
  }
  td {
    font-size: 15px;
    color: #808080;
    line-height: 1.4;
    padding-top: 16px;
    padding-bottom: 16px;
    width: 9%;
  }
  .firstColumn {
    color: black;
    font-weight: 700;
  }
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const TestType = styled.div`
  padding-bottom: 3em;
  border-top-color: rgb(0, 0, 0);
  border-top-style: solid;
  border-top-width: 1px;
  margin-bottom: 5em;
  .testname {
    font-size: 1.5em;
    font-weight: 700;
    margin: 1em 0;
  }
  .testdescription {
    font-size: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4em;
    max-height: 2.8em;
    min-height: 2.8em;
    margin: 1em 0;
  }
`;

const TestResults = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2.25px 4.5px 0px;
  box-sizing: border-box;
  color: rgb(27, 27, 27);
  display: block;
  font-size: 18px;
  line-height: 26.1px;
  margin-bottom: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  position: relative;
  ul {
    box-sizing: border-box;
    display: block;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    margin-block-end: 0px;
    margin-block-start: 0px;
    margin-bottom: 0px;
    margin-inline-end: 0px;
    margin-inline-start: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    padding-bottom: 0px;
    padding-inline-start: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    text-size-adjust: 100%;
    -webkit-box-direction: normal;
  }
  li {
    border-bottom-color: rgba(0,0,0,0.075);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 18px;
    height: 60.9688px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 26.1px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    padding-bottom: 11.2px;
    padding-left: 14.4px;
    padding-right: 14.4px;
    padding-top: 11.2px;
    position: relative;
    text-align: left;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
  }
  .test-wrapper {
    align-items: center;
    box-sizing: border-box;
    color: rgb(27, 27, 27);
    display: flex;
    font-size: 18px;
    height: 37.5938px;
    justify-content: space-between;
    line-height: 26.1px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    min-height: 32px;
    text-align: left;
    text-size-adjust: 100%;
    -webkit-box-align: center;
    -webkit-box-direction: normal;
    -webkit-box-pack: justify;
  }
  .test-icon {
    align-items: center;
    box-sizing: border-box;
    color: rgb(27, 27, 27);
    display: block;
    flex-grow: 0;
    font-size: 28px;
    height: 28px;
    justify-content: flex-start;
    line-height: 26.1px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    margin-right: 11.2px;
    text-align: left;
    text-size-adjust: 100%;
    width: 28px;
    -webkit-box-align: center;
    -webkit-box-direction: normal;
    -webkit-box-flex: 0;
    -webkit-box-pack: start;
  }
  .test-score {
    align-items: center;
    box-sizing: border-box;
    color: rgb(27, 27, 27);
    display: flex;
    flex-grow: 0;
    font-size: 18px;
    height: 36.75px;
    line-height: 26.1px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    padding-bottom: 2.7px;
    padding-left: 18px;
    padding-right: 0px;
    padding-top: 2.7px;
    text-align: left;
    text-size-adjust: 100%;
    width: 84.3125px;
    -webkit-box-align: center;
    -webkit-box-direction: normal;
    -webkit-box-flex: 0;
  }
  .date-author {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    height: 37.5938px;
    justify-content: flex-start;
    line-height: 26.1px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    overflow-x: hidden;
    overflow-y: hidden;
    text-align: left;
    text-size-adjust: 100%;
    -webkit-box-align: center;
    -webkit-box-direction: normal;
    -webkit-box-flex: 1;
    -webkit-box-pack: start;
  }
  .test-author{
    background-color: rgba(0, 0, 0, 0);
    border-bottom-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    inline-block.cp
    font-style: normal;
    font-weight: 400;
    height: 21.5938px;
    line-height: 18px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    overflow-wrap: break-word;
    overflow-x: hidden;
    overflow-y: hidden;
    padding-bottom: 3.6px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    text-align: left;
    text-decoration-color: rgb(27, 27, 27);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-overflow: ellipsis;
    text-size-adjust: 100%;
    white-space: nowrap;
    width: 707.719px;
    word-break: break-word;
    -webkit-box-direction: normal;
  }
  .test-date {
    box-sizing: border-box;
    color: rgb(116, 116, 116);
    display: block;
    font-size: 16.2px;
    height: 16px;
    line-height: 16.2px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    text-align: left;
    text-size-adjust: 100%;
    width: 707.719px;
    -webkit-box-direction: normal;
  }
`;
const GraphSection = styled.div`
  width: 100%;
  height: 10vh;
  min-height: 200px;
  margin-bottom: 2em;
  .no-data {
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
    justify-content: center;
  }
`;
const TestCard = styled.div`
  min-width: 30vw;
  margin: 1em!important;
  background: #fff;
  padding: 0;
  border-radius: 5px;
  overflow: hidden;
  -webkit-box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  -webkit-transition: -webkit-box-shadow .1s ease,-webkit-transform .1s ease;
  transition: -webkit-box-shadow .1s ease,-webkit-transform .1s ease;
  transition: box-shadow .1s ease,transform .1s ease;
  transition: box-shadow .1s ease,transform .1s ease,-webkit-box-shadow .1s ease,-webkit-transform .1s ease;
  z-index: '';
  .test-content {
    padding: 1em;
  }
  .test-description {
    height: 25vh;
    overflow-y: scroll;
    text-align: justify;
    ::-webkit-scrollbar {
      display: none!important;
    }
  }
  .test-image {
    height: 13em;
    background-size: cover;
    background-position: bottom;
    background-color: #e8e8e8;
  }
  .test-label {
    font-weight: 700;
    font-size: 1.3em;
    line-height: 2.3em;
  }
  .test-select-button{
    line-height: 2.5em!important;
    text-align: center!important;
    background: rgb(155,201,61);
    color: white;
    font-size: 1.3em;
    font-weight: 700;
  }
`;


class CustomizedAxisTick extends PureComponent {

  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-20)">{payload.value}</text>
      </g>
    );
  }
}

class Measures extends React.Component {

  constructor(props) {
    super(props)
    this.prepareWeightData = this.prepareWeightData.bind(this)
    this.prepareTestData = this.prepareTestData.bind(this)
    this.curateGraphData = this.curateGraphData.bind(this)
    this.renderGraphSection = this.renderGraphSection.bind(this)
    this.handleTestClick = this.handleTestClick.bind(this)
  }

  renderGraphSection(testResults) {
    const {t} = this.props
    const {available, graphData} = testResults

    return(
      <GraphSection>
        {available ?
          <ResponsiveContainer>
            <LineChart
              data={graphData}
              margin={{
                top: 40, right: 40, left: 30, bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" height={50} tick={<CustomizedAxisTick />}/>
              <YAxis yAxisId="left" stroke="#91bd09" label={{ value: 'Score', angle: -90, position: 'insideLeft', stroke:'#91bd09' }}/>
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="score" name={t('score')}  stroke="#00A0DC" connectNulls  activeDot={{ r: 8 }}/>
            </LineChart>
          </ResponsiveContainer>
          :
          (<div className="no-data">{t("no_data_for_graph")}</div>)}
      </GraphSection>
    )
  }

  prepareWeightData(rawData) {
    const chartData = []
    if( rawData ) {
      rawData.map( function (measure) {
        chartData.push({
          date: moment(new Date(measure.target_date)).format("DD-MM-YYYY"),
          weight: measure.weight > 0 ? measure.weight : null,
          futrex: measure.futrex > 0 ? measure.futrex : null,
        })
      })
      return chartData
    } else {
      return []
    }
  }

  curateGraphData( testResults ) {
    const data = []
    const graphData = []

    console.log("testResults")
    console.log(testResults)

    testResults.map((test, index) => {
      const rawData = test.results.split('|')
      let testCompleted = true
      rawData.map((testItem) => {
        if( !(testItem > 0) ) {
          testCompleted = false
        }
      })
      test.testCompleted = testCompleted;
      if( testCompleted ) {
        console.log(test)
        data.push( test.score )
        graphData.push( {label: moment(new Date(Number(test.creation_date))).format("DD-MM-YYYY"), score: test.score} )
      }
    })
    return ({
      available: (data.length > 1),
      data: data,
      graphData: graphData
    })
  }

  prepareCaliperData(rawData, gender = 0, birthday) {
    const chartData = []
    const age = isNaN(birthday) ? 32 : moment().diff(parseInt(birthday), 'years')
    if( rawData ) {
      rawData.map( function (measure) {
        const sum = measure.abs + measure.auxiliar + measure.chest + measure.quads + measure.scapula + measure.sprailium + measure.trizeps;
        let fatShare = 0;
        if( sum > 0 ) {
          if( gender === 0 ){
              fatShare =  (Math.round (((4.96/(1.112-0.00043499*sum+0.00000055*sum*sum-0.00028826*age))-4.5)*10000, 4) / 100);
          } else {
              fatShare = (Math.round (((4.96/(1.097-0.00046971*sum+0.00000056*sum*sum-0.00012828*age))-4.51)*10000, 4) / 100);
          }
          chartData.push({
            date: moment(new Date(measure.target_date)).format("DD-MM-YYYY"),
            abs: measure.abs > 0 ? measure.abs : null,
            auxiliar: measure.auxiliar > 0 ? measure.auxiliar : null,
            chest: measure.chest > 0 ? measure.chest : null,
            quads: measure.quads > 0 ? measure.quads : null,
            scapula: measure.scapula > 0 ? measure.scapula : null,
            sprailium: measure.sprailium > 0 ? measure.sprailium : null,
            trizeps: measure.trizeps > 0 ? measure.trizeps : null,
            fatShare: fatShare,
            sum: sum,
          })
        }
      })
      return chartData
    } else {
      return []
    }
  }

  prepareMeasuresData(rawData) {
    const chartData = []
    if( rawData ) {
      rawData.map( function (measure) {
        chartData.push({
          date: moment(new Date(measure.target_date)).format("DD-MM-YYYY"),
          arm_right: measure.arm_right > 0 ? measure.arm_right : null,
          arm_left: measure.arm_left > 0 ? measure.arm_left : null,
          waist: measure.waist > 0 ? measure.waist : null,
          umbilical: measure.umbilical > 0 ? measure.umbilical : null,
          chest: measure.chest > 0 ? measure.chest : null,
          spina_ilica_ant: measure.spina_ilica_ant > 0 ? measure.spina_ilica_ant : null,
          wide_hips: measure.wide_hips > 0 ? measure.wide_hips : null,
          quads_right: measure.quads_right > 0 ? measure.quads_right : null,
          quads_left: measure.quads_left > 0 ? measure.quads_left : null,
          sum: measure.arm_right + measure.arm_left + measure.waist + measure.umbilical + measure.chest + measure.spina_ilica_ant + measure.wide_hips  + measure.quads_right  + measure.quads_left
        })
      })
      return chartData
    } else {
      return []
    }
  }

  prepareTestData(rawData) {
    if( rawData ) {
      const testTypes = _.groupBy(rawData, (test) => test.name)
      return testTypes
    } else {
      return []
    }
  }

  handleTestClick(testData, event) {
    const {goToTest} = this.props
    goToTest(testData)
  }

  render() {
    const {
      showDataAsChart,
      customer,
      t,
      activeIndex,
      handleTabChange,
      showCreateTestMenu,
      closeCreateTestmenu,
      testsTypes,
    } = this.props
    const {measures, calipers, gender, birthday, tests} = customer
    this.prepareTestData(tests)
    const panes = [
      { menuItem: { key: 'weight',  content: t('body data') }, render: () => showDataAsChart ?
        <Tab.Pane style={{ marginTop: "5vh", height: "calc(100vh - 130px - 14em)" }}>
          <ResponsiveContainer>
            <LineChart
              data={this.prepareWeightData(calipers)}
              margin={{
                top: 5, right: 5, left: 20, bottom: -5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" height={50} tick={<CustomizedAxisTick />}/>
              <YAxis yAxisId="left" stroke="#91bd09" label={{ value: t('weight_in_kg'), angle: -90, position: 'insideLeft', stroke:'#91bd09' }}/>
              <YAxis yAxisId="right" orientation="right" stroke="#8884d8" label={{ value: t('fat_share_in_percentage'), angle: 90, position: 'insideRight', stroke:'#8884d8' }}/>
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#91bd09" connectNulls  activeDot={{ r: 8 }} unit=" Kg."/>
              <Line yAxisId="right" type="monotone" dataKey="futrex" stroke="#8884d8" connectNulls activeDot={{ r: 8 }} unit=" %"/>
            </LineChart>
          </ResponsiveContainer>
        </Tab.Pane>
        :
        <Tab.Pane style={{ height: "calc((100vh - 130px) - 9em)" }}>
          <div style={{padding: "2em", height: "100%"}}>
            <DataTable>
              <TableHeader>
                <table>
                  <tbody>
                    <tr>
                      <th className="firstColumn" style={{width: "10%"}}>Date</th>
                      <th>{t('weight')}</th>
                      <th>{t('futrex')}</th>
                    </tr>
                  </tbody>
                </table>
              </TableHeader>
              <TableContent>
                <table>
                  <tbody>
                    {
                      this.prepareWeightData(calipers).map(item => {
                        return (
                          <tr>
                            <td className="firstColumn" style={{width: "10%"}}>{item.date}</td>
                            <td>{item.weight} mm</td>
                            <td>{item.futrex} mm</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </TableContent>
            </DataTable>
          </div>
        </Tab.Pane>
      },
      { menuItem: { key: 'caliper',  content: t('caliper') }, render: () => showDataAsChart ?
        <Tab.Pane style={{ marginTop: "5vh", height: "calc(100vh - 130px - 14em)" }}>
          <ResponsiveContainer>
            <LineChart
              data={this.prepareCaliperData(calipers, gender, birthday)}
              margin={{
                top: 5, right: 5, left: 20, bottom: -5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" height={50} tick={<CustomizedAxisTick />}/>
              <YAxis yAxisId="left" stroke="#91bd09" label={{ value: 'Messung in mm', angle: -90, position: 'insideLeft', stroke:'#91bd09' }}/>
              <YAxis yAxisId="right" orientation="right" stroke="#8884d8" label={{ value: t("measure_in_mm"), angle: 90, position: 'insideRight', stroke:'#8884d8' }}/>
              <Tooltip />
              <Legend wrapperStyle={{paddingTop: "30px"}}/>
              <Line yAxisId="left" type="monotone" dataKey="abs" name={t('ab')} stroke="#00A0DC" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="auxiliar" name={t('armpitt')} stroke="#8D6CAA" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="chest" name={t('chest')} stroke="#DC5142" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="quads" name={t('quads')} stroke="#E68523" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="scapula" name={t('scapula')} stroke="#00AEB3" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="sprailium" name={t('iliac_creat')} stroke="#ECB220" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="trizeps" name={t('triceps')} stroke="#DC4B88" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="right" type="monotone" dataKey="fatShare" name={t('calipermetrie')} stroke="#8884d8" strokeWidth={4} connectNulls activeDot={{ r: 8 }} unit=" %"/>
              <Line yAxisId="left" type="monotone" dataKey="sum" name={t('sum')} stroke="#91bd09" strokeWidth={4} connectNulls activeDot={{ r: 8 }} unit=" mm."/>
            </LineChart>
          </ResponsiveContainer>
        </Tab.Pane>
        :
        <Tab.Pane style={{ height: "calc((100vh - 130px) - 9em)" }}>
          <div style={{padding: "2em", height: "100%"}}>
            <DataTable>
              <TableHeader>
                <table>
                  <tbody>
                    <tr>
                      <th className="firstColumn" style={{paddingBottom: "0", paddingTop: "2em"}}>Date</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em" }}>{t('ab')}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('armpitt')}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('chest')}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('quads')}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('scapula')}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('iliac_creat')}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('triceps')}</th>
                      <th style={{paddingBottom: "0", paddingTop: "2em"}}>{t('sum')}</th>
                      <th style={{paddingBottom: "0", paddingTop: "1em", lineHeight: "1em"}}>{t('calipermetrie')}</th>
                    </tr>
                  </tbody>
                </table>
              </TableHeader>
              <TableContent style={{marginTop:"2em", paddingBottom: "2em"}}>
                <table>
                  <tbody>
                    {
                      this.prepareCaliperData(calipers, gender, birthday).map(item => {
                        return (
                          <tr>
                            <td className="firstColumn">{item.date}</td>
                            <td>{item.abs} mm</td>
                            <td>{item.auxiliar} mm</td>
                            <td>{item.chest} mm</td>
                            <td>{item.quads} mm</td>
                            <td>{item.scapula} mm</td>
                            <td>{item.sprailium} mm</td>
                            <td>{item.trizeps} mm</td>
                            <td>{item.sum} mm</td>
                            <td>{item.fatShare} mm</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </TableContent>
            </DataTable>
          </div>
        </Tab.Pane>
      },
      { menuItem: { key: 'anamnese',  content: t('body circumferences') }, render: () => showDataAsChart ?
        <Tab.Pane style={{ marginTop: "5vh", height: "calc(100vh - 130px - 14em)" }}>
          <ResponsiveContainer>
            <LineChart
              data={this.prepareMeasuresData(measures)}
              margin={{
                top: 5, right: 5, left: 20, bottom: -5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" height={50} tick={<CustomizedAxisTick />}/>
              <YAxis yAxisId="left" stroke="#91bd09" label={{ value: 'Messung in mm', angle: -90, position: 'insideLeft', stroke:'#91bd09' }}/>
              <Tooltip />
              <Legend wrapperStyle={{paddingTop: "30px"}}/>
              <Line yAxisId="left" type="monotone" dataKey="arm_right" name={t('arm_right')}  stroke="#00A0DC" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="arm_left" name={t('arm_left')}  stroke="#8D6CAA" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="waist" name={t('waist')}  stroke="#DC5142" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="umbilical" name={t('umbilical')}  stroke="#E68523" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="chest" name={t('chest')}  stroke="#00AEB3" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="spina_ilica_ant" name={t('spina_ilica_ant')}  stroke="#ECB220" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="wide_hips" name={t('wide_hips')}  stroke="#DC4B88" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="quads_right" name={t('quads_right')}  stroke="#DC4B88" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="quads_left" name={t('quads_left')}  stroke="#DC4B88" connectNulls  activeDot={{ r: 8 }} unit=" mm."/>
              <Line yAxisId="left" type="monotone" dataKey="sum" name={t('sum')}  stroke="#91bd09" connectNulls strokeWidth={4}  activeDot={{ r: 8 }} unit=" mm."/>
            </LineChart>
          </ResponsiveContainer>
        </Tab.Pane>
        :
        <Tab.Pane style={{ height: "calc((100vh - 130px) - 9em)" }}>
          <div style={{padding: "2em", height: "100%"}}>
            <DataTable>
              <TableHeader>
                <table>
                  <tbody>
                    <tr>
                      <th className="firstColumn" style={{width: "12%"}}>Date</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("arm_right")}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("arm_left")}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("waist")}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("umbilical")}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("chest")}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("spina_ilica_ant")}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("wide_hips")}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("quads_right")}</th>
                      <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("quads_left")}</th>
                      <th>{t("sum")}</th>
                    </tr>
                  </tbody>
                </table>
              </TableHeader>
              <TableContent style={{marginTop:"2em", paddingBottom: "2em"}}>
                <table>
                  <tbody>
                    {
                      this.prepareMeasuresData(measures).map(item => {
                        return (
                          <tr>
                            <td className="firstColumn" style={{width: "12%", fontSize: "14px"}}>{item.date}</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.arm_right} mm</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.arm_left} mm</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.waist} mm</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.umbilical} mm</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.chest} mm</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.spina_ilica_ant} mm</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.wide_hips} mm</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.quads_right} mm</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.quads_left} mm</td>
                            <td style={{width: "6%", fontSize: "13px"}}>{item.sum} mm</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </TableContent>
            </DataTable>
          </div>
        </Tab.Pane>
      },
      { menuItem: { key: 'measures',  content: t('testings') }, render: () =>
        <Tab.Pane>
          <div style={{padding: "2em", height: "100%"}}>
            {
              tests.map((test,index) => {
                const curatedData = this.curateGraphData(test.testresults)
                return (
                  <TestType>
                      <div className="testname">{test.name}</div>
                      <div className="testdescription">{test.description}</div>

                    {
                       this.renderGraphSection(curatedData)
                    }
                    <TestResults>
                      <ul>
                        {
                          test.testresults.map((testResult, index) => {
                            return(
                              <li onClick={(event) => this.handleTestClick(testResult, event)}>
                                <div className="test-wrapper">
                                  {testResult.testCompleted ? <Icon name='icon-done test-icon' /> : <Icon name='icon-undone test-icon' />}
                                  <div className="date-author">
                                    <div className="test-author">{testResult.creator_full_name}</div>
                                    <div className="test-date">{ moment(new Date(Number(testResult.creation_date))).format("DD-MM-YYYY") }</div>
                                  </div>
                                  <div className="test-score">{testResult.score}</div>
                                </div>

                              </li>
                            )
                          })
                        }
                      </ul>
                    </TestResults>
                  </TestType>
                )
              })
            }
          </div>
        </Tab.Pane>
      },
    ]

    const extra = (
      <a>
        <Icon name='user' />
        16 Friends
      </a>
    )

    console.log( testsTypes )

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
        <Modal dimmer={true} open={showCreateTestMenu} onClose={closeCreateTestmenu}>
          <Modal.Header>Select a Test</Modal.Header>
          <Modal.Content className="hide-scrollbar" style={{overflowX: "scroll", display: "flex"}}>
            <div style={{display: "flex", paddingRight: "1.5em"}}>
              {testsTypes && testsTypes.map((test, index) => {
                return (<TestCard>
                  <div className="test-image" style={{backgroundImage: 'url(https://lanista-training.com/app/resources/images/tests/' + test.id + '.jpg)'}}></div>
                  <div className="test-content">
                    <div className="test-label">{test.name}</div>
                    <div className="test-description">{test.description}</div>
                  </div>
                  <div onClick={() => {closeCreateTestmenu()}} className="test-select-button">
                    Select Test
                  </div>
                </TestCard>)
              })}
            </div>
          </Modal.Content>
        </Modal>
      </Stage>
    );
  }
};

export default Measures;
