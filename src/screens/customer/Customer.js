import * as React from "react";
import styled from 'styled-components';
import _ from 'lodash';
import { Grid, Tab, Icon, Statistic, List, Image } from 'semantic-ui-react';
import moment from "moment";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const Stage = styled.div`
  padding-top: 8em!important;
  max-width: 85vw;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;
  height: 98vh;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const ActivityList = styled(List)`
  margin-top: 3em!important;
  width: 100%;
  height: calc(100vh - 27.5em);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow-x: scroll;
  margin-left: 1em;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  ::-webkit-scrollbar {
    width: 0px!important;
    height: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const StyledTab = styled(Tab)`
  width: 100%;
  .ui.grid {
    margin: initial!important;
  }
  .ui.grid .column {
    margin: 0!important;
    padding: 0!important;
  }
  .menu {
    border: none!important;
    background-color: white!important;
    box-shadow: 0 0.08em 0.25em 0.075em rgba(0, 0, 0, 0.075)!important;
    border-radius: 5px!important;
    margin-left: 4px!important;
  }
  .item {
    font-family: Abel;
    font-size: 1.2em!important;
    font-weight: bold!important;
    color: #b1b1b1!important;!important;
    text-align: left;
    margin: 0!important;
    padding-left: 1em!important;
    min-width: 12em;
    line-height: 2em!important;
    border-bottom-style: solid!important;
    border-width: 1px!important;
    border-color: rgba(0,0,0,.0975)!important;
  }
  .text.menu {

  }
  .item.active i {
    color: rgb(155,201,61)!important;
  }
  .item.active {
    color: black!important;
  }
  .tab {
    border: none!important;
    background-color: transparent;
    padding: 0!important;
    height: 10em;
    overflow: hidden;
  }
  i.icon, i.icons {
    margin-right: 0.5em!important;
    font-size: 1.2em;
    float: right!important;
    color: #e0e0e0!important;
  }
`;
const DailyList = styled.div`
  border-top: none!important;
  padding-top: 0!important;
  padding-bottom: 0!important;
  overflow-y: scroll;
  min-width: 210px;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const Exercise = styled(List.Item)`
  position: relative;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  border-radius: 3px;
  -webkit-transition: 450ms all;
  -webkit-transition: 450ms all;
  transition: 450ms all;
  -webkit-transform-origin: center left;
  -ms-transform-origin: center left;
  -webkit-transform-origin: center left;
  -ms-transform-origin: center left;
  transform-origin: center left;
  padding: 0!important;
  overflow: hidden;
  background: white;
  margin-right: 0.5em;
  margin-left: 0!important;
  margin-top: 0.5em;
  box-shadow: 0 0.08em 0.25em 0.075em rgba(0, 0, 0, 0.075);
`;
const WorkoutsList = styled.div`
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow-x: scroll;
  margin-left: 1em;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
`;

const WorkoutsListWrapper = styled.div`
  width: 100%;
  padding-right: 1em;
`;

const WorkoutsListItem = styled.div`
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 20vw;
  min-width: 20em;
  margin: 0 1em;
  background-color: #efefef;
  border-radius: 4px;
  padding: 1.2em;
  display: flex;
  flex-flow: column;
  .workoutname {
    font-size: 1.2em;
    font-weight: 700;
    line-height: 1.2em;
    max-height: 2.4em;
    min-height: 2.4em;
  }
  .workoutdescription {
    font-size: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4em;
    max-height: 2.8em;
    min-height: 2.8em;
    margin-top: 0.7em;
  }
  .workoutsplits {
    font-size: 1em;
  }
  .workoutauthor {
    font-size: 1em;
  }
  .footer {
    font-weight: 700;
  }
  .workoutcreatorname {
    float: left;
  }
  .workoutexpiration {
    float: right;
  }
  .workoutextrainfo {
    padding: 0.8em 0;
    text-align: right;
  }
`;
const Header = styled.div`
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  margin: 0;
  margin-right: 0.5em;
  background-color: rgb(239,239,239);
  line-height: 2.5em;
  border-radius: 5px;
  padding-left: 0.7em;
  font-weight: 100;
  font-size: 1.2em;
`;


const ExerciseImages = styled.div`
  max-width: 200px;
  min-width: 200px;
  height: 100px;
  max-height: 100px;
  background-position: right top,left top;
  background-repeat: no-repeat;
  background-size: 50.5% auto,50.5% auto;
  background-color: #efefef;
`;
const Protocolls = styled(List.Content)`
  padding: 0.5em;
  border-top: none!important;
`;
const ExerciseProtocolls = styled.div`
  padding: 0.8em 0;
`;
const Protocoll = styled.div`
  font-size: 12px!important;
  color: rgb(116,116,116);
  padding-left: 1em;
  line-height: 1.4em;
  -webkit-font-smoothing: antialiased;
  .self-protocolled {
    color: blue!important;
  }
`;
const StatisticValue = styled.div`
  color: #1b1c1d;
  font-family: Lato,Helvetica Neue,Arial,Helvetica,sans-serif;
  font-size: 56px;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1em;
  text-align: center;
  text-transform: uppercase;
  font-size: 3rem!important;
`;

class Customer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
    this.prepareMeasuresData = this.prepareMeasuresData.bind(this)
    this.translateRating = this.translateRating.bind(this)
    this.formatHeader = this.formatHeader.bind(this)
  }

  translateRating(rating) {
    switch(rating) {
      case 0:
        return 'Niedrig'
      case 1:
        return 'Normal'
      case 2:
        return 'Schlimm'
      case 3:
        return 'Sehr schnill'
      case 4:
        return 'Äußerst schlimm'
      default:
        return 'Normal'
    }
  }

  formatHeader(text) {
    return moment(new Date(text)).format("DD-MM-YYYY")
  }

  prepareMeasuresData(rawData) {
    const chartData = []
    if( rawData ) {
      rawData.map( function (measure) {
        if( measure.weight > 0 ) {
          chartData.push({
            name: measure.target_date,
            weight: measure.weight
          })
        }
      })
      return chartData
    } else {
      return []
    }
  }

  render() {
    const {customer, lastMeasures, onProtocollClick} = this.props;
    const {birthday, plans, workouts, warnings} = customer;

    const dayLists = _.groupBy(workouts, (workout) => workout.formated_date);
    console.log( dayLists )

    const protocolls = []

    const panes = [
      { menuItem: { key: 'data',  icon: 'chevron right', content: 'Persönliche Date' }, render: () =>
        <Tab.Pane style={{ marginTop: "1.5em" }}>
          <Statistic.Group widths='two'>
            <Statistic size='mini'>
              <StatisticValue>{isNaN(birthday) ? '' : moment().diff(parseInt(birthday), 'years')} Jahre</StatisticValue>
              <Statistic.Label>alt</Statistic.Label>
            </Statistic>
            <Statistic size='mini'>
              <StatisticValue>{lastMeasures.weight} Kg</StatisticValue>
              <Statistic.Label>Gewicht</Statistic.Label>
            </Statistic>
            <Statistic size='mini'>
              <StatisticValue>{lastMeasures.height} cm</StatisticValue>
              <Statistic.Label>Größe</Statistic.Label>
            </Statistic>
            <Statistic size='mini'>
              <StatisticValue>{lastMeasures.fat} %</StatisticValue>
              <Statistic.Label>Fettanteil</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Tab.Pane>
      },
      { menuItem: { key: 'workouts',  icon: 'chevron right', content: 'Workouts' }, render: () =>
        <Tab.Pane>
          <WorkoutsListWrapper>
            <WorkoutsList className="hide-scrollbar">
              {
                plans.map(( item, key ) =>
                  <WorkoutsListItem key={key}>
                    <div className="workoutname">{item.name}</div>
                    <div className="workoutdescription">{item.description && item.description.length > 0 ? item.description : "No description available"}</div>
                    <div className="workoutextrainfo">{item.days} Splits / {item.duration} Weeks</div>
                    <div className="footer">
                      <div className="workoutcreatorname">{item.creator_full_name}</div>
                      <div className="workoutexpiration">{isNaN(item.expiration_date) ? '' : moment(parseInt(item.expiration_date)).format("DD-MM-YYYY")}</div>
                    </div>
                  </WorkoutsListItem>
                )
              }

            </WorkoutsList>
          </WorkoutsListWrapper>
        </Tab.Pane>
      },
      { menuItem: { key: 'anamnese',  icon: 'chevron right', content: 'Messungen' }, render: () =>
        <Tab.Pane>
          <ResponsiveContainer>
            <LineChart
              data={this.prepareMeasuresData(customer.calipers)}
              margin={{
                top: 20, right: 5, left: 0, bottom: -5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Tab.Pane>
      },
      { menuItem: { key: 'measures',  icon: 'chevron right', content: 'Warnungen' }, render: () =>
        <Tab.Pane>
          <WorkoutsListWrapper>
            <WorkoutsList className="hide-scrollbar">
              {
                warnings.map(( item, key ) =>
                  <WorkoutsListItem key={key} style={{backgroundImage: 'url(https://lanistacoach.s3.amazonaws.com/static/img/injury-background.jpg)',  backgroundSize: 'cover'}}>
                    <div className="workoutname">{item.name}</div>
                    <div className="workoutdescription">{item.description && item.description.length > 0 ? item.description : "No description available"}</div>
                    <div className="workoutextrainfo">{this.translateRating(item.rating)}</div>
                    <div className="footer">
                      <div className="workoutcreatorname"></div>
                      <div className="workoutexpiration">{item.creator_full_name}</div>
                    </div>
                  </WorkoutsListItem>
                )
              }
            </WorkoutsList>
          </WorkoutsListWrapper>
        </Tab.Pane>
      },
    ]

    return(
      <Stage>
        <StyledTab
          menu={{
            fluid: true,
            vertical: true,
            text: true,
          }}
          panes={panes}
        />
        <ActivityList divided relaxed>
        {
          _.map(dayLists, (dayList, titel) =>
          {
            const protocolls = _.groupBy(dayList, (workout) => workout.exercise_id)
            return(
              <DailyList>
                <Header as='h3'>
                  {this.formatHeader(titel)}
                  <Icon name='sticky note outline' style={{float: "right", fontSize: "1.3em", paddingRight: "1em"}}/>
                </Header>
                <List.Content style={{ fontSize: "1em", overflowY: "scroll", height: "calc(100vh - 34vh)", paddingBottom: "1em"}} className={"hide-scrollbar"}>
                {
                  _.map(protocolls, (protocoll, exercise_id) => {
                    return (
                      <Exercise onClick={() => onProtocollClick(exercise_id)}>
                        <ExerciseImages style={{backgroundImage: "url(https://lanista-training.com" + protocoll[0].image_url + "_1.jpg), url(https://lanista-training.com" + protocoll[0].image_url + "_2.jpg)"}}></ExerciseImages>
                        <ExerciseProtocolls>
                          {
                            protocoll.map( (execution, index) => {
                              return (
                                  <Protocoll className={execution.self_protocolled ? "self-protocolled" : ""}>
                                    {execution.weight} Kg / {execution.training} Wdh.
                                  </Protocoll>
                              );
                            })
                          }
                        </ExerciseProtocolls>
                      </Exercise>
                    )
                  })
                }
                </List.Content>
              </DailyList>
            )
          })
        }
        </ActivityList>
      </Stage>
    );
  }
};

export default Customer;
