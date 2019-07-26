import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Exercise from './Exercise';
import CustomerHeader from "../../components/CustomerHeader";
import Header from "../../components/Header";
import { EXERCISE, PLANEXERCISE } from "../../queries";

class ExerciseWithData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      translations: [],
    };
    this.goBack = this.goBack.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  };

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  getCommandsRight() {
    return ([]);
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

  groupWorkouts(workouts) {
    var grouped = _.mapValues(_.groupBy(workouts, 'formated_date'), clist => clist.map(workout => _.omit(workout, 'formated_date')));
    return grouped
  }

  render() {
    const {processing} = this.state;
    const {exerciseId, planexerciseId, memberId} = this.props;

    return(
      <Query
        query={exerciseId ? EXERCISE : PLANEXERCISE}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
        variables={{
          exerciseId: exerciseId,
          memberId: memberId,
          planexerciseId: planexerciseId,

        }}
      >
        {({ data, loading, error, fetchMore }) => {
          const exercise = data && (exerciseId > 0 ? (data.exercise ? data.exercise : {}) : (data.planexercise ? data.planexercise.exercise : {}))

          return (
            <Scene
              commandsLeft={this.getCommandsLeft()}
              commandsRight={this.getCommandsRight()}
              processing={processing}
              headerChildren={
                data && data.exercise && data.exercise.member && (<CustomerHeader
                  userId={data.exercise.member.id}
                  firstName={data.exercise.member.first_name}
                  lastName={data.exercise.member.last_name}
                />)
              }
              t={this.t}
            >
              <Exercise
                exercise={exercise}
                workouts={data && data.exercise && data.exercise.workouts ? this.groupWorkouts(data.exercise.workouts) : undefined}
                t={this.t}
              />
            </Scene>
          )
        }}
      </Query>
    )
  }
}

export default ExerciseWithData;
