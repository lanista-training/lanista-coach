import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Input } from 'native-base';

class LanistaInput extends Input {

  render() {
    return (
        <Input {...this.props}>

        </Input>
    );
  }

}

export {LanistaInput as Input};
