import * as React from "react";
import { useTranslate } from '../../hooks/Translation';
import PropTypes from 'prop-types';
import moment from "moment";
import {
  Form,
  Card,
  Segment,
  Grid,
  Icon,
  Radio,
  List,
  Input,
  Label,
  Dropdown,
} from 'semantic-ui-react';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Scrollspy from 'react-scrollspy';
import CardButton from './Button';
import ImageEditor from '../../components/ImageEditor';

import Select from 'react-select';
import countryList from 'country-list';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../../components/LanistaButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';

import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckIcon from '@material-ui/icons/Check';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SendIcon from '@material-ui/icons/Send';
import EmailIcon from '@material-ui/icons/Email';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import DeleteIcon from '@material-ui/icons/Delete';
import TrafficIcon from '@material-ui/icons/Traffic';

import PersonalDataCard from './PersonalDataCard';
import AddressCard from './AddressCard';
import StatusCard from './StatusCard';

import {
  Stage,
  CenteredButton,
  StyledHeader,
  StyledHeaderCentered,
  FormHeader,
  FormInput,
  CardSection,
  FixedSection,
  CardHeader,
  StyledCard,
  CardInput,
  ColloredCardInput,
  CardDateInput,
  CardCheckbox,
  CardDropdown,
  StyledNavigationCard,
  ImageSegment,
  ToolsList,
  ListHeader,
  ListIcon,
  StyledLabel,
  LicenceField,
  StyledDataPrivacyDialog,
  StyledDeleteDialog,
} from './styles';

const countries = countryList.getData().map(country => ({
  key: country.code,
  text: country.name,
  value: country.code,
  flag: country.code.toLowerCase()
}))

