import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Measures from './Measures';
import CustomerHeader from "../../components/CustomerHeader";
import { MEMBER_MEASURES, TESTS } from "../../queries";

class MeasuresWithData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      translations: [],
      showDataAsChart: true,
      activeIndex: 0,
      showCreateTestMenu: false,
    }
    this.goBack = this.goBack.bind(this)
    this.t = this.t.bind(this)
    this.onChangeLanguage = this.onChangeLanguage.bind(this)
    this.changeDataPresentation = this.changeDataPresentation.bind(this)
    this.goToTest = this.goToTest.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.closeCreateTestmenu = this.closeCreateTestmenu.bind(this)
  };

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  handleTabChange(e, { activeIndex }) {
    this.setState({ activeIndex })
  }

  closeCreateTestmenu() {
    this.setState({ showCreateTestMenu: false })
  }

  goBack() {
    Router.back();
  }

  goToTest(testData) {
    Router.push({
      pathname: '/test',
      query: {
        memberId: this.props.memberId,
        testType: testData.testtype,
        testId: testData.id,
      }
    });
  }

  changeDataPresentation() {
    const {showDataAsChart} = this.state
    this.setState({
      showDataAsChart: !showDataAsChart
    })
  }

  getCommandsRight() {
    const {showDataAsChart, activeIndex} = this.state
    if( activeIndex == 3 ){
      return ([{
            icon: 'icon-plus',
            text: 'new user',
            type: 'type-1',
            typex: 'Ionicons',
            name: 'new measure',
            onTap: () => {
              console.log("Create Test");
              this.setState({
                showCreateTestMenu: true
              })
            }
        }]);
    } else {
      return ([{
            icon: 'icon-plus',
            text: 'new user',
            type: 'type-1',
            typex: 'Ionicons',
            name: 'new measure',
            onTap: () => {
              console.log("Create Measure");

            }
        }, {
            icon: showDataAsChart ? 'icon-list' : 'icon-chart',
            text: 'folder',
            type: 'type-1',
            typex: 'Ionicons',
            name: 'folder',
            onTap: () => {
              console.log("Show table");
              this.changeDataPresentation();
            }
        }, {
            icon: 'icon-export',
            text: 'last',
            type: 'type-1',
            typex: 'Ionicons',
            name: 'last',
            onTap: () => {
              console.log("Export");
            }
        }]);
    }

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
    const translations = require('../../../static/locales/' + language + '/anamnese');
    const commonTranslations = require('../../../static/locales/' + language + '/common');
    const originalLanguages = ['en', 'de', 'es', 'fr'];

    this.setState({
      translations: {...translations, ...commonTranslations},
      currentLanguage: language,
      availableLanguages: originalLanguages.filter(word => word !== language)
    });
  }

  render() {
    const {processing, showDataAsChart, activeIndex, showCreateTestMenu} = this.state;
    const {memberId} = this.props;

    return(
      <Query
        query={TESTS}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
      >
        {({ loading: loadingTests, data: { tests } }) => (
          <Query
            query={MEMBER_MEASURES}
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
                  <Measures
                    customer={data && data.member ? data.member : {}}
                    t={this.t}
                    showDataAsChart={showDataAsChart}
                    goToTest={this.goToTest}
                    activeIndex={activeIndex}
                    handleTabChange={this.handleTabChange}
                    showCreateTestMenu={showCreateTestMenu}
                    closeCreateTestmenu={this.closeCreateTestmenu}
                    testsTypes={tests}
                  />
                </Scene>
              )
            }}
          </Query>
        )}
      </Query>
    )
  }
}

export default MeasuresWithData;
