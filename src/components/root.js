// Root entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import * as React from "react";
import Helmet from "react-helmet";
import { hot } from "react-hot-loader";
import { Route, Switch, Redirect } from "react-router-dom";

import { Query } from "react-apollo";
import { IRoot } from "@/graphql/state";
import getSession from "@/queries/getSession";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Auth } from 'aws-amplify';
/* Local */

// Styles - import for side-effects
import "@/global/styles";

// Components
import ScrollTop from "@/components/helpers/scrollTop";

// Routes
import routes from "@/data/routes";

// ----------------------------------------------------------------------------

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route {...rest} render={props => {
    return (
      //(identity !== null) ? (
      authenticated
      ?
        (<Component {...props}/>)
      :
        (<Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>)
    )
  }}/>
)

const Root = () => (
  <Query query={getSession}>
    {
      ({ data }) => {
        /*
        AWS.config.update({region: 'eu-central-1'});
        if( data && data.state && data.state.session && data.state.session.authenticated ) {
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
             IdentityPoolId: 'eu-central-1:76834fb6-8c14-41d7-85c5-573847f6a455',
             IdentityId: data.state.session.identityId,
             Logins: {
               'cognito-identity.amazonaws.com': data.state.session.token
             }
          });
          AWS.config.credentials.refresh( (err) => {
            if( err ) {
              console.log( "YOUR ARE LOGGED OUT" );
              console.log( err );
              localStorage.clear();
              location.reload();
            } else {
              console.log("YOU ARE LOGGED IN");
            }
          });
        }
        */
        return (
          <div>
              <Route
                render={({ location }) => (
                  <TransitionGroup>
                  <CSSTransition key={location.key} classNames="none" timeout={800} >
                    <Switch location={location}>
                    {
                      routes.map(route => {
                        console.log("MARK");
                        return (
                          route.private
                          ?
                            (<PrivateRoute key={route.path} authenticated={data.state && data.state.session ? data.state.session.authenticated : false} {...route} />)
                          :
                            route.path == '/login' && data.state && data.state.session && data.state.session.authenticated
                            ?
                              (<Redirect key={'/'} to={{pathname: '/'}}/>)
                            :
                              (<Route key={route.path} {...route} />
                        )
                      )})
                    }
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          </div>
        );
      }
    }
  </Query>
);

export default hot(module)(Root);
