import React, { Component, useState, useEffect } from 'react';
import cookie from 'js-cookie';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ImageEditor from '../../components/ImageEditor';
import LanistaButton from '../../components/LanistaButton';
import {
  StyledCard,
} from './styles';;

export default ({
  t,
  id,
  refetch,

  photoUrl,
  photoUrlFullSize,

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
        key: id + '/photo.jpg',
      }
      const strRequest = JSON.stringify(cropRequest);
      const encRequest = btoa(strRequest);
      setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
    }
  };
  const onStartEditing = () => {
    setPreviewImage(photoUrlFullSize)
  }
  const onEndEditing = () => {
    setPreviewImage(photoUrlFullSize)
  }


  //
  // image upload
  //
  const [uploadMemberImageLoading, setUploadMemberImageLoading] = React.useState(false);
  const [uploadMemberImageError, setUploadMemberImageError] = React.useState(null);
  const onUploadMemberImage = (file) => {
    setLoadingImage(true);
    let reader = new FileReader();
    let uploadBaseUrl = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/' + 'file/user/';
    //let uploadBaseUrl = 'https://preview.lanista-training.com/file/user/';
    if( window.cordova ) {
      uploadBaseUrl = 'https://preview.lanista-training.com/file/user/';
    }
    reader.addEventListener('loadend', function(e){
      const token = cookie.get('token');
      fetch(uploadBaseUrl + id + '/photo', {
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
          alert('Error uploading [' + file.name + '].');
        }
        setLoadingImage(false);
      })
      .catch((error) => {
        setLoadingImage(false);
      });
    });
    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="section profile-image-section" id="section-2">
      <div className="section-header">{t( "profile_picture" )}</div>
      <StyledCard>
        <div className="section-content">
          <ImageEditor
            t={t}
            imageSrc={photoUrlFullSize}
            previewImage={previewImage}
            resetPreviewImage={resetPreviewImage}

            containerWidth={350}
            containerHeight={350}

            onUploadImage={onUploadMemberImage}
            loading={loadingImage}

            onStartEditing={onStartEditing}
            onEndEditing={onEndEditing}

            pictureMessage={'square image format'}
          />
        </div>
      </StyledCard>
    </div>
  )
}
