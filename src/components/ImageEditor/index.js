import React, { useCallback, useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import CropImageContainer from './CropImageContainer';
import {ImageEditor, StyledDropContainer, StyledCropContainer} from './styles';
import IconButton from '@material-ui/core/IconButton';
import CropIcon from '@material-ui/icons/Crop';
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { Icon } from 'semantic-ui-react';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from './Button';

export default ({
  t,

  imageSrc,
  previewImage,
  resetPreviewImage,

  containerHeight,
  containerWidth,

  onUploadMemberImage,
  onCropImage,
  onRotateImage,

  loading,
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  const [naturalHeight, setNaturalHeight] = useState(0);
  const [naturalWidth, setNaturalWidth] = useState(0);


  const [cropContainerHeight, setCropContainerHeight] = React.useState(containerHeight);
  const [cropContainerWidth, setCropContainerWidth] = React.useState(containerWidth);


  useEffect(() => {
    setCurrentSrc(imageSrc);
    setCropMode(false);
    setEditingMode(false);
    setSelectedCrop(null);
    setAngle(0);
    /*
    if(imageSrc) {
      const imgTest = document.createElement('img');
      console.log("imageSrc")
      console.log(imageSrc)
      imgTest.src = imageSrc;
      imgTest.onload = function() {
        setNaturalHeight(imgTest.naturalHeight);
        setNaturalWidth(imgTest.naturalWidth);

        if(imgTest.naturalWidth != imgTest.naturalHeight) {
          if(imgTest.naturalWidth > imgTest.naturalHeight) {
            setCropContainerHeight( Math.ceil((cropContainerWidth/imgTest.naturalWidth)*imgTest.naturalHeight) );
          } else {
            setCropContainerWidth( Math.ceil((cropContainerHeight/imgTest.naturalHeight)*imgTest.naturalWidth) );
          }
        }

        setImageError(false);
      };
      imgTest.onerror = function() {
        setImageError(true);
      };
    }
    */
  }, [imageSrc]);

  useEffect(() => {
    console.log("NEW PREVIEW IMAGE ARRIVED");
    if(previewImage) {
      const imgTest = document.createElement('img');
      console.log("previewImage")
      console.log(previewImage)
      imgTest.src = previewImage;
      imgTest.onload = function() {
        setNaturalHeight(imgTest.naturalHeight);
        setNaturalWidth(imgTest.naturalWidth);

        if(imgTest.naturalWidth != imgTest.naturalHeight) {
          if(imgTest.naturalWidth > imgTest.naturalHeight) {
            setCropContainerHeight( Math.ceil((cropContainerWidth/imgTest.naturalWidth)*imgTest.naturalHeight) );
          } else {
            setCropContainerWidth( Math.ceil((cropContainerHeight/imgTest.naturalHeight)*imgTest.naturalWidth) );
          }
        }

        setImageError(false);
      };
      imgTest.onerror = function() {
        setImageError(true);
      };
    }
  }, [previewImage]);


  //
  // Photo editing
  //
  const [editingMode, setEditingMode] = React.useState(false);
  const toggleEditingMode = () => setEditingMode(!editingMode);


  //
  // Photo crop
  //
  const [cropMode, setCropMode] = React.useState(false);
  const toggleCropMode = () => setCropMode(!cropMode);
  const [selectedCrop, setSelectedCrop] = React.useState(null);
  const onCropComplete = (crop) => {
    setSelectedCrop(crop);
  };
  React.useEffect(() => {
    !cropMode && resetPreviewImage();
  }, [cropMode])


  //
  // Photo rotate
  //
  const [rotateMode, setRotateMode] = React.useState(false);
  const toggleRotateMode = () => setRotateMode(!rotateMode);
  const [angle, setAngle] = React.useState(0);
  const rotateToRight = () => {
    setAngle(angle - 90);
  }
  const rotateToLeft = () => {
    setAngle(angle + 90);
  }
  React.useEffect(() => {
    if(!rotateMode) {
      resetPreviewImage();
      setAngle(0);
    }
  }, [rotateMode])
  React.useEffect(() => {
    rotateMode && onRotateImage(angle);
  }, [angle]);


  //
  // Photo upload
  //
  const [uploadMode, setUploadMode] = React.useState(false);
  const toggleUploadMode = () => setUploadMode(!uploadMode);
  const onDropPhoto = React.useCallback(acceptedFiles => {
    if( acceptedFiles && acceptedFiles.length == 1 ) {
      return onUploadMemberImage(acceptedFiles[0]);
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop: onDropPhoto, accept: 'image/*'});
  React.useEffect(() => {
    setUploadMode(false);
  }, [imageSrc]);


  //
  // Decides wich commands should be shown
  //
  const getCommands = () => {
    const result = [];

    if( uploadMode ) {
      result.push(
        <Button name={t('BACK')} onClick={toggleUploadMode}/>
      );
    } 

    if( editingMode && !cropMode && !rotateMode) {
      result.push(
        <Button name={t('BACK')} onClick={toggleEditingMode}/>
      );
    }

    if( editingMode && cropMode ) {
      const imgChanged = (imageSrc.split('?')[0] !== previewImage.split('?')[0]);
      result.push(
        <Button name={t('BACK')} onClick={toggleCropMode}/>
      );

      if( selectedCrop !== null ) {
        if( imgChanged ) {
          result.push(
            <Button name={t('SAVE')} inverted onClick={() => onUploadMemberImage(previewImage)}/>
          );
        } else {
          result.push(
            <Button name={t('CROP_IMAGE')} onClick={() => onCropImage(selectedCrop)}/>
          );
        }
      }
    }

    if( editingMode && rotateMode ) {
      const imgChanged = (imageSrc.split('?')[0] !== previewImage.split('?')[0]);
      result.push(
        <Button name={t('BACK')} onClick={toggleRotateMode}/>
      );
      if( imgChanged ) {
        result.push(
          <Button name={t('SAVE')} inverted onClick={() => onUploadMemberImage(previewImage)}/>
        );
      }
    }

    if( !editingMode && !uploadMode){
      result.push(
        <Button name={t('UPLOAD_PHOTO')} onClick={toggleUploadMode}/>
      );
      if( !imageError &&  imageSrc && imageSrc.indexOf('dn2ppfvx6tfpw.cloudfront.net') > 0 ) {
        result.push(
          <Button name={t('EDIT_PHOTO')} onClick={toggleEditingMode}/>
        );
      }
    }
    return result;
  }

  //
  // Decides wich tools should be shown
  //
  const getTools = () => {
    const result = [];
    if( rotateMode ) {
      result.push(
        <IconButton aria-label="crop">
          <RotateRightIcon fontSize="large" onClick={rotateToLeft}/>
        </IconButton>
      );
      result.push(
        <IconButton aria-label="rotate">
          <RotateLeftIcon fontSize="large" onClick={rotateToRight}/>
        </IconButton>
      );
    } else {
      result.push(
        <IconButton aria-label="crop">
          <CropIcon fontSize="large" onClick={toggleCropMode}/>
        </IconButton>
      );
      result.push(
        <IconButton aria-label="rotate">
          <Rotate90DegreesCcwIcon fontSize="large" onClick={toggleRotateMode}/>
        </IconButton>
      );
    }

    return result;
  }

  //console.log("cropContainerHeight")
  //console.log(cropContainerHeight)
  //console.log("cropContainerWidth")
  //console.log(cropContainerWidth)

  return (
    <ImageEditor
      photoUrl={rotateMode ? previewImage : currentSrc}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
    >
      { loading &&
        <div className="loading-image">
          <CircularProgress size={100}/>
        </div>
      }
      { !uploadMode && !cropMode &&
        <div className="empty-image">
          <Icon name='file image outline' />
          {t( "profile_picture_size" )}
        </div>
      }
      { cropMode &&
        <StyledCropContainer
          containerHeight={cropContainerHeight}
          containerWidth={cropContainerWidth}
        >
          <CropImageContainer
            src={previewImage}
            onCropComplete={onCropComplete}
            crossorigin={null}

            containerHeight={cropContainerHeight}
            containerWidth={cropContainerWidth}
          />
        </StyledCropContainer>
      }
      { uploadMode &&
        <StyledDropContainer
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          {...getRootProps({isDragActive, isDragAccept, isDragReject})}
        >
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>{t("IS_DRAG_IMAGE_ACTIVE")}</p> :
              <p>{t("IS_DRAG_IMAGE_INACTIVE")}</p>
          }
        </StyledDropContainer>
      }
      { !uploadMode && !cropMode &&
        <div className="image-section">
          {editingMode &&
             getTools()
          }
        </div>
      }
      <div className="command-section">
        {getCommands()}
      </div>
    </ImageEditor>
  )
}
