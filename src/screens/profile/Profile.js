import * as React from "react";
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
  t,
  languages,
  member,
  loading,
  error,
  goBack,

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
  React.useEffect(() => {
    if( member ) {
      const {
        email,
        first_name,
        last_name,
        birthday,
        language,
        gender,
        phone_nr,
        note,
        country,
        zipcode,
        street,
        city,
      } = member;
      setEmail(email);
      setFirstName(first_name);
      setLastname(last_name);
      setBirthday(new Date(parseInt(birthday)));
      setLanguage(language);
      setGender(gender);
      setPhoneNumber(phone_nr);
      setNote(note);
      setCountry(country);
      setZipcode(zipcode);
      setStreet(street);
      setCity(city);
      setSaveButtonDisabled(true);
      setSaveAddressButtonDisabled(true);
    }
  }, [member]);
  // profile data
  const [email, setEmail] = React.useState('');
  const validateEmail = () => ({valid: true, error: null});

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastname] = React.useState('');
  const validateName = () => ({valid: true, error: null});

  const [birthday, setBirthday] = React.useState(null);
  const validateBirthday = () => ({valid: true, error: null});

  const [gender, setGender] = React.useState(0);
  const [language, setLanguage] = React.useState('EN');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [note, setNote] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [dataPrivacySigned, setDataPrivacySigned] = React.useState(false);
  const [accountStatus, setAccountStatus] = React.useState(0);

  const [saveButtonDisabled, setSaveButtonDisabled] = React.useState(true);
  const [saveAddressButtonDisabled, setSaveAddressButtonDisabled] = React.useState(true);

  const [emailValidation, setEmailValidation] = React.useState(validateEmail());
  const firstNameValidation = validateName();
  const lastNameValidation = validateName();
  const birthdayValidation = validateBirthday();

  //
  // Data protection dialog
  //
  const [dpDialogOpen, setDpDialogOpen] = React.useState(false);
  const toggleDpDialogOpen = () => setDpDialogOpen(!dpDialogOpen);

  React.useEffect(() => {
    if( email != member.email
      || lastName != member.last_name
      || firstName != member.first_name
      || language != member.language
      || gender != member.gender
      || phoneNumber != member.phone_nr
      || note != member.note
      || (birthday && birthday.getTime()) != parseInt(member.birthday)
    ) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }
  }, [
    email,
    firstName,
    lastName,
    birthday,
    language,
    gender,
    phoneNumber,
    note,
  ]);

  //
  // Status dialog
  //
  const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);
  const toggleStatusDialogOpen = () => setStatusDialogOpen(!statusDialogOpen);

  const onShowDataPrivaryStatus = () => {
    toggleDpDialogOpen();
  }

  const onShowMemberStatus = () => {
    toggleStatusDialogOpen();
  }

  React.useEffect(() => {
    if( country != member.country
      || zipcode != member.zipcode
      || street != member.street
      || city != member.city
    ) {
      setSaveAddressButtonDisabled(false);
    } else {
      setSaveAddressButtonDisabled(true);
    }
  }, [
    country,
    zipcode,
    street,
    city,
  ]);

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

  const {id, dpSigned, dpSignatureType} = member;

  React.useEffect(() => {
    if( updateMemberError ) {
      if( updateMemberError.message.indexOf("Validation error") > -1 ) {
        setEmail('');
        setEmailValidation({
          valid: false,
          error: t("duplicate error")
        });
      }
    }
  }, [updateMemberError])
  React.useEffect(() => {
    email && email.length > 0 && setEmailValidation(validateEmail());
  }, [email]);

  return(
  <Stage centered columns={2} padded name="stage">
    <div className="content-section">
      <CardSection id="section-personal">
        <CardHeader as='h3'>{t( "personal_data" )}</CardHeader>
        <StyledCard>
          <Card.Content style={{paddingTop: 0, paddingBottom: '1.5em'}}>
            <Form>
              <div className="user-identification">
                {t("CUSTOMER_ID")} <span>{id}</span>
              </div>
              <CardInput placeholder='Email' error={!emailValidation.valid}>
                <FormHeader>Email</FormHeader>
                <FormInput
                  name='email'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {
                  !emailValidation.valid &&
                  <StyledLabel color='red' pointing='left'>
                    {emailValidation.error}
                  </StyledLabel>
                }
              </CardInput>
              <CardInput placeholder={t( "first_name" )} error={!firstNameValidation.valid}>
                <FormHeader>{t( "first_name" )}</FormHeader>
                <FormInput
                  name='first_name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {
                  !firstNameValidation.valid &&
                  <StyledLabel color='red' pointing='left'>
                    {firstNameValidation.error}
                  </StyledLabel>
                }
              </CardInput>
              <CardInput placeholder={t( "last_name" )} error={!lastNameValidation.valid}>
                <FormHeader>{t( "last_name" )}</FormHeader>
                <FormInput
                  name='last_name'
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                />
                {
                  !lastNameValidation.valid &&
                  <StyledLabel color='red' pointing='left'>
                    {lastNameValidation.error}
                  </StyledLabel>
                }
              </CardInput>
              <CardDateInput
                placeholder={t( "birthday" )}
                error={!lastNameValidation.valid}
              >
                <FormHeader>{t( "birthday" )}</FormHeader>
                <MuiPickersUtilsProvider utils={DateFnsUtils} className="input-birthday">
                  <KeyboardDatePicker
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-birthday"
                    value={birthday}
                    onChange={(value) => {setBirthday(moment(value).toDate())}}
                    KeyboardButtonProps={{
                      'aria-label': 'change birthday',
                    }}
                  />
                </MuiPickersUtilsProvider>
                {
                  !lastNameValidation.valid &&
                  <StyledLabel color='red' pointing='left'>
                    {lastNameValidation.error}
                  </StyledLabel>
                }
              </CardDateInput>
              <CardInput>
                <FormHeader>{t( "gender" )}</FormHeader>
                <CardDropdown
                  placeholder={t( "gender" )}
                  fluid
                  selection
                  options={[
                    {
                      key: 'male',
                      text: t("male"),
                      value: 0,
                    }, {
                      key: 'female',
                      text: t("female"),
                      value: 1,
                    },
                  ]}
                  value={gender}
                  onChange={ (event, {value}) => setGender(value)}
                />
              </CardInput>
              <CardInput placeholder={t( "phone_nr" )} >
                <FormHeader>{t( "phone_nr" )}</FormHeader>
                <FormInput
                  name='phone_nr'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </CardInput>
              <CardInput placeholder={t( "note" )} >
                <FormHeader>{t( "note" )}</FormHeader>
                <FormInput
                  name='note'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </CardInput>
              <CardInput>
                <FormHeader>{t( "language" )}</FormHeader>
                <CardDropdown
                  placeholder={t( "language" )}
                  fluid
                  selection
                  options={languages}
                  value={language}
                  onChange={ (event, {value}) => setLanguage(value)}
                />
              </CardInput>
              <ColloredCardInput className="no-text">
                <FormHeader>{t( "DATA_PRIVACY" )}</FormHeader>
                <div onClick={onShowDataPrivaryStatus}>
                  <FormInput
                    className={member.dpSigned == 1 ? "green" : "yellow"}
                    name='data_privacy'
                    value={member.dpSigned == 1 ? t('DATA_PRIVACY_YES') : t('DATA_PRIVACY_NO')}
                    onChange={(e) => setNote(e.target.value)}
                    readonly=""
                    onClick={() => console.log("CLICK !")}
                  />
                </div>
              </ColloredCardInput>
              <ColloredCardInput className="no-text" >
                <FormHeader>{t( "ACCOUNT_STATUS" )}</FormHeader>
                <div onClick={onShowMemberStatus}>
                  <FormInput
                    className={member.status == 1 ? "green" : member.status == 0 ? "yellow" : "red"}
                    name='data_privacy'
                    value={member.status == 1 ? t('ACCOUNT_ACTIVE') : member.status == 0 ? t('ACCOUNT_INACTIVE') : t('EMAIL_INVALID')}
                    onChange={(e) => setNote(e.target.value)}
                    readonly=""
                  />
                </div>
              </ColloredCardInput>
              <CardButton
                disabled={updateMemberLoading || saveButtonDisabled}
                onClick={ () => onUpdateMember({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday,
                    gender: gender,
                    language: language,
                    phoneNumber: phoneNumber,
                    note: note,
                  })
                }
                name={t( "save" )}
                loading={updateMemberLoading}
              />
            </Form>
          </Card.Content>
        </StyledCard>
      </CardSection>

      <CardSection id="section-address">
        <CardHeader as='h3'>{t( "address" )}</CardHeader>
        <StyledCard>
          <Card.Content style={{paddingTop: 0, paddingBottom: '1.5em'}}>
            <Form>
              <CardInput
                placeholder={t( "street" )}
              >
                <FormHeader>{t( "street" )}</FormHeader>
                  <FormInput
                    type='text'
                    name="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder={t( "street" )}
                  />
              </CardInput>
              <CardInput
                placeholder={t( "zip_code" )}
              >
                <FormHeader>{t( "zip_code" )}</FormHeader>
                  <FormInput
                    type='text'
                    name="zip_code"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder={t( "zip_code" )}
                  />
              </CardInput>
              <CardInput
                placeholder={t( "city" )}
              >
                <FormHeader>{t( "city" )}</FormHeader>
                  <FormInput
                    type='text'
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t( "city" )}
                  />
              </CardInput>
              <CardInput>
                <FormHeader>{t( "country" )}</FormHeader>
                <CardDropdown
                  placeholder={t( "country" )}
                  fluid
                  search
                  selection
                  options={countries}
                  value={country}
                  onChange={ (event, {value}) => setCountry(value)}
                />
              </CardInput>

              <CardButton
                disabled={updateMemberAddressLoading || saveAddressButtonDisabled}
                onClick={ () => onUpdateMemberAddress({
                    country: country,
                    zipcode: zipcode,
                    street: street,
                    city: city,
                  })
                }
                name={t( "save" )}
                loading={updateMemberAddressLoading}
              />

            </Form>
          </Card.Content>
        </StyledCard>
      </CardSection>

      <CardSection id="section-photo">
        <CardHeader as='h3'>{t( "profile_picture" )}</CardHeader>
        <StyledCard>
          <Card.Content>
            <ImageEditor
              t={t}
              imageSrc={member.photoUrlFullSize}
              previewImage={previewImage}
              resetPreviewImage={resetPreviewImage}

              containerWidth={500}
              containerHeight={500}

              onUploadMemberImage={onUploadMemberImage}
              onCropImage={onCropImage}
              onRotateImage={onRotateImage}
              loading={loadingImage}
            />
          </Card.Content>
        </StyledCard>
      </CardSection>
    </div>

    <div className="navigation-section">
      <Scrollspy items={ ['section-personal', 'section-address', 'section-photo'] } className="navigation-panel">
        <ListItem button component="a" href="#section-personal">
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary={t("personal_data")} />
        </ListItem>
        <ListItem button component="a" href="#section-address">
          <ListItemIcon>
            <HomeWorkIcon />
          </ListItemIcon>
          <ListItemText primary={t("address")} />
        </ListItem>
        <ListItem button component="a" href="#section-photo">
        <ListItemIcon>
          <PhotoCameraIcon />
        </ListItemIcon>
          <ListItemText primary={t("profile_picture")} />
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
            { !dpSigned && t("DATA_PRIVACY_WARNING") }
            { dpSigned && dpSignatureType && t("DATA_PRIVACY_ON_DIGITAL") }
            { dpSigned && !dpSignatureType && t("DATA_PRIVACY_ON_CONTRACT") }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {
          dpSigned && <Button
            variant="contained"
            onClick={onRequestDataPrivacyDocument}
            endIcon={<GetAppIcon style={{ fontSize: 40 }}/>}
            autoFocus
          >
            {t("SHOW_DOCUMENT")  }
          </Button>
        }
        {
          !dpSigned && <Button
            variant="contained"
            onClick={onRequestDataPrivacySignature}
            endIcon={<AssignmentTurnedInIcon style={{ fontSize: 40 }}/>}
            autoFocus
          >
            {dpSignatureType ? t("CONTACT_GO_TO_DP_SETTINGS") : t("BACK")  }
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
          {member.status == -1 ? t("EMAIL_INVALID") : member.status == 1 ? t("ACCOUNT_ACTIVE") : t("ACCOUNT_INACTIVE")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {member.status == -1 ? t("EMAIL_INVALID_MESSAGE") : member.status == 1 ? t("ACCOUNT_ACTIVE_INFO") : t("ACCOUNT_INACTIVE_INFO") }
            {activationMailSent &&
              <div className="email-successfully-sent">
                {t("ACTIVATION_EMAIL_SUCCESSFULLY_SENT")}
              </div>
            }
            <div className="icon-section">
              { member.status == -1 &&
                <AlternateEmailIcon style={{ fontSize: 100 }} style={{color: "#db2828"}}/>
              }
              { (member.status == 1 || activationMailSent) &&
                <CheckCircleIcon style={{ fontSize: 100 }}/>
              }
              {  !activationMailSent && member.status == 0 &&
                <EmailIcon style={{ fontSize: 100 }} style={{color: "#FDB825"}}/>
              }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!activationMailSent &&
            <CardButton
              variant="contained"
              onClick={member.status == -1 ? toggleStatusDialogOpen : member.status == 1 ? toggleStatusDialogOpen : onSendActivationMail}
              endIcon={member.status == -1 ? <SendIcon style={{ fontSize: 40 }}/> : member.status == 1 ? <CheckIcon style={{ fontSize: 40 }}/> : <CheckIcon style={{ fontSize: 40 }}/>}
              autoFocus
              loading={sendActivationMailLoading}
              disabled={sendActivationMailLoading}
              name={member.status == 1 || member.status == -1 ? t("BACK") : t("SEND_ACTIVATION_MAIL") }
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
