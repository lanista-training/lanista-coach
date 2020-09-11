import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';

export const StyledMenu = styled(Menu)`
  .MuiPopover-paper {
    width: 400px;
    height: 80vh;
  }
  .slick-slider {
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
    .step{
      width: 2.086956em;
      height: 2.086956em;
      padding: 0;
      line-height: 2.086956em;
      font-size: 1.4375em;
      margin: -.173913em;
      border-radius: 2em;
      text-align: center;
      position: absolute;
      top: -56px;
    }
    .previous-step {
      ::before {
        font-family: Lanista;
        content: "\\e953";
      }
    }
    .next-step {
      -moz-transform: scale(-1, 1);
      -webkit-transform: scale(-1, 1);
      -o-transform: scale(-1, 1);
      -ms-transform: scale(-1, 1);
      transform: scale(-1, 1);
      right: 0;
      ::before {
        font-family: Lanista;
        content: "\\e953";
      }
    }
  }
  .slick-list {
    position: relative;
    display: block;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .slick-list:focus {
    outline: none;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }
  .slick-slider .slick-track,
  .slick-slider .slick-list {
    -webkit-transform: translate3d(0, 0, 0);
       -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
         -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
  }
  .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .slick-track:before,
  .slick-track:after {
    display: table;
    content: '';
  }
  .slick-track:after {
    clear: both;
  }
  .slick-loading .slick-track {
    visibility: hidden;
  }
  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }
  [dir='rtl'] .slick-slide {
    float: right;
  }
  .slick-slide img {
    display: block;
  }
  .slick-slide.slick-loading img {
    display: none;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: block;
  }
  .slick-loading .slick-slide {
    visibility: hidden;
  }
  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }

`;

export const MessagesPanel = styled.div`
  height: calc(100vh - 87px);
  width: 400px;
  padding-top: 1em;
  overflow: hidden;
  .list>.item:last-child {
    padding-bottom: .85714286em;
    border-bottom: 1px solid rgba(34,36,38,.15);
  }
`;

export const Message = styled(ListItem)`
  .status-flag {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10%;
  }
  .new .status-flag{
    background: rgb(16,204,82);
  }
  .time-section {
    color: #a2a2a2;
  }
`;

export const Photo = styled.div`
  border-radius: 50%;
  margin-right: 1em;
  .image {
    width: 40px;
    height: 40px;
    background-color: #cecece;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    flex: 0 0 auto;
    overflow: hidden;
    position: relative;
    background-size: contain;
  }
`;

export const StyledMessageButton = styled.div`
  .MuiBadge-badge {
    top: 15px;
    right: 20px;
  }
`;
