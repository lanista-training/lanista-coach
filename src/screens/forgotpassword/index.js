import React, { useEffect, useState } from 'react';
import { useTranslate } from '../../hooks/Translation';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import Scene from "../../components/Scene";
import Forgotpassword from './Forgotpassword';
import { SENDPASSWORDRESET } from "../../mutations";

const Panel = ({goBack}) => {
  const {t, locale, changeLanguage, languages} = useTranslate("login");
  //
  // Component variables
  //
  const [email, setEmail] = useState(null);
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //
  // Mutation
  //
  const [sendpasswordreset, { loading, data, error, networkStatus }] = useMutation(SENDPASSWORDRESET);

  const getCommandsRight = () => {
    return ([{
          icon: 'icon-create-workout',
          text: 'new user',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'new user',
          onTap: () => {
            console.log("Create Workout");
          }
      }, {
          icon: 'icon-create-protocoll',
          text: 'folder',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'folder',
          onTap: () => {
            console.log("Create Protocoll");
          }
      }, {
          icon: 'icon-measure',
          text: 'last',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'last',
          onTap: () => {
            console.log("Measures");
          }
      }, {
          icon: 'icon-activity',
          text: 'refresh',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'refresh',
          onTap: () => {
            console.log("Ananmese");
          }
      }]);
  }


  const getCommandsLeft = () => {
    return ([{
          //icon: CustomerIcon,
          icon: 'icon-back',
          text: 'Back',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            goBack();
          }
      }, {
          //icon: CustomerIcon,
          icon: 'icon-tools-inactive',
          text: 'Setting',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'settings',
          onTap: () => {
            console.log("Command Settings");
          }
      }, {
          //icon: HelpIcon,
          icon: 'icon-help-inactive',
          text: 'Help',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'help-circle',
          onTap: () => {
            console.log("Command Help");
          }
      }]);
  }

  const validateEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // data validation
    if( email == "" || email === undefined ) {
      setEmailIsValid(false);
      setErrorMessage(t("email_empty"));
    } else if( !re.test(email) ) {
      setEmailIsValid(false);
      setErrorMessage(t("email_invalid"));
    } else {
      sendpasswordreset({ variables: { email: email } });
    }
  }

  const handleEmailChange = (event) => {
    if (typeof event === 'string' ) {
      setEmail(event);
      setEmailIsValid(null);
      setErrorMessage(null);
    } else {
      setEmail(event.target.value);
      setEmailIsValid(null);
      setErrorMessage(null);
    }
  }

  const errorCode = error && (error.message.indexOf(": ") > -1 ? error.message.split(': ')[1] : error.message);

  return (
    <Forgotpassword
      languages={languages}
      currentLanguage={locale}

      goBack={goBack}

      onSendpasswordreset={validateEmail}
      errorMessage={errorMessage || ( errorCode && t(errorCode))}
      loading={loading}

      email={email}
      emailIsValid={emailIsValid}
      handleEmailChange={handleEmailChange}
      passwordresetsuccessfull={(data && data.sendpasswordreset && data.sendpasswordreset == "PASSWORDRESETSENT")}
      t={t}
      onChangeLanguage={changeLanguage}
    />
  )

}

export default Panel;
