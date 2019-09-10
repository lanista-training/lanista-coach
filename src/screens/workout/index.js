import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { withApollo } from '../../../lib/apollo'
import { useMutation, useQuery } from '@apollo/react-hooks';
import Scene from "../../components/Scene";
import Workout from './Workout';
import WorkoutHeader from "../../components/WorkoutHeader";
import { WORKOUT } from "../../queries";

const Panel = ({workoutId}) => {
  const { loading, error, data } = useQuery(WORKOUT, {variables: {
    workoutId: workoutId,
  }});
  return (
    <WorkoutWithData
      loading={loading}
      data={data}
      error={error}
    />
  )
}

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

  showExercise(exerciseId, memberId, planexerciseId) {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        member: memberId,
        planexercise: planexerciseId
      }
    });
  }

  render() {
    const {processing} = this.state;
    const {loading, error, data} = this.props;
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
  }
}

export default withApollo(Panel);
