// Client entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// Create browser history, for navigation a la single page apps
import createBrowserHistory from "history/createBrowserHistory";

// React, our UI engine
import React from "react";

// HOC for enabling Apollo GraphQL `<Query>` and `<Mutation>`
import { ApolloProvider } from "react-apollo";

// Attach React to the browser DOM
import ReactDOM from "react-dom";

// Single page app routing
import { Router } from "react-router-dom";

import { Rehydrated } from 'aws-appsync-react'

/* Local */

// Our main component, and the starting point for server/browser loading
import Root from "@/components/root";

// Helper function that creates a new Apollo client per request
import { createClient } from "@/graphql/apollo";

// For Styled Components theming
import { ThemeProvider } from "@/lib/styledComponents";

// ... and the actual Styled Components theme
import defaultTheme from "@/themes/default";

import i18n from '../../config/i18n';
import { I18nextProvider } from 'react-i18next';
// ----------------------------------------------------------------------------

// Create Apollo client
const client = createClient();

// Create a browser history
const history = createBrowserHistory();

// Render
ReactDOM.hydrate(
  <I18nextProvider i18n={i18n}>
    <ThemeProvider theme={defaultTheme}>
      <ApolloProvider client={client}>
        <Rehydrated>
          <Router history={history}>
            <Root/>
          </Router>
        </Rehydrated>
      </ApolloProvider>
    </ThemeProvider>
  </I18nextProvider>,
  document.getElementById("root"),
);
