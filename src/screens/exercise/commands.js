import React from 'react';

import Help from '../../components/icons/Help';
import Tools from '../../components/icons/Tools';
import Back from '../../components/icons/Back';
import Play from '../../components/icons/Play';
import Edit from '../../components/icons/Edit';
import Remove from '../../components/icons/Remove';
import Sync from '../../components/icons/Sync';
import Chart from '../../components/icons/Chart';

export const getCommandsLeft = ({t, goBack}) => {
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

export const getCommandsRight = (
  t,
  activeTabName,
  owner,
  editMode,
  toggleEditMode,
  onToggleVideo,
  toggleEditVideoMode,
  onDeleteExercise,
  activeChart,
  toggleActiveChart
) => {
  let commands = []
  if (activeTabName == 'info') {
    commands.push({
        icon: <Play/>,
        text: t('play-video'),
        type: 'type-1',
        typex: 'Ionicons',
        name: 'plan-video',
        className: editMode ? 'command-green' : '',
        onTap: () => {
          editMode ? toggleEditVideoMode() : onToggleVideo()
        }
    });
    if(owner) {
      commands.push({
          icon: <Edit/>,
          text: t('edit-exercise'),
          type: 'type-1',
          typex: 'Ionicons',
          name: 'edit-exercise',
          className: editMode ? 'command-green' : '',
          onTap: () => {
            toggleEditMode()
          }
      });
      if( editMode ) {
        commands.push({
            icon: <Remove/>,
            text: 'remove-exercise',
            type: 'type-1',
            typex: 'Ionicons',
            name: 'remove-exercise',
            className: 'command-red',
            onTap: onDeleteExercise,
        });
      }
    }
  } else if(activeTabName == 'chart') {
    commands.push({
      name: 'chart',
      text: activeChart ? "1RM" : "Total Vol.",
      icon: <Chart/>,
      typex: 'Ionicons',
      onTap: toggleActiveChart,
    })
  } else if(activeTabName == 'protocolls') {

  }
  return commands
}
