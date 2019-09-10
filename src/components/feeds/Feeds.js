import * as React from 'react'
import { useRef, useState } from 'react'
import Feed from "./Feed"
import styled from 'styled-components'
import InfiniteList from '../../components/InfiniteList'
import { List } from 'semantic-ui-react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import moment from 'moment'
import WidgetStatistic from '../../components/WidgetStatistic'
import WidgetProgressbar from '../../components/WidgetProgressbar'
import { MEMBERSCHEKEDIN, MYMEMBERS, EXPIREDPLANS } from "../../queries";

import Calender from '../../components/Calender'
import WidgetList from '../../components/WidgetList'

const StyledDateLabel = styled.div`
  font-family: Abel;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 0.5em;
`;
const Stage = styled.div`
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
  padding-top: 5em!important;
  height: 100vh;
`;
const Timeline = styled.div`
  overflow: visible;
  float: left;
  max-width: 410px;
  width: 100%;
`;
const ToolsSection = styled.div`
  max-width: 275px;
  width: 100%;
  padding-top: 1.5em;
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
`;
const StatisticsSection = styled.div`
  width: 9.7em;
`;
const Card = styled.div`
  background-color: white;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 5px;
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  font-family: Abel;
  height: auto;
  box-shadow: 0 0 27px 0 #0000001f;
}
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
const CardHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;
const FeedsTitle = styled.div`
  padding-top: 0.6em;
  padding-bottom: 0.5em;
  width: 6em;
  background: #bbb7b7;
  color: white;
  text-align: center;
  position: relative;
  border-radius: 5px;
  margin-bottom: 1em;
  margin-top: 1em;
  ::before {
    content: '';
    position: absolute;
    top: 2.5em;
    left: 1.8em;
    height: 1.2em;
    width: 4px;
    background: #bbb7b7;
    }
  }
`;

class Feeds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: new Date(),
    };
    this.setSelectedDay = this.setSelectedDay.bind(this)
  }

  componentDidMount() {
    var {jumpToDay} = this.props;
    setTimeout(function () {
        jumpToDay(new Date());
    }, 100);
  }

  setSelectedDay(newValue) {
    this.setState({
      selectedDay: newValue,
    })
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
      congratulateMember,
      openPlan,
      eventsQuery,
    } = this.props;
    const dataSource = [];

    var items = [];
    let previousTargetDate = ''

    if( feeds && feeds.length > 0 && moment(parseInt(feeds[0].title)).format('DD-MM-YYYY') < moment(new Date()).format('DD-MM-YYYY')) {
      const targetDate = moment(new Date()).format('DD-MM-YYYY')
      items.push(
        <FeedsTitle id={targetDate} key='empty-day-title'>{targetDate}</FeedsTitle>
      )
      items.push(
        <Feed
          t={t}
          key='empty-day-feed'
          feed={{
            type: 'EMPTY_DAY',
            target_date: ((new Date()).getTime() + ""),
            member: {
              id: 0,
              first_name: '',
              last_name: '',
            }
        }}/>
      )
    }
    feeds.map( (feedList, index) =>
    {
      feedList.data.map( (feed, index) =>
       {
         const targetDate = moment(parseInt(feed.target_date)).format('DD-MM-YYYY')
         if( previousTargetDate != targetDate ) {
           items.push(
             <FeedsTitle id={targetDate} key={feed.target_date}>{targetDate}</FeedsTitle>
           )
         }
         previousTargetDate = targetDate;
         items.push(
           <Feed
            t={t}
            key={feed.type + feed.member.id + feed.target_date}
            feed={feed}
            congratulateMember={congratulateMember}
            openPlan={openPlan}
          />
         );
       });
    });

    const {selectedDay, showMoldal} = this.state
    const percentage_1 = 66;
    const persentage_2 = 75

    return (
      <Stage id="feed-stage">
        <StatisticsSection>
          <WidgetStatistic
            title="Mitglieder im Studio"
            query={MEMBERSCHEKEDIN}
          />
          <WidgetStatistic
            title="Mitglieder mit plans von mir"
            query={MYMEMBERS}
          />
          <WidgetProgressbar
            title="Abgelaufene Pläne"
            query={EXPIREDPLANS}
          />
          <WidgetProgressbar
            title="Erstellte Pläne"
            query={EXPIREDPLANS}
          />
        </StatisticsSection>
        <Timeline className='hide-scrollbar' id="infinte-list-wrapper">
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
        </Timeline>
        <ToolsSection>
          <Card>
            <Calender
              t={t}
              selectedDay={moment(selectedDay).format('YYYY-MM-DD')}
              setSelectedDay={this.setSelectedDay}
            />
          </Card>
          <WidgetList
            query={eventsQuery}
            filter={'USER_BIRTHDAY'}
            title="Kommende Geburtstage"
          />
          <WidgetList
            query={eventsQuery}
            filter={'PLAN_STATUS'}
            title="Bald ablaufende Trainingspläne"
          />
        </ToolsSection>
      </Stage>
    )
  }
}

export default Feeds;
