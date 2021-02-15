import React, { Component } from 'react';
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import moment from "moment";
import arrayMove from 'array-move';
import QRCode from 'qrcode.react';

import { withApollo } from '../../lib/apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

import Scene from "../../components/Scene";
import Workout from './Workout';
import WorkoutHeader from "../../components/WorkoutHeader";
import { WORKOUT, MEMBER, WORKOUTS, ME } from "../../queries";
import {
  CHANGESPLITORDER,
  DELETEPLAN,
  APPLYSETTINGSTOPLAN,
  UPDATEPLAN,
  GENERATEPLANPDF,
  SENDPLAN,
  CLONEPLAN,
  DELETESPLIT,
  SHIFTPLITRIGHT,
  SHIFTPLITLEFT,
  DUPLICATESPLIT,
  SENDACTIVATIONMAIL,
} from "../../mutations";
import {
  StyledDrawer,
  StyledSnackbar,
  ImageBlock,
  Foto,
  CustomerHeader,
  TextBlock,
  FirstName,
  LastName,
  CustomerSection,
  QrCodeSection 
} from './styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

import Avatar from '@material-ui/core/Avatar';

import DefaultSettingsPanel from '../../components/DefaultSettingsPanel';
import WorkoutEditPanel from '../../components/WorkoutEditPanel';
import PrintPlanPanel from '../../components/PrintPlanPanel';
import SendPlanPanel from '../../components/SendPlanPanel';
import LanistaButton from '../../components/LanistaButton';
import ChannelInfoPanel from '../../components/ChannelInfoPanel';

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';
import Plus from '../../components/icons/Plus';
import Settings from '../../components/icons/Settings';
import Export from '../../components/icons/Export';
import Edit from '../../components/icons/Edit';
import CreateUser from '../../components/icons/CreateUser';

const GET_DEFAULTSETTINGS = gql`
  {
    defaultSettings @client {
      sets
      unit
      execution
    }
  }
`;

