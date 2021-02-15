import React, { useEffect, useState, useRef } from 'react';
import moment from "moment";
import { NotesList, NoteForm } from './styles';
import { useTranslate } from '../../hooks/Translation';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '../../components/LanistaButton';

const CreateFormPanel = ({

  readyToSaveNote,
  setReadyToSaveNote,

  selectedDate,
  setSelectedDate,

  note,
  setNote,

}) => {

  const {t} = useTranslate("anamnese");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if( note.length > 0 ) setReadyToSaveNote(true);
    else setReadyToSaveNote(false);
  }, [note]);

  return (
    <NoteForm>
      <TextField
      id="standard-basic"
      label={t("ENTER_NOTE_HERE")}
      className="text-field"
      value={note}
      onChange={e => setNote(e.target.value)}
    />
      <MuiPickersUtilsProvider utils={DateFnsUtils} className="date-picker-field" >
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd MMMM yyyy"
          margin="normal"
          id="date-picker-inline"
          label={t("REFFERENCE_DATE")}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          autoOk={true}
        />
      </MuiPickersUtilsProvider>
    </NoteForm>
  )
}


export default ({
  notes,
  createNoteMode,
  readyToSaveNote,
  setReadyToSaveNote,

  note,
  setNote,

  selectedDate,
  setSelectedDate,

  onDeleteAnamneseNote,
  deleteAnamneseNoteLoading,
  deleteAnamneseNoteError,
}) => {

  const {t} = useTranslate("anamnese");
  const [selectedForDeletion, setSelectedForDeletion] = useState(null);

  useEffect(() => {
    setSelectedForDeletion(null);
  }, [notes])

  return createNoteMode ?
  (
    <CreateFormPanel
      readyToSaveNote={readyToSaveNote}
      setReadyToSaveNote={setReadyToSaveNote}

      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}

      note={note}
      setNote={setNote}
    />
  )
  :
  (
    <NotesList>
      { (!notes || notes.length == 0) &&
        <div className="empty-list">
          {t("EMPTY_LIST")}
        </div>
      }
      {
        notes && notes.length > 0 && notes.map((note, index) => (
          <ListItem>
            <ListItemText primary={
              <div className="anamnese-note">
                <Tooltip title={note.creator.first_name + ' ' + note.creator.last_name} src={note.creator.photoUrl} arrow >
                  <Avatar alt={note.creator.first_name + ' ' + note.creator.last_name} src={note.creator.photoUrl} />
                </Tooltip>
                <div className="anamnese-note-date">{moment(new Date(parseInt(note.note_date))).format('DD.MM.YYYY')}</div>
                <div className="anamnese-note-text">{note.text}</div>
              </div>}
            />

            <ListItemSecondaryAction>
              {
                selectedForDeletion == index && (
                  <>
                  <Button onClick={() => setSelectedForDeletion(null)} style={{marginRight: "5px"}}>
                    {t("CANCEL")}
                  </Button>
                  <Button onClick={() => onDeleteAnamneseNote(note.id)} inverted>
                    {t("DELETE_QUESTION")}
                  </Button>
                  </>
                )
              }
              {
                selectedForDeletion != index && (
                  <IconButton edge="end" aria-label="comments" onClick={() => setSelectedForDeletion(index)}>
                    <HighlightOffIcon />
                  </IconButton>
                )
              }
            </ListItemSecondaryAction>
          </ListItem>

        ))
      }
    </NotesList>
  );
}
