import React from "react";
import { withAuthSync } from '../lib/auth'
import TemplateScreen from "../src/screens/template"

function Template({memberId}) {
  return (
    <TemplateScreen  memberId={memberId}></TemplateScreen>
  );
}

Template.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default withAuthSync(Template);
