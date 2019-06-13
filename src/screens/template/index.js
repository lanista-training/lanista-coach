import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Template from './Template';
import CustomerHeader from "../../components/CustomerHeader";
import { MEMBER } from "../../queries";

class TemplateWithData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      processing: false,
      translations: [],
    };
    this.goBack = this.goBack.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
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

  onChangeLanguage( language ) {
    const translations = require('../../../static/locales/' + language + '/dashboard');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  render() {
    const {processing} = this.state;
    const {memberId} = this.props;

    return(
      <Query
        query={MEMBER}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
        variables={{
          memberId: memberId,
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          return (
            <Scene
              commandsLeft={this.getCommandsLeft()}
              commandsRight={this.getCommandsRight()}
              processing={processing}
              headerChildren={
                <CustomerHeader
                  userId={data && data.member ? data.member.id : ''}
                  firstName={data && data.member ? data.member.first_name : ''}
                  lastName={data && data.member ? data.member.last_name : ''}
                />
              }
              t={this.t}
            >
              <Template
                customer={data && data.member ? data.member : {}}
                t={this.t}
              />
            </Scene>
          )
        }}
      </Query>
    )
  }
}

export default TemplateWithData;
