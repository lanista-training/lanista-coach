import React, { Component } from 'react';
import { useRef, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Slider from 'react-slick'
import moment from 'moment'

const StyledCalender = styled.div`
  height: auto;
  .calender-header {
    display: flex;
    flex: 1 auto;
    padding-top: 0.5em;
    .month-year-titel {
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1 auto;
      text-align: center;
      line-height: 2.5em;
    }
    .step{
      width: 2.086956em;
      height: 2.086956em;
      padding: 0;
      line-height: 2.086956em;
      font-size: 1.4375em;
      margin: -.173913em;
      border-radius: 2em;
      text-align: center;
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
      ::before {
        font-family: Lanista;
        content: "\\e953";
      }
    }
  }
  .calender-body {
    .today-text {
      text-align: center;
      padding: 0.5em;
    }
    .tasks-list {
      height: 20em;
      flex-grow: 0;
      max-width: none;
      flex-basis: auto;
      overflow: scroll;
      border-top: 1px solid rgba(224,224,224,1);
      ::-webkit-scrollbar {
        display: none!important;
      }
      .tasks-list-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        .time-titel{
          flex-grow: 0;
          max-width: 15%;
          flex-basis: 15%;
          margin: 0;
          box-sizing: border-box;
          table {
            table-layout: fixed;
            width: 100%;
            display: table;
            border-spacing: 0;
            border-collapse: collapse;
            tbody {
              display: table-row-group;
              tr {
                color: inherit;
                display: table-row;
                outline: none;
                vertical-align: middle;
                td {
                  padding-left: 2px;
                  padding-right: 4px;
                  border: 0;
                  height: 50px;
                  padding: 0;
                  overflow: hidden;
                  text-align: right;
                  user-select: none;
                  text-overflow: ellipsis;
                  span {
                    font-size: 0.75rem;
                    font-weight: 400;
                    line-height: 1.66;
                    white-space: nowrap;
                    letter-spacing: 0.03333em;
                    margin-right: 0.5em;
                    font-weight: 700;
                  }
                }
              }
            }
          }
        }
        .time-entries {
          position: relative;
          flex-grow: 0;
          max-width: 85%;
          flex-basis: 85%;
          table {
            table-layout: fixed;
            width: 100%;
            display: table;
            border-spacing: 0;
            border-collapse: collapse;
            tbody {
              display: table-row-group;
              tr {
                color: inherit;
                display: table-row;
                outline: none;
                vertical-align: middle;
                td {
                  padding-right: 16px;
                  padding-left: 2px;
                  height: 48px;
                  padding: 0;
                  border-bottom: 1px solid rgba(224, 224, 224, 1);
                }
              }
            }
          }
        }

      }
    }
    .calender-slider {
      height: auto;
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
    }
    .days-of-week {
      line-height: 1.875em;
      text-align: center;
      display: flex;
      flex: 1 auto;
      -webkit-font-smoothing: antialiased;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-text-size-adjust: 100%;
      font-size: 0.8em;
      .day {
        width: 14.285715%;
      }
    }
    .days {
      line-height: 1.875em;
      text-align: center;
      display: flex;
      flex: 1 auto;
      -webkit-font-smoothing: antialiased;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-text-size-adjust: 100%;
      font-size: 1.1em;
      min-width: 100%;
      .day {
        width: 14.285715%;
        display: table-cell;
        .day-cell {
          display: inline-block;
          width: 1.625em;
          height: 1.625em;
          margin: .3125em 0;
          line-height: 1.525em;
          border: 2px solid transparent;
          border-radius: 2em;
        }
      }
      .current-day{
        .day-cell {
          border-color: black;
          background: black;
          color: #fff;
        }
      }
    }
  }
`;

const createDaysOfWeek = (weekIndex) => {
  const currentMonday = moment().startOf('week')
  const monday = currentMonday.add(weekIndex-1, 'week')
  let days = []
  for( var i =0; i < 7; i++) {
    const day = monday.add(1, 'd')
    const className = (day.format("YYYY-MM-DD") == moment().format("YYYY-MM-DD") ? 'day current-day' : 'day')
    days.push(<div className={className}><div className="day-cell">{day.date()}</div></div>)
  }
  return days
}

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

const Calender = ({t}) => {
  let currentWeek = 0;
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [pagesState, setPagesState] = useState({
    //pages: renderWeeks(1, 1),
    currentPage: 1,
    frameIndex: 1,
  });

  function Week({week}) {
    const currentMonday = moment().startOf('week')
    const monday = currentMonday.add(week-1, 'week')
    let days = []
    //days.push(<div className='days'>)
    for( var i =0; i < 7; i++) {
      const day = monday.add(1, 'd')
      const className = (day.format("YYYY-MM-DD") == moment(selectedDay).format("YYYY-MM-DD") ? 'day current-day' : 'day')
      days.push(<div className={className} date-option={day.format("YYYY-MM-DD")}><div className="day-cell">{day.date()}</div></div>)
    }
    //days.push(</div>)
    return days
  }

  function renderWeeks() {
    const weeks = []
    const {frameIndex, currentPage} = pagesState
    if( frameIndex == 0 ) {
      weeks.push(<div><div className='days'><Week week={currentPage}/></div></div>)
      weeks.push(<div><div className='days'><Week week={currentPage+1}/></div></div>)
      weeks.push(<div><div className='days'><Week week={currentPage-1}/></div></div>)
    } else if( frameIndex == 1 ) {
      weeks.push(<div><div className='days'><Week week={currentPage-1}/></div></div>)
      weeks.push(<div><div className='days'><Week week={currentPage}/></div></div>)
      weeks.push(<div><div className='days'><Week week={currentPage+1}/></div></div>)
    } else if( frameIndex == 2 ) {
      weeks.push(<div><div className='days'><Week week={currentPage+1}/></div></div>)
      weeks.push(<div><div className='days'><Week week={currentPage-1}/></div></div>)
      weeks.push(<div><div className='days'><Week week={currentPage}/></div></div>)
    }
    return weeks
  }

  function selection(i) {
    let selection
    if( i.target.classList.contains('day') ) {
       selection = i.target.getAttribute('date-option')
    } else {
      selection = i.target.parentNode.getAttribute('date-option')
    }
    console.log(selection)
    setSelectedDay(new Date(selection))
  }

  function renderTimeTitles() {
    const timeTitels = []
    for( var i =0; i < 24; i++) {
      timeTitels.push(
        <tr>
          <td rowspan="2">
            <span>{i}:00</span>
          </td>
        </tr>
      )
      timeTitels.push(
        <tr></tr>
      )
      timeTitels.push(
        <tr>
          <td rowspan="2">
            <span>{i}:30</span>
          </td>
        </tr>
      )
      timeTitels.push(
        <tr></tr>
      )
    }
    return timeTitels
  }

  function renderTimeEntries() {
    const timeEntries = []
    for( var i =0; i < 24; i++) {
      timeEntries.push(
        <tr>
          <td tabindex="0">
          </td>
        </tr>
      )
      timeEntries.push(
        <tr>
          <td tabindex="0">
          </td>
        </tr>
      )
    }
    return timeEntries
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 1,
    beforeChange: (oldIndex, newIndex) => {
      if( Math.abs(oldIndex - newIndex) == 1 ) {
        const currentPage = (oldIndex > newIndex ? (pagesState.currentPage-1) : (pagesState.currentPage+1))
        setPagesState({
          currentPage: currentPage,
          frameIndex: newIndex,
        })
      } else {
        const currentPage = (oldIndex == 0 ? (pagesState.currentPage-1) : (pagesState.currentPage+1))
        setPagesState({
          currentPage: currentPage,
          frameIndex: newIndex,
        })
      }
    }
  };

  const {currentPage} = pagesState
  const currentSunday = moment().endOf('week')
  const sunday = currentSunday.add(currentPage, 'week')
  return (
    <StyledCalender>
      <div className="calender-header">
        <div className="month-year-titel">{sunday.format("MMMM YYYY")}</div>
      </div>
      <div className="calender-body">
        <div className="days-of-week">
          <div className="day">Mo</div>
          <div className="day">Di</div>
          <div className="day">Mi</div>
          <div className="day">Do</div>
          <div className="day">Fr</div>
          <div className="day">Sa</div>
          <div className="day">So</div>
        </div>
        <div className="calender-slider" onClick={selection}>
          <Slider {...settings}>
            {renderWeeks()}
          </Slider>
        </div>
        <div className="today-text">
          {moment(selectedDay).format("dddd, DD MMMM YYYY")}
        </div>
        <div className="tasks-list">
          <div className="tasks-list-container">
            <div className="time-titel">
              <table>
                <tbody>
                  {renderTimeTitles()}
                </tbody>
              </table>
            </div>
            <div className="time-entries">
              <table>
                <tbody>
                  {renderTimeEntries()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </StyledCalender>
  )
}


export default Calender
