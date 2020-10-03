import * as React from "react";
import {
  Button,
  Label,
  Icon,
  Confirm,
  Image,
  List,
  Dimmer,
  Loader,
  Sidebar,
  Menu,
} from 'semantic-ui-react';

import Tools from '../../components/icons/Tools';
import Help from '../../components/icons/Help';

import DrawerList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {useTransition, animated} from 'react-spring';
import Header from "../Header";
import Footer from "../Footer";
import MessagesButton from "../MessagesButton";
import AlarmsButton from "../AlarmsButton";

import Chronometer from "../Chronometer";
import AnatomyGallery from "../AnatomyGallery";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LanistaButton from '../LanistaButton';

import {
  Scene,
  Stage,
  CommandPanelRight,
  CommandPanelLeft,
  CopyRightSection,
  Trainer,
  Avatar,
  AlarmButton,
  CommandPanelButton,
  SideBarMenu,
  SideBarMenuItem,
  SideBarMenuItemIcon,
  AlerstsSection,
  StyledDrawer,
} from './styles';

import {env} from '../../configuration';

export default ({
  commandsLeft,
  commandsRight,
  children,
  headerChildren,
  mode,
  renderLogo,
  alarms,
  t,
  goToSetup,
  processing,
  menu,
  menuVisible,
  onHideMenu,
  menuDirection,
  me,
  sidbarMenu,
  sidbarDirection,
  sidebarVisible,
  setSidebarVisible,
  message,

  networkStatus,

  showLicenceExpiredWarning,
  onCloseLicenceExpiredWarning,

}) => {
  const [showChronometer, setShowChronometer] = React.useState(false);
  const toggleChronometer = () => setShowChronometer(!showChronometer);

  const [showGallery, setShowGallery] = React.useState(false);
  const toggleGallery = () => setShowGallery(!showGallery);

  const [optionsDrawerOpen, setOptionsDrawerOpen] = React.useState(false);
  const toggleOptionsDrawer = () => setOptionsDrawerOpen(!optionsDrawerOpen);

  const leftCommands = [];
  commandsLeft.map(command => {
    leftCommands.push(command);
  });
  leftCommands.push({
    icon: <Tools/>,
    iosname: 'tools-inactive',
    text: t("tools"),
    type: 'type-1',
    typex: 'Ionicons',
    name: 'settings',
    onTap: () => {
      toggleOptionsDrawer();
    }
  }, {
      icon: <Help/>,
      iosname: 'help-inactive',
      text: t("help"),
      type: 'type-1',
      typex: 'Ionicons',
      name: 'help-circle',
      onTap: () => {
        window.open("https://desk.zoho.eu/portal/lanista/de/home",'_blank');
      }
  });

  const transitionsRight = useTransition(commandsRight, item => item.name, {
    from: { opacity: 0, height: 0},
    enter: { opacity: 1, height: 100, width: 90 },
    leave: { opacity: 0, height: 0 },
  });

  const transitionsLeft = useTransition(leftCommands, item => item.name, {
    from: { opacity: 0, height: 0},
    enter: { opacity: 1, height: 100, width: 90 },
    leave: { opacity: 0, height: 0 },
  });

  const [showMessage, setShowMessage] = React.useState(false);
  const onCloseMessage = () => {
    setShowMessage(false);
  }

  React.useEffect(() => {
    if( message !== undefined) {
      setShowMessage(true)
    } else {
      setShowMessage(false)
    }
  }, [message]);


  const {photoUrl, first_name, last_name, bu} = me.me ? me.me : {};

  return (
    <>
      <Loader style={{ top: '50vh' }}>{t('common:processing')}</Loader>
      <Header renderLogo={renderLogo} mode={mode} networkStatus={networkStatus}>
        {headerChildren}
      </Header>
      <Stage>
        <CommandPanelLeft>
          {
            transitionsLeft.map(({ item, props, key }) =>
              <animated.div key={key} style={props}>
                {item.render ? item.render() : <BottomNavigationAction onClick={item.onTap} label={item.text} icon={item.icon} style={item.style}/>
                }
              </animated.div>
            )
          }
        </CommandPanelLeft>
        {children}
        <CommandPanelRight>
        {
          transitionsRight.map(({ item, props, key }) =>
            <animated.div key={key} style={props}>
              {item.render ? item.render() : <BottomNavigationAction onClick={item.onTap} label={item.text} icon={item.icon} style={item.style}/>
              }
            </animated.div>
          )
        }
        </CommandPanelRight>
      </Stage>
      <Footer>
        <Trainer>
          <Avatar onClick={goToSetup}>
            <div style={{
              backgroundColor: '#fafafa',
              boxSizing: 'border-box',
              display: 'block',
              WebkitFlex: '0 0 auto',
              msFlex: '0 0 auto',
              flex: '0 0 auto',
              overflow: 'hidden',
              position: 'relative',
              backgroundImage: 'url(' + photoUrl + ')',
              backgroundSize: 'cover',
              height: '100%',
            }}/>
          </Avatar>
          <span style={{
            marginLeft: '0.5em',
            lineHeight: '0.9em',
            paddingTop: '0.4em',
            textAlign: 'left',
            fontSize: '1.3em',
            fontWeight: 'bold',
            color: 'rgba(0,0,0,.6)',
            marginTop: '-55px',
            padding: "0.5em 0.5em 0.5em 0.5em",
            background: "rgb(250 250 250 / 67%)",
            borderTopRightRadius: "15px"
          }}>
            {first_name}<br/> {last_name}
          </span>
        </Trainer>
        <AlerstsSection>
          <MessagesButton/>
          {
            me && me.accesslevel == 1 &&
            <AlarmsButton/>
          }
          <div className="version-section">
            version: {env.version}
          </div>
        </AlerstsSection>
      </Footer>

      <StyledDrawer anchor="left"
        open={optionsDrawerOpen}
        onClose={() => toggleOptionsDrawer()}
      >
        <div
          role="presentation"
          onClick={() => toggleOptionsDrawer()}
          onKeyDown={() => toggleOptionsDrawer()}
        >
          <DrawerList>
            <div className="list-item-wrapper">
              <ListItem button key="new-plan-from-templates" onClick={toggleGallery}>
                <ListItemText primary={t("anatomy")} />
              </ListItem>
            </div>
            <div className="list-item-wrapper">
              <ListItem button key="new-plan" onClick={toggleChronometer}>
                <ListItemText primary={t("stopwatch")} />
              </ListItem>
            </div>
          </DrawerList>
        </div>
      </StyledDrawer>

      {showChronometer && <Chronometer onClose={toggleChronometer}/>}
      {showGallery && <AnatomyGallery t={t} onClose={toggleGallery}/>}

      <Confirm
        open={showMessage}
        content={message}
        onCancel={onCloseMessage}
        onConfirm={onCloseMessage}
      />

      <Dialog
        open={showLicenceExpiredWarning}
        onClose={onCloseLicenceExpiredWarning}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("licence_expired_title")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {bu > 0 ? t("licence_expired_text_gym") : t("licence_expired_text_trainer")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {bu == 0 && (
            <LanistaButton onClick={() => {
              onCloseLicenceExpiredWarning();
              goToSetup();
            }} color="primary">
              {t("licence_dialog_go_to_store")}
            </LanistaButton>
          )}
          <LanistaButton onClick={onCloseLicenceExpiredWarning} color="primary" inverted autoFocus>
            {t("licence_dialog_ok")}
          </LanistaButton>
        </DialogActions>
      </Dialog>
    </>
  )
};
