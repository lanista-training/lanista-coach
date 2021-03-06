import * as React from 'react';
import { useRef, useState } from 'react';
import Feed from "./Feed";
import {
  StyledDateLabel,
  Stage, Timeline,
  ToolsSection,
  StatisticsSection,
  Card,
  CardContent,
  CardHeader,
  FeedsTitle
} from "./styles";
import InfiniteList from '../../components/InfiniteList';
import { List } from 'semantic-ui-react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import moment from 'moment';
import {
  MEMBERSCHEKEDIN,
  MYMEMBERS,
  EXPIREDPLANS,
  MEMBERSACTIVITY,
  PLANSCREATED,
  PERSONALTRAINERSTATISTIC1,
  PERSONALTRAINERSTATISTIC2,
  MYMEMBERSLIST,
} from "../../queries";

import Calender from '../../components/Calender';
import WidgetList from '../../components/WidgetList';
import Widget from '../../components/Widget';
import WidgetStatistic from '../../components/WidgetStatistic';
import WidgetProgressbar from '../../components/WidgetProgressbar';
import WidgetAverage from '../../components/WidgetAverage';

import Menu from '@material-ui/core/Menu';
import MaterialList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import MaterialCard from '@material-ui/core/Card';
import MaterialCardActionArea from '@material-ui/core/CardActionArea';
import MaterialCardContent from '@material-ui/core/CardContent';

const Feeds = ({
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

  getMembersList,
  membersListLoading,
  membersListData,

  goToCustomers,
  goToWorkouts,
}) => {

  const [selectedDay, setSelectedDay] = React.useState(new Date());
  React.useEffect(() => {
    setTimeout(function () {
        jumpToDay(new Date());
    }, 100);
  }, []);

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

  const getFirstStatisticQuery = () => {
    return MEMBERSCHEKEDIN;
  }

  const getSecondStatisticQuery = () => {
    return MYMEMBERS;
  }

  const [widget1AnchorEl, setWidget1AnchorEl] = React.useState(null);
  const handleWidget1Click = (event) => {
    setWidget1AnchorEl(event.currentTarget);
  };
  const handleWidget1Close = () => {
    setWidget1AnchorEl(null);
  };

  const {myMembersList} = membersListData ? membersListData : {myMembersList: []};

  return (
    <Stage id="feed-stage">
      <StatisticsSection>
        <Widget className="dashboard-widget-first-child">
          <WidgetStatistic
            title={t( 'STATISTC_1_' + type + (hasInterface ? '_WITH_INTERFACE' : '') )}
            query={getFirstStatisticQuery()}
            t={t}
            onClick={(e) => {
              //handleWidget1Click(e);
            }}
          />
        </Widget>
        <Menu
          id="simple-menu"
          anchorEl={widget1AnchorEl}
          keepMounted
          open={Boolean(widget1AnchorEl)}
          onClose={handleWidget1Close}
        >
          <MaterialList>
            { myMembersList && myMembersList.length > 0 && (
              myMembersList.map(member => (
                <ListItem button alignItems="flex-start" onClick={() => openMember(member.id)}>
                  <ListItemAvatar>
                    <Avatar alt={member.first_name + ' ' + member.last_name} src={member.photoUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={member.first_name + ' ' + member.last_name}></ListItemText>
                </ListItem>
              ))
            )}
            { myMembersList.length === 0 && (
              <div className="widget-empty-list">{t("widget-empty-list")}...</div>
            )}
          </MaterialList>
        </Menu>
        <Widget className="dashboard-widget">
          <WidgetStatistic
            title={t( 'STATISTC_2_' + type + (hasInterface ? '_WITH_INTERFACE' : '') )}
            query={getSecondStatisticQuery()}
            t={t}
            onClick={(e) => {
              getMembersList();
              handleWidget1Click(e);
            }}
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
        {items && items.length > 0 && (
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
        )}
        {!(items && items.length > 0) && !loading && (
          <>
            <div className="buttons-list">
              <MaterialCard style={{marginRight: "20px"}}>
                <MaterialCardActionArea onClick={goToCustomers}>
                  <div className="card-content">
                    <div className="card-title">{t("create-customer")}</div>
                    <div className="card-text">{t("create-customer-text")}</div>
                  </div>
                </MaterialCardActionArea>
              </MaterialCard>
              <MaterialCard>
                <MaterialCardActionArea onClick={goToWorkouts}>
                  <div className="card-content">
                    <div className="card-title">{t("create-plan")}</div>
                    <div className="card-text">{t("create-plan-text")}</div>
                  </div>
                </MaterialCardActionArea>
              </MaterialCard>
            </div>
            <div className="empty-feeds-list">{t("empty-feeds-list")}</div>
          </>
        )}
      </Timeline>
      { !error &&
        <ToolsSection>
          <Card>
            <Calender
              t={t}
              selectedDay={moment(selectedDay).format('YYYY-MM-DD')}
              setSelectedDay={setSelectedDay}
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

export default Feeds;
