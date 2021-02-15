import React, { Component, useState, useEffect } from 'react';
import cookie from 'js-cookie';
import ImageEditor from '../../components/ImageEditor';
import LanistaButton from '../../components/LanistaButton';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {
  StyledCard,
} from './styles';;

export default ({
  t,
  id,
  refetch,

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
  workoutChannelUrl,

  onUpdateUserWorkoutChannelData,
  updateUserWorkoutChannelDataLoading,
  readyToSaveWorkout,

}) => {
  //
  // Edit image handling
  //
  const [previewImage, setPreviewImage] = React.useState(null);
  const [loadingImage, setLoadingImage] = React.useState(false);
  const resetPreviewImage = () => {
    if( id > 0 ) {
      const cropRequest = {
        bucket: 'lanista-data',
        key: id + '/workout/background.jpg',
      }
      const strRequest = JSON.stringify(cropRequest);
      const encRequest = btoa(strRequest);
      setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
    }
  };
  const onStartEditing = () => {
    setPreviewImage(workoutImageUrl)
  }
  const onEndEditing = () => {
    setPreviewImage(workoutImageUrl)
  }

  //
  // Crop image
  const onCropImage = (crop) => {
    if(crop) {
      setLoadingImage(true);
      const cropRequest = {
        bucket: 'lanista-data',
        key: id + '/workout/background.jpg',
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
      key: id + '/workout/background.jpg',
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
    let uploadBaseUrl = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/file/user/';
    if( window.cordova ) {
      uploadBaseUrl = 'https://preview.lanista-training.com/file/exercise/';
    }
    if(file instanceof File) {
      reader.addEventListener('loadend', function(e){
        const token = cookie.get('token');
        fetch(uploadBaseUrl + id + '/workout', {
          method: "POST",
          body: new Blob([reader.result], {type: file.type}),
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          },
        })
        .then(response => response.json())
        .then(data => {
          if (data.message == 'OK') {
            refetch();
          } else {
            alert('Error uploading [' + file.name + '].');
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
      fetch(uploadBaseUrl + id + '/workout/' + file.substring(file.lastIndexOf("/") + 1), {
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

  return (
    <div className="section workout-channel-section" id="section-7">
      <div className="section-header">{t( "workout_channel" )}</div>
      <StyledCard>
        <div className="section-content workout-channel">
          <FormControlLabel
            label={t("channel_status")}
            labelPlacement="start"
            control={
              <Switch
                checked={workoutEnable}
                onChange={(event) => setWorkoutEnable(event.target.checked)}
                name="workout-enable"
                color="primary"
              />
            }
          />
          <TextField
            id="facebook"
            label={t('facebook_profile')}
            type={'url'}
            disabled={false}
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
          <TextField
            id="googleplus"
            label={t('googleplus')}
            type={'url'}
            disabled={false}
            value={googleplus}
            onChange={(e) => setGoogleplus(e.target.value)}
          />
          <TextField
            id="twitter"
            label={t('twitter')}
            type={'url'}
            disabled={false}
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          <TextField
            id="promo-video"
            label={t('promo_video')}
            type={'url'}
            disabled={false}
            value={promoVideo}
            onChange={(e) => setPromoVideo(e.target.value)}
          />
          <TextField
            id="promo-text"
            label={t('short_description')}
            type={'url'}
            disabled={false}
            value={promoText}
            onChange={(e) => setPromoText(e.target.value)}
          />
          <LanistaButton
            className="save-workout-channel-data"
            onClick={onUpdateUserWorkoutChannelData}
            loading={updateUserWorkoutChannelDataLoading}
            disabled={!readyToSaveWorkout}
            inverted={readyToSaveWorkout}
          >
            {t( "save" )}
          </LanistaButton>
          <ImageEditor
            t={t}
            imageSrc={workoutImageUrl}
            previewImage={previewImage}
            resetPreviewImage={resetPreviewImage}

            containerWidth={350}
            containerHeight={350}

            onUploadMemberImage={onUploadMemberImage}
            onCropImage={onCropImage}
            onRotateImage={onRotateImage}
            loading={loadingImage}

            onStartEditing={onStartEditing}
            onEndEditing={onEndEditing}

            pictureMessage={'free image format'}
            notEditable={true}
          />
        </div>
        <LanistaButton
          className="preview-workout-channel-button"
          onClick={() => {
            (window.cordova && window.cordova.InAppBrowser) ? window.cordova.InAppBrowser.open(workoutChannelUrl, '_system') : window.open(workoutChannelUrl, '_blank');
          }}
          disabled={!workoutEnable}
        >
          {t( "workout_preview" )}
        </LanistaButton>
      </StyledCard>
    </div>
  )
}