const Panel = ({
  workoutId,

  goBack,
  goToExercises,
  goToRoot,
  goToWorkouts,
  goToExercise,
  goToCustomers,
  goToSetup
}) => {

  const {t} = useTranslate("workout");

  //
  // Snackbar
  //
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarData, setSnackbarData] = React.useState({
    message: '',
    action: null,
  });
  const toggleSnackbar = () => setOpenSnackbar(!openSnackbar);
  React.useEffect(() => {
    !openSnackbar && setSnackbarData({
      message: '',
      action: null,
    });
  }, [openSnackbar]);
  React.useEffect(() => {
    if( snackbarData.message !== '' ) toggleSnackbar();
  }, [snackbarData.message]);

  const [defaultSettingsDrawerOpen, setDefaultSettingsDrawerOpen] = React.useState(false);
  const toggleDefaultSettingsDrawer = () => setDefaultSettingsDrawerOpen(!defaultSettingsDrawerOpen);

  const [shareDrawerOpen, setShareDrawerOpen] = React.useState(false);
  const toggleSharesDrawer = () => setShareDrawerOpen(!shareDrawerOpen);

  const [optionsDrawerOpen, setOptionsDrawerOpen] = React.useState(false);
  const toggleOptionsDrawer = () => setOptionsDrawerOpen(!optionsDrawerOpen);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const toggleDialogOpen = () => setDialogOpen(!dialogOpen);

  const [applySettingsDialogOpen, setApplySettingsDialogOpen] = React.useState(false);
  const toggleApplySettingsDialogOpen = () => setApplySettingsDialogOpen(!applySettingsDialogOpen);

  const [defaultSettingsOpen, setDefaultSettingsOpen] = React.useState(false);
  const toggleDefaultSettingsOpen = () => setDefaultSettingsOpen(!defaultSettingsOpen);

  const [printPanelOpen, setPrintPanelOpen] = React.useState(false);
  const [sendPanelOpen, setSendPanelOpen] = React.useState(false);
  const togglePrintPanelOpen = () => setPrintPanelOpen(!printPanelOpen);
  const toggleSendPanelOpen = () => setSendPanelOpen(!sendPanelOpen);
  const [printType, setPrintType] = React.useState(0);

  const [workoutEditOpen, setWorkoutEditOpen] = React.useState(false);
  const toggleWorkoutEditOpen = () => setWorkoutEditOpen(!workoutEditOpen);

  const [workoutChannelInfoOpen, setWorkoutChannelInfo] = React.useState(false);
  const toggleWorkoutChannelInfo = () => setWorkoutChannelInfo(!workoutChannelInfoOpen);

  const [publishPlan, setPublishPlan] = React.useState(false);
  const togglePublishPlan = () => setPublishPlan(!publishPlan)

  //
  // Queries
  //
  const { loading, error, data, refetch, networkStatus } = useQuery(WORKOUT, {
    variables: {
      workoutId: workoutId,
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const { data:meData } = useQuery(ME);
  const {me} = meData ? meData : {me: {}}

  const { loading: memberDataLoading, data:memberData } = useQuery(MEMBER, {
    variables: {
      memberId: localStorage.getItem('assignToUser'),
    }
  });

  //
  // Local state
  //
  const initialValues = {
    sets: 3,
    unit: 0,
    execution: 8,
  };
  const { data: defaultSettingsData, client } = useQuery(GET_DEFAULTSETTINGS);
  const defaultSettings = defaultSettingsData && defaultSettingsData.defaultSettings ? defaultSettingsData.defaultSettings : initialValues;
  if( !(defaultSettingsData && defaultSettingsData.defaultSettings) ) {
    client.writeData({
      data: { defaultSettings: {__typename: 'defaultSettings', ...initialValues} }
    });
  }
  const setDefaultSettings = (settings) => client.writeData({
    data: { defaultSettings: {__typename: 'defaultSettings', ...settings} }
  });

  //
  //
  //
  const [workout, setWorkout] = React.useState([]);
  const [translations, setTranslations] = React.useState([]);
  const [currenLanguage, setCurrentLanguage] = React.useState('');
  const [availableLanguages, setAvailableLanguages] = React.useState([]);
  const [workoutChanged, setWorkoutChanged] = React.useState(false);

  const currentTab = parseInt(window.localStorage.getItem('currentTab'));
  const [activeSplitIndex, setActiveSplitIndex] = React.useState(currentTab ? currentTab : 0);
  React.useEffect(() => {
    window.localStorage.setItem('currentTab', parseInt(activeSplitIndex));
  }, [activeSplitIndex])

  const [changeSplitOder, { loading: mutationLoading, error: mutationError }] = useMutation(
    CHANGESPLITORDER,
    {
      update(cache,  { data: { changeSplitOder } }) {
        refetch();
      }
    }
  );

  const [deleteSplit, { loading: deleteSplitLoading, error: deleteSplitError }] = useMutation(
    DELETESPLIT,
    {
      update(cache,  { data: { deleteSplit } }) {
        const {split} = deleteSplit;
        if(split) {
          setActiveSplitIndex(activeSplitIndex-1);
        }
        refetch();
      }
    }
  );

  const [shiftSplitRight, { loading: shiftSplitRightLoading, error: shiftSplitRightError }] = useMutation(
    SHIFTPLITRIGHT,
    {
      update(cache,  { data: { shiftSplitRight } }) {
        let {workout} = cache.readQuery({
          query: WORKOUT,
          variables: {
            workoutId: workoutId,
          },
        });
        const {splits} = workout;
        const newSplits = arrayMove(splits, shiftSplitRight.split-1, shiftSplitRight.split)
        newSplits.map((split, index) => {
          split.id = index + 1;
          split.name = (index + 1) + '';
        })
        workout.splits = newSplits;
        cache.writeQuery({
          query: WORKOUT,
          variables: {
            workoutId: workoutId,
          },
          data: { workout: workout },
        });
        setActiveSplitIndex(shiftSplitRight.split);
      }
    }
  );

  const [shiftSplitLeft, { loading: shiftSplitLeftLoading, error: shiftSplitLeftError }] = useMutation(
    SHIFTPLITLEFT,
    {
      update(cache,  { data: { shiftSplitLeft } }) {
        let {workout} = cache.readQuery({
          query: WORKOUT,
          variables: {
            workoutId: workoutId,
          },
        });
        const {splits} = workout;
        const newSplits = arrayMove(splits, shiftSplitLeft.split-1, shiftSplitLeft.split - 2);
        newSplits.map((split, index) => {
          split.id = index + 1;
          split.name = (index + 1) + '';
        })
        workout.splits = newSplits;
        cache.writeQuery({
          query: WORKOUT,
          variables: {
            workoutId: workoutId,
          },
          data: { workout: workout },
        });
        setActiveSplitIndex(shiftSplitLeft.split-2);
      }
    }
  );

  const [duplicateSplit, { loading: duplicateSplitLoading, error: duplicateSplitError }] = useMutation(
    DUPLICATESPLIT,
    {
      update(cache,  { data: { duplicateSplit } }) {
        refetch();
        setTimeout(() => setActiveSplitIndex(duplicateSplit.split - 1), 300);
      }
    }
  );

  const [applySettingsToPlan, { loading: applySettingsLoading, error: applySettingsError }] = useMutation(
    APPLYSETTINGSTOPLAN,
    {
      update(cache,  { data: { applySettingsToPlan } }) {
        refetch();
      }
    }
  );

  const [deletePlan, { loading: deleteLoading, error: deleteError }] = useMutation(
    DELETEPLAN,
    {
      update(cache,  { data: { deletePlan } }) {
        if(deletePlan.template) {
          const {workouts} = cache.readQuery({
            query: WORKOUTS,
            variables: {
              filter: '',
            }
          });
          const indexOfWorkout = workouts.findIndex((workout) => workout.id == deletePlan.id);
          let newWorkouts = [...workouts];
          newWorkouts.splice(indexOfWorkout, 1);
          cache.writeQuery({
            query: WORKOUTS,
            variables: {
              filter: '',
            },
            data: { workouts: [...newWorkouts] },
          });
        }
        goBack();
      }
    }
  );

  const [generatePlanPdf, { loading: generateplanpdfLoading, error: generateplanpdfError }] = useMutation(
    GENERATEPLANPDF,
    {
      update(cache,  { data: { generatePlanPdf } }) {
        (window.cordova && window.cordova.InAppBrowser) ? window.cordova.InAppBrowser.open(generatePlanPdf.filename, '_system') : window.open(generatePlanPdf.filename, '_blank');
        togglePrintPanelOpen();
      }
    }
  );

  const [sendPlan, { loading: sendplanLoading, error: sendplanfError }] = useMutation(
    SENDPLAN,
    {
      update(cache,  { data: { sendPlan } }) {
        toggleSendPanelOpen();
        setSnackbarData({message: "Plan erfolgreich gesendet !", action: null})
        toggleSnackbar();
      }
    }
  );

  const [updatePlan, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATEPLAN,
    {
      update(cache,  { data: { updatePlan } }) {
        let {workout} = cache.readQuery({
          query: WORKOUT,
          variables: {
            workoutId: workoutId,
          },
        });
        workout.name = updatePlan.name;
        workout.description = updatePlan.description;
        workout.duration = updatePlan.duration;
        cache.writeQuery({
          query: WORKOUT,
          variables: {
            workoutId: workoutId,
          },
          data: { workout: workout },
        });
      }
    }
  );

  const [clonePlan, { loading: clonePlanLoading, error: clonePlanError }] = useMutation(
    CLONEPLAN,
    {
      update(cache,  { data: {clonePlan} }) {
        const {id} = clonePlan;
        if( id > 0 ) {
          if( localStorage.getItem('assignToUser') ) {
            localStorage.removeItem('assignToUser');
            localStorage.setItem('openplan', id);
            goBack();
            goBack();
          } else {
            localStorage.setItem('openplan', id);
            if( clonePlan.public ) {
              goBack();
            } else {
              goToRoot();
              goToWorkouts();
            }
          }
        }

      }
    }
  );

  const [sendActivationMail, {
    loading: sendActivationMailLoading,
    error: sendActivationMailError
  }] = useMutation(
    SENDACTIVATIONMAIL,
    {
      update(cache,  { data: { sendActivationMail } }) {
        const {id} = sendActivationMail;
        if(id > 0) {
          window.localStorage.setItem('hideActivationWarning', 1);
          toggleSnackbar();
        }
      }
    }
  );


  React.useEffect(() => {
    if( data && data.workout && data.workout.member && data.workout.member.status === 0) {
      setSnackbarData({
        message: t("customer inactive"),
        action: <LanistaButton loading={sendActivationMailLoading} onClick={() => {
          sendActivationMail({
            variables: {
              memberId: data.workout.member.id,
            }
          });
        }}>{t("send activation")}</LanistaButton>
      });
    }
  }, []);

  React.useEffect(() => {
    const {workout} = data ? data : {}
    setWorkout(workout);
    if( workout && workout.splits && workout.splits.length == 1 && workout.splits[0].exercises.length == 0 ) {
      changeDefaultSettings();
    }
  }, [data]);

  const getCommandsRight = () =>  {
    let rightCommand = [];
    const assignToCustomerMode = localStorage.getItem('assignToUser') ? true : false;
    console.log("assignToCustomerMode", assignToCustomerMode)
    if( !assignToCustomerMode && ((workout && !workout.template) || (workout && me.id == workout.creator_id) )) {
      rightCommand.push(
        {
          icon: <Plus/>,
          name: 'add-exercises',
          text: t('add exercise'),
          onTap: () => {
            goToExercises(workout.id, activeSplitIndex+1, true);
          }
        },
      );
      rightCommand.push(
        {
          icon: <Settings/>,
          text: t("default values"),
          name: 'default-values',
          onTap: () => {
            toggleDefaultSettingsDrawer();
          }
        }
      );
    }
    !assignToCustomerMode && rightCommand.push(
      {
        icon: <Export/>,
        name: 'export-plan',
        text: t('export'),
        onTap: () => {
          toggleSharesDrawer();
        }
      }
    );
    if( !assignToCustomerMode &&  ((workout && !workout.template )|| (workout && me.id == workout.creator_id))) {
      rightCommand.push(
        {
          icon: <Edit/>,
          text: t('edit'),
          name: 'change-plan',
          onTap: () => {
            toggleOptionsDrawer();
          }
        }
      );
    }
    if( assignToCustomerMode ) {
      const {first_name, last_name, photoUrl} = memberData ? memberData.member : {};
      const icon = clonePlanLoading ? <CircularProgress style={{color: "black"}}/> : <Avatar alt={first_name + ' ' + last_name} src={photoUrl}/>;
      rightCommand.push(
        {
          icon: icon,
          text: t('assign-to-user'),
          name: 'assign-to-user',
          onTap: () => {
            console.log("assignToUser")
            console.log(localStorage.getItem('assignToUser'))
            if( localStorage.getItem('assignToUser') ) {
              clonePlan({
                variables: {
                  memberId: localStorage.getItem('assignToUser'),
                  planId: workoutId,
                }
              });
            }
          }
        }
      );
    }
    return rightCommand;
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
          localStorage.removeItem("hideActivationWarning");
          setActiveSplitIndex(0);
          goBack();
        }
    }]);

  }

  const revertChanges = () => {
    setWorkoutChanged(false)
    setWorkout(data.workout)
  }

  const saveSplit = (splitId) => {
    changeSplitOder({
      variables: {
        planId: workout.id,
        split: parseInt(splitId),
        newOrder: workout.splits[splitId-1].exercises.map(execution => parseInt(execution.id)),
      },
    })
  }

  const onDeleteExercise = (executionId) => {
    // 1. Search for the split
    let splitIndex = -1;
    let executionIndex = -1;
    workout.splits.map((split, index) => {
      let i = split.exercises.findIndex((execution => execution.id == executionId));
      if(i > -1) {
        executionIndex = i;
        splitIndex = index;
      }
    })
    if( splitIndex > -1 && executionIndex > -1) {
      workout.splits[splitIndex].exercises.splice(executionIndex, 1);
      setWorkout({...workout});
      saveSplit(splitIndex + 1);
    }
  }

  const onChangeExerciseOrder = (splitIndex, oldIndex, newIndex) => {
    if( oldIndex !== newIndex ) {
      workout.splits[splitIndex-1].exercises = arrayMove(workout.splits[splitIndex-1].exercises, oldIndex, newIndex)
      setWorkout({...workout});
      saveSplit(splitIndex);
    }
  }

  const showExercise = (exerciseId, memberId, planexerciseId) => {
    console.log("showExercise", exerciseId, memberId, planexerciseId);
    goToExercise(exerciseId, memberId, planexerciseId);
  }

  const saveWorkout = ({name, description, duration}) => {
    updatePlan({
      variables: {
        planId: workoutId,
        name: name,
        description: description,
        duration: duration,
      }
    })
  }

  const changeDefaultSettings = () => {
    toggleDefaultSettingsOpen();
  }

  const applyDefaultSettings = () => {
    toggleApplySettingsDialogOpen();
  }

  const changePlan = () => {
    toggleWorkoutEditOpen();
  }

  const onDeletePlan = () => {
    toggleDialogOpen();
  }

  const onPrintPlan = () => {
    togglePrintPanelOpen();
  }

  const printPlan = () => {
    generatePlanPdf({
      variables: {
        planId: workoutId,
        langauge: 'DE',
        printType: printType,
      }
    })
  }

  const onSendPlan = () => {
    sendPlan({
      variables: {
        planId: workoutId,
        langauge: 'DE',
        printType: printType,
      }
    })
  }

  const emailPlan = () => {
    toggleSendPanelOpen();
  }

  const assignPlan = () => {
    goToCustomers();
    /*
    Router.replace({
      pathname: '/customers',
      query: { workout: workoutId }
    });
    */
  }

  const createTemplate = () => {
    clonePlan({
      variables: {
        planId: workoutId,
      }
    });
  }

  const publishTemplate = () => {
    clonePlan({
      variables: {
        planId: workoutId,
        memberId: null,
        publicPlan: true,
      }
    });
  }

  const createSplit = () => {
    const {splits} = workout;
    splits.push({
      id: splits.length + 1,
      name: (splits.length + 1) + '',
      exercises: [],
    })
    setWorkout({...workout, splits});
  }

  const onDeleteSplit = () => {
    deleteSplit({
      variables: {
        planId: workoutId,
        split: activeSplitIndex + 1,
      }
    })
  }

  const onCopySplit = () => {
    duplicateSplit({
      variables: {
        planId: workoutId,
        split: activeSplitIndex + 1,
      }
    })
  }

  const onShiftSplitRight = () => {
    shiftSplitRight({
      variables: {
        planId: workoutId,
        split: activeSplitIndex + 1,
      }
    })
  }

  const onShiftSplitLeft = () => {
    shiftSplitLeft({
      variables: {
        planId: workoutId,
        split: activeSplitIndex + 1,
      }
    })
  }

  const onQRCodeClick = () => {

    toggleWorkoutChannelInfo();
  }

  console.log("workout", workout, me)

  return (
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight()}
      headerChildren={
        <>
          <WorkoutHeader
            title={workout ? workout.name : ''}
            subtitle={workout ? (t("duration") + ': ' +  workout.duration + ' ' + (workout.duration > 1 ? t("weeks") : t("week"))) : ''}
          />
          { workout && workout.member && (
            <CustomerSection>
              <TextBlock >
                <LastName >{workout.member.last_name}</LastName>
                <FirstName >{workout.member.first_name}</FirstName>
              </TextBlock>
              <ImageBlock editable={false} status={0}>
                <Foto style={{ backgroundImage: 'url(' + workout.member.photoUrl }} editable={false}/>
              </ImageBlock>
            </CustomerSection>
          )}
          { me.bu == 0 && workout && workout.template && workout.public && me.id == workout.creator_id && (
            <QrCodeSection>
              <QRCode
                value={"https://workout.lanista-training.com/" + workout.id}
                size={60}
                fgColor="#9bc93d"
                onClick={onQRCodeClick}
              />
            </QrCodeSection>
          )}
        </>
      }
      t={t}
      networkStatus={networkStatus}
      goToSetup={goToSetup}
    >
      <Workout
        workout={workout}
        loading={loading}
        error={error}
        t={t}
        onShowExercise={showExercise}
        onChangeExerciseOrder={onChangeExerciseOrder}
        onDeleteExercise={onDeleteExercise}
        defaultSettings={defaultSettings}
        setDefaultSettings={setDefaultSettings}
        editable={(!window.localStorage.getItem('assignToUser') && workout && !workout.template) || (!window.localStorage.getItem('assignToUser') && workout && me.id == workout.creator_id)}
        createSplit={createSplit}
        activeSplitIndex={activeSplitIndex}
        setActiveSplitIndex={setActiveSplitIndex}
        onDeleteSplit={onDeleteSplit}
        onCopySplit={onCopySplit}
        onShiftSplitRight={onShiftSplitRight}
        onShiftSplitLeft={onShiftSplitLeft}
        changePlan={changePlan}

      />


    <StyledDrawer anchor="right"
      open={defaultSettingsDrawerOpen}
      onClose={() => toggleDefaultSettingsDrawer()}
    >
      <div
        role="presentation"
        onClick={() => toggleDefaultSettingsDrawer()}
        onKeyDown={() => toggleDefaultSettingsDrawer()}
      >
        <List>
          <div className="list-item-wrapper">
            <ListItem button key="new-plan" onClick={changeDefaultSettings}>
              <ListItemText primary={t("change default values")} />
            </ListItem>
          </div>
          <div className="list-item-wrapper">
            <ListItem button key="new-plan-from-templates" onClick={applyDefaultSettings}>
              <ListItemText primary={t("apply default values")} />
            </ListItem>
          </div>
        </List>
      </div>
    </StyledDrawer>



    <StyledDrawer
      anchor="right"
      open={shareDrawerOpen}
      onClose={() => toggleSharesDrawer()}
    >
      <div
        role="presentation"
        onClick={() => toggleSharesDrawer()}
        onKeyDown={() => toggleSharesDrawer()}
      >
        <List>
          <div className="list-item-wrapper">
            <ListItem button key="new-plan" onClick={onPrintPlan}>
              <ListItemText primary={t("create pdf")} />
            </ListItem>
          </div>
          <div className="list-item-wrapper">
            <ListItem button key="new-plan-from-templates" onClick={emailPlan}>
              <ListItemText primary={t("send email")} />
            </ListItem>
          </div>
          <div className="list-item-wrapper">
            <ListItem button key="new-plan-from-templates" onClick={assignPlan}>
              <ListItemText primary={t("assign to another customer")} />
            </ListItem>
          </div>
          <div className="list-item-wrapper">
            <ListItem button key="new-plan-from-templates" onClick={createTemplate}>
              <ListItemText primary={t("save as my template")} />
            </ListItem>
          </div>
          { me.bu == 0 && workout && workout.template && !workout.public && me.id == workout.creator_id && (
            <div className="list-item-wrapper">
              <ListItem button key="publish-template" onClick={togglePublishPlan}>
                <ListItemText primary={t("publish")} />
              </ListItem>
            </div>
          )}

        </List>
      </div>
    </StyledDrawer>



    <StyledDrawer
      anchor="right"
      open={optionsDrawerOpen}
      onClose={() => toggleOptionsDrawer()}
    >
      <div
        role="presentation"
        onClick={() => toggleOptionsDrawer()}
        onKeyDown={() => toggleOptionsDrawer()}
      >
        <List>
          <div className="list-item-wrapper">
            <ListItem button key="new-plan" onClick={changePlan}>
              <ListItemText primary={t("change plan")} />
            </ListItem>
          </div>
          <div className="list-item-wrapper">
            <ListItem button key="new-plan-from-templates" onClick={onDeletePlan}>
              <ListItemText primary={t("delete plan")} />
            </ListItem>
          </div>
        </List>
      </div>
    </StyledDrawer>




    <Dialog
      open={dialogOpen}
      onClose={toggleDialogOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t("delete plan title")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t("delete plan question")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialogOpen} color="primary">
          {t("back")}
        </Button>
        <Button onClick={() => {
          deletePlan({
            variables: {
              planId: workoutId,
            }
          })
        }} color="primary" autoFocus>
          {t("delete")}
        </Button>
      </DialogActions>
    </Dialog>


    {defaultSettings &&
      <Dialog
        open={applySettingsDialogOpen}
        onClose={toggleApplySettingsDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("change plan")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="settings-dialog-description">
            {t("apply configuration question")}
          </DialogContentText>
          <DialogContentText id="settings-dialog">
            {defaultSettings.sets} {t("sets")} / {defaultSettings.execution} {defaultSettings.unit == 0 ? t("rep") : defaultSettings.unit == 1 ? t("sec") : t("min")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleApplySettingsDialogOpen} color="primary">
            {t("back")}
          </Button>
          <Button onClick={() => {
            console.log("Button click");
            applySettingsToPlan({
              variables: {
                planId: workoutId,
                sets: defaultSettings.sets,
                unit: defaultSettings.unit,
                execution: defaultSettings.execution,
              }
            })
            toggleApplySettingsDialogOpen();
          }} color="primary" autoFocus>
            {t("apply")}
          </Button>
        </DialogActions>
      </Dialog>
    }

    <Dialog
      open={publishPlan}
      onClose={togglePublishPlan}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t("publish plan")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="settings-dialog-description">
          {t("publish plan info")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={togglePublishPlan} color="primary">
          {t("back")}
        </Button>
        <Button onClick={() => {
          publishTemplate();
          togglePublishPlan();
        }} color="primary" autoFocus>
          {t("publish")}
        </Button>
      </DialogActions>
    </Dialog>



    { defaultSettings &&
      <DefaultSettingsPanel
        open={defaultSettingsOpen}
        onClose={toggleDefaultSettingsOpen}
        defaultSettings={defaultSettings}
        setDefaultSettings={setDefaultSettings}
      />
    }



    <WorkoutEditPanel
      t={t}
      open={workoutEditOpen}
      onClose={toggleWorkoutEditOpen}
      workout={workout}
      saveWorkout={saveWorkout}
      saveLoading={updateLoading}
      saveError={updateError}
    />

    {workout && (
      <ChannelInfoPanel
        t={t}
        open={workoutChannelInfoOpen}
        onClose={toggleWorkoutChannelInfo}
        workoutChanellUrl={"https://workout.lanista-training.com/" + workout.id}
      />
    )}

    <PrintPlanPanel
      open={printPanelOpen}
      onClose={togglePrintPanelOpen}
      printType={printType}
      setPrintType={setPrintType}
      onPrintPlan={printPlan}
      loading={generateplanpdfLoading}
      error={generateplanpdfError}
    />



    <SendPlanPanel
      open={sendPanelOpen}
      onClose={toggleSendPanelOpen}
      printType={printType}
      setPrintType={setPrintType}
      onSendPlan={onSendPlan}
      loading={sendplanLoading}
      error={sendplanfError}
    />



    <StyledSnackbar 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={openSnackbar && window.localStorage.getItem('hideActivationWarning') != 1}
      autoHideDuration={null}
      onClose={toggleSnackbar}
    >
      <MuiAlert onClose={toggleSnackbar} severity="warning" variant="filled" >
        {snackbarData.message}
        {snackbarData.action}
      </MuiAlert>
    </StyledSnackbar >


    </Scene>
  )
}

export default withApollo(Panel);
