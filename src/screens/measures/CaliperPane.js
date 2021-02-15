import React, { useEffect, useState } from 'react';
import moment from "moment";
import { Tab } from 'semantic-ui-react';
import CustomizedAxisTick from './CustomizedAxisTick';
import CustomTooltip from './CustomTooltip';
import { TableContent, TableHeader, DataTable } from './styles';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const prepareCaliperData = (rawData, gender = 0, birthday) => {
  const chartData = [];
  const age = (birthday === null || isNaN(birthday)) ? 32 : moment().diff(parseInt(birthday), 'years');
  if( rawData ) {
    rawData.map( function (measure, index) {
      const sum = measure.abs + measure.auxiliar + measure.chest + measure.quads + measure.scapula + measure.sprailium + measure.trizeps;
      let fatShare = 0;
      if( sum > 0 ) {
        if( gender === 0 ){
            fatShare =  (Math.round (((4.96/(1.112-0.00043499*sum+0.00000055*sum*sum-0.00028826*age))-4.5)*10000, 4) / 100);
        } else {
            fatShare = (Math.round (((4.96/(1.097-0.00046971*sum+0.00000056*sum*sum-0.00012828*age))-4.51)*10000, 4) / 100);
        }
        chartData.push({
          index: index,
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

export default ({
  t,
  calipers,
  showDataAsChart,
  setSelectedRecord,
  gender,
  birthday,
}) => {
  return showDataAsChart ?
    <Tab.Pane style={{ marginTop: "5vh", height: "calc(100vh - 130px - 14em)" }}>
      <ResponsiveContainer >
        <LineChart
          data={prepareCaliperData(calipers, gender, birthday)}
          margin={{
            top: 5, right: 5, left: 20, bottom: -5,
          }}
          onClick={(chart, event) => {
            chart && chart.activePayload[0] && chart.activePayload[0].payload && setSelectedRecord(chart.activePayload[0].payload.index);
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" height={50} tick={<CustomizedAxisTick />}/>
          <YAxis yAxisId="left" stroke="#91bd09" label={{ value: t("measure_in_mm"), angle: -90, position: 'insideLeft', stroke:'#91bd09' }}/>
          <YAxis yAxisId="right" orientation="right" stroke="#8884d8" label={{ value: t("measure_in_%"), angle: 90, position: 'insideRight', stroke:'#8884d8' }}/>
          <Tooltip content={<CustomTooltip t={t}/>} />
          <Legend wrapperStyle={{paddingTop: "30px"}}/>
          <Line yAxisId="left" type="monotone" dataKey="trizeps" name={t('triceps')} stroke="#DC4B88" connectNulls  activeDot={{ r: 8 }} unit=" mm"/>
          <Line yAxisId="left" type="monotone" dataKey="scapula" name={t('scapula')} stroke="#00AEB3" connectNulls  activeDot={{ r: 8 }} unit=" mm"/>
          <Line yAxisId="left" type="monotone" dataKey="auxiliar" name={t('armpitt')} stroke="#8D6CAA" connectNulls  activeDot={{ r: 8 }} unit=" mm"/>
          <Line yAxisId="left" type="monotone" dataKey="chest" name={t('chest')} stroke="#DC5142" connectNulls  activeDot={{ r: 8 }} unit=" mm"/>
          <Line yAxisId="left" type="monotone" dataKey="sprailium" name={t('iliac_creat')} stroke="#ECB220" connectNulls  activeDot={{ r: 8 }} unit=" mm"/>
          <Line yAxisId="left" type="monotone" dataKey="abs" name={t('ab')} stroke="#00A0DC" connectNulls  activeDot={{ r: 8 }} unit=" mm"/>
          <Line yAxisId="left" type="monotone" dataKey="quads" name={t('quads')} stroke="#E68523" connectNulls  activeDot={{ r: 8 }} unit=" mm"/>
          <Line yAxisId="right" type="monotone" dataKey="fatShare" name={t('calipermetrie')} stroke="#8884d8" strokeWidth={4} connectNulls activeDot={{ r: 8 }} unit=" %"/>
          <Line yAxisId="left" type="monotone" dataKey="sum" name={t('sum')} stroke="#91bd09" strokeWidth={4} connectNulls activeDot={{ r: 8 }} unit=" mm"/>
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
                  <th className="firstColumn" style={{paddingBottom: "0", paddingTop: "2em"}}>{t("date")}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('triceps')}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('scapula')}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('armpitt')}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('chest')}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('iliac_creat')}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em" }}>{t('ab')}</th>
                  <th style={{ transform: "rotate(-50deg)", height: "6em", fontSize: "0.8em"  }}>{t('quads')}</th>
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
                  prepareCaliperData(calipers, gender, birthday).reverse().map(item => {
                    return (
                      <tr onClick={() => setSelectedRecord(item.index)}>
                        <td className="firstColumn" style={{width: "12%!important"}}>{moment(item.date, 'DD-MM-YYYY').format('DD MMM YYYY')}</td>
                        <td>{item.trizeps > 0 ? item.trizeps : ''} <span>{item.trizeps > 0 && "mm"}</span></td>
                        <td>{item.scapula > 0 ? item.scapula : ''} <span>{item.scapula > 0 && "mm"}</span></td>
                        <td>{item.auxiliar > 0 ? item.auxiliar : ''} <span>{item.auxiliar > 0 && "mm"}</span></td>
                        <td>{item.chest > 0 ? item.chest : ''} <span>{item.chest > 0 && "mm"}</span></td>
                        <td>{item.sprailium > 0 ? item.sprailium : ''} <span>{item.sprailium > 0 && "mm"}</span></td>
                        <td>{item.abs > 0 ? item.abs : ''} <span>{item.abs > 0 && "mm"}</span></td>
                        <td>{item.quads > 0 ? item.quads : ''} <span>{item.quads > 0 && "mm"}</span></td>
                        <td>{item.sum > 0 ? item.sum : ''} <span>{item.sum > 0 && "mm"}</span></td>
                        <td>{item.fatShare > 0 ? item.fatShare : ''} <span>{item.fatShare > 0 && "%"}</span></td>
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
