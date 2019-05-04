import React from 'react';
import { NativeRouter, Link, Route, Redirect } from 'react-router-native'
import Stack from './animation';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { IdentityConsummer, IdentityProvider } from '../contexts/identity';
import { Query } from "react-apollo";
import { IRoot } from "../graphql/state";
import getSession from "../queries/getSession";

import Login from '../screens/login';
import Registration from '../screens/registration';
import Dashboard from '../screens/dashboard';
import Setup from '../screens/setup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  body: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stage: {
    flex: 10,
    alignSelf: 'stretch',
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  }
})

const PrivateRoute = ({ component: Component, identity, ...rest }) => {
  console.log("RENDERING PRIVATE ROUTE");
  console.log( identity );
  return (
      <Route {...rest} render={props => {
          console.log( "Identity:");
          console.log( identity );
          console.log( props );
        return (
        //(identity) ? (
        (true) ? (

          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )
        }}/>
  )
}

export default () => {
  AWS.config.update({region: 'eu-central-1'});
  return (
    <NativeRouter>
      <Query query={getSession}>
        {
          ({ data }) => {
            console.log( "SESSION DATA NAVIGATION:" );
            console.log( data );
            console.log( data.state.session.authenticated );
            return (
              <View style={styles.container}>
                <View style={styles.body}>
                  <View style={styles.stage}>
                    <Stack>
                      <PrivateRoute exact path="/" component={Dashboard} identity={data.state.session.authenticated}/>
                      <PrivateRoute path="/setup" component={Setup} identity={data.state.session.authenticated}/>
                      <Route path="/login" animationType="expand" component={Login}/>
                      <Route path="/registration" animationType="expand" component={Registration}/>
                    </Stack>
                  </View>
                </View>
              </View>
            );
          }
        }
        </Query>
    </NativeRouter>
  )
};
