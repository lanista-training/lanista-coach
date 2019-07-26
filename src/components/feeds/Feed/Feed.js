import * as React from "react";
import styled from 'styled-components';
import moment from "moment";
import { Button, Icon, Card } from 'semantic-ui-react';
import FeedTypes from "../FeedTypes";

const StyledFeed = styled.div`
  height: 120px;
  padding: 0.7em;
  margin-bottom: 1.5em;
  background-color: white;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 5px;
  box-shadow: 0 0 27px 0 #0000001f;
  margin-left: 2em;
  margin-right: 2em;
`;
const Header = styled.div`
  padding: 1em;
  display: flex;
`;
const Photo = styled.div`
  border-radius: 50%;
`;
const HeaderText = styled.div`
  font-family: Abel;
  font-size: 1.2em;
  padding-left: 0.5em;
`;
const HeaderName = styled.span`
  font-weight: bold;
`;
const HeaderDescription = styled.span`
  font-weight: normal;
  color: #afaeae;
`;
const HeaderDateTime = styled.div`
  font-weight: normal;
  color: #afaeae;
`;
const StyledCommandsBlock = styled.div`
  font-weight: normal;
  color: #afaeae;
  border-top: 1px solid #efefef;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  font-size: 0.7em;
  padding-top: 0.5em;
`;
const StyledButton = styled(Button)`
  background: none!important;
  margin-right: 2.5em!important;
  padding: 0em!important;
  font-size: 1.2em!important;
  color: black;
  line-height: 2em!important;
  i {
    font-size: 1.2em;
    opacity: 1;
    color: black;
    height: 2em;
    font-weight: bold;
    position: relative;
    top: 0.2em;
  }
`;

const CommandsBlock = ({feedType}) => {
  return (
    <StyledCommandsBlock>
      { feedType == FeedTypes.birthday && <StyledButton circular onClick={() => {console.log("grattulieren");} }><Icon name='icon-time-inactive' />grattulieren</StyledButton> }
      { feedType == FeedTypes.appointment_request && (<><StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-calender-inactive' />termin verwalten</StyledButton><StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-email-inactive' />kontaktieren</StyledButton></>) }
      { feedType == FeedTypes.appointment && (<><StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-calender-inactive' />termin verwalten</StyledButton><StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-email-inactive' />kontaktieren</StyledButton></>) }
      { feedType == FeedTypes.workout_expired && (<><StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-calender-inactive' />termin vereinbahre</StyledButton><StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='refresh' />Trainingsplan verlängern</StyledButton></>) }
      { feedType == FeedTypes.workout_about_to_expire && (<><StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-calender-inactive' />termin vereinbahre</StyledButton><StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-email-inactive' />kontaktieren</StyledButton></>) }
      { feedType == FeedTypes.customer_activity && (<StyledButton circular onClick={() => {console.log("grattulieren");} }><Icon name='icon-email-inactive' />kontaktieren</StyledButton>) }
      { feedType == FeedTypes.message && (<StyledButton circular onClick={() => {console.log("antworten");} }><Icon name='icon-email-inactive' />antworten</StyledButton>) }
    </StyledCommandsBlock>
  )
};

export default ({feed, key, t}) => (
  <StyledFeed key={feed.type + feed.member.id}>
    <Header>
      <Photo>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#fafafa',
          borderRadius: '50%',
          WebkitBoxSizing: 'border-box',
          boxSizing: 'border-box',
          display: 'block',
          WebkitBoxFlex: '0',
          WebkitFlex: '0 0 auto',
          msFlex: '0 0 auto',
          flex: '0 0 auto',
          overflow: 'hidden',
          position: 'relative',
          backgroundImage: 'url("' + feed.member.photoUrl + '")',
          backgroundSize: "contain",
        }}>
        </div>
      </Photo>
      <HeaderText>
        <HeaderName>{feed.member.first_name} {feed.member.last_name}</HeaderName><HeaderDescription> {t("dashboard:" + feed.type + "_feed_text")}</HeaderDescription>
        <HeaderDateTime>{moment(parseInt(feed.target_date)).format('DD-MM-YYYY')}</HeaderDateTime>
      </HeaderText>
    </Header>
    <CommandsBlock feedType={feed.type}/>
  </StyledFeed>
);
