import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { Transition, Input } from 'semantic-ui-react'
import moment from 'moment'

const Chat = styled.div`
  height: 100%;
  display: flex!important;
  flex-flow: column;
  .header {
    .back-button{
      font-size: 1.5em;
      padding-top: 0.1em;
      width: 40px;
      height: 40px;
      float: left;
      ::before {
        font-family: Lanista;
        content: '\\e953';
      }
    }
    .title{
      text-align: center;
      line-height: 2em;
      padding-right: 40px;
    }
  }
  .panel {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    margin-top: 2px;
    padding-top: 6px;
    ::-webkit-scrollbar {
      display: none!important;
    }
  }
  .footer {
    display: flex;
    flex-direction: row;
    border-top: 1px solid rgb(238,238,238);
    input {
      border-style: initial;
      border-color: initial;
      box-shadow: none;
      box-sizing: border-box;
      font-size: 16px;
      opacity: 1;
      width: 100%;
      outline: none;
      padding: 16px 52px 16px 10px;
      -webkit-writing-mode: horizontal-tb !important;
      text-rendering: auto;
      color: initial;
      text-align: start;
      -webkit-appearance: textfield;
      background-color: white;
      -webkit-rtl-ordering: logical;
      cursor: text;
      margin: 0em;
      font: 400 11px system-ui;
    }
    button {
      border-width: 0px;
      border-style: initial;
      border-color: initial;
      border-image: initial;
      outline: none;
      padding: 14px 16px 12px;
    }
  }
`;
const Message = styled.div`
  .trainer {
    align-items: flex-end;
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    .message-bubble {
      box-shadow: rgba(0,0,0,0.15) 0px 1px 2px 0px;
      color: white;
      display: inline-block;
      font-size: 14px;
      max-width: 50%;
      position: relative;
      -webkit-transform-origin: right bottom;
      -ms-transform-origin: right bottom;
      transform-origin: right bottom;
      -webkit-animation: 0.3s ease 0s 1 normal forwards running Lmuha;
      animation: 0.3s ease 0s 1 normal forwards running Lmuha;
      background: rgb(255,255,255);
      border-radius: 18px 18px 0px;
      margin: 0px 0px 10px;
      overflow: hidden;
      padding: 12px;
      background: rgb(155, 201, 61);
    }
    .image-container{
      display: inline-block;
      order: 1;
      padding: 6px;
      .image{
        box-shadow: rgba(0,0,0,0.15) 0px 1px 2px 0px;
        -webkit-transform-origin: left bottom;
        -ms-transform-origin: left bottom;
        transform-origin: left bottom;
        -webkit-animation: 0.3s ease 0s 1 normal forwards running Lmuha;
        animation: 0.3s ease 0s 1 normal forwards running Lmuha;
        border-radius: 50% 50% 50% 0px;
        padding: 3px;
      }
    }
  }
  .member {
    align-items: flex-end;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    .message-bubble {
      box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
      color: rgb(255, 255, 255);
      display: inline-block;
      font-size: 14px;
      max-width: 50%;
      position: relative;
      transform-origin: left bottom;
      animation: 0.3s ease 0s 1 normal forwards running Lmuha;
      background: rgb(84, 173, 245);
      border-radius: 18px 18px 18px 0px;
      margin: 0px 0px 10px;
      overflow: hidden;
      padding: 12px;
    }
    .image-container {
      display: inline-block;
      order: 0;
      padding: 6px;
      .image{
        box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
        height: 40px;
        min-width: 40px;
        transform-origin: right bottom;
        animation: 0.3s ease 0s 1 normal forwards running Lmuha;
        border-radius: 50% 50% 0px;
        padding: 3px;
      }
    }
  }
  .image-container {
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
  }
  .exercise-images {
    display: flex;
  }
  .exercise-start-images {
    height: 60px;
    width: 60px;
    background-size: contain;
  }
  .exercise-end-images {
    height: 60px;
    width: 60px;
    background-size: contain;
  }
  .exercise {
    font-style: italic;
  }
`;

export default ({closePanel, visible, member, data, hideHeader, hideExercises, hideInputField, message, onMessageChange}) => {

  const el = useRef(null);
  useEffect(() => {
    el.current && el.current && el.current.scrollIntoView({ block: 'end' });
  });

  const messages = data.map(message => (
    <Message onClick={() => console.log(message)}>
      <div className={message.type === 0 ? 'trainer' : 'member'}>
        <div className='image-container'>
          <div className="image" style={{backgroundImage: 'url("' + message.photoUrl + '")'}}/>
        </div>
        <div className='message-bubble'>
          {moment(parseInt(message.creation_date)).format('DD/MM/YYYY h:mm')}
          {!hideExercises && (
            <div className='exercise-images'>
              <div className='exercise-start-images' style={{backgroundImage: 'url("' + message.exercise_start_image + '")'}}/>
              <div className='exercise-end-images' style={{backgroundImage: 'url("' + message.exercise_end_image + '")'}}/>
            </div>
          )}
          {!hideExercises && (
            <div className='exercise'>"{message.exercise_name}"</div>
          )}
          <div className='text'>{message.text}</div>
        </div>
      </div>
    </Message>
  ))
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
          <div ref={el}>
            {messages}
          </div>
        </div>
        {!hideInputField && (
          <Input
            placeholder='Nachricht'
            value={message}
            onChange={onMessageChange}
          />
        )}
      </Chat>
    </Transition>
  )
};
