import React, { Component, useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StrengthMeter from './StrengthMeter';
import LanistaButton from '../../components/LanistaButton';
import { StyledCard } from './styles';

const getSteps = (t) => {
  return [t("change_password_step_1_title"), t("change_password_step_2_title"), t("change_password_step_3_title")];
}

const getStepContent = ({
  t,
  activeStep,

  passwordOld,
  passwordOldErrorMessage,
  showOldPassword,
  toggleShowOldPassword,
  onOldPasswordChange,

  passwordNew,
  passwordNewErrorMessage,
  showNewPassword,
  toggleShowNewPassword,
  onNewPasswordChange,

  passwordConfirmation,
  passwordConfirmationErrorMessage,
  showConfirmationPassword,
  toggleShowConfirmationPassword,
  onConfirmationPasswordChange,

}) => {

  const {progress, rules} = validatePassword(passwordNew);

  switch (activeStep) {
    case 0:
      return <div className="step-content">
        <div className="step-conent-message">{t("change_password_step_1_text")}</div>
        <TextField
          id="password-old"
          error={passwordOldErrorMessage !== null}
          helperText={passwordOldErrorMessage}
          label={t('old_passwort')}
          type={showOldPassword ? 'text' : 'password'}
          value={passwordOld}
          onChange={(e) => onOldPasswordChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowOldPassword}
                  onMouseDown={toggleShowOldPassword}
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>;
    case 1:
      return <div className="step-content">
        <div className="step-conent-message">{t("change_password_step_2_text")}</div>
        <TextField
          id="password-new"
          error={passwordNewErrorMessage !== null}
          helperText={passwordNewErrorMessage}
          label={t('new_passwort')}
          type={showNewPassword ? 'text' : 'password'}
          value={passwordNew}
          onChange={(e) => onNewPasswordChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowNewPassword}
                  onMouseDown={toggleShowNewPassword}
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <StrengthMeter
          t={t}
          progress={progress}
          rules={rules}
        />
      </div>;
    case 2:
      return <div className="step-content">
        <div className="step-conent-message">{t("change_password_step_3_text")}</div>
        <TextField
          id="password-confirmation"
          error={passwordConfirmationErrorMessage !== null}
          helperText={passwordConfirmationErrorMessage}
          label={t('new_passwort_confirmation')}
          type={showConfirmationPassword ? 'text' : 'password'}
          disabled={progress < 100}
          value={passwordConfirmation}
          onChange={(e) => onConfirmationPasswordChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowConfirmationPassword}
                  onMouseDown={toggleShowConfirmationPassword}
                >
                  {showConfirmationPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>;
    default:
    return <div className="password-successfully-changed">
      {t("password-successfully-changed")}
      <CheckCircleIcon/>
    </div>;
  }
}

const getStepButtons = ({
  t,
  activeStep,

  handleBack,
  handleNext,

  passwordNew,
  onVerifyPassword,
  verifyPasswordLoading,

  onChangePassword,
  changePasswordLoading,
  passwordConfirmation,

  onEndProcess,

}) => {

  const {progress} = validatePassword(passwordNew);

  switch (activeStep) {
    case 0:
      return (
        <LanistaButton
          className="verify-password-button"
          onClick={onVerifyPassword}
          loading={verifyPasswordLoading}
          inverted={false}
        >
          {t("verify_old_password")}
        </LanistaButton>
      );
    case 1:
      return (
        <>
          <LanistaButton
            className="go-back-button"
            onClick={handleBack}
          >
            {t("back")}
          </LanistaButton>
          <LanistaButton
            className="verify-password-button"
            onClick={onVerifyPassword}
            loading={verifyPasswordLoading}
            inverted={progress > 99}
            disabled={!(progress > 99)}
          >
            {t("next")}
          </LanistaButton>
        </>
      );
    case 2:
      return (
        <>
          <LanistaButton
            className="go-back-button"
            onClick={handleBack}
          >
            {t("back")}
          </LanistaButton>
          <LanistaButton
            className="change-password-button"
            onClick={onChangePassword}
            loading={changePasswordLoading}
            inverted={passwordNew == passwordConfirmation}
            disabled={!(passwordNew == passwordConfirmation)}
          >
            {t("change_password")}
          </LanistaButton>
        </>
      );
    default:
      return <LanistaButton
        onClick={onEndProcess}
        inverted
      >
        {t("confirm")}
      </LanistaButton>;
  }
}

const validatePassword = (password) => {
  let errorMessage = null;
  let capsCount, smallCount, numberCount, symbolCount;
  let score = 0;
  if (password && password.length < 8) {
    errorMessage = "password_must_be_min_8_char";
  } else if ( password ) {

    capsCount = (password.match(/[A-Z]/g) || []).length;
    smallCount = (password.match(/[a-z]/g) || []).length;
    numberCount = (password.match(/[0-9]/g) || []).length;
    symbolCount = (password.match(/\W/g) || []).length;

    if (capsCount < 1) {
      errorMessage = "must_contain_caps"
    }
    else if (smallCount < 1) {
      errorMessage = "must_contain_small"
    }
    else if (numberCount < 1) {
      errorMessage = "must_contain_number"
    }
    else if (symbolCount < 1) {
      errorMessage = "must_contain_symbol"
    }

    score += (password.length < 8 ? 0 : 20) + (capsCount < 1 ? 0 : 20) + (smallCount < 1 ? 0 : 20) + (numberCount < 1 ? 0 : 20) + (symbolCount < 1 ? 0 : 20);
  }
  return {
    rules: [
      {
        text: "password_must_be_min_8_char",
        pass: password && password.length > 7
      },
      {
        text: "must_contain_caps",
        pass: capsCount > 0,
      },
      {
        text: "must_contain_small",
        pass: smallCount > 0,
      },
      {
        text: "must_contain_number",
        pass: numberCount > 0,
      },
      {
        text: "must_contain_symbol",
        pass: symbolCount > 0,
      },
    ],
    progress: score,
  };
}

export default ({
  t,

  passwordOld,
  passwordNew,
  passwordConfirmation,

  passwordOldErrorMessage,
  passwordNewErrorMessage,
  passwordConfirmationErrorMessage,

  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmationPasswordChange,

  onVerifyPassword,
  onChangePassword,

  passwordConfirmed,
  passwordChanged,

  verifyPasswordLoading,
  changePasswordLoading,

  endProcess,
}) => {

  const [showOldPassword, setShowOldPassword] = useState(false);
  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const toggleShowConfirmationPassword = () => setShowConfirmationPassword(!showConfirmationPassword);

  //
  // Steps management
  //
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const steps = getSteps(t);

  //
  // Events
  //
  useEffect(() => {
    !verifyPasswordLoading && passwordConfirmed && handleNext();
  }, [verifyPasswordLoading]);
  useEffect(() => {
    !changePasswordLoading && passwordChanged && handleNext();
  }, [changePasswordLoading]);

  //
  // Reinitialization
  //
  const onEndProcess = () => {
    console.log("onEndProcess");
    setActiveStep(0);
    endProcess();
  }
  return (
    <div className="section password-section" id="section-8" style={{marginBottom: "6em"}}>
      <div className="section-header">{t( "change_password" )}</div>
      <StyledCard>
        <Stepper activeStep={activeStep} alternativeLabel>
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
        <div className="step-content">
          {
            getStepContent({
              t,
              activeStep,

              passwordOld,
              passwordOldErrorMessage,
              showOldPassword,
              toggleShowOldPassword,
              onOldPasswordChange,

              passwordNew,
              passwordNewErrorMessage,
              showNewPassword,
              toggleShowNewPassword,
              onNewPasswordChange,

              passwordConfirmation,
              passwordConfirmationErrorMessage,
              showConfirmationPassword,
              toggleShowConfirmationPassword,
              onConfirmationPasswordChange,

            })
          }
        </div>
        <div className="step-buttons">
          {getStepButtons({
            t,
            activeStep,

            handleBack,
            handleNext,

            passwordNew,
            onVerifyPassword,
            verifyPasswordLoading,

            passwordConfirmation,
            onChangePassword,
            changePasswordLoading,

            onEndProcess,

          })}
        </div>
      </StyledCard>
    </div>
  )
}
