import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import AnamneseScreen from "../src/screens/anamnese"

function Ananmese({memberId, tab, id}) {

  const goBack = () => Router.back()
  const goToSetup = () => {
    Router.push({
      pathname: '/configuration',
    });
  }
  return (
    <AnamneseScreen
      memberId={memberId}
      tab={tab}
      id={id}
      goBack={goBack}
      goToSetup={goToSetup}
    />
  );
}

Ananmese.getInitialProps = context => {
  return ({
    memberId: context.query.customer,
    tab: context.query.tab,
    id: context.query.id,
  })
};

export default withAuthSync(Ananmese);
