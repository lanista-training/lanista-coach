import React, { Component, useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import arrayMove from 'array-move';
import moment from "moment";
import Router from 'next/router';
import cookie from 'js-cookie';

import Scene from "../../components/Scene";
import {withData as withDataToShow} from "./DataProviderToShow";
import Profile from "./Profile";
import {getCommandsLeft, getCommandsRight} from "./commands.js";
import CustomerHeader from "../../components/CustomerHeader";

const languages = [
  { key: 'DE', text: 'Deutsch', value: 'DE' },
  { key: 'ES', text: 'Español', value: 'ES' },
  { key: 'EN', text: 'English', value: 'EN' },
  { key: 'PT', text: 'Português', value: 'PT' },
  { key: 'FR', text: 'Français', value: 'FR' },
  { key: 'RU', text: 'ру́сский', value: 'RU' },
]

const Panel = ({
  member,
  memberId,
  loading,
  error,
  refetch,

  updateMember,
  updateMemberLoading,
  updateMemberError,

  updateMemberAddress,
  updateMemberAddressLoading,
  updateMemberAddressError,

  requestDataPrivacyDocument,
  dataPrivacyDocument,
  resetDataPrivacyDocument,

  sendActivationMail,
  sendActivationMailLoading,
  sendActivationMailError,

  deleteMember,
  memberDeleted,

  goBack,
  goToSetup,

  emailErrorMessage,
  setEmailErrorMessage,
}) => {

  const {t} = useTranslate("profile");

  // Personal data
  const [readyToSavePersonalData, setReadyToSavePersonalData] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [language, setLanguage] = useState('EN');
  const [gender, setGender] = useState(0);
  const [birthday, setBirthday] = useState(null);


  // Business address
  const [readyToSaveAddress, setReadyToSaveAddress] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [street, setStreet] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Other information
  const [dpLocation, setDpLocation] = React.useState('');
  const [dataPrivacySigned, setDataPrivacySigned] = React.useState(false);
  const [dpSignaturePolicy, setDpSignaturePolicy] = React.useState(0);
  const [accountStatus, setAccountStatus] = React.useState(0);
  const [note, setNote] = useState('');

  React.useEffect(() => {
    if( member ) {

      const {
        email,
        first_name,
        last_name,
        birthday,
        language,
        gender,
        phone_nr,
        country,
        zipcode,
        street,
        city,
        note,
        dpSigned,
        dpSignaturePolicy,
        dpLocation,
        status,
      } = member;

      setEmail(email ? email : '');
      setFirstName(first_name);
      setLastName(last_name);
      setBirthday(birthday  ? new Date(parseInt(birthday)) : null);
      setLanguage(language);
      setGender(gender);
      setPhoneNumber(phone_nr);
      setCountry(country);
      setZipcode(zipcode);
      setStreet(street);
      setCity(city);
      setNote(note);
      setDataPrivacySigned(dpSigned == 1);
      setDpSignaturePolicy(dpSignaturePolicy);
      setDpLocation(dpLocation);
      setAccountStatus(status);
      setReadyToSavePersonalData(false);
      setReadyToSaveAddress(false);
    }
  }, [member]);

  React.useEffect(() => {
    if( email != member.email
      || lastName != member.last_name
      || firstName != member.first_name
      || language != member.language
      || gender != member.gender
      || (birthday !== null  && birthday.getTime() != parseInt(member.birthday))
      || note != member.note
    ) {
      setReadyToSavePersonalData(true);
    } else {
      setReadyToSavePersonalData(false);
    }
  }, [
    email,
    firstName,
    lastName,
    birthday,
    language,
    gender,
    note,
  ]);

  useEffect(() => {
    setEmailErrorMessage(null);
  }, [email]);

  useEffect(() => {
    setFirstNameErrorMessage(null);
  }, [firstName]);

  useEffect(() => {
    setLastNameErrorMessage(null);
  }, [lastName])

  React.useEffect(() => {
    if( phoneNumber != member.phone_nr
      || country != member.country
      || zipcode != member.zipcode
      || street != member.street
      || city != member.city
      || phoneNumber != member.phone_nr
    ) {
      setReadyToSaveAddress(true);
    } else {
      setReadyToSaveAddress(false);
    }
  }, [
    phoneNumber,
    country,
    zipcode,
    street,
    city,
    phoneNumber
  ]);

  //
  // Member data
  //
  const onUpdateMember = () => {
    // VALIDATOIN RULES
    if( email && email.trim().length > 0 &&  !(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test( email )) ) {
      setEmailErrorMessage(t("email_invalid"));
    } else if( firstName.length == 0 ) {
      setFirstNameErrorMessage(t("FIRST_NAME_ERROR"))
    }  else if( lastName.length == 0 ) {
      setLastNameErrorMessage(t("LAST_NAME_ERROR"))
    } else {
      updateMember({
        variables: {
          memberId: member.id,
          email: email,
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
          gender: gender,
          language: language,
          phoneNumber: phoneNumber,
          note: note,
        }
      });
    }
  }

  //
  // Member address
  //
  const onUpdateMemberAddress = () => {
    updateMemberAddress({
      variables: {
        memberId: member.id,
        country: country ? country : null,
        city: city ? city : null,
        zipcode: zipcode ? zipcode : null,
        street: street ? street : null,
        phoneNumber: phoneNumber,
      }
    })
  }

  const onRequestDataPrivacyDocument = () => {
    resetDataPrivacyDocument();
    requestDataPrivacyDocument({
      variables: {
        memberId: member.id,
      }
    });
  }

  const onSendActivationMail = () => {
    sendActivationMail({
      variables: {
        memberId: member.id,
      }
    });
  }

  //
  // Edit image handling
  //
  const [previewImage, setPreviewImage] = React.useState(null);
  const [loadingImage, setLoadingImage] = React.useState(false);
  const resetPreviewImage = () => {
    if( id > 0 ) {
      const cropRequest = {
        bucket: 'lanista-data',
        key: member.id + '/photo.jpg',
      }
      const strRequest = JSON.stringify(cropRequest);
      const encRequest = btoa(strRequest);
      setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
    }
  };

  const {id} = member ? member : {};

  React.useEffect(() => {
    if( id > 0 ) {
      resetPreviewImage();
    }
  }, [id]);
  //
  // Crop image
  const onCropImage = (crop) => {
    if(crop) {
      setLoadingImage(true);
      const cropRequest = {
        bucket: 'lanista-data',
        key: member.id + '/photo.jpg',
        edits: {
          extract: {
            height: Math.ceil(crop.height),
            width:Math.ceil(crop.width),
            top: Math.ceil(crop.y),
            left: Math.ceil(crop.x),
          }
        }
      }
      const strRequest = JSON.stringify(cropRequest);
      const encRequest = btoa(strRequest);
      setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
    }
  };

  //
  // Rotate image
  //
  const onRotateImage = (angle) => {
    setLoadingImage(true);
    const rotateRequest = {
      bucket: 'lanista-data',
      key: member.id + '/photo.jpg',
      edits: {
        rotate: angle,
      }
    }
    const strRequest = JSON.stringify(rotateRequest);
    const encRequest = btoa(strRequest);
    setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
  }

  React.useEffect(() => {
    setLoadingImage(false);
  }, [previewImage]);


  //
  // image upload
  //
  const [uploadMemberImageLoading, setUploadMemberImageLoading] = React.useState(false);
  const [uploadMemberImageError, setUploadMemberImageError] = React.useState(null);


  const onUploadMemberImage = (file) => {

    setLoadingImage(true);
    let reader = new FileReader();

    let uploadBaseUrl = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/' + 'file/user/';
    if( window.cordova ) {
      uploadBaseUrl = 'https://app.lanista-training.com/file/user/';
    }
    if(file instanceof File) {
      reader.addEventListener('loadend', function(e){
        const token = cookie.get('token');
        fetch(uploadBaseUrl + memberId + '/photo', {
          method: "POST",
          body: new Blob([reader.result], {type: file.type}),
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          },
        })
        .then((response) => {
          if (response.ok) {
            refetch();
          } else {
            alert('Error uploading [' + file.name + ']. Max upload size is ~4MB.');
          }
          setLoadingImage(false);
        })
        .catch((error) => {
          setLoadingImage(false);
        });
      });
      reader.readAsArrayBuffer(file);
    } else {
      const token = cookie.get('token');
      fetch(uploadBaseUrl + memberId + '/photo' + '/' + file.substring(file.lastIndexOf("/") + 1), {
        method: "POST",
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        },
      })
      .then((response) => {
        setUploadMemberImageLoading(false);
        if (response.ok) {
          refetch();
        } else {
          alert('Error uploading [' + file.name + ']. Max upload size is ~4MB.');
        }
      })
      .catch((error) => {
        setUploadMemberImageLoading(false);
      });
    }
  }

  const onRequestDataPrivacySignature = () => {
    window.localStorage.setItem('openDataProtectionDialog', true);
    goBack();
  }

  const onDeleteMember = () => {
    deleteMember({
      variables: {
        memberId: member.id,
      },
    });
  }

  return (
    <Scene
      headerChildren={
        <CustomerHeader
          userId={member ? member.id : ''}
          firstName={member ? member.first_name : ''}
          lastName={member ? member.last_name : ''}
          photoUrl={member ? (member.photoUrl) : ''}
          onClick={() => {}}
        />
      }
      commandsLeft={getCommandsLeft({
          goBack: goBack
        })
      }
      commandsRight={getCommandsRight()}
      t={t}
      goToSetup={goToSetup}
    >
      {
        member && <Profile

          readyToSavePersonalData={readyToSavePersonalData}

          id={member ? member.id : 0}
          status={member ? member.status : 0}
          photoUrlFullSize={member ? member.photoUrlFullSize : ''}

          email={email}
          emailErrorMessage={emailErrorMessage}
          setEmail={setEmail}

          firstName={firstName}
          setFirstName={setFirstName}
          firstNameErrorMessage={firstNameErrorMessage}

          lastName={lastName}
          setLastName={setLastName}
          lastNameErrorMessage={lastNameErrorMessage}

          birthday={birthday}
          setBirthday={setBirthday}

          language={language}
          setLanguage={setLanguage}

          gender={gender}
          setGender={setGender}

          readyToSaveAddress={readyToSaveAddress}
          setReadyToSaveAddress={setReadyToSaveAddress}

          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}

          country={country}
          setCountry={setCountry}

          zipcode={zipcode}
          setZipcode={setZipcode}

          street={street}
          setStreet={setStreet}

          city={city}
          setCity={setCity}

          note={note}
          setNote={setNote}

          dpLocation={dpLocation}
          dpSignaturePolicy={dpSignaturePolicy}
          dataPrivacySigned={dataPrivacySigned}
          setDataPrivacySigned={setDataPrivacySigned}

          accountStatus={accountStatus}
          setAccountStatus={setAccountStatus}

          error={error}
          loading={loading}
          goBack={goBack}

          languages={languages}

          onUpdateMember={onUpdateMember}
          updateMemberLoading={updateMemberLoading}
          updateMemberError={updateMemberError}

          onUpdateMemberAddress={onUpdateMemberAddress}
          updateMemberAddressLoading={updateMemberAddressLoading}
          updateMemberAddressError={updateMemberAddressError}

          onRequestDataPrivacySignature={onRequestDataPrivacySignature}
          onRequestDataPrivacyDocument={onRequestDataPrivacyDocument}
          dataPrivacyDocument={dataPrivacyDocument}

          onSendActivationMail={onSendActivationMail}
          sendActivationMailLoading={sendActivationMailLoading}
          sendActivationMailError={sendActivationMailError}

          previewImage={previewImage}
          resetPreviewImage={resetPreviewImage}
          onCropImage={onCropImage}
          onRotateImage={onRotateImage}
          loadingImage={loadingImage}

          onUploadMemberImage={onUploadMemberImage}
          uploadMemberImageLoading={uploadMemberImageLoading}
          uploadMemberImageError={uploadMemberImageError}

          onDeleteMember={onDeleteMember}
          memberDeleted={memberDeleted}
        />
      }
    </Scene>
  )
}

const PanelWithData = ({memberId, goBack, goToSetup}) => {
  const ProfileData = withDataToShow(Panel, {memberId, goBack, goToSetup});
  return <ProfileData/>
}

export default PanelWithData;
