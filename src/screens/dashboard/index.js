import * as React from "react";
import Dashboard from './Dashboard';
import Router from 'next/router';
import { Query } from "react-apollo";
import _ from 'lodash';
import moment from "moment"
import Scene from "../../components/Scene";
import Filter from "../../components/feeds/Filter"

import { FEEDS, CALENDARENTRIES } from "../../queries";

class DashboardWithoutMutation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      filter: undefined,
      translations: [],
      initialLoading: true,
    }
    this.goBack = this.goBack.bind(this)
    this.onFilterByTime = this.onFilterByTime.bind(this)
    this.jumpToDay = this.jumpToDay.bind(this)
    this.jumpToStart = this.jumpToStart.bind(this)
    this.t = this.t.bind(this)
    this.onChangeLanguage = this.onChangeLanguage.bind(this)
    this.processFeeds = this.processFeeds.bind(this)
    this.getNearestDate = this.getNearestDate.bind(this)
    this.congratulateMember = this.congratulateMember.bind(this)
    this.openPlan = this.openPlan.bind(this)
  }

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {initialLoading} = this.state
    /*
    if( initialLoading != prevState.initialLoading && prevState.initialLoading ){
      console.log("Jump")
      const nearestDate = this.getNearestDate(new Date());
      //const formatedDate = parseInt(nearestDate);
      document.getElementById( moment(parseInt(nearestDate)).format('DD-MM-YYYY') ).scrollIntoView();
    }
    */
  }

  processFeeds(rawFeeds) {
    let targetDates = []
    let dataSource = _.groupBy(rawFeeds, o => o.target_date.toLocaleString().split(',')[0].split( ".").join("-"));
    dataSource = _.reduce(dataSource, (acc, next, index) => {
      targetDates.push(parseInt(index))
      acc.push({
        title: index,
        data: next
      });
      return acc;
    }, []);
    this.targetDates = targetDates
    return dataSource;
  }

  getNearestDate(date) {
    const nearest = this.targetDates.find(function(targetDate) {
      return (new Date(targetDate) > date);
    });
    return nearest
  }

  goBack() {
    Router.back();
  }

  onFilterByTime() {
    console.log("Filter by past events");
  }

  jumpToDay(day) {
    // CALCULATE THE CURRENT POSSITION OF THE FIRST ELEMENT FROM TODAY

  }

  jumpToStart() {

  }

  congratulateMember(memberId){
    Router.push({
      pathname: '/customer',
      query: { customer: memberId }
    });
  }

  openPlan(memberId, planId){
    console.log("openPlan")
    console.log(memberId)
    console.log(planId)
    Router.push({
      pathname: '/workout',
      query: { workout: planId }
    });
  }

  t(text) {
    const {translations} = this.state;
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  onChangeLanguage( language ) {
    const translations = require('../../../static/locales/' + language + '/dashboard');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  onFetchFeeds(fetchMore, data) {
    const {filter, pageSize, initialLoading} = this.state
    const cursor = initialLoading ? "0" : data.feeds.cursor;

    fetchMore({
      variables: {
        after: cursor,
        pageSize: pageSize,
        filter: filter,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if( initialLoading ) {
          this.setState({initialLoading: false})
        }
        if (!fetchMoreResult) {
          this.setState({
            hasMore: false
          })
          return prev;
        } else {
          this.setState({
            hasMore: fetchMoreResult.feeds.hasMore
          })
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

  render() {
    const {dataSource, filter, initialLoading} = this.state;
    const commandsRight = [{
        icon: 'icon-customer-inactive',
        iosname: 'customer-inactive',
        text: '',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'people',
        onTap: () => {
          Router.push("/customers");
        }
    }, {
        icon: 'icon-exercise-inactive',
        iosname: 'exercise-inactive',
        text: '',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'exercises',
        onTap: () => {
          Router.push("/exercises");
        }
    }, {
        icon: 'icon-training-plan-inactive',
        iosname: 'workout-inactive',
        text: '',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'calendar',
        onTap: () => {
          console.log("Command Workouts.");
          Router.push("/workouts");
        }
    }];

    const commandsLeft = [{
        icon: 'icon-tools-inactive',
        iosname: 'tools-inactive',
        text: 'Setting',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'settings',
        onTap: () => {
          console.log("Command Settings");
        }
    }, {
        icon: 'icon-help-inactive',
        iosname: 'help-inactive',
        text: 'Help',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'help-circle',
        onTap: () => {
          console.log("Command Help");
        }
    }];

    return (
      <Query
        notifyOnNetworkStatusChange={true}
        query={FEEDS}
        variables={{
          pageSize:20,
          after: "0",
        }}
        onCompleted={ (data) => {
          this.setState({
            initialLoading: false,
          })
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          const hasMore = (data && data.feeds) ? data.feeds.hasMore : false
          const result = (data && data.feeds) ? data.feeds : {feeds: []}

          return (
            <Scene
              commandsLeft={commandsLeft}
              commandsRight={commandsRight}
              headerChildren={
                <Filter
                  onFilterByTime={this.jumpToStart}
                  onFilterByType={(filterValue) => {
                    console.log("FILTER VALUE")
                    console.log( filterValue )
                    if( filterValue === 'APT') filterValue = 'EXP_PLANS'
                    if( filterValue === 'MSG') filterValue = 'EXP_PLANS'
                    const {filter} = this.state;
                    const newFilter = (filter == filterValue ? undefined : filterValue);
                    this.setState({
                      filter: newFilter,
                      initialLoading: true,
                      pageSize: 20,
                    }, () => {
                      this.onFetchFeeds(fetchMore, data, "DOWN");
                    });

                  }}
                  filter={filter}
                />
              }
              processing={false}
              t={this.t}
            >
              <Dashboard
                t={this.t}
                goBack={this.goBack}
                feeds={this.processFeeds(result.feeds)}
                jumpToDay={this.jumpToDay}
                onRequestPage={(direction) => this.onFetchFeeds(fetchMore, data, direction)}
                setPageSize={(newPageSize) => this.setState({pageSize: newPageSize})}
                loading={loading}
                error={error}
                hasMore={hasMore}
                initialLoading={initialLoading}
                congratulateMember={this.congratulateMember}
                openPlan={this.openPlan}
              />
            </Scene>
          );
        }}
      </Query>
    );
  }
}

export default DashboardWithoutMutation;
