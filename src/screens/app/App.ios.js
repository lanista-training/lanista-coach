/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Router from '../../routes';
import { ApolloProvider } from 'react-apollo';
import { createClient } from "../../graphql/apollo";

import { I18nextProvider, translate } from 'react-i18next';
import i18n from '../../../config/i18n';

// For Styled Components theming
import { ThemeProvider } from "../../lib/styledComponents";
// ... and the actual Styled Components theme
import defaultTheme from "../../themes/default";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// Create Apollo client
const client = createClient();

interface Props {};
export default class RootComponent extends Component<Props> {
  render() {
    return (
      <I18nextProvider i18n={ i18n }>
        <ThemeProvider theme={defaultTheme}>
          <ApolloProvider client={client}>
            <View style={styles.container}>
                <Router/>
            </View>
          </ApolloProvider>
        </ThemeProvider>
      </I18nextProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
