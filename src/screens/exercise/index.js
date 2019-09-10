import React, { Component, useState } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import Scene from "../../components/Scene";
import Exercise from './Exercise';
import ExerciseHeader from "../../components/ExerciseHeader";
import Header from "../../components/Header";
import { withApollo } from '../../../lib/apollo'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { EXERCISE, PLANEXERCISE, ME, PLANEXERCISESETTINGS } from "../../queries";
import { CREATENOTE, CREATECHATMESSAGE, SAVEEXERCISESETTINGS } from "../../mutations";

const Panel = ({exerciseId, planexerciseId, memberId}) => {
  const [createNote, { loading: mutationLoading, error: mutationError }] = useMutation(
    CREATENOTE,
    {
      update(cache,  { data: { createNote } }) {
        let {exercise} = cache.readQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
        });
        const {me} = cache.readQuery({
          query: ME
        });
        exercise.notes.push(
          {
            creator: {
              first_name: me.first_name,
              last_name: me.last_name,
              photoUrl: "http://lanista-training.com/tpmanager/img/p/" + me.id + "_photo.jpg",
              __typename: "User"
            },
            id: createNote.id,
            note_date: createNote.note_date,
            text: createNote.text,
            __typename: "Note"
          }
        )
        cache.writeQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
          data: { exercise: exercise },
        });
      }
    }
  );
  const [createChatMessage, { loading: mutationMessageLoading, error: mutationMessageError }] = useMutation(
    CREATECHATMESSAGE,
    {
      update(cache,  { data: { createChatMessage } }) {
        let {exercise} = cache.readQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
        });
        const {me} = cache.readQuery({
          query: ME
        });
        exercise.chats.push(
          {
            id: createChatMessage.id,
            first_name: me.first_name,
            last_name: me.last_name,
            type: 0,
            status: 0,
            photoUrl: "http://lanista-training.com/tpmanager/img/p/" + me.id + "_photo.jpg",
            creation_date: createChatMessage.creation_date,
            text: createChatMessage.text,
            exercise_name: exercise.name,
            exercise_start_image: exercise.start_image,
            exercise_end_image: exercise.end_image,
            __typename: "ChatMessage"
          }
        )
        cache.writeQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
          data: { exercise: exercise },
        });
      }
    }
  );

  const [saveExerciseSettings, { loading: mutationSettingsLoading, error: mutationSettingsError }] = useMutation(
    SAVEEXERCISESETTINGS,
    {
      update(cache,  { data: {saveExerciseSettings} }) {
        let {exercise} = cache.readQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
        });
        const {me} = cache.readQuery({
          query: ME
        });
        console.log("saveExerciseSettings")
        console.log(saveExerciseSettings)
        console.log(exercise)
        exercise.settings.indications = saveExerciseSettings.indications
        exercise.settings.rounds = saveExerciseSettings.rounds
        exercise.settings.weight = saveExerciseSettings.weight
        exercise.settings.repetitions = saveExerciseSettings.repetitions
        exercise.settings.training_unit = saveExerciseSettings.training_unit
        cache.writeQuery({
          query: EXERCISE,
          variables: {
            exerciseId: exerciseId,
            memberId: memberId,
            planexerciseId: planexerciseId,
          },
          data: { exercise: exercise },
        });
      }
    }
  );

  const { loading, error, data } = useQuery(EXERCISE, {variables: {
    exerciseId: exerciseId,
    memberId: memberId,
    planexerciseId: planexerciseId,
  }});

  return (
    <ExerciseWithData
      exerciseId={exerciseId}
      planexerciseId={planexerciseId}
      memberId={memberId}
      createNote={createNote}
      createChatMessage={createChatMessage}
      saveExerciseSettings={saveExerciseSettings}
      loading={loading || mutationLoading}
      data={data}
      error={error}
    />
  )
}

