import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import moment from "moment";
import { Tab, Button, Input, Loader } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { NotesPanel, SyledDimmer } from './styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

export default ({t, notes, loading, onCreateNote, onDeleteNote, editable}) => {

  const el = useRef(null);
  const [note, setNote] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  React.useEffect(() => {
    setNote('');
    if( !loading ) {
      el.current && el.current && el.current.scrollIntoView({ block: 'end' });
      setNote('');
    }
  }, [loading]);

  const onNoteChange = e => setNote(e.target.value);
  const onNoteDelete = id => onDeleteNote(id);
  const onSaveNote = event => onCreateNote(note);
  const onSumib = event => event.preventDefault();

  return (
    <Tab.Pane>
      <NotesPanel>
        <div className="notes-list">
          <div ref={el} style={{paddingBottom: '1em'}}>
          {
            !loading && notes && notes.length > 0 && notes.map((note, index) => (
              <div
                className={selectedNote == index ? 'note selected' : 'note'}
                onClick={() => setSelectedNote(selectedNote ==  index ? null : index)}
              >
                <div className='image-container'>
                  <div className="image" style={{backgroundImage: 'url("' + note.creator.photoUrl + '")'}}/>
                </div>
                <div className='note-content'>
                  <div className='note-author'>{note.creator.first_name} {note.creator.last_name} <span>{moment(parseInt(note.note_date)).format('DD.MM.YYYY hh:mm')}</span></div>
                  <div className='note-text'>{note.text}</div>
                </div>
                {
                  selectedNote ==  index &&
                  <div className='note-icons' onClick={() => onNoteDelete(note.id)}>
                    <HighlightOffIcon />
                  </div>
                }
              </div>
            ))
          }
          </div>
        {
          !loading && notes && notes.length === 0 && (
            <div className="empty-list">Keine Notitzen</div>
          )
        }
        { loading && (
          <SyledDimmer active inverted>
            <Loader />
          </SyledDimmer>
        )}
        </div>
        <Paper component="form" onSubmit={onSumib}>
          <InputBase
            placeholder={t("create-note-placeholder")}
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={onNoteChange}
            value={note}
            disabled={!editable}
          />
          <IconButton
            type="submit"
            aria-label="search"
            placeholder=''
            value={note}
            onChange={onNoteChange}
            onClick={onSaveNote}
            disabled={!editable}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </NotesPanel>
    </Tab.Pane>
  );
}
