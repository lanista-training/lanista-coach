import React, { Component, useState, useEffect } from 'react';
import _ from 'lodash';
import arrayMove from 'array-move';
import moment from "moment";
import Router from 'next/router';

import Scene from "../../components/Scene";
import withData from "./DataProvider";
import Exercise from "./Exercise";
import ExerciseHeader from "./ExerciseHeader";
import Header from "../../components/Header";
import RecommendationPanel from '../../components/RecommendationPanel';
import {getCommandsLeft, getCommandsRight} from "./commands.js";

const groupWorkouts = (workouts) => {
  var grouped = _.mapValues(_.groupBy(workouts, 'formated_date'), clist => clist.map(workout => _.omit(workout, 'formated_date')));
  return grouped;
}

import {SidePanelButton} from "./styles";

const Panel = ({
  exercise,
  loading,
  saveExerciseSettings,
  createProtocoll,
  deleteProtocoll,
  createNote,
  deleteNote,
  exerciseId,
  planexerciseId,
  memberId,
}) => {
  //
  // Translations
  //
  const [translations, setTranslations] = React.useState([]);
  const t = (text) => {
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }
  const onChangeLanguage = ( language ) => {
    const domainTranslations = require('../../../static/locales/' + language + '/exercise');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];
    setTranslations({...domainTranslations, ...commonTranslations});
  }
  React.useEffect(() => {
    onChangeLanguage("de");
  }, []);

  //
  // Tabs management
  //
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabName, setActiveTabName] = useState((exercise && exercise.member) ? '' : 'info');
  const onTabChange = (e, {activeIndex, panes}) => {
    setActiveTab(activeIndex);
    setActiveTabName(panes[activeIndex].id);
  }

  //
  // Video player
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const onToggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
  }

  //
  // Message management
  //
  const [message, setMessage] = useState('');
  const onMessageChange = (e, {value}) => {
    setMessage(value);
  }

  // Settings management
  const [settings, setSettings] = useState({
    indications: "",
    sets: 0,
    weight:0,
    training: 0,
    unit: 0,
    setsConfiguration: [],
  });

  React.useEffect(() => {
    if(exercise) {
      const {settings} = exercise;
      if(settings) {
        setSettings({
            indications: settings.indications,
            sets: settings.rounds,
            weight:settings.weight,
            training: settings.training,
            unit: settings.unit,
            setsConfiguration: settings.sets ? JSON.parse(JSON.stringify(settings.sets)) : [],
        });
      }
    }
  }, [exercise]);

  React.useEffect(() => {
    if(settings && exercise && exercise.settings && settings.setsConfiguration.length > 0 && exercise.settings.sets.length > 0 && settings.setsConfiguration.length !== exercise.settings.sets.length) {
      onSendSettings();
    }
  }, [settings]);

  const onSettingsChange = (newSettings) => {
    setSettings({...newSettings});
  }

  const onSendSettings = () => {
    const {indications, sets, weight, training, unit, setsConfiguration} = settings;
    saveExerciseSettings({ variables: {
      planexerciseId: planexerciseId,
      indications: indications,
      sets: sets,
      weight: weight,
      training: training,
      unit: unit,
      setsConfig: JSON.stringify(setsConfiguration.map(set => ({
        weight: set.weight,
        training: set.training,
        unit: set.unit,
      }))),
    }});
  }

  //
  // Protocoll management
  //
  const onCreateProtocoll = (targetDate, training, unit, weight) => {
    createProtocoll({
      variables: {
        exerciseId: exerciseId,
        memberId: memberId,
        executionDate: moment(targetDate).format('YYYY-MM-DD'),
        training: training,
        unit: unit,
        weight: weight,
      }
    })
  }

  const onDeleteProtocoll = (id) => {
    deleteProtocoll({
      variables: {
        protocollId: id,
      }
    })
  }

  //
  // Chart management
  //
  const [activeChart, setActiveChart] = useState(0);
  const toggleActiveChart = () => {
    const {activeChart} = this.state
    this.setState({
      activeChart: !activeChart,
    })
  }

  //
  // Notes management
  //
  const onCreateNote = (note) => {
    createNote({
      variables: {
        text: note,
        memberId: memberId,
        exerciseId: exerciseId,
        planexerciseId: planexerciseId,
      }
    })
  }
  const onDeleteNote = (id) => {
    deleteNote({
      variables: {
        noteId: id,
      }
    })
  }

  console.log("activeTabName")
  console.log(activeTabName)

  return (
    <Scene
      commandsLeft={getCommandsLeft({
          goBack: () => Router.back()
        })
      }
      commandsRight={getCommandsRight()}
      headerChildren={<ExerciseHeader exercise={exercise} />}
      t={t}
    >
      <Exercise
        exercise={exercise ? exercise : {}}
        groppedWorkouts={groupWorkouts(exercise ? exercise.workouts : [])}
        settings={settings}

        t={t}

        activeTab={activeTab}
        onTabChange={onTabChange}

        isVideoOpen={isVideoOpen}
        onToggleVideo={onToggleVideo}

        onSettingsChange={onSettingsChange}
        onSyncSettings={onSendSettings}
        onCreateNote={onCreateNote}
        onDeleteNote={onDeleteNote}

        message={message}
        onMessageChange={onMessageChange}
        onCreateProtocoll={onCreateProtocoll}
        deleteProtocoll={onDeleteProtocoll}
        activeChart={activeChart}
        loading={loading}

        editable={exercise ? exercise.editable : false}
      />
    { exercise && (activeTab == 5 || activeTabName == 'info') &&
      <RecommendationPanel exerciseId={exercise.id} style={{position: "fixed", top: "calc(100vh - 70px)"}}/>
    }
    </Scene>
  )
}

const PanelWithData = ({exerciseId, planexerciseId, memberId}) => {
  const ExerciseData = withData(Panel, {exerciseId, planexerciseId, memberId});
  return <ExerciseData/>
}

export default PanelWithData;
