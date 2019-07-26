import * as React from "react";
import Dashboard from './Dashboard';
import Router from 'next/router';
import { Query } from "react-apollo";
import _ from 'lodash';
import moment from "moment"
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
    this.goBack = this.goBack.bind(this)
    this.onFilterByTime = this.onFilterByTime.bind(this)
    this.jumpToDay = this.jumpToDay.bind(this)
    this.jumpToStart = this.jumpToStart.bind(this)
    this.t = this.t.bind(this)
    this.onChangeLanguage = this.onChangeLanguage.bind(this)
    this.processFeeds = this.processFeeds.bind(this)
    this.getNearestDate = this.getNearestDate.bind(this)
    this.previousCursor = {
      UP: "0",
      DOWN: "0",
    }
    this.previousDirection = ''
    this.endUpReached = false
    this.endDownReached = false
  }

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //  moment(parseInt(feed.target_date)).format('DD-MM-YYYY')
    const {initialLoading} = this.state
    //console.log("componentDidUpdate")
    //console.log( prevState.initialLoading )
    //console.log( initialLoading )
    if( initialLoading != prevState.initialLoading && prevState.initialLoading ){
      console.log("Jump")
      const nearestDate = this.getNearestDate(new Date());
      //const formatedDate = parseInt(nearestDate);
      document.getElementById( moment(parseInt(nearestDate)).format('DD-MM-YYYY') ).scrollIntoView();
    }
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
    const {dataSource} = this.state;
    var dateFormatted = new Date(day.getFullYear(),day.getMonth(),day.getDate());
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

  onFetchFeeds(fetchMore, data, direction) {
    const {filter, pageSize, initialLoading} = this.state
    const previousCursor = initialLoading ? "0" : (direction == this.previousDirection ? data.feeds.cursor : this.previousCursor[this.previousDirection == '' ? 'DOWN' : this.previousDirection]);
    if( direction != this.previousDirection ) {
      this.previousCursor[this.previousDirection == '' ? 'DOWN' : this.previousDirection] = data.feeds.cursor
      this.previousDirection = direction
    }
    fetchMore({
      variables: {
        after: previousCursor,
        pageSize: pageSize,
        filter: filter,
        direction: direction,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if( initialLoading ) {
          this.setState({initialLoading: false})
        }
        if (!fetchMoreResult) {
          //this.setState({
          //  hasMore: false
          //})
          return prev;
        } else {
          //this.setState({
          //  hasMore: fetchMoreResult.feeds.hasMore
          //})
          if( previousCursor == "0" && data.feeds.cursor.indexOf(':') > -1) {
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
                feeds: direction == 'DOWN' ? _.unionBy(prev.feeds.feeds, fetchMoreResult.feeds.feeds, value => (value.member.id + value.type)) : _.unionBy(fetchMoreResult.feeds.feeds, prev.feeds.feeds, value => (value.member.id + value.type)),
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
          direction: ""
        }}
        onCompleted={ (data) => {
          this.setState({
            initialLoading: false,
          })
          if( data.feeds.cursor.indexOf(':') > -1 ) {
            this.previousCursor["UP"] = data.feeds.cursor.split(":")[0]
            this.previousCursor["DOWN"] = data.feeds.cursor.split(":")[1]
          } else {
            this.previousCursor[(data.feeds.direction == '' ? "DOWN" : data.feeds.direction)] = data.feeds.cursor
          }
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          let hasMore = true
          let hasMoreup = true

          if( data && data.feeds && data.feeds.direction == '' ) {
            if( data.feeds.cursor.indexOf(':') > -1 ) {
              hasMore = data.feeds.cursor.split(':')[0] > 20
              hasMoreup = data.feeds.cursor.split(':')[1] > 20
              if( data.feeds.cursor.split(':')[0] ) this.endUpReached = true
            } else {
              hasMore = data.feeds.hasMore
              hasMoreup = data.feeds.hasMore
            }

          }
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
                currentScrollPosition={this.state.currentScrollPosition}
                jumpToDay={this.jumpToDay}
                onRequestPage={(direction) => this.onFetchFeeds(fetchMore, data, direction)}
                setPageSize={(newPageSize) => this.setState({pageSize: newPageSize})}
                loading={loading}
                error={error}
                hasMore={hasMore && !this.endUpReached}
                hasMoreUp={true}
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
