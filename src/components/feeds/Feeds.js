import * as React from 'react'
import { useRef, useState } from 'react'
import Feed from "./Feed"
import styled from 'styled-components'
import InfiniteList from '../../components/InfiniteList'
import { List } from 'semantic-ui-react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import moment from 'moment'

import Calender from '../../components/Calender'

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
const Timeline = styled.div`
  overflow: auto;
  padding-top: 1.5em;
  float: left;
  margin-right: 28px;
  max-width: 550px;
  width: 100%;
  margin-bottom: 4em;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 4em;
    height: 100%;
    width: 4px;
    background: white;
  }
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
  width: 6em;
  background: white;
  text-align: center;
  z-index: 10;
  position: relative;
  border-radius: 5px;
  margin-bottom: 1em;
  margin-top: 1em;
`;

class Feeds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: new Date(),
    };
  }

  componentDidMount() {
    var {jumpToDay} = this.props;
    setTimeout(function () {
        jumpToDay(new Date());
    }, 100);
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
    } = this.props;
    const dataSource = [];

    var items = [];
    let previousTargetDate = ''

    if( feeds && feeds.length > 0 && moment(parseInt(feeds[0].title)).format('DD-MM-YYYY') < moment(new Date()).format('DD-MM-YYYY')) {
      const targetDate = moment(new Date()).format('DD-MM-YYYY')
      items.push(
        <FeedsTitle id={targetDate} key={targetDate}>{targetDate}</FeedsTitle>
      )
      items.push(
        <Feed
          t={t}
          key={targetDate + '-0'}
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

    return (
      <Stage id="feed-stage">
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
          <Calender t={t}/>
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
