import * as React from "react";
import {StyledDialog} from "./styles";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({defaultSettings, setDefaultSettings, open, onClose}) => {

  const [sets, setSets] = React.useState(4);
  const [unit, setUnit] = React.useState(0);
  const [execution, setExecution] = React.useState(12);

  React.useEffect(() => {
    setSets(defaultSettings.sets);
    setUnit(defaultSettings.unit);
    setExecution(defaultSettings.execution);
  }, [])

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
        <div className="panel-title">Plan-Voreinstellungen</div>
        <div className="sets-configuration">
          <div className="title">
            Sätze:
          </div>
          <div className="configuration">
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button onClick={() => sets > 0 ? setSets(sets-1) : 0}>-</Button>
              <Button style={{width: "6em"}}>{sets}</Button>
              <Button onClick={() => setSets(sets+1)}>+</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="set-configuration">
          <div className="title">
            Satz:
          </div>
          <div className="configuration">
            <div className="units-buttons">
              <Fab
                aria-label="Wdh"
                size="small"
                className={unit == 0 ? "selected" : ""}
                onClick={() => setUnit(0)}
              >
                Wdh
              </Fab>
              <Fab
                aria-label="Min"
                size="small"
                className={unit == 2 ? "selected" : ""}
                onClick={() => setUnit(2)}
              >
                Min
              </Fab>
              <Fab
                aria-label="Sek"
                size="small"
                className={unit == 1 ? "selected" : ""}
                onClick={() => setUnit(1)}
              >
                Sek
              </Fab>
            </div>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button onClick={() => execution > 0 ? setExecution(execution-1) : 0}>-</Button>
              <Button style={{width: "6em"}}>{execution} {unit == 0 ? "Wdh" : unit == 1 ? "Sek" : "Min"}</Button>
              <Button onClick={() => setExecution(execution+1)}>+</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="action-buttons">
          <Fab variant="extended" size="small" className="negative" onClick={onClose}>
            Zurück
          </Fab>
          <Fab variant="extended" size="small" className="positive" onClick={ () => {
            setDefaultSettings({
              sets: sets,
              unit: unit,
              execution: execution,
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
