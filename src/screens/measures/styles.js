import styled from 'styled-components';
import { Tab } from 'semantic-ui-react';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';

export const Stage = styled.div`
  padding-top: 8em!important;
  display: block!important;
  margin-right: auto!important;
  margin-left: auto!important;

  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
  .custom-tooltip {
    background: white;
    border-radius: 15px;
    padding: 2em;
    text-align: center;
    width: 250px;
    box-shadow: 0 0 10px 0 #0000006b;
    .tootip-title {
      font-weight: 900;
      margin-bottom: 1em;
    }
    .record {
      display: flex;
      font-weight: 100;
      justify-content: space-between;
      margin-top: 0.5em;
      .record-value{
        font-weight: 900;
      }
    }
    button {
      margin: 2em auto auto 0;
    }
  }

`;

export const StyledTab = styled(Tab)`
  width: 100%;
  height: 100%;
  .ui.grid {
    margin: initial!important;
  }
  .ui.grid .column {
    margin: 0!important;
    padding: 0!important;
  }
  .menu {

  }
  .item {
    font-family: Roboto;
    font-size: 1.2em!important;
    font-weight: initial!important;
    color: #b1b1b1!important;
    text-align: center!important;
    display: initial!important;
    margin: 0!important;
    padding-left: 1em!important;
    min-width: 12em;
    line-height: 2em!important;
  }
  .item.active {
    color: black!important;
    font-weight: 700!important;
  }
  .tab {
    border: none!important;
    background-color: transparent;
    overflow: hidden;
    height: 100%;
  }
`;

export const DataTable = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: white!important;
  box-shadow: 0 0.08em 0.25em 0.075em rgba(0,0,0,0.075)!important;
  border-radius: 5px!important;
  position: relative;
  padding-top: 60px;
  background-color: #fff;
  margin-bottom: 110px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  tr {
    font-size: 18px;
    line-height: 1.4;
    padding-right: 10px;
  }
  .firstColumn {
    width: 12%;
    padding-left: 40px;
    font-size: 14px;
    text-align: left;
  }
`;

export const TableHeader = styled.div`
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  th {
    padding-top: 18px;
    padding-bottom: 18px;
    text-align: center;
    width: 9%;
    font-weight: 100;
    font-size: 13px;
    vertical-align: baseline;
  }
`;

export const TableContent = styled.div`
  height: 100%;
  margin-top: 13px;
  overflow: auto;
  position: relative;
  tr {
    border-bottom: 1px solid #f2f2f2;
  }
  td {
    font-size: 18px;
    color: #808080;
    line-height: 1.4;
    padding-top: 16px;
    padding-bottom: 16px;
    width: 9%;
    span {
      font-size: 13px;
    }
  }
  .firstColumn {
    color: black;
    font-weight: 500;
    padding-left: 10px;
  }
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
`;

export const TestPane = styled(Tab.Pane)`
  width: 100%;
  max-width: 750px!important;
  padding: 2em!important;
  display: block;
  margin-right: auto;
  margin-left: auto;
  .empty-list {
    text-align: center;
    padding-top: 25%;
    color: #cecece;
    font-size: 1.5em;
    font-weight: 700;
  }
`;

export const TestType = styled.div`
  padding-bottom: 3em;
  margin-bottom: 5em;
  background: white;
  padding: 2em;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2.25px 4.5px 0px;
  .testname {
    font-size: 1.5em;
    font-weight: 700;
    margin: 1em 0;
  }
  .testdescription {
    font-size: 1.2em;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4em;
    margin: 1em 0;
    height: auto;
    text-align: justify;
  }
