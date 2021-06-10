import React, { useCallback, useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';
import {ImageEditor, StyledDropContainer, StyledCropContainer} from './styles';
import IconButton from '@material-ui/core/IconButton';
import CropIcon from '@material-ui/icons/Crop';
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { Icon } from 'semantic-ui-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';

import ImgDialog from './ImgDialog'
import getCroppedImg from './cropImage';

import Button from './Button';

//
// Decides wich commands should be shown
//
const getCommands = ({
  t,
  imgChanged,
  uploadMode,
  editingMode,
  startInEditingMode,
  toggleEditingMode,

  onEnd,
  toggleUploadMode,
  showCroppedImage,
  imageError,
}) => {
  const result = [];

  if( uploadMode ) {
    result.push(
      <Button name={t('BACK')} onClick={toggleUploadMode}/>
    );
  } else {
    if( !imgChanged ) {
      result.push(
        <Button name={t('UPLOAD_PHOTO')} onClick={toggleUploadMode}/>
      );
    }
    if( !editingMode && !imageError) {
      result.push(
        <Button name={t('EDIT')} onClick={toggleEditingMode}/>
      )
    } else if( !imageError ) {
      result.push(
        <Button name={t('BACK')} onClick={editingMode && !startInEditingMode ? toggleEditingMode : onEnd}/>
      )
    }

    if( imgChanged && editingMode) {
      result.push(
        <Button name={t('PREVIEW')} onClick={showCroppedImage}/>
      )
    }
  }

  return result;
}

export default ({
  t,
  aspect,
  pictureMessage,

  imageSrc,
  previewImage,
  resetPreviewImage,

  containerHeight,
  containerWidth,

  onUploadImage,

  onStartEditing,
  onEndEditing,

  loading,
  notEditable,

  onEnd,
  startInEditingMode,
}) => {

  const [imageError, setImageError] = useState(false);
console.log("containerHeight", containerHeight)
console.log("containerWidth", containerWidth)
  useEffect(() => {
    onClose();
    setUploadMode(false);
    setZoom(1);
    setRotation(0);
    setCrop({
      x: 0,
      y: 0,
    });
    setImageChange(false);
    if(imageSrc) {
      const imgTest = document.createElement('img');
      imgTest.src = imageSrc;
      imgTest.onload = function() {
        setImageError(false);
      };
      imgTest.onerror = function() {
        setImageError(true);
      };
    } else {
      setImageError(true);
    }
  }, [imageSrc]);

  //
  // Fix status bar bug after camera is shown
  //
  const fixStatusBar = () => {
    if( window.cordova ) {
      window.StatusBar.hide();
      window.StatusBar.show();
    }
  }

  //
  // Photo upload
  //
  const [uploadMode, setUploadMode] = React.useState(false);
  const toggleUploadMode = () => setUploadMode(!uploadMode);
  const onDropPhoto = React.useCallback(acceptedFiles => {
    fixStatusBar();
    if( acceptedFiles && acceptedFiles.length == 1 ) {
      return onUploadImage(acceptedFiles[0]);
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop: onDropPhoto, accept: 'image/*', onFileDialogCancel: fixStatusBar});

  //
  // Photo editing
  //
  const [editingMode, setEditingMode] = React.useState(startInEditingMode ? true : false);
  const toggleEditingMode = () => setEditingMode(!editingMode);
  const [imgChanged, setImageChange] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  useEffect(() => {
    if( crop.x !== 0 || crop.y !== 0 || zoom !== 1 || rotation !== 0){
      setImageChange(true);
    } else {
      setImageChange(false);
    }
  }, [crop.x, crop.y , zoom, rotation]);

  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setCrop({
      x: 0,
      y: 0,
    })
    if( crop.x !== 0 || crop.x !== 0 || zoom !== 1 || rotation !== 0){
      setImageChange(true);
    } else {
      setImageChange(false);
    }
  }, [editingMode]);

  const onSaveImage = () => {
    console.log("onSaveImage")
  }

  return (
    <ImageEditor
      containerWidth={containerWidth}
      containerHeight={containerHeight}
    >
      { loading &&
        <div className="loading-image">
          <CircularProgress size={100}/>
        </div>
      }
      <div className="empty-image">
        <Icon name='file image outline' />
        {t( pictureMessage )}
      </div>
      { uploadMode &&
        <StyledDropContainer
          containerWidth={containerWidth}
          containerHeight={containerHeight-220}
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
      { !uploadMode &&
        <div className="image-section" style={{backgroundImage: 'url(' + imageSrc + ')'}}>
          { !imageError && editingMode &&
            <>
              <div className="crop-container">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={ aspect ? aspect : 1 / 1 }
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="controls">
                <div className="image-controlls">
                  <div className="slider-container">
                    <div className="slider-title">
                      {t("zoom")}
                    </div>
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                      classes={{ root: 'slider' }}
                    />
                  </div>
                  <div className="slider-container">
                    <div className="slider-title">
                      {t("rotation")}
                    </div>
                    <Slider
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      aria-labelledby="Rotation"
                      onChange={(e, rotation) => setRotation(rotation)}
                    />
                  </div>
                  <ImgDialog
                    img={croppedImage}
                    onClose={onClose}
                    onUploadImage={onUploadImage}
                    loading={loading}
                  />
                </div>
              </div>
            </>
          }
        </div>
      }
      <div className="commands">
        {getCommands({
            t,
            imgChanged,
            uploadMode,
            editingMode,
            startInEditingMode,

            onEnd,
            toggleUploadMode,
            showCroppedImage,
            toggleEditingMode,
            imageError,
          }
        )}
      </div>
    </ImageEditor>
  )
}
