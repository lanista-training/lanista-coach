import React from "react";
import Router from 'next/router';
import { withAuthSync } from '../lib/auth'
import ProfileScreen from "../src/screens/profile"

function Profile({memberId}) {
  const goBack = () => Router.back()
  return (
    <ProfileScreen
      memberId={memberId}
      goBack={goBack}
    />
  );
}

Profile.getInitialProps = context => {
  return ({
    memberId: context.query.member
  })
};

export default withAuthSync(Profile);
