import React, { Component, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LanistaButton from '../../components/LanistaButton';
import { StyledCard } from './styles';;

export default ({
  t,
  bu,

  readyToSavePersonalData,
  onUpdatePersonalData,
  updateUserPersonalDataLoading,

  email,
  setEmail,
  emailErrorMessage,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  language,
  setLanguage,

}) => {

  return (
    <div className="section personal-data" id="section-1">
      <div className="section-header">{t( "setup:personal_data" )}</div>
      <StyledCard>
        <div className="section-content">
            <TextField
              id="email"
              error={emailErrorMessage !== null}
              helperText={emailErrorMessage}
              label={t('email')}
              type={'email'}
              disabled={updateUserPersonalDataLoading || bu > 0}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="first-name"
              label={t('first_name')}
              type={'text'}
              disabled={updateUserPersonalDataLoading || bu > 0}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              id="last-name"
              label={t('last_name')}
              type={'text'}
              disabled={updateUserPersonalDataLoading || bu > 0}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormControl>
              <InputLabel id="language">{t("language")}</InputLabel>
              <Select
                labelId="language"
                id="language-select"
                value={language}
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
        </div>
        <LanistaButton
          className="save-personal-data-button"
          onClick={onUpdatePersonalData}
          disabled={!readyToSavePersonalData}
          loading={updateUserPersonalDataLoading}
          inverted={readyToSavePersonalData}
        >
          {t( "common:save" )}
        </LanistaButton>
      </StyledCard>
    </div>
  )
}
