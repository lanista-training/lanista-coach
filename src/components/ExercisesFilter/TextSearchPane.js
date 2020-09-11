import * as React from "react";
import {TextSearchPane, ListItem} from "./styles";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const Exercise = ({exercise, onClick}) => {
  return (
    <ListItem onClick={onClick} className={exercise.selected ? 'selected' : ''}>
      <div className="exercise-item">
        <div className="exercise-list-img-right" style={{backgroundImage: 'url(' + exercise.start_image + ')'}}/>
        <div className="exercise-list-img-left" style={{backgroundImage: 'url(' + exercise.end_image + ')'}}/>
        <div className="exercise-list-text">{exercise.name}</div>
      </div>
    </ListItem>
  )
}

const EmptyList = ({text}) => {
  return (
    <div className="empty-list">
      {text}
    </div>
  )
}

export default ({loading, onResultSelect, onSearchChange, exercises, value, onShowExercise}) => {

  const onChange = (event) => {
    onSearchChange(event.target.value);
  }

  return (
    <TextSearchPane>
      <Paper component="form">
        <InputBase
          placeholder="Search Exercises"
          inputProps={{ 'aria-label': 'search exercises lanista' }}
          value={value}
          onChange={onChange}
          autoFocus={true}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div className="exercises-list hide-scrollbar">
      { value && value.length >= 3 && exercises.length > 0 &&
        exercises.map((exercise) =>
          <Exercise
            exercise={exercise}
            onClick={() => onShowExercise(exercise.id)}
          />
        )
      }
      { value.length < 3 && 
        <EmptyList text={"Gebe mindestens 3 Zeichen ein"} />
      }
      { value.length >= 3 && exercises.length == 0 && 
        <EmptyList text={":-(  Leider kein Treffer !"} />
      }
      </div>
    </TextSearchPane>
  )
}
