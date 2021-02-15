import * as React from "react";
import QRCode from 'qrcode.react';
import Button from '../LanistaButton';
import {StyledDialog} from "./styles";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  t,
  workoutChanellUrl,
  open,
  onClose,
 }) => {

   const textAreaRef =React.useRef(null);
   const [linkCoppied, setLinkCoppied] = React.useState(false);

  return (
    <StyledDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="info-section">
        <div className="link-section">
          <div className="link" id="link-url">
            <textarea
              ref={textAreaRef}
              value={workoutChanellUrl}
            />
          </div>
          <Button
            variant="extended"
            size="small"
            className="negative"
            onClick={(e) => {
              textAreaRef.current.select();
              document.execCommand('copy');
              e.target.focus();
              setLinkCoppied(true);
            }}
          >
            {linkCoppied ?t("link coppied") :  t("copy link")}
          </Button>
        </div>
        <div className="qr-code-section">
          <QRCode
            id="qr-code-canvas"
            value={workoutChanellUrl}
          />
          <Button
            variant="extended"
            size="small"
            className="negative"
            onClick={() => {
              var canvas = document.getElementById("qr-code-canvas");
              var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
              window.location.href = image;
            }}
          >
            {t("download qr code")}
          </Button>
        </div>
      </div>
      <div className="action-buttons">
        <Fab
          variant="extended"
          size="small"
          className="negative"
          onClick={onClose}
        >
          {t("back")}
        </Fab>
        <div className="button-wrapper">
          <Fab
            variant="extended"
            size="small"
            className="positive"
            onClick={ () => {
              (window.cordova && window.cordova.InAppBrowser) ? window.cordova.InAppBrowser.open(workoutChanellUrl, '_system') : window.open(workoutChanellUrl, '_blank');
            }}
          >
            {t("visit website")}
          </Fab>
        </div>
      </div>
    </StyledDialog>
  )
};
