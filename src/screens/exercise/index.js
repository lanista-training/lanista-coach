import React, { Component, useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import arrayMove from 'array-move';
import moment from "moment";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Scene from "../../components/Scene";
import withData from "./DataProvider";
import Exercise from "./Exercise";
import ExerciseHeader from "./ExerciseHeader";
import Header from "../../components/Header";
import RecommendationPanel from '../../components/RecommendationPanel';
import {getCommandsLeft, getCommandsRight} from "./commands.js";
import {SidePanelButton} from "./styles";

const groupWorkouts = (workouts) => {
  var grouped = _.mapValues(_.groupBy(workouts, 'formated_date'), clist => clist.map(workout => _.omit(workout, 'formated_date')));
  return grouped;
}

const Panel = ({
  exercise,
  refetch,
  loading,
  saveExerciseSettings,

  createProtocoll,
  createProtocollLoading,
  createProtocollError,

  deleteProtocoll,
  deleteProtocollLoading,

  createNote,
  createNoteLoading,
  createNoteError,

  deleteNote,
  deleteNoteLoading,

  exerciseId,
  planexerciseId,
  memberId,
  tab,
  editmode,

  deleteExercise,
  deleteExerciseLoading,
  deleteExerciseError,
  exerciseDeleted,

  createChatMessage,
  createChatMessageLoading,
  createChatMessageError,

  deleteChatMessage,
  deleteChatMessageLoading,

  networkStatus,

  goBack,
  goToExercise,
  goToSetup,
}) => {
  const {t} = useTranslate("exercise");
  //
  // Chart type switch
  //
  const [activeChart, setActiveChart] = React.useState(true);
  const toggleActiveChart = () => setActiveChart(!activeChart);

  //
  // Tabs management
  //
  const [activeTab, setActiveTab] = useState(tab ? tab : 0);
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
  const onMessageChange = (value) => {
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
    if(settings
      && exercise
      && exercise.settings
      && (
        (settings.setsConfiguration.length > 0 && exercise.settings.sets.length > 0 && settings.setsConfiguration.length !== exercise.settings.sets.length)
        || exercise.settings.training != settings.training
        || exercise.settings.weight != settings.weight
        || exercise.settings.unit != settings.unit
      )) {
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
      weight: parseFloat(weight),
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
        executionDate: moment(targetDate).format('YYYY-MM-DD hh:mm:ss'),
        training: typeof training === 'string' ? parseInt(training.replace(',', '.')) : training,
        unit: unit,
        weight: typeof weight === 'string' ? parseFloat(weight.replace(',', '.')) : weight,
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
  const onCreateChatMessage = () => {
    createChatMessage({
      variables: {
        text: message,
        memberId: memberId,
        exerciseId: exerciseId,
      }
    });
    setMessage('');
  }
  const onDeleteChatMessage = (messageId) => {
    deleteChatMessage({
      variables: {
        messageId: messageId,
      }
    });
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

  //
  // Edit mode
  //
  const [editMode, setEditMode] = React.useState(false);
  const toggleEditMode = () => setEditMode(!editMode);
  React.useEffect(() => {
    if(editmode) {
      setEditMode(true);
    }
  }, [editmode])
  //
  // Edit name mode
  //
  const [editNameMode, setEditNameMode] = React.useState(false);
  const toggleEditNameMode = () => setEditNameMode(!editNameMode);

  //
  // Edit image mode
  //
  const [editImageMode, setEditImageMode] = React.useState(false);
  const toggleEditImageMode = (image) => setEditImageMode(editImageMode > 0 ? false : image);

  //
  // Edit video mode
  //
  const [editVideoMode, setEditVideoMode] = React.useState(false);
  const toggleEditVideoMode = () => setEditVideoMode(!editVideoMode);

  //
  // Edit indexes mode
  //
  const [editIndexesMode, setEditIndexesMode] = React.useState(false);
  const toggleEditIndexesMode = () => setEditIndexesMode(!editIndexesMode);

  //
  // Delete exercise
  //
  const onDeleteExercise = () => {
    console.log("onDeleteExercise");
    deleteExercise({
      variables: {
        exerciseId: exercise.id,
      }
    })
  }
  React.useEffect(() => {
    if( exerciseDeleted ) {
      goBack()
    }
  }, [exerciseDeleted]);

  //
  // Delete Dialog
  //
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  //
  // Licence exired handling
  //
  const [showLicenceExpiredWarning, setShowLicenceExpiredWarning] = useState(false);
  const toggleLicenceExpiredWarning = () => setShowLicenceExpiredWarning(!showLicenceExpiredWarning);
  useEffect(() => {
    if( createProtocollError && createProtocollError.message.indexOf('LICENCEINVALID') > -1 ) {
      toggleLicenceExpiredWarning();
    } else  if( createNoteError && createNoteError.message.indexOf('LICENCEINVALID') > -1 ) {
      toggleLicenceExpiredWarning();
    }  else  if( createChatMessageError && createChatMessageError.message.indexOf('LICENCEINVALID') > -1 ) {
      toggleLicenceExpiredWarning();
    } else {
      setShowLicenceExpiredWarning(false);
    }
  }, [createProtocollError, createNoteError, createChatMessageError]);

  return (
    <Scene
      commandsLeft={getCommandsLeft({
          goBack,
          t,
        })
      }
      commandsRight={ getCommandsRight(
        t,
        activeTabName,
        exercise && exercise.owner,
        editMode,
        toggleEditMode,
        onToggleVideo,
        toggleEditVideoMode,
        handleClickOpen,
        activeChart,
        toggleActiveChart
      )}
      headerChildren={<ExerciseHeader
        owner={editMode && exercise && exercise.owner}
        exercise={exercise}
        editNameMode={editNameMode}
        toggleEditNameMode={toggleEditNameMode}/>
      }
      t={t}
      networkStatus={networkStatus}

      showLicenceExpiredWarning={showLicenceExpiredWarning}
      onCloseLicenceExpiredWarning={toggleLicenceExpiredWarning}
      goToSetup={goToSetup}
    >
      <Exercise
        exercise={exercise ? exercise : {}}
        refetch={refetch}
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
        createNoteLoading={createNoteLoading}

        onCreateChatMessage={onCreateChatMessage}
        createChatMessageLoading={createChatMessageLoading}

        onDeleteChatMessage={onDeleteChatMessage}
        deleteChatMessageLoading={deleteChatMessageLoading}

        onDeleteNote={onDeleteNote}
        deleteNoteLoading={deleteNoteLoading}

        message={message}
        onMessageChange={onMessageChange}

        onCreateProtocoll={onCreateProtocoll}
        createProtocollLoading={createProtocollLoading}

        deleteProtocoll={onDeleteProtocoll}
        deleteProtocollLoading={deleteProtocollLoading}

        loading={loading}

        editable={exercise ? exercise.editable : false}
        owner= {editMode && exercise && exercise.owner}

        editNameMode={editNameMode}
        toggleEditNameMode={toggleEditNameMode}

        editImageMode={editImageMode}
        toggleEditImageMode={toggleEditImageMode}

        editVideoMode={editVideoMode}
        toggleEditVideoMode={toggleEditVideoMode}

        editIndexesMode={editIndexesMode}
        toggleEditIndexesMode={toggleEditIndexesMode}

        activeChart={activeChart}

      />
    { exercise && (activeTab == 5 || activeTabName == 'info') &&
      <RecommendationPanel
        exerciseId={exercise.id}
        style={{position: "fixed", top: "calc(100vh - 70px)"}}
        goToExercise={goToExercise}
      />
    }
    { open &&
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("delete_dialog_title")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("delete_dialog_description")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("delete_cancel")}
          </Button>
          <Button onClick={onDeleteExercise} color="primary" autoFocus>
            {t("delete_ok")}
          </Button>
        </DialogActions>
      </Dialog>
    }
    </Scene>
  )
}

const PanelWithData = ({exerciseId, planexerciseId, memberId, tab, editmode, goBack, goToExercise, goToSetup}) => {
  const ExerciseData = withData(Panel, {exerciseId, planexerciseId, memberId, tab, editmode, goBack, goToExercise, goToSetup});
  return <ExerciseData/>
}

export default PanelWithData;
