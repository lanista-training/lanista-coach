import * as React from "react";
import {
  Button,
  Label,
  Icon,
  Popup,
  Image,
  List,
  Dimmer,
  Loader,
  Sidebar,
  Menu,
} from 'semantic-ui-react';
import styled from 'styled-components';

import Header from "../Header";
import Footer from "../Footer";

const Scene = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  background-color: #fafafa;
`;
const Stage = styled.div`
  display: block;
  overflow-y: auto;
  margin-right: 100px;
  margin-left:  100px;
  height: 100%;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
const CommandPanelRight = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
`;
const CommandPanelLeft = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
`;
const CopyRightSection = styled.div`
    text-align: right;
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    font-weight: bold;
    padding-right: 0.5em;
    color: rgba(0,0,0,.6);
}
`;
const Trainer = styled.div`
    text-align: right;
    display: flex;
    line-height: 3em;
}
`;
const Avatar = styled.div`
  border-radius: 50%;
  border-style: solid;
  border-color: rgb(155, 201, 61);
  width: 45px;
  height: 45px;
  overflow: hidden;
`;
const AlarmnButton = styled(Button)`
  background: none!important;
  font-size: 2em!important;
  padding: 0em!important;
  .active {
    color: green!important;
  }
  position: absolute;
  right: 1em;
  top: 0.5em;
  color: rgb(155, 201, 61)!important;
`;

const CommandPanelButton = styled(Button)`
  margin-top: 20px!important;
  font-size: 2.5em!important;
`;
const SideBarMenu =  styled(List)`
  box-shadow: none!important;
  width: 400px!important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 2em!important;
`;
const SideBarMenuItem = styled(List.Item)`
  background-color: white!important;
  width: 100%;
  margin: 1em;
  border-radius: 5px!important;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 12px 0px;
  border: none;
  height: 5em;
  display: flex!important;
  align-items: center;
  padding-left: 1em!important;
`;
const SideBarMenuItemIcon = styled(List.Icon)`
  font-size: 2em!important;
  line-height: 1em!important;
`;
export default ({
  commandsLeft,
  commandsRight,
  children,
  headerChildren,
  alarms,
  t,
  goToSetup,
  processing,
  menu,
  menuVisible,
  onHideMenu,
  menuDirection,
  me,
}) => {
  return (
    <Sidebar.Pushable as={Scene}>
      <Sidebar
        as={SideBarMenu}
        animation='overlay'
        icon='labeled'
        onHide={onHideMenu}
        visible={menuVisible}
        width='thin'
        direction={menuDirection}
      >
        {
          menu && menu.map( menuItem => (
            <SideBarMenuItem onClick={menuItem.onClick}>
              <SideBarMenuItemIcon name={menuItem.icon} />
              <List.Content>{menuItem.text}</List.Content>
            </SideBarMenuItem>
          ))
        }
      </Sidebar>

      <Sidebar.Pusher dimmed={menuVisible} style={{overflowY: "auto"}} className="hide-scrollbar">
        <Loader style={{ top: '50vh' }}>{t('common:processing')}</Loader>
        <Header>
          {headerChildren}
        </Header>
        <Stage>
          <CommandPanelLeft>
            {
              commandsLeft.map((command, index) => (
                <CommandPanelButton
                  key={index}
                  onClick={command.onTap}
                  circular
                  icon={command.icon}
                  className={command.className}
                />
              ))
            }
          </CommandPanelLeft>
          {children}
          <CommandPanelRight>
          {
            commandsRight.map((command, index) => (
              <CommandPanelButton
                key={index+5}
                onClick={command.onTap}
                circular
                icon={command.icon}
                className={command.className}
              />
            ))
          }
          </CommandPanelRight>
        </Stage>
        <Footer>
          <Trainer>
            <Avatar onClick={goToSetup}>
              <div style={{
                backgroundColor: '#fafafa',
                webkitBoxSizing: 'border-box',
                boxSizing: 'border-box',
                display: 'block',
                webkitBoxFlex: '0',
                WebkitFlex: '0 0 auto',
                msFlex: '0 0 auto',
                flex: '0 0 auto',
                overflow: 'hidden',
                position: 'relative',
                backgroundImage: 'url(http://lanista-training.com/tpmanager/img/p/' + (me && me.id) + '_photo.jpg?_dc=1562657343714)',
                backgroundSize: 'cover',
                height: '100%',
              }}/>
            </Avatar>
            <span style={{
              marginLeft: '0.5em',
              lineHeight: '0.9em',
              paddingTop: '0.4em',
              textAlign: 'left',
              fontFamily: 'Abel',
              fontSize: '1.3em',
              fontWeight: 'bold',
              color: 'rgba(0,0,0,.6)'
            }}>
              {me && me.first_name}<br/> {me && me.last_name}
            </span>
          </Trainer>

          <Popup
            trigger={
              <AlarmnButton circular>
                <Icon name='bell' />
                <Label color='red' floating>
                  {alarms.length}
                </Label>
              </AlarmnButton>
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
        </Footer>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
};
