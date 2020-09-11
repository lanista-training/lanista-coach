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
  const [armRight, setArmRight] = useState(null);
  const [armLeft, setArmLeft] = useState(null);
  const [waist, setWaist] = useState(null);
  const [umbilical, setUmbilical] = useState(null);
  const [chest, setChest] = useState(null);
  const [spinaIlicaAnt, setSpinaIlicaAnt] = useState(null);
  const [wideHips, setWideHips] = useState(null);
  const [quadsRight, setQuadsRight] = useState(null);
  const [quadsLeft, setQuadsLeft] = useState(null);

  const [savingData, setSavingData] = useState(false);
  const [transactionSuccessfull, setTransactionSuccessfull] = useState(false);
  useEffect(()=> {
    if(!loading && savingData) {
      setSavingData(false);
      setTransactionSuccessfull(true);
    }
  }, [loading]);


  console.log(lastRecord)

  const onSaveClick = () => {
    // prepare data
    setSavingData(true);
    const values = [];
    armRight && armRight > 0 && values.push({
      type: 'M_ARMRIGHT',
      value: isNaN(armRight) ? null : parseFloat(armRight),
    });
    armLeft && armLeft > 0 && values.push({
      type: 'M_ARMLEFT',
      value: isNaN(armLeft) ? null : parseFloat(armLeft),
    });
    waist && waist > 0 && values.push({
      type: 'M_WAIST',
      value: isNaN(waist) ? null : parseFloat(waist),
    });
    umbilical && umbilical > 0 && values.push({
      type: 'M_UMBILICAL',
      value: isNaN(umbilical) ? null : parseFloat(umbilical),
    });
    chest && chest > 0 && values.push({
      type: 'M_CHEST',
      value: isNaN(chest) ? null : parseFloat(chest),
    });
    spinaIlicaAnt && spinaIlicaAnt > 0 && values.push({
      type: 'M_SPINALILICANANT',
      value: isNaN(spinaIlicaAnt) ? null : parseFloat(spinaIlicaAnt),
    });
    wideHips && wideHips > 0 && values.push({
      type: 'M_WIDEHIPS',
      value: isNaN(wideHips) ? null : parseFloat(wideHips),
    });
    quadsRight && quadsRight > 0 && values.push({
      type: 'M_QUADSRIGHT',
      value: isNaN(quadsRight) ? null : parseFloat(quadsRight),
    });
    quadsLeft && quadsLeft > 0 && values.push({
      type: 'M_QUADSLEFT',
      value: isNaN(quadsLeft) ? null : parseFloat(quadsLeft),
    });
    onSave(date, values, note);
  }

  const onDeleteClick = () => {
    // prepare data
    setSavingData(true);
    const values = [];
    values.push({
      type: 'M_ARMRIGHT',
      value: null,
    });
    values.push({
      type: 'M_ARMLEFT',
      value: null,
    });
    values.push({
      type: 'M_WAIST',
      value: null,
    });
    values.push({
      type: 'M_UMBILICAL',
      value: null,
    });
    values.push({
      type: 'M_CHEST',
      value: null,
    });
    values.push({
      type: 'M_SPINALILICANANT',
      value: null,
    });
    values.push({
      type: 'M_WIDEHIPS',
      value: null,
    });
    values.push({
      type: 'M_QUADSRIGHT',
      value: null,
    });
    values.push({
      type: 'M_QUADSLEFT',
      value: null,
    });
    onSave(date, values, note);
  }

  useEffect(() => {
    if( lastRecord ) {
      const {arm_right, arm_left, waist, umbilical, chest, spina_ilica_ant, wide_hips, quads_right, quads_left, note, target_date} = lastRecord;

      arm_right > 0 && setArmRight(arm_right);
      arm_left > 0 && setArmLeft(arm_left);
      waist > 0 && setWaist(waist);
      umbilical > 0 && setUmbilical(umbilical);
      chest > 0 && setChest(chest);
      spina_ilica_ant > 0 && setSpinaIlicaAnt(spina_ilica_ant);
      wide_hips > 0 && setWideHips(wide_hips);
      quads_right > 0 && setQuadsRight(quads_right);
      quads_left > 0 && setQuadsLeft(quads_left);

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
        label={t("armRight")}
        id="armRight-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={armRight}
        onChange={(e) => setArmRight(e.target.value)}
        variant="outlined"
        type="number"
        autocomplete="off"
        disabled={loading}
      />
      <TextField
        label={t("armLeft")}
        id="armLeft-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={armLeft}
        onChange={(e) => setArmLeft(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("waist")}
        id="waist-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={waist}
        onChange={(e) => setWaist(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("umbilical")}
        id="umbilical-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={umbilical}
        onChange={(e) => setUmbilical(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("chest")}
        id="chest-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={chest}
        onChange={(e) => setChest(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("spinaIlicaAnt")}
        id="spinaIlicaAnt-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={spinaIlicaAnt}
        onChange={(e) => setSpinaIlicaAnt(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("wideHips")}
        id="wideHips-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={wideHips}
        onChange={(e) => setWideHips(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("quadsRight")}
        id="quadsRight-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={quadsRight}
        onChange={(e) => setQuadsRight(e.target.value)}
        variant="outlined"
        type="number"
        disabled={loading}
      />
      <TextField
        label={t("quadsLeft")}
        id="quadsLeft-field"
        InputProps={{
          endAdornment: <InputAdornment position="start">cm</InputAdornment>,
        }}
        value={quadsLeft}
        onChange={(e) => setQuadsLeft(e.target.value)}
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
