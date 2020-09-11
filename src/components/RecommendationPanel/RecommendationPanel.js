import * as React from "react"
import Slider from 'react-slick'
import styled from 'styled-components'

const Panel = styled.div`
  width: calc(100vw - 300px);
  height: auto;
  position: absolute;
  bottom: 10px;
  right: 150px;
  z-index: 20;
  .wrappe {
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
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
    min-height: 64px;
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
    }
    .previous-step {
      left: -30px;
      top: 15px;
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
      right: -30px;
      top: 15px;
      ::before {
        font-family: Lanista;
        content: "\\e953";
      }
    }
  }
  .slick-list {
    height: 100%!important;
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
const Exercise = styled.div`
  width: 100%!important;
  display: flex!important;
  justify-content: center;
  .images-section{
    display: flex!important;
    justify-content: center;
    border: 1px solid rgba(0,0,0,.0975);
    border-radius: 5px;
    overflow: hidden;
  }
  .start-image {
    height: 60px;
    width: 60px;
    background-size: contain;
  }
  .end-image {
    height: 60px;
    width: 60px;
    background-size: contain;
  }
`;
function SampleNextArrow({ onClick }) {
  return (
    <div
      className="step next-step"
      onClick={onClick}
    />
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div
      className="step previous-step"
      onClick={onClick}
    />
  );
}

export default ({data, style, goToExercise}) => {
  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 1,
  };
  const exercises = []
  data.map(exercise => exercises.push(
    <Exercise key={"recommendation-" + exercise.id} onClick={() => goToExercise(exercise.id)}>
      <div className="images-section">
        <div className="start-image" style={{backgroundImage: 'url(' + exercise.end_image + ')'}}/>
        <div className="end-image" style={{backgroundImage: 'url(' + exercise.start_image + ')'}}/>
      </div>
    </Exercise>
  ))
  return (
    <Panel style={style}>
      <div className="wrappe">
        <Slider {...settings}>
          {exercises}
        </Slider>
      </div>
    </Panel>
  )
};
