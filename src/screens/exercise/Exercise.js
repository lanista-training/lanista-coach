import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Label, Tab, Menu, Modal, Input, Dimmer, Form } from 'semantic-ui-react';
import moment from "moment";
import Chat from "../../components/Chat";
import ReactPlayer from 'react-player';
import {colors, SyledDimmer, SyledTab, StyledModal, SyledExercise, Stage} from './styles';
import Button from '@material-ui/core/Button';

import InfoPane from './InfoPane';
import ConfigurationPane from './ConfigurationPane';
import ProtocollsPane from './ProtocollsPane';
import ChartPane from './ChartPane';
import NotesPane from './NotesPane';

const Exercise = ({
  exercise,
  refetch,
  groppedWorkouts,
  settings,

  t,

  activeTab,
  onTabChange,

  isVideoOpen,
  onToggleVideo,

  onSettingsChange,
  onSyncSettings,
  onCreateNote,

  onDeleteNote,
  deleteNoteLoading,

  message,
  onMessageChange,

  onCreateProtocoll,
  createProtocollLoading,

  onCreateChatMessage,
  createChatMessageLoading,

  onDeleteChatMessage,
  deleteChatMessageLoading,

  deleteProtocoll,
  deleteProtocollLoading,

  activeChart,

  loading,
  error,

  editable,
  owner,

  editNameMode,
  toggleEditNameMode,

  editImageMode,
  toggleEditImageMode,

  editVideoMode,
  toggleEditVideoMode,

  editIndexesMode,
  toggleEditIndexesMode,

} ) => {

  React.useEffect(() => {
    if( !loading ) {
      el.current && el.current && el.current.scrollIntoView({ block: 'end' });
    }
  }, [loading]);

  const {workouts, notes, chats} = exercise ? exercise : {};

  const onEditStartImage = () => {
    toggleEditImageMode(1);
  }

  const onEditEndImage = () => {
    toggleEditImageMode(2);
  }

  const panes = [
    { menuItem: 'Info', id: 'info', render: () =>
      <InfoPane
        t={t}
        key="pane-info"
        className="info-pane"

        exercise={exercise}
        refetch={refetch}
        owner={owner}

        editNameMode={editNameMode}
        toggleEditNameMode={toggleEditNameMode}

        editImageMode={editImageMode}
        toggleEditImageMode={toggleEditImageMode}

        editVideoMode={editVideoMode}
        toggleEditVideoMode={toggleEditVideoMode}

        editIndexesMode={editIndexesMode}
        toggleEditIndexesMode={toggleEditIndexesMode}
      />
    }
  ]

  if( exercise && exercise.settings && editable ) {
    panes.push({ menuItem: 'Einstellungen', id: 'settings', render: () =>
      <ConfigurationPane
        t={t}
        settings={settings}
        onSettingsChange={onSettingsChange}
        onSyncSettings={onSyncSettings}
        editable={editable}
      />
    })
  }

  if( notes ) {
    panes.push({ menuItem: (
      <Menu.Item key='notes'>
        Notizen<Label>{notes.length}</Label>
      </Menu.Item>
    ), id: 'notes', render: () =>
      <NotesPane
        t={t}
        key="pane-notes"
        className="notes-pane"

        notes={notes}
        loading={loading || deleteNoteLoading || deleteProtocollLoading}
        onCreateNote={onCreateNote}
        onDeleteNote={onDeleteNote}
        editable={editable}
      />
    })
  }

  if( chats && editable ) {
    panes.push({ menuItem: (
      <Menu.Item key='notes'>
        Chats<Label>{chats.length}</Label>
      </Menu.Item>
    ), id: 'chats', render: () =>
      <Tab.Pane>
        {exercise.member && (
          <div className="chat-panel">
            <Chat
              t={t}
              member={exercise.member}
              closePanel={() => console.log("CLOSE CHAT PANEL")}
              visible={true}
              data={exercise && exercise.chats ? exercise.chats : []}
              loading={loading}
              error={error}
              hideHeader={true}
              hideExercises={true}
              hideInputField={false}
              onMessageChange={onMessageChange}
              message={message}
              editable={editable}

              onCreateChatMessage={onCreateChatMessage}
              createChatMessageLoading={createChatMessageLoading}

              onDeleteChatMessage={onDeleteChatMessage}
              deleteChatMessageLoading={deleteChatMessageLoading}
            />
          </div>
        )}
      </Tab.Pane>
    })
  }

  if( groppedWorkouts && editable && exercise.member) {
    panes.push({ menuItem: 'Graphiken', id: 'chart', render: () =>
      <ChartPane
        t={t}
        settings={settings}
        workouts={groppedWorkouts}
        activeChart={activeChart}
      />
    });
  }

  if( groppedWorkouts && editable && exercise.member) {
    panes.push({ menuItem: (
      <Menu.Item key='protocolls'>
        {t("protocolls")}<Label>{groppedWorkouts && _.size(groppedWorkouts)}</Label>
      </Menu.Item>
    ), id: 'protocolls', render: () =>
      <ProtocollsPane
        t={t}
        key="protocolls-pane"
        className="protocolls-pane"
        settings={settings}
        workouts={groppedWorkouts}

        onCreateProtocoll={onCreateProtocoll}
        createProtocollLoading={createProtocollLoading}

        deleteProtocoll={deleteProtocoll}
        deleteProtocollLoading={deleteProtocollLoading}
      />
    });
  }

  panes.reverse()
  const el = useRef(null);
  const {training, unit} = settings;

  return(
    <Stage>
      <SyledExercise>

        <div className={owner ? "image-section editable" : "image-section"}>
          <div className="image-wrapper">
            <div className={editImageMode == 2 ? "image-top image-disabled" : "image-top"} onClick={() => owner && onEditStartImage()} style={{backgroundImage: 'url(' + exercise.start_image +')'}}/>
            <div className={editImageMode == 1 ? "image-bottom image-disabled" : "image-bottom"} onClick={() => owner && onEditEndImage()} style={{backgroundImage: 'url(' + exercise.end_image +')'}}/>
          </div>
        </div>

        <div className="content-section">
          <SyledTab
            menu={{secondary: true, pointing: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, tab) => {
              onTabChange(e, tab)
              setTimeout(function(){
                  el.current && el.current && el.current.scrollIntoView({ block: 'end' })
              }, 100);
            }}
            activeIndex={activeTab}
          />
        </div>
      </SyledExercise>

      <StyledModal
        open={isVideoOpen}
        onClose={onToggleVideo}
        size="small"
        dimmer='inverted'
      >
        { (exercise.videoUrl && exercise.videoUrl.length > 0) ?
          <ReactPlayer
            url={exercise.videoUrl}
            playing
            controls
          /> :
          <div className="no-video">
            <div className="message">{t("no-video")}</div>
            <div className="buttons">
              <Button onClick={onToggleVideo} variant="outlined">
                OK
              </Button>
            </div>
          </div>
        }
      </StyledModal>
    </Stage>
  )
};

