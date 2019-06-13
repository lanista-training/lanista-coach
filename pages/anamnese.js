import React from "react";
import { withAuthSync } from '../lib/auth'
import AnamneseScreen from "../src/screens/anamnese"

function Ananmese({memberId}) {
  return (
    <AnamneseScreen  memberId={memberId}></AnamneseScreen>
  );
}

Ananmese.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default withAuthSync(Ananmese);
