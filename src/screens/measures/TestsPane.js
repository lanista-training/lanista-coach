import React, { useEffect, useState } from 'react';
import moment from "moment";
import { Tab, Icon } from 'semantic-ui-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomizedAxisTick from './CustomizedAxisTick';
import CustomTooltip from './CustomTooltip';
import { TestCard, GraphSection, TestResults, TestType, TestPane } from './styles';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const curateGraphData = ( testResults ) => {
  const data = []
  const graphData = []

  testResults.map((test, index) => {
    const rawData = test.results.split('|')

    let testCompleted = 0;
    rawData.map((testItem) => {
      if( testItem > 0 )  {
        testCompleted++;
      }
    })
    test.testCompleted = Math.ceil(testCompleted / rawData.length * 100);
    //if( test.testCompleted == 100 ) {

    if( test.testCompleted > 1 ) {
      data.push( test.score )
      graphData.push( {label: moment(new Date(Number(test.creation_date))).format("DD-MM-YYYY"), score: parseInt(test.score)} )
    }
  })

  return ({
    available: (data.length > 1),
    data: data,
    graphData: graphData
  })
}

const CustomizedLabel = ({x, y, stroke, value}) => {
  return <text x={x} y={y-10} dy={-4} fill="black" fontSize={15} textAnchor="middle">{value}</text>;
}

const renderGraphSection = (testResults, t, withScore) => {
  const {available, graphData, testtype} = testResults;
  return(
    <GraphSection>
      {available ?
        <ResponsiveContainer>
          <LineChart
            data={graphData.reverse()}
            margin={{
              top: 10, right: 40, left: 30, bottom: 0,
            }}
          >
            <XAxis dataKey="label" hide={true}/>
            <Line yAxisId="left" type="monotone" dataKey="score" name={t('score')}  strokeWidth={2} stroke="black" connectNulls label={<CustomizedLabel />}/>
          </LineChart>
        </ResponsiveContainer>
        :
        (<div className="no-data">{withScore ? t("no_data_for_graph") : t("no_score_available")}</div>)}
    </GraphSection>
  )
}

export default ({
  t,
  tests,
  goToTest,
}) => {

  const handleTestClick = (testData, event) => {
    goToTest(testData)
  }

  return <TestPane>
  {
    tests && tests.length === 0 ? (
      <div className="empty-list">{t("empty_list")}</div>
    )
    :
    tests && tests.map((test,index) => {
      const curatedData = test.withScore ? curateGraphData(test.testresults) : {available: false}
      return (
        <TestType key={"test-name-" + test.name}>
          <div className="testname">{test.name}</div>
          <div className="testdescription">{test.description}</div>
          {
             renderGraphSection(curatedData, t, test.withScore)
          }
          <TestResults>
            <ul>
              {
                test.testresults.map((testResult, index) => {
                  return(
                    <li onClick={(event) => handleTestClick(testResult, event)}>
                      <div className="test-wrapper">
                        <div className="test-progress">
                          <CircularProgress variant="static" className={testResult.testCompleted > 0 ? "test-started" : "test-not-started"} value={testResult.testCompleted > 0 ? testResult.testCompleted : 100}/>
                          <div className="test-progress-value">{testResult.testCompleted}%</div>
                        </div>
                        <div className="date-author">
                          <div className="test-author">{testResult.creator_full_name}</div>
                          <div className="test-date">{ moment(new Date(Number(testResult.creation_date))).format("DD. MMM YYYY") }</div>
                        </div>
                        <div className="test-score">{testResult.score == '-1' ? t("no_score") : testResult.score}</div>
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
  </TestPane>
}
