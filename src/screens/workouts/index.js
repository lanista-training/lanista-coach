import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import moment from "moment";
import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Workouts from './Workouts';
import WorkoutsHeader from "../../components/WorkoutsHeader";
import { WORKOUTS, PLUGINS } from "../../queries";
import { Search } from 'semantic-ui-react';

const Centered  = styled.div`
  padding-top: 26vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: column;
`;

class WorkoutsWithData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      processing: false,
      filter: '',
      translations: [],
      pluginMenuIsOpen: false,
      textSearchIsOpen: false,
    };
    this.goBack = this.goBack.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.onOpenPluginsMenu = this.onOpenPluginsMenu.bind(this);
    this.onClosePluginsMenu = this.onClosePluginsMenu.bind(this);
    this.curateTextSearchResults = this.curateTextSearchResults.bind(this);
    this.openWorkout = this.openWorkout.bind(this)
  };

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  setFilter(newFilter) {
    const {filter} = this.state
    this.setState({
      filter: filter == newFilter ? '' : newFilter
    })
    this.onClosePluginsMenu()
  }

  onOpenPluginsMenu() {
    this.setState({
      pluginMenuIsOpen: true
    })
  }

  onClosePluginsMenu() {
    this.setState({
      pluginMenuIsOpen: false
    })
  }

  toggleTextSearch() {
    const {textSearchIsOpen} = this.state
    this.setState({
      textSearchIsOpen: !textSearchIsOpen,
      filter: ''
    })
  }

  onTextSearch(text) {
    this.setState({
      filter: 'text:' + text
    })
  }

  openWorkout(workoutId) {
    console.log("openWorkout")
    console.log(workoutId)
    Router.push({
      pathname: '/workout',
      query: { workout: workoutId }
    });
  }

  curateTextSearchResults(results) {
    return results.map((workout) => ({
      title: workout.name,
      description: workout.description
    }))
  }

  getCommandsRight() {
    const {textSearchIsOpen} = this.state
    return ([{
          icon: 'icon-plus',
          text: 'new user',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'new user',
          onTap: () => {
            console.log("Create Workout");
          }
      }, {
          icon: textSearchIsOpen ? 'icon-list' : 'icon-search',
          text: 'folder',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'folder',
          onTap: () => {
            this.toggleTextSearch()
          }
      }]);
  }

  getCommandsLeft() {
    return ([{
          //icon: CustomerIcon,
          icon: 'icon-back',
          text: 'Back',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            this.goBack();
          }
      }, {
          //icon: CustomerIcon,
          icon: 'icon-tools-inactive',
          text: 'Setting',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'settings',
          onTap: () => {
            console.log("Command Settings");
          }
      }, {
          //icon: HelpIcon,
          icon: 'icon-help-inactive',
          text: 'Help',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'help-circle',
          onTap: () => {
            console.log("Command Help");
          }
      }]);
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

  render() {
    const {processing, filter, pluginMenuIsOpen, textSearchIsOpen} = this.state;
    const {memberId} = this.props;
    return(
      <Query
        query={WORKOUTS}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
        variables={{
          memberId: memberId,
          filter: filter
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          return (
            <Scene
              commandsLeft={this.getCommandsLeft()}
              commandsRight={this.getCommandsRight()}
              processing={processing}
              t={this.t}
              headerChildren={
                <Query
                  query={PLUGINS}
                  notifyOnNetworkStatusChange
                  fetchPolicy="cache-and-network"
                >
                  {({ data, loading, error, fetchMore }) => {
                    return(<WorkoutsHeader
                      setFilter={this.setFilter}
                      filter={filter}
                      plugins={(data && data.plugins) ? data.plugins : [] }
                      pluginMenuIsOpen={pluginMenuIsOpen}
                      onOpenPluginsMenu={this.onOpenPluginsMenu}
                      onClosePluginsMenu={this.onClosePluginsMenu}
                    />)
                  }}
                </Query>
              }
            >
              {
                textSearchIsOpen ?
                (
                  <Centered>
                    <Search
                      loading={loading}
                      onSearchChange={(event, { value }) => this.onTextSearch(value)}
                      results={this.curateTextSearchResults(data.workouts)}
                    />
                  </Centered>
                ) : (
                  <Workouts
                    workouts={data && data.workouts ? data.workouts : []}
                    t={this.t}
                    openWorkout={this.openWorkout}
                  />
                )
              }
            </Scene>
          )
        }}
      </Query>
    )
  }
}

export default WorkoutsWithData;