const Profile = ({

  languages,
  loading,
  error,
  goBack,

  readyToSavePersonalData,

  email,
  setEmail,
  emailErrorMessage,

  firstName,
  setFirstName,
  firstNameErrorMessage,

  lastName,
  setLastName,
  lastNameErrorMessage,

  birthday,
  setBirthday,

  language,
  setLanguage,

  gender,
  setGender,

  readyToSaveAddress,

  phoneNumber,
  setPhoneNumber,

  country,
  setCountry,

  zipcode,
  setZipcode,

  street,
  setStreet,

  city,
  setCity,

  note,
  setNote,

  id,
  status,

  photoUrlFullSize,
  dpLocation,
  dataPrivacySigned,
  setDataPrivacySigned,

  dpSignaturePolicy,

  onUpdateMember,
  updateMemberLoading,
  updateMemberError,

  onUpdateMemberAddress,
  updateMemberAddressLoading,
  updateMemberAddressError,

  onRequestDataPrivacySignature,
  onRequestDataPrivacyDocument,
  dataPrivacyDocument,

  onSendActivationMail,
  sendActivationMailLoading,
  sendActivationMailError,

  onUploadMemberImage,
  uploadMemberImageLoading,
  uploadMemberImageError,

  previewImage,
  resetPreviewImage,
  onCropImage,
  onRotateImage,
  loadingImage,

  onDeleteMember,
  memberDeleted,

}) => {

  const {t} = useTranslate("profile");

  //
  // Status dialog
  //
  const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);
  const toggleStatusDialogOpen = () => setStatusDialogOpen(!statusDialogOpen);
  const onShowDataPrivaryStatus = () => {
    toggleDpDialogOpen();
  }


  //
  //  Data protectzion dialog
  //
  const [dpDialogOpen, setDpDialogOpen] = React.useState(false);
  const toggleDpDialogOpen = () => setDpDialogOpen(!dpDialogOpen);

  const onShowMemberStatus = () => {
    toggleStatusDialogOpen();
  }

  React.useEffect(() => {
    if(dataPrivacyDocument !== null) {
      var popup_window = window.open(dataPrivacyDocument,'_blank');
      try {
        popup_window.focus();
      } catch (e) {
          alert("Pop-up Blocker is enabled! Please add this site to your exception list.");
      }
    }
  }, dataPrivacyDocument);

  //
  // Send activation mail
  //
  const [activationMailSent, setActivationMailSent] = React.useState(false);
  React.useEffect(() => {
    if( !sendActivationMailLoading && statusDialogOpen) {
      setActivationMailSent(true);
    }
  }, [sendActivationMailLoading]);

  //
  // Delete customer
  //
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const toggleDeleteDialog = () => setDeleteDialog(!deleteDialog);

  const dpSignatureType = !(dpLocation === null);

  return(
  <Stage centered columns={2} padded name="stage">
    <div className="content-section">
      <PersonalDataCard

        id={id}

        onSave={onUpdateMember}
        loading={updateMemberLoading || loading}

        readyToSave={readyToSavePersonalData}

        email={email}
        setEmail={setEmail}
        emailErrorMessage={emailErrorMessage}

        firstName={firstName}
        setFirstName={setFirstName}
        firstNameErrorMessage={firstNameErrorMessage}

        lastName={lastName}
        setLastName={setLastName}
        lastNameErrorMessage={lastNameErrorMessage}

        birthday={birthday}
        setBirthday={setBirthday}

        birthday={birthday}
        setBirthday={setBirthday}

        language={language}
        setLanguage={setLanguage}

        gender={gender}
        setGender={setGender}

        note={note}
        setNote={setNote}

      />

      <CardSection id="section-photo">
        <CardHeader as='h3'>{t( "profile_picture" )}</CardHeader>
        <StyledCard>
          <Card.Content>
            <ImageEditor
              t={t}
              imageSrc={photoUrlFullSize}
              previewImage={previewImage}
              resetPreviewImage={resetPreviewImage}

              containerWidth={500}
              containerHeight={500}

              onUploadImage={onUploadMemberImage}
              onCropImage={onCropImage}
              onRotateImage={onRotateImage}
              loading={loadingImage}

              pictureMessage={'square image format'}
            />
          </Card.Content>
        </StyledCard>
      </CardSection>

      <StatusCard
        dataPrivacySigned={dataPrivacySigned}
        status={status}

        onShowDataPrivaryStatus={onShowDataPrivaryStatus}
        onShowMemberStatus={onShowMemberStatus}
      />

      <AddressCard

        onUpdate={onUpdateMemberAddress}
        loading={updateMemberAddressLoading || loading}

        readyToSave={readyToSaveAddress}

        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}

        country={country}
        setCountry={setCountry}

        zipcode={zipcode}
        setZipcode={setZipcode}

        street={street}
        setStreet={setStreet}

        city={city}
        setCity={setCity}

      />
    </div>

    <div className="navigation-section">
      <Scrollspy items={ ['section-personal', 'section-address', 'section-status', 'section-photo'] } className="navigation-panel">

        <ListItem button component="a" onClick={() => !window.cordova && window.location.replace("#section-personal")}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary={t("personal_data")} />
        </ListItem>

        <ListItem button component="a" onClick={() => !window.cordova && window.location.replace("#section-photo")}>
          <ListItemIcon>
            <PhotoCameraIcon />
          </ListItemIcon>
            <ListItemText primary={t("profile_picture")} />
        </ListItem>

        <ListItem button component="a"  onClick={() => !window.cordova && window.location.replace("#section-status")}>
          <ListItemIcon>
            <TrafficIcon />
          </ListItemIcon>
          <ListItemText primary={t("CUSTOMER_STATUS")} />
        </ListItem>

        <ListItem button component="a" onClick={() => !window.cordova && window.location.replace("#section-address")}>
          <ListItemIcon>
            <HomeWorkIcon />
          </ListItemIcon>
          <ListItemText primary={t("address")} />
        </ListItem>

        <ListItem button onClick={toggleDeleteDialog}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={t("DELETE_CUSTOMER")} />
        </ListItem>

      </Scrollspy>
    </div>

    { dpDialogOpen &&
      <StyledDataPrivacyDialog
        open={dpDialogOpen}
        onClose={toggleDpDialogOpen}
      >
        <DialogTitle id="alert-dialog-title">
          <IconButton color="primary" aria-label="close" component="span" onClick={toggleDpDialogOpen}>
            <CloseIcon />
          </IconButton>
          {t("DATA_PRIVACY")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { !dataPrivacySigned && t("DATA_PRIVACY_WARNING") }
            { dataPrivacySigned && dpSignaturePolicy > 0 && t("DATA_PRIVACY_ON_DIGITAL") }
            { dataPrivacySigned && dpSignaturePolicy == 0 && t("DATA_PRIVACY_ON_CONTRACT") }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {
          dataPrivacySigned && <Button
            variant="contained"
            onClick={onRequestDataPrivacyDocument}
            endIcon={<GetAppIcon style={{ fontSize: 40 }}/>}
            autoFocus
          >
            {t("SHOW_DOCUMENT")  }
          </Button>
        }
        {
          !dataPrivacySigned && <Button
            variant="contained"
            onClick={onRequestDataPrivacySignature}
            endIcon={<AssignmentTurnedInIcon style={{ fontSize: 40 }}/>}
            autoFocus
          >
            {t("CONTACT_GO_TO_DP_SETTINGS")}
          </Button>
        }
        </DialogActions>
      </StyledDataPrivacyDialog>
    }


    { statusDialogOpen &&
      <StyledDataPrivacyDialog
        open={statusDialogOpen}
        onClose={toggleStatusDialogOpen}
      >
        <DialogTitle id="alert-dialog-title">
          <IconButton color="primary" aria-label="close" component="span" onClick={toggleStatusDialogOpen}>
            <CloseIcon />
          </IconButton>
          {status == -1 ? t("EMAIL_INVALID") : status == 1 ? t("ACCOUNT_ACTIVE") : t("ACCOUNT_INACTIVE")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {status == -1 ? t("EMAIL_INVALID_MESSAGE") : status == 1 ? t("ACCOUNT_ACTIVE_INFO") : t("ACCOUNT_INACTIVE_INFO") }
            {activationMailSent &&
              <div className="email-successfully-sent">
                {t("ACTIVATION_EMAIL_SUCCESSFULLY_SENT")}
              </div>
            }
            <div className="icon-section">
              { status == -1 &&
                <AlternateEmailIcon style={{ fontSize: 100 }} style={{color: "#db2828"}}/>
              }
              { (status == 1 || activationMailSent) &&
                <CheckCircleIcon style={{ fontSize: 100 }}/>
              }
              {  !activationMailSent && status == 0 &&
                <EmailIcon style={{ fontSize: 100 }} style={{color: "#FDB825"}}/>
              }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!activationMailSent &&
            <CardButton
              variant="contained"
              onClick={status == -1 ? toggleStatusDialogOpen : status == 1 ? toggleStatusDialogOpen : onSendActivationMail}
              endIcon={status == -1 ? <SendIcon style={{ fontSize: 40 }}/> : status == 1 ? <CheckIcon style={{ fontSize: 40 }}/> : <CheckIcon style={{ fontSize: 40 }}/>}
              autoFocus
              loading={sendActivationMailLoading}
              disabled={sendActivationMailLoading}
              name={status == 1 ||status == -1 ? t("BACK") : t("SEND_ACTIVATION_MAIL") }
            />
          }
          {activationMailSent &&
            <CardButton
              variant="contained"
              onClick={toggleStatusDialogOpen}
              endIcon={<CheckIcon style={{ fontSize: 40 }}/>}
              autoFocus
              name={t("BACK")}
            />
          }

        </DialogActions>
      </StyledDataPrivacyDialog>
    }

    { deleteDialog &&
      <StyledDeleteDialog
        open={deleteDialog}
        onClose={toggleDeleteDialog}
      >
        <DialogTitle>
          {t("DELETE_CUSTOMER")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { memberDeleted ? t("DELETE_SUCCESSFULL") : t("DELETE_CUSTOMER_TEXT") }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          { !memberDeleted &&
            <>
              <Button
                variant="contained"
                onClick={toggleDeleteDialog}
                autoFocus
              >
                {t("BACK")  }
              </Button>
              <Button
                variant="contained"
                onClick={onDeleteMember}
                autoFocus
              >
                {t("DELETE_CUSTOMER")  }
              </Button>
            </>
          }
          { memberDeleted &&
            <>
              <Button
                variant="contained"
                onClick={goBack}
                autoFocus
              >
                {t("GO_BACK")  }
              </Button>
            </>
          }

        </DialogActions>
      </StyledDeleteDialog>
    }
  </Stage>
  );
};

