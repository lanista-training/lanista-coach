import styled from 'styled-components';

export const Stage = styled.div`
  padding-top: 8em;
  display: block;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: 900px;
  min-width: 750px;
  ::-webkit-scrollbar {
    width: 0px!important;
    background: transparent!important; /* make scrollbar transparent */
  }
  .slider-image {
    height: 196px;
    .image {
      height: 100%;
      background-size: cover;
      background-position: center;
    }
  }
  .data-section {
    display:flex;
  }
  .value-section {
    display: flex;
    padding: 1em;
  }
  .slick-dots {
    bottom: 5px!important;
    background: #ffffff6b;
  }
  /* Slider */
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

export const LastItem = styled.div`
  height: 8em;
`;

export const TestItem = styled.div`
  background: white;
  border-radius: 25px;
  display: flex;
  box-shadow: rgba(0,0,0,0.2) 0px 2.25px 4.5px 0px;
  margin-bottom: 2em;
  overflow: hidden;
  .test-text-section {
    display: flex;
    flex-flow: column;
    align-self: center;
    padding-left: 2em;
    flex: 1;
  }
  .test-name {
    font-size: 1.2em;
    font-weight: 700;
    line-height: 1.5;
  }
  .test-selection {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: left;
  }
  .test-select-item {
    line-height: 3em;
    text-align: center;
    background: white;
    button {
      width: 100%;
      height: 42px;
    }
  }
  .test-side {
    background: black;
    color: white;
    height: 100%;
    width: 30px;
    text-align: center;
    line-height: 43px;
  }
  .selected {
    color: white;
  }
  .test-selection-wrapper {
    width: 56vw;
    max-width: 648px;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 0.5em;
  }
  .test-image {
    width: 25%;
    background-repeat: no-repeat;
    background-position: right;
    background-size: auto 100%;
    height: 14em;
    margin-left: 2em;
  }
  .comment-section {
    padding-top: 1em;
    font-size: 1.1em;
    .comment-input {
      background-color: transparent;
      color: initial;
      border: none;
      margin-left: 1em;
      ::placeholder {
        color: #bbbbbb;
        opacity: 1;
      }
      :disabled {
        color: #afafaf;
      }
    }
  }
`;
