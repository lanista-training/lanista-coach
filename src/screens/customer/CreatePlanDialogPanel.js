import React, { Component } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '../../components/LanistaButton';

import {StyledDialog} from './styles';

const getDurationSelectOptions = (t) => {
  const result = [];

  result.push(<MenuItem value={0}>{t('NO DURATION')}</MenuItem>);
  result.push(<MenuItem value={1}>{1} {t('WEEK')}</MenuItem>);
  for( var i = 2; i < 100; i++) {
    result.push(<MenuItem value={i}>{i} {t('WEEKS')}</MenuItem>);
  }

  return result;
}

export default ({t, handleCloseDialogCreatePlan, creatingPlan, createPlan, memberId, open=false}) => {

  const [initialPlanName, setInitialPlanName] = React.useState('Mein Trainingsplan');
  const [duration, setDuration] = React.useState(12);

  return (<StyledDialog
    onClose={handleCloseDialogCreatePlan}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    open={open}
  >
    <DialogTitle id="alert-dialog-title">{!creatingPlan && "Neuer Trainingsplan"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <div>
          {!creatingPlan &&
            <>
              <TextField
                autoFocus
                margin="dense"
                id="plan-name"
                fullWidth
                value={initialPlanName}
                label={t("PLAN NAME")}
                onChange={(event) => {
                  setInitialPlanName(event.target.value);
                }}
              />
            <FormControl className="plan-duration-select-field">
                <InputLabel id="demo-simple-select-label">{t("DURATION")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                >
                  {getDurationSelectOptions(t)}
                </Select>
              </FormControl>
            </>
          }
          {
            creatingPlan &&
            <CircularProgress size={100}/>
          }
        </div>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {!creatingPlan &&
        <>
          <Button onClick={handleCloseDialogCreatePlan} color="primary">
            {t("back")}
          </Button>
          <Button inverted onClick={() => {
              createPlan({
                variables: {
                  name: initialPlanName,
                  memberId: memberId,
                  duration: duration,
                }
              })
            }} color="primary" autoFocus>
            OK
          </Button>
        </>
      }
    </DialogActions>
  </StyledDialog>)
}
