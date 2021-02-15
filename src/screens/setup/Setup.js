/* eslint import/no-webpack-loader-syntax: off */
import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PasswordCard from './PasswordCard';
import PersonalDataCard from './PersonalDataCard';
import AddressCard from './AddressCard';
import ImageCard from './ImageCard';
import LogoCard from './LogoCard';
import LicenceCard from './LicenceCard';
import DataProtectionCard from './DataProtectionCard';
import AppConfigurationCard from './AppConfigurationCard';
import WorkoutChannelCard from './WorkoutChannelCard';
import Shop from './Shop';

import ContactMailIcon from '@material-ui/icons/ContactMail';
import PhotoIcon from '@material-ui/icons/Photo';
import PaymentIcon from '@material-ui/icons/Payment';
import BusinessIcon from '@material-ui/icons/Business';
import SecurityIcon from '@material-ui/icons/Security';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import YouTubeIcon from '@material-ui/icons/YouTube';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Drawer from '@material-ui/core/Drawer';

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

  logoUrl,
  logoUrlFullSize,

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
  workoutChannelUrl,

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

  tariffData,
  getTariff,
  getTariffLoading,
  getTariffError,
}) => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

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

          <LogoCard
            t={t}
            id={id}
            photoUrl={logoUrl}
            photoUrlFullSize={logoUrl}
            refetch={refetch}
          />

          <ImageCard
            t={t}
            id={id}
            photoUrl={photoUrl}
            photoUrlFullSize={photoUrlFullSize}
            refetch={refetch}
          />

          <LicenceCard
            t={t}
            expirationDate={expirationDate}

            goToShop={toggleDrawer}
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
            workoutChannelUrl={workoutChannelUrl}
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
                      <div className="list-header">{t( "personal_data" )}</div>
                    </div>
                  </a>
                </div>
                {bu == 0 &&
                  <>
                    <div className="list-item">
                      <a href="#section-logo" style={{display: 'flex'}}>
                        <PhotoIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "MY_BUSINESS_LOGO" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-2" style={{display: 'flex'}}>
                        <PhotoIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "profile_picture" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-3" style={{display: 'flex'}}>
                        <PaymentIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "licence_data" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-4" style={{display: 'flex'}}>
                        <BusinessIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "my_address" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-5" style={{display: 'flex'}}>
                        <SecurityIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "data_protection" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-6" style={{display: 'flex'}}>
                        <PhoneIphoneIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "app_banner" )}</div>
                        </div>
                      </a>
                    </div>
                    <div className="list-item">
                      <a href="#section-7" style={{display: 'flex'}}>
                        <YouTubeIcon/>
                        <div className="list-item-content">
                          <div className="list-header">{t( "workout_channel" )}</div>
                        </div>
                      </a>
                    </div>
                  </>
                }
                <div className="list-item">
                  <a href="#section-8" style={{display: 'flex'}}>
                    <VpnKeyIcon/>
                    <div className="list-item-content">
                      <div className="list-header">{t( "password_reset" )}</div>
                    </div>
                  </a>
                </div>
              </ToolsList>
            </Scrollspy>
          </StyledNavigationCard>
        </FixedSection>
      </div>
      <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer}>
        <Shop
          toggleDrawer={toggleDrawer}

          id={id}
          email={email}
          firstName={firstName}
          lastName={lastName}
          language={language}
          companyName={companyName}
          phoneNumber={phoneNumber}
          country={country}
          city={city}
          zipcode={zipcode}
          street={street}

          tariffData={tariffData}
          getTariff={getTariff}
          getTariffLoading={getTariffLoading}
          getTariffError={getTariffError}
        />
      </Drawer>
    </Stage>
  )
};

