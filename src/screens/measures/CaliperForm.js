import React, { useEffect, useState } from 'react';
import Form from '../../components/LanistaForm';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  const [note, setNote] = useState(null);
  const [abs, setAbs] = useState(null);
  const [auxiliar, setAuxiliar] = useState(null);
  const [chest, setChest] = useState(null);
  const [quads, setQuads] = useState(null);
  const [scapula, setScapula] = useState(null);
  const [sprailium, setSprailium] = useState(null);
  const [trizeps, setTrizeps] = useState(null);

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
    abs && abs > 0 && values.push({
      type: 'ABS',
      value: isNaN(abs) ? null : parseFloat(abs),
    });
    auxiliar && auxiliar > 0 && values.push({
      type: 'AUXILIAR',
      value: isNaN(auxiliar) ? null : parseFloat(auxiliar),
    });
    chest && chest > 0 && values.push({
      type: 'CHEST',
      value: isNaN(chest) ? null : parseFloat(chest),
    });
    quads && quads > 0 && values.push({
      type: 'QUADS',
      value: isNaN(quads) ? null : parseFloat(quads),
    });
    scapula && scapula > 0 && values.push({
      type: 'SCAPULA',
      value: isNaN(scapula) ? null : parseFloat(scapula),
    });
    sprailium && sprailium > 0 && values.push({
      type: 'SPRAILIUM',
      value: isNaN(sprailium) ? null : parseFloat(sprailium),
    });
    trizeps && trizeps > 0 && values.push({
      type: 'TRIZEPS',
      value: isNaN(trizeps) ? null : parseFloat(trizeps),
    });
    onSave(date, values, note);
  }

  const onDeleteClick = () => {
    // prepare data
    setSavingData(true);
    const values = [];
    abs && abs > 0 && values.push({
      type: 'ABS',
      value: null,
    });
    auxiliar && auxiliar > 0 && values.push({
      type: 'AUXILIAR',
      value: null,
    });
    chest && chest > 0 && values.push({
      type: 'CHEST',
      value: null,
    });
    quads && quads > 0 && values.push({
      type: 'QUADS',
      value: null,
    });
    scapula && scapula > 0 && values.push({
      type: 'SCAPULA',
      value: null,
    });
    sprailium && sprailium > 0 && values.push({
      type: 'SPRAILIUM',
      value: null,
    });
    trizeps && trizeps > 0 && values.push({
      type: 'TRIZEPS',
      value: null,
    });
    onSave(date, values);
  }

  useEffect(() => {
    if( lastRecord ) {
      const {abs, auxiliar, chest, quads, scapula, sprailium, trizeps, note, target_date} = lastRecord;

      abs > 0 && setAbs(abs);
      auxiliar > 0 && setAuxiliar(auxiliar);
      chest > 0 && setChest(chest);
      quads > 0 && setQuads(quads);
      scapula > 0 && setScapula(scapula);
      sprailium > 0 && setSprailium(sprailium);
      trizeps > 0 && setTrizeps(trizeps);

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
        label={t("abs")}
        id="abs-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">mm</InputAdornment>,
        }}
        value={abs}
        onChange={(e) => setAbs(e.target.value)}
        variant="outlined"
        type="number"
        autocomplete="off"
        disabled={loading}
      />
      <TextField
        label={t("auxiliar")}
        id="auxiliar-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">mm</InputAdornment>,
        }}
        value={auxiliar}
        onChange={(e) => setAuxiliar(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("chest")}
        id="chest-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">mm</InputAdornment>,
        }}
        value={chest}
        onChange={(e) => setChest(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("quads")}
        id="quads-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">mm</InputAdornment>,
        }}
        value={quads}
        onChange={(e) => setQuads(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("scapula")}
        id="scapula-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">mm</InputAdornment>,
        }}
        value={scapula}
        onChange={(e) => setScapula(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("sprailium")}
        id="sprailium-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">mm</InputAdornment>,
        }}
        value={sprailium}
        onChange={(e) => setSprailium(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("trizeps")}
        id="trizeps-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">mm</InputAdornment>,
        }}
        value={trizeps}
        onChange={(e) => setTrizeps(e.target.value)}
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
