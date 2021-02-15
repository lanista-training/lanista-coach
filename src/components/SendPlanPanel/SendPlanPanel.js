import * as React from "react";
import {StyledDialog} from "./styles";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  printType,
  setPrintType,
  onSendPlan,
  open,
  onClose,
  loading,
   error,
 }) => {

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
        <div className="selected print-configurations">
          <div
            className={printType == 0 ? "selected print-type standard-template" : "print-type standard-template"}
            onClick={() => setPrintType(0)}
          >
            <div className="template-image"/>
            <div className="template-name">Standard</div>
          </div>
          <div
            className={printType == 2 ? "selected print-type diary-template" : "print-type diary-template"}
            onClick={() => setPrintType(2)}
          >
            <div className="template-image"/>
            <div className="template-name">Tagebuch</div>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <Fab
          variant="extended"
          size="small"
          className="negative"
          onClick={onClose}
          disabled={loading}
        >
          Zurück
        </Fab>
        <div className="button-wrapper">
          <Fab
            variant="extended"
            size="small"
            className="positive"
            onClick={ () => {
              onSendPlan();
            }}
            disabled={loading}
          >
            {loading ? "" : "Plan versenden"}
          </Fab>
          {loading && <CircularProgress size={30} className="fab-progress" />}
        </div>
      </div>
    </StyledDialog>
  )
};
