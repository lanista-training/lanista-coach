/* eslint import/no-webpack-loader-syntax: off */
import React, { Component, useState, useEffect } from 'react';
import moment from "moment";
import cookie from 'js-cookie';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ImageEditor from '../../components/ImageEditor';
import LanistaButton from '../../components/LanistaButton';
import CardIcon from '-!react-svg-loader!../../images/icons/card.svg';
import { StyledCard } from './styles';

export default ({

  t,
  expirationDate,

  goToShop,
  onRefreshLicenceStatus,

}) => {

  return (
    <div className="section profile-licence-section" id="section-3">
      <div className="section-header">{t( "setup:licence_data" )}</div>
      <StyledCard className="card-section">
        <div className="section-content">
          <div className={ (moment(expirationDate) >= new Date()) ? "licence-section valid" :  "licence-section invalid"  } >
            <CardIcon style={{height: '5em', width: '5em', padding: '1em'}}/>
            <div className="licence-info-section">
              <div className="licence-valid-state">
                { (moment(expirationDate) > (new Date()) ? t( "setup:licence_valid" ) :  t( "setup:licence_invalid" ))  }
              </div>
              <div className="licence-valid-date">
                { (new Date() ? t( "setup:invalid_since" ) :  t( "setup:valid_until" )) + " " + moment(expirationDate).format('Do MMMM YYYY') }
              </div>
              <LanistaButton onClick={goToShop}>
                {t( "common:buy_licence" )}
              </LanistaButton>
              <LanistaButton onClick={onRefreshLicenceStatus}>
                {t( "refresh_licence_status" )}
              </LanistaButton>
            </div>
          </div>
        </div>
      </StyledCard>
    </div>
  )
}
