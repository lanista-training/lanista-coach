import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialList from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Fab from '@material-ui/core/Fab';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MaterialButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScrollBooster from 'scrollbooster';
import {
  Icon,
  List,
} from 'semantic-ui-react';
import {
  ActivityList,
  ProtocolsOptions,
  StyledMenu,
  DailyList,
  Header,
  Exercise,
  ExerciseImages,
  ExerciseProtocolls,
  Protocoll,
} from './styles';

const VisibilitySensor = require('react-visibility-sensor');

const formatHeader = (text) => {
  return moment(new Date(text)).format("DD-MM-YYYY")
}

const WorkoutsList = (
  t,
  me,
  workouts,
  plans,
  loading,
  notesListEl,
  notesAnchorEl,
  setNotesAnchorEl,
  onCreateNote,
  handleNotesClose,
  notesList,
  newNote,
  onNewNoteChange,
  protocollsOptionsAnchorEl,
  handleProtocollsOptionsClose,
  dayLists,
  notes,
  onProtocollClick,
  handleProtocollsOptionsClick,
  onCreatePlanFromWorkout,
  handleNotesClick,
  selectedDay,
  editingMode,
  selectedNoteId,
  setSelectedNoteId,
  toggleEditingMode,
  editNote,
  onEditNoteChange,
  onUpdateNote,
  onDeleteNote,
  onAddWorkoutsToPlan,

  listSize,
  onEndOfList,
) => {

  const list = [];

  if( workouts ) {
    _.map(dayLists, (dayList, titel) =>
    {

      if( list.length > listSize ) return null;

      const protocolls = _.groupBy(dayList, (workout) => workout.exercise_id);
      _.reverse(protocolls);

      const dayNotes = notes.filter( note => moment(new Date(parseInt(note.note_date))).format("YYYY-MM-DD") == titel);
      list.push(
        <DailyList>
          <Header as='h3'>
            <div onClick={(event) => handleProtocollsOptionsClick(event, titel)}>{formatHeader(titel)}</div>
            <div
              className={dayNotes.length > 0 ? "header-button with-bardget" : "header-button"}
              onClick={(event) => handleNotesClick(event, titel)}
            >
              <Icon name='sticky note outline' style={{float: "right", fontSize: "1.3em", paddingRight: "1em"}}/>
              {dayNotes.length > 0 &&
                <div className="button-bardget">{dayNotes.length}</div>
              }
            </div>
          </Header>
          <List.Content style={{ fontSize: "1em", overflowY: "scroll", paddingBottom: "1em"}} className={"hide-scrollbar"}>
          {
            _.map(protocolls, (protocoll, exercise_id) => {
              return (
                <Exercise key={'exercise-' + exercise_id} onClick={() => onProtocollClick(exercise_id)}>
                  <ExerciseImages style={{backgroundImage: "url(" + protocoll[0].start_image_url + "), url(" + protocoll[0].end_image_url + ")"}}></ExerciseImages>
                  <ExerciseProtocolls>
                    {
                      protocoll.map( (execution, index) => {
                        return (
                            <Protocoll key={'execution-' + execution.id} className={execution.self_protocolled ? "self-protocolled" : ""}>
                              {execution.weight} {t("KG")} / {execution.repetitions} {execution.training_unit == 0 ? t("REP") : execution.training_unit == 1 ? t("SEC") : t("MIN")}
                            </Protocoll>
                        );
                      })
                    }
                  </ExerciseProtocolls>
                </Exercise>
              )
            })
          }
          </List.Content>
        </DailyList>
      )
    })
    if( list.length < _.size(dayLists)) {
      list.push(<Fab
        onClick={onEndOfList}
        color="secondary"
        aria-label="more"
        className="load-more-button"
        >
          <MoreHorizIcon />
        </Fab>)
    }
  }
  return list
}

