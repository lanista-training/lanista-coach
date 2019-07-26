import * as React from "react";
import styled from 'styled-components';
import _ from 'lodash';
import moment from "moment";
import InfiniteList from '../../components/InfiniteList';

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
const ListSection = styled.div`
  overflow: auto;
  padding-top: 1.5em;
  width: 100%;
  margin-bottom: 4em;
`;
const ListItem = styled.div`
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
    }
  }
`;


const Exercise = ({exercise, onShowExercise}) => {
  return (
    <ListItem onClick={() => onShowExercise(exercise.id)}>
      <div className="exercise-item">
        <div className="exercise-list-img-right" style={{backgroundImage: 'url(' + exercise.start_image + ')'}}/>
        <div className="exercise-list-img-left" style={{backgroundImage: 'url(' + exercise.end_image + ')'}}/>
        <div className="exercise-list-text">{exercise.name}</div>
      </div>
    </ListItem>
  )
}

class Exercises extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  render() {
    const {
      exercises,
      filtering,
      isFilterOn,
      showExercise,
      t,
      onRequestPage,
      hasMore,
      initialLoading,
      loading,
      setPageSize,
      onShowExercise,
    } = this.props;

    var items = [];
    exercises.map((exercise, i) => {
      items.push(
        <Exercise exercise={exercise} onShowExercise={onShowExercise}/>
      );
    });

    return(
      <Stage>
        <ListSection className='hide-scrollbar' id="infinte-list-wrapper">
          <InfiniteList
            initialLoading={initialLoading}
            loading={loading}
            loader={<div class="">Loading...</div>}
            loadMore={onRequestPage}
            hasMore={hasMore}
            setPageSize={setPageSize}
            listClass="exercises-list"
          >
            {items}
          </InfiniteList>
        </ListSection>
      </Stage>
    );
  }
};

export default Exercises;
