import * as React from "react";
import styled from 'styled-components';
import {
  Button,
  Label,
  Icon,
  Popup,
  Image,
  List,
  Loader,
} from 'semantic-ui-react';

const AlarmButton = styled(Button)`
  background: none!important;
  font-size: 1.9em!important;
  padding: 0em!important;
  .active {
    color: green!important;
  }
  position: absolute;
  right: 2em;
  top: 0.7em;
  color: rgb(155, 201, 61)!important;
`;

export default ({}) => {
  const alarms = []
  return (
    <Popup
      on='click'
      trigger={
        <AlarmButton>
          <Icon name='bell' />
          {
            alarms && alarms.length > 0 &&
            <Label color='red' floating>
              {alarms.length}
            </Label>
          }
        </AlarmButton>
      }
      content={
        <List relaxed='very' divided verticalAlign='middle'>
        {
          alarms.map((alarm, index) => {
            return (
              <List.Item key={index} style={{minWidth: '400px'}}>
                <Image avatar src={alarm.imageUrl} />
                <List.Content>
                  <List.Header as='a'>{alarm.fullName}</List.Header>
                  <List.Description>
                    {t("common:alarm_" + alarm.type)}
                  </List.Description>
                </List.Content>
              </List.Item>
            )
          })
        }
        </List>
      }
      on='click'
      position='top right'
    />
  )
};
