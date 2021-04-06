import * as React from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import _ from 'lodash';
import {
  Grid,
  Tab,
  Icon,
  Statistic,
  Image,
  Button,
  List,
  Modal,
  Placeholder,
  Label,
} from 'semantic-ui-react';
import {useDropzone} from 'react-dropzone';
import moment from 'moment';
import {
  Stage,
  StyledTab,
  CardsList,
  CardsListWrapper,
  Card,
  WarningListItem,
  Header,
  StatisticValue,
  FilesPanel,
  StyledDropZone,
} from './styles';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

import Typography from '@material-ui/core/Typography';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AdjustIcon from '@material-ui/icons/Adjust';

import CircularProgress from '@material-ui/core/CircularProgress';

import WorkoutsList from './WorkoutsList';
import ActivityList from './ActivityList';

import ScrollBooster from 'scrollbooster';

const customIcons = {
  0: {
    icon: <AdjustIcon />,
    label: '0',
  },
  1: {
    icon: <AdjustIcon />,
    label: '1',
  },
  2: {
    icon: <AdjustIcon />,
    label: '2',
  },
  3: {
    icon: <AdjustIcon />,
    label: '3',
  },
  4: {
    icon: <AdjustIcon />,
    label: '4',
  },
  5: {
    icon: <AdjustIcon />,
    label: '5',
  },
  6: {
    icon: <AdjustIcon />,
    label: '6',
  },
  7: {
    icon: <AdjustIcon />,
    label: '7',
  },
  8: {
    icon: <AdjustIcon />,
    label: '8',
  },
  9: {
    icon: <AdjustIcon />,
    label: '9',
  },
  10: {
    icon: <AdjustIcon />,
    label: '10',
  },
};

const IconContainer = (props) => {
  console.log("IconContainer", props);
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const getTranslationKey = (warningType) => {
  switch(warningType) {
  case 'DRU':
    return 'drug';
  case 'SPO':
    return 'sport';
  case 'GOA':
    return 'goal';
  default:
    return 'finding';
  }
}

const StyledRating = withStyles({
  iconFilled: {
    color: '#86d8da',
  },
  iconHover: {
    color: '#86d8da',
  },
})(Rating);

const FileDropZone = ({memberId, updateMemberFiles, closeFileUploadPanel, setLoading, loading}) => {

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png, application/pdf'
  });

  const files = acceptedFiles.map((file, index) => {
    setLoading(true);
    let reader = new FileReader();

    var uploadBaseUrlApp = 'https://app.lanista-training.com/file/user/';
    var uploadBaseUrlPortal = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/file/user/';
    var uploadBaseUrl = (typeof document !== 'undefined' && window.cordova === undefined) ? uploadBaseUrlPortal : uploadBaseUrlApp;

    //let uploadBaseUrl = 'https://kj8xejnla9.execute-api.eu-central-1.amazonaws.com/dev/' + 'file/user/';
    /*
    if( window.cordova ) {
      uploadBaseUrl = 'https://app.lanista-training.com/file/user/';
    }
    */

    const token = cookie.get('token');
    const fileName = file.name == 'image.jpg' ? ('image-' + moment().format('DD-MM-YYYY-h-mm-ss') + '.jpg') : file.name;
    reader.addEventListener('loadend', function(e) {
      fetch(uploadBaseUrl + memberId + '/files/' + fileName, {
        method: "POST",
        body: new Blob([reader.result], {type: file.type}),
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        },
      })
      .then((response) => {
        if (response.ok) {
          if(index == acceptedFiles.length-1) {
            closeFileUploadPanel();
            updateMemberFiles();
            setLoading(false);
          }
        } else {
          setLoading(false);
          alert('Error uploading [' + file.name + ']');
        }
      })
      .catch((error) => {
        console.log("ERROR UPLOADING FILE");
        console.log(error);
        setLoading(false);
        updateMemberFiles()
        closeFileUploadPanel()
      });
    });
    reader.readAsArrayBuffer(file);
    return (
      <li key={file.path}>
        {decodeURI(file.path)} - {file.size} bytes
      </li>
    )
  });

  if( window.cordova ) {
    window.StatusBar.hide();
    window.StatusBar.show();
  }

  return ( (!loading ) ?
      <StyledDropZone>
        <section className="container">
          <Button basic icon='close' onClick={() => {
            closeFileUploadPanel()
          }}/>
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      </StyledDropZone>
      :
      <div class="loading">
        <CircularProgress />
      </div>
  );
}

