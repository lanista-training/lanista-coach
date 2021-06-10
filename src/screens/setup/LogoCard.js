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
        key: id + '/logo.jpg',
      }
      const strRequest = JSON.stringify(cropRequest);
      const encRequest = btoa(strRequest);
      setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
    }
  };
  const onStartEditing = () => {
    setPreviewImage(photoUrl)
  }
  const onEndEditing = () => {
    setPreviewImage(photoUrl)
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
      fetch(uploadBaseUrl + id + '/logo', {
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

  console.log("photoUrl", photoUrl)

  return (
    <div className="section logo-image-section" id="section-logo">
      <div className="section-header">{t( "MY_BUSINESS_LOGO" )}</div>
      <StyledCard>
        <div className="section-content">
          <ImageEditor
            t={t}
            imageSrc={photoUrl}
            previewImage={previewImage}
            resetPreviewImage={resetPreviewImage}

            containerWidth={350}
            containerHeight={350}
            aspect={4 / 3}

            onUploadImage={onUploadMemberImage}
            loading={loadingImage}

            onStartEditing={onStartEditing}
            onEndEditing={onEndEditing}

            pictureMessage={'free image format'}
          />
        </div>
      </StyledCard>
    </div>
  )
}
