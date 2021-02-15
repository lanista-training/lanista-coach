import React, { Component, useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../../components/LanistaButton';
import { StyledCard, ColloredCardInput, FormHeader, FormInput } from './styles';


export default ({

  status,
  dataPrivacySigned,


  onShowDataPrivaryStatus,
  onShowMemberStatus,

}) => {

  console.log("status", status)

  const {t} = useTranslate("profile");

  return (
    <div className="section status-section" id="section-status">
      <div className="section-header">{t( "CUSTOMER_STATUS" )}</div>
      <StyledCard>
        <div className="section-content">
          <div className="status-item-section">
            <div className="form-header">{t( "DATA_PRIVACY" )}</div>
            <Button variant="contained" color="primary" disableElevation className={dataPrivacySigned == 1 ? "green" : "yellow"} onClick={onShowDataPrivaryStatus}>
              {dataPrivacySigned == 1 ? t('DATA_PRIVACY_YES') : t('DATA_PRIVACY_NO')}
            </Button>
          </div>

          <div className="status-item-section">
            <div className="form-header">{t( "ACCOUNT_STATUS" )}</div>
            <Button variant="contained" color="primary" disableElevation className={status == 1 ? "green" : status == 0 ? "yellow" : "red"} onClick={onShowMemberStatus}>
              {status == 1 ? t('ACCOUNT_ACTIVE') : status == 0 ? t('ACCOUNT_INACTIVE') : t('EMAIL_INVALID')}
            </Button>
          </div>


        </div>
      </StyledCard>
    </div>
  )
}
