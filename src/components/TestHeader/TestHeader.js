import * as React from "react";
import styled from 'styled-components';
import moment from "moment";
import { Header, Icon, Image } from 'semantic-ui-react';

import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import Tooltip from '@material-ui/core/Tooltip';

const ImageBlock  = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-style: solid!important;
  border-width: 4px!important;
  border-color: rgb(155,201,61);
  margin-top: 4px;
  margin-left: 10px;
  background-color: rgb(155,201,61);
  overflow: hidden;
  background-size: cover;
  ::before{
    font-family: Icons;
    content: "\f2bd";
    font-size: 73px;
    color: white;
    line-height: 74px;
  }
`;
const Foto  = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  position: relative;
  top: -74px;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 1px 4px 0px inset, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
`;
const CustomerInfo  = styled.div`
  margin-left: auto;
  display: flex;
  margin-right: 2em;
`;
const TestHeader  = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  .creator-full-name {
    margin-top: -23px;
    margin-left: 14px;
    span {
      font-weight: 900;
    }
  }
`;
const TextBlock  = styled.div`
  font-size: 2em;
  text-align: right;
  font-family: Roboto;
  margin-top: 0.4em;
  line-height: 0.8em;
`;
const TestName  = styled.div`
  font-size: 2em;
  margin-left: 0.5em;
  line-height: 2.5em;
  font-weight: 700;
`;
const FirstName  = styled.div`
  font-size: 0.8em;
`;
const LastName  = styled.div`
  font-weight: bold;
`;


export default ({t, userId, firstName, lastName, testName, creatorFullName, editable}) => (
  <TestHeader>
    <div className="test-info">
      <TestName>
        {testName}
        {editable ?
          (
            <Tooltip title={t("test-editable")}>
              <IconButton aria-label="delete">
                <LockOpenIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title={t("test-not-editable")}>
              <IconButton aria-label="delete">
                <LockIcon />
              </IconButton>
            </Tooltip>
          )}
      </TestName>
      <div className="creator-full-name"><span>{t("trainer")}</span> {creatorFullName}</div>

    </div>
    <CustomerInfo>
      <TextBlock >
        <LastName >{lastName}</LastName>
        <FirstName >{firstName}</FirstName>
      </TextBlock>
      <ImageBlock >
        <Foto style={{ backgroundImage: 'url(http://lanista-training.com/tpmanager/img/p/'+ userId + '_photo.jpg)' }}/>
      </ImageBlock>
    </CustomerInfo>
  </TestHeader>
);