`;

export const TestResults = styled.div`
  border-radius: 40px;
  margin-bottom: 20px;
  ul {
    box-sizing: border-box;
    display: block;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    margin-block-end: 0px;
    margin-block-start: 0px;
    margin-bottom: 0px;
    margin-inline-end: 0px;
    margin-inline-start: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    padding-bottom: 0px;
    padding-inline-start: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    text-size-adjust: 100%;
    -webkit-box-direction: normal;
  }
  li {
    border-style: solid;
    border-width: 1px;
    border-color: gainsboro;
    border-radius: 30px;
    margin-bottom: 1em;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 18px;
    height: 60.9688px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    line-height: 26.1px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    padding-bottom: 11.2px;
    padding-left: 14.4px;
    padding-right: 14.4px;
    padding-top: 11.2px;
    position: relative;
    text-align: left;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
  }
  .test-wrapper {
    align-items: center;
    box-sizing: border-box;
    color: rgb(27, 27, 27);
    display: flex;
    font-size: 18px;
    height: 37.5938px;
    justify-content: space-between;
    line-height: 26.1px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    min-height: 32px;
    text-align: left;
    text-size-adjust: 100%;
    -webkit-box-align: center;
    -webkit-box-direction: normal;
    -webkit-box-pack: justify;
    .test-progress {
      width: 40px;
      height: 40px;
      display: flex;
      line-height: 40px;
      .MuiCircularProgress-root  {
        position: absolute;
      }
      .test-started {
        svg {
          color: black;
        }
      }
      .test-not-started {
        svg {
          color: #d6d6d6;
        }
      }
      .test-progress-value {
        width: 100%;
        text-align: center;
        font-size: 12px;
      }
    }
  }
  .test-icon {
    align-items: center;
    box-sizing: border-box;
    color: rgb(27, 27, 27);
    display: block;
    flex-grow: 0;
    font-size: 28px;
    height: 28px;
    justify-content: flex-start;
    line-height: 26.1px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    margin-right: 11.2px;
    text-align: left;
    text-size-adjust: 100%;
    width: 28px;
    -webkit-box-align: center;
    -webkit-box-direction: normal;
    -webkit-box-flex: 0;
    -webkit-box-pack: start;
  }
  .test-score {
    box-sizing: border-box;
    color: rgb(27, 27, 27);
    display: flex;
    flex-grow: 0;
    font-size: 18px;
    height: 36.75px;
    line-height: 26.1px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    padding-bottom: 2.7px;
    padding-left: 18px;
    padding-right: 0px;
    padding-top: 2.7px;
    text-align: left;
    text-size-adjust: 100%;
    width: 84.3125px;
    -webkit-box-align: center;
    -webkit-box-direction: normal;
    -webkit-box-flex: 0;
    font-size: 15px;
    width: 6.5em;
    align-items: center;
    text-align: right!important;
  }
  .date-author {

  }
  .test-date {

  }
`;

export const GraphSection = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 2em;
  .no-data {
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
    justify-content: center;
    color: #c5c5c5;
  }
`;

