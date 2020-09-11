import React from 'react';
import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';

export const getCommandsLeft = ({goBack}) => {
  return ([{
      icon: <Back/>,
      iosname: 'tools-inactive',
      text: '',
      type: 'type-1',
      typex: 'Ionicons',
      name: 'back',
      style: {color: '#34acfb'},
      onTap: () => {
        goBack();
      }
  }]);
}

export const getCommandsRight = () => {
  let commands = []

  return commands;
}
