import React, { Component, useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import { withApollo } from '../../lib/apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Scene from "../../components/Scene";
import Setup from './Setup';
import { logout } from '../../lib/auth';
import { ME_SETTINGS, ME } from "../../queries";
import {
  UPDATEUSERPERSONALDATA,
  VERIFYPASSWORD,
  CHANGEPASSWORD,
  UPDATEUSERADDRESS,
  UPDATEUSERBANNERURL,
  UPDATEUSERWORKOUTCHANNELDATA,
  GETNEWTOKEN,
  GETTARIFF,
} from "../../mutations";

import { refreshToken } from '../../lib/auth';

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';
import Logout from '../../components/icons/Logout';

const SetupWithData = ({goBack, doLogout}) => {

  const {t, locale, changeLanguage} = useTranslate("setup");

  const getCommandsRight = (client) => {
    return [{
        icon: <Logout/>,
        iosname: 'iconfinder_Out_2134656',
        text: t("logout"),
        type: 'type-4',
        typex: 'Ionicons',
        name: 'logout',
        style: {color: "#db2828"},
        className: 'logout-button',
        onTap: () => {
          client.resetStore();
          doLogout();
        }
    }];
  }

  const getCommandsLeft = () => {
    return ([{
        icon: <Back/>,
        iosname: 'tools-inactive',
        text: '',
        type: 'type-1',
        typex: 'Ionicons',
        name: 'back',
        style: {color: '#34acfb'},
        onTap: () => {
          goBack();
        }
    }]);
  }

  const validateEmail = () => {
    if( email !== null &&  !(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test( email )) ) {
      return t("email_invalid")
    }
    if( email !== null && email.trim().length === 0 ) {
      return t("email_invalid")
    }
    return null;
  }

  const handleChange = (changes) => {
    return true;
  }

  const [user_data, setUser_data] = useState('');

  // Personal data
  const [readyToSavePersonalData, setReadyToSavePersonalData] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [language, setLanguage] = useState('');

  // User photo
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUrlFullSize, setPhotoUrlFullSize] = useState('');

  // User logo
  const [logoUrl, setLogoUrl] = useState('');
  const [logoUrlFullSize, setLogoUrlFullSize] = useState('');

  // Licence data
  const [expirationDate, setExpirationDate] = useState(new Date());

  // Business address
  const [readyToSaveAddress, setReadyToSaveAddress] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [street, setStreet] = useState('');

  // App configuration
  const [readyToSaveBannerLink, setReadyToSaveBannerLink] = useState(false);
  const [bannerLink, setBannerLink] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');

  // Workout channel configuration
  const [readyToSaveWorkout, setReadyToSaveWorkout] = useState(false);
  const [workoutEnable, setWorkoutEnable] = useState('');
  const [facebook, setFacebook] = useState('');
  const [googleplus, setGoogleplus] = useState('');
  const [twitter, setTwitter] = useState('');
  const [promoVideo, setPromoVideo] = useState('');
  const [promoText, setPromoText] = useState('');
  const [workoutImageUrl, setWorkoutImageUrl] = useState('');
  const [workoutChannelUrl, setWorkoutChannelUrl] = useState('');

  // Data privacy policy
  const [dataPrivacyPolicy, setDataPrivacyPolicy] = useState(0);

  // Role in team
  const [role, setRole] = useState(0);

  // Password reset
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordOldErrorMessage, setPasswordOldErrorMessage] = useState(null);
  const [passwordNewErrorMessage, setPasswordNewErrorMessage] = useState(null);
  const [passwordConfirmationErrorMessage, setPasswordConfirmationErrorMessage] = useState(null);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    setPasswordOldErrorMessage(null);
  }, [passwordOld]);

  useEffect(() => {
    setPasswordConfirmationErrorMessage(null);
  }, [passwordConfirmation]);

  const [tariffData, setTariffData] = useState(null);

  //
  // Remote actions
  //
  const { data, loading, error, client, refetch } = useQuery(ME_SETTINGS);
  const { refetch: refetchMe } = useQuery(ME);
  const [updateUserPersonalData, {
    loading: updateUserPersonalDataLoading,
    error: updateUserPersonalDataError
  }] = useMutation(
    UPDATEUSERPERSONALDATA,
    {
      update(cache,  { data: { updateUserPersonalData } }) {
        const {id} = updateUserPersonalData;
        if(id > 0) {
          refetch();
          setReadyToSavePersonalData(false);
        }
      }
    }
  );
  const [updateUserAddress, {
    loading: updateUserAddressLoading,
    error: updateUserAddressError
  }] = useMutation(
    UPDATEUSERADDRESS,
    {
      update(cache,  { data: { updateUserAddress } }) {
        const {id} = updateUserAddress;
        if(id > 0) {
          refetch();
          setReadyToSaveAddress(false);
        }
      }
    }
  );
  const [updateUserBannerLink, {
    loading: updateUserBannerLinkLoading,
    error: updateUserBannerLinkError
  }] = useMutation(
    UPDATEUSERBANNERURL,
    {
      update(cache,  { data: { updateUserBannerLink } }) {
        const {id} = updateUserBannerLink;
        if(id > 0) {
          refetch();
          setReadyToSaveBannerLink(false);
        }
      }
    }
  );
  const [updateUserWorkoutChannelData, {
    loading: updateUserWorkoutChannelDataLoading,
    error: updateUserWorkoutChannelDataError
  }] = useMutation(
    UPDATEUSERWORKOUTCHANNELDATA,
    {
      update(cache,  { data: { updateUserWorkoutChannelData } }) {
        const {id} = updateUserWorkoutChannelData;
        if(id > 0) {
          refetch();
          setReadyToSaveWorkout(false);
        }
      }
    }
  );
  const [getNewTocken, {
    loading: getNewTockenLoading,
    error: getNewTockenError
  }] = useMutation(
    GETNEWTOKEN,
    {
      update(cache,  { data: { getNewTocken } }) {
        const {token} = getNewTocken;
        console.log("getNewTocken")
        console.log(token)
        refreshToken({token: token});
        refetch();
      }
    }
  );
  const [getTariff, {
    loading: getTariffLoading,
    error: getTariffError
  }] = useMutation(
    GETTARIFF,
    {
      update(cache,  { data: { getTariff } }) {
        const {token} = getTariff;
        console.log("getTariff")
        console.log(getTariff)
        setTariffData(getTariff);
      }
    }
  );



  const onUpdatePersonalData = () => {
    console.log("onUpdatePersonalData")
    updateUserPersonalData({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        language: language,
      }
    })
  };

  const onUpdateUserAddress = () => {
    console.log("onUpdatePersonalData")
    updateUserAddress({
      variables: {
        companyName: companyName,
        phoneNumber: phoneNumber,
        website: website,
        country: country,
        city: city,
        zipcode: zipcode,
        street: street,
      }
    })
  };

  const onUpdateUserBannerLink = () => {
    console.log("onUpdateUserBannerLink")
    updateUserBannerLink({
      variables: {
        url: bannerLink,
      }
    })
  };

  const onUpdateUserWorkoutChannelData = () => {
    console.log("onUpdateUserWorkoutChannelData")
    updateUserWorkoutChannelData({
      variables: {
        workoutEnable: workoutEnable,
        facebook: facebook,
        googleplus: googleplus,
        twitter: twitter,
        promoVideo: promoVideo,
        promoText: promoText,
      }
    })
  };


  const [verifyPassword, {
    loading: verifyPasswordLoading,
    error: verifyPasswordError
  }] = useMutation(
    VERIFYPASSWORD,
    {
      update(cache,  { data: { verifyPassword } }) {
        const {error} = verifyPassword;
        if(error == 0) {
          setPasswordConfirmed(true);
          setPasswordOldErrorMessage(null);
        } else {
          setPasswordOldErrorMessage(t("password_verification_error_" + error));
        }
      }
    }
  );

  const [changePassword, {
    loading: changePasswordLoading,
    error: changePasswordError
  }] = useMutation(
    CHANGEPASSWORD,
    {
      update(cache,  { data: { changePassword } }) {
        const {error} = changePassword;
        if(error == 0) {
          setPasswordNew(null);
          setPasswordOld(null);
          setPasswordConfirmation(null);
          setPasswordConfirmed(false);
          setPasswordChanged(true);
          setPasswordNewErrorMessage(null);
        } else {
          setPasswordNewErrorMessage(t("password_verification_error_" + error));
        }
      }
    }
  );

  const onVerifyPassword = () => {
    if( passwordOld.length < 6 ) {
      setPasswordOldErrorMessage(t('invalid_old_password'));
    } else {
      verifyPassword({
        variables: {
          password: passwordOld,
        }
      })
    }
  }

  const onChangePassword = () => {
    if( passwordNew !== passwordConfirmation ) {
      setPasswordConfirmationErrorMessage(t("password_confirmation_error"));
    } else {
      changePassword({
        variables: {
          oldPassword: passwordOld,
          newPassword: passwordNew,
        }
      })
    }
  }

  const onRefreshLicenceStatus = () => {
    console.log("onRefreshLicenceStatus")
    getNewTocken({
      variables: {}
    });
  }

  useEffect(() => {
    if( data && data.me ) {
      const {
        first_name,
        last_name,
        email,
        language,
        // Photo
        photoUrl,
        photoUrlFullSize,
        // Logo,
        logo_imageUrl,
        logoUrlFullSize,
        // Lizence data
        expiration_date,
        // Business data
        company_name,
        phone_nr,
        website,
        country,
        city,
        zipcode,
        street,
        // App configuration
        banner_link,
        banner_photoUrl,
        // Workout channel configuration
        workout_enable,
        facebook,
        googleplus,
        twitter,
        promo_video,
        promo_text,
        workout_imageUrl,
        workout_channelUrl,
        // Data privacy
        dataPrivacyPolicy,
        // Role in team
        role,
      } = data.me;

      setFirstName(first_name);
      setLastName(last_name);
      setLanguage(language);
      setEmail(email);

      setCompanyName(company_name);
      setPhoneNumber(phone_nr);
      setWebsite(website);
      setCountry(country);
      setCity(city);
      setZipcode(zipcode);
      setStreet(street);

      setPhotoUrl(photoUrl);
      setPhotoUrlFullSize(photoUrlFullSize);

      setLogoUrl(logo_imageUrl);
      setLogoUrlFullSize(logo_imageUrl);

      setExpirationDate(expiration_date);

      setBannerLink(banner_link);
      setBannerImageUrl(banner_photoUrl);

      setWorkoutEnable(workout_enable);
      setFacebook(facebook);
      setGoogleplus(googleplus);
      setTwitter(twitter);
      setPromoVideo(promo_video);
      setPromoText(promo_text);
      setWorkoutImageUrl(workout_imageUrl);
      setWorkoutChannelUrl(workout_channelUrl);

      if( locale != language ) {
        changeLanguage(language.toLowerCase());
      }

    }
  }, [data]);

  useEffect(() => {
    const {me} = data ? data : {};
    if(
      me && (
      firstName != me.first_name
      || lastName != me.last_name
      || language != me.language
      || email != me.email)
    ) {
      setReadyToSavePersonalData(true);
    } else {
      setReadyToSavePersonalData(false);
    }
  }, [firstName, lastName, language, email]);

  useEffect(() => {
    const {me} = data ? data : {};
    if(
      me && (
      companyName != me.company_name
      || phoneNumber != me.phone_nr
      || website != me.website
      || country != me.country
      || city != me.city
      || zipcode != me.zipcode
      || street != me.street)
    ) {
      setReadyToSaveAddress(true);
    } else {
      setReadyToSaveAddress(false);
    }
  }, [companyName, phoneNumber, website, country, city, zipcode, street]);

  useEffect(() => {
    const {me} = data ? data : {};
    if(
      me && bannerLink != me.banner_link
    ) {
      setReadyToSaveBannerLink(true);
    } else {
      setReadyToSaveBannerLink(false);
    }
  }, [bannerLink]);

  useEffect(() => {
    const {me} = data ? data : {};
    if(
      me && (
        workoutEnable != me.workout_enable
        || facebook != me.facebook
        || googleplus != me.googleplus
        || twitter != me.twitter
        || promoVideo != me.promo_video
        || promoText != me.promo_text
      )
    ) {
      setReadyToSaveWorkout(true);
    } else {
      setReadyToSaveWorkout(false);
    }
  }, [workoutEnable, facebook, googleplus, twitter, promoVideo, promoText]);

  const goToShop = () => {
    console.log("goToShop");
    const {
      id,
      ll,
      email,
      language,
    } = data.me;
    window.cordova && window.cordova.InAppBrowser ? window.cordova.InAppBrowser.open('https://lanista-training.com/tpmanager/shop/selectproduct/lang/' + language.toUpperCase() + '/email/' + email + '/rr/' + ll + '/lk/' + id, '_system') : window.open('https://lanista-training.com/tpmanager/shop/selectproduct/lang/' + language.toUpperCase() + '/email/' + email + '/rr/' + ll + '/lk/' + id, '_blank');
  }

  return (
    <Scene
      commandsLeft={getCommandsLeft()}
      commandsRight={getCommandsRight(client)}
      t={t}
    >
      <Setup
        t={t}
        dataChanged={dataChanged}
        goBack={goBack}
        userData={user_data}
        refetch={() => {
          refetch();
          refetchMe();
        }}

        bu={data && data.me && data.me.bu}
        id={data && data.me && data.me.id}

        readyToSavePersonalData={readyToSavePersonalData}
        onUpdatePersonalData={onUpdatePersonalData}
        updateUserPersonalDataLoading={updateUserPersonalDataLoading}
        email={email}
        setEmail={setEmail}
        emailErrorMessage={validateEmail()}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        language={language}
        setLanguage={setLanguage}

        photoUrl={photoUrl}
        photoUrlFullSize={photoUrlFullSize}

        logoUrl={logoUrl}
        logolFullSize={logoUrlFullSize}

        expirationDate={expirationDate}

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

        bannerLink={bannerLink}
        setBannerLink={setBannerLink}
        bannerPhotoUrl={bannerImageUrl}
        onUpdateUserBannerLink={onUpdateUserBannerLink}
        updateUserBannerLinkLoading={updateUserBannerLinkLoading}
        readyToSaveBannerLink={readyToSaveBannerLink}

        expirationDate={expirationDate}

        readyToSaveWorkout={readyToSaveWorkout}
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
        workoutChannelUrl={workoutChannelUrl}

        dataPrivacyPolicy={dataPrivacyPolicy}

        role={role}

        handleChange={handleChange}

        onOldPasswordChange={(value) => setPasswordOld(value)}
        onNewPasswordChange={(value) => setPasswordNew(value)}
        onConfirmationPasswordChange={(value) => setPasswordConfirmation(value)}
        passwordOldErrorMessage={passwordOldErrorMessage}
        passwordNewErrorMessage={passwordNewErrorMessage}
        passwordConfirmationErrorMessage={passwordConfirmationErrorMessage}
        passwordOld={passwordOld}
        passwordNew={passwordNew}
        passwordConfirmation={passwordConfirmation}
        onVerifyPassword={onVerifyPassword}
        onChangePassword={onChangePassword}
        passwordConfirmed={passwordConfirmed}
        passwordChanged={passwordChanged}
        verifyPasswordLoading={verifyPasswordLoading}
        changePasswordLoading={changePasswordLoading}
        endProcess={() => setPasswordChanged(false)}

        goToShop={goToShop}
        onRefreshLicenceStatus={onRefreshLicenceStatus}

        tariffData={tariffData}
        getTariff={getTariff}
        getTariffLoading={getTariffLoading}
        getTariffError={getTariffError}
      />
    </Scene>
  );
}

export default withApollo(SetupWithData);
