import React from "react";
import { withAuthSync } from '../lib/auth'
import MeasuresScreen from "../src/screens/measures"

function Measures({memberId}) {
  return (
    <MeasuresScreen  memberId={memberId}></MeasuresScreen>
  );
}

Measures.getInitialProps = context => {
  return ({
    memberId: context.query.customer
  })
};

export default withAuthSync(Measures);
