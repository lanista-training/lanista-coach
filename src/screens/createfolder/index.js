import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from "react-router";
import { translate } from 'react-i18next';
import Scene from "../../components/Scene";

import Template from './Template';

@translate(['common', 'setup'], { wait: true })
class TemplateWithData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      processing: false,
    };
    this.goBack = this.goBack.bind(this);
  };

  goBack() {
    this.props.history.goBack();
  }

  getCommandsRight() {
    return ([]);
  }

  getCommandsLeft() {
    return ([{
          //icon: CustomerIcon,
          icon: 'icon-back',
          text: 'Back',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'back',
          onTap: () => {
            this.goBack();
          }
      }, {
          //icon: CustomerIcon,
          icon: 'icon-tools-inactive',
          text: 'Setting',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'settings',
          onTap: () => {
            console.log("Command Settings");
          }
      }, {
          //icon: HelpIcon,
          icon: 'icon-help-inactive',
          text: 'Help',
          type: 'type-1',
          typex: 'Ionicons',
          name: 'help-circle',
          onTap: () => {
            console.log("Command Help");
          }
      }]);
  }

  render() {
    const {t, i18n} = this.props;
    const {processing} = this.state;

    return(
      <Scene
        commandsLeft={this.getCommandsLeft()}
        commandsRight={this.getCommandsRight()}
        processing={processing}
      >
        <Template
          t={t}
        />
      </Scene>
    )
  }
}

export default withRouter(TemplateWithData);
