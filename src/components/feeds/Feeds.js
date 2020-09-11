import * as React from 'react';
import { useRef, useState } from 'react';
import Feed from "./Feed";
import { StyledDateLabel, Stage, Timeline, ToolsSection, StatisticsSection, Card, CardContent, CardHeader, FeedsTitle} from "./styles";
import InfiniteList from '../../components/InfiniteList';
import { List } from 'semantic-ui-react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import moment from 'moment';

import WidgetStatistic from '../../components/WidgetStatistic';
import WidgetProgressbar from '../../components/WidgetProgressbar';
import WidgetAverage from '../../components/WidgetAverage';

import { MEMBERSCHEKEDIN, MYMEMBERS, EXPIREDPLANS, MEMBERSACTIVITY, PLANSCREATED, PERSONALTRAINERSTATISTIC1, PERSONALTRAINERSTATISTIC2 } from "../../queries";

import Calender from '../../components/Calender';
import WidgetList from '../../components/WidgetList';
import Widget from '../../components/Widget';

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
      type,
      jumpToDay,
      onRequestPage,
      loading,
      error,
      hasMore,
      hasMoreUp,
      initialLoading,
      setPageSize,
      congratulateMember,
      openMember,
      openPlan,
      eventsQuery,
      bu,
      hasInterface,

      setFilter,
    } = this.props;

    const dataSource = [];

    var items = [];
    let previousTargetDate = '';

    if( feeds && feeds.length > 0 && moment(feeds[0].title, 'DD-MM-YYYY').diff(new Date(), 'days') < 0 ) {
      const targetDate = moment(new Date()).format('DD-MM-YYYY')
      items.push(
        <FeedsTitle id={targetDate} key='empty-day-title'>{moment(new Date()).format('DD.')} <span>{moment(new Date()).format('MMMM')}</span></FeedsTitle>
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
         const targetDate = moment(parseInt(feed.target_date)).format('DD. MMMM')
         if( previousTargetDate != targetDate ) {
           items.push(
             <FeedsTitle
               id={targetDate}
               key={feed.target_date + index}
               style={previousTargetDate == "" ? {marginTop: "1em"} : {}}
             >
             {moment(parseInt(feed.target_date)).format('DD.')} <span>{moment(parseInt(feed.target_date)).format('MMMM')}</span>
           </FeedsTitle>
           )
         }
         previousTargetDate = targetDate;
         items.push(
           <Feed
            t={t}
            key={feed.type + feed.member.id + feed.target_date + index}
            feed={feed}
            congratulateMember={congratulateMember}
            openPlan={openPlan}
          />
         );
       });
    });

    const {selectedDay, showMoldal} = this.state
    const percentage_1 = 66;
    const persentage_2 = 75;

    const getFirstStatisticQuery = () => {
      return MEMBERSCHEKEDIN;
    }

    const getSecondStatisticQuery = () => {
      return MYMEMBERS;
    }

    return (
      <Stage id="feed-stage">
        <StatisticsSection>

          <Widget className="dashboard-widget-first-child">
            <WidgetStatistic
              title={t( 'STATISTC_1_' + type + (hasInterface ? '_WITH_INTERFACE' : '') )}
              query={getFirstStatisticQuery()}
              t={t}
            />
          </Widget>

          <Widget className="dashboard-widget">
            <WidgetStatistic
              title={t( 'STATISTC_2_' + type + (hasInterface ? '_WITH_INTERFACE' : '') )}
              query={getSecondStatisticQuery()}
              t={t}
              onClick={() => setFilter('PLAN_STATUS')}
            />
          </Widget>

          <Widget className="dashboard-widget">
            <WidgetProgressbar
              title={t( 'STATISTC_3_' + type + (hasInterface ? '_WITH_INTERFACE' : '') )}
              query={bu > 0 ? EXPIREDPLANS : PERSONALTRAINERSTATISTIC1}
              t={t}
            />
          </Widget>

          <Widget className="dashboard-widget">
            <WidgetAverage
              title={t( 'STATISTC_4_' + type + (hasInterface ? '_WITH_INTERFACE' : '') )}
              query={bu > 0 ? PLANSCREATED : PERSONALTRAINERSTATISTIC2}
              t={t}
            />
          </Widget>

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
        { !error &&
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
              title={t("COMMING_BIRTHDAYS")}
              openMember={openMember}
            />
            <WidgetList
              query={eventsQuery}
              filter={'PLAN_STATUS'}
              title={t('SOON_EXPIRED_PLANS')}
              openMember={openMember}
            />
          </ToolsSection>
        }
      </Stage>
    )
  }
}

export default Feeds;
