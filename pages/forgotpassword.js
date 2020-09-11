import React from "react";
import Router from 'next/router';
import ForgotpasswordScreen from "../src/screens/forgotpassword"

function Forgotpassword({memberId}) {

  const goBack = () => Router.back()

  return (
    <ForgotpasswordScreen
      memberId={memberId}
      goBack={goBack}
    />
  );
}

Forgotpassword.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default Forgotpassword;