export default ({
  t,
  me,
  workouts,
  plans,
  loading,
  notesListEl,
  notesAnchorEl,
  setNotesAnchorEl,
  onCreateNote,
  handleNotesClose,
  notesList,
  newNote,
  onNewNoteChange,
  protocollsOptionsAnchorEl,
  handleProtocollsOptionsClose,
  dayLists,
  notes,
  onProtocollClick,
  handleProtocollsOptionsClick,
  onCreatePlanFromWorkout,
  handleNotesClick,
  selectedDay,
  editingMode,
  selectedNoteId,
  setSelectedNoteId,
  toggleEditingMode,
  editNote,
  onEditNoteChange,
  onUpdateNote,
  onDeleteNote,
  onAddWorkoutsToPlan,
}) => {

  const [listSize, setListSize] = useState(10);
  const [scrollBooster, setScrollBooster]  = useState(null);

  useEffect(() => {
    const viewport = document.querySelector('.viewport');
    const content = document.querySelector('.list-content');
    const sb = new ScrollBooster({
      viewport: viewport,
      content: content,
      scrollMode: 'transform',
      direction: 'horizontal',
    });
    setScrollBooster(sb);
  }, [loading]);

  useEffect(() => {
    if( protocollsOptionsAnchorEl ) {
      setTimeout(function(){ document.querySelector('.protocolls-list').parentElement.parentElement.scrollTo(0, 'smooth' ) }, 500);
    }
  }, [protocollsOptionsAnchorEl]);

  const onEndOfList = () => {
    setListSize(listSize + 10);
    setTimeout(function(){
      console.log("UPDATING METRICS");
      scrollBooster && scrollBooster.updateMetrics();
    }, 1000);
  }

  return (
    <ActivityList className="viewport">
    {
      workouts && workouts.length > 0 && <div className="list-content">{
        WorkoutsList(
          t,
          me,
          workouts,
          plans,
          loading,
          notesListEl,
          notesAnchorEl,
          setNotesAnchorEl,
          onCreateNote,
          handleNotesClose,
          notesList,
          newNote,
          onNewNoteChange,
          protocollsOptionsAnchorEl,
          handleProtocollsOptionsClose,
          dayLists,
          notes,
          onProtocollClick,
          handleProtocollsOptionsClick,
          onCreatePlanFromWorkout,
          handleNotesClick,
          selectedDay,
          editingMode,
          selectedNoteId,
          setSelectedNoteId,
          toggleEditingMode,
          editNote,
          onEditNoteChange,
          onUpdateNote,
          onDeleteNote,
          onAddWorkoutsToPlan,
          listSize,
          onEndOfList,
        )}
      </div>
    }
    {
      !loading && workouts && workouts.length === 0 &&
      <div className="empty-list">
        <Icon name='list alternate outline' size='huge' />
        <div className="empty-list-text">
          {t("PROTODOLLSEMPTYLIST")}
        </div>
      </div>
    }
    {
      loading &&
      <div className="empty-list">
        <CircularProgress size={100}/>
      </div>
    }

    <ProtocolsOptions
      anchorEl={protocollsOptionsAnchorEl}
      keepMounted
      open={Boolean(protocollsOptionsAnchorEl)}
      onClose={handleProtocollsOptionsClose}
    >
      <MaterialList
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {t("COPY_PROTOCOLLS")}
          </ListSubheader>
        }
        ref={notesListEl}
        className="protocolls-list"
      >
        <ListItem button onClick={() => onCreatePlanFromWorkout(selectedDay)} autoFocus={true}>
         <ListItemIcon>
           <PostAddIcon />
         </ListItemIcon>
         <ListItemText primary={t("NEW_PLAN")} />
       </ListItem>
       <Divider />
       {
         plans && plans.map(( item, key ) =>
         <ListItem key={key} button onClick={() => onAddWorkoutsToPlan(item.id, selectedDay)}>
          <ListItemIcon>
            <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText primary={item.name} />
         </ListItem>
         )
       }
      </MaterialList>
    </ProtocolsOptions>

    {
      notesAnchorEl !== null &&
      <StyledMenu
        anchorEl={notesAnchorEl}
        keepMounted
        open={Boolean(notesAnchorEl)}
        onClose={handleNotesClose}
      >
        <MaterialList className="notes-list" ref={notesListEl}>
          <IconButton
            size="small"
            aria-label="close"
            onClick={() => setNotesAnchorEl(null)}
            className="close-notes-list-button"
          >
            <CloseIcon size="small"/>
          </IconButton>
          { notesList.length == 0 &&
            <div className="empty-list">
              {t("NOTES_EMPTY_LIST")}
            </div>
          }
          { notesList.map((note, index) => (
            <>
              <ListItem alignItems="flex-start" onClick={(event) => {
                if (event.target.classList.contains('MuiButton-label')) return false;
                if(editingMode) return false;
                setSelectedNoteId(selectedNoteId == note.id ? null : note.id)
              }}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={note.creator.photoUrl} />
                </ListItemAvatar>
                <div className="note-group">
                  <ListItemText
                    className="note-header"
                    primary={note.creator.first_name + ' ' + note.creator.last_name }
                    secondary={moment(new Date(parseInt(note.note_date))).format("ddd, DD MMM YYYY HH:mm")}
                  />
                  <ListItemText
                    secondary={
                      note.exercise
                      ? (
                        <React.Fragment>
                          <div
                            className="exercise-image"
                            style={{
                              height: "100px",
                              width: "200px",
                              backgroundPosition: "right top,left top",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "contain, contain",
                              borderRadius: "10px",
                              backgroundImage: 'url(' + note.exercise.start_image + '), url(' + note.exercise.end_image + ')'
                            }}
                            onClick={() => onProtocollClick(note.exercise.id, 3)}
                          />
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            className="exercise-name"
                            onClick={() => onProtocollClick(note.exercise.id, 3)}
                          >
                            {note.exercise.name}
                          </Typography>


                          { editingMode && selectedNoteId == note.id ?
                            <div className="note-edit-input-section">
                              <form onSubmit={(event) => {
                                event.preventDefault();
                                //onCreateNote(newNote, selectedDay);
                              }}>
                                <TextField
                                  id="new-note"
                                  variant="outlined"
                                  placeholder={t("COMMENT_PLACEHOLDER") + '...'}
                                  value={editNote}
                                  onChange={onEditNoteChange}
                                  autocomplete="off"
                                />
                              </form>
                            </div>
                            :
                            <div
                              className="note-text"
                              style={{
                                marginTop: '10px',
                                background: '#f2f3f5',
                                borderRadius: '10px',
                                padding: '7px',
                                color: 'black',
                              }}
                            >
                              {note.text}
                            </div>
                          }


                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          { editingMode && selectedNoteId == note.id ?
                            <div className="note-edit-input-section">
                              <form onSubmit={(event) => {
                                event.preventDefault();
                                //onCreateNote(newNote, selectedDay);
                              }}>
                                <TextField
                                  id="new-note"
                                  variant="outlined"
                                  placeholder={t("COMMENT_PLACEHOLDER") + '...'}
                                  value={editNote}
                                  onChange={onEditNoteChange}
                                  autocomplete="off"
                                />
                              </form>
                            </div>
                            :
                            <div
                              className="note-text"
                              style={{
                                marginTop: '10px',
                                background: '#f2f3f5',
                                borderRadius: '10px',
                                padding: '7px',
                                color: 'black',
                              }}
                            >
                              {note.text}
                            </div>
                          }
                        </React.Fragment>
                      )
                    }
                  />
                  {selectedNoteId == note.id && !editingMode &&
                    <div className="buttons-section">
                      <MaterialButton
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          onDeleteNote(note.id);
                        }}
                      >
                        {t("NOTE_DELETE")}
                      </MaterialButton>
                      <MaterialButton
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          console.log("CHANGE NOTE " + note.id)
                          toggleEditingMode();
                        }}
                      >
                        {t("NOTE_CHANGE")}
                      </MaterialButton>
                    </div>
                  }
                  {selectedNoteId == note.id && editingMode &&
                    <div className="buttons-section">
                      <MaterialButton
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          console.log("CANCEL");
                          toggleEditingMode();
                          setSelectedNoteId(null);
                        }}
                      >
                        {t("NOTE_CANCEL")}
                      </MaterialButton>
                      <MaterialButton
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          console.log("SAVE NOTE");
                          onUpdateNote(note.id, editNote);
                          setNotesAnchorEl(null);
                        }}
                      >
                        {t("NOTE_SAVE")}
                      </MaterialButton>
                    </div>
                  }
                </div>
              </ListItem>
              { (index < notesList.length - 1) &&
                <Divider variant="inset" component="li" />
              }
            </>
          ))}
        </MaterialList>
        <div className="note-input-section">
          <Avatar alt={me.first_name + ' ' + me.last_name} src={me.photoUrl} />
          <form onSubmit={(event) => {
            event.preventDefault();
            onCreateNote(newNote, selectedDay);
          }}>
            <TextField
              id="new-note"
              variant="outlined"
              placeholder={t("COMMENT_PLACEHOLDER") + '...'}
              value={newNote}
              onChange={onNewNoteChange}
              autocomplete="off"
            />
          </form>
          <IconButton type="submit" aria-label="search" onClick={() => onCreateNote(newNote, selectedDay)}>
            <SendIcon />
          </IconButton>
        </div>
      </StyledMenu>
    }
    </ActivityList>
  )
}
