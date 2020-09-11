import * as React from "react"
import { useState } from "react"
import styled from 'styled-components'
import moment from "moment"
import { Button, Icon, Card } from 'semantic-ui-react'
import FeedTypes from "../FeedTypes"
import VisibilitySensor from "react-visibility-sensor"

const StyledFeed = styled.div`
  height: 120px;
  padding: 0.7em;
  margin-bottom: 1.5em;
  background-color: white;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 5px;
  box-shadow: 0 0 27px 0 #0000001f;
  margin-left: 4em;
  margin-right: 1em;
  position: relative;
  border-top: 3px solid ${props => props.color};
  ::before {
    content: '';
    position: absolute;
    left: -1em;
    height: 0;
    width: 0;
    border: 7px solid transparent;
    border-right: 7px solid white;
  }
`;
const Header = styled.div`
  padding: 1em 0;
  display: flex;
`;
const Photo = styled.div`
  border-radius: 50%;
`;
const HeaderText = styled.div`
  font-family: Roboto;
  font-size: 1.1em;
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
const FeedIcon = styled.div`
  padding: 0em!important;
  color: ${props => props.color};
  width: 20px;
  height: 35px;
  margin-left: 0.7em;
  ::before{
    font-size: 1.5em;
    line-height: 1em;
    margin-top: -0.7em;
  }
`;
const CommandsBlock = ({feed, congratulateMember, openPlan, t}) => {
  return (
    <StyledCommandsBlock>
      { feed.type == FeedTypes.birthday &&
        <StyledButton circular onClick={() => {
          congratulateMember(feed.member.id);
          }}
        >
          <Icon name='icon-time-inactive' />{t('TO_CUSTOMER')}
        </StyledButton>
      }
      { feed.type == FeedTypes.appointment_request &&
        (
          <>
            <StyledButton circular onClick={() => {console.log("HALLO");} }>
              <Icon name='icon-calender-inactive' />{t('MANAGE_DEADLINES')}
            </StyledButton>
            <StyledButton circular onClick={() => {console.log("HALLO");} }>
              <Icon name='icon-email-inactive' />{t('CONTACT_CUSTOMER')}
            </StyledButton>
          </>
        )}
      { feed.type == FeedTypes.appointment &&
        (
          <>
            <StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-calender-inactive' />{t('MANAGE_DEADLINES')}</StyledButton>
            <StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-email-inactive' />{t('CONTACT_CUSTOMER')}</StyledButton>
          </>
        )
      }
      { feed.type == FeedTypes.workout_expired &&
        (
          <>
            <StyledButton circular onClick={() => {
                openPlan(feed.member.id, feed.id);
              }}
            >
              <Icon name='refresh' />{t('EXTEND_PLAN')}
            </StyledButton>
          </>
        )
      }
      { feed.type == FeedTypes.workout_about_to_expire &&
        (
          <>
            <StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-calender-inactive' />{t('MANAGE_DEADLINES')}</StyledButton>
            <StyledButton circular onClick={() => {console.log("HALLO");} }><Icon name='icon-email-inactive' />{t('CONTACT_CUSTOMER')}</StyledButton>
          </>
        )
      }
      { feed.type == FeedTypes.customer_activity &&
        (
          <StyledButton circular onClick={() => {congratulateMember(feed.member.id);} }><Icon name='icon-email-inactive' />{t('CONTACT_CUSTOMER')}</StyledButton>
        )
      }
      { feed.type == FeedTypes.message &&
        (
          <StyledButton circular onClick={() => {console.log("antworten");} }><Icon name='icon-email-inactive' />{t('RESPOND')}</StyledButton>
        )
      }
    </StyledCommandsBlock>
  )
};

export default ({feed, key, t, congratulateMember, openPlan, accesslevel}) => {
  const [visible, setVisible] = useState(false);
  const color = (feed.type ==  FeedTypes.birthday ? "rgb(33, 150, 243)" : feed.type ==  FeedTypes.workout_expired ? "rgb(233, 30, 99)" : feed.type == FeedTypes.customer_activity ? "rgb(16,204,82)" : "#d2d2d2")
  return(
    <VisibilitySensor
      onChange={(isVisible) => {
        if( isVisible ) {
          setVisible(true)
        }
      }}
    >
      <div key={feed.type + feed.member.id + feed.target_date} className={visible ? 'bounce-in' : 'is-hidden'}>
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
            float: "left"
          }}>
          </div>
        </Photo>
        <StyledFeed color={color} className={"feed-content"} >
            <Header>
              <FeedIcon color={color} className={"icon " + (feed.type ==  FeedTypes.birthday ? "icon-birthday-inactive" : "icon-calender-inactive")}/>
              <HeaderText>
                <HeaderName>{feed.member.first_name} {feed.member.last_name}</HeaderName><HeaderDescription> {t("dashboard:" + feed.type + "_feed_text")}</HeaderDescription>
              </HeaderText>
            </Header>
            <CommandsBlock
              feed={feed}
              congratulateMember={congratulateMember}
              openPlan={openPlan}
              t={t}
            />
        </StyledFeed>
      </div>
    </VisibilitySensor>
  )
};
