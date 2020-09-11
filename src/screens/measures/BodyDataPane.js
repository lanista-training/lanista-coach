import React, { useEffect, useState } from 'react';
import moment from "moment";
import { Tab } from 'semantic-ui-react';
import CustomizedAxisTick from './CustomizedAxisTick';
import CustomTooltip from './CustomTooltip';
import { TableContent, TableHeader, DataTable } from './styles';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const prepareWeightData = (rawData) => {
  const chartData = []
  if( rawData ) {
    rawData.map( function (measure, index) {
      const {weight, height, futrex, fatmass, fatfreemass, musclemass, visceralfat, bodywater} = measure;
      if( weight > 0 || height > 0 || futrex > 0 || fatmass > 0 || fatfreemass > 0 || musclemass > 0 || visceralfat > 0 || bodywater > 0 ) {
        chartData.push({
          index: index,
          date: moment(new Date(measure.target_date)).format("DD-MM-YYYY"),
          weight: measure.weight > 0 ? measure.weight : null,
          height: measure.height > 0 ? measure.height : null,
          futrex: measure.futrex > 0 ? measure.futrex : null,
          fatmass: measure.fatmass > 0 ? measure.fatmass : null,
          fatfreemass: measure.fatfreemass > 0 ? measure.fatfreemass : null,
          musclemass: measure.musclemass > 0 ? measure.musclemass : null,
          visceralfat: measure.visceralfat > 0 ? measure.visceralfat : null,
          bodywater: measure.bodywater > 0 ? measure.bodywater : null,
        })
      }
    });
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
}) => {
  const caliperCuratedDataLength = prepareWeightData(calipers).length;
  return showDataAsChart ?
    <Tab.Pane style={{ marginTop: "5vh", height: "calc(100vh - 130px - 14em)" }}>
      <ResponsiveContainer >
        <LineChart
          data={prepareWeightData(calipers)}
          margin={{
            top: 5, right: 5, left: 20, bottom: -5,
          }}
          onClick={(chart, event) => {
            console.log(chart.activePayload[0].payload.index)
            chart && chart.activePayload[0] && chart.activePayload[0].payload && setSelectedRecord(chart.activePayload[0].payload.index);
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" height={50} tick={<CustomizedAxisTick />}/>
          <YAxis yAxisId="left" stroke="#91bd09" label={{ value: t('weight_in_kg'), angle: -90, position: 'insideLeft', stroke:'#91bd09' }}/>
          <YAxis yAxisId="right" orientation="right" stroke="#8884d8" label={{ value: t('fat_share_in_percentage'), angle: 90, position: 'insideRight', stroke:'#8884d8' }}/>
          <Tooltip content={<CustomTooltip t={t}/>} />
          <Line yAxisId="left" type="monotone" dataKey="weight" name={t("weight")} stroke="#91bd09" connectNulls  activeDot={{ r: 8 }} unit=" Kg" dot={{ onClick:() => console.log("CLICK") }}/>
          <Line yAxisId="right" type="monotone" dataKey="futrex" name={t("futrex")} stroke="#8884d8" connectNulls activeDot={{ r: 8 }} unit=" %"/>
          <Line yAxisId="left" type="monotone" dataKey="fatmass" name={t("fatmass")} stroke="#00A0DC" connectNulls activeDot={{ r: 8 }} unit=" Kg"/>
          <Line yAxisId="left" type="monotone" dataKey="fatfreemass" name={t("fatfreemass")} stroke="#ECB220" connectNulls activeDot={{ r: 8 }} unit=" Kg"/>
          <Line yAxisId="left" type="monotone" dataKey="musclemass" name={t("musclemass")} stroke="#DC5142" connectNulls activeDot={{ r: 8 }} unit=" Kg"/>
          <Line yAxisId="left" type="monotone" dataKey="visceralfat" name={t("visceralfat")} stroke="#E68523" connectNulls activeDot={{ r: 8 }} unit=" "/>
          <Line yAxisId="right" type="monotone" dataKey="bodywater" name={t("bodywater")} stroke="#00AEB3" connectNulls activeDot={{ r: 8 }} unit=" %"/>
          <Legend wrapperStyle={{paddingTop: "30px"}}/>
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
                  <th className="firstColumn" style={{width: "12%!important"}}>{t("date")}</th>
                  <th>{t('weight')}</th>
                  <th>{t('table-header-futrex')}</th>
                  <th>{t('table-header-fatmass')}</th>
                  <th>{t('table-header-fatfreemass')}</th>
                  <th>{t('table-header-musclemass')}</th>
                  <th>{t('table-header-visceralfat')}</th>
                  <th>{t('table-header-bodywater')}</th>
                </tr>
              </tbody>
            </table>
          </TableHeader>
          <TableContent>
            <table>
              <tbody>
                {
                    prepareWeightData(calipers).reverse().map((item, index) => {
                    return (
                      <tr onClick={() => {
                          console.log("setSelectedRecord", caliperCuratedDataLength, item)
                          setSelectedRecord(item.index)
                        }}
                      >
                        <td className="firstColumn" style={{width: "15%"}}>{moment(item.date, 'DD-MM-YYYY').format('DD MMM YYYY')}</td>
                        <td>{item.weight > 0 ? item.weight : ''} <span>{item.weight > 0 && "Kg"}</span></td>
                        <td>{item.futrex > 0 ? item.futrex : ''} <span>{item.futrex > 0 && "%"}</span></td>
                        <td>{item.fatmass > 0 ? item.fatmass : ''} <span>{item.fatmass > 0 && "%"}</span></td>
                        <td>{item.fatfreemass > 0 ? item.fatfreemass: ''} <span>{item.fatfreemass > 0 && "Kg"}</span></td>
                        <td>{item.musclemass > 0 ? item.musclemass : ''} <span>{item.musclemass > 0 && "Kg"}</span></td>
                        <td>{item.visceralfat > 0 ? item.visceralfat : ''} <span>{item.visceralfat > 0 && ""}</span></td>
                        <td>{item.bodywater > 0 ? item.bodywater : ''} <span>{item.bodywater > 0 && "%"}</span></td>
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
