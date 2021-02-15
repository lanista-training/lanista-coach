import React, { useEffect, useState } from 'react';
import moment from "moment";
import { Tab } from 'semantic-ui-react';
import CustomizedAxisTick from './CustomizedAxisTick';
import CustomTooltip from './CustomTooltip';
import { TableContent, TableHeader, DataTable } from './styles';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const prepareMeasuresData = (rawData) => {
  const chartData = []
  if( rawData ) {
    rawData.map( function (measure, index) {
      const {arm_right, arm_left, waist, umbilical, chest, spina_ilica_ant, wide_hips, quads_right, quads_left} = measure;
      if( arm_right > 0 || arm_left > 0 || waist > 0 || umbilical > 0 || chest > 0 || spina_ilica_ant > 0 || wide_hips > 0 || quads_right > 0 || quads_left > 0 ) {
        chartData.push({
          index: index,
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
      }
    })
    return chartData;
  } else {
    return []
  }
}

export default ({
  t,
  measures,
  showDataAsChart,
  setSelectedRecord,
}) => {
  return showDataAsChart ?
    <Tab.Pane style={{ marginTop: "5vh", height: "calc(100vh - 130px - 14em)" }}>
      <ResponsiveContainer>
        <LineChart
          data={prepareMeasuresData(measures)}
          margin={{
            top: 5, right: 5, left: 20, bottom: -5,
          }}
          onClick={(chart, event) => {
            chart && chart.activePayload[0] && chart.activePayload[0].payload && setSelectedRecord(chart.activePayload[0].payload.index);
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" height={50} tick={<CustomizedAxisTick />}/>
          <YAxis yAxisId="left" stroke="#91bd09" label={{ value: 'Messung in cm', angle: -90, position: 'insideLeft', stroke:'#91bd09' }}/>
          <Tooltip content={<CustomTooltip t={t}/>} />
          <Legend wrapperStyle={{paddingTop: "30px"}}/>
          <Line yAxisId="left" type="monotone" dataKey="arm_left" name={t('arm_left')}  stroke="#8D6CAA" connectNulls  activeDot={{ r: 8 }} unit=" cm"/>
          <Line yAxisId="left" type="monotone" dataKey="arm_right" name={t('arm_right')}  stroke="#00A0DC" connectNulls  activeDot={{ r: 8 }} unit=" cm"/>
          <Line yAxisId="left" type="monotone" dataKey="chest" name={t('chest')}  stroke="#00AEB3" connectNulls  activeDot={{ r: 8 }} unit=" cm"/>
          <Line yAxisId="left" type="monotone" dataKey="waist" name={t('waist')}  stroke="#DC5142" connectNulls  activeDot={{ r: 8 }} unit=" cm"/>
          <Line yAxisId="left" type="monotone" dataKey="umbilical" name={t('umbilical')}  stroke="#E68523" connectNulls  activeDot={{ r: 8 }} unit=" cm"/>
          <Line yAxisId="left" type="monotone" dataKey="spina_ilica_ant" name={t('spina_ilica_ant')}  stroke="#ECB220" connectNulls  activeDot={{ r: 8 }} unit=" cm"/>
          <Line yAxisId="left" type="monotone" dataKey="wide_hips" name={t('wide_hips')}  stroke="#DC4B88" connectNulls  activeDot={{ r: 8 }} unit=" cm"/>
          <Line yAxisId="left" type="monotone" dataKey="quads_left" name={t('quads_left')}  stroke="#DC4B88" connectNulls  activeDot={{ r: 8 }} unit=" cm"/>
          <Line yAxisId="left" type="monotone" dataKey="quads_right" name={t('quads_right')}  stroke="#DC4B88" connectNulls  activeDot={{ r: 8 }} unit=" cm"/>
          <Line yAxisId="left" type="monotone" dataKey="sum" name={t('sum')}  stroke="#91bd09" connectNulls strokeWidth={4}  activeDot={{ r: 8 }} unit=" cm"/>
        </LineChart>
      </ResponsiveContainer>
    </Tab.Pane>
    :
    <Tab.Pane style={{ height: "calc((100vh - 130px) - 9em)" }}>
      <div style={{height: "100%"}}>
        <DataTable>
          <TableHeader>
            <table>
              <tbody>
                <tr>
                  <th className="firstColumn" style={{width: "10%"}}>{t("date")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("arm_left")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("arm_right")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("chest")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("waist")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("umbilical")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("spina_ilica_ant")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("wide_hips")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("quads_left")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em", width: "6%" }}>{t("quads_right")}</th>
                  <th>{t("sum")}</th>
                </tr>
              </tbody>
            </table>
          </TableHeader>
          <TableContent style={{marginTop:"2em", paddingBottom: "2em"}}>
            <table>
              <tbody>
                {
                  prepareMeasuresData(measures).reverse().map(item => {
                    return (
                      <tr onClick={() => setSelectedRecord(item.index)}>
                        <td className="firstColumn" style={{width: "10%", fontSize: "14px"}}>{moment(item.date, 'DD-MM-YYYY').format('DD MMM YYYY')}</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.arm_left} cm</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.arm_right} cm</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.chest} cm</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.waist} cm</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.umbilical} cm</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.spina_ilica_ant} cm</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.wide_hips} cm</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.quads_left} cm</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.quads_right} cm</td>
                        <td style={{width: "6%", fontSize: "13px"}}>{item.sum} cm</td>
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
}
