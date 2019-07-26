import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { Mutation } from "react-apollo";
import Scene from "../../components/Scene";
import Forgotpassword from './Forgotpassword';
import { SENDPASSWORDRESET } from "../../mutations";

class ForgotpasswordWithData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      processing: false,
      translations: [],
      currentLanguage: 'de',
      availableLanguages: ['en', 'de', 'es', 'pt', 'ru', 'fr'],
      emailIsValid: true,
    };
    this.goBack = this.goBack.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  };

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  getCommandsRight() {
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


  getCommandsLeft() {
    return ([{
          //icon: CustomerIcon,
          icon: 'icon-back',
          text: 'Back',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            this.goBack();
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

  t(text) {
    const {translations} = this.state;
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  validateEmail(callback) {
    const {email} = this.state;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("validateEmail")
    console.log(email)
    // data validation
    if( email == "" || email === undefined ) {
      this.setState({
        emailIsValid: false,
        errorMessage: this.t("login:email_empty"),
      });
    } else if( !re.test(email) ) {
      this.setState({
        emailIsValid: false,
        errorMessage: this.t("login:email_invalid"),
      });
    } else {
      callback();
    }
  }

  onChangeLanguage( language ) {
    const translations = require('../../../static/locales/' + language + '/login');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language),
    });
  }

  handleEmailChange(event){
    if (typeof event === 'string' ) {
      this.setState({
        email: event,
        emailIsValid: null,
        errorMessage: null,
      });
    } else {
      this.setState({
        email: event.target.value,
        emailIsValid: null,
        errorMessage: null,
      });
    }
  }

  render() {
    const {
      availableLanguages,
      currentLanguage,
      email, errorMessage,
      emailIsValid,
    } = this.state;

    return(
      <Mutation
        mutation={SENDPASSWORDRESET}
        notifyOnNetworkStatusChange
        variables={{ email: email }}
      >
        {(sendpasswordreset, { loading, data, error, networkStatus }) => {
          const errorCode = error && (error.message.indexOf(": ") > -1 ? error.message.split(': ')[1] : error.message);
          console.log('passwordresetsuccessfull')
          console.log( data && data.sendpasswordreset && data.sendpasswordreset == "PASSWORDRESETSENT")
          return (
            <Forgotpassword
              customer={data && data.member ? data.member : {}}
              languages={availableLanguages}
              currentLanguage={currentLanguage}
              goBack={this.goBack}
              onSendpasswordreset={() => this.validateEmail(sendpasswordreset)}
              errorMessage={errorMessage || ( errorCode && this.t(errorCode))}
              emailIsValid={emailIsValid}
              handleEmailChange={this.handleEmailChange}
              passwordresetsuccessfull={(data && data.sendpasswordreset && data.sendpasswordreset == "PASSWORDRESETSENT")}
              t={this.t}
            />
          )
        }}
      </Mutation>
    )
  }
}

export default ForgotpasswordWithData;
