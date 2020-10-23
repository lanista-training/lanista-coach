import React, { Component, useState, useEffect, useRef } from 'react';
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import moment from "moment";
import Scene from "../../components/Scene";
import Exercises from './Exercises';
import ExercisesHeader from "../../components/ExercisesHeader";
import ExercisesFilter from "../../components/ExercisesFilter";
import SelectionOverviewPanel from '../../components/SelectionOverviewPanel';
import withData from "./DataProvider";
import {
  StyledDrawer,
  FolderName,
  StyledDialog,
  CreateExerciseDialog,
  ChangeFolderNameDialog,
  SearchFilter,
} from "./styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '../../components/LanistaButton';
import { AnimatePresence,  motion } from "framer-motion";

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';
import Search from '../../components/icons/Search';
import Folder from '../../components/icons/Folder';
import UserExercise from '../../components/icons/UserExercise';
import Recently from '../../components/icons/Recently';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const extractSuggestions = ( word, exercises ) => {
  const result = [];
  word && word.length > 2 && exercises.map( ({name}) => {
    if(name.toLowerCase().indexOf(word.toLowerCase()) > -1) {
      name.split(/,| /).map( w => {
        if( w.toLowerCase().indexOf(word.toLowerCase()) > -1 ) {
          if( result.indexOf(w) == -1) {
            result.push(w)
          }
        };
      })
    }
  });
  return result;
}

const bodyFilterInitialState = {
  shoulder: false,
  biceps: false,
  triceps: false,
  chest: false,
  upperback: false,
  lowerback: false,
  abs: false,
  hip: false,
  frontfemoral: false,
  backfemoral: false,
  lowerleg: false,
};

