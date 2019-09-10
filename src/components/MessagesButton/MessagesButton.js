import * as React from 'react'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {
  Button,
  Label,
  Icon,
  Popup,
  Image,
  List,
  Loader,
  Transition,
} from 'semantic-ui-react'
import Chat from '../MemberChat'

const MessagesPanel = styled.div`
  height: calc(100vh - 87px);
  width: 400px;
  padding-top: 1em;
  overflow: hidden;
  .list>.item:last-child {
    padding-bottom: .85714286em;
    border-bottom: 1px solid rgba(34,36,38,.15);
  }
`;
const Message = styled(List.Item)`
  .new-message {
    display: flex!important;
    .user-name {
      ::after {
        content: '';
        position: absolute;
        height: 10px;
        width: 10px;
        background: #0bc30b;
        border-radius: 50%;
        margin-left: 1em;
        margin-top: 0.5em;
        right: 15px;
      }
    }
  }
  .message-date {
    position: absolute;
    right: 0;
    padding-right: 1em;
  }
`;

const MessagesButton = styled(Button)`
  background: none!important;
  font-size: 1.9em!important;
  padding: 0em!important;
  position: absolute;
  right: 0em;
  top: 0.7em;
  color: rgb(155, 201, 61)!important;
  .active {
    color: green!important;
  }
`;
const Photo = styled.div`
  border-radius: 50%;
  margin-right: 1em;
  .image {
    width: 40px;
    height: 40px;
    background-color: #fafafa;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    flex: 0 0 auto;
    overflow: hidden;
    position: relative;
    background-size: contain;
  }
`;

export default ({data}) => {

  const [message, setMessage] = useState(null);

  function onMessageSelected(message) {
    setMessage(message)
  }

  const newMessages = data.filter(message => message.status == 0).length
  return (
    <Popup
      on='click'
      className='modal-list-wrapper'
      onClose={() => setMessage(null)}
      trigger={
        <div>
          <MessagesButton circular>
            <Icon name='mail' />
            {
              newMessages > 0 &&
              <Label color='red' floating>
                {newMessages}
              </Label>
            }
          </MessagesButton>
        </div>
      }
      content={
        <MessagesPanel>
          {
            message !== null && (
              <div style={{height: "calc(100vh - 180px)"}}>
                <Chat visible={message !== null} closePanel={() => setMessage(null)} member={message ? message.member : {}}/>
              </div>
            )
          }
          {
            <Transition unmountOnHide visible={message === null} animation='slide right' duration={500}>
              <List style={{height: '100%'}} relaxed='very' divided verticalAlign='middle'>
              {
                data.map((message, index) => {
                  return (
                    <Message onClick={() => onMessageSelected(message)} key={index} style={{minWidth: '400px', display: 'flex'}}>
                      <Photo>
                        <div className="image" style={{backgroundImage: 'url("' + message.member.photoUrl + '")'}}/>
                      </Photo>
                      <List.Content>
                        <List.Header as='a' className={message.status == 0 ? 'new-message' : ''}>
                          <div className="user-name">{message.member.first_name} {message.member.last_name} </div>
                          <div className="message-date">{moment(parseInt(message.creation_date)).fromNow()}</div>
                        </List.Header>
                        <List.Description>
                          {message.text}
                        </List.Description>
                      </List.Content>
                    </Message>
                  )
                })
              }
              </List>
            </Transition>
          }
        </MessagesPanel>
      }
      on='click'
      position='top right'
    />
  )
};
