import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Workout from './Workout';
import WorkoutHeader from "../../components/WorkoutHeader";
import { WORKOUT } from "../../queries";

class WorkoutWithData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      processing: false,
      translations: [],
    };
    this.goBack = this.goBack.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.showExercise = this.showExercise.bind(this);
  };

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  getCommandsRight() {
    return ([{
      icon: 'icon-create-protocoll',
      text: 'folder',
      type: 'type-1',
      typex: 'Ionicons',
      name: 'folder',
      onTap: () => {
        console.log("Create Protocoll");
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
    const translations = require('../../../static/locales/' + language + '/workout');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  showExercise(planexerciseId) {
    Router.push({
      pathname: '/exercise',
      query: { planexercise: planexerciseId }
    });
  }

  render() {
    const {processing} = this.state;
    const {workoutId} = this.props;

    return(
      <Query
        query={WORKOUT}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
        variables={{
          workoutId: workoutId,
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          return (
            <Scene
              commandsLeft={this.getCommandsLeft()}
              commandsRight={this.getCommandsRight()}
              processing={processing}
              headerChildren={
                <WorkoutHeader
                  title={data && data.workout ? data.workout.name : ''}
                  subtitle={data && data.workout ? ('Planduar: ' + data.workout.duration + ' Wochen') : ''}
                />
              }
              t={this.t}
            >
              <Workout
                workout={data && data.workout ? data.workout : undefined}
                t={this.t}
                onShowExercise={this.showExercise}
              />
            </Scene>
          )
        }}
      </Query>
    )
  }
}

export default WorkoutWithData;
