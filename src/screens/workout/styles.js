import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import { motion } from "framer-motion";

export const Stage = styled.div`
  padding-top: 60px;
  max-width: 85vw;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;
  height: 100vh;
  width: 100%;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;
export const StyledWorkout = styled.div`
  height: calc(100% - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  .delete-section {
    background: #ff000024;
    position: absolute;
    width: calc(100% - 200px);
    height: 10em;
    .icon {
      font-size: 4em;
      margin-top: 1em;
      text-align: center;
      width: 100%;
      color: #e00000;
    }
  }
  .info-section{
    display: flex;
    flex-direction: row;
    min-height: 124px;
    .workout-description {
      flex: 1;
      margin-top: 20px;
      margin-bottom: 1em;
      background: white;
      font-size: 14px;
      border-radius: 10px;
      padding: 10px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 19px;
      display: -webkit-box;
      box-shadow: 0 0.08em 0.25em 0.075em rgba(0,0,0,0.075)!important;
      color: #b7b7b7;
      min-width: 500px;
      display: flex;
      align-self: center;
      justify-content: center;
      .description-content {
        max-width: 465px;
      }
    }
    .workout-infos {
      flex: 1;
      display: flex;
      flex-flow: column;
      align-items: flex-end;
      margin-top: 10px;
      font-size: 16px;
      padding: 10px;
      padding-left: 20px;
      line-height: 22px;
      .creation-date {
        width: 100%;
        color: #b2b2b2;
        span {
          color: black;
          float: right;
        }
      }
      .creator-fullname {
        width: 100%;
        color: #b2b2b2;
        span {
          color: black;
          float: right;
        }
      }
      .creator-image {
        margin-right: inherit;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-size: cover;
        position: relative;
        display: block;
        float: right;
      }
    }
  }
  .exercises-section{
    flex: 1;
  }
`;
export const StyledTab = styled(Tab)`
  .menu {
    margin-bottom: 0;
    box-shadow: 0px 8px 18px -15px #11111191!important;
  }
  .tab {
    height: calc(100vh - 184px);
    overflow: scroll;
    padding-bottom: 10em;
    padding-top: 2em;
    padding-left: 0;
    padding-right: 0;
    border: 0!important;
    background: transparent;
    ::-webkit-scrollbar {
      width: 0px!important;
      background: transparent!important; /* make scrollbar transparent */
    }
    .split-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;
export const StyledExercise = styled.div`
  overflow: hidden;
  width: 180px!important;
  height: 195px!important;
  margin-bottom: 15px;
  box-shadow: 0 0 27px 0 #00000054;
  border-radius: 15px;
  margin-left: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
  -ms-flex-flow: column;
  flex-flow: column;
  .exercise-images{
    display: flex;
    .exercise-start-image {
      width: 90px;
      height: 90px;
      background-size: cover;
      background-color: #e6e6e6;
    }
    .exercise-end-image {
      width: 90px;
      height: 90px;
      background-size: cover;
      background-color: #e6e6e6;
    }
  }
  .exercise-name {
    font-size: 13px;
    font-weight: 400;
    padding: 5px;
    float: right;
    text-align: left;
    width: 100%;
    height: 70px!important;
    background: white;
    color: #afafaf;
  }
  .exercise-footer {
    height: 35px;
    box-shadow: 0 1px 0px 0px #fff inset;
    border-radius: 0 0 3px 3px;
    padding: 7px 8px 8px;
    border-top: 1px solid #e7e7e7;
    background-color: #f6f6f6;
    float: left;
    width: 100%;
    color: #555;
    font-size: 14px;
    line-height: 22px;
    display: block;
    font-weight: 100;
    .exercise-sets {
      float: left;
      font-size: 12px;
      span {
        font-weight: 700;
        font-size: 17px;
      }
    }
    .exercise-repetitions {
      float: right;
      font-size: 12px;
      span {
        font-weight: 700;
        font-size: 17px;
      }
    }
  }
  .exercise-has-indications {
    position: absolute;
    margin-top: 135px;
    margin-left: 155px;
    color: #b5b5b5;
  }
`;
export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root  {
    display: flex;
    justify-content: center;
    background: transparent;
    box-shadow: none;
    max-width: 32em;
    .MuiListItemText-primary {
      color: #34acfb;
      font-size: 20px;
      font-weight: 300;
    }
    .list-item-wrapper {
      padding: 1em 0 0 0;
    }
    .MuiListItem-root {
      background: white;
      background: white;
      border-left-style: solid;
      border-left-color: #34acfb;
      border-left-width: 0.5em;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  line-height: 2em!important;
  i {
    margin-bottom: 1em;
    margin-right: 1em;
  }
`;

export const Dragable = styled(motion.div)`
  z-index: 99;
  border-radius: 15px;
  overflow: hidden;
`;

export const DefaultValuesSelector = styled.div`
  width: 200px;
  height: 50px;
  background: black;
  border-radius: 15px;
  color: white;
`;
