import React, { useState, useEffect } from 'react';
import {TrainerList, TrainerLogin, StyledLink} from './styles';

import LanistaButton from '../../../components/LanistaButton';
import LanistaTextField from '../../../components/LanistaTextField';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const getAvatarColor = (role) => {
  switch(role) {
    case 'PHYSIO':
      return '#fe9500';
    case 'DOCTOR':
      return '#59d76e';
    default:
      return '#34acfb';
  }
}

export default ({
  t,
  trainers,
  password,

  onPasswordChange,

  onEmaiChange,

  disabled,
  error,
  helperText,

  authenticateUser,
  loading,

  goToForgotpassword,

}) => {

  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const onSelectTrainer = (trainer) => setSelectedTrainer(trainer);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  console.log("TainerList")
  console.log(error)
  console.log(helperText)

  useEffect(() => {
    selectedTrainer && onEmaiChange(selectedTrainer.email);
  }, [selectedTrainer]);

  return (
    selectedTrainer === null ?
    <TrainerList>
      {
        trainers.map(trainer => {
          const {first_name, last_name, photoUrl, role} = trainer;
          return (
            <div className="trainer-item" onClick={() => setSelectedTrainer(trainer)}>
              <div className="photo-section" style={{
                backgroundImage: 'url(' + photoUrl + ')',
                borderColor: getAvatarColor(role),
              }}/>
              <div className="first-name">{first_name}</div>
              <div className="last-name">{last_name}</div>
            </div>
          )
        })
      }
    </TrainerList>
    :
    <TrainerLogin>
      <div className="trainer-item">
        <div className="photo-section" style={{
          backgroundImage: 'url(' + selectedTrainer.photoUrl + ')',
          borderColor: getAvatarColor(selectedTrainer.role),
        }}/>
      </div>
      <LanistaTextField
        className="password-field"
        variant="outlined"
        placeholder={t("password")}
        disabled={disabled}
        type={"password"}
        error={error}
        value= {password}
        onChange= {onPasswordChange}
        helperText={helperText}
      />
      <StyledLink onClick={goToForgotpassword}>
          <a >{t("forgot_password")}</a>
      </StyledLink>
      <div className="buttons-section">
        <LanistaButton
          loading={loading}
          onClick={
            () => {
              authenticateUser();
            }
          }
          disabled={loading}
          inverted
        >
          { loading ? ("...") : t("login") }
        </LanistaButton>
        <LanistaButton onClick={() => setSelectedTrainer(null)}>
          {t("back")}
        </LanistaButton>
      </div>
    </TrainerLogin>
  )
}