const Panel = ({
  editmode,
  workoutId,
  testId,
  split,
  member,
  exercises,
  total,
  loading,
  error,
  hasMore,
  onFetchExercises,
  setPageSize,
  cursor,
  filter,
  filterVisible,
  setFilterVisible,
  setFilter,
  currentSelection,
  addExercisesToPlan,
  mutationLoading,
  mutationError,
  initialLoading,
  setInitialLoading,

  exerciseFolders,
  exerciseFoldersLoading,
  folderMode,
  setFolderMode,
  removeExerciseFromFolder,

  addExerciseToFolder,
  addExerciseToFolderLoading,
  addExerciseToFolderError,

  createFolder,
  createFolderLoading,
  createFolderError,
  createdFolder,
  setCreatedFolder,

  deleteFolder,
  deleteFolderLoading,
  deleteFolderError,
  deletedFolder,
  setDeletedFolder,

  changeFolderName,
  changeFolderNameLoading,
  changeFolderNameError,
  folderNameChanged,
  onCloseFolderNameChangeDialog,

  onCreateExercise,
  createExerciseLoading,
  createExerciseError,
  newExerciseId,
  resetNewExerciseId,

  addExercisesToTest,
  addExercisesToTestLoading,
  addExercisesToTestError,

  defaultSettings,

  networkStatus,
  bu,

  goBack,
  goToExercise,
  goToSetup,
}) => {

  const {t} = useTranslate("exercises");

  //
  // Folder deleted alert
  //
  const[folderDeletedAlert, setFolderDeletedAlert] = React.useState(false);
  const toggleFolderDeletedAlert = () => setFolderDeletedAlert(!folderDeletedAlert);

  //
  // Filter Tab handling
  //
  const [filterTabIndex, setFilterTabIndex] = React.useState(0);
  const handleTabChange = (e, { activeIndex }) => setFilterTabIndex( activeIndex );

  //
  // Folder handling
  //
  const [folderDrawerOpen, setFolderDrawerOpen] = React.useState(false);
  const toggleFolderDrawer = () => setFolderDrawerOpen(!folderDrawerOpen);

  //
  // Snackbar handling
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  //
  // create folder dialog
  //
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = React.useState(false);
  const toggleCreateFolderDialogOpen = () => {
    setCreateFolderDialogOpen(!createFolderDialogOpen);
  };

  //
  // delete folder dialog
  //
  const [deleteFolderDialogOpen, setDeleteFolderDialogOpen] = React.useState(false);
  const toggleDeleteFolderDialogOpen = () => {
    setDeleteFolderDialogOpen(!deleteFolderDialogOpen);
  };

  const [bodyFiltersState, setBodyFiltersState] = useState(bodyFilterInitialState);
  const [typeFiltersState, setTypeFiltersState] = useState({
    bodyweight: false,
    machine: false,
    freeweight: false,
    cable: false,
    stretch: false,
    cardio: false,
    specials: false,
    unilateral: false,
  });
  const [toolFiltersState, setToolFiltersState] = useState({
    any: false,
    dumbbels: false,
    barbell: false,
    kettlebells: false,
    bank: false,
    others: false,
    ball: false,
    blast: false,
    jumber: false,
    foam: false,
    miniband: false,
  });
  const [filterStyles, setFilterStyles] = useState({
    shoulder: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    biceps: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    triceps: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    forearm: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    chest: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    upperback: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    lowerback: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    abs: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    hip: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    frontfemoral: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    backfemoral: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
    lowerleg: {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"},
  });
  const [mutating, setMutating] = useState(false);

  //
  // Selection Mamagement
  //
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    if(selection.length == 0) setSelection(currentSelection);
  }, [currentSelection]);

  const showExercise = (exerciseId, exercises) => {
    if(editmode) {
      const selectedExercise = exercises.find(exercise => exercise.id == exerciseId);
      setSelection([...selection, {...selectedExercise, selected: true}]);
    } else {
      goToExercise(exerciseId);
    }
  }

  const showExerciseToEdit = (exerciseId) => {
    goToExercise(exerciseId, true);
  }

  const removeItem = (exerciseId) => {
    const newSelection = []
    selection.map(exercise => {
      if(exercise.id != exerciseId) {
        newSelection.push(exercise)
      }
    })
    setSelection([...newSelection]);
  }

  const marcSelectedExercises = () => {
    const selectedExercises = exercises.map(exercise => {
      if(selection && selection.findIndex(item => item.id == exercise.id) > -1) {
        return {
          ...exercise, selected: true
        }
      } else {
        return exercise
      }
    })
    return selectedExercises
  }

  useEffect(() => {
    // MUSCLE FILTER
    const {body} = filter;
    let newFilterStyles = {...filterStyles};
    body.forEach((item) => {
      newFilterStyles[item] = {"fill":"rgb(155, 201, 61)","fillRule":"nonzero"};
    });
    setFilterStyles(newFilterStyles);

    setFilter({
      ...filter
    })
    setOpenSnackbar(workoutId > 0);
  }, []);

  useEffect(() => {
    if( mutationLoading ) {
      setMutating(true);
    }
    if( mutating && !mutationLoading ) {
      goBack();
    }
  }, [mutationLoading]);

  useEffect(() => {
    if( addExercisesToTestLoading ) {
      setMutating(true);
    }
    if( mutating && !addExercisesToTestLoading ) {
      goBack();
    }
  }, [addExercisesToTestLoading]);

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  }

  const onRemoveFilter = (onRemoveFilter, filterToRemove) => {
    if( onRemoveFilter == 'bodypart' ) onBodyPartSelection(filterToRemove)
    if( onRemoveFilter == 'exercisetype' ) onExerciseTypeSelection(filterToRemove)
    if( onRemoveFilter == 'tools' ) onExerciseToolSelection(filterToRemove)
    if( onRemoveFilter == 'text' ) onExerciseTextChange('')
    if( onRemoveFilter == 'plugin' ) onPluginSelection(filterToRemove)
    if( onRemoveFilter == 'folder' ) onFolderSelection(filterToRemove.id)
  }

  const onBodyPartSelection = (id) => {
    const {body} = filter;
    const newFilter = _.remove(body, function(n) {
      return n != id;
    });
    if( !bodyFiltersState[id] ) {
      newFilter.push(id);
    }
    let newBodyFilterState = {...bodyFiltersState};
    newBodyFilterState[id] = !newBodyFilterState[id];
    let newFilterStyles = {...filterStyles};
    newFilterStyles[id] = (bodyFiltersState[id] ? {"fill":"rgb(151, 151, 151)","fillRule":"nonzero"} : {"fill":"rgb(155, 201, 61)","fillRule":"nonzero"});
    setFilterStyles(newFilterStyles);
    setBodyFiltersState(newBodyFilterState);
    setFilter({
      ...filter,
      body: newFilter
    });
    filterVisible && toggleFilter();
  }

  const onExerciseTypeSelection = (id) => {
    const {type} = filter;
    let newFilter = _.remove(type, function(n) {
      return n != id;
    });
    if( !typeFiltersState[id] ) {
      newFilter.push(id);
    }
    let newTypeFilterState = {...typeFiltersState};
    newTypeFilterState[id] = !newTypeFilterState[id];
    setTypeFiltersState(newTypeFilterState);
    setFilter({
      ...filter,
      type: newFilter
    });
    filterVisible && toggleFilter();
  }

  const onPluginSelection = (selection) => {
    const {plugin} = filter
    let newFilter = _.remove(plugin, function(n) {
      return n != selection.name;
    });
    if( plugin.indexOf(selection.name) == -1 ) {
      newFilter.push(selection.name);
    }
    setFilter({
      ...filter,
      plugin: newFilter
    });
    filterVisible && toggleFilter();
  }

  const onExerciseToolSelection = (id) => {
    const {tool} = filter;
    const newFilter = _.remove(tool, function(n) {
      return n != id;
    });
    if( !toolFiltersState[id] ) {
      newFilter.push(id);
    }
    let newToolFiltersState = {...toolFiltersState};
    newToolFiltersState[id] = !newToolFiltersState[id];
    setToolFiltersState(newToolFiltersState);
    setFilter({
      ...filter,
      tool: newFilter
    });
    filterVisible && toggleFilter();
  }

  const onExerciseTextChange = (text) => {
    setFilter({
      ...filter,
      text: text
    });
  }

  const onFolderSelection = (id) => {
    if( id == filter.folderId ) {
      setFilter({
        ...filter,
        folder: null,
        folderId: 0,
      });
    } else {
      const folder = exerciseFolders.find(folder => folder.id == id)
      setFilter({
        ...filter,
        folder: folder,
        folderId: id,
      });
    }
  }

  const onTogglePrivateFilter = () => {
    setFilter({
      ...filter,
      private: !filter.private,
    });
  }

  const onToggleRecentlyUsedFilter = () => {
    setFilter({
      ...filter,
      recentlyUsed: !filter.recentlyUsed,
    });
  }

  const folder = (exerciseFolders && filter && filter.folderId > 0)
    ?
    exerciseFolders.find(folder => folder.id == filter.folderId)
    :
    null;

  const getCommandsRight = () => {
    const result = [];
    if(!filterVisible) {
      if ( !filter.recentlyUsed ) {
        result.push({
          icon: <Search/>,
          text: t('search'),
          type: 'type-1',
          typex: 'Ionicons',
          name: 'search exercise',
          onTap: () => {
            toggleFilter();
          }
        });
      }
      if(!folder) {
        if( !filter.recentlyUsed && !filter.private ) {
          result.push({
            icon: <Folder/>,
            text: t('folder'),
            type: 'type-1',
            typex: 'Ionicons',
            name: 'folder',
            onTap: () => {
              toggleFolderDrawer();
            }
          });
        }
        if( !filter.recentlyUsed  ) {
          result.push({
            icon: <UserExercise/>,
            text: t(bu > 0 ? 'gym_exercises' : 'my_exercises'),
            type: 'type-1',
            typex: 'Ionicons',
            name: 'user exercise',
            style: filter.private ? {color: '#34acfb'} : {},
            className: filter.private ? 'synchronize-icon' : '',
            onTap: () => {
              onTogglePrivateFilter();
            }
          });
        }
        if( !filter.private ) {
          result.push({
            icon: <Recently/>,
            text: t('recently used'),
            type: 'type-1',
            typex: 'Ionicons',
            name: 'refresh',
            style: {color: filter.recentlyUsed ? '#34acfb' : ''},
            onTap: () => {
              onToggleRecentlyUsedFilter();
            }
          });
        }
        if( filter.private ) {
          result.push({
            icon: <AddCircleOutlineIcon/>,
            text: t("create exercise"),
            type: 'type-1',
            typex: 'Ionicons',
            name: 'create-exercise',
            onTap: () => {
              toggleCreateExerciseDialogOpen();
            }
          });
        }
      } else {
        if( folderMode > 0 ) {
          if( folderMode == 1 ) {
            result.push({
              icon: <UserExercise/>,
              text: t(bu > 0 ? 'gym_exercises' : 'my_exercises'),
              type: 'type-1',
              typex: 'Ionicons',
              name: 'user exercise',
              style: filter.private ? {color: '#34acfb'} : {},
              className: filter.private ? 'synchronize-icon' : '',
              onTap: () => {
                onTogglePrivateFilter();
              }
            });
          }
          result.push({
            icon: <CheckCircleOutlineIcon/>,
            text: t('exit edit mode'),
            type: 'type-1',
            name: 'add-user',
            style: {color: '#34acfb'},
            onTap: () => {
              setFolderMode(null);
            }
          });
        } else {
          if( !(workoutId > 0) && !(member > 0) ) {
            result.push({
              icon: <AddCircleOutlineIcon/>,
              text: t('add exercise'),
              type: 'type-1',
              name: 'add-user',
              style: {color: '#34acfb'},
              onTap: () => {
                setFolderMode(1);
              }
            });
            result.push({
              icon: <RemoveCircleOutlineIcon/>,
              text: t('remove exercise'),
              type: 'type-1',
              name: 'remove-user',
              style: {color: '#34acfb'},
              onTap: () => {
                setFolderMode(2);
              }
            });
          }
        }
        if( !(workoutId > 0) && !(member > 0) ) {
          result.push({
            icon: <DeleteOutlineIcon/>,
            text: t('delete folder'),
            type: 'type-1',
            typex: 'Ionicons',
            name: 'delete folder',
            onTap: () => {
              toggleDeleteFolderDialogOpen();
            }
          });
        }
      }
    } else {
      result.push({
        icon: <Search/>,
        text: t('textsearch'),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'search exercise',
        onTap: () => {
          toggleFilter();
        }
      });
    }
    return result;
  }

  const getCommandsLeft = () => {
    return (filterVisible ? [] : folderMode === null ? [{
          //icon: CustomerIcon,
          icon: <Back/>,
          text: '',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            // save the changes first
            if(editmode) {
              if(folder) {
                onFolderSelection(null);
                setFolderMode(null);
              } else {
                const newExercises = [];
                const currentSplitLength = selection.length;
                let counter = 1;
                selection.map((exercise, index) => {
                  if(exercise.selected) {
                    newExercises.push({
                      id: exercise.id,
                      position: currentSplitLength + counter
                    })
                    counter++;
                  }
                });
                if(newExercises.length > 0 ) {
                  if( workoutId && workoutId > 0 ) {
                    addExercisesToPlan({
                      variables: {
                        planId: workoutId,
                        split: parseInt(split),
                        exercises: JSON.stringify(newExercises),
                        settings: JSON.stringify({
                          weight: 0,
                          training: defaultSettings.execution,
                          unit: defaultSettings.unit,
                          sets: defaultSettings.sets,
                        }),
                      }
                    });
                  } else if ( testId && testId.length > 0 ) {
                    addExercisesToTest({
                      variables: {
                        testId: testId,
                        exercises: JSON.stringify(newExercises),
                      }
                    });
                  }
                } else {
                  goBack();
                }
              }
            } else {
              if(folder) {
                onFolderSelection(null);
                setFolderMode(null);
              } else {
                goBack();
              }
            }
          }
      }] : []);
  }

  const onRemoveExerciseFromFolder = (exerciseId) => {
    removeExerciseFromFolder({
      variables: {
        exerciseId: exerciseId,
        folderId: filter.folderId,
      }
    });
  }
  const onAddExerciseToFolder = (exerciseId) => {
    addExerciseToFolder({
      variables: {
        exerciseId: exerciseId,
        folderId: filter.folderId,
      }
    });
  }

  const onCreateFolder = (folderName) => {
    createFolder({
      variables: {
        folderName: folderName,
      }
    })
  };

  const onDeleteFolder = (folderId) => {
    deleteFolder({
      variables: {
        folderId: filter.folderId,
      }
    });
  }


  //
  // create exercise dialog
  //
  const [createExerciseDialogOpen, setCreateExerciseDialogOpen] = React.useState(false);
  const toggleCreateExerciseDialogOpen = () => {
    !createExerciseDialogOpen && resetNewExerciseId();
    setCreateExerciseDialogOpen(!createExerciseDialogOpen);
  };
  const [exerciseName, setExerciseName] = React.useState('');
  React.useEffect(() => {
    if(newExerciseId > 0 && createExerciseDialogOpen) {

    }
  }, [newExerciseId]);

  React.useEffect(() => {
    if( !exerciseFoldersLoading && createdFolder > 0 ) {
      setCreatedFolder(null);
      onFolderSelection(createdFolder);
    } else if( !exerciseFoldersLoading && deletedFolder > 0 ) {
      setDeletedFolder(null);
      toggleDeleteFolderDialogOpen();
      setFilter({
        ...filter,
        folder: null,
        folderId: 0,
      });
      toggleFolderDeletedAlert();
    }
  }, [exerciseFolders]);

  //
  // Change folder name
  //
  const [ newFolderName, setNewFolderName ] = React.useState('');
  const [ changeFolderNameDialog, setChangeFolderNameDialog ] = React.useState(false);
  const toggleChangeFolderNameDialog = () => setChangeFolderNameDialog(!changeFolderNameDialog);
  const onFolderNameClick = () => {
    setNewFolderName(folder.name);
    toggleChangeFolderNameDialog();
  }
  const onChangeFolderName = () => {
    changeFolderName({
      variables: {
        folderId: folder.id,
        newName: newFolderName,
      }
    })
  };
  useEffect(() => {
    !changeFolderNameDialog && onCloseFolderNameChangeDialog();
  }, [changeFolderNameDialog])

  return(
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight()}
      headerChildren={
        <>
          {folder &&
            <FolderName className="folder-name" onClick={onFolderNameClick}>
              {folder && folder.name}
            </FolderName>
          }
          <ExercisesHeader
            loading={loading}
            t={t}
            total={total}
            filter={filter}
            onRemoveFilter={onRemoveFilter}
            folder={folder}
            onTextFilterChange={onExerciseTextChange}
            suggestions={extractSuggestions(filter.text, exercises)}
          />
        </>
      }
      renderLogo={folder ? () => <FolderIcon className="folder-logo" onClick={onFolderNameClick}/> : null}
      mode={folder ? 'folder' : null}
      t={t}
      networkStatus={networkStatus}
      goToSetup={goToSetup}
    >
      {
        //!filterVisible &&
        <Exercises
          exercises={editmode ? marcSelectedExercises() : exercises}
          onRequestPage={onFetchExercises}
          loading={loading}
          error={error}
          hasMore={hasMore}
          setPageSize={(newPageSize) => setPageSize(newPageSize)}
          onShowExercise={editmode ? (exerciseId) => showExercise(exerciseId, exercises) : showExercise}
          t={t}
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          folderMode={folderMode}
          onRemoveExerciseFromFolder={onRemoveExerciseFromFolder}
          onAddExerciseToFolder={onAddExerciseToFolder}

          createFolderDialogOpen={createFolderDialogOpen}
          createFolderDialogHandleClose={toggleCreateFolderDialogOpen}

          onCreateFolder={onCreateFolder}
          createFolderLoading={createFolderLoading}
        />
      }
      <SearchFilter
        anchor="right"
        open={filterVisible}
        onClose={() => toggleFilter()}
      >
        <ExercisesFilter

          filterTabIndex={filterTabIndex}
          handleTabChange={handleTabChange}

          filterStyles={filterStyles}

          onBodyPartSelection={onBodyPartSelection}
          onExerciseTypeSelection={onExerciseTypeSelection}
          onExerciseToolSelection={onExerciseToolSelection}
          onExerciseTextChange={onExerciseTextChange}
          onPluginSelection={onPluginSelection}

          typeFiltersState={typeFiltersState}
          toolFiltersState={toolFiltersState}
          pluginFiltersState={filter ? filter.plugin : []}

          exercises={ editmode ? marcSelectedExercises() : exercises }

          textFilterValue={filter && filter.text}

          t={t}

          loading={loading}
          onShowExercise={editmode ? (exerciseId) => showExercise(exerciseId, exercises) : showExercise}

          onCloseFilter={toggleFilter}

        />
      </SearchFilter>

      {!filterVisible && editmode && <SelectionOverviewPanel selection={selection} removeItem={removeItem}/>}

      <StyledDrawer
        anchor="right"
        open={folderDrawerOpen}
        onClose={() => toggleFolderDrawer()}
      >
        <div
          role="presentation"
          onClick={() => toggleFolderDrawer()}
          onKeyDown={() => toggleFolderDrawer()}
        >
          <List>
            {
              !(workoutId > 0) && !(member > 0) &&
                <div key={'folder-create'} className="list-item-wrapper">
                  <ListItem button onClick={toggleCreateFolderDialogOpen}>
                    <ListItemIcon>
                      <CreateNewFolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("create_folder")}/>
                  </ListItem>
                </div>
            }
            {
              exerciseFolders && exerciseFolders.map(folder => (
                <div key={'folder-' + folder.id} className="list-item-wrapper">
                  <ListItem button onClick={() => onFolderSelection(folder.id)}>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={folder.name + ' [' + folder.size + ']'}/>
                  </ListItem>
                </div>
              ))
            }
          </List>
        </div>
      </StyledDrawer>

      { deleteFolderDialogOpen &&
        <StyledDialog
          open={deleteFolderDialogOpen}
          onClose={toggleDeleteFolderDialogOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("delete_folder")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("delete_folder_dialog_text")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="dialog-button">
              <Button onClick={toggleDeleteFolderDialogOpen} color="primary">
                {t("delete_folder_cancel")}
              </Button>
            </div>
            <div className="dialog-button">
              <Button
                onClick={() =>
                {
                  onDeleteFolder();
                }}
                color="primary" autoFocus>
                {t("delete_folder_ok")}
              </Button>
              {deleteFolderLoading && <CircularProgress size={24} />}
            </div>
          </DialogActions>
        </StyledDialog>
      }
      { createExerciseDialogOpen &&
        <CreateExerciseDialog
          open={createExerciseDialogOpen}
          onClose={toggleCreateExerciseDialogOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("create_exercise")}</DialogTitle>
          {newExerciseId == 0 &&
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {t("create_exercise_dialog_text")}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  id="folder-name"
                  variant="outlined"
                  value={exerciseName}
                  onChange={e => setExerciseName(e.target.value)}
                  autoFocus={true}
                  placeholder={t("create_exercise_placeholder")}
                />
              </DialogContentText>
            </DialogContent>
          }
          {newExerciseId > 0 &&
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {t("create_exercise_created")}
              </DialogContentText>
            </DialogContent>
          }
          <DialogActions>
            <div className="dialog-button">
              <Button onClick={toggleCreateExerciseDialogOpen} color="primary">
                {t("create_exercise_cancel")}
              </Button>
            </div>
            <div className="dialog-button">
              <Button
                onClick={() =>
                {
                  if (newExerciseId === 0 ) {
                    onCreateExercise(exerciseName);
                  } else {
                    showExerciseToEdit(newExerciseId);
                  }
                  //toggleCreateExerciseDialogOpen();
                }}
                disabled={exerciseName && exerciseName.trim().length === 3}
                color="primary" autoFocus>
                {t(newExerciseId === 0 ? "create_exercise_ok" : "go_to_exercise")}
              </Button>
              {createExerciseLoading && <CircularProgress size={24} />}
            </div>
          </DialogActions>
        </CreateExerciseDialog>
      }

      <ChangeFolderNameDialog
        open={changeFolderNameDialog}
        onClose={toggleChangeFolderNameDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="change-folder-dialog-title">{t("change_folder_name")}</DialogTitle>
        <DialogContent>
          {
            !folderNameChanged &&
            <>
              <DialogContentText id="change-folder-dialog-description-1">
                {t("change_folder_name_text")}
              </DialogContentText>
              <DialogContentText id="change-folder-dialog-description-2">
                <TextField
                  id="folder-name"
                  variant="outlined"
                  value={newFolderName}
                  onChange={e => setNewFolderName(e.target.value)}
                  autoFocus={true}
                />
              </DialogContentText>
            </>
          }
          {
            folderNameChanged &&
            <>
              <DialogContentText id="change-folder-dialog-description-1">
                {t("folder_name_changed")}
              </DialogContentText>
            </>
          }
        </DialogContent>
        <DialogActions>
          <div className="dialog-button">
            <Button
              onClick={toggleChangeFolderNameDialog}
              inverted={folderNameChanged}
            >
              {t("back")}
            </Button>
          </div>
          {!folderNameChanged &&
            <div className="dialog-button">
              <Button
                onClick={onChangeFolderName}
                inverted
                autoFocus
              >
                {t("change_folder_name")}
              </Button>
              {changeFolderNameLoading && <CircularProgress size={24} />}
            </div>
          }
        </DialogActions>
      </ChangeFolderNameDialog>

      <Snackbar open={folderDeletedAlert} autoHideDuration={6000} onClose={toggleFolderDeletedAlert}>
        <MuiAlert severity="success" elevation={6} variant="filled">
          {t("folder deleted")}
        </MuiAlert>
      </Snackbar>

    </Scene>
  )
}

const PanelWithData = ({editmode, workout, split, member, test, goBack, goToExercise}) => {
  const ExerciseData = withData(Panel, {editmode, workout, split, member, test, goBack, goToExercise});
  return <ExerciseData/>
}

export default PanelWithData;
