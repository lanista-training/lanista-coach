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
}) => {
  const {t} = useTranslate("profile");

  //
  // Member data
  //
  const onUpdateMember = ({
    email,
    firstName,
    lastName,
    birthday,
    gender,
    language,
    phoneNumber,
    note,
  }) => {
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
    })
  }

  //
  // Member address
  //
  const onUpdateMemberAddress = ({country, city, zipcode, street}) => {
    updateMemberAddress({
      variables: {
        memberId: member.id,
        country: country,
        city: city,
        zipcode: zipcode,
        street: street,
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
  }, [previewImage])


  //
  // image upload
  //
  const [uploadMemberImageLoading, setUploadMemberImageLoading] = React.useState(false);
  const [uploadMemberImageError, setUploadMemberImageError] = React.useState(null);
  const onUploadMemberImage = (file) => {
    setLoadingImage(true);
    let reader = new FileReader();
    let uploadBaseUrl = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/' + 'file/user/';
    if(file instanceof File) {
      reader.addEventListener('loadend', function(e){
        const token = cookie.get('token');
        fetch(uploadBaseUrl + member.id + '/photo', {
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
      fetch(uploadBaseUrl + member.id + '/photo' + '/' + file.substring(file.lastIndexOf("/") + 1), {
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
          member={member}
          error={error}
          loading={loading}
          goBack={goBack}

          t={t}
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
