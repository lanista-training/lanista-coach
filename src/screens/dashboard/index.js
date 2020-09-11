import * as React from "react";
import Dashboard from './Dashboard';

import { withApollo } from '../../lib/apollo';
import { useQuery } from '@apollo/react-hooks';

import _ from 'lodash';
import moment from 'moment';
import Scene from "../../components/Scene";
import Filter from "../../components/feeds/Filter"

import { FEEDS, INCOMINGEVENTS, ME } from "../../queries";
import BirthdayPanel from '../../components/BirthdayPanel'

import {getCommandsLeft, getCommandsRight} from "./commands";

const Panel = ({
  goToCustomers,
  goToCustomer,
  goToExercises,
  goToWorkouts,
  goToTests,
  goBack,
  goToSetup,
}) => {
  // infinity list variables
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(20);
  const [filter, setFilter] = React.useState(undefined);

  const { data, error, loading, fetchMore, networkStatus } = useQuery(FEEDS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: {
      pageSize: pageSize,
      after:  "0",
      filter: filter,
    },
    onCompleted: (data) => {
      setInitialLoading(false)
    }
  });

  const {data: meData} = useQuery(ME, { ssr: false, fetchPolicy: 'cache-first' });
  const me = meData ? meData : {};

  // translation variables
  const [translations, setTranslations] = React.useState([]);
  const [currentLanguage, setCurrentLanguage] = React.useState('');
  const [availableLanguages, setAvailableLanguages] = React.useState([]);

  const [targetDates, setTargetDates] = React.useState([]);

  React.useEffect(() => {
    onChangeLanguage("de");
    const pendingUserId = window.localStorage.getItem('pending_user_id');
    window.localStorage.removeItem('pending_user_id');
    if( pendingUserId && pendingUserId > 0 ) {
      goToCustomer(pendingUserId);
    }
  }, []);

  React.useEffect(() => {
    //onFetchFeeds(fetchMore, data, "DOWN");
  }, [pageSize]);

  const processFeeds = (rawFeeds) => {
    let newTargetDates = []
    let dataSource = _.groupBy(rawFeeds, o => moment(new Date(parseInt(o.target_date))).format('D-MM-YYYY') );
    dataSource = _.reduce(dataSource, (acc, next, index) => {
      newTargetDates.push(parseInt(index))
      acc.push({
        title: index,
        data: next
      });
      return acc;
    }, [])
    //setTargetDates(newTargetDates);
    return dataSource;
  }

  const getNearestDate = (date) => {
    const nearest = this.targetDates.find(function(targetDate) {
      return (new Date(targetDate) > date);
    });
    return nearest
  }

  const jumpToDay = (day) => {
    // CALCULATE THE CURRENT POSSITION OF THE FIRST ELEMENT FROM TODAY

  }

  const congratulateMember = (memberId) => {
    goToCustomer(memberId);
  }

  const openMember = (memberId) => {
    goToCustomer(memberId);
  }

  const openPlan = (memberId, planId) => {
    goToCustomer(memberId);
  }

  const t = (text) => {
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  const onChangeLanguage = ( language ) => {
    const domainTranslations = require('../../../static/locales/' + language + '/dashboard');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];
    setTranslations({...domainTranslations, ...commonTranslations});
    setCurrentLanguage(language);
    setAvailableLanguages(originalLanguages.filter(word => word !== language));
  }

  const onFetchFeeds = (data) => {

    const cursor = initialLoading ? "0" : data.feeds.cursor;

    fetchMore({
      variables: {
        after: cursor,
        pageSize: pageSize,
        filter: filter,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        setInitialLoading(false);
        if (!fetchMoreResult) {
          setHasMore(false);
          return prev;
        } else {
          setHasMore(fetchMoreResult.feeds.hasMore)
          if( cursor == "0" ) {
            return {
              ...fetchMoreResult,
              feeds: {
                ...fetchMoreResult.feeds,
                feeds: fetchMoreResult.feeds.feeds,
              },
            };
          } else {
            return {
              ...fetchMoreResult,
              feeds: {
                ...fetchMoreResult.feeds,
                feeds: _.unionBy(prev.feeds.feeds, fetchMoreResult.feeds.feeds, value => (value.member.id + value.type)),
              },
            };
          }
        }
      },
    })
  }

  const result = (data && data.feeds) ? data.feeds : {feeds: []}
  const {bu, hasInterface, role} = me && me.me ? me.me : {};

  return (
    <Scene
      commandsLeft={getCommandsLeft(t)}
      commandsRight={getCommandsRight(
        t,
        goToCustomers,
        goToExercises,
        goToWorkouts,
        goToTests,
      )}
      headerChildren={
        <Filter
          onFilterByType={(filterValue) => {
            if( filterValue === 'APT') filterValue = 'EXP_PLANS'
            if( filterValue === 'MSG') filterValue = 'EXP_PLANS'
            const newFilter = (filter == filterValue ? undefined : filterValue);
            console.log("filterValue")
            console.log(filterValue)
            setFilter(newFilter)
            setInitialLoading(true)
            setPageSize(20)
          }}
          filter={filter}
          t={t}
        />
      }
      processing={false}
      t={t}
      networkStatus={networkStatus}
      goToSetup={goToSetup}
    >
      <Dashboard
        t={t}
        type={ (bu > 0 ? 'GYM_' : 'PERSONAL_') + role }
        goBack={goBack}
        feeds={processFeeds(result.feeds)}
        jumpToDay={jumpToDay}
        onRequestPage={(direction) => onFetchFeeds(data, direction)}
        setPageSize={ (newPageSize) => setPageSize(newPageSize) }
        loading={loading}
        error={error || (data && !data.feeds)}
        hasMore={hasMore}
        initialLoading={initialLoading}
        congratulateMember={congratulateMember}
        openMember={openMember}
        openPlan={openPlan}
        modalPanel={false}
        eventsQuery={INCOMINGEVENTS}
        accesslevel={me ? me.accesslevel : 2}
        bu={bu}
        hasInterface={hasInterface}

        setFilter={setFilter}
      />
    </Scene>
  )
}

export default withApollo(Panel);