Profile.propTypes = {
  /**
   * Function to translate content
  */
  t: PropTypes.func,

  /**
   * All available lenguages in lanista
  */
  languages: PropTypes.array,

  /**
   * All avilable member information
  */
  member: PropTypes.object,

  /**
   * Graphql loading flag for data loading
  */
  loading: PropTypes.bool,

  /**
   * Graphql error object
  */
  error: PropTypes.object,

  /**
   * Navigate back in the browser history
  */
  goBack: PropTypes.func,

  /**
   * This function synchronize the member data with the server
  */
  onUpdateMember: PropTypes.func,

  /**
   * Graphql loading flag for the function onUpdateMember
  */
  updateMemberLoading: PropTypes.bool,

  /**
   * Grahql error object for the function onUpdateMember
  */
  updateMemberError: PropTypes.object,

  /**
   * This function synchronize the address data with the server
  */
  onUpdateMemberAddress: PropTypes.func,

  /**
   * Graphql loading flag for the function onUpdateMemberAddress
  */
  updateMemberAddressLoading: PropTypes.bool,

  /**
   * Grahql error object for the function onUpdateMemberAddress
  */
  updateMemberAddressError: PropTypes.object,

  /**
   * This function sends the customer signature to the server and generates a pdf document
  */
  onRequestDataPrivacySignature: PropTypes.func,

  /**
   * This function returns an url with the current pdf document with the customer signature
  */
  onRequestDataPrivacyDocument: PropTypes.func,

  /**
   * This variable contains the current url for the data privacy document
  */
  dataPrivacyDocument: PropTypes.string,

  /**
   * Send an activation mail to the customer
  */
  onSendActivationMail: PropTypes.func,

  /**
   * Graphql loading flag for the function onSendActivationMail
  */
  sendActivationMailLoading: PropTypes.bool,

  /**
   * Graphql error object for the function onSendActivationMail
  */
  sendActivationMailError: PropTypes.object,

  /**
   * Function to update the member image on the s3 buckent on aws
  */
  onUploadMemberImage: PropTypes.func,

  /**
   * Loading flag for the function onUploadMemberImage
  */
  uploadMemberImageLoading: PropTypes.bool,

  /**
   * Error object for the function onUploadMemberImage
  */
  uploadMemberImageError: PropTypes.object,

  /**
   * URL to the modified current member  image
  */
  previewImage: PropTypes.string,

  /**
   * This function restore to the original image size and rotation
  */
  resetPreviewImage: PropTypes.func,

  /**
   * This function crop the member image
  */
  onCropImage: PropTypes.func,

  /**
   * This function rotates the member image
  */
  onRotateImage: PropTypes.func,

  /**
   * Graphql loading app when the customer images is reloaded
  */
  loadingImage: PropTypes.bool,

  /**
   * This function disconect a member from the gym
  */
  onDeleteMember: PropTypes.func,

  /**
   * This flag signalizes when the customer have been disconected from the gym
  */
  memberDeleted: PropTypes.bool,
};

export default Profile;
