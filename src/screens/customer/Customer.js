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
  Placeholder
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

import CircularProgress from '@material-ui/core/CircularProgress';

import WorkoutsList from './WorkoutsList';
import ActivityList from './ActivityList';

import ScrollBooster from 'scrollbooster';

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
  6: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

const IconContainer = (props) => {
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

const FileDropZone = ({memberId, updateMemberFiles, closeFileUploadPanel, loading}) => {

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png, application/pdf'
  });

  const files = acceptedFiles.map((file, index) => {
      let reader = new FileReader();
      let uploadBaseUrl = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/' + 'file/user/';
      const token = cookie.get('token');
      reader.addEventListener('loadend', function(e) {
        fetch(uploadBaseUrl + memberId + '/files/' + file.name, {
          method: "POST",
          body: new Blob([reader.result], {type: file.type}),
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          },
        })
        .then((response) => {
          if (response.ok) {
            if(index == acceptedFiles.length-1) {
              closeFileUploadPanel()
              updateMemberFiles()
              //startLoading(false);
            }
          } else {
            alert('Error uploading [' + file.name + ']');
          }
        })
        .catch((error) => {
          console.log("ERROR UPLOADING FILE")
          console.log(error)
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

  const panes = [
    { menuItem: { key: 'data',  icon: 'chevron right', content: 'Kundeninfo' }, render: () =>
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
                <div className="workoutname">{"Neue Kundenziel eingeben"}</div>
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
                          defaultValue={item.rating[item.rating.length-1].value+1}
                          getLabelText={value => customIcons[value].label}
                          IconContainerComponent={IconContainer}
                          readOnly
                        />
                      }
                    </div>
                  </div>
                </Card>
              )
            }
          </div>
        </div>
      </Tab.Pane>
    },
    { menuItem: { key: 'workouts',  icon: 'chevron right', content: <div>Pläne<div className="counter">{plans ? plans.length : 0}</div></div> }, render: () =>
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
            {!fileDownloadMode &&
              <Button basic icon='upload' onClick={() => {
                setFileDownloadMode(true)
              }}/>
            }
            {fileDownloadMode && <FileDropZone
                memberId={customer.id}
                closeFileUploadPanel={ () => setFileDownloadMode(false) }
                updateMemberFiles={updateMemberFiles}
                loading={loadingFiles}
              />
            }
            {!fileDownloadMode && memberFiles && memberFiles.map(file => (
              <Card key={file.flinename}>
                <div className="workout-wrapper member-file" >
                  <div className="workoutname">{decodeURI(file.filename)}</div>
                  <div className="member-file-icons">
                    <div className="member-file-icon trash">
                      <Icon name='trash alternate outline' onClick={() => handleOpen(file)}/>
                    </div>
                    <div className="member-file-icon file">
                      <a href={'https://kxt70ua3ml.execute-api.eu-central-1.amazonaws.com/prod/file/user/' + customer.id + '/files/' + token + '/' + file.filename} target="_blank">
                        <Icon name='file alternate outline'/>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
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
                            defaultValue={item.rating+1}
                            IconContainerComponent={IconContainer}
                            readOnly
                          />
                        }
                        {
                          item.warning_type != 'MED' &&
                          <Rating
                            name="customized-icons"
                            defaultValue={item.rating+1}
                            IconContainerComponent={IconContainer}
                            readOnly
                          />
                        }
                        <div>
                          {t(getTranslationKey(item.warning_type) + "_rating_" + (item.rating + 1))}
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
  }, [activeTab]);

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
   * Object wiht the trainer logged in
  */
  removeMemberFile: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  customer: PropTypes.object,

  /**
   * Object wiht the trainer logged in
  */
  lastMeasures: PropTypes.array,

  /**
   * Object wiht the trainer logged in
  */
  onProtocollClick: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  openWorkout: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  addFiles: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  protocolls: PropTypes.array,

  /**
   * Object wiht the trainer logged in
  */
  protocollsLoading: PropTypes.bool,

  /**
   * Object wiht the trainer logged in
  */
  memberFiles: PropTypes.array,

  /**
   * Object wiht the trainer logged in
  */
  loadingMemberFiles: PropTypes.bool,

  /**
   * Object wiht the trainer logged in
  */
  updateMemberFiles: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  showGoal: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  createGoal: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  loading: PropTypes.bool,

  /**
   * Object wiht the trainer logged in
  */
  openSnackbar: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  handleCloseSnackbar: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  snackbarMessage: PropTypes.string,

  /**
   * Object wiht the trainer logged in
  */
  createWorkout: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */

  onCreateNote: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  createNoteLoading: PropTypes.bool,

  /**
   * Object wiht the trainer logged in
  */
  createNoteError: PropTypes.object,

  /**
   * Object wiht the trainer logged in
  */
  onDeleteNote: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  deleteNoteLoading: PropTypes.bool,

  /**
   * Object wiht the trainer logged in
  */
  deleteNoteError: PropTypes.object,

  /**
   * Object wiht the trainer logged in
  */
  onUpdateNote: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  updateNoteLoading: PropTypes.bool,

  /**
   * Object wiht the trainer logged in
  */
  updateNoteError: PropTypes.object,

  /**
   * Object wiht the trainer logged in
  */
  onCreatePlanFromWorkout: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  onAddWorkoutsToPlan: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  createPlanFromWorkoutLoading: PropTypes.bool,

  /**
   * Object wiht the trainer logged in
  */
  createPlanFromWorkoutError: PropTypes.object,

  /**
   * Object wiht the trainer logged in
  */
  onGoToMeasures: PropTypes.func,

  /**
   * Object wiht the trainer logged in
  */
  onWarningClick: PropTypes.func,
}

export default Customer;
