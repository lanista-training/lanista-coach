import styled from 'styled-components';

export const Gallery  = styled.div`
  width: ${props => props.width}px;
  overflow: hidden;
  .header {
    display: flex;
    flex-flow: revert;
    background: #80808047;
    .dragable-area {
      height: 45px;
      width: 100%
    }
  }
  .slick-slider {
    width: ${props => props.width-129}px;
    .anatomy-image-wrapper {
      height: ${props => props.height-25}px;
      width: ${props => props.width-129}px;
    }
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
    .slick-prev {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 1;
      background-color: #9c9c9c3b;
      box-shadow: none;
    }
    .slick-next {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 1;
      background-color: #9c9c9c3b;
      box-shadow: none;
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
  .slick-dots {
    position: absolute;
    bottom: -25px;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align:center
  }
  .slick-dots li {
    position: relative;
    display: inline-block;
    margin: 0 5px;
    padding:0
  }
  .slick-dots li, .slick-dots li button {
    width: 20px;
    height: 20px;
    cursor:pointer;
  }
  .slick-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    padding: 5px;
    color: transparent;
    border: 0;
    outline: none;
    background:transparent;
  }
  .slick-dots li button:focus, .slick-dots li button:hover {
    outline:none;
  }
  .slick-dots li button:before {
    font-family: slick;
    font-size: 20px;
    line-height: 0px;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    content: "\\2022";
    text-align: center;
    opacity: .25;
    color: #000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slick-dots li.slick-active button:before {
    opacity: .75;
    color: #000;
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
  .header {
    width: 100%;
    text-align: right;
  }
  .MuiTabs-flexContainer {
    align-items: center;
  }
  .panel-wrapper {
    width: 100%;
    display: flex;
    flex-grow: row;
    height: ${props => props.height}px;
    [role=tabpanel] {
      width: 100%;
      height: 100%;
      .MuiBox-root {
        width: 100%;
        height: 100%;
        padding: 0;
        .MuiTypography-root {
          width: 100%;
          height: 100%;
          .anatomy-image {
            height: 100%;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
  background-color: #ffffffeb;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 15px;
  box-shadow: 0 0 27px 0 #0000001f;
  display: flex;
  flex-flow: column;
  align-items: center;
`;
