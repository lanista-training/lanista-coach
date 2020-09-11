import * as React from "react";
import _ from 'lodash';
import moment from "moment";
import InfiniteList from '../../components/InfiniteList';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Stage, ListSection, ListItem, StyledDialog} from './styles';
import { Button } from 'semantic-ui-react';

import {Button as DialogButton} from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const Exercise = ({
  exercise,
  onShowExercise,
  folderMode,
  onAddExerciseToFolder,
  addExerciseToFolderLoading,
  addExerciseToFolderError,
  onRemoveExerciseFromFolder,
}) => {
  return (
    <ListItem onClick={() => !(folderMode > 0) && onShowExercise(exercise.id) } className={exercise.selected ? 'selected' : ''}>
      <div className="exercise-item">
        <div className="exercise-list-img-right" style={{backgroundImage: 'url(' + exercise.start_image + ')'}}/>
        <div className="exercise-list-img-left" style={{backgroundImage: 'url(' + exercise.end_image + ')'}}/>
        <div className="exercise-list-text">{exercise.name}</div>
        {folderMode == 2 &&
          <Button
            icon='remove circle'
            content='Entfernen'
            onClick={() => onRemoveExerciseFromFolder(exercise.id)}
          />
        }
        {folderMode == 1 &&
          <Button
            icon='add circle'
            content='Hinzufügen'
            onClick={() => onAddExerciseToFolder(exercise.id)}
          />
        }
      </div>
    </ListItem>
  )
}

const EmptyList = ({text}) => {
  return (
    <div className="empty-list">
      {text}
    </div>
  )
}

export default ({
  exercises,
  showExercise,
  t,
  onRequestPage,
  hasMore,
  initialLoading,
  loading,
  setPageSize,
  onShowExercise,
  openSnackbar,
  handleCloseSnackbar,
  folderMode,
  onAddExerciseToFolder,
  onRemoveExerciseFromFolder,

  createFolderDialogOpen,
  createFolderDialogHandleClose,

  onCreateFolder,
  createFolderLoading,
}) => {
  const [folderName, setFolderName] = React.useState("");

  var items = [];
  exercises.map((exercise, i) => {
    items.push(
      <Exercise
        key={i}
        exercise={exercise}
        onShowExercise={onShowExercise}
        folderMode={folderMode}
        onAddExerciseToFolder={onAddExerciseToFolder}
        onRemoveExerciseFromFolder={onRemoveExerciseFromFolder}
      />
    );
  });

  return (
    <Stage>
      <ListSection className='hide-scrollbar' id="infinte-list-wrapper">
        {
          items && items.length > 0 &&
          <InfiniteList
            initialLoading={initialLoading}
            loading={loading}
            loader={<div class="loading-exercise">Loading...</div>}
            loadMore={onRequestPage}
            hasMore={hasMore}
            setPageSize={setPageSize}
            listClass="exercises-list"
          >
            {items}
          </InfiniteList>
        }
        {
          items && items.length === 0 &&
          <EmptyList text={t('empty_list')}/>
        }
      </ListSection>
      {openSnackbar &&
        <Snackbar open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="info"
            open={openSnackbar}
            onClose={handleCloseSnackbar}
          >
            Um die Selektion abzuschliessen, einfach zurück zum Plan.
          </MuiAlert>
        </Snackbar>
      }
      { createFolderDialogOpen &&
        <StyledDialog
          open={createFolderDialogOpen}
          onClose={createFolderDialogHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("create_folder")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("create_folder_dialog_text")}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              <TextField
                id="folder-name"
                variant="outlined"
                value={folderMode}
                onChange={e => setFolderName(e.target.value)}
                autoFocus={true}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="dialog-button">
              <Button onClick={createFolderDialogHandleClose} color="primary">
                {t("create_folder_cancel")}
              </Button>
            </div>
            <div className="dialog-button">
              <Button
                onClick={() =>
                {
                  onCreateFolder(folderName);
                  createFolderDialogHandleClose();
                }}
                disabled={folderName.length === 0}
                color="primary" autoFocus>
                {t("create_folder_ok")}
              </Button>
              {createFolderLoading && <CircularProgress size={24} />}
            </div>
          </DialogActions>
        </StyledDialog>
      }
    </Stage>
  )
};
