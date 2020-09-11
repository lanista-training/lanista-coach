import React, { Component, useState, useEffect } from 'react';
import cookie from 'js-cookie';
import _ from 'lodash';
import moment from "moment";
import { withApollo } from '../../lib/apollo'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Scene from "../../components/Scene";
import Customer from './Customer';
import CustomerHeader from "../../components/CustomerHeader";
import { MEMBER, GETMEMBERFILES, ME, PROTOCOLLS } from "../../queries";
import {
  UPDATEGOAL,
  SAVEGOALTARGET,
  CREATEGOAL,
  DELETEGOAL,
  CREATEPLAN,
  REQUESTDATAPRIVACYDOCUMENT,
  DATAPRIVACYDOCUMENTSIGNED,
  UPLOADSIGNATURE,
  CREATENOTE,
  UPDATENOTE,
  DELETENOTE,
  CREATEPLANFROMWORKOUT,
} from "../../mutations";
import { Modal} from 'semantic-ui-react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import DataPrivacyDialog from './DataPrivacyDialog';

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';
import DataProtection from '../../components/icons/DataProtection';
import CreatePlan from '../../components/icons/CreatePlan';
import DocumentWorkout from '../../components/icons/DocumentWorkout';
import Measures from '../../components/icons/Measures';
import Anamnesis from '../../components/icons/Anamnesis';
import Button from '../../components/LanistaButton';

import GoalPanel from '../../components/GoalPanel';
import CreatePlanDialogPanel from './CreatePlanDialogPanel';
import {StyledDrawer} from './styles';