Setup.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * Function to translate content
  */
  bu: PropTypes.number,

  /**
   * Function to translate content
  */
  id: PropTypes.number,

  /**
   * Function to translate content
  */
  refetch: PropTypes.func,

  /**
   * Function to translate content
  */
  readyToSavePersonalData: PropTypes.bool,

  /**
   * Function to translate content
  */
  onUpdatePersonalData: PropTypes.func,

  /**
   * Function to translate content
  */
  updateUserPersonalDataLoading: PropTypes.func,

  /**
   * Function to translate content
  */
  email: PropTypes.string,

  /**
   * Function to translate content
  */
  setEmail: PropTypes.func,

  /**
   * Function to translate content
  */
  emailErrorMessage: PropTypes.string,

  /**
   * Function to translate content
  */
  firstName: PropTypes.string,

  /**
   * Function to translate content
  */
  setFirstName: PropTypes.func,

  /**
   * Function to translate content
  */
  lastName: PropTypes.string,

  /**
   * Function to translate content
  */
  setLastName: PropTypes.func,

  /**
   * Function to translate content
  */
  language: PropTypes.string,

  /**
   * Function to translate content
  */
  setLanguage: PropTypes.func,

  /**
   * Function to translate content
  */
  photoUrl: PropTypes.string,

  /**
   * Function to translate content
  */
  photoUrlFullSize: PropTypes.string,

  /**
   * Function to translate content
  */
  expirationDate: PropTypes.string,

  /**
   * Function to translate content
  */
  readyToSaveAddress: PropTypes.bool,

  /**
   * Function to translate content
  */
  onUpdateUserAddress: PropTypes.func,

  /**
   * Function to translate content
  */
  updateUserAddressLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  companyName: PropTypes.string,

  /**
   * Function to translate content
  */
  setCompanyName: PropTypes.func,

  /**
   * Function to translate content
  */
  phoneNumber: PropTypes.string,

  /**
   * Function to translate content
  */
  setPhoneNumber: PropTypes.func,

  /**
   * Function to translate content
  */
  website: PropTypes.string,

  /**
   * Function to translate content
  */
  setWebsite: PropTypes.func,

  /**
   * Function to translate content
  */
  country: PropTypes.string,

  /**
   * Function to translate content
  */
  setCountry: PropTypes.func,

  /**
   * Function to translate content
  */
  city: PropTypes.string,

  /**
   * Function to translate content
  */
  setCity: PropTypes.func,

  /**
   * Function to translate content
  */
  zipcode: PropTypes.string,

  /**
   * Function to translate content
  */
  setZipcode: PropTypes.func,

  /**
   * Function to translate content
  */
  street: PropTypes.string,

  /**
   * Function to translate content
  */
  setStreet: PropTypes.func,

  /**
   * Function to translate content
  */
  bannerLink: PropTypes.string,

  /**
   * Function to translate content
  */
  setBannerLink: PropTypes.func,

  /**
   * Function to translate content
  */
  bannerPhotoUrl: PropTypes.string,

  /**
   * Function to translate content
  */
  onUpdateUserBannerLink: PropTypes.func,

  /**
   * Function to translate content
  */
  updateUserBannerLinkLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  readyToSaveBannerLink: PropTypes.bool,

  /**
   * Function to translate content
  */
  readyToSaveWorkout: PropTypes.bool,

  /**
   * Function to translate content
  */
  workoutEnable: PropTypes.bool,

  /**
   * Function to translate content
  */
  setWorkoutEnable: PropTypes.func,

  /**
   * Function to translate content
  */
  facebook: PropTypes.string,

  /**
   * Function to translate content
  */
  setFacebook: PropTypes.func,

  /**
   * Function to translate content
  */
  googleplus: PropTypes.string,

  /**
   * Function to translate content
  */
  setGoogleplus: PropTypes.func,

  /**
   * Function to translate content
  */
  twitter: PropTypes.string,

  /**
   * Function to translate content
  */
  setTwitter: PropTypes.func,

  /**
   * Function to translate content
  */
  promoVideo: PropTypes.string,

  /**
   * Function to translate content
  */
  setPromoVideo: PropTypes.func,

  /**
   * Function to translate content
  */
  promoText: PropTypes.string,

  /**
   * Function to translate content
  */
  setPromoText: PropTypes.func,

  /**
   * Function to translate content
  */
  workoutImageUrl: PropTypes.string,

  /**
   * Function to translate content
  */
  onUpdateUserWorkoutChannelData: PropTypes.func,

  /**
   * Function to translate content
  */
  updateUserWorkoutChannelDataLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  dataPrivacyPolicy: PropTypes.func,

  /**
   * Function to translate content
  */
  role: PropTypes.number,

  /**
   * Function to translate content
  */
  handleChange: PropTypes.func,

  /**
   * Function to translate content
  */
  passwordOld: PropTypes.string,

  /**
   * Function to translate content
  */
  passwordNew: PropTypes.string,

  /**
   * Function to translate content
  */
  passwordConfirmation: PropTypes.string,
  /**
   * Function to translate content
  */

  /**
   * Function to translate content
  */
  passwordOldErrorMessage: PropTypes.string,

  /**
   * Function to translate content
  */
  passwordNewErrorMessage: PropTypes.string,

  /**
   * Function to translate content
  */
  passwordConfirmationErrorMessage: PropTypes.string,

  /**
   * Function to translate content
  */
  onOldPasswordChange: PropTypes.func,

  /**
   * Function to translate content
  */
  onNewPasswordChange: PropTypes.func,

  /**
   * Function to translate content
  */
  onConfirmationPasswordChange: PropTypes.func,

  /**
   * Function to translate content
  */
  onVerifyPassword: PropTypes.func,

  /**
   * Function to translate content
  */
  onChangePassword: PropTypes.func,

  /**
   * Function to translate content
  */
  passwordConfirmed: PropTypes.bool,

  /**
   * Function to translate content
  */
  passwordChanged: PropTypes.bool,

  /**
   * Function to translate content
  */
  verifyPasswordLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  changePasswordLoading: PropTypes.bool,

  /**
   * Function to translate content
  */
  endProcess: PropTypes.bool,

  /**
   * Function to translate content
  */
  goToShop: PropTypes.func,

  /**
   * Function to translate content
  */
  onRefreshLicenceStatus: PropTypes.func,
};

export default Setup;
