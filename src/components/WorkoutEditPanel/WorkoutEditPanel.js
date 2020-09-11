import * as React from "react";
import {StyledDialog} from "./styles";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PrintIcon from '@material-ui/icons/Print';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const countChars = (textArea, text) => {
  return textArea ? textArea.textLength : 0;
}
const countLines = (textArea, text) => {
  if( textArea && text) {
    const {offsetHeight, scrollHeight} = textArea;
    if( offsetHeight ==  scrollHeight) {
      const hardBreaks = text ? (text.split(/\r|\r\n|\n/).length) : 0;
      const softBreaks =  text ? (text.length > 88 ? 2 : 1) : 0;
      return ( (hardBreaks + softBreaks) > 2 ? 2 : 1);
    } else {
      return( scrollHeight / (offsetHeight / 2) );
    }
  }
}

export default ({t, workout, saveWorkout, open, onClose}) => {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const textareaEl = React.useRef(null);

  //
  // Tooltip
  //
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };
  const handleTooltipOpen = () => {
    setTooltipOpen(!tooltipOpen);
  };

  React.useEffect(() => {
    if( workout ) {
      setName(workout.name);
      setDescription(workout.description);
      setDuration(workout.duration);
    }
  }, [workout]);

  return (
    <StyledDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="dialog-panel">

        <div className="workout-configuration">
          <div className="title">
            Name:
          </div>
          <div className="input-field">
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="workout-configuration">
          <div className="title">
            Beschreibung:
          </div>
          <div className="workout-description-area">
            <div className="input-field">
              <TextField
                id="outlined-multiline-static"
                multiline
                rows="3"
                variant="outlined"
                value={description}
                onChange={e => setDescription(e.target.value)}
                inputProps={{ref: textareaEl, maxlength: 500}}
              />
            </div>
            <div className="description-warnings">
              {t("print-information")} <PrintIcon fontSize="inherit" />
            </div>
          </div>

        </div>


        <div className="workout-configuration">
          <div className="title">
            Plandauer:
          </div>
          <div className="configuration">
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button onClick={() => duration > 0 ? setDuration(duration-1) : 0}>-</Button>
              <Button style={{width: "22em"}}>{duration}</Button>
              <Button onClick={() => setDuration(duration+1)}>+</Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="action-buttons">
          <Fab variant="extended" size="small" className="negative" onClick={onClose}>
            Zurück
          </Fab>
          <Fab variant="extended" size="small" className="positive" onClick={ () => {
            saveWorkout({
              name: name,
              description: description,
              duration: duration,
            });
            onClose();
          }}>
            Übernehmen
          </Fab>
        </div>
      </div>
    </StyledDialog>
  )
};
