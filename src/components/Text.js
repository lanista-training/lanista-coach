import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

class LanistaText extends Text {

  render() {
    return (
        <Text {...this.props}>
            {this.props.title}
        </Text>

    );
  }

}

export {LanistaText as Text};
