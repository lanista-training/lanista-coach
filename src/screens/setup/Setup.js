/* eslint import/no-webpack-loader-syntax: off */
import React, { Component, useState, useEffect } from 'react';
import PasswordCard from './PasswordCard';
import PersonalDataCard from './PersonalDataCard';
import AddressCard from './AddressCard';
import ImageCard from './ImageCard';
import LicenceCard from './LicenceCard';
import DataProtectionCard from './DataProtectionCard';
import AppConfigurationCard from './AppConfigurationCard';
import WorkoutChannelCard from './WorkoutChannelCard';

import ContactMailIcon from '@material-ui/icons/ContactMail';
import PhotoIcon from '@material-ui/icons/Photo';
import PaymentIcon from '@material-ui/icons/Payment';
import BusinessIcon from '@material-ui/icons/Business';
import SecurityIcon from '@material-ui/icons/Security';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import YouTubeIcon from '@material-ui/icons/YouTube';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import {
  Stage,
  StageCentered,
  CenteredButton,
  StyledHeader,
  StyledHeaderCentered,
  FormHeader,
  FormInput,
  CardSection,
  FixedSection,
  CardHeader,
  StyledCard,
  CardInput,
  CardCheckbox,
  CardDropdown,
  CardButton,
  StyledNavigationCard,
  ImageSegment,
  ToolsList,
  ListIcon,
  StyledLabel,
  LicenceField
} from './styles';
import moment from "moment";

import Select from 'react-select';
import Scrollspy from 'react-scrollspy';
import CardIcon from '-!react-svg-loader!../../images/icons/card.svg';
import countryList from 'country-list';

const countries = countryList.getData().map(country => ({
  key: country.code,
  text: country.name,
  value: country.code,
  flag: country.code.toLowerCase()
}))

