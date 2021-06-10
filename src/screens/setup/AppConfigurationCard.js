import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import ImageEditor from '../../components/ImageEditor';
import LanistaButton from '../../components/LanistaButton';
import TextField from '@material-ui/core/TextField';
import {
  StyledCard,
} from './styles';

export default ({
  t,
  id,
  refetch,

  bannerLink,
  setBannerLink,
  bannerPhotoUrl,

  onUpdateUserBannerLink,
  updateUserBannerLinkLoading,

  readyToSaveBannerLink,

}) => {
  //
  // Edit image handling
  //
  const [previewImage, setPreviewImage] = React.useState(null);
  const [loadingImage, setLoadingImage] = React.useState(false);


  //
  // image upload
  //
  const [uploadMemberImageLoading, setUploadMemberImageLoading] = React.useState(false);
  const [uploadMemberImageError, setUploadMemberImageError] = React.useState(null);
  const onUploadMemberImage = (file) => {
    setLoadingImage(true);
    let reader = new FileReader();
    let uploadBaseUrl = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/file/user/';
    //let uploadBaseUrl = 'https://preview.lanista-training.com/file/user/';
    if( window.cordova ) {
      uploadBaseUrl = 'https://preview.lanista-training.com/file/user/';
    }
    reader.addEventListener('loadend', function(e){
      const token = cookie.get('token');
      fetch(uploadBaseUrl + id + '/banners/1', {
        method: "POST",
        body: new Blob([reader.result], {type: file.type}),
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log("data")
        console.log(data)
        if (data.message == 'OK') {
          console.log("DOING REFETCH");
          console.log(refetch);
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
  }

  return (
    <div className="section app-configuration" id="section-6">
      <div className="section-header">{t( "app_banner" )}</div>
      <StyledCard>
        <div className="section-content">
          <ImageEditor
            t={t}
            aspect={860 / 600}
            imageSrc={bannerPhotoUrl}

            containerWidth={350}
            containerHeight={244}

            onUploadImage={onUploadMemberImage}
            loading={loadingImage}

            pictureMessage={'app image format'}
            notEditable={true}
          />
          <TextField
            id="banner-url"
            label={t('app_banner_link')}
            type={'url'}
            disabled={false}
            value={bannerLink}
            onChange={(e) => setBannerLink(e.target.value)}
          />
        </div>
        <LanistaButton
          className="save-banner-url-button"
          onClick={onUpdateUserBannerLink}
          disabled={!readyToSaveBannerLink}
          loading={updateUserBannerLinkLoading}
          inverted={readyToSaveBannerLink}
        >
          {t( "save" )}
        </LanistaButton>
      </StyledCard>
    </div>
  )
}
