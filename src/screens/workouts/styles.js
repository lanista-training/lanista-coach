import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';
import Drawer from '@material-ui/core/Drawer';

export const Stage = styled.div`
  max-width: 935px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  max-width: 935px;
  position: relative;
  width: 100%;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin: 0 auto;
  height: 100vh;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;

export const ListWrapper = styled.div`
  overflow: auto;
  padding-top: 1.5em;
  width: 100%;
  padding-bottom: 4em;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  padding-top: 100px;
`;

export const StyledWorkout = styled.div`
  border-radius: 15px;
  position: relative;
  margin: 0 11px 22px 11px;
  background: #fff;
  width: 175px;
  height: 190px;
  overflow: hidden;
  box-shadow: 0 0 27px 0 #00000054;
  .workout-list-content {
    height: 155px;
    overflow: hidden;
    text-align: left;
    background-color: ${props => props.studio ? "#3F51B5" : (props.public ? (props.plugin ? "#64A992" : "rgb(155, 201, 61)") : "#03a9f4")};
    .workout-list-titel {
      height: 46px;
      line-height: 16px;
      font-family: RobotoDraft, Roboto, sans-serif;
      font-size: 18px;
      color: white;
      margin: 10px;
      margin-top: 20px;
      width: 155px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .workout-list-description {
      font-size: 13px;
      padding-left: 10px;
      padding-right: 10px;
      height: 50px;
      overflow: hidden;
      display: inline-table;
      color: white;
    }
  }
  .workout-list-footer {
    height: 35px;
    border-radius: 0 0 2px 2px;
    padding: 7px 8px 8px;
    border-top: 1px solid #e7e7e7;
    position: relative;
    overflow: hidden;
    background-color: #f2f2f2;
    .workout-list-duration-icon {
      color: #999;
      float: left;
      ::before {
        font-family: Lanista;
        content: "\\e90f";
        font-size: 1.4em;
      }
    }
    .workout-list-duration {
      font-family: RobotoDraft, Roboto, sans-serif;
      color: #848484;
      padding-left: 5px;
      font-size: 16px;
      float: left;
      letter-spacing: -1px;
    }
    .workout-list-privacy-icon {
      float: right;
      ::before {
        font-family: Lanista;
        content: "${props => (props.public ? "\\e911" : "\\e910")}";
        font-size: 1.4em;
        color: ${props => (props.public ? "#F44336" : "#00C853")};
      }
    }
  }
  .MuiCircularProgress-root {
    width: 50px;
    height: 50px;
    margin-top: calc(50% - 25px);
    margin-left: calc(50% - 25px);
  }
`;

export const ImageBlock  = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-style: ${props => props.editable ? 'solid!important' : 'initial'};
  border-width: 2px!important;
  border-color: ${props => props.status == 1 ? 'rgb(155, 201, 61)' : '#fe9500'};
  margin-top: 4px;
  margin-left: 10px;
  background-color: rgb(155, 201, 61);
  overflow: hidden;
  background-size: cover;
  box-shadow: 0 0 10px 0 #0000006b;
  ::before{
    font-family: Icons;
    content: "\f2bd";
    content: "\f2bd";
    font-size: 80px;
    color: white;
    line-height: 74px;
  }
`;

export const Foto  = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  position: relative;
  top: -74px;
  box-shadow: ${props => props.editable ? 'rgba(0,0,0,0.7) 0 1px 4px 0 inset, rgba(255,255,255,0.2) 0 1px 0 0' : 'initial'} ;
  background-repeat: no-repeat;
  background-position: center;
`;

export const CustomerHeader  = styled.div`
  margin-left: auto;
  display: flex;
  margin-right: 2em;
`;

export const TextBlock  = styled.div`
  font-size: 2em;
  text-align: right;
  font-family: Roboto;
  margin-top: 0.4em;
  line-height: 0.8em;
`;

export const FirstName  = styled.div`
  font-size: 0.8em;
`;

export const LastName  = styled.div`
  font-weight: bold;
`;

export const CustomerSection  = styled.div`
  display: flex;
  margin-right: 1em;
`;
