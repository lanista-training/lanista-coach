import React, { Component } from 'react';
import styled from 'styled-components'
import moment from 'moment'

const StyledWidget = styled.div`
  background-color: white;
  border: 1px solid rgba(0,0,0,.0975);
  box-shadow: 0 0 27px 0 #0000001f;
  border-radius: 5px;
  max-width: 250px;
  min-width: 250px;
  display: flex;
  flex-flow: column;
  margin-top: 1.5em;
  .widget-title {
    flex: 1;
    padding: 5px 0px 5px 0px;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0,.0975);
  }
  .widget-content {
    height: 11.5em;
    padding: 0 0.5em;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none!important;
    }
    .list-item {
      padding: 0.5em;
      border-bottom: 1px dotted rgba(0,0,0,.0975);
      display: flex;
      width: 100%;
      .member {
        flex: 1;
        display: flex;
      }
      .member-image{
        background-size: contain;
        width: 40px;
        height: 40px;
        background-color: #fafafa;
        border-radius: 50%;
        Webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: block;
        webkit-box-flex: 0;
        webkit-flex: 0 0 auto;
        msFlex: 0 0 auto;
        flex: 0 0 auto;
        overflow: hidden;
        position: relative;
      }
      .member-name{
        padding-top: 0.5em;
        padding-left: 0.5em;
      }
      .target-date {
        padding-top: 0.5em;
      }
    }
    .empty-list{
      text-align: center;
      padding-top: 2em;
    }
  }
`;

export default function({t, data, loading, error, title}) {
  return (
    <StyledWidget>
      <div className="widget-title">
        {title}
      </div>
      <div className="widget-content">
        {
          data && data.incomingEvents && data.incomingEvents.data.length == 0 && (
            <div className="empty-list">Keine Daten</div>
          )
        }
        {
          data && data.incomingEvents && data.incomingEvents.data.map( item => (
            <div className="list-item">
              <div className="member">
                <div className="member-image"
                  style={{backgroundImage: 'url("' + item.member.photoUrl + '")',}}
                >
                </div>
                <div className="member-name">
                  {item.member.first_name} {item.member.last_name}
                </div>
              </div>
              <div className="target-date">{moment(parseInt(item.target_date)).format("DD.MM.YYYY")}</div>
            </div>
          ))
        }
      </div>
    </StyledWidget>
  )
}