import * as React from "react";
import styled from "@/lib/styledComponents";
import { Grid, Tab, Icon, Statistic, Header, List, Image } from 'semantic-ui-react';
import moment from "moment";

const Stage = styled.div`
  padding-top: 8em!important;
  max-width: 85vw;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;
  height: 100vh;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const ActivityList = styled(List)`
  margin-top: 3em;
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
    color: #b1b1b1!important;
  }
`;
const DailyList = styled(List.Item)`
  border-top: none!important;
  padding-top: 0!important;
  padding-bottom: 0!important;
`;
const Exercise = styled(List.Item)`
  position: relative;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  border-radius: 3px;
  -webkit-transition: 450ms all;
  transition: 450ms all;
  -webkit-transform-origin: center left;
  -ms-transform-origin: center left;
  transform-origin: center left;
  box-shadow: 0 1vw 3vw rgba(0, 0, 0, 0.4);
  padding: 0!important;
  overflow: hidden;
  background: white;
  margin-right: 0.5em;
  margin-left: 0!important;
  margin-top: 0.5em;
  border: 1px solid #B9B9B9!important;
`;
const ExerciseImages = styled.div`
  width: 17.5vw;
  max-width: 200px;
  height: 8.8vw;
  max-height: 100px;
  background-position: right top, left top;
  background-repeat: no-repeat;
  background-size: 50.5% auto,50.5% auto;
`;
const Protocolls = styled(List.Content)`
  padding: 0.5em;
  border-top: none!important;
`;
const Protocoll = styled.div`
  font-size: 12px!important;
  font-weight: bold;
  color: rgb(116, 116, 116);
  padding-left: 1em;
  line-height: 1.3em;
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
  }

  render() {
    const {customer, protocolls} = this.props;
    const {
      birthday,
      city,
      country,
      deleted,
      email,
      first_name,
      gender,
      id,
      language,
      last_change,
      last_name,
      note,
      phone_nr,
      privacy,
      role,
      street,
      zip_code,
    } = customer;

    const panes = [
      { menuItem: { key: 'data',  icon: 'chevron right', content: 'Persönliche Date' }, render: () =>
        <Tab.Pane>
          <Statistic.Group widths='two'>
            <Statistic size='mini'>
              <StatisticValue>34 Jahre</StatisticValue>
              <Statistic.Label>alt</Statistic.Label>
            </Statistic>
            <Statistic size='mini'>
              <StatisticValue>79 Kg</StatisticValue>
              <Statistic.Label>Gewicht</Statistic.Label>
            </Statistic>
            <Statistic size='mini'>
              <StatisticValue>187 cm</StatisticValue>
              <Statistic.Label>Größe</Statistic.Label>
            </Statistic>
            <Statistic size='mini'>
              <StatisticValue>22.55 %</StatisticValue>
              <Statistic.Label>Fettanteil</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Tab.Pane>
      },
      { menuItem: { key: 'workouts',  icon: 'chevron right', content: 'Workouts' }, render: () =>
        <Tab.Pane>
          <List horizontal>
            <List.Item>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
              <List.Content>
                <List.Header>Tom</List.Header>
                Top Contributor
              </List.Content>
            </List.Item>
            <List.Item>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
              <List.Content>
                <List.Header>Christian Rocha</List.Header>
                Admin
              </List.Content>
            </List.Item>
            <List.Item>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <List.Content>
                <List.Header>Matt</List.Header>
                Top Rated User
              </List.Content>
            </List.Item>
          </List>
        </Tab.Pane>
      },
      { menuItem: { key: 'anamnese',  icon: 'chevron right', content: 'Anamnese' }, render: () => <Tab.Pane></Tab.Pane> },
      { menuItem: { key: 'measures',  icon: 'chevron right', content: 'Messungen' }, render: () => <Tab.Pane></Tab.Pane> },
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
        <Header as='h2' style={{paddingTop: '2em'}}>Kundenaktivitäten</Header>
        <ActivityList divided relaxed>
        {
          protocolls.map( (protocollList, titel) =>
          (
            <DailyList>
              <Header as='h3'>{protocollList.day.format('dddd, MMMM Do YYYY')}</Header>
              <List.Content style={{fontSize: "1em", overflowX: "scroll", width: "100%"}} className={"hide-scrollbar"}>
                <List horizontal style={{ transition: "450ms -webkit-transform", transition: "450ms transform", transition: "450ms transform, 450ms -webkit-transform", fontSize: "0",  whiteSpace: "nowrap", paddingBottom: "3vw", paddingLeft: "20px!", paddingRight: "20px", paddingLeft: "25px" }} className={"hide-scrollbar"}>
                {
                  protocollList.data.map( (protocollDay) => {
                    return (
                      <Exercise>
                        <ExerciseImages style={{backgroundImage: "url(" + protocollDay.data[0].image_1 + "), url(" + protocollDay.data[0].image_1 + ")"}}></ExerciseImages>
                        <Protocolls>
                          {
                            protocollDay.data.map( (protocoll, index) => {
                              return (
                                  index < 3 &&
                                  <Protocoll>
                                    {protocoll.weight} Kg / {protocoll.training} Wdh.
                                  </Protocoll>
                              );
                            })
                          }
                          {
                            protocollDay.data.length > 3 &&
                            <Protocoll>
                              ...
                            </Protocoll>
                          }
                        </Protocolls>
                      </Exercise>
                    )
                  })
                }
                </List>
              </List.Content>
            </DailyList>
          ))
        }
        </ActivityList>
      </Stage>
    );
  }
};

export default Customer;