Exercise.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * The object with all relevant information about the exercise
  */
  exercise: PropTypes.object,

  /**
   * Call this funcion to a fresh object from the server
  */
  refetch: PropTypes.func,

  /**
   * A curated list of protocolls (groupped by day)
  */
  groppedWorkouts: PropTypes.array,

  /**
   * If available (not null), the exercise configuration in a workout
  */
  settings: PropTypes.object,

  /**
   * The current tab shown
  */
  activeTab: PropTypes.number,

  /**
   * Is calle whhen the current tab change
  */
  onTabChange: PropTypes.func,

  /**
   * A flag to show the video window
  */
  isVideoOpen: PropTypes.bool,

  /**
   * To change the value of the video flag
  */
  onToggleVideo: PropTypes.func,

  /**
   * Called to update the current value of all settings
  */
  onSettingsChange: PropTypes.func,

  /**
   * Call this fucntion to synchronize with the server
  */
  onSyncSettings: PropTypes.func,

  /**
   * Call to send a new exercise note to the server
  */
  onCreateNote: PropTypes.func,

  /**
   * Call to delete an exercise note from the server
  */
  onDeleteNote: PropTypes.func,

  /**
   * Graphql flag when deleting a note
  */
  deleteNoteLoading: PropTypes.bool,

  /**
   * The value of the new message to be used in the form
  */
  message: PropTypes.string,

  /**
   * The function to be used in the form for new messages
  */
  onMessageChange: PropTypes.func,

  /**
   * Send a new protocoll entry to the server
  */
  onCreateProtocoll: PropTypes.func,

  /**
   * Graphql loading flag for the function onCreateProtocoll
  */
  createProtocollLoading: PropTypes.bool,

  /**
   * Send a new chat entry to the server
  */
  onCreateChatMessage: PropTypes.func,

  /**
   * Graphql loading flag for the function onCreateChatMessage
  */
  createChatMessageLoading: PropTypes.bool,

  /**
   * Remove a chat message from the server
  */
  onDeleteChatMessage: PropTypes.func,

  /**
   * Graphql loading flag for the function onDeleteChatMessage
  */
  deleteChatMessageLoading: PropTypes.bool,

  /**
   * Delete a protocoll entry from the server
  */
  deleteProtocoll: PropTypes.func,

  /**
   * Graphql loading flag for the function deleteProtocoll
  */
  deleteProtocollLoading: PropTypes.bool,

  /**
   * 0: for BMI
   * 1. for Average
  */
  activeChart: PropTypes.number,

  /**
   * Grahpql flag for loading new data
  */
  loading: PropTypes.bool,

  /**
   * Graphql error object for loading data
  */
  error: PropTypes.object,

  /**
   * Flag to enable / disable the editing buttons in the panel
  */
  editable: PropTypes.bool,

  /**
   * Flag to show of the current trainer is the creator of the exercise
  */
  owner: PropTypes.bool,

  /**
   * If true, show the input field for the exercise name
  */
  editNameMode: PropTypes.bool,

  /**
   * Show / Hide input field for the exercise name
  */
  toggleEditNameMode: PropTypes.func,

  /**
   * If true, show the image editor
  */
  editImageMode: PropTypes.bool,

  /**
   * Show / hide image editor
  */
  toggleEditImageMode: PropTypes.func,

  /**
   * If true show the input field for the video url
  */
  editVideoMode: PropTypes.bool,

  /**
   * Show / hide the input field for the video url
  */
  toggleEditVideoMode: PropTypes.func,

  /**
   * If true show the panel for editing the search attributes
  */
  editIndexesMode: PropTypes.bool,

  /**
   * Show / hide panel to edit the search attributes
  */
  toggleEditIndexesMode: PropTypes.func,

}

export default Exercise;
