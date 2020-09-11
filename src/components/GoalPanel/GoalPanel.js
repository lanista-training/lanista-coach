import React, { useState, useEffect, useRef } from 'react';
import moment from "moment";
import {Panel} from "./styles";
import Rating from '@material-ui/lab/Rating';
import Switch from '@material-ui/core/Switch';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SyncIcon from '@material-ui/icons/Sync';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default ({goal, onSyncGoal, onDeleteGoal, loading, error}) => {

  const [editMode, setEditMode] = useState(false);
  const [warningFlag, setWarningFlag] = useState(goal.warning_flag);
  const [rating, setRating] = useState(goal.rating);
  const [description, setDescription] = useState(goal.description);

  const sendData  = () => {
    onSyncGoal({
      description: description,
      rating: rating,
      warning_flag: warningFlag,
    });
  }

  React.useEffect(() => {
    console.log("Data changed");
    if(warningFlag != goal.warning_flag || rating != goal.rating) {
      console.log("Sending data");
      sendData();
    }
  }, [warningFlag, rating]);

  const {creator} = goal;

  return (
    <Panel>
      {!loading &&
        <>
          <div className="goal-content">
            <div className="goal-content-left">
              <div className="goal-name">
                {!editMode && goal &&
                  <div onClick={() => {
                      setEditMode(true);
                  }}>
                    {description}
                  </div>
                }
                {(editMode || description == '') &&
                  <Paper component="form">
                    <InputBase
                     placeholder="Hier dein Kundenziel eingeben"
                     inputProps={{ 'aria-label': 'search google maps' }}
                     value={description}
                     onChange={(event) => {
                       setEditMode(true);
                       setDescription(event.target.value);
                     }}
                   />
                   <IconButton type="submit" aria-label="search" onClick={(event) => {
                     event.preventDefault();
                     sendData();
                     setEditMode(false);
                   }}>
                     <SyncIcon />
                   </IconButton>
                  </Paper>
                }
              </div>
              <div className="goal-rating">
                <Rating
                  name="goal-rating"
                  value={rating+1}
                  max={6}
                  onChange={(event, newValue) => {
                    setRating(newValue-1);
                  }}
                />
                <div className="rating-text">{"Sehr wichtig"}</div>
              </div>
            </div>
            <div className="goal-content-right">
              <NotificationsActiveIcon style={{ color: warningFlag ? "#f50057" : "#afafaf" }}/>
              <Switch
                checked={warningFlag}
                onChange={() => {
                  setWarningFlag(!warningFlag);
                }}
                value="warning_flag"
              />
            </div>
          </div>
          <div className="footer">
            <div className="delete-icon">
              <DeleteForeverIcon fontSize="large" onClick={onDeleteGoal}/>
            </div>
            <div className="author-section">
              <div className="creation-data">
                <div className="author-name">{creator.first_name} {creator.last_name}</div>
                <div className="creation-date">{moment(parseInt(goal.creation_date)).format('DD-MM-YYYY')}</div>
              </div>
              <div className="author-avatar">
                <div className="avatar-foto" style={{ backgroundImage: 'url(' + creator.photoUrl + ')' }}/>
              </div>
            </div>
          </div>

        </>
      }
    </Panel>
  )
};