const Customer = ({

  removeMemberFile,
  customer,
  lastMeasures,
  onProtocollClick,
  openWorkout,
  addFiles,

  protocolls,
  protocollsLoading,

  memberFiles,
  loadingMemberFiles,

  updateMemberFiles,
  showGoal,
  createGoal,
  loading,
  openSnackbar,
  handleCloseSnackbar,
  snackbarMessage,
  createWorkout,
  t,
  me,

  onCreateNote,
  createNoteLoading,
  createNoteError,

  onDeleteNote,
  deleteNoteLoading,
  deleteNoteError,

  onUpdateNote,
  updateNoteLoading,
  updateNoteError,

  onCreatePlanFromWorkout,
  onAddWorkoutsToPlan,
  createPlanFromWorkoutLoading,
  createPlanFromWorkoutError,

  onGoToMeasures,

  onWarningClick,

}) => {
  //
  // Use protocolls list
  //
  const [protocollsOptionsAnchorEl, setProtocollsOptionsAnchorEl] = React.useState(null);
  const handleProtocollsOptionsClose = () => {
    setSelectedDay(null);
    setProtocollsOptionsAnchorEl(null);
  };
  const handleProtocollsOptionsClick = (event, day) => {
    setSelectedDay(day);
    setProtocollsOptionsAnchorEl(event.currentTarget);
  };

  //
  // Create plan from workout
  //
  React.useEffect(() => {
    if( createPlanFromWorkoutError || !createPlanFromWorkoutLoading) {
      setSelectedDay(null);
      handleProtocollsOptionsClose();
    }
  }, [createPlanFromWorkoutError, createPlanFromWorkoutLoading]);


  //
  // Protocoll list notes
  //
  const [notesAnchorEl, setNotesAnchorEl] = React.useState(null);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [selectedNoteId, setSelectedNoteId] = React.useState(null);

  const [editingMode, setEditingMode] = React.useState(false);
  const toggleEditingMode = () => setEditingMode(!editingMode);

  //
  // Note management
  //
  const [newNote, setNewNote] = React.useState('');
  const onNewNoteChange = (event) => setNewNote(event.target.value);

  const [editNote, setEditNote] = React.useState('');
  const onEditNoteChange = (event) => setEditNote(event.target.value);
  React.useEffect(() => {
    if( customer && customer.notes && selectedNoteId > 0 ) {
      const selectedNote = customer.notes.find(note => note.id == selectedNoteId);
      setEditNote(selectedNote.text);
    }
  }, [selectedNoteId]);

  React.useEffect(() => {
    !createNoteLoading && setNewNote('');
  }, [createNoteLoading]);
  React.useEffect(() => {
    setTimeout(() => {
      const list = notesListEl.current && notesListEl.current ? notesListEl.current.closest('.MuiPaper-root') : null;
      list && list.scrollTo(0, 2000);
    }, 300);
  }, [selectedDay]);
  const handleNotesClick = (event, day) => {
    console.log("handleNotesClick")
    setSelectedDay(day);
    setNotesAnchorEl(event.currentTarget);
  };
  const handleNotesClose = () => {
    setSelectedDay(null);
    setNotesAnchorEl(null);
    setEditingMode(false);
    setSelectedNoteId(null);
    setEditNote(false);
  };
  const notesListEl = React.useRef(null);
  React.useEffect(() => {
    if(notesAnchorEl === null) {
      setSelectedDay(null);
      setEditingMode(false);
      setSelectedNoteId(null);
      setEditNote(false);
    }
  }, [notesAnchorEl]);

  //
  // Files management
  //
  const [uploadingFiles, setUploadingFiles] = React.useState(false);
  const [fileDownloadMode, setFileDownloadMode] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const loadingFiles = uploadingFiles || loadingMemberFiles;

  console.log("loadingFiles", loadingFiles)

  const handleOpen = (file) => {
    setModalOpen(true);
    setSelectedFile(file);
  }
  const handleClose = () => {
    setModalOpen(false);
    setSelectedFile(null);
  }

  const onRemoveFile = () => {
    removeMemberFile(selectedFile)
    handleClose()
  }

  const prepareMeasuresData = (rawData) => {
    const chartData = []
    if( rawData ) {
      rawData.map( function (measure) {
        if( measure.weight > 0 ) {
          chartData.push({
            name: measure.target_date,
            weight: measure.weight
          })
        }
      })
      return chartData
    } else {
      return []
    }
  }

  const {birthday, plans, workouts, warnings, files, goals, notes} = customer;

  //const dayLists = _.slice(_.groupBy(workouts && workouts, (workout) => workout.formated_date), 0, 20);
  const dayLists = _.groupBy(workouts && workouts, (workout) => workout.formated_date);

  const token = cookie.get('token');

  const handleFileOpen = (file) => {
    (window.cordova && window.cordova.InAppBrowser) ? window.cordova.InAppBrowser.open(file, '_system') : window.open(file, '_blank');
  }

  const panes = [
    {
      menuItem: {
        key: 'data',
        icon: 'chevron right',
        content: t("costomer info")
      },
      render: () =>
      <Tab.Pane>
        <div className="info-list-viewport">
          <div className="info-list-content">
            <Card key="card-info" onClick={onGoToMeasures}>
              <div className="workout-wrapper personal-data">
              {
                loading &&
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              }
              {
                !loading &&
                <Statistic.Group widths='two'>
                  <Statistic size='mini'>
                    <StatisticValue><span>{birthday ? moment(parseInt(birthday)).format('DD/MM/YYYY') : 'N.E.'}</span></StatisticValue>
                    <Statistic.Label>{t("BIRTHDAY")}</Statistic.Label>
                  </Statistic>
                  <Statistic size='mini'>
                    <StatisticValue><span>{lastMeasures.weight}</span> {t("KG")}</StatisticValue>
                    <Statistic.Label>{t("WEIGHT")}</Statistic.Label>
                  </Statistic>
                  <Statistic size='mini'>
                    <StatisticValue><span>{lastMeasures.height}</span> cm</StatisticValue>
                    <Statistic.Label>{t("SIZE")}</Statistic.Label>
                  </Statistic>
                  <Statistic size='mini'>
                    <StatisticValue><span>{lastMeasures.fat}</span> %</StatisticValue>
                    <Statistic.Label>{t("BODYFAT")}</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              }
              </div>
            </Card>
            <Card key={"create-goal-button"} onClick={createGoal}>
              <div className="workout-wrapper member-goal create-button">
                <div className="workoutname">{t("new customer goal")}</div>
                <div className="target-section">
                  <Icon name='target' className="card-decoration"/>
                  <div className="no-date-section">
                    <Button
                      icon='plus'
                      size='small'
                    />
                  </div>
                </div>
              </div>
            </Card>
            {
              goals && goals.map(( item, key ) =>
                <Card key={key} onClick={() => showGoal(item) }>
                  <div className="workout-wrapper member-goal">
                    <div className="workoutname">{item.description}</div>
                    <div className="target-section">
                      <Icon name='target' className="card-decoration"/>
                      {
                        <Rating
                          name="customized-icons"
                          defaultValue={ item.rating[0].value === null ? null : item.rating[0].value + 1 }
                          icon={<AdjustIcon fontSize="inherit" />}
                          max={11}
                          readOnly
                        />
                      }
                      <div className="rating-lable">
                        {item.rating[0].value === null ? t('NO_VALUE') : item.rating[0].value +  ' ' + t('from') + ' 10'}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            }
          </div>
        </div>
      </Tab.Pane>
    },
    { menuItem: { key: 'workouts',  icon: 'chevron right', content: <div>{t("plans")}<div className="counter">{plans ? plans.length : 0}</div></div> }, render: () =>
      <Tab.Pane>
        <WorkoutsList
          t={t}
          plans={plans}
          createWorkout={createWorkout}
          openWorkout={openWorkout}
        />
      </Tab.Pane>
    },
    { menuItem: { key: 'files',  icon: 'chevron right', content: <div>Files<div className="counter">{memberFiles ? memberFiles.length : 0}</div></div> }, render: () =>
      <Tab.Pane>
        <div className="files-list-viewport">
          <div className="files-list-content">
            {!loadingFiles && !fileDownloadMode &&
              <Button basic icon='upload' onClick={() => {
                setFileDownloadMode(true)
              }}/>
            }
            {!loadingFiles && fileDownloadMode && <FileDropZone
                memberId={customer.id}
                closeFileUploadPanel={ () => setFileDownloadMode(false) }
                updateMemberFiles={updateMemberFiles}
                setLoading={setUploadingFiles}
                loading={uploadingFiles}
              />
            }
            {!loadingFiles && !fileDownloadMode && memberFiles && memberFiles.slice().reverse().map(file => (
              <Card key={file.flinename}>
                <div className="workout-wrapper member-file" >
                  <div className="workoutname">{decodeURI(file.filename)}</div>
                  <div className="file-date">{ moment(new Date(parseInt(file.last_change))).format('DD MMMM YYYY')}</div>
                  <div className="member-file-icons">
                    <div className="member-file-icon trash">
                      <Icon name='trash alternate outline' onClick={() => handleOpen(file)}/>
                    </div>
                    <div className="member-file-icon file" onClick={() => handleFileOpen('https://kxt70ua3ml.execute-api.eu-central-1.amazonaws.com/prod/file/user/' + customer.id + '/files/' + token + '/' + file.filename)}>
                      <Icon name='file alternate outline'/>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {
              loadingFiles && (
                <div className="loading">
                  <CircularProgress size={60} />
                </div>
              )
            }
          </div>
        </div>
      </Tab.Pane>
    },
    { menuItem: { key: 'warnings',  icon: 'chevron right', content: <div>{t("WARNINGS")}<div className="counter">{warnings ? warnings.length : 0}</div></div> }, render: () =>
      <Tab.Pane>
        <div className="warnings-list-viewport">
          <div className="warnings-list-content">
            {
              warnings.map(( item, key ) =>
                <Card key={key} onClick={() => onWarningClick(item)}>
                  <div className={"workout-wrapper meber-warning " + item.warning_type} >
                    <div className="workoutname">{item.name}</div>
                    <div className="footer">
                      <div className="workoutextrainfo">
                        {
                          item.warning_type == 'MED' &&
                          <StyledRating
                            name="customized-icons"
                            defaultValue={item.rating !== null ? item.rating+1 : null}
                            readOnly
                            icon={<AdjustIcon fontSize="inherit" />}
                            max={11}
                          />
                        }
                        {
                          item.warning_type != 'MED' &&
                          <Rating
                            name="customized-icons"
                            defaultValue={item.rating !== null ? item.rating+1 : null}
                            icon={<AdjustIcon fontSize="inherit" />}
                            readOnly
                            max={11}
                          />
                        }
                        <div className="rating-lable">
                          {item.rating === null ? t('NO_VALUE') : item.rating +  ' ' + t('from') + ' 10'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            }
          </div>
        </div>
      </Tab.Pane>
    },
  ]

  const notesList = selectedDay ? notes.filter( note => moment(new Date(parseInt(note.note_date))).format("YYYY-MM-DD") == selectedDay) : [];
  //
  // Tab management
  //
  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabChange = (e, { activeIndex }) => setActiveTab(activeIndex);
  React.useEffect(() => {
    if( activeTab == 0 ) {
      //
      // Info scrolling
      //
      const infoViewport = document.querySelector('.info-list-viewport');
      const infoContent = document.querySelector('.info-list-content');
      setTimeout(function () {
        new ScrollBooster({
          viewport: infoViewport,
          content: infoContent,
          scrollMode: 'transform',
          direction: 'horizontal',
          emulateScroll: true,
        });
      }, 3000);
    }
    if( activeTab == 2 ) {
      //
      // Info scrolling
      //
      const filesViewport = document.querySelector('.files-list-viewport');
      const filesContent = document.querySelector('.files-list-content');
      setTimeout(function () {
        new ScrollBooster({
          viewport: filesViewport,
          content: filesContent,
          scrollMode: 'transform',
          direction: 'horizontal',
          emulateScroll: true,
        });
      }, 1500);
    }
    if( activeTab == 3 ) {
      //
      // Info scrolling
      //
      const warningsViewport = document.querySelector('.warnings-list-viewport');
      const warningsContent = document.querySelector('.warnings-list-content');
      setTimeout(function () {
        new ScrollBooster({
          viewport: warningsViewport,
          content: warningsContent,
          scrollMode: 'transform',
          direction: 'horizontal',
          emulateScroll: true,
        });
      }, 1500);
    }
  }, [activeTab, memberFiles]);

  return(
    <Stage>
      <StyledTab
        menu={{
          fluid: true,
          vertical: true,
          text: true,
        }}
        panes={panes}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
      />

      <ActivityList
        t={t}
        me={me}
        workouts={workouts}
        notesAnchorEl={notesAnchorEl}
        setNotesAnchorEl={setNotesAnchorEl}
        onCreateNote={onCreateNote}
        plans={plans}
        loading={loading}
        notesListEl={notesListEl}
        handleNotesClose={handleNotesClose}
        notesList={notesList}
        onNewNoteChange={onNewNoteChange}
        newNote={newNote}
        protocollsOptionsAnchorEl={protocollsOptionsAnchorEl}
        handleProtocollsOptionsClose={handleProtocollsOptionsClose}
        dayLists={dayLists}
        notes={notes}
        onProtocollClick={onProtocollClick}
        handleProtocollsOptionsClick={handleProtocollsOptionsClick}
        onCreatePlanFromWorkout={onCreatePlanFromWorkout}
        handleNotesClick={handleNotesClick}
        selectedDay={selectedDay}
        editingMode={editingMode}
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
        toggleEditingMode={toggleEditingMode}
        editNote={editNote}
        onEditNoteChange={onEditNoteChange}
        onUpdateNote={onUpdateNote}
        onDeleteNote={onDeleteNote}
        onAddWorkoutsToPlan={onAddWorkoutsToPlan}
      />


      <Modal
        basic size='small'
        open={modalOpen}
        onClose={handleClose}
      >
        <Header icon='trash' content='Dokument löschen' />
        <Modal.Content>
          <p>
            {t("DELETEDOCUMENTWARNING_1")} "{selectedFile && selectedFile.filename}" {t("DELETEDOCUMENTWARNING_2")}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={onRemoveFile}>
            <Icon name='remove' /> {t("DELETEDOCUMENT_YES")}
          </Button>
          <Button color='green' inverted onClick={handleClose}>
            <Icon name='checkmark' /> {t("DELETEDOCUMENT_NO")}
          </Button>
        </Modal.Actions>
      </Modal>


      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleClose} severity="warning" variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>


    </Stage>
  );
};

Customer.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  me: PropTypes.object,

  /**
   * Delete files from the server
  */
  removeMemberFile: PropTypes.func,

  /**
   * Object wiht the customer information
  */
  customer: PropTypes.object,

  /**
   * This a a calculated array containing the entries with the youngest timestamp
  */
  lastMeasures: PropTypes.array,

  /**
   * This function trigger the navigatoin to the exercise screen
  */
  onProtocollClick: PropTypes.func,

  /**
   * This function trigger the navitation to the workout screen
  */
  openWorkout: PropTypes.func,

  /**
   * Upload a list of files to the lambda server
  */
  addFiles: PropTypes.func,

  /**
   * A list with all workouts of the customer groupped by date (DD-MM-YYYY)
  */
  protocolls: PropTypes.array,

  /**
   * Graphql flag by loading customer protocolls
  */
  protocollsLoading: PropTypes.bool,

  /**
   * A list wiht all customer files
  */
  memberFiles: PropTypes.array,

  /**
   * Graphql flag for the function memberFiles
  */
  loadingMemberFiles: PropTypes.bool,

  /**
   * Trigger an update of the files array
  */
  updateMemberFiles: PropTypes.func,

  /**
   * Navigates to the ananmese screen / goals-Tab
  */
  showGoal: PropTypes.func,

  /**
   *  Navigates to the ananmese screen / goals-Tab
  */
  createGoal: PropTypes.func,

  /**
   * Graphql flag for all loading and processing functions
  */
  loading: PropTypes.bool,

  /**
   * To be used to show a message
  */
  openSnackbar: PropTypes.func,

  /**
   * This fucntion is called to close the message window
  */
  handleCloseSnackbar: PropTypes.func,

  /**
   * Set the message
  */
  snackbarMessage: PropTypes.string,

  /**
   * Open the create workout right menu options
  */
  createWorkout: PropTypes.func,

  /**
   * Send a new note entroy to the graphql server
  */

  onCreateNote: PropTypes.func,

  /**
   * Graphql flag for the function onCreateNote
  */
  createNoteLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onCreateNote
  */
  createNoteError: PropTypes.object,

  /**
   * Delete a note entry on the graphql server
  */
  onDeleteNote: PropTypes.func,

  /**
   * Graphl loading flag for the function onDeleteNote
  */
  deleteNoteLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onDeleteNote
  */
  deleteNoteError: PropTypes.object,

  /**
   * Update a note entry on the graphql server
  */
  onUpdateNote: PropTypes.func,

  /**
   * Graphl loading flag for the function onUpdateNote
  */
  updateNoteLoading: PropTypes.bool,

  /**
   * Object wiht the trainer logged in
  */
  updateNoteError: PropTypes.object,

  /**
   * By sending a date, this function create new workout. After the workout creation the graphql cache is refreshed. Afterwards a navitation jump is triggered to open the new workout
  */
  onCreatePlanFromWorkout: PropTypes.func,

  /**
   * This function add  a new split to an existing workout. After the workout is updated, the graphql cache is refreshed. Afterwards a navitation jump is triggered to open the new workout
  */
  onAddWorkoutsToPlan: PropTypes.func,

  /**
   * Graphl loading flag for all split  functions
  */
  createPlanFromWorkoutLoading: PropTypes.bool,

  /**
   * Graphl error object for all split  functions
  */
  createPlanFromWorkoutError: PropTypes.object,

  /**
   * Navigates to the measure screen
  */
  onGoToMeasures: PropTypes.func,

  /**
   * Navigates to the ananmese screen with two paraameters: the tab to be presented and the object to be shown after rendering
  */
  onWarningClick: PropTypes.func,
}

export default Customer;
