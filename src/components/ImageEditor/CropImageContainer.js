import React, { useCallback, useState, useEffect  } from 'react';
import ReactCrop from 'react-image-crop';

export default ({
  src,
  onCropComplete,
  setCropImage,
  containerHeight,
  containerWidth
}) => {
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 50 / 50 });
  const [img, setImg] = useState(null);
  const onImageLoaded = i => {
    console.log("onImageLoaded")
    console.log(i)
    setImg(i);
  };

  return <ReactCrop
    src={src}
    onImageLoaded={onImageLoaded}
    crop={crop}
    onChange={c => setCrop(c)}
    onComplete={(c) => {
      const {naturalWidth, naturalHeight} = img ? img : {};
      img && onCropComplete({
        x: naturalWidth / containerWidth * c.x,
        y: naturalHeight / containerHeight * c.y,
        width: naturalWidth / containerWidth * c.width,
        height: naturalHeight / containerHeight * c.height,
      });
    }}
  />
}
