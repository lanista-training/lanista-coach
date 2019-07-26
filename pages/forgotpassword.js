import React from "react";
import ForgotpasswordScreen from "../src/screens/forgotpassword"

function Forgotpassword({memberId}) {
  return (
    <ForgotpasswordScreen  memberId={memberId}></ForgotpasswordScreen>
  );
}

Forgotpassword.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default Forgotpassword;
