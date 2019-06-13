import React, { Component } from 'react';
import _ from 'lodash';
import moment from "moment";
import Router from 'next/router';
import { Query } from "react-apollo";
import Scene from "../../components/Scene";
import Test from './Test';
import TestHeader from "../../components/TestHeader";
import { MEMBER_TEST_RESULT } from "../../queries";

class TestWithData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      processing: false,
      translations: [],
      comments: [],
    };
    this.goBack = this.goBack.bind(this);
    this.t = this.t.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.extractTestData = this.extractTestData.bind(this);
  };

  componentDidMount() {
    this.onChangeLanguage("de");
  }

  goBack() {
    Router.back();
  }

  getCommandsRight() {
    return ([{
          icon: 'icon-pdf',
          text: 'generate pdf',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'new measure',
          onTap: () => {
            console.log("Generate PDF");
          }
      }, {
          icon: 'icon-email-inactive',
          text: 'send email',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'folder',
          onTap: () => {
            console.log("Send email");
          }
      }, {
          icon: 'icon-remove',
          text: 'delete test',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'last',
          onTap: () => {
            console.log("Delete test");
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

  extractTestName( data ) {
    const {testType} = this.props;
    let testName = ''
    if( data && data.member && data.member.tests ) {
      data.member.tests.map((test) => {
       if( test.id === testType ) {
         testName = test.name
       }
     })
    }
    return testName
  }

  extractTestData( data ) {
    const {testType, testId} = this.props
    let testData = []

    data && data.member && data.member.tests && data.member.tests.map((test, inde) => {
      if( test.id == testType ) {
        const testNodes = test.testnodes
        test.testresults.map((result, index) => {
          if( result.id == testId ) {
            const testResult = result.results.split("|")
            const testComments = result.comments.split("|")
            // start processing
            let resultPosition = 0
            testNodes.map((node, index) => {
              if( node.type == 2 ) {
                testData.push({
                  ...node, score: [testResult[resultPosition], testResult[resultPosition + 1]], comment: testComments[index]
                })
                resultPosition = resultPosition + 2
              } else {
                testData.push({
                  ...node, score: [testResult[resultPosition]], comment: testComments[index]
                })
                resultPosition = resultPosition + 1
              }
            })
          }
        })
      }
    })
    return testData
  }

  render() {
    const {processing} = this.state;
    const {memberId, testId, testType} = this.props;

    return(
      <Query
        query={MEMBER_TEST_RESULT}
        notifyOnNetworkStatusChange
        variables={{
          memberId: memberId,
          testresultId: testId,
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (data && data.member) {
            const {member} = data
            const {first_name, last_name, id, t} = member
            return (
              <Scene
                commandsLeft={this.getCommandsLeft()}
                commandsRight={this.getCommandsRight()}
                processing={processing}
                headerChildren={
                  <TestHeader
                    userId={id}
                    firstName={first_name}
                    lastName={last_name}
                    testName={this.extractTestName(data)}
                  />
                }
                t={this.t}
              >
                <Test
                  t={this.t}
                  test={this.extractTestData(data)}
                  testType={testType}
                />
              </Scene>
            )
          } else {
            return(<Scene
              commandsLeft={this.getCommandsLeft()}
              commandsRight={this.getCommandsRight()}
              processing={processing}
              headerChildren={
                <TestHeader
                  userId={0}
                  firstName={''}
                  lastName={''}
                  testName={''}
                />
              }
              t={this.t}
            >

            </Scene>)
          }
        }}
      </Query>
    )
  }
}

export default TestWithData;