const CustomerPane = ({
  memberId,
  client,
  goBack,
  goToAnamnese,
  goToExercise,
  goToExercises,
  goToMeasures,
  goToWorkout,
  goToWorkouts,
  goToProfile,
}) =>  {
  //
  // Data Protection Dialog
  //
  const [dpDialogOpen, setDpDialogOpen] = React.useState(false);
  const toggleDpDialogOpen = () => setDpDialogOpen(!dpDialogOpen);
  const [requestDataProtectionDocument, setRequestDataProtectionDocument] = React.useState(false);
  React.useEffect(() => {
    requestDataProtectionDocument && toggleDpDialogOpen();
  }, [requestDataProtectionDocument]);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const [dialogCreatePlanOpen, setDialogCreatePlanOpen] = React.useState(false);
  const handleOpenDialogCreatePlan = () => {setDialogCreatePlanOpen(true)}
  const handleCloseDialogCreatePlan = () => {setDialogCreatePlanOpen(false)}


  const { data: {me} } = useQuery(ME);
  const { loading, error, data, refetch, networkStatus } = useQuery(MEMBER, {
    variables: {
      memberId: memberId,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  //
  // Protocolls
  //
  const [pageSize, setPageSize] = React.useState(50);
  const [after, setAfter] = React.useState(0);
  const { loading: protocollsLoading, error: protocollsError, data: protocollsData, fetchMore } = useQuery(PROTOCOLLS, {
    variables: {
      memberId: memberId,
      pageSize: pageSize,
      after: after,
    },
    fetchPolicy: 'no-cache'
  });


  const [errorMessage, setErrorMessage] = React.useState(undefined);

  React.useEffect(() => {
    if( error !== undefined) {
      if(error.message.indexOf('MEMBERNOTFOUND') > -1 ) {
        goBack();
      } else {
        setErrorMessage(t("GENERAL_ERROR"));
      }
    } else {
      setErrorMessage(undefined)
    }
  }, [error]);

  React.useEffect(() => {
    onChangeLanguage("de");
    const createdPlanId = localStorage.getItem('openplan');
    if( createdPlanId && createdPlanId > 0 ) {
      localStorage.removeItem('openplan');
      openWorkout(createdPlanId);
    }
  }, []);

  React.useEffect(() => {
    if( data && data.member && me ) {
      if(!data.member.dpSigned && me.dataPrivacyPolicy > 0) {
        setRequestDataProtectionDocument(true);
      }
    } else {
      if( window.localStorage.getItem('openDataProtectionDialog') ) {
        window.localStorage.removeItem('openDataProtectionDialog');
        setRequestDataProtectionDocument(true);
      }
    }
  }, [me, data]);

  const [updateGoal, {
    loading: mutationLoading,
    error: mutationError
  }] = useMutation(
    UPDATEGOAL,
    {
      update(cache,  { data: { updateGoal } }) {
        // find the updeted goals
        const {goals} = data.member;
        const indexOfGoal = goals.findIndex((goal) => goal.id == updateGoal.id)
        console.log(goals[indexOfGoal])
        setSelectedGoal(goals[indexOfGoal]);
      }
    }
  );

  const [createGoal, {
    loading: createLoading,
    error: createError
  }] = useMutation(
    CREATEGOAL,
    {
      update(cache,  { data: { createGoal } }) {
        const {member} = cache.readQuery({query: MEMBER, variables: {memberId: memberId}});
        const {goals} = member;
        const newGoals = goals.concat(
          {...createGoal, creator: {
            first_name: me.first_name,
            last_name: me.last_name,
            photoUrl: me.photoUrl,
            __typename: 'User',
          }}
        )
        member.goals = newGoals;
        cache.writeQuery({
          query: MEMBER,
          variables: {
            memberId:memberId,
          },
          data: { member: member },
        });
        setSelectedGoal({...createGoal, creator: {
          first_name: me.first_name,
          last_name: me.last_name,
          photoUrl: me.photoUrl,
          __typename: 'User',
        }});
      }
    }
  );

  const [deleteGoal, {
    loading: deleteLoading,
    error: deleteError
  }] = useMutation(
    DELETEGOAL,
    {
      update(cache,  { data: { deleteGoal } }) {
        const {member} = cache.readQuery({query: MEMBER, variables: {memberId: memberId}});
        const {goals} = member;
        const indexOfGoal = goals.findIndex((goal) => goal.id == deleteGoal.id);
        goals.splice(indexOfGoal, 1);
        member.goals = [...goals];

        cache.writeQuery({
          query: MEMBER,
          variables: {
            memberId:memberId,
          },
          data: { member: member },
        });
        handleClose();
        setSelectedGoal(null);
      }
    }
  );

  const [createPlan, {
    loading: creatingPlan,
    error: createPlanError
  }] = useMutation(
    CREATEPLAN,
    {
      update(cache,  { data: { createPlan } }) {
        handleCloseDialogCreatePlan();
        openWorkout(createPlan.id);
      }
    }
  );

  const [createPlanFromWorkout, {
    loading: createPlanFromWorkoutLoading,
    error: createPlanFromWorkoutError
  }] = useMutation(
    CREATEPLANFROMWORKOUT,
    {
      update(cache,  { data: { createPlanFromWorkout } }) {
        if( createPlanFromWorkout.id > 0 ) {
          openWorkout(createPlanFromWorkout.id);
        } else {
          console.log("ERROR");
          // TODO: SHOW ERROR MESSAGE
        }
      }
    }
  );


  //
  // Data privacy lifecycle
  //
  //
  // Step 1
  const [dpPreviewGenerated, setDpPreviewGenerated] = React.useState(false);
  // Step 2
  const [dpDocumentSigned, setDpDocumentSigned] = React.useState(false);
  // Step 3
  const [dpFinalWarningExecuted, setDpFinalWarningExecuted] = React.useState(false);

  const [dataPrivacyDocument, setDataPrivacyDocument] = React.useState(null);
  const [requestDataPrivacyDocument, {
    loading: requestDataPrivacyDocumentLoading,
    error: requestDataPrivacyDocumentError
  }] = useMutation(
    REQUESTDATAPRIVACYDOCUMENT,
    {
      update(cache,  { data: { requestDataPrivacyDocument } }) {
        if(requestDataPrivacyDocument && requestDataPrivacyDocument.filename) {
          setDataPrivacyDocument(requestDataPrivacyDocument.filename);
          setDpPreviewGenerated(true);
        } else {
          console.log("show error");
        }
      }
    }
  );
  const onRequestDataPrivacyDocument = () => {
    setDpPreviewGenerated(false);
    requestDataPrivacyDocument({
      variables: {
        memberId: memberId,
      }
    })
  }

  //
  //
  //
  const [dataPrivacyDocumentSigned, {
    loading: dataPrivacyDocumentSignedLoading,
    error: dataPrivacyDocumentSignedError,
  }] = useMutation(
    DATAPRIVACYDOCUMENTSIGNED,
    {
      update(cache,  { data: { dataPrivacyDocumentSigned } }) {
        setDpDocumentSigned(true);
        refetch();
      }
    }
  );
  const onDataPrivacyDocumentSigned = () => {
    dataPrivacyDocumentSigned({
      variables: {
        memberId: memberId,
      }
    })
  }

  //
  //
  //
  const [uploadSignature, {
    loading: uploadSignatureLoading,
    error: uploadSignatureError,
  }] = useMutation(
    UPLOADSIGNATURE,
    {
      update(cache,  { data: { dataPrivacyDocumentSigned } }) {
        setDpDocumentSigned(true);
        refetch();
      }
    }
  );
  const onUploadSignature = (dataUrl) => {
    uploadSignature({
      variables: {
        memberId: memberId,
        dataUrl: dataUrl,
      }
    })
  }

  //
  // Note
  //
  const [createNote, { loading: createNoteLoading, error: createNoteError }] = useMutation(
    CREATENOTE,
    {
      update(cache,  { data: { createNote } }) {
        if( createNote.id > 0) {
          refetch();
        }
      }
    }
  );

  const [updateNote, { loading: updateNoteLoading, error: updateNoteError }] = useMutation(
    UPDATENOTE,
    {
      update(cache,  { data: { updateNote } }) {
        if( updateNote.id > 0) {
          refetch();
        }
      }
    }
  );

  const [deleteNote, { loading: deleteNoteLoading, error: deleteNoteError }] = useMutation(
    DELETENOTE,
    {
      update(cache,  { data: { deleteNote } }) {
        if( deleteNote.id > 0) {
          refetch();
        }
      }
    }
  );

  const onCreateNote = (text, date) => {
    createNote({
      variables: {
        text: text,
        memberId: memberId,
        noteDate: date,
      }
    });
  }

  const onUpdateNote = (noteId, text) => {
    updateNote({
      variables: {
        noteId: noteId,
        text: text
      }
    });
  }

  const onDeleteNote = (noteId) => {
    deleteNote({
      variables: {
        noteId: noteId,
      }
    });
  }

  // Files
  const { data: memberFiles, loading: loadingMemberFiles, error: getMemberFilesError, refetch: refetchMemberFiles } = useQuery(GETMEMBERFILES, {
    variables: {
      memberId: memberId,
    },
    fetchPolicy: "network-only",
  });

  const updateMemberFiles = (files) => {
    console.log("updateMemberFiles");
    refetchMemberFiles();
  }

  const removeMemberFile = (file) => {

    const uploadBaseUrl = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/' + 'file/user/';
    const token = cookie.get('token');

    fetch( uploadBaseUrl + memberId + '/files/' + file.filename, {
      method: 'DELETE',
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        'content-type': 'application/json',
      }
    })
    .then(() => {
       client.query({
         query: GETMEMBERFILES,
         variables: {
           memberId: memberId,
         },
         fetchPolicy: "network-only",
         onCompleted: (data) => {
           const {cache} = client
           let {getMemberFiles} = cache.readQuery({
             query: GETMEMBERFILES,
             variables: {
               memberId: memberId,
             },
           });
           cache.writeQuery({
             query: GETMEMBERFILES,
             variables: {
               memberId: memberId,
             },
             data: { getMemberFiles: getMemberFiles },
           });
         }
       })
    }).catch(err => {
      console.error(err)
    });
  }

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const [translations, setTranslations] = React.useState([]);
  const [currentLanguage, setCurrentLanguage] = React.useState('');
  const [availableLanguages, setAvailableLanguages] = React.useState([]);

  const [selectedGoal, setSelectedGoal] = React.useState(null);

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [dialogMessage, setDialogMessage] = React.useState('');
  const [agreeButton, setAgreeButton] = React.useState(null);
  const [rejectButton, setRejectButton] = React.useState(null);

  var dialogEndFunction = () => {}

  const onWarningClick = (warning) => {
    console.log("onWarningClick")
    console.log(warning)
    var tab = 0;
    switch(warning.warning_type) {
      case 'ANN':
        break;
      case 'LIF':
        tab = 1;
        break;
      case 'MED':
        tab = 2;
        break;
      case 'SPO':
        tab = 3;
        break;
      case 'GOA':
        tab = 4;
        break;
      case 'PHY':
        tab = 5;
        break;
      default:
    }
    goToAnamnese(tab, warning.object_id);
    /*
    Router.push({
      pathname: '/anamnese',
      query: {
        customer: memberId,
        tab: tab,
        id: warning.object_id,
      }
    });
    */
  }

  const onProtocollClick = (exerciseId, tab = 0) => {
    goToExercise(exerciseId, tab);
    /*
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        member: memberId,
        tab: tab
      }
    });
    */
  }

  const getCommandsRight = () => {
    const commands = [];
    if( data && data.member && me ) {
      if(!data.member.dpSigned && me.dataPrivacyPolicy > 0) {
        commands.push({
          icon: <DataProtection/>,
          text: t("DATE_PRIVACY"),
          type: 'type-1',
          name: 'data privacy',
          style: {color: '#db2828'},
          className: 'data-protection-warning-button',
          onTap: () => {
            toggleDpDialogOpen();
          }
        });
      }
    }
    commands.push({
      icon: <CreatePlan/>,
      text: t("CREATE_PLAN"),
      type: 'type-1',
      typex: 'Ionicons',
      name: 'new user',
      onTap: () => {
        toggleDrawer();
      }
    });
    commands.push({
      icon: <DocumentWorkout/>,
      text: t("DOCUKENT_WORKOUT"),
      type: 'type-1',
      typex: 'Ionicons',
      name: 'folder',
      onTap: () => {
        goToExercises();
        /*
        Router.push({
          pathname: '/exercises',
          query: {
            member: memberId,
          }
        });
        */
      }
    });
    commands.push({
      icon: <Measures/>,
      text: t("MEASURES"),
      type: 'type-1',
      typex: 'Ionicons',
      name: 'last',
      onTap: () => {
        goToMeasures();
        /*
        Router.push({
          pathname: '/measures',
          query: { customer: memberId }
        });
        */
      }
    });
    commands.push({
      icon: <Anamnesis/>,
      text: t("ANAMNESIS"),
      type: 'type-1',
      typex: 'Ionicons',
      name: 'refresh',
      onTap: () => {
        goToAnamnese();
        /*
        Router.push({
          pathname: '/anamnese',
          query: { customer: memberId }
        });
        */
      }
    });
    return commands;
  }

  const getCommandsLeft = () => {

    return ([{
        icon: <Back/>,
        iosname: 'tools-inactive',
        text: '',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'back',
        style: {color: '#34acfb'},
        onTap: () => {
          goBack();
        }
    }]);

  }

  const calculateBodyFat = (member, measures) => {
    var fatShare = 0;
    const age = isNaN(member.birthday) ? 32 : moment().diff(parseInt(member.birthday), 'years')
    const sum = measures.trizeps + measures.scapula + measures.auxiliar + measures.chest + measures.sprailium + measures.abs + measures.quads;
    if( member.gender === 0 ){
        fatShare =  (Math.round (((4.96/(1.112-0.00043499*sum+0.00000055*sum*sum-0.00028826*age))-4.5)*10000, 4) / 100);
    } else {
        fatShare = (Math.round (((4.96/(1.097-0.00046971*sum+0.00000056*sum*sum-0.00012828*age))-4.51)*10000, 4) / 100);
    }
    return fatShare;
  }

  const extractLastMeasures = (data) => {
     if( data && data.member && data.member.calipers ){
       const sortedData = _.orderBy(data.member.calipers, ['target_date'], ['desc'])

       const lastHeightEntry = _.find(sortedData, (o) => o.height > 0)
       const lastWeightEntry = _.find(sortedData, (o) => o.weight > 0)

       const lastHeight = lastHeightEntry ? lastHeightEntry.height : 0
       const lastWeight = lastWeightEntry ? lastWeightEntry.weight : 0

       const lastFutrex = _.find(sortedData, (o) => (o.futrex > 0 || (o.trizeps>0 && o.scapula>0 &&  o.auxiliar>0 && o.chest>0 && o.sprailium>0 && o.abs>0 && o.quads>0 )))
       return {
         height: lastHeight,
         weight: lastWeight,
         fat: lastFutrex ? (lastFutrex.futrex > 0 ? lastFutrex.futrex : calculateBodyFat(data.member, lastFutrex)) : 0,
       }
     } else {
       return {
         height: 0,
         weight: 0,
         fat: 0,
       }
     }
  }

  const t = (text) => {
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  const onChangeLanguage = ( language ) => {
    const translations = require('../../../static/locales/' + language + '/customer');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    setTranslations({...translations, ...commonTranslations})
    setCurrentLanguage(language)
    setAvailableLanguages(originalLanguages.filter(word => word !== language))

  }

  const openWorkout = (workoutId) => {
    console.log("openWorkout", workoutId)
    goToWorkout(workoutId);
    /*
    Router.push({
      pathname: '/workout',
      query: { workout: workoutId }
    });
    */
  }

  const createWorkout = () => {
    toggleDrawer();
    //setSnackbarMessage("Funktionalität steht bald zu verfügung")
    //setOpenSnackbar(true)
  }

  const showGoal = (goal) => {
    onWarningClick({
      warning_type: 'GOA',
      object_id: goal.id,
    })
    /*
    setSelectedGoal(goal)
    handleOpen()
    */
  }

  const onCreateGoal = () => {
    onWarningClick({
      warning_type: 'GOA',
    })
    /*
    setSelectedGoal({
      description: '',
      rating: 0,
      warning_flag: false,
      creation_date: (new Date()).getTime(),
      creator: {
        first_name: me.first_name,
        last_name: me.last_name,
        photoUrl: me.photoUrl,
      }
    })
    handleOpen();
    */
  }

  const onDeleteGoal = () => {
    setDialogTitle('Kundenzieleintrag löschen')
    setDialogMessage('Wollen Sie den Zieleintrag wirklich löschen?');
    setAgreeButton(<Button onClick={() => {
        handleCloseDialog();
        deleteGoal({
          variables: {
            goalId: selectedGoal.id
          }
        });
      }} color="primary" autoFocus>
      Löschen
    </Button>)
    setRejectButton(<Button onClick={handleCloseDialog} color="primary">
      Zürück
    </Button>)
    handleOpenDialog();
  }

  const onSyncGoal = ({description, warning_flag, rating}) => {
    if(selectedGoal.id > 0) {
      updateGoal({
        variables:{
          goalId: selectedGoal.id,
          description: description,
          warning_flag: warning_flag,
          rating: rating,
          target_date: null,
          start_date: null,
        }
      })
    } else {
      createGoal({
        variables:{
          memberId: memberId,
          description: description,
          warning_flag: warning_flag ? warning_flag : false,
          rating: rating ? rating : 0,
        }
      })
    }
  }

  const onCreatePlan = () => {
    handleOpenDialogCreatePlan();
  }

  const onCreatePlanFromTemplate = () => {
    goToWorkouts();
    /*
    Router.push({
      pathname: '/workouts',
      query: { customer: memberId }
    });
    */
  }

  const openMemberProfile = () => {
    goToProfile();
    /*
    Router.push({
      pathname: '/profile',
      query: { member: memberId }
    });
    */
  }

  const onCreatePlanFromWorkout = (workoutDay) => {
    createPlanFromWorkout({
      variables: {
        memberId:memberId,
        workoutDay: workoutDay,
      }
    });
  };
  const onAddWorkoutsToPlan = (planId, workoutDay) => {
    createPlanFromWorkout({
      variables: {
        memberId:memberId,
        workoutDay: workoutDay,
        planId: planId,
      }
    });
  }
  React.useEffect(() => {
    if( createPlanFromWorkoutError ) {
      setSnackbarMessage(t("CREATE_PLAN_FROM_WORKOUTS_ERROR"));
      setOpenSnackbar(true);
    }
  }, [createPlanFromWorkoutError]);

  //
  // Licence exired handling
  //
  const [showLicenceExpiredWarning, setShowLicenceExpiredWarning] = useState(false);
  const toggleLicenceExpiredWarning = () => setShowLicenceExpiredWarning(!showLicenceExpiredWarning);
  useEffect(() => {
    if( createPlanError && createPlanError.message.indexOf('LICENCEINVALID') > -1 ) {
      toggleLicenceExpiredWarning();
    } else  if( createNoteError && createNoteError.message.indexOf('LICENCEINVALID') > -1 ) {
      toggleLicenceExpiredWarning();
    } else {
      setShowLicenceExpiredWarning(false);
    }
  }, [createPlanError, createNoteError])

  return (
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight()}
      headerChildren={
        <CustomerHeader
          userId={data && data.member ? data.member.id : ''}
          firstName={data && data.member ? data.member.first_name : ''}
          lastName={data && data.member ? data.member.last_name : ''}
          photoUrl={data && data.member ? (data.member.photoUrl) : ''}
          onClick={openMemberProfile}
          editable={true}
        />
      }
      t={t}
      message={errorMessage}
      networkStatus={networkStatus}

      showLicenceExpiredWarning={showLicenceExpiredWarning}
      onCloseLicenceExpiredWarning={toggleLicenceExpiredWarning}
    >



      <Customer
        t={t}

        customer={data && data.member ? data.member : {}}
        customerFiles={memberFiles}
        lastMeasures={extractLastMeasures(data) }

        protocolls={protocollsData ? protocollsData.protocolls : []}
        protocollsLoading={protocollsLoading}

        onProtocollClick={onProtocollClick}
        openWorkout={openWorkout}
        updateMemberFiles={updateMemberFiles}
        removeMemberFile={removeMemberFile}

        memberFiles={!memberFiles && data && data.member ? data.member.files : memberFiles ? memberFiles.getMemberFiles : []}
        loadingMemberFiles={loadingMemberFiles}

        showGoal={showGoal}
        createWorkout={createWorkout}
        createGoal={onCreateGoal}
        loading={loading}
        error={error}
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarMessage={snackbarMessage}
        me={me}

        onCreateNote={onCreateNote}
        createNoteLoading={createNoteLoading}
        createNoteError={createNoteError}

        onDeleteNote={onDeleteNote}
        deleteNoteLoading={deleteNoteLoading}
        deleteNoteError={deleteNoteError}

        onUpdateNote={onUpdateNote}
        updateNoteLoading={updateNoteLoading}
        updateNoteError={updateNoteError}

        onCreatePlanFromWorkout={onCreatePlanFromWorkout}
        onAddWorkoutsToPlan={onAddWorkoutsToPlan}
        createPlanFromWorkoutLoading={createPlanFromWorkoutLoading}
        createPlanFromWorkoutError={createPlanFromWorkoutError}

        onGoToMeasures={goToMeasures}

        onWarningClick={onWarningClick}

      />



      {modalOpen &&
        <Modal
            open={modalOpen}
            onClose={handleClose}
            basic
            size='small'
          >
            <GoalPanel
              goal={selectedGoal}
              onSyncGoal={onSyncGoal}
              onDeleteGoal={onDeleteGoal}
            />
          </Modal>
      }

      {data && data.member && dpDialogOpen &&
        <DataPrivacyDialog
          dpDialogOpen={dpDialogOpen}
          toggleDpDialogOpen={toggleDpDialogOpen}

          dpPreviewGenerated={dpPreviewGenerated}
          setDpPreviewGenerated={setDpPreviewGenerated}

          dpDocumentSigned={dpDocumentSigned}
          setDpDocumentSigned={setDpDocumentSigned}

          dpFinalWarningExecuted={dpFinalWarningExecuted}
          setDpFinalWarningExecuted={setDpFinalWarningExecuted}

          onRequestDataPrivacyDocument={onRequestDataPrivacyDocument}
          requestDataPrivacyDocumentLoading={requestDataPrivacyDocumentLoading}
          requestDataPrivacyDocumentError={requestDataPrivacyDocumentError}

          onDataPrivacyDocumentSigned={onDataPrivacyDocumentSigned}
          dataPrivacyDocumentSignedLoading={dataPrivacyDocumentSignedLoading}
          dataPrivacyDocumentSignedError={dataPrivacyDocumentSignedError}

          onUploadSignature={onUploadSignature}
          uploadSignatureLoading={uploadSignatureLoading}
          uploadSignatureError={uploadSignatureError}

          firstName={data.member.first_name}
          lastName={data.member.last_name}
          dataPrivacyDocument={dataPrivacyDocument}
          t={t}
        />
      }

      {dialogOpen &&
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {rejectButton}
            {agreeButton}
          </DialogActions>
        </Dialog>
      }




      { dialogCreatePlanOpen &&
        <CreatePlanDialogPanel
          t={t}

          open={dialogCreatePlanOpen}

          handleCloseDialogCreatePlan={handleCloseDialogCreatePlan}

          creatingPlan={creatingPlan}
          createPlan={createPlan}

          memberId={memberId}
        />
      }




      <StyledDrawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer()}>
        <div
          role="presentation"
          onClick={() => toggleDrawer()}
          onKeyDown={() => toggleDrawer()}
        >
          <List>
            <div className="list-item-wrapper">
              <ListItem button key="new-plan" onClick={onCreatePlan}>
                <ListItemText primary={t("NEW_PLAN")} />
              </ListItem>
            </div>
            <div className="list-item-wrapper">
              <ListItem button key="new-plan-from-templates" onClick={onCreatePlanFromTemplate}>
                <ListItemText primary={t("USE_TEMPLATE")} />
              </ListItem>
            </div>
          </List>
        </div>
      </StyledDrawer>





    </Scene>
  )
}

export default withApollo(CustomerPane);
