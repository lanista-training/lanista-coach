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
  const resetPreviewImage = () => {
    if( id > 0 ) {
      const cropRequest = {
        bucket: 'lanista-data',
        key: id + '/banners/1/banner.jpg',
      }
      const strRequest = JSON.stringify(cropRequest);
      const encRequest = btoa(strRequest);
      setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
    }
  };
  const onStartEditing = () => {
    setPreviewImage(bannerPhotoUrl)
  }
  const onEndEditing = () => {
    setPreviewImage(bannerPhotoUrl)
  }

  //
  // Crop image
  const onCropImage = (crop) => {
    if(crop) {
      setLoadingImage(true);
      const cropRequest = {
        bucket: 'lanista-data',
        key: id + '/banners/1/banner.jpg',
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
      key: id + '/banners/1/banner.jpg',
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
    if(file instanceof File) {
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
    } else {
      const token = cookie.get('token');
      fetch(uploadBaseUrl + id + '/banners/1/' + file.substring(file.lastIndexOf("/") + 1), {
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
    <div className="section app-configuration" id="section-6">
      <div className="section-header">{t( "app_banner" )}</div>
      <StyledCard>
        <div className="section-content">
          <ImageEditor
            t={t}
            imageSrc={bannerPhotoUrl}
            previewImage={previewImage}
            resetPreviewImage={resetPreviewImage}

            containerWidth={350}
            containerHeight={244}

            onUploadMemberImage={onUploadMemberImage}
            onCropImage={onCropImage}
            onRotateImage={onRotateImage}
            loading={loadingImage}

            onStartEditing={onStartEditing}
            onEndEditing={onEndEditing}

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
