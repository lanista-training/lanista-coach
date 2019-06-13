import * as React from "react";
import Dashboard from './Dashboard';
import Router from 'next/router';
import { Query } from "react-apollo";
import _ from 'lodash';

import Scene from "../../components/Scene";
import Filter from "../../components/feeds/Filter"

import { FEEDS } from "../../queries";

class DashboardWithoutMutation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScrollPosition: 0,
      dataSource: [],
      filter: undefined,
      translations: [],
      initialLoading: true,
    }
    this.goBack = this.goBack.bind(this);
    this.onFilterByTime = this.onFilterByTime.bind(this);
    this.jumpToDay = this.jumpToDay.bind(this);
    this.jumpToStart = this.jumpToStart.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.processFeeds = this.processFeeds.bind(this);
  }

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  processFeeds(rawFeeds) {
    let dataSource = _.groupBy(rawFeeds, o => o.target_date.toLocaleString().split(',')[0].split( ".").join("-"));
    dataSource = _.reduce(dataSource, (acc, next, index) => {
      acc.push({
        title: index,
        data: next
      });
      return acc;
    }, []);
    return dataSource;
  }

  goBack() {
    Router.back();
  }

  goToCustomers() {
    Router.push("/customers");
  }

  onFilterByTime() {
    console.log("Filter by past events");
  }

  jumpToDay(day) {
    // CALCULATE THE CURRENT POSSITION OF THE FIRST ELEMENT FROM TODAY
    console.log("day selectd", day);
    const {dataSource} = this.state;
    var dateFormatted = new Date(day.getFullYear(),day.getMonth(),day.getDate());
    console.log("dateFormatted index: ", dateFormatted);
    var counter = 0;
    var found = false;
    console.log("datas: ",dataSource);
    for( var i = 0; i < dataSource.length && !found; i++) {
      const tmp = dataSource[i].title.split("-");
      const myDate = new Date(tmp[2], tmp[1]-1, tmp[0]);
      if( myDate.getTime() === dateFormatted.getTime()  ) {
        found = true;
      } else {
        counter = counter + dataSource[i].data.length;
      }
    };

    console.log("counter: ", counter);
    this.setState({
      currentScrollPosition: counter
    })
  }

  jumpToStart() {
    if( this.state.currentScrollPosition == 0) {
      this.setState({
        currentScrollPosition: 100
      })
    } else {
      this.setState({
        currentScrollPosition: -1
      }, () => {
        this.setState({
          currentScrollPosition: 0
        })
      })
    }
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
    const previousCursor = initialLoading ? "0" : data.feeds.cursor;

    fetchMore({
      variables: {
        after: previousCursor,
        pageSize: pageSize,
        filter: filter,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if( initialLoading ) {
          this.setState({initialLoading: false})
        }
        if (!fetchMoreResult) {
          console.log( 'No result')
          this.setState({
            hasMore: false
          })
          return prev;
        } else {
          console.log( 'Cursor ' + fetchMoreResult.feeds.cursor)
          this.setState({
            hasMore: fetchMoreResult.feeds.hasMore
          })
          console.log( 'previousCursor ' + previousCursor)
          if( previousCursor == 0) {
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
          this.goToCustomers();
        }
    }, {
        icon: 'icon-exercise-inactive',
        iosname: 'exercise-inactive',
        text: '',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'exercises',
        onTap: () => {
          console.log("Command Exercises");
        }
    }, {
        icon: 'icon-training-plan-inactive',
        iosname: 'workout-inactive',
        text: '',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'calendar',
        onTap: () => {
          console.log("Command Workouts");
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
          pageSize: 10,
          after: "0",
        }}
        onCompleted={ (data) => {
          console.log('query completed')
          this.setState({
            initialLoading: false,
          })
          console.log(data)
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          const hasMore = data && data.feeds ? data.feeds.hasMore : true
          const result = (data && data.feeds) ? data.feeds : {feeds: []}
          return (
            <Scene
              commandsLeft={commandsLeft}
              commandsRight={commandsRight}
              headerChildren={
                <Filter
                  onFilterByTime={this.jumpToStart}
                  onFilterByType={(filterValue) => {
                    const {filter} = this.state;
                    const newFilter = (filter == filterValue ? undefined : filterValue);
                    this.setState({
                      filter: newFilter,
                      initialLoading: true,
                    }, () => {
                      this.onFetchFeeds(fetchMore, data);
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
                currentScrollPosition={this.state.currentScrollPosition}
                jumpToDay={this.jumpToDay}
                onRequestPage={(pageSize) => this.onFetchFeeds(fetchMore, data)}
                setPageSize={(newPageSize) => this.setState({pageSize: newPageSize})}
                loading={loading}
                error={error}
                hasMore={hasMore}
                initialLoading={initialLoading}
              />
            </Scene>
          );
        }}
      </Query>
    );
  }
}

export default DashboardWithoutMutation;
