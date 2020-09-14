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
   * Function to translate content
  */
  exercise: PropTypes.object,

  /**
   * Function to translate content
  */
  refetch: PropTypes.func,

  /**
   * Function to translate content
  */
  groppedWorkouts: PropTypes.array,

  /**
   * Function to translate content
  */
  settings: PropTypes.object,

  /**
   * Function to translate content
  */
  activeTab: PropTypes.number,

  /**
   * Function to translate content
  */
  onTabChange: PropTypes.func,

  /**
   * Function to translate content
  */
  isVideoOpen: PropTypes.bool,

  /**
   * Function to translate content
  */
  onToggleVideo: PropTypes.func,

  /**
   * Function to translate content
  */
  onSettingsChange: PropTypes.func,

  /**
   * Function to translate content
  */
  onSyncSettings: PropTypes.func,

  /**
   * Function to translate content
  */
  onCreateNote: PropTypes.func,

  /**
   * Function to translate content
  */
  onDeleteNote: PropTypes.func,

  /**
   * Function to translate content
  */
  deleteNoteLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  message: PropTypes.string,

  /**
   * Function to translate content
  */
  onMessageChange: PropTypes.func,

  /**
   * Function to translate content
  */
  onCreateProtocoll: PropTypes.func,

  /**
   * Function to translate content
  */
  createProtocollLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  onCreateChatMessage: PropTypes.func,

  /**
   * Function to translate content
  */
  createChatMessageLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  onDeleteChatMessage: PropTypes.func,

  /**
   * Function to translate content
  */
  deleteChatMessageLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  deleteProtocoll: PropTypes.func,

  /**
   * Function to translate content
  */
  deleteProtocollLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  activeChart: PropTypes.number,

  /**
   * Function to translate content
  */
  loading: PropTypes.bool,

  /**
   * Function to translate content
  */
  error: PropTypes.object,

  /**
   * Function to translate content
  */
  editable: PropTypes.bool,

  /**
   * Function to translate content
  */
  owner: PropTypes.bool,

  /**
   * Function to translate content
  */
  editNameMode: PropTypes.bool,

  /**
   * Function to translate content
  */
  toggleEditNameMode: PropTypes.func,

  /**
   * Function to translate content
  */
  editImageMode: PropTypes.bool,

  /**
   * Function to translate content
  */
  toggleEditImageMode: PropTypes.func,

  /**
   * Function to translate content
  */
  editVideoMode: PropTypes.bool,

  /**
   * Function to translate content
  */
  toggleEditVideoMode: PropTypes.func,

  /**
   * Function to translate content
  */
  editIndexesMode: PropTypes.bool,

  /**
   * Function to translate content
  */
  toggleEditIndexesMode: PropTypes.func,

}

export default Exercise;
