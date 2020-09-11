import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';
import { motion } from "framer-motion";

export const FilterPanel = styled(Tab)`
  height: 100%;
  .four.wide.column {
    height: 100vh!important;
  }
  .grid {
    margin: 0;
    height: 100%;
    .column:first-child {
      height: 100%;
      padding: 0;
    }
    .column:nth-child(2) {
      height: 100%;
      padding: 0;
      display: flex;
      place-items: center;
    }
  }
  .image-wrapper {
    background: white;
    box-shadow: 0 0 27px 0 #0000001f;
  }
  .menu {
    width: 100%;
    padding: 0;
    display: flex!important;
    justify-content: center;
    border: none!important;
    overflow: hidden;
    position: relative;
    z-index: 1;
    background: white;
    border-top-right-radius: 15px!important;
    border-bottom-right-radius: 15px!important;
    box-shadow: 27px 0 27px 0 #0000001f!important;
    .item {
      padding: 2em 1em!important;
      width: 100%!important;
      -webkit-transition: font-size 0.3s ease;
      -moz-transition: font-size 0.3s ease;
      -o-transition: font-size 0.3s ease;
      -ms-transition: font-size 0.3s ease;
      text-align: center!important;
      display: block!important;
      background: white!important;
    }
    .active {
      font-size: 2em!important;
      border: none!important;
      padding: 1em 0!important;
    }
  }
  .tab {
    padding: 0!important;
    border: none!important;
    background: transparent!important;
    height: 95vh;
    margin: 0!important;
  }
`;

export const PinSelectionList  = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .list-wrapper {
    background: white;
    width: 100%;
    height: 95%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 27px 0 #0000001f;
    z-index: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const Filter  = styled.div`
  width: auto;
  .tab {
    width: 70vw!important;
  }
`;

export const StyledSearchPin =  styled.div`
  width: auto!important;
  text-transform: none;
  background: #e8e8e8;
  border-radius: .28571429rem;
  box-shadow: none;
  line-height: 2.5em;
  font-size: 1.3em;
  padding: 0 1em;
  margin: 1em;
  border-radius: 50px;
  cursor: pointer;
  i {
    font-size: .92857143em;
    opacity: .5;
    width: auto;
    font-family: Icons;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    speak: none;
    margin-left: 0.5em;
    ::before {
      content: "\f055";
      background: 0 0!important;
    }
  }
`;

export const StyledTypePin =  styled.div`
  width: auto!important;
  text-transform: none;
  background: #5603AD;
  color: white;
  border-radius: .28571429rem;
  box-shadow: none;
  line-height: 2.5em;
  font-size: 1.3em;
  padding: 0 1em;
  margin: 1em;
  border-radius: 50px;
  cursor: pointer;
  i {
    font-size: .92857143em;
    opacity: .5;
    width: auto;
    font-family: Icons;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    speak: none;
    margin-left: 0.5em;
    ::before {
      content: "\f055";
      background: 0 0!important;
    }
  }
`;

export const TextSearchPane =  styled.div`
  .MuiPaper-root {
    display: flex;
    width: 22em;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 2;
    .MuiInputBase-root {
      flex: 1;
      input {
        padding-left: 1em;
      }
    }
  }
  .exercises-list{
  	text-align: center;
  	height: calc(100vh - 60px);
  	overflow-x: scroll;
  	padding-bottom: 5em;
  	position: relative;
  	top: -8em;
  	padding-top: 9em;
    .selected {
      box-shadow: 0 0 15px 0 rgb(155,201,61)!important;
      border: 1px solid rgb(155,201,61)!important;
    }
  }
  .empty-list {
    padding-top: 25%;
    font-size: 2em;
    color: #9e9e9e;
  }
`;

export const ListItem = styled.div`
  height: 177px;
  width: 200px;
  display: inline-table;
  margin-left: 19px;
  margin-top: 14px;
  overflow: visible;
  transition: all 100ms linear 0s;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 5px;
  box-shadow: 0 0 27px 0 #0000001f;
  .exercise-item {
    margin: 9px;
    .exercise-list-img-right {
      height: 90px;
      width: 90px;
      background-size: cover;
      background-color: #e6e6e6;
      float: right;
      border-top-right-radius: 4px;
    }
    .exercise-list-img-left {
      height: 90px;
      width: 90px;
      background-size: cover;
      background-color: #e6e6e6;
      float: left;
      border-top-left-radius: 4px;
    }
    .exercise-list-text {
      font-size: 13px;
      font-weight: 700;
      text-align: left;
      font-weight: 100;
      color: #9e9e9e;
    }
  }
`;
