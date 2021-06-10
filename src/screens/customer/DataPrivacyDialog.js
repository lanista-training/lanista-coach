import React, { Component } from 'react';

import {StyledDataPrivacyDialog} from './styles';

import SignaturePad from 'react-signature-pad-wrapper'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import TouchAppIcon from '@material-ui/icons/TouchApp';
import PrintIcon from '@material-ui/icons/Print';
import GetAppIcon from '@material-ui/icons/GetApp';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';



function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

export default ({
  dpDialogOpen,
  toggleDpDialogOpen,

  // Step 1
  dpPreviewGenerated,
  setDpPreviewGenerated,

  // Step 2
  dpDocumentSigned,
  setDpDocumentSigned,

  // Step 3
  dpFinalWarningExecuted,
  setDpFinalWarningExecuted,

  onRequestDataPrivacyDocument,
  requestDataPrivacyDocumentLoading,
  requestDataPrivacyDocumentError,

  onDataPrivacyDocumentSigned,
  dataPrivacyDocumentSignedLoading,
  dataPrivacyDocumentSignedError,

  onUploadSignature,
  uploadSignatureLoading,
  uploadSignatureError,

  firstName,
  lastName,
  dataPrivacyDocument,
  t,
}) => {

  //
  // Step
  //
  const [step, setStep] = React.useState(0);
  const forward = () => setStep(step + 1);
  const backwards = () => setStep(step > 0 ? step - 1 : 0);

  //
  // Signing type
  //
  const DIGITAL   = 1;
  const ANALOG    = 0;
  const [signatureType, setSignatureType] = React.useState(DIGITAL);


  // Reference to Signature Pad
  const inputEl = React.useRef(null);

  // Step constants
  const steps = signatureType == ANALOG ? [
    t("DATA_PROTECTION_ANALOG_STEP_1"), t("DATA_PROTECTION_ANALOG_STEP_2"), t("DATA_PROTECTION_ANALOG_STEP_3")
  ] : [
    t("DATA_PROTECTION_ANALOG_STEP_1"), t("DATA_PROTECTION_ANALOG_STEP_2"), t("DATA_PROTECTION_DIGITAL_STEP_3")
  ] ;

  console.log("STEP")
  console.log(step)

  //
  // reset signature pad
  //
  const[signatureAvailable, setSignatureAvailable] = React.useState(false);
  React.useEffect(() => {
    step == 2 && setSignatureAvailable(false);
  }, [step])

  // State mamagement
  React.useEffect(() => {
    if(dpPreviewGenerated && dataPrivacyDocument) {
      window.cordova && window.cordova.InAppBrowser ? window.cordova.InAppBrowser.open(dataPrivacyDocument, '_system') : window.open(dataPrivacyDocument, '_blank');
    }
  }, [dpPreviewGenerated, dataPrivacyDocument]);

  React.useState(() => {
    if(step == 2) {
      setDpPreviewGenerated(false);
    }
  }, [step]);

  React.useEffect(() => {
    if(dpPreviewGenerated) {
      if(signatureType == DIGITAL && step == 4) {
        // DO NOTHING
      } else {
        setStep(3);
      }
    }
  }, [dpPreviewGenerated]);

  React.useEffect(() => {
    if(dpDocumentSigned) {
      setStep(4);
    }
  }, [dpDocumentSigned]);

  return (
    <StyledDataPrivacyDialog
      open={dpDialogOpen}
      onClose={toggleDpDialogOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <IconButton color="primary" aria-label="close" component="span" onClick={toggleDpDialogOpen} >
          <CloseIcon fontSize="large" />
        </IconButton>
        {t("DATA_PRIVACY")}
        { step > 0 &&
          <IconButton color="primary" aria-label="back" component="span" onClick={backwards} >
            <ArrowBackIosIcon fontSize="large" />
          </IconButton>
        }
      </DialogTitle>

      {step > 1 &&
        <Stepper activeStep={step - 2}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      }


      { step == 0 &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("DATA_PRIVACY_WARNING")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleDpDialogOpen} color="primary">
              {t("CANCEL")}
            </Button>
            <Button onClick={forward} color="primary" autoFocus>
              {t("DATA_PRAVACY_REDIRECT")}
            </Button>
          </DialogActions>
        </>
      }

      { step == 1 &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("DATA_PRIVACY_DESCRIPTION")}
            </DialogContentText>
          </DialogContent>
          <DialogContent className="options-section">
            <Button
              variant="contained"
              onClick={ () => {
                setSignatureType(DIGITAL);
                forward();
              }}
              endIcon={<TouchAppIcon style={{ fontSize: 40 }}/>}
              autoFocus
            >
              {t("DATA_PRIVACY_OPTION_DIGITAL")}
            </Button>
            <Button
              variant="contained"
              onClick={ () => {
                console.log("SETING ANALOG OPTION")
                setSignatureType(ANALOG);
                forward();
              }}
              endIcon={<PrintIcon style={{ fontSize: 40 }}/>}
            >
              {t("DATA_PRIVACY_OPTION_ANALOG")}
            </Button>
          </DialogContent>
        </>
      }

      { step == 2 && signatureType === ANALOG &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("DATA_PRIVACY_PDF_HANDLING")}
            </DialogContentText>
          </DialogContent>
          <DialogContent className="options-section">
            <Button
              variant="contained"
              disabled={requestDataPrivacyDocumentLoading}
              onClick={() => {
                onRequestDataPrivacyDocument();
              }}
              endIcon={<GetAppIcon style={{ fontSize: 40 }}/>}
              autoFocus
            >
              {t("DOCUMENT_DOWNLOAD")}
            </Button>
          </DialogContent>
        </>
      }

      { step == 3 && signatureType === ANALOG &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className="warning-text">
              {t("DATA_PRIVACY_TRAINER_CONFIRMATION_1")} {firstName} {lastName}   {t("DATA_PRIVACY_TRAINER_CONFIRMATION_2")}
            </DialogContentText>
          </DialogContent>
          <DialogContent className="options-section">
            <Button
              variant="contained"
              onClick={onDataPrivacyDocumentSigned}
              endIcon={<BorderColorIcon style={{ fontSize: 40 }}/>}
              autoFocus
            >
              {t("DATA_PRIVACY_DOCUMENT_SIGNED")}
            </Button>
          </DialogContent>
        </>
      }

      { step == 4 && signatureType === ANALOG &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("DATA_PRIVACY_DUCUMENT_SIGNED_SUCCESSFULLY")}
            </DialogContentText>
          </DialogContent>
          <DialogContent className="options-section">
            <Button
              variant="contained"
              onClick={forward}
              endIcon={<CheckCircleOutlineIcon style={{ fontSize: 40 }}/>}
              autoFocus
            >
              {t("DATA_PRIVACY_AGREE")}
            </Button>
          </DialogContent>
        </>
      }

      { step == 5 && signatureType === ANALOG &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("DATA_PRIVACY_FINAL_MESSAGE")}
            </DialogContentText>
          </DialogContent>
          <DialogContent className="options-section">
            <Button
              variant="contained"
              onClick={toggleDpDialogOpen}
              endIcon={<CloseIcon style={{ fontSize: 40 }}/>}
              autoFocus
            >
              {t("CLOSE")}
            </Button>
          </DialogContent>
        </>
      }

      { step == 2 && signatureType == DIGITAL &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("DATA_PRIVACY_DIGITAL_SIGN_HANDLING")}
            </DialogContentText>
          </DialogContent>
          <DialogContent className="options-section">
            <Button
              variant="contained"
              disabled={requestDataPrivacyDocumentLoading}
              onClick={() => {
                onRequestDataPrivacyDocument();
              }}
              endIcon={<GetAppIcon style={{ fontSize: 40 }}/>}
              autoFocus
            >
              {t("DOCUMENT_DOWNLOAD")}
            </Button>
          </DialogContent>
        </>
      }

      { step == 3 && signatureType == DIGITAL &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className="warning-text">
              {t("DATA_PRIVACY_DIGITAL_SIGN_HANDLING_1")} {firstName} {lastName} {t("DATA_PRIVACY_DIGITAL_SIGN_HANDLING_2")}
            </DialogContentText>
            <SignaturePad
              ref={inputEl}
              options={{onEnd: () => {
                console.log("onEnd");
                setSignatureAvailable(true);
              }}}
            />
          </DialogContent>
          <DialogContent className="options-section">
            { !signatureAvailable &&
              <DialogContentText id="alert-dialog-description">
                {t('DATA_PRIVACY_USE_PAD')}
              </DialogContentText>
            }
            { signatureAvailable &&
              <>
                <Button
                  variant="contained"
                  onClick={ () => {
                    inputEl.current.clear();
                    setSignatureAvailable(false);
                  }}
                  endIcon={<HighlightOffIcon style={{ fontSize: 40 }}/>}
                >
                  {t("DATA_PRIVACY_ERASE_SIGNATURE")}
                </Button>
                <Button
                  variant="contained"
                  onClick={ () => {
                    const dataUrl = inputEl.current.toDataURL();
                    onUploadSignature(dataUrl);
                  }}
                  endIcon={<SendIcon style={{ fontSize: 40 }}/>}
                >
                  {t("DATA_PRIVACY_SEND_SIGNATURE")}
                </Button>
              </>
            }
          </DialogContent>
        </>
      }

      { step == 4 && signatureType == DIGITAL &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("DATA_PRIVACY_DIGITAL_SIGNATURE_SENT_SUCCESSFULLY")}
            </DialogContentText>
          </DialogContent>
          <DialogContent className="options-section">
            <Button
              variant="contained"
              disabled={requestDataPrivacyDocumentLoading}
              onClick={() => {
                onRequestDataPrivacyDocument();
              }}
              endIcon={<GetAppIcon style={{ fontSize: 40 }}/>}
              autoFocus
            >
              {t("DOCUMENT_DOWNLOAD")}
            </Button>
            <Button
              variant="contained"
              onClick={forward}
              endIcon={<CheckCircleOutlineIcon style={{ fontSize: 40 }}/>}
              autoFocus
            >
              {t("MEMBER_INFORMED")}
            </Button>
          </DialogContent>
        </>
      }

      { step == 5 && signatureType === DIGITAL &&
        <>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("DATA_PRIVACY_FINAL_MESSAGE")}
            </DialogContentText>
          </DialogContent>
          <DialogContent className="options-section">
            <Button
              variant="contained"
              onClick={toggleDpDialogOpen}
              endIcon={<CloseIcon style={{ fontSize: 40 }}/>}
              autoFocus
            >
              {t("CLOSE")}
            </Button>
          </DialogContent>
        </>
      }

    </StyledDataPrivacyDialog>
  )

}
