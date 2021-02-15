import React, { useEffect, useState, useRef } from 'react';

import { CREATEMEMBER, SENDINVITATION } from "../../mutations";
import { withApollo } from '../../lib/apollo';
import { useMutation } from '@apollo/react-hooks';

import {StyledCreateCustomerDialog} from './styles';
import Button from '../../components/LanistaButton';
import Form from '../../components/LanistaForm';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';

export default withApollo(({
  t,
  open,
  onClose,
  showCustomer,

  toggleLicenceExpiredWarning,
}) => {

  const emailInputField = useRef(null);

  //
  // CREATE MEMBER DATA HANDLING
  //
  const [newMemberId, setNewMemberid] = React.useState(0);
  const [createMember, {
    loading,
    error,
  }] = useMutation(
    CREATEMEMBER,
    {
      update(cache,  { data: {createMember} }) {
        if( createMember.success && createMember.user && createMember.user.id > 0 ) {
          setNewMemberid(createMember.user.id);
        }
      }
    }
  );
  const onCreateMember = (email, firstName, lastName) => {
    setNewMemberid(0);
    createMember({
      variables: {
        email: email,
        firstName: firstName,
        lastName: lastName,
      }
    })
  }

  //
  // SEND INVITATION
  //
  const [invitationSent, setInvitationSent] = React.useState(false);
  const [sendInvitation, {
    sendInvitationLoading,
    sendInvitationError,
  }] = useMutation(
    SENDINVITATION,
    {
      update(cache,  { data: {sendInvitation} }) {
        if( sendInvitation.success ) {
          setInvitationSent(true);
        }
      }
    }
  );

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmailValid(email.match(mailformat));
    setEmailError(null);
  }, [email]);

  useEffect(() => {
    setNameValid(firstName.trim() !== '' || lastName.trim() !== '');
  }, [firstName, setLastName]);

  const checkEmailValidation = () => {
    if(email.length > 0 && !emailValid) {
      setEmailError(t("EMAIL_INVALID"));
    } else {
      setEmailError(null);
    }
  }

  const onChangeEmail = () => {
    setEmail('');
    setEmailError(null);
    emailInputField.current.focus();
  }

  const onSendInvitation = () => {
    console.log("onSendInvitation")
    setEmailError(null);
    sendInvitation({
      variables: {
        to: email,
      }
    })
  }

  useEffect(() => {
    if( error && error.message.indexOf('LICENCEINVALID') > -1 ) {
      toggleLicenceExpiredWarning();
    }
  }, [error]);

  const getDialogMessage = () => {
    if(loading || sendInvitationLoading) {
      return (<div className="loading-section"><CircularProgress /></div>)
    }
    if( invitationSent ) {
      return (
        <>
          <div className="message-section-title">{t("SEND_INVITATION_TITLE")}</div>
          <div className="message-section-content">{t("SEND_INVITATION_CONTENT")}</div>
        </>
      )
    }
    if( emailError && error && error.message.indexOf('DUPLICATEERROR') > -1 ) {
      return (
        <>
          <div className="message-section-title">{t("DUPLICATE_CREATE_ERROR_TITLE")}</div>
          <div className="message-section-content">{t("DUPLICATE_CREATE_ERROR_MESSAGE").split('<br>').map(line => <div className="line">{line}</div>)}</div>
        </>
      )
    }
    if( emailError && error && error.message.indexOf('USERNOTELEGIBLE') > -1 ) {
      return (
        <>
          <div className="message-section-title">{t("DUPLICATE_CREATE_ERROR_TITLE")}</div>
          <div className="message-section-content">{t("USERNOTELEGIBLE_CREATE_ERROR_MESSAGE")}</div>
        </>
      )
    }
    if( newMemberId > 0 ) {
      return (
        <>
          <div className="message-section-title">{t("SUCCESS_TITLE")}</div>
          <div className="message-section-content">{t("SUCCESS_MESSAGE")}</div>
        </>
      )
    }
    return (
      <>
        <div className="message-section-title">{!nameValid ? t("MSG_CREATE_CUSTOMER_TITLE") : t("MSG_EMAIL_WARNING_TITLE")}</div>
        <div className="message-section-content">{!nameValid ? t("MSG_CREATE_CUSTOMER") : t("MSG_EMAIL_WARNING_MESSAGE")}</div>
      </>
    )
  }

  const getDialogButtons = () => {
    if( emailError && error && (error.message.indexOf('DUPLICATEERROR') > -1 || error.message.indexOf('USERNOTELEGIBLE') > -1 )) {
      if( error.message.indexOf('USERNOTELEGIBLE') > -1 ) {
        return (
          <>
            <Button
              onClick={onChangeEmail}
              color="primary"
              disabled={loading}
            >
              {t("CHANGE_EMAIL")}
            </Button>
            <Button
              onClick={onClose}
              color="primary"
            >
              {t("CLOSE")}
            </Button>
          </>
        )
      }
      return (
        <>
          <Button
            onClick={onChangeEmail}
            color="primary"
            disabled={loading}
          >
            {t("CHANGE_EMAIL")}
          </Button>
          <Button
            onClick={onSendInvitation}
            color="primary"
            autoFocus
            disabled={ loading }
          >
            {t("SEND_INVITATION")}
          </Button>
        </>
      )
    }
    if( invitationSent ) {
      return (
        <>
          <Button
            onClick={onClose}
            color="primary"
          >
            {t("CLOSE")}
          </Button>
        </>
      )
    }
    if( newMemberId !== 0 ) {
      return (
        <>
          <Button
            onClick={onClose}
            color="primary"
          >
            {t("CLOSE")}
          </Button>
          <Button
            onClick={ () => showCustomer(newMemberId) }
            color="primary"
            disabled={loading}
          >
            {t("SHOW_CUSTOMER")}
          </Button>
        </>
      )
    }
    return (
      <>
        <Button
          onClick={onClose}
          color="primary"
          disabled={loading}
        >
          {t("ABORT")}
        </Button>
        <Button
          onClick={() => onCreateMember(email, firstName, lastName)}
          color="primary"
          autoFocus
          disabled={ loading || (!emailValid && !nameValid) || (email.length > 0 && !emailValid)}
        >
          {t("ADD_CUSTOMERS")}
        </Button>
      </>
    )
  }

  useEffect(() => {
    console.log("useEffect error")
    if(error) {
      console.log("ERROR")
      console.log(error.message)
      if( error.message.indexOf('DUPLICATEERROR') > -1 ) {
        setEmailError(t("DUPLICATE_CREATE_ERROR"));
      }
      if( error.message.indexOf('USERNOTELEGIBLE') > -1 ) {
        setEmailError(t("USERNOTELEGIBLE_CREATE_ERROR"));
      }
    }
  },[error]);

  return (
    <StyledCreateCustomerDialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle id="alert-dialog-title">{t("CREATE_CUSTOMER")}</DialogTitle>
      <DialogContent>
        <div className="form-section">
          <Form noValidate autoComplete="off">
            <TextField
              id="user-email"
              label={t("EMAIL")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              autoFocus={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              onBlur={checkEmailValidation}
              error={emailError !== null}
              helperText={emailError}
              disabled={loading || (newMemberId && newMemberId.length > 0)}
              ref={emailInputField}
            />
            <TextField
              id="user-first-name"
              label={t("FIRST_NAME")}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                ),
              }}
              disabled={loading || (newMemberId && newMemberId.length > 0)}
            />
            <TextField
              id="user-last-name"
              label={t("LAST_NAME")}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                ),
              }}
              disabled={loading || (newMemberId && newMemberId.length > 0)}
            />
          </Form>
        </div>
        <div className="message-section">
          {getDialogMessage()}
        </div>
      </DialogContent>
      <DialogActions>
        {getDialogButtons()}
      </DialogActions>
    </StyledCreateCustomerDialog>
  );

})
