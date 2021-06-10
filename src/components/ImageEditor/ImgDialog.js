import React, { useState, useEffect } from 'react';
import { useTranslate } from '../../hooks/Translation';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../LanistaButton';

import {StyledDialog} from './styles';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  imgContainer: {
    position: 'relative',
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
  },
  img: {
    maxWidth: 'auto',
    maxHeight: '60vh',
  },
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const ImgDialog = ({
  img,
  onClose,
  classes,
  onUploadImage,
  loading,
}) => {

  const {t} = useTranslate("exercise");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    this.setState({ open: true })
  }

  const handleClose = () => {
    this.setState({ open: false })
  }

  const onSave = () => {
    onUploadImage(img);
  }

  return (
    <StyledDialog
      fullScreen
      open={!!img}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}
          >
            {t("image preview")}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.imgContainer}>
        <img src={img && URL.createObjectURL(img)} alt="Cropped" className={classes.img} />
        <DialogActions>
          <div className="buttons-section">
            <Button onClick={onClose} color="primary">
              {t("back")}
            </Button>
            <Button onClick={onSave} color="primary" loading={loading}>
              {t("save")}
            </Button>
          </div>
        </DialogActions>
      </div>
    </StyledDialog>
  )
}

export default withStyles(styles)(ImgDialog)
