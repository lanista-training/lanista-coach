import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { Transition, Input } from 'semantic-ui-react';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

import { ChatContainer, MessageList, Message, MessageInput, Avatar, ConversationHeader, ArrowButton } from '@chatscope/chat-ui-kit-react';
import MateriaUiAvatar from '@material-ui/core/Avatar';
import { StyledChat, StyledMenu } from './styles';
import { useTranslate } from '../../hooks/Translation';

const getMessageContent = (message, hideExercises) => {
  return (
    <Message.HtmlContent
      html={
        "<strong>"
        + message.first_name + ' ' + message.last_name + "</strong><br />"
        + (!hideExercises ? "<br /><div class='exercise-section'><div class='exercise-images'><div class='exercise-start-images' style='background-image: url(" + message.exercise_start_image + ")'></div><div class='exercise-end-images' style='background-image: url(" + message.exercise_end_image + ")'/></div></div><div class='exercise-name'>" + message.exercise_name + "</div></div class='exercise-section'>" : "")
        + message.text
        + "<br /><div style='text-align: right;font-size: 12px;font-weight: 200;'>" + moment(parseInt(message.creation_date)).format('DD/MM/YYYY h:mm') + "</div>"
      }
    />
  )
}

export default ({
  closePanel,
  visible,
  member,
  data,
  hideHeader,
  hideExercises,
  hideInputField,
  message,
  onMessageChange,

  onCreateChatMessage,
  createChatMessageLoading,

  onDeleteChatMessage,
  deleteChatMessageLoading,

  onMessageClick,

  loadingMessages,

}) => {

  const {t} = useTranslate("exercise");

  const onSubmit = event => event.preventDefault();
  const el = useRef(null);
  useEffect(() => {
    el.current && el.current && el.current.scrollIntoView({ block: 'end' });
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [selectedMessage, setSelectedMessage] = React.useState(null);

  const handleClick = (event, messageId) => {
    setSelectedMessage(messageId);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSelectedMessage(null);
    setAnchorEl(null);
  };

  const onClickDeleteButton = () => {
    onDeleteChatMessage(selectedMessage);
    handleClose();
  }

  const messages = data.map((message) => {
    return (
      <Message
        model={{
          sentTime: moment(parseInt(message.creation_date)).format('DD/MM/YYYY h:mm'),
          direction: message.type == 0 ? "outgoing" : "incoming",
          sender: message.first_name + ' ' + message.last_name,
          message: message.text,
        }}
        onClick={(event) => onMessageClick ? onMessageClick(message) : handleClick(event, message.id)}
      >
        <Message.Header sentTime={moment(parseInt(message.creation_date)).format('DD/MM/YYYY h:mm')} />
        <Avatar src={message.photoUrl} name={message.first_name + message.last_name} >
          <MateriaUiAvatar src={message.photoUrl}></MateriaUiAvatar>
        </Avatar>
        {getMessageContent(message, hideExercises)}
        <Message.Footer sender={message.first_name + ' ' + message.last_name} sentTime={moment(parseInt(message.creation_date)).format('DD/MM/YYYY h:mm')} />
      </Message>
    );
  });
console.log("member", member)
  return (
    <StyledChat >
      <ChatContainer>
        { !hideHeader &&
          <ConversationHeader>
            <ConversationHeader.Back onClick={closePanel}/>
            <Avatar src={member.photoUrl} name={member.first_name + ' ' + member.last_name} >
              <MateriaUiAvatar src={member.photoUrl}></MateriaUiAvatar>
            </Avatar>
            <ConversationHeader.Content userName={member.first_name + ' ' + member.last_name}  />
          </ConversationHeader>
        }
        <MessageList loading={loadingMessages}>
          {messages}
        </MessageList>
        { !hideInputField &&
          <MessageInput
            attachButton={false}
            placeholder={t("create-chat-placeholder")}
            onChange={(value) => onMessageChange(value)}
            value={message}
            onSend={onCreateChatMessage}
          />
        }
      </ChatContainer>
    </StyledChat>
  );

  /*
  return (
    <Transition unmountOnHide visible={visible} animation='fly left' >
      <Chat>
        {!hideHeader && (
          <div className='header'>
            <div onClick={closePanel} className='back-button'/>
            <div className='title'>{member.first_name} {member.last_name}</div>
          </div>
        )}
        <div className='panel'>
          <div ref={el} className="messages-list">
            {messages}
          </div>
        </div>
        {!hideInputField && (
          <Paper component="form" onSubmit={onSubmit}>
            <InputBase
              placeholder={t("create-chat-placeholder")}
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e) => onMessageChange(e.target.value)}
              value={message}
            />
            <IconButton
              type="submit"
              aria-label="search"
              onClick={onCreateChatMessage}
              style={{color: (message && message.length > 0) ? "rgb(155,201,61)" : ""}}
              disabled={!(message && message.length > 0)}
            >
              <SendIcon />
            </IconButton>
          </Paper>
        )}
        <StyledMenu
          id="message-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Fab color="secondary" aria-label="add" onClick={() => onClickDeleteButton(message.id)}>
            <DeleteIcon />
          </Fab>
        </StyledMenu>
      </Chat>
    </Transition>
  )
  */
};
