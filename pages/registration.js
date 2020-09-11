import { Component } from 'react';
import Router from 'next/router';
import RegistrationScreen from "../src/screens/registration";

function Registration() {

  const goBack = () => Router.back();

  return (
    <RegistrationScreen goBack={goBack} />
  );
  
}

export default Registration
