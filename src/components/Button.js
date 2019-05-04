import React, { Component } from 'react';
import { Button, Text, Icon } from 'native-base';

class LanistaButton extends Button {

  render() {
    return (
      <Button {...this.props}>
        <Text style={this.props.textstyle}>{this.props.title}</Text>
      </Button>
    );
  }
}
export {LanistaButton as Button};
