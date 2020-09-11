import React, { useEffect, useState } from 'react';
import Form from '../../components/LanistaForm';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DialogActions from '@material-ui/core/DialogActions';
import Button from "../../components/LanistaButton";

export default ({
  t,
  lastRecord,
  onClose,

  onSave,
  onDeleteValues,
  loading,
  error,
}) => {
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [note, setNote] = useState(null);
  const [fat, setFat] = useState(null);

  const [fatMass, setFatMass] = useState(null);
  const [muscleMass, setMuscleMass] = useState(null);
  const [visceralFat, setVisceralFat] = useState(null);
  const [fatFreeMass, setFatFreeMass] = useState(null);
  const [bodyWater, setBodyWater] = useState(null);

  const [savingData, setSavingData] = useState(false);
  const [transactionSuccessfull, setTransactionSuccessfull] = useState(false);
  useEffect(()=> {
    if(!loading && savingData) {
      setSavingData(false);
      setTransactionSuccessfull(true);
      //onClose();
    }
  }, [loading]);


  console.log(lastRecord)

  const onSaveClick = () => {
    // prepare data
    setSavingData(true);
    const values = [];
    weight && weight > 0 && values.push({
      type: 'WEIGHT',
      value: isNaN(weight) ? null : parseFloat(weight),
    });
    height && height > 0 && values.push({
      type: 'HEIGHT',
      value: isNaN(height) ? null : parseFloat(height),
    });
    fat && fat > 0 && values.push({
      type: 'FAT',
      value: isNaN(fat) ? null : parseFloat(fat),
    });
    fatMass && fatMass > 0 && values.push({
      type: 'FATMASS',
      value: isNaN(fatMass) ? null : parseFloat(fatMass),
    });
    muscleMass && muscleMass > 0 && values.push({
      type: 'MUSCLEMASS',
      value: isNaN(muscleMass) ? null : parseFloat(muscleMass),
    });
    visceralFat && visceralFat > 0 && values.push({
      type: 'VISCERALFAT',
      value: isNaN(visceralFat) ? null : parseFloat(visceralFat),
    });
    fatFreeMass && fatFreeMass > 0 && values.push({
      type: 'FATFREEMASS',
      value: isNaN(fatFreeMass) ? null : parseFloat(fatFreeMass),
    });
    values.push({
      type: 'BODYWATER',
      value: isNaN(bodyWater) ? null : parseFloat(bodyWater),
    });
    onSave(date, values, note);
  }

  const onDeleteClick = () => {
    // prepare data
    setSavingData(true);
    const values = [];
    weight && weight > 0 && values.push({
      type: 'WEIGHT',
      value: null,
    });
    height && height > 0 && values.push({
      type: 'HEIGHT',
      value: null,
    });
    fat && fat > 0 && values.push({
      type: 'FAT',
      value: null,
    });
    fatMass && fatMass > 0 && values.push({
      type: 'FATMASS',
      value: null,
    });
    muscleMass && muscleMass > 0 && values.push({
      type: 'MUSCLEMASS',
      value: null,
    });
    visceralFat && visceralFat > 0 && values.push({
      type: 'VISCERALFAT',
      value: null,
    });
    fatFreeMass && fatFreeMass > 0 && values.push({
      type: 'FATFREEMASS',
      value: null,
    });
    values.push({
      type: 'BODYWATER',
      value: null,
    });
    onSave(date, values);
  }

  useEffect(() => {
    if( lastRecord ) {
      const {height, futrex, weight, note, fatmass, musclemass, visceralfat, fatfreemass, bodywater, target_date} = lastRecord;

      weight > 0 && setWeight(weight);
      height > 0 && setHeight(height);
      futrex > 0 && setFat(futrex);

      fatmass > 0 && setFatMass(futrex);
      musclemass > 0 && setMuscleMass(musclemass);
      visceralfat > 0 && setVisceralFat(visceralfat);
      fatfreemass > 0 && setFatFreeMass(fatfreemass);
      bodywater > 0 && setBodyWater(bodywater);

      target_date && setDate(new Date(target_date));
      note && setNote(note);
    }
  }, [lastRecord]);

  return <Form>
    {!transactionSuccessfull &&
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-field"
          label={t("date")}
          value={date}
          onChange={(newDate) => setDate(newDate)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          autoOk={true}
          disabled={loading}
        />
      </MuiPickersUtilsProvider>
      <TextField
        label={t("weight")}
        id="weight-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">Kg</InputAdornment>,
        }}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        variant="outlined"
        type="number"
        autocomplete="off"
        disabled={loading}
      />
      <TextField
        label={t("height")}
        id="size-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("body fat")}
        id="fat-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
        value={fat}
        onChange={(e) => setFat(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("notes")}
        id="notes-field"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        variant="outlined"
        type="text"
        multiline
        rowsMax={2}
        disabled={loading}
      />

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {t("further values")}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TextField
            label={t("fatmass")}
            id="fat-field"
            InputProps={{
              endAdornment: <InputAdornment position="start">Kg</InputAdornment>,
            }}
            value={fatMass}
            onChange={(e) => setFatMass(e.target.value)}
            variant="outlined"
            type="number"
            disabled={loading}
          />
          <TextField
            label={t("fatfreemass")}
            id="fat-field"
            InputProps={{
              endAdornment: <InputAdornment position="start">Kg</InputAdornment>,
            }}
            value={fatFreeMass}
            onChange={(e) => setFatFreeMass(e.target.value)}
            variant="outlined"
            type="number"
            disabled={loading}
          />
          <TextField
            label={t("musclemass")}
            id="fat-field"
            InputProps={{
              endAdornment: <InputAdornment position="start">Kg</InputAdornment>,
            }}
            value={muscleMass}
            onChange={(e) => setMuscleMass(e.target.value)}
            variant="outlined"
            type="number"
            disabled={loading}
          />
          <TextField
            label={t("visceralfat")}
            id="fat-field"
            InputProps={{
              endAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            value={visceralFat}
            onChange={(e) => setVisceralFat(e.target.value)}
            variant="outlined"
            type="number"
            disabled={loading}
          />
          <TextField
            label={t("bodywater")}
            id="fat-field"
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            value={bodyWater}
            onChange={(e) => setBodyWater(e.target.value)}
            variant="outlined"
            type="number"
            disabled={loading}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
    }

    {
      transactionSuccessfull &&
      <div className="successfull-message">
        {t("successfull-message")}
      </div>
    }

    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus inverted={transactionSuccessfull}>
        {transactionSuccessfull ? t("BACK") : t("CANCEL")}
      </Button>
      {
        lastRecord && lastRecord.target_date !== null && !transactionSuccessfull &&
        <Button onClick={onDeleteClick} color="primary" loading={loading}>
          {t("DELETE")}
        </Button>
      }
      {
        !transactionSuccessfull &&
        <Button onClick={onSaveClick} color="primary" inverted loading={loading}>
          {t("SAVE")}
        </Button>
      }
    </DialogActions>
  </Form>
}
