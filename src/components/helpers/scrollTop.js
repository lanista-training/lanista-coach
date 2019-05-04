// Scroll to the top of the window

// -----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

// -----------------------------------------------------------------------------

class ScrollTop extends React.PureComponent {
  
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollTop);
