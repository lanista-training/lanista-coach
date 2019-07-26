import * as React from "react"
import Feed from "./Feed"
import styled from 'styled-components'
import InfiniteList from '../../components/InfiniteList'
import DayPicker from 'react-day-picker'
import { Sticky, Button, List } from 'semantic-ui-react'
import Calender from '../Calender'
import { Transition } from 'react-spring'
import moment from "moment"

const StyledDateLabel = styled.div`
  font-family: Abel;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 0.5em;
`;
const Stage = styled.div`
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
  padding-top: 5em!important;
  height: 100vh;
`;
const ListSection = styled.div`
  overflow: auto;
  padding-top: 1.5em;
  float: left;
  margin-right: 28px;
  max-width: 550px;
  width: 100%;
  margin-bottom: 4em;
`;
const ToolsSection = styled.div`
  max-width: 275px;
  position: absolute;
  right: 0;
  width: 100%;
  padding-top: 1.5em;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  height: 79vh;
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
`;
const CalenderMonth = styled.div`
  background-color: white;
`;
const CalenderdButton = styled.div`
  float: right;
`;
const Card = styled.div`
  background-color: white;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 5px;
  width: 100%;
  max-width: 250px;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-family: Abel;
  overflow: hidden;
`;
const CardContent = styled.div`
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
const CardContentCalender = styled.div`
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  border: none;
  background: 0 0;
  margin: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 1em;
  border-radius: 0;
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  display: block;
`;
const CardHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;
const Statistic = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
`;
const StatisticTitle = styled.div`
  flex: 1;
  color: #8b9898;
`;
const StatisticValue = styled.div`
  color: black;
  font-weight: bold;
`;
const FeedsTitle = styled.div`
  padding-top: 1em;
  padding-bottom: 0.5em;
`;

class Feeds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: new Date(),
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  componentDidMount() {
    var {jumpToDay} = this.props;
    setTimeout(function () {
        jumpToDay(new Date());
    }, 100);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /*
    const {currentScrollPosition} = this.props;
    if (currentScrollPosition != prevProps.currentScrollPosition) {
      this.list.scrollTo(currentScrollPosition);
    }
    */
  }

  handleDayClick(day) {
    this.setState({
      selectedDay: day,
    });
    var {jumpToDay} = this.props;
    jumpToDay(day);
  }

  render() {
    const {
      feeds,
      t,
      jumpToDay,
      onRequestPage,
      loading,
      error,
      hasMore,
      hasMoreUp,
      initialLoading,
      setPageSize,
    } = this.props;
    const dataSource = [];
    const modifiers = (day) => {
      return feeds.find(element => {
        return element.title == day.toLocaleString().split(',')[0].split( ".").join("-");
      });
    };
    const modifiersStyles = {
      modifiers: {
        color: '#9bc93d'
      },
      today: {
        color: 'white',
        fontWeight: 'bold'
      },
      selected: {
        backgroundColor: '#9bc93d',
        color: 'white!important'
      }
    };

    var items = [];
    let previousTargetDate = ''
    feeds.map( (feedList, index) =>
    {
      feedList.data.map( (feed, index) =>
       {
         const targetDate = moment(parseInt(feed.target_date)).format('DD-MM-YYYY')
         if( previousTargetDate != targetDate ) {
           items.push(
             <FeedsTitle id={targetDate}>{targetDate}</FeedsTitle>
           )
         }
         previousTargetDate = targetDate;
         items.push(
           <Feed t={t} key={feed.type + feed.member.id} feed={feed}/>
         );
       });
    });

    return (
      <Stage id="feed-stage">
        <ListSection className='hide-scrollbar' id="infinte-list-wrapper">
          <InfiniteList
            loadMore={onRequestPage}
            hasMore={hasMore}
            hasMoreUp={hasMoreUp}
            loader={<div class="loader">Loading...</div>}
            initialLoading={initialLoading}
            loading={loading}
            setPageSize={setPageSize}
          >
            {items}
          </InfiniteList>
        </ListSection>
        <ToolsSection>
        <Card>
          <CardContent style={{ borderBottom: '1px solid #efefef' }}>
            <CardHeader>
              {t("dashboard:Overview")}
              <CalenderdButton>
                <Calender
                  onClick={() => console.log("CLICK")}
                  buttonStyle={{ float: 'right', fontSize: '1.5em!important'}}
                  modifiers={{ modifiers }}
                  modifiersStyles={modifiersStyles}
                  onDayClick={this.handleDayClick}
                />
              </CalenderdButton>
            </CardHeader>
          </CardContent>
          <CardContentCalender>
            <CalenderMonth>
              <DayPicker
                numberOfMonths={1}
                modifiers={{ modifiers }}
                modifiersStyles={modifiersStyles}
                onDayClick={this.handleDayClick}
                todayButton="Today"
                onTodayButtonClick={(day, modifiers) => jumpToDay(day)}
                selectedDays={this.state.selectedDay}
              />
            </CalenderMonth>
          </CardContentCalender>
        </Card>
        <Card style={{marginTop: '1.5em'}}>
          <CardContent style={{ borderBottom: '1px solid #efefef' }}>
            <CardHeader>
              {t("dashboard:Overview")}
            </CardHeader>
          </CardContent>
          <CardContent>
            <List>
              <List.Item>
                <List.Icon style={{paddingLeft: 0}} name='clipboard list' />
                <List.Content style={{width: '100%'}}>
                  <a href=''>Trainingspläne abgleufen<span style={{ float: 'right', fontWeight: 'bold' }}>3</span></a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon style={{paddingLeft: 0}} name='clipboard list' />
                <List.Content style={{width: '100%'}}>
                  <a href=''>Trainingspläne bald ablaufen<span style={{ float: 'right', fontWeight: 'bold' }}>12</span></a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='calendar plus' />
                <List.Content style={{width: '100%'}}>
                  <a href=''>Termine angefordert<span style={{ float: 'right', fontWeight: 'bold' }}>7</span></a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='calendar' />
                <List.Content style={{width: '100%'}}>
                  <a href=''>Termine heuten<span style={{ float: 'right', fontWeight: 'bold' }}>9</span></a>
                </List.Content>
              </List.Item>
            </List>
          </CardContent>
        </Card>
      </ToolsSection>
    </Stage>
    )
  }
}

export default Feeds;
