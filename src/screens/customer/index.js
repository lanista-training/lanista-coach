import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Customer from './Customer';
import CustomerHeader from "../../components/CustomerHeader";
import { MEMBER } from "../../queries";

class CustomerWithData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      processing: false,
      translations: [],
    };
    this.goBack = this.goBack.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.extractLastMeasures = this.extractLastMeasures.bind(this);
    this.onProtocollClick = this.onProtocollClick.bind(this);
  };

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  onProtocollClick(exerciseId) {
    console.log("onProtocollClick")
    const {memberId} = this.props;
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: exerciseId,
        member: memberId,
      }
    });
  }

  getCommandsRight() {
    const {memberId} = this.props;
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
            Router.push({
              pathname: '/measures',
              query: { customer: memberId }
            });
          }
      }, {
          icon: 'icon-activity',
          text: 'refresh',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'refresh',
          onTap: () => {
            Router.push({
              pathname: '/anamnese',
              query: { customer: memberId }
            });
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

  calculateBodyFat(member, measures) {
    return measures.trizeps + measures.scapula + measures.auxiliar + measures.chest + measures.sprailium + measures.abs + measures.quads
  }

  extractLastMeasures(data) {
     if( data && data.member && data.member.calipers ){
       const sortedData = _.orderBy(data.member.calipers, ['target_date'], ['desc'])

       const lastHeightEntry = _.find(sortedData, (o) => o.height > 0)
       const lastWeightEntry = _.find(sortedData, (o) => o.weight > 0)

       const lastHeight = lastHeightEntry ? lastHeightEntry.height : 0
       const lastWeight = lastWeightEntry ? lastWeightEntry.weight : 0

       const lastFutrex = _.find(sortedData, (o) => (o.futrex > 0 || (o.trizeps>0 && o.scapula>0 &&  o.auxiliar>0 && o.chest>0 && o.sprailium>0 && o.abs>0 && o.quads>0 )))
       return {
         height: lastHeight,
         weight: lastWeight,
         fat: lastFutrex ? (lastFutrex.futrex > 0 ? lastFutrex.futrex : this.calculateBodyFat(data.member, lastFutrex)) : 0,
       }
     } else {
       return {
         height: 0,
         weight: 0,
         fat: 0,
       }
     }
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
    const {processing, protocolls} = this.state;
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
              <Customer
                customer={data && data.member ? data.member : {}}
                lastMeasures={this.extractLastMeasures(data) }
                protocolls={protocolls}
                t={this.t}
                onProtocollClick={this.onProtocollClick}
              />
            </Scene>
          )
        }}
      </Query>
    )
  }
}

export default CustomerWithData;