class ExerciseWithData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      activeTab: 0,
      activeTabName: props.memberId > 0 ? '' : 'info',
      translations: [],
      isVideoOpen: false,
      note: '',
      message: '',
      // Form data
      settings: {
        indications: "",
        sets: 0,
        weight:0,
        training: 0,
        unit: 0,
      }
    };
    this.goBack = this.goBack.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onToggleVideo = this.onToggleVideo.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onIndicationsChange = this.onIndicationsChange.bind(this);
    this.onSetsChange = this.onSetsChange.bind(this);
    this.onWeightChange = this.onWeightChange.bind(this);
    this.onRepetitionsChange = this.onRepetitionsChange.bind(this);
    this.onUnitChange = this.onUnitChange.bind(this);
    this.hasSettingsChange = this.hasSettingsChange.bind(this);
    this.sendSettings = this.sendSettings.bind(this);
  };

  componentDidMount() {
    this.onChangeLanguage("de");
    const {data} = this.props
    if(data && data.exercise) {
      const {settings} = data.exercise
      this.setState({
        settings: {
          indications: settings.indications,
          sets: settings.rounds,
          weight:settings.weight,
          training: settings.repetitions,
          unit: settings.training_unit,
        }
      })
    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate")
    const {data} = this.props
    console.log(data)
    console.log(prevProps.data)
    if( prevProps.data !== data ) {
      console.log("DATA CHANGED")
      if( data && data.exercise && data.exercise.settings) {
        console.log("Initializing settings data")
        const {settings} = data.exercise
        console.log(settings)
        this.setState({
          settings: {
            indications: settings.indications,
            sets: settings.rounds,
            weight:settings.weight,
            training: settings.repetitions,
            unit: settings.training_unit,
          }
        })
      }
    }
  }

  goBack() {
    Router.back();
  }

  sendSettings() {
    const {indications, sets, weight, training, unit} = this.state.settings
    const {saveExerciseSettings, planexerciseId} = this.props
    saveExerciseSettings({ variables: {
      planexerciseId: planexerciseId,
      indications: indications,
      sets: sets,
      weight: weight,
      training: training,
      unit: unit,
    }})
  }

  getCommandsRight() {
    const {activeTabName, note, message} = this.state
    return (activeTabName == 'info' ? [
      {
          //icon: CustomerIcon,
          icon: 'icon-play',
          text: 'plan-video',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            this.onToggleVideo()
          }
      }
    ]
    : (activeTabName == 'notes' && note && note.length > 0) ? [
      {
          //icon: CustomerIcon,
          icon: 'icon-sync',
          text: 'save-note',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          className: 'synchronize-icon',
          onTap: () => {
            this.saveNote()
          },
      }
    ]
    : (activeTabName == 'chats' && message && message.length > 0) ? [
      {
          //icon: CustomerIcon,
          icon: 'icon-sync',
          text: 'save-note',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          className: 'synchronize-icon',
          onTap: () => {
            this.sendMessage()
          },
      }
    ]
    : (activeTabName == 'settings' && this.hasSettingsChange()) ? [
      {
          //icon: CustomerIcon,
          icon: 'icon-sync',
          text: 'save-note',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          className: 'synchronize-icon',
          onTap: () => {
            this.sendSettings()
          },
      }
    ]
    :
    []);
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

  onNoteChange(e, {value}) {
    this.setState({
      note: value,
    })
  }

  saveNote() {
    const {createNote, exerciseId, memberId} = this.props
    createNote({ variables: {
       text: this.state.note,
       exerciseId: exerciseId,
       memberId: memberId,
     }})
    this.setState({
      note: ''
    })
  }

  onMessageChange(e, {value}) {
    this.setState({
      message: value,
    })
  }

  sendMessage() {
    const {createChatMessage, exerciseId, memberId} = this.props
    createChatMessage({ variables: {
       text: this.state.message,
       exerciseId: exerciseId,
       memberId: memberId,
     }})
    this.setState({
      message: ''
    })
  }

  //onTabChange(e, { activeIndex }) {
  onTabChange(e, {activeIndex, panes}) {
    this.setState({
      activeTab: activeIndex,
      activeTabName: panes[activeIndex].id
    })
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

  onToggleVideo() {
    const {isVideoOpen} = this.state
    this.setState({
      isVideoOpen: !isVideoOpen
    })
  }

  onIndicationsChange(event) {
    const {settings} = this.state
    this.setState({
      settings: {
        ...settings,
        indications: event.target.value && event.target.value.length > 0 ? event.target.value : null,
      },
    })
  }

  onSetsChange(value) {
    const {settings} = this.state
    const {sets} = settings
    if( isNaN(value) ) {
      if( value == 'up') {
        this.setState({
          settings: {
            ...settings,
            sets: sets + 1,
          },
        })
      } else {
        this.setState({
          settings: {
            ...settings,
            sets: sets > 0 ? sets - 1 : 0,
          },
        })
      }
    } else {
      this.setState({
        settings: {
          ...settings,
          sets: value,
        },
      })
    }
  }

  onWeightChange(value) {
    const {settings} = this.state
    const {weight} = settings
    if( isNaN(value) ) {
      if( value == 'up') {
        this.setState({
          settings: {
            ...settings,
            weight: weight + 1,
          },
        })
      } else {
        this.setState({
          settings: {
            ...settings,
            weight: weight > 0 ? weight - 1 : 0,
          },
        })
      }
    } else {
      this.setState({
        settings: {
          ...settings,
          weight: parseFloat(value),
        },
      })
    }

  }

  onRepetitionsChange(direction) {
    const {settings} = this.state
    const {training} = settings
    if( direction == 'up') {
      this.setState({
        settings: {
          ...settings,
          training: training + 1,
        },
      })
    } else {
      this.setState({
        settings: {
          ...settings,
          training: training > 0 ? training - 1 : 0,
        },
      })
    }
  }

  onUnitChange(direction) {
    const {settings} = this.state
    const {unit} = settings
    if( direction == 'up') {
      this.setState({
        settings: {
          ...settings,
          unit: (unit + 1) % 3,
        },
      })
    } else {
      this.setState({
        settings: {
          ...settings,
          unit: unit == 0 ? 2 : ((unit - 1) % 3),
        },
      })
    }
  }

  hasSettingsChange() {
    const remoteSettings = this.props.data && this.props.data.exercise.settings
    const {settings} = this.state
    if(remoteSettings) {
      console.log( "remoteSettings" )
      console.log(remoteSettings)
      console.log(settings)
      const {indications, sets, weight, training, unit} = settings
      return (remoteSettings.indications != indications || remoteSettings.rounds != sets || remoteSettings.weight != weight || remoteSettings.repetitions != training || remoteSettings.training_unit != unit)
    } else {
      return false;
    }
  }

  render() {
    const {processing, activeTab, isVideoOpen, note, message, settings} = this.state;
    const {exerciseId, planexerciseId, memberId, loading, error, data} = this.props;
    const exercise = data && (exerciseId  ? (data.exercise ? data.exercise : {}) : (data.planexercise ? data.planexercise.exercise : {}))
    return (
      <Scene
        commandsLeft={this.getCommandsLeft()}
        commandsRight={this.getCommandsRight()}
        processing={processing}
        headerChildren={
          data && data.exercise && data.exercise.member && (<ExerciseHeader
            userId={data.exercise.member.id}
            firstName={data.exercise.member.first_name}
            lastName={data.exercise.member.last_name}
            exerciseName={data.exercise.name}
          />)
        }
        t={this.t}
      >
        <Exercise
          exercise={exercise}
          workouts={data && data.exercise && data.exercise.workouts ? this.groupWorkouts(data.exercise.workouts) : undefined}
          notes={data && data.exercise && data.exercise.notes ? data.exercise.notes : undefined}
          chats={data && data.exercise && data.exercise.chats ? data.exercise.chats : undefined}
          settings={settings}
          t={this.t}
          activeTag={activeTab}
          onTabChange={this.onTabChange}
          isVideoOpen={isVideoOpen}
          onToggleVideo={this.onToggleVideo}
          note={note}
          message={message}
          onIndicationsChange={this.onIndicationsChange}
          onSetsChange={this.onSetsChange}
          onWeightChange={this.onWeightChange}
          onTrainingChange={this.onRepetitionsChange}
          onUnitChange={this.onUnitChange}
          onNoteChange={this.onNoteChange}
          onMessageChange={this.onMessageChange}
          filterStyles={{
            shoulder: {"fill":(exercise.muscle == "3" ? "red" : "rgb(151, 151, 151)"), "fillRule":"nonzero"},
            biceps: {"fill":(exercise.muscle == "8" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            triceps: {"fill":(exercise.muscle == "9" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            forearm: {"fill":(exercise.muscle == "10" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            chest: {"fill":(exercise.muscle == "1" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            upperback: {"fill":(exercise.muscle == "2" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            lowerback: {"fill":(exercise.muscle == "5" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            abs: {"fill":(exercise.muscle == "7" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            hip: {"fill":(exercise.muscle == "6" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            frontfemoral: {"fill":(exercise.muscle == "4" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            backfemoral: {"fill":(exercise.muscle == "4" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
            lowerleg: {"fill":(exercise.muscle == "11" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
          }}
          loading={loading}
        />
      </Scene>
    )
  }
}

export default withApollo(Panel)
