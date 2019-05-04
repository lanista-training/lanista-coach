import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Item } from 'native-base';

class LanistaItem extends Item {

  render() {
    return (
        <Item {...this.props}>

        </Item>
    );
  }

}

export {LanistaItem as Item};
