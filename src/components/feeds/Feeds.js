import * as React from 'react'
import { useRef, useState } from 'react'
import Feed from "./Feed"
import styled from 'styled-components'
import InfiniteList from '../../components/InfiniteList'
import DayPicker from 'react-day-picker'
import { Sticky, Button, List } from 'semantic-ui-react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import moment from 'moment'
import _ from 'lodash'
import Slider from 'react-slick'

const StyledDateLabel = styled.div`
  font-family: Abel;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 0.5em;
`;
const Stage = styled.div`
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
  padding-top: 5em!important;
  height: 100vh;
`;
const Timeline = styled.div`
  overflow: auto;
  padding-top: 1.5em;
  float: left;
  margin-right: 28px;
  max-width: 550px;
  width: 100%;
  margin-bottom: 4em;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 4em;
    height: 100%;
    width: 4px;
    background: white;
  }
`;
const ToolsSection = styled.div`
  max-width: 275px;
  position: absolute;
  right: 0;
  width: 100%;
  padding-top: 1.5em;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  height: 79vh;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  border: 0 solid #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
`;
const Card = styled.div`
  background-color: white;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 5px;
  width: 100%;
  max-width: 250px;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-family: Abel;
  overflow: hidden;
`;
const CardContent = styled.div`
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  border: none;
  background: 0 0;
  margin: 0;
  padding: 1em 1em;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 1em;
  border-radius: 0;
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  display: block;
`;
const CardHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;
const Statistic = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
`;
const StatisticTitle = styled.div`
  flex: 1;
  color: #8b9898;
`;
const StatisticValue = styled.div`
  color: black;
  font-weight: bold;
`;
const FeedsTitle = styled.div`
  padding-top: 1em;
  padding-bottom: 0.5em;
  width: 6em;
  background: white;
  text-align: center;
  z-index: 10;
  position: relative;
  border-radius: 5px;
  margin-bottom: 1em;
  margin-top: 1em;
`;
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


class Feeds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: new Date(),
    };
  }

  componentDidMount() {
    var {jumpToDay} = this.props;
    setTimeout(function () {
        jumpToDay(new Date());
    }, 100);
  }

  render() {
    const {
      feeds,
      t,
      jumpToDay,
      onRequestPage,
      loading,
      error,
      hasMore,
      hasMoreUp,
      initialLoading,
      setPageSize,
      congratulateMember,
      openPlan,
    } = this.props;
    const dataSource = [];

    var items = [];
    let previousTargetDate = ''

    if( feeds && feeds.length > 0 && moment(parseInt(feeds[0].title)).format('DD-MM-YYYY') < moment(new Date()).format('DD-MM-YYYY')) {
      const targetDate = moment(new Date()).format('DD-MM-YYYY')
      items.push(
        <FeedsTitle id={targetDate} key={targetDate}>{targetDate}</FeedsTitle>
      )
      items.push(
        <Feed
          t={t}
          key={targetDate + '-0'}
          feed={{
            type: 'EMPTY_DAY',
            target_date: ((new Date()).getTime() + ""),
            member: {
              id: 0,
              first_name: '',
              last_name: '',
            }
        }}/>
      )
    }
    feeds.map( (feedList, index) =>
    {
      feedList.data.map( (feed, index) =>
       {
         const targetDate = moment(parseInt(feed.target_date)).format('DD-MM-YYYY')
         if( previousTargetDate != targetDate ) {
           items.push(
             <FeedsTitle id={targetDate} key={feed.target_date}>{targetDate}</FeedsTitle>
           )
         }
         previousTargetDate = targetDate;
         items.push(
           <Feed
            t={t}
            key={feed.type + feed.member.id + feed.target_date}
            feed={feed}
            congratulateMember={congratulateMember}
            openPlan={openPlan}
          />
         );
       });
    });

    return (
      <Stage id="feed-stage">
        <Timeline className='hide-scrollbar' id="infinte-list-wrapper">
          <InfiniteList
            loadMore={onRequestPage}
            hasMore={hasMore}
            hasMoreUp={hasMoreUp}
            loader={<div class="loader">Loading...</div>}
            initialLoading={initialLoading}
            loading={loading}
            setPageSize={setPageSize}
          >
            {items}
          </InfiniteList>
        </Timeline>
        <ToolsSection>
        <Card>
          <Calender t={t}/>
        </Card>
        <Card style={{marginTop: '1.5em'}}>
          <CardContent style={{ borderBottom: '1px solid #efefef' }}>
            <CardHeader>
              {t("dashboard:Overview")}
            </CardHeader>
          </CardContent>
          <CardContent>
            <List>
              <List.Item>
                <List.Icon style={{paddingLeft: 0}} name='clipboard list' />
                <List.Content style={{width: '100%'}}>
                  <a href=''>Trainingspläne abgleufen<span style={{ float: 'right', fontWeight: 'bold' }}>3</span></a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon style={{paddingLeft: 0}} name='clipboard list' />
                <List.Content style={{width: '100%'}}>
                  <a href=''>Trainingspläne bald ablaufen<span style={{ float: 'right', fontWeight: 'bold' }}>12</span></a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='calendar plus' />
                <List.Content style={{width: '100%'}}>
                  <a href=''>Termine angefordert<span style={{ float: 'right', fontWeight: 'bold' }}>7</span></a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='calendar' />
                <List.Content style={{width: '100%'}}>
                  <a href=''>Termine heuten<span style={{ float: 'right', fontWeight: 'bold' }}>9</span></a>
                </List.Content>
              </List.Item>
            </List>
          </CardContent>
        </Card>
      </ToolsSection>
    </Stage>
    )
  }
}

export default Feeds;