export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root  {
    display: flex;
    justify-content: center;
    background: transparent;
    box-shadow: none;
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

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root  {
    width: 15em;
    height: 15em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    .MuiSvgIcon-root {
      font-size: 4em;
    }
    .loading-message {
      margin: 2em;
    }
  }
`;


export const TestsSelectionPanel = styled(Drawer)`
  .MuiPaper-root  {
    padding: 5em 1em 5em 1em;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    .header-section {
      position: absolute;
      right: 1em;
      top: 1em;
    }
  }
`;

export const TestCard = styled.div`
  width: 25em;
  background: white;
  border-radius: 25px;
  box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
  overflow: hidden;
  .test-content {
    padding: 1em;
  }
  .test-description {
    height: 14em;
    overflow-y: scroll;
    text-align: justify;
    ::-webkit-scrollbar {
      display: none!important;
    }
  }
  .test-image {
    height: 15em;
    background-size: cover;
    background-position: top;
    background-color: #e8e8e8;
  }
  .test-label {
    font-weight: 700;
    font-size: 1.3em;
    line-height: 2.3em;
  }
  .test-select-button{
    line-height: 2.5em!important;
    text-align: center!important;
    background: black;
    color: white;
    font-size: 1.3em;
    font-weight: 700;
  }
`;

export const TestSelectList = styled.div`
  /* Slider */
  padding: 0 2em;
  .test-type {
    display: flex!important;
    justify-content: center;
    padding: 1em;
  }
  .nav-button-back, .nav-button-prev {
    display: flex;
    place-items: center;
    .MuiButtonBase-root {
      height: 55px;
    }
  }
  .slick-dots button::before {
    font-size: 24px!important;
  }
  .slick-slider
  {
      position: relative;

      display: block;
      box-sizing: border-box;

      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;

      -webkit-touch-callout: none;
      -khtml-user-select: none;
      -ms-touch-action: pan-y;
          touch-action: pan-y;
      -webkit-tap-highlight-color: transparent;
  }

  .slick-list
  {
      position: relative;

      display: block;
      overflow: hidden;

      margin: 0;
      padding: 0;
  }
  .slick-list:focus
  {
      outline: none;
  }
  .slick-list.dragging
  {
      cursor: pointer;
      cursor: hand;
  }

  .slick-slider .slick-track,
  .slick-slider .slick-list
  {
      -webkit-transform: translate3d(0, 0, 0);
         -moz-transform: translate3d(0, 0, 0);
          -ms-transform: translate3d(0, 0, 0);
           -o-transform: translate3d(0, 0, 0);
              transform: translate3d(0, 0, 0);
  }

  .slick-track
  {
      position: relative;
      top: 0;
      left: 0;

      display: block;
      margin-left: auto;
      margin-right: auto;
  }
  .slick-track:before,
  .slick-track:after
  {
      display: table;

      content: '';
  }
  .slick-track:after
  {
      clear: both;
  }
  .slick-loading .slick-track
  {
      visibility: hidden;
  }

  .slick-slide
  {
      display: none;
      float: left;

      height: 100%;
      min-height: 1px;
  }
  [dir='rtl'] .slick-slide
  {
      float: right;
  }
  .slick-slide img
  {
      display: block;
  }
  .slick-slide.slick-loading img
  {
      display: none;
  }
  .slick-slide.dragging img
  {
      pointer-events: none;
  }
  .slick-initialized .slick-slide
  {
      display: block;
  }
  .slick-loading .slick-slide
  {
      visibility: hidden;
  }
  .slick-vertical .slick-slide
  {
      display: block;

      height: auto;

      border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
      display: none;
  }

  /* Slider */
  .slick-loading .slick-list
  {
      background: #fff url('./ajax-loader.gif') center center no-repeat;
  }

  /* Icons */
  @font-face
  {
      font-family: 'slick';
      font-weight: normal;
      font-style: normal;

      src: url('./fonts/slick.eot');
      src: url('./fonts/slick.eot?#iefix') format('embedded-opentype'), url('./fonts/slick.woff') format('woff'), url('./fonts/slick.ttf') format('truetype'), url('./fonts/slick.svg#slick') format('svg');
  }
  /* Arrows */
  .slick-prev,
  .slick-next
  {
      font-size: 0;
      line-height: 0;

      position: absolute;
      top: 50%;

      display: block;

      width: 20px;
      height: 20px;
      padding: 0;
      -webkit-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
      transform: translate(0, -50%);

      cursor: pointer;

      color: transparent;
      border: none;
      outline: none;
      background: transparent;
  }
  .slick-prev:hover,
  .slick-prev:focus,
  .slick-next:hover,
  .slick-next:focus
  {
      color: transparent;
      outline: none;
      background: transparent;
  }
  .slick-prev:hover:before,
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before
  {
      opacity: 1;
  }
  .slick-prev.slick-disabled:before,
  .slick-next.slick-disabled:before
  {
      opacity: .25;
  }

  .slick-prev:before,
  .slick-next:before
  {
      font-family: 'slick';
      font-size: 20px;
      line-height: 1;

      opacity: .75;
      color: white;

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }

  .slick-prev
  {
      left: -25px;
  }
  [dir='rtl'] .slick-prev
  {
      right: -25px;
      left: auto;
  }
  .slick-prev:before
  {
      content: '←';
  }
  [dir='rtl'] .slick-prev:before
  {
      content: '→';
  }

  .slick-next
  {
      right: -25px;
  }
  [dir='rtl'] .slick-next
  {
      right: auto;
      left: -25px;
  }
  .slick-next:before
  {
      content: '→';
  }
  [dir='rtl'] .slick-next:before
  {
      content: '←';
  }

  /* Dots */
  .slick-dotted.slick-slider
  {
      margin-bottom: 30px;
  }

  .slick-dots
  {
      position: absolute;
      bottom: -25px;

      display: block;

      width: 100%;
      padding: 0;
      margin: 0;

      list-style: none;

      text-align: center;
  }
  .slick-dots li
  {
      position: relative;

      display: inline-block;

      width: 20px;
      height: 20px;
      margin: 0 5px;
      padding: 0;

      cursor: pointer;
  }
  .slick-dots li button
  {
      font-size: 0;
      line-height: 0;

      display: block;

      width: 20px;
      height: 20px;
      padding: 5px;

      cursor: pointer;

      color: transparent;
      border: 0;
      outline: none;
      background: transparent;
  }
  .slick-dots li button:hover,
  .slick-dots li button:focus
  {
      outline: none;
  }
  .slick-dots li button:hover:before,
  .slick-dots li button:focus:before
  {
      opacity: 1;
  }
  .slick-dots li button:before
  {
      font-family: 'slick';
      font-size: 6px;
      line-height: 20px;

      position: absolute;
      top: 0;
      left: 0;

      width: 20px;
      height: 20px;

      content: '•';
      text-align: center;

      opacity: .25;
      color: black;

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }
  .slick-dots li.slick-active button:before
  {
      opacity: .75;
      color: black;
  }

`;
