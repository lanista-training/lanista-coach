import React, { Component, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LanistaButton from '../../components/LanistaButton';
import { StyledCard } from './styles';

export default ({
  t,

  bu,

  readyToSaveAddress,
  onUpdateUserAddress,
  updateUserAddressLoading,

  companyName,
  setCompanyName,
  phoneNumber,
  setPhoneNumber,
  website,
  setWebsite,
  country,
  setCountry,
  city,
  setCity,
  zipcode,
  setZipcode,
  street,
  setStreet,

}) => {

  return (
    <div className="section profile-address-section" id="section-4">
      <div className="section-header">{t( "my_address" )}</div>
      <StyledCard>
        <div className="section-content">
            <TextField
              id="company_name"
              label={t('company_name')}
              type={'text'}
              disabled={updateUserAddressLoading || bu > 0}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              id="phone_number"
              label={t('phone_number')}
              type={'text'}
              disabled={updateUserAddressLoading || bu > 0}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              id="website"
              label={t('website')}
              type={'text'}
              disabled={updateUserAddressLoading || bu > 0}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <TextField
              id="country"
              label={t('country')}
              type={'text'}
              disabled={updateUserAddressLoading || bu > 0}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              id="zipcode"
              label={t('zip_code')}
              type={'text'}
              disabled={updateUserAddressLoading || bu > 0}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <TextField
              id="zipcode"
              label={t('zipcode')}
              type={'text'}
              disabled={updateUserAddressLoading || bu > 0}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <TextField
              id="street"
              label={t('street')}
              type={'text'}
              disabled={updateUserAddressLoading || bu > 0}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <TextField
              id="city"
              label={t('city')}
              type={'text'}
              disabled={updateUserAddressLoading || bu > 0}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
        </div>
        <LanistaButton
          className="address-data-button"
          onClick={onUpdateUserAddress}
          disabled={!readyToSaveAddress}
          loading={updateUserAddressLoading}
          inverted={readyToSaveAddress}
        >
          {t( "common:save" )}
        </LanistaButton>
      </StyledCard>
    </div>
  )
}