const Setup = ({
  t,
  bu,
  id,
  userData,
  refetch,

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

  photoUrl,
  photoUrlFullSize,

  expirationDate,

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

  bannerLink,
  setBannerLink,
  bannerPhotoUrl,
  onUpdateUserBannerLink,
  updateUserBannerLinkLoading,
  readyToSaveBannerLink,

  readyToSaveWorkout,
  workoutEnable,
  setWorkoutEnable,
  facebook,
  setFacebook,
  googleplus,
  setGoogleplus,
  twitter,
  setTwitter,
  promoVideo,
  setPromoVideo,
  promoText,
  setPromoText,
  workoutImageUrl,
  onUpdateUserWorkoutChannelData,
  updateUserWorkoutChannelDataLoading,

  dataPrivacyPolicy,

  role,

  handleChange,

  passwordOld,
  passwordNew,
  passwordConfirmation,
  passwordOldErrorMessage,
  passwordNewErrorMessage,
  passwordConfirmationErrorMessage,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmationPasswordChange,
  onVerifyPassword,
  onChangePassword,
  passwordConfirmed,
  passwordChanged,
  verifyPasswordLoading,
  changePasswordLoading,
  endProcess,

  goToShop,
  onRefreshLicenceStatus,
}) => {

  return(
    <Stage centered columns={2} padded>
      <div className="data-section">
        <PersonalDataCard
          t={t}
          bu={bu}

          readyToSavePersonalData={readyToSavePersonalData}
          onUpdatePersonalData={onUpdatePersonalData}
          updateUserPersonalDataLoading={updateUserPersonalDataLoading}

          email={email}
          setEmail={setEmail}
          emailErrorMessage={emailErrorMessage}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          language={language}
          setLanguage={setLanguage}
        />

        {bu == 0 &&
        <>
          <ImageCard
            t={t}
            id={id}
            photoUrl={photoUrl}
            photoUrlFullSize={photoUrl}
            refetch={refetch}
          />

          <LicenceCard
            t={t}
            expirationDate={expirationDate}

            goToShop={goToShop}
            onRefreshLicenceStatus={onRefreshLicenceStatus}
          />

          <AddressCard
            t={t}

            bu={bu}

            readyToSaveAddress={readyToSaveAddress}
            onUpdateUserAddress={onUpdateUserAddress}
            updateUserAddressLoading={updateUserAddressLoading}

            companyName={companyName}
            setCompanyName={setCompanyName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            website={website}
            setWebsite={setWebsite}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            zipcode={zipcode}
            setZipcode={setZipcode}
            street={street}
            setStreet={setStreet}
          />

          <DataProtectionCard
            t={t}
          />

          <AppConfigurationCard
            t={t}

            id={id}

            bannerLink={bannerLink}
            setBannerLink={setBannerLink}
            bannerPhotoUrl={bannerPhotoUrl}

            onUpdateUserBannerLink={onUpdateUserBannerLink}
            updateUserBannerLinkLoading={updateUserBannerLinkLoading}

            readyToSaveBannerLink={readyToSaveBannerLink}

            refetch={refetch}
          />

          <WorkoutChannelCard
            t={t}

            id={id}

            workoutEnable={workoutEnable}
            setWorkoutEnable={setWorkoutEnable}
            facebook={facebook}
            setFacebook={setFacebook}
            googleplus={googleplus}
            setGoogleplus={setGoogleplus}
            twitter={twitter}
            setTwitter={setTwitter}
            promoVideo={promoVideo}
            setPromoVideo={setPromoVideo}
            promoText={promoText}
            setPromoText={setPromoText}
            workoutImageUrl={workoutImageUrl}
            onUpdateUserWorkoutChannelData={onUpdateUserWorkoutChannelData}
            updateUserWorkoutChannelDataLoading={updateUserWorkoutChannelDataLoading}
            readyToSaveWorkout={readyToSaveWorkout}

            refetch={refetch}
          />
        </>
        }

        <PasswordCard
          t={t}

          passwordOld={passwordOld}
          passwordNew={passwordNew}
          passwordConfirmation={passwordConfirmation}
          passwordOldErrorMessage={passwordOldErrorMessage}
          passwordNewErrorMessage={passwordNewErrorMessage}
          passwordConfirmationErrorMessage={passwordConfirmationErrorMessage}
          onOldPasswordChange={onOldPasswordChange}
          onNewPasswordChange={onNewPasswordChange}
          onConfirmationPasswordChange={onConfirmationPasswordChange}
          onVerifyPassword={onVerifyPassword}
          onChangePassword={onChangePassword}
          passwordConfirmed={passwordConfirmed}
          passwordChanged={passwordChanged}
          verifyPasswordLoading={verifyPasswordLoading}
          changePasswordLoading={changePasswordLoading}
          endProcess={endProcess}
        />
      </div>
      <div className="navigation-section">
        <FixedSection>
          <StyledNavigationCard className="tools-card">
            <Scrollspy
              items={ ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7'] }
              currentClassName="is-current"
            >
              <ToolsList>
                <div className="list-item">
                  <a href="#section-1" style={{display: 'flex'}}>
                    <ContactMailIcon/>
                    <div className="list-item-content">
                      <div className="list-header">{t( "setup:personal_data" )}</div>
                    </div>
                  </a>
                </div>
                {bu == 0 &&
                  <>
                    <div className="list-item">
                      <a href="#section-2" style={{display: 'flex'}}>
                        <PhotoIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "setup:profile_picture" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-3" style={{display: 'flex'}}>
                        <PaymentIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "setup:licence_data" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-4" style={{display: 'flex'}}>
                        <BusinessIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "setup:my_address" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-5" style={{display: 'flex'}}>
                        <SecurityIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "setup:data_protection" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-6" style={{display: 'flex'}}>
                        <PhoneIphoneIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "setup:app_banner" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-7" style={{display: 'flex'}}>
                        <YouTubeIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "setup:workout_channel" )}</div>
                        </div>
                      </a>
                    </div>
                  </>
                }
                <div className="list-item">
                  <a href="#section-8" style={{display: 'flex'}}>
                    <VpnKeyIcon/>
                    <div className="list-item-content">
                      <div className="list-header">{t( "setup:password_reset" )}</div>
                    </div>
                  </a>
                </div>
              </ToolsList>
            </Scrollspy>
          </StyledNavigationCard>
        </FixedSection>
      </div>
    </Stage>
  )
};

export default Setup;
