import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import ProfileScreen from "../src/screens/profile"

function Profile({memberId}) {
  const goBack = () => Router.back();
  const goToSetup = () => {
    Router.push({
      pathname: '/configuration',
    });
  }
  return (
    <ProfileScreen
      memberId={memberId}
      goBack={goBack}
      goToSetup={goToSetup}
    />
  );
}

Profile.getInitialProps = context => {
  return ({
    memberId: context.query.member
  })
};

export default withAuthSync(Profile);
