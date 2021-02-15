import React, { Component, useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LanistaButton from '../../components/LanistaButton';
import { StyledCard, StyledKeyboardDatePicker } from './styles';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import black from "@material-ui/core/colors/grey";

const defaultMaterialTheme = createMuiTheme({
  shape: {
    borderRadius: 15,
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: black,
  },
});

console.log("BLACK", black)

export default ({

  id,

  email,
  setEmail,
  emailErrorMessage,

  firstName,
  firstNameErrorMessage,
  setFirstName,

  lastName,
  setLastName,
  lastNameErrorMessage,

  birthday,
  setBirthday,

  language,
  setLanguage,

  gender,
  setGender,

  note,
  setNote,

  readyToSave,
  loading,
  onSave,

}) => {
console.log("GENDER", gender)
  const {t} = useTranslate("profile");

  return (
    <div className="section personal-data" id="section-personal">
      <div className="section-header">{t( "personal_data" )}</div>
      <StyledCard>
        <id className="id-section"><span>{id}</span> {t("CUSTOMER_ID")}</id>
        <form className="section-content">
            <TextField
              id="email"
              error={emailErrorMessage !== null}
              helperText={emailErrorMessage}
              label={t('email')}
              type={'email'}
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={'email'}
            />
            <TextField
              id="first-name"
              error={firstNameErrorMessage !== null}
              helperText={firstNameErrorMessage}
              label={t('first_name')}
              type={'text'}
              disabled={loading}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={'first-name'}
            />
            <TextField
              id="last-name"
              error={lastNameErrorMessage != null}
              helperText={lastNameErrorMessage}
              label={t('last_name')}
              type={'text'}
              disabled={loading}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              defaultValue={'last-name'}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label={t("birthday")}
                  format="dd/MM/yyyy"
                  value={birthday}
                  onChange={setBirthday}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
            <FormControl>
              <InputLabel id="language">{t("language")}</InputLabel>
              <Select
                labelId="language"
                id="language-select"
                value={language ? language : ''}
                onChange={ (event) => setLanguage(event.target.value) }
              >
                <MenuItem value={'DE'}>Deutsch</MenuItem>
                <MenuItem value={'ES'}>Español</MenuItem>
                <MenuItem value={'EN'}>English</MenuItem>
                <MenuItem value={'PT'}>Português</MenuItem>
                <MenuItem value={'FR'}>Français</MenuItem>
                <MenuItem value={'RU'}>ру́сский</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="gender">{t("gender")}</InputLabel>
              <Select
                labelId="gender"
                id="gender-select"
                value={ gender !== undefined ? parseInt(gender) : 1}
                onChange={ (event) => setGender(event.target.value) }
              >
                <MenuItem value={1}>{t("female")}</MenuItem>
                <MenuItem value={0}>{t("male")}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="note"
              label={t('note')}
              type={'text'}
              disabled={loading}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              defaultValue={'note'}
            />
        </form>
        <LanistaButton
          className="save-personal-data-button"
          onClick={onSave}
          disabled={!readyToSave}
          loading={loading}
          inverted={readyToSave}
        >
          {t( "save" )}
        </LanistaButton>
      </StyledCard>
    </div>
  )
}
