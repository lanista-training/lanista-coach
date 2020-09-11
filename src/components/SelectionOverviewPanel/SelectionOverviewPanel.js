import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import {Panel, Exercise, EmtpyList} from './styles';

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

function onClickHandler(e) {
  console.log('CLICK FINALLY WORKS');
}

export default ({selection, removeItem}) => {
  //console.log(selection)
  //console.log("SelectionOverviewPanel");
  useEffect(() => {
    if(slider && slider.current) {
      slider.current.slickNext()
    }
  });
  const slider = useRef(null);
  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 1,
    infinite: false,
    //initialSlide: 100,
    onClick:{onClickHandler},
  };
  const exercises = [];
  selection && selection.map(exercise => exercises.push(
    <Exercise onClick={() => {
      console.log("mark")
      if(exercise.selected) {
        console.log("mark 1")
        removeItem(exercise.id)
        slider.current.slickPrev()
      }
    }}>
      <div className={exercise.selected ? 'selected images-section' : 'images-section'}>
        <div className="start-image" style={{backgroundImage: 'url(' + exercise.end_image + ')'}}/>
        <div className="end-image" style={{backgroundImage: 'url(' + exercise.start_image + ')'}}/>
      </div>
    </Exercise>
  ));
  return (
    <Panel>
      <Slider ref={slider}  {...settings}>
        {selection && selection.length > 0 && exercises}
        {selection && selection.length == 0 &&
          <EmtpyList>
            Selektiere Übungen aus der Trefferliste
          </EmtpyList>
        }
      </Slider>
    </Panel>
  )
};
