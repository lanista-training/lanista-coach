import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';

class LanistaCardItem extends CardItem {

  render() {
    return (
        <CardItem {...this.props}>

        </CardItem>
    );
  }

}

export {LanistaCardItem as CardItem};
