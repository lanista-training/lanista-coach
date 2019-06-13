import React, { Component } from 'react';
import Router from 'next/router';
import { Query } from "react-apollo";

import Scene from "../../components/Scene";
import Setup from './Setup';
import { logout } from '../../../lib/auth';
import { ME_QUERY } from "../../mutations/authenticate";

class SetupWithData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      passwordIncorrect: null,
      passwordConfirmed: false,
      passwordOld: null,
      passwordNew: null,
      passwordConfirmation: null,
      processing: false,
      dataChanged: false,
      showPasswordConfirmationButton: false,
      email: "rd@lanista-training.com",
      user_data: {
        email_valid: true,
        email_message: null,
        first_name: "Rafael",
        first_name_valid: true,
        first_name_message: null,
        last_name: "Diaz",
        last_name_valid: true,
        last_name_message: null,
        language: "DE",
        language_valid: true,
        language_message: null,
        company_name: "Rafael Diaz GmbH",
        company_name_valid: true,
        company_name_message: null,
        phone_number: "12345678990",
        phone_number_valid: true,
        phone_number_message: null,
        website: "lanista-training.com",
        website_valid: true,
        website_message: null,
        city: "München",
        city_valid: true,
        city_message: null,
        zip_code: "80333",
        zip_code_valid: true,
        zip_code_message: null,
        street: "Theresienstraße",
        street_valid: true,
        street_message: null,
        country: "DE",
        country_valid: true,
        country_message: null,
        app_banner_link: "lanista-training.com/studios.html",
        app_banner_link_valid: true,
        app_banner_link_message: null,
        workout_enable: "1",
        workout_enable_valid: true,
        workout_enable_message: null,
        facebook_profile: "facebook.com",
        facebook_valid: true,
        facebook_message: null,
        googleplus: "instagram.com",
        googleplus_valid: true,
        googleplus_message: null,
        twitter: "twitter.com",
        twitter_valid: true,
        twitter_message: null,
        promo_video: "youtube.com",
        promo_video_valid: true,
        promo_video_message: null,
        promo_text: "testing",
        promo_text_valid: true,
        promo_text_message: null,
        expiration_date: "2019-01-07",
        expiration_date_valid: true,
        expiration_date_message: null,
      },
      translations: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveData = this.saveData.bind(this);
    this.onTipingOldPassword = this.onTipingOldPassword.bind(this);
    this.onTipingNewPassword = this.onTipingNewPassword.bind(this);
    this.onTipingConfimationPassword = this.onTipingConfimationPassword.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  saveData() {
    const component = this;
    this.setState({
      processing: true
    }, () => {
      setTimeout(function(){
        component.setState({
          processing: false,
          dataChanged: false,
        });
      }, 2000);
    });
  }

  verifyPassword() {
    console.log("Verifying password");
    const component = this;
    const success = Math.random() >= 0.5;
    this.setState({
      processing: true
    }, () => {
      setTimeout(function(){
        if( success ) {
          component.setState({
            processing: false,
            passwordIncorrect: true,
            showPasswordConfirmationButton: false,
          });
        } else {
          component.setState({
            processing: false,
            passwordConfirmed: true,
            passwordIncorrect: false,
            showPasswordConfirmationButton: false,
          });
        }
      }, 2000);
    });
  }

  changePassword() {
    console.log("Change password");
    const component = this;
    this.setState({
      processing: true
    }, () => {
      setTimeout(function() {
        component.setState({
          processing: false,
          passwordNew: "",
          passwordOld: "",
          passwordConfirmation: "",
        });
      }, 2000)
    });
  }

  goBack() {
    Router.back();
  }

  onTipingOldPassword(password) {
    this.setState({
      passwordOld: password,
      showPasswordConfirmationButton: password.length > 0,
      passwordIncorrect: false,
    })
  }

  onTipingNewPassword(password) {
    this.setState({
      passwordNew: password,
    })
  }

  onTipingConfimationPassword(password) {
    this.setState({
      passwordConfirmation: password,
    })
  }

  getCommandsRight(client) {
    const {
      dataChanged,
      showPasswordConfirmationButton,
      passwordNew,
      passwordConfirmation,
    } = this.state;

    return showPasswordConfirmationButton ?
    ([{
        icon: 'icon-sync',
        iosname: 'iconfinder_Reload_2134660',
        text: 'logout',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'save',
        className: 'green-icon',
        onTap: () => {
          this.verifyPassword();
        }
    },{
        icon: 'icon-logout',
        iosname: 'iconfinder_Out_2134656',
        text: 'logout',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'logout',
        onTap: () => {
          logout();
          console.log("Logout");
        }
    }])
    :
    passwordNew && passwordNew.length > 6 && passwordNew == passwordConfirmation
    ?
    ([{
        icon: 'icon-sync',
        iosname: 'iconfinder_Reload_2134660',
        text: 'logout',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'save',
        className: 'green-icon',
        onTap: () => {
          this.changePassword();
        }
    },{
        icon: 'icon-logout',
        iosname: 'iconfinder_Out_2134656',
        text: 'logout',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'logout',
        className: 'logout-button',
        onTap: () => {
          logout();
          client.clearStore();
          client.resetStore();
          console.log("Logout and reset store");
        }
    }])
    :
    ([{
        icon: 'icon-logout',
        iosname: 'iconfinder_Out_2134656',
        text: 'logout',
        type: 'type-4',
        typex: 'Ionicons',
        name: 'logout',
        className: 'logout-button',
        onTap: () => {
          console.log("Logout and reset store...");
          logout();
          client.resetStore();
          console.log("done !");
        }
    }]);
  }

  getCommandsLeft() {
    return ([{
          //icon: CustomerIcon,
          icon: 'icon-back',
          iosname: 'iconfinder_Arrow_1214951',
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
          iosname: 'tools-inactive',
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
          iosname: 'help-inactive',
          text: 'Help',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'help-circle',
          onTap: () => {
            console.log("Command Help");
          }
      }]);
  }

  handleChange(changes) {
    const {t} = this.props;
    switch(changes.name) {
      case 'email':
        if( /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test( changes.value) ) {

        } else {

        }
        this.setState({
          email: changes.value,
          dataChanged: true,
        });
        break;
      case 'first_name':
        this.setState({
          user_data: {
            ...this.state.user_data,
            first_name_valid: true,
            first_name_message: null,
            first_name: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'last_name':
        this.setState({
          user_data: {
            ...this.state.user_data,
            last_name_valid: true,
            last_name_message: null,
            last_name: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'language':
        this.setState({
          user_data: {
            ...this.state.user_data,
            language_valid: true,
            language_message: null,
            language: changes.value,
          },
          dataChanged: true,
        });
        break;
      case 'company_name':
        this.setState({
          user_data: {
            ...this.state.user_data,
            company_name_valid: true,
            company_name_message: null,
            company_name: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'phone_number':
        this.setState({
          user_data: {
            ...this.state.user_data,
            phone_number_valid: true,
            phone_number_message: null,
            phone_number: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'website':
        this.setState({
          user_data: {
            ...this.state.user_data,
            website_valid: true,
            website_message: null,
            website: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'city':
        this.setState({
          user_data: {
            ...this.state.user_data,
            city_valid: true,
            city_message: null,
            city: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'zip_code':
        this.setState({
          user_data: {
            ...this.state.user_data,
            zip_code_valid: true,
            zip_code_message: null,
            zip_code: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'street':
        this.setState({
          user_data: {
            ...this.state.user_data,
            street_valid: true,
            street_message: null,
            street: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'country':
        this.setState({
          user_data: {
            ...this.state.user_data,
            country_valid: true,
            country_message: null,
            country: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'app_banner_link':
        this.setState({
          user_data: {
            ...this.state.user_data,
            app_banner_link_valid: true,
            app_banner_link_message: null,
            app_banner_link: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'workout_enable':
        this.setState({
          user_data: {
            ...this.state.user_data,
            workout_enable_valid: true,
            workout_enable_message: null,
            workout_enable: changes.value ? 1 : 0,
          },
          dataChanged: true,
        });
        break;
      case 'facebook_profile':
        this.setState({
          user_data: {
            ...this.state.user_data,
            facebook_profile_valid: true,
            facebook_profile_message: null,
            facebook_profile: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'googleplus':
        this.setState({
          user_data: {
            ...this.state.user_data,
            googleplus_valid: true,
            googleplus_message: null,
            googleplus: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'twitter':
        this.setState({
          user_data: {
            ...this.state.user_data,
            twitter_valid: true,
            twitter_message: null,
            twitter: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'promo_video':
        this.setState({
          user_data: {
            ...this.state.user_data,
            promo_video_valid: true,
            promo_video_message: null,
            promo_video: changes.value
          },
          dataChanged: true,
        });
        break;
      case 'promo_text':
        this.setState({
          user_data: {
            ...this.state.user_data,
            promo_text_valid: true,
            promo_text_message: null,
            promo_text: changes.value
          },
          dataChanged: true,
        });
        break;
      default:

    }
    return true;
  }

  t(text) {
    const {translations} = this.state;
    const textWithoutNamespace = text.split(":");
    const translation = translations[textWithoutNamespace[textWithoutNamespace.length-1]];
    return (translation ? translation : text);
  }

  onChangeLanguage( language ) {
    const translations = require('../../../static/locales/' + language + '/setup');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  render() {
    const {
      user_data,
      email,
      processing,
      passwordOld,
      passwordNew,
      passwordConfirmation,
      passwordIncorrect,
      passwordConfirmed,
      dataChanged,
    } = this.state;
    const languages = [
      { key: 'DE', text: 'Deutsch', value: 'DE' },
      { key: 'ES', text: 'Español', value: 'ES' },
      { key: 'EN', text: 'English', value: 'EN' },
      { key: 'PT', text: 'Português', value: 'PT' },
      { key: 'FR', text: 'Français', value: 'FR' },
      { key: 'RU', text: 'ру́сский', value: 'RU' },
    ]

    return(
      <Query
        query={ME_QUERY}
      >
        {({ client, data, loading, error }) => {
          return (
            <Scene
              commandsLeft={this.getCommandsLeft()}
              commandsRight={this.getCommandsRight(client)}
              processing={processing}
              t={this.t}
            >
              <Setup
                t={this.t}
                dataChanged={dataChanged}
                goBack={this.goBack}
                languages={languages}
                userData={user_data}
                email={email}
                handleChange={this.handleChange}
                onTipingOldPassword={this.onTipingOldPassword}
                onTipingNewPassword={this.onTipingNewPassword}
                onTipingConfimationPassword={this.onTipingConfimationPassword}
                passwordOld={passwordOld}
                passwordNew={passwordNew}
                passwordConfirmation={passwordConfirmation}
                passwordIncorrect={passwordIncorrect}
                passwordConfirmed={passwordConfirmed}
                saveData={this.saveData}
              />
            </Scene>
          );
        }}
      </Query>
    )
  }
}

export default SetupWithData;
