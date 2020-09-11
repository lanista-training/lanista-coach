import * as React from 'react';
import { useRef, useState } from 'react';
import moment from 'moment';
import {
  Label,
  Icon,
  Popup,
  Image,
  Loader,
} from 'semantic-ui-react';
import Router from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import EmailIcon from '@material-ui/icons/Email';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Chat from '../MemberChat';

import {MenuButton, MessagesPanel, Message, Photo, StyledMenu, StyledMessageButton} from './styles';

import Slider from "react-slick";

export default ({data, onUpdateChatMessageStatus}) => {

  const sliderEl = useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [message, setMessage] = useState(null);

  const onMessageSelected = (message) => {
    sliderEl.current.slickNext();
    setMessage(message);
  }

  const onCloseMessage = () => {
    sliderEl.current.slickPrev();
    setMessage(null);
  }

  const onMessageClick = (chat) => {
    Router.push({
      pathname: '/exercise',
      query: {
        exercise: chat.exercise_id,
        member: message.member.id,
        tab: 2,
      }
    });
  }

  const newMessages = data.filter(message => message.status == 0).length;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false
  };

  return (
    <StyledMessageButton>
      <Badge badgeContent={newMessages} color="secondary">
        <IconButton
          color="primary"
          aria-label="messages"
          component="span"
          onClick={handleClick}
          style={{color: 'rgb(155,201,61)'}}
        >
          <EmailIcon fontSize="large" />
          <div className="button-"></div>
        </IconButton>
      </Badge>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Slider {...settings} ref={sliderEl}>
          <List component="nav" aria-label="main mailbox folders">
          {
            data.map((message, index) => {

              const messageDate = new Date(parseInt(message.creation_date));
              const isToday = moment(messageDate).isSame(moment(), 'day');

              return (
                <>
                  <Message
                    button
                    onClick={() => {
                      onUpdateChatMessageStatus(message.id);
                      onMessageSelected(message);
                    }}
                    key={index}
                    style={{minWidth: '400px', display: 'flex'}}
                  >
                    <Photo>
                      <div className="image" style={{backgroundImage: 'url("' + message.member.photoUrl + '")'}}/>
                    </Photo>
                    <ListItemText
                      primary={message.member.first_name + ' ' + message.member.last_name}
                      secondary={message.text}
                    />
                    <div className="status-section" className={message.status == 0 ? 'new' : 'old'}>
                      <div className="time-section">{isToday ? moment(messageDate).format("H:mm") : moment(messageDate).format('DD/MM/YY') }</div>
                      <div className="status-flag"></div>
                    </div>
                  </Message>
                  <Divider variant="inset" component="li" />
                </>
              )
            })
          }
          </List>
          <div className="messages-section">
          {
            message !== null && (
              <Chat
                visible={message !== null}
                closePanel={onCloseMessage}
                member={message ? message.member : {}}
                onMessageClick={onMessageClick}
              />
            )
          }
          </div>
        </Slider>
      </StyledMenu>
    </StyledMessageButton>
  );
};
